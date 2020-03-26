# -*- coding: utf-8 -*-

from PyQt5.QtCore import QCoreApplication
from PyQt5.QtWidgets import QAction, QProgressDialog
from  anki import Collection
from anki.importing import TextImporter
from anki import hooks
from aqt import mw
from aqt.utils import showInfo
from aqt.qt import *
from bs4 import BeautifulSoup
import sqlite3
import json
import random
import string
import re
import logging


logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)

formatter = logging.Formatter('%(asctime)s:%(levelname)s:%(message)s')

file_handler = logging.FileHandler('C:/Users/shoro/AppData/Roaming/Anki2/User 1/collection.media/_logs.log')
file_handler.setFormatter(formatter)

logger.addHandler(file_handler)

###############################################################
# Configurable sittings
#  - sentenceModelName : The name of the model containing all the sentences -> Default : "french sentence"
#  - model id's of note you wanna collect examples from
#    (in my case: french nouns , french adjectives , french adverbs , french verbs) :
#    ['1573430574304' , '1577565396172' , '1577565612747' , '1577564379922'   ]
#
################################################################

CONFIG = mw.addonManager.getConfig(__name__)

sentenceModelName = CONFIG["sentenceModelName"]
mainModelsNames = CONFIG["mainModelsNames"]
bankDeckName = CONFIG["bankDeckName"]



def progress(data, *args):
    """
    A very pythonic progress dialog.

    Iterate over progress(iterator)
    instead of iterator. That’s pretty much it.

    """
    # found at http://lateral.netmanagers.com.ar/weblog/posts/BB917.html
    # © 2000-2012 Roberto Alsina
    # Creative Commons Attribution-NonCommercial-ShareAlike 2.5 licence
    # http://creativecommons.org/licenses/by-nc-sa/2.5/
    it = iter(data)
    widget = QProgressDialog(*args + (0, it.__length_hint__()))
    c = 0
    for v in it:
        QCoreApplication.instance().processEvents()
        if widget.wasCanceled():
            raise StopIteration
        c += 1
        widget.setValue(c)
        yield(v)

###############################################################################################################
# loops over all the notes in the sentences bank and adds them to a dict  of dicts and returns that dict
################################################################################################################
def getBank():
    sentenceModel = mw.col.models.byName(sentenceModelName)
    sentenceModeId = sentenceModel['id']
    frenchSentencesIds = mw.col.db.all("SELECT  id  from notes where mid = '"+sentenceModeId+"'")

    collectedExampleId = 0
    bank = {}
    for id in frenchSentencesIds :
        id = str(id)[1:-2]
        frenchSentenceNote = mw.col.getNote(id)
        example = {}
        example['fr'] =BeautifulSoup( frenchSentenceNote['french'],'html.parser').get_text().replace("\'","’")
        example['en'] =BeautifulSoup( frenchSentenceNote['english'],'html.parser').get_text().replace("\'","’")
        example['audio'] = BeautifulSoup( frenchSentenceNote['audio'],'html.parser').get_text().replace("\'","’")
        bank[collectedExampleId] = example
        collectedExampleId += 1
    logger.info('bank retrived successfully')
    return bank
###############################################################################################################
# creats a dictionary of all the words in the examples and which examples they appear on
################################################################################################################
def createDict():
    bank = getBank()
    logger.info("There are "+str(len(bank))+" sentences")
    dictionary = {}
    for id in bank:
        example = bank[id]
        example['audio'] =example['audio'].split(',')[0]
        example['audio'] = example['audio'][7:-1]
        words = example['fr'].lower()
        words = words.replace('.', '')
        words = words.replace('?', '')
        words = words.replace('!', '')
        words = words.split(" ")
        for word in words:
            if word not in dictionary:
                idsList  = []
                idsList.append(id)
                dictionary[word] = idsList
            else:
                 dictionary[word].append(id)

    logger.info("There are "+str(len(dictionary))+" unique words")
    logger.info('dicts created successfully')
    return dictionary , bank


