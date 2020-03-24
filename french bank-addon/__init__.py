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
import io
import codecs
import json
import random
import codecs
import os
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
#  - model id of the bank notes  (in my case: "french sentence model") : 1579520008004
#  - model id's of note you wanna collect examples from
#    (in my case: french nouns , french adjectives , french adverbs , french verbs) :
#    ['1573430574304' , '1577565396172' , '1577565612747' , '1577564379922'   ]
#
################################################################

CONFIG = mw.addonManager.getConfig(__name__)

bankId = CONFIG["bankModelId"]
otherModels = CONFIG['otheModelsIds']


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
    bank_examples = mw.col.db.all("SELECT  flds  from notes where mid = '"+bankId+"'")

    # bank = []
    i = 0
    bank = {}
    for example in bank_examples:
        example = str(example)[2:-3]
        fields = example.split('\\x1f')
        french= BeautifulSoup(fields[0],'html.parser').get_text().strip()
        english= BeautifulSoup(fields[1],'html.parser').get_text().strip()
        audio = BeautifulSoup(fields[2],'html.parser').get_text().split(', [sound:')[0][7:-1].strip()

        example_note = {}
        example_note['fr']=french.replace("\\","").replace("\'","’").replace("u202f"," ").replace("axa0"," ").replace("xa0"," ")
        logger.debug(example_note['fr'])
        example_note['en']=english.replace("\\","").replace("\'","’").replace("u202f"," ").replace("axa0"," ").replace("xa0"," ")
        example_note['audio']=audio.replace("\\","").replace("\'","’").replace("u202f"," ").replace("axa0"," ").replace("xa0"," ")
        bank[i] = example_note
        i += 1

    logger.info('bank retrived successfully')
    return bank
###############################################################################################################
# creats a dictionary of all the words in the examples and which examples they appear on
################################################################################################################
def createDict():
    bank = getBank()
    # showInfo("There are "+str(len(bank))+" sentences")
    dictionary = {}
    for x in bank:
        item = bank[x]
        words = item['fr'].lower()
        words = words.replace('.', '')
        words = words.replace('?', '')
        words = words.replace('!', '')
        words = words.split(" ")
        for word in words:
            if word not in dictionary:
                l = []
                l.append(x)
                dictionary[word] = l
            else:
                 dictionary[word].append(x)

    # showInfo("There are "+str(len(dictionary))+" unique words")
    logger.info('dicts created successfully')
    return dictionary , bank


###############################################################################################################
# loops over all the notes in the (French (verbs , nouns , adv and adj ))
# and creats a file of them so they could be added to (french sentence bank later)
################################################################################################################
def updateBank():
        bank = getBank()
        bankKeys = []
        for item in bank:
            ex = bank[item]
            bankKeys.append(ex['fr'])

        # id's of models of (nouns , adjectives , adverbs , verbs)
        notes_type_ids= otherModels

        new_original_examples = []
        with open('_outfile_anki.txt', 'w' , encoding="utf-8") as outfile:
            for note_type_id in notes_type_ids:
                list = mw.col.db.all("SELECT flds  from notes where mid= '"+note_type_id+"'")
                for row in list:
                    row = str(row)[2:-3]
                    fields = row.split('\\x1f')
                    # if(note_type_id == '1577565396172'):
                    #     french= BeautifulSoup(fields[9],'html.parser').get_text().replace("  "," ").strip()
                    #     english= BeautifulSoup(fields[10],'html.parser').get_text().replace("  "," ").strip()
                    #     audio = BeautifulSoup(fields[8],'html.parser').get_text().split(', [sound:')[0][7:-1]
                    # else :
                    audio = BeautifulSoup(fields[6],'html.parser').get_text().split(', [sound:')[0][7:-1]
                    french= BeautifulSoup(fields[7],'html.parser').get_text().replace("  "," ").strip()
                    english= BeautifulSoup(fields[8],'html.parser').get_text().replace("  "," ").strip()


                    example = {}
                    example['fr']=french.replace("\\","").replace("\'","’").replace("\u202f"," ")
                    example['en']=english.replace("\\","").replace("\'","’").replace("\u202f"," ")
                    example['audio']=audio.replace("\\","").replace("\'","’").replace("\u202f"," ")

                    if (example['fr'] not in bankKeys and example['audio'] !="" and example['en'] !=""):
                        outfile.write(french+'\t'+english+'\t'"[sound:"+audio+"]"+'\n')

        logger.info('out file created successfully')
        outfile.close()


###############################################################################################################
# imports the privously generated noted into anki
################################################################################################################
def updateBankNotes():
    bank = updateBank()
    # with open('_bank.txt', 'w' , encoding="utf-8") as outfile:
    #     outfile.write(str(bank))
    file = u"C:/Users/shoro/AppData/Roaming/Anki2/User 1/collection.media/_outfile_anki.txt"
    did = mw.col.decks.id("French sentence Bank")
    mw.col.decks.select(did)
    m = mw.col.models.byName("french sentence")
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