###############################################################################################################
# loops over all the notes in the (French (verbs , nouns , adv and adj ))
# and creats a file of the examples found in them and not in the french sentence model so they could be
# added to (french sentence bank later)
################################################################################################################
def updateBankDeck():
    bank = getBank()
    bankKeys = []
    for id in bank:
        example = bank[id]
        bankKeys.append(example['fr'])

    with open('_outfile_anki.txt', 'w' , encoding="utf-8") as outfile:
        new_Examples = 0

        for modelName in mainModelsNames:

            model = mw.col.models.byName(modelName)
            modelId = model['id']
            frenchSentencesIds = mw.col.db.all("SELECT  id  from notes where mid = '"+modelId+"'")

            for id in frenchSentencesIds:
                id = str(id)[1:-2]
                frenchNote = mw.col.getNote(id)
                example = {}
                example['fr'] =BeautifulSoup( frenchNote['french example'],'html.parser').get_text().replace("\'","’")
                example['en'] =BeautifulSoup( frenchNote['english example'],'html.parser').get_text().replace("\'","’")
                example['audio'] =BeautifulSoup( frenchNote['exSound'],'html.parser').get_text().replace("\'","’")


                if (example['fr'] not in bankKeys and example['audio'] !="" and example['en'] !=""):
                    outfile.write(example['fr']+'\t'+example['en']+'\t'+example['audio']+'\n')
                    new_Examples +=1
    logger.info('out file created successfully')
    outfile.close()

    file = u"C:/Users/shoro/AppData/Roaming/Anki2/User 1/collection.media/_outfile_anki.txt"
    did = mw.col.decks.id(bankDeckName)
    mw.col.decks.select(did)
    m = mw.col.models.byName(sentenceModelName)
    deck = mw.col.decks.get(did)
    deck['mid'] = m['id']
    mw.col.decks.save(deck)
    # and puts cards in the last deck used by the note type
    m['did'] = did
    # import into the collection
    try:
        ti = TextImporter(mw.col, file)
        ti.initMapping()
        ti.run()
        logger.info('sentences bank updated successfully')
    except:
        logger.info('problem updating sentences bank')
        pass

    return(new_Examples)

################################################################################################################


def updateBankFieldInNotes():
    '''
    Updates the bank field in each note with all the matching examples found
    in the bank sentence deck
    '''

    res = createDict()
    wordsDict = res[0]
    bankDict = res[1]
    showInfo('started assigning examples to words')

    for modelName in progress(mainModelsNames, _("generating note banks."), _("Stop that!")):
        model = mw.col.models.byName(modelName)
        modelId = model['id']

        frenchSentencesIds = mw.col.db.all("SELECT  id  from notes where mid = '"+modelId+"'")
        for id in frenchSentencesIds :
            id = str(id)[1:-2]
            frenchNote = mw.col.getNote(id)
            frenchWord = BeautifulSoup( frenchNote['word'],'html.parser').get_text().lower()
            type = BeautifulSoup( frenchNote['type'],'html.parser').get_text().lower()
            examples_list = []

            if frenchWord in wordsDict:
                listOfIds = wordsDict[frenchWord]
                examples_list  += [bankDict[exId] for exId in listOfIds ]

            if frenchWord+"s" in wordsDict and ('noun' in type or 'adjective' in type)  :
                listOfIds = wordsDict[frenchWord+"s"]
                examples_list  += [bankDict[exId] for exId in listOfIds ]

            if frenchWord+"e" in wordsDict and 'adjective' in type:
                listOfIds = wordsDict[frenchWord+"e"]
                examples_list  += [bankDict[exId] for exId in listOfIds ]

            if "d’"+frenchWord in wordsDict and ('noun' in type or 'adjective' in type) :
                listOfIds = wordsDict["d’"+frenchWord]
                examples_list  += [bankDict[exId] for exId in listOfIds ]

            if "l’"+frenchWord in wordsDict and ('noun' in type or 'adjective' in type) :
                listOfIds = wordsDict["l’"+frenchWord]
                examples_list  += [bankDict[exId] for exId in listOfIds ]

            if "d’"+frenchWord+"s" in wordsDict and ('noun' in type or 'adjective' in type) :
                listOfIds = wordsDict["d’"+frenchWord+"s"]
                examples_list  += [bankDict[exId] for exId in listOfIds ]

            if "l’"+frenchWord+"s" in wordsDict and ('noun' in type or 'adjective' in type) :
                listOfIds = wordsDict["l’"+frenchWord+"s"]
                examples_list  += [bankDict[exId] for exId in listOfIds ]

            if "d’"+frenchWord+"e" in wordsDict and  'adjective' in type :
                listOfIds = wordsDict["d’"+frenchWord+"e"]
                examples_list  += [bankDict[exId] for exId in listOfIds ]

            if "l’"+frenchWord+"e" in wordsDict and  'adjective' in type:
                listOfIds = wordsDict["l’"+frenchWord+"e"]
                examples_list  += [bankDict[exId] for exId in listOfIds ]


            ex_count = len(examples_list)
            if frenchNote['doubleMeaning'] != 'y':
                if (ex_count > 0):
                    frenchNote['Bank'] =json.dumps(examples_list,ensure_ascii=False)
                    frenchNote.flush()
                else:
                    frenchNote['Bank'] = ""
                    frenchNote.flush()
            else:
                english = frenchNote['translation']
                new_ex_list = []
                for ex in examples_list:
                    if english in ex['en']:
                        new_ex_list.append(ex)

                new_ex_count = len(new_ex_list)
                if (new_ex_count > 0):
                    frenchNote['Bank'] =json.dumps(new_ex_list,ensure_ascii=False)
                    frenchNote.flush()
                else:
                    frenchNote['Bank'] = ""
                    frenchNote.flush()

    showInfo('Updaiting The Bank Field Was Done Successfully')
    logger.info('Updaiting The Bank Field Was Done Successfully')


###################################################################################################

def refreshExamples():
    '''
    Chooses a random example from the bank field and makes it the main examples, also ensures That
    the privously main example doesn't appear as the main example again after refreshing
    '''

    for modelName in mainModelsNames :
        model = mw.col.models.byName(modelName)
        modelId = model['id']
        frenchSentencesIds = mw.col.db.all("SELECT  id  from notes where mid = '"+modelId+"'")
        for id in frenchSentencesIds :
            id = str(id)[1:-2]
            frenchNote = mw.col.getNote(id)
            bankField = frenchNote['Bank']
            if len(bankField) > 0:
                examples_list = json.loads(bankField)

                ex_count = len(examples_list)
                if (ex_count > 0):

                    selector =random.randint(0, ex_count-1)

                    # ensure the privious example doesn't appear again
                    if  examples_list[selector]['fr'] == frenchNote['french example'] and ex_count > 1 :
                        if selector >= 0 and selector < ex_count-3:
                            selector +=1
                        else :
                            selector -=1

                    frenchNote['french example'] = examples_list[selector]['fr']
                    frenchNote['english example'] = examples_list[selector]['en']
                    frenchNote['exSound'] = "[sound:"+examples_list[selector]['audio']+"]"
                    frenchNote.flush()
                else:
                    frenchNote['french example'] = ""
                    frenchNote['english example'] = ""
                    frenchNote['exSound'] = ""
                    frenchNote.flush()
            else:
                continue

    showInfo('Refreshing Examples Was Done Successfully')
    logger.info('Refreshing Examples Was Done Successfully')


################################################################################################################