def refresh():

    res = createDict()
    wordsDict = res[0]
    bankDict = res[1]
    showInfo('started assigning examples to words')
    models = ['french adverbs','french nouns' , 'french adjectives' , 'french verbs']
    for model in progress(models, _("generating note banks."), _("Stop that!")):

        m = mw.col.models.byName(model)
        id = m['id']
        notes = mw.col.db.all("SELECT id ,  flds  from notes where mid= '%s'"%id)

        for row in notes:

            # n = mw.col.getNote(nid)

        # for row in notes:
            row = str(row)[1:-2]
            row = row.split(', ', 1)
            id = row[0].strip()
            fields = row[1][1:]
            fields = fields.split('\\x1f')

            french_word =BeautifulSoup( fields[1],'html.parser').get_text().lower()

            examples_list = []

            if french_word in wordsDict:
                listOfIds = wordsDict[french_word]
                # showInfo(str(listOfIds))
                for exId in listOfIds :
                    examples_list.append(bankDict[exId])
            if french_word+"s" in wordsDict:
                listOfIds = wordsDict[french_word+"s"]
                for exId in listOfIds :
                    examples_list.append(bankDict[exId])
            if french_word+"e" in wordsDict:
                listOfIds = wordsDict[french_word+"e"]
                for exId in listOfIds :
                    examples_list.append(bankDict[exId])
            if "d’"+french_word in wordsDict:
                listOfIds = wordsDict["d’"+french_word]
                for exId in listOfIds :
                    examples_list.append(bankDict[exId])
            if "l’"+french_word in wordsDict:
                listOfIds = wordsDict["l’"+french_word]
                for exId in listOfIds :
                    examples_list.append(bankDict[exId])
            if "d’"+french_word+"s" in wordsDict:
                listOfIds = wordsDict["d’"+french_word+"s"]
                for exId in listOfIds :
                    examples_list.append(bankDict[exId])
            if "l’"+french_word+"s" in wordsDict:
                listOfIds = wordsDict["l’"+french_word+"s"]
                for exId in listOfIds :
                    examples_list.append(bankDict[exId])
            if "d’"+french_word+"e" in wordsDict:
                listOfIds = wordsDict["d’"+french_word+"e"]
                for exId in listOfIds :
                    examples_list.append(bankDict[exId])
            if "l’"+french_word+"e" in wordsDict:
                listOfIds = wordsDict["l’"+french_word+"e"]
                for exId in listOfIds :
                    examples_list.append(bankDict[exId])



            note = mw.col.getNote(id)
            ex_count = len(examples_list)
            if note['doubleMeaning'] != 'y':
                if (ex_count > 0):
                    selector =random.randint(0, ex_count-1)
                    note['french example'] = examples_list[selector]['fr']
                    note['english example'] = examples_list[selector]['en']
                    note['exSound'] = "[sound:"+examples_list[selector]['audio']+"]"
                    note['Bank'] =json.dumps(examples_list,ensure_ascii=False)
                    # note.flush()
                    if(ex_count == 1):
                        note['Bank'] =""
                    note.flush()
                else:
                    note['french example'] = ""
                    note['english example'] = ""
                    note['exSound'] = ""
                    note['Bank'] = ""
                    note.flush()
            else:
                english = note['translation']
                new_ex_list = []
                for ex in examples_list:
                    if english in ex['en']:
                        new_ex_list.append(ex)

                new_ex_count = len(new_ex_list)
                if (new_ex_count > 0):
                    selector =random.randint(0, new_ex_count-1)
                    note['french example'] = new_ex_list[selector]['fr']
                    note['english example'] = new_ex_list[selector]['en']
                    note['exSound'] = "[sound:"+new_ex_list[selector]['audio']+"]"
                    note['Bank'] =json.dumps(new_ex_list,ensure_ascii=False)
                    # note.flush()
                    if(ex_count == 1):
                        note['Bank'] =""
                    note.flush()
                else:
                    note['french example'] = ""
                    note['english example'] = ""
                    note['exSound'] = ""
                    note['Bank'] = ""
                    note.flush()

    showInfo('done')
    logger.info('refreshing notes done successfully')



def refreshVerbs():

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
    showInfo('done')


def runAddon():
    updateBankNotes()
    refresh()
    logger.info('adone run successfully')




action = QAction("Refresh examples", mw)
action.triggered.connect(refresh)
mw.form.menuTools.addAction(action)

action2 = QAction("Update bank and refresh examples", mw)
action2.triggered.connect(runAddon)
mw.form.menuTools.addAction(action2)

action3 = QAction("Refresh verbs", mw)
action3.triggered.connect(refreshVerbs)
mw.form.menuTools.addAction(action3)





if CONFIG['autoRefresh']:
    hooks.addHook("profileLoaded", refresh)