def refreshVerbs():
    try:

        res = createDict()
        wordsDict = res[0]
        bankDict = res[1]
        showInfo('started assigning examples to words')

        m = mw.col.models.byName('french verbs')
        id = m['id']
        notes = mw.col.db.all("SELECT id ,  flds  from notes where mid= '%s'"%id)

        for row in notes:

            row = str(row)[1:-2]
            row = row.split(', ', 1)
            id = row[0].strip()
            fields = row[1][1:]
            fields = fields.split('\\x1f')

            indices = [i for i in range(14, 32)]
            for index in indices:
                f = BeautifulSoup( fields[index],'html.parser').get_text().lower()
                f = f.lower().replace("\\","").replace("\'","’")
                if len(f) > 0:
                    f = re.split("[/ ]+", f)
                    element_length = len(f)
                    example = None
                    if element_length == 1 :
                        if f[0] in wordsDict:
                            examples_list = wordsDict[f[0]]
                            example = bankDict[examples_list[0]]
                    elif element_length == 2:
                        pronoun = f[0]
                        acctual_f = f[1]
                        if acctual_f in wordsDict:
                            examples_list = wordsDict[acctual_f]
                            for i in examples_list :
                                ex = bankDict[i]
                                compare = ex['fr'].lower()
                                compare = compare.replace("\'","’")
                                if pronoun+" "+acctual_f in compare:
                                    example = ex
                                    break
                                elif pronoun+" ne "+acctual_f in compare:
                                    example = ex
                                    break

                    elif element_length == 3:
                        pronoun1 = f[0]
                        pronoun2 = f[1]
                        acctual_f = f[2]
                        if acctual_f in wordsDict:
                            examples_list = wordsDict[acctual_f]
                            for i in examples_list :
                                ex = bankDict[i]
                                compare = ex['fr'].lower()
                                if pronoun1+" "+pronoun2+" "+acctual_f in compare :
                                    example = ex
                                    break
                                elif pronoun1+" "+acctual_f in compare and  ( pronoun1 == 'il' or pronoun1 == 'ils' ) :
                                    example = ex
                                    break
                                elif pronoun2+" "+acctual_f in  compare  and ( pronoun1 == 'elle' or pronoun1 == 'elles' ) :
                                    example = ex
                                    break

                    elif element_length == 4:
                        pronoun1 = f[0]
                        pronoun2 = f[1]
                        pronoun3 = f[2]
                        acctual_f = f[3]
                        if acctual_f in wordsDict:
                            examples_list = wordsDict[acctual_f]
                            for i in examples_list :
                                ex = bankDict[i]
                                compare = ex['fr'].lower()
                                if pronoun1+" "+pronoun3+" "+acctual_f in compare :
                                    example = ex
                                    break
                                elif pronoun2+" "+pronoun3+" "+acctual_f in compare :
                                    example = ex
                                    break


                    else :
                        example = None


                    note = mw.col.getNote(id)
                    ex_f_name = str(index - 13)
                    sound_f_name = ex_f_name+'S'
                    if(example != None):
                        note[ex_f_name] = "<b>"+example['fr']+"</b><br>"+example['en']+"<br>"
                        note[sound_f_name] = example['audio']
                        note.flush()
                    else:
                        note[ex_f_name] =""
                        note[sound_f_name] = ""
                        note.flush()
                else:
                    note = mw.col.getNote(id)
                    note[ex_f_name] =""
                    note[sound_f_name] = ""
                    note.flush()

        logger.info('refreshing verbs done successfully')
        showInfo('refreshing verbs done successfully')
    except:
        logger.info('Error refreshing verbs')
        showInfo('Error refreshing verbs')

################################################################################################################
def updateExamplesBank():
    newExamples = updateBankDeck()
    if newExamples > 0:
        showInfo('found '+newExamples+' new examples')
        updateBankFieldInNotes()
    else:
        showInfo('No new examples found')
    logger.info('adone run successfully')

################################################################################################################

action = QAction("Refresh examples", mw)
action.triggered.connect(refreshExamples)

action2 = QAction("Update Examples Bank", mw)
action2.triggered.connect(updateExamplesBank)

action3 = QAction("Refresh verbs", mw)
action3.triggered.connect(refreshVerbs)


mw.form.menuTools.addAction(action2)
mw.form.menuTools.addAction(action)
mw.form.menuTools.addAction(action3)

if CONFIG['autoRefresh']:
    hooks.addHook("profileLoaded", refreshExamples)
