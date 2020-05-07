/*jshint esversion: 8 */
config = {
  "defaultHighlightingSelection": "highlightNone",
  "defaultExtraSelection": "noteOnly",
  "interestInArabic": true,
  "defaultIPA": false,
  "defaultPOS": false,
  "defaultExtraExamples": true,
  "defaultmaturityState": true
};

/******************************************/

String.prototype.removeAt = function (index) {
  return this.substr(0, index) + this.substr(index + 1, );
};
String.prototype.replaceAt = function (index, replacement) {
  return this.substr(0, index) + replacement + this.substr(index + 1, );
};
String.prototype.replaceAll = function (strReplace, strWith) {
  // See http://stackoverflow.com/a/3561711/556609
  var esc = strReplace.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  var reg = new RegExp(esc, 'ig');
  return this.replace(reg, strWith);
};



Utils = class {
  HTMLId(id) {
    return document.getElementById(id).innerHTML.trim();
  }
  HTMLClass(className) {
    return document.getElementsByClassName(className)[0].innerHTML.trim();
  }
  textId(id) {
    return document.getElementById(id).innerText.trim();
  }
  textClass(className) {
    return document.getElementsByClassName(className)[0].innerText.trim();
  }
  disableMenuOption(id) {
    document.getElementById(id).disabled = true;
    document.getElementById(id).parentElement.style.color = '#4f5154';
  }

};
utils = new Utils();

Note = class {
  constructor() {
    this.html_word = utils.HTMLId('word');
    this.word = utils.textId('word');
    this.html_translation = utils.HTMLClass('translationText');
    this.translation = utils.textClass('translationText');
    this.translationPrats = this.translation.split(',');
    this.translationWords = [];
    this.isVerb = false;
    this.type = utils.textClass('type');
    this.frenchExample = utils.HTMLId('frenchExamble');
    this.englishExample = utils.HTMLId('englishExample');

    try {
      this.fem = utils.textClass('feminin');
      if (this.fem == "") this.fem = null;
    } catch (error) {
      this.fem = null;
    }
    try {
      this.plural = utils.textClass('plural');
      if (this.plural == "") this.plural = null;
    } catch (error) {
      this.plural = null;
    }
    try {
      this.ivl = utils.HTMLId('ivl');
      if (this.ivl == "") this.ivl = null;
    } catch (error) {
      this.ivl = null;
    }
    try {
      this.bank = utils.textId('exBank');
      this.bank = this.bank.split("'").join("\"");
      this.bank = JSON.parse(this.bank);
      this.bank_length = this.bank.length;
    } catch (error) {
      this.bank = null;
    }

  }

  getTranslationWords() {
    var _this = this;
    _this.translationPrats.forEach(
      function (item) {
        if (!item.includes(')')) {
          _this.translationWords.push(item.trim());
        }
      }
    );
    return _this.translationWords;
  }

  isAVerb(){
    var _this = this;
    if (_this.type.includes('verb') && !note.type.includes('adverb')) {
      _this.isVerb = true;
  }
  }


};

note = new Note();
note.getTranslationWords();
note.isAVerb();


NoteStyleManipulator = class {

  constructor(note) {
    this.note = note;
  }

  markFrenchWordInTheExample(example, englishEx) {
    document.querySelector('#frenchExamble').innerHTML = example.replaceAll(note.word,`<span class='example__higlighted-word'>" ${ note.word }"</span>` );
    document.querySelector('#englishExample').innerHTML = englishEx;

    let parts = this.note.translation.split(",");
    parts.forEach((part, i) => {
      part = part.trim();
      if (!part.includes('(')) {
        if (englishEx.toLowerCase().includes(part.toLowerCase())) {
          document.querySelector('#englishExample').innerHTML = englishEx.replaceAll(part, `<span class='example__higlighted-word'>${ part }</span>`);
        }
      }
    });
    if (note.isVerb) {
      parts.forEach((part, i) => {
        if (part.includes('to') || part.includes('for')) {
          part = part.replace('to', '').trim();
          part = part.replace('for', '').trim();
          if (!part.includes('(')) {
            if (englishEx.includes(part)) {
              document.querySelector('#englishExample').innerHTML = englishEx.replaceAll(part, "<span class='example__higlighted-word'>" + part + "</span>");
            }
          }

        }
      });

    }
  }

  /**
   *  Remove the extra new line tag that Anki adds at the end of the audio fields
   */
  removeExtraNewLineTagInSoundFields() {

    let soundFieldsIds = ['wordSound', 'exampleSound', 'femeSound', 'pSound'];
    soundFieldsIds.forEach(function (item) {
      if (document.querySelector(item)) {
        if (document.getElementById(item).innerHTML.endsWith('<br>'))
          document.getElementById(item).innerHTML = document.getElementById(item).innerHTML.slice(0, -4);
      }
    });

  }

  removeHTMLfromWordAndTranslationFields() {
    document.querySelector('.translationText').innerHTML = this.translation;
    document.querySelector('#word').innerHTML = this.word;
  }


  prebBackGround() {
    /*Change the card's background color according to its type*/

    function changeBackGroundColor(containerClassName, imgClassName) {
      document.querySelector("#container").className = containerClassName;
      document.querySelector("#imgcontainer").className = imgClassName;
    }


    if (note.type.includes('feminine') && note.type.includes('masculine')) {
      changeBackGroundColor("both__background", "both__image");
    } else if (note.type.trim().includes('feminine')) {
      changeBackGroundColor("feminine__background", "feminine__image");
    } else if (note.type.trim().includes('masculine')) {
      changeBackGroundColor("masculine__background", "masculine__image");
    } else if (note.type.trim().includes('adjective')) {
      changeBackGroundColor("adjective__background", "adjective__image");
    } else if (note.type.trim().includes('adverb')) {
      changeBackGroundColor("adverb__background", "adverb__image");
    } else if (note.isVerb) {
      changeBackGroundColor("verb__background", "verb__image");  
    } else if (note.type.trim().includes('phrase')) {
      changeBackGroundColor("phrase__background", "phrase__image");
    } else {
      changeBackGroundColor("other__background", "other__image");
    }

  }


  splitTranslation() {

    let parts = note.translationPrats;
    document.querySelector('.translation').innerHTML = "";
    parts.forEach((part, i) => {
      if (part.includes('(')) {
        part = `<span class=' translation__word translation__word--note'> ${ part.replace('(', '').replace(')', '') } <span/>`;

      } else {
        part = `<span class=' translation__word'>${ part }<span/>`;

      }
      document.querySelector('.translation').innerHTML += part;
      document.querySelector('.translation').classList.add('translationText');
    });


  }


  changeReplaybutton() {
    let elements = document.querySelectorAll('.soundLink');
    for (var i = 0; i < elements.length; i++) {
      elements[i].innerHTML = `

    <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 480 480" style="enable-background:new 0 0 480 480;" xml:space="preserve">
    <path style="fill:#455A64;" d="M278.944,17.577c-5.568-2.656-12.128-1.952-16.928,1.92L106.368,144.009H32
    	c-17.632,0-32,14.368-32,32v128c0,17.664,14.368,32,32,32h74.368l155.616,124.512c2.912,2.304,6.464,3.488,10.016,3.488
    	c2.368,0,4.736-0.544,6.944-1.6c5.536-2.656,9.056-8.256,9.056-14.4v-416C288,25.865,284.48,20.265,278.944,17.577z"></path>
    <g>
    	<path style="fill:#FFC107;" d="M368.992,126.857c-6.304-6.208-16.416-6.112-22.624,0.128c-6.208,6.304-6.144,16.416,0.128,22.656
    		C370.688,173.513,384,205.609,384,240.009s-13.312,66.496-37.504,90.368c-6.272,6.176-6.336,16.32-0.128,22.624
    		c3.136,3.168,7.264,4.736,11.36,4.736c4.064,0,8.128-1.536,11.264-4.64C399.328,323.241,416,283.049,416,240.009
    		S399.328,156.777,368.992,126.857z"></path>
    	<path style="fill:#FFC107;" d="M414.144,81.769c-6.304-6.24-16.416-6.176-22.656,0.096c-6.208,6.272-6.144,16.416,0.096,22.624
    		C427.968,140.553,448,188.681,448,240.009s-20.032,99.424-56.416,135.488c-6.24,6.24-6.304,16.384-0.096,22.656
    		c3.168,3.136,7.264,4.704,11.36,4.704c4.064,0,8.16-1.536,11.296-4.64C456.64,356.137,480,299.945,480,240.009
    		S456.64,123.881,414.144,81.769z"></path>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    </svg>
    `;
    }

  }


  prepPhrases() {
    if (note.type.includes('phrase')) {
      document.querySelector('#phrase').innerHTML = `
    <a id="yg-widget-0" class="youglish-widget" data-query="${note.word.replaceAll(" ","%20")}"data-lang="french" data-components="80"   data-rest-mode="1"  rel="nofollow" </a>
    `;
      if (document.querySelector('.typed')) {
        document.querySelector('.typed').style.display = 'none';

      }


    }


  }


};


styleManipulator = new NoteStyleManipulator(note);
styleManipulator.markFrenchWordInTheExample(note.frenchExample, note.englishExample);
styleManipulator.removeExtraNewLineTagInSoundFields();
styleManipulator.removeHTMLfromWordAndTranslationFields();
styleManipulator.prebBackGround();
styleManipulator.splitTranslation();
styleManipulator.changeReplaybutton();
styleManipulator.prepPhrases();




/********************************/




ChangeDetector = class {
  constructor(note) {
    this.note = note;
    this.word = note.word;
    this.translation = note.translationWords[0];

    this.pairs = [
      ['alt', 'alte'],
      ['arian', 'aire'],
      ['gen', 'gène'],
      ['graph', 'graphe'],
      ['ic', 'ique'],
      ['isk', 'isque'],
      ['ism', 'isme'],
      ['ist', 'iste'],
      ['meter', 'mètre'],
      ['mony', 'monie'],
      ['oid', 'oide'],
      ['or', 'eur'],
      ['ot', 'ote'],
      ['sis', 'se'],
      ['ter', 'tre'],
      ['ty', 'té'],
      ['y', 'ie'],
      ['acious', 'ace'],
      ['an', 'ain'],
      ['ar', 'aire'],
      ['arious', 'aire'],
      ['ary', 'aire'],
      ['ferrous', 'fère'],
      ['ical', 'ique'],
      ['id', 'ide'],
      ['ine', 'in'],
      ['ite', 'it'],
      ['ive', 'if'],
      ['nal', 'ne'],
      ['ocious', 'oce'],
      ['ous', 'eux'],
      ['und', 'ond'],
      ['ure', 'ur'],
      ['ent', 'em'],
      ['ect', 'ait'],
      ['act', 'aite'],
      ['ate', 'ative'],
      ['k', 'que'],
      ['er', 're'],
      ['ous', 'e'],
      ['ious', 'aire'],
      ['ous', 'ique'],
      ['ed', 'é']
    ];

    this.advPairs = [
      ['y', 'ement'],
      ['ally', 'ellement'],
      ['ly', 'ement'],
      ['ly', 'ément'],
      ['ly', 'ment']
    ];

    this.femPairs = [
      ['ère', 'er'],
      ['se', 's'],
      ['ve', 'f'],
      ['euse', 'eux'],
      ['che', 'c'],
      ['euse', 'eur'],  ['teuse', 'teur'],
      ['eresse', 'eur'],
      ['elle', 'eau'],
      ['olle', 'ou'],
      ['aîtresse', 'aître']
    ];

    this.plPairs = [
      ['aux', 'al'],
      ['oux', 'ou'],
      ['aux', 'ail'],
      ['aux', 'au'],
      ['eaux', 'eau'],
      ['s', 's'],
      ['x', 'x'],
      ['z', 'z']
    ];

    this.verb_pairs = [
      ['ate', 'er'],
      ['fy', 'fier'],
      ['ise', 'iser'],
      ['e', 'er']
    ];

  }

  /************************************************************/
  /* --------------------Siblings detctors--- -----------------*/
  /*************************************************************/


  isSibling(word, translation, testingPairs) {

    let _this = this;
    var result = -1;

    testingPairs.forEach(function (element) {
      let wordIndex = -element[1].length;
      let translationIndex = -element[0].length;
      if (word.endsWith(element[1]) && translation.endsWith(element[0])) {

        if (translation.slice(0, translationIndex) == word.slice(0, wordIndex)) {
          result = element;
        }
      }
    });
    if (result != -1) return [result[1], result[0]];
  }

  isDoupleSibling(word, translation) {
    let _this = this;

    var result = -1;
    this.advPairs.forEach(function (element) {
      let index = -element[0].length;
      if (word.endsWith(element[1]) && translation.endsWith(element[0])) {
        let wordIndex = -element[1].length;
        let translationIndex = -element[0].length;
        let adjSibilings = _this.isSibling(word.slice(0, wordIndex), translation.slice(0, translationIndex), _this.pairs);

        if (adjSibilings) {

          result = [element[1], element[0], adjSibilings[0], adjSibilings[1]];
        }
      }
    });
    if (result != -1) {
      return result;
    }
  }

  isChapeau(word, translation) {
    word = this.word;
    translation = this.translation;
    var result = -1;
    var couples = [
      ['ê', 'es'],
      ['û', 'us'],
      ['î', 'is'],
      ['ô', 'os'],
      ['â', 'as']
    ];

    couples.forEach(function (element) {
      if (word.includes(element[0]) && translation.includes(element[1])) {
        let new_word = word.replace(element[0], '');
        let new_trans = translation.replace(element[1], '');
        if (new_word == new_trans) {
          result = element;
        }
      }
    });
    if (result != -1) {
      return result;
    }
  }

  /**************************************************************/
  /* -----------------slight change detctors--------------------*/
  /**************************************************************/


  hasAFlippedLetter(word, translation) {
    word = this.word;
    translation = this.translation;
    if (word.length == translation.length) {
      var loc, c = -1;
      for (var i = 0; i < word.length; i++) {
        if (word[i] != translation[i]) {
          c++;
          if (c == 0) loc = i;
        }
        if (c > 0) break;
      }
      if (c == 0) return loc;
    }
  }

  hasALongertTranslation(word, translation) {
    word = this.word;
    translation = this.translation;
    if ((translation.length == word.length + 1)) {
      for (var i = 0; i < translation.length; i++) {
        var newTrans = translation.removeAt(i);
        if (newTrans == word) return i;
      }
    }
  }

  hasAShorterTranslation(word, translation) {
    word = this.word;
    translation = this.translation;
    if ((word.length == translation.length + 1)) {
      for (var i = 0; i < word.length; i++) {
        var newWord = word.removeAt(i);
        if (newWord == translation) return i;
      }
    }
  }

  
  /**************************************************************/
  /* -----------------complicated change detctors---------------*/
  /**************************************************************/

  isSiblingWithExtraLetter(word, translation, testingPairs) {

    let _this = this;
    word = this.word;
    translation = this.translation;

    for (var i = 0; i < translation.length; i++) {
      var newTrans = translation.removeAt(i);
      if (_this.isSibling(word, newTrans, testingPairs)) {
        return [i, _this.isSibling(word, newTrans, testingPairs)[0], _this.isSibling(word, newTrans, testingPairs)[1], 2];

      }
    }

    for (var j = 0; j < word.length; j++) {
      var newWord = word.removeAt(j);
      if (_this.isSibling(newWord, translation, testingPairs)) {
        return [j, _this.isSibling(newWord, translation, testingPairs)[0], _this.isSibling(newWord, translation, testingPairs)[1], 1];

      }
    }
  }



  isSiblingWithFlippedLetter(word, translation, testingPairs) {
    let _this = this;
    var result = -1;
    var result2;
    word = this.word;
    translation = this.translation;
    testingPairs.forEach(function (element) {
        let index = -element[0].length;
        if (translation.endsWith(element[0]) && word.endsWith(element[1])) {
          let newA = word.slice(0, -element[1].length);
          let newB = translation.slice(0, -element[0].length);

          if (_this.hasAFlippedLetter(newA, newB)) {
            result2 = _this.hasAFlippedLetter(newA, newB);
            result = element;
          }
        }
      }

    );
    if (result != -1) {
      return [result[1], result[0], result2];
    }
  }


  hasDoubleSiblingExtraLetter(word, translation) {
    let _this = this;
    word = this.word;
    translation = this.translation;

    for (var i = 0; i < translation.length; i++) {
      var newTrans = translation.removeAt(i);
      if (changeDetector.isDoupleSibling(word, newTrans)) {
        return [i, _this.isDoupleSibling(word, newTrans)[0], _this.isDoupleSibling(word, newTrans)[1], _this.isDoupleSibling(word, newTrans)[2], _this.isDoupleSibling(note.word, newTrans)[3], 2];
      }
    }

    for (var j = 0; j < word.length; j++) {
      var newWord = word.removeAt(j);
      if (changeDetector.isDoupleSibling(newWord, translation)) {
        return [j, _this.isDoupleSibling(newWord, translation)[0], _this.isDoupleSibling(newWord, translation)[1], _this.isDoupleSibling(newWord, translation)[2], _this.isDoupleSibling(newWord, translation)[3], 1];
      }
    }

  }


  hasDoubleSiblingflippedLetter(word, translation) {
    //TODO
  }

};
changeDetector = new ChangeDetector(note);




Marker = class {

  constructor(note, changeDetector) {
    this.note = note;
    this.changeDetector = this.changeDetector;
  }

  /*part1: the translation ending
  * part2: the french word ending
  * i the different letter index
  * x undifines : filpped letter change both words
  * x1 the extra letter in the word
  * x2 the extra letter in the translation */

  markSiplingsEnding(theWord, theTranslation, part1, part2, color1) {

    var styleStart1 = `<span style="color:${color1}"><u>`;
    var styleEnd = '</u></span>';

    theWordP1 = theWord.slice(0, -part1.length);
    highlitedWord = theWordP1 + styleStart1 + part1 + styleEnd;


    theTransP1 = theTranslation.slice(0, -part2.length);
    highlitedTrans = theTransP1 + styleStart1 + part2 + styleEnd;


    return [highlitedWord, highlitedTrans];
  }

  markChapeau(theWord, theTranslation, part1, part2, color1) {
    //TODO
  }


  highlightSpelling(nOfChanges, theWord, theTranslation, part1, part2, color1, color2, index, changePlace, otherTranslations, p3, p4) {
    var _this = this;
    let highletedWord;
    let highlightedTranslation;

    var styleStart1 =  `<span style="color:${color1}"><u>`;
    var styleStart2 =  `<span style="color:${color2}"><u>`;
    var styleEnd = '</u></span>';
    if (part1) var p1Index = -part1.length;
    if (part2) var p2Index = -part2.length;

    if (nOfChanges == 1 && index == null) {
      // if thye're siblings or chapeau

      highletedWord = _this.markSiplingsEnding(theWord, theTranslation, part1, part2, color1)[0];
      highlightedTranslation = _this.markSiplingsEnding(theWord, theTranslation, part1, part2, color1)[1];
      if (color1 == 'deeppink') {
        document.querySelector("#ribbon").className = "ribbon ribbon--pink";
      } else {
        document.querySelector("#ribbon").className = "ribbon ribbon--blue";
      }

    } else if (nOfChanges == 1 && index != null) {
      // if slight change (é instead of e or extra letter etc..)
      document.querySelector("#ribbon").className = "ribbon ribbon--pink";
      if (changePlace == 0) {
        //if the change in both word and translation
        highletedWord = theWord.replaceAt(index, styleStart1 + theWord[index] + styleEnd);
        highlightedTranslation = theTranslation.replace(theTranslation[index], styleStart1 + theTranslation[index] + styleEnd);
      } else if (changePlace == 1) {
        highletedWord = theWord.replaceAt(index, styleStart1 + theWord[index] + styleEnd);
        highlightedTranslation = theTranslation;

      } else if (changePlace == 2) {
        highletedWord = theWord;
        highlightedTranslation = theTranslation.replaceAt(index, styleStart1 + theTranslation[index] + styleEnd);
      }
    } else if (nOfChanges == 2 && index != null && p3 == null) {
      document.querySelector("#ribbon").className = "ribbon ribbon--blue";
      //if the letter is changed from the word to the translation (flipped letter)
      if (changePlace == 0) {
        highletedWord = theWord.replaceAt(index, styleStart2 + theWord[index] + styleEnd);
        highlightedTranslation = theTranslation.replaceAt(index, styleStart2 + theTranslation[index] + styleEnd);

        highletedWord = _this.markSiplingsEnding(highletedWord, highlightedTranslation, part1, part2, color1)[0];
        highlightedTranslation = _this.markSiplingsEnding(highletedWord, highlightedTranslation, part1, part2, color1)[1];

      } else if (changePlace == 1) {
        if (index == (theWord.length) - 1) {
          highletedWord = _this.markSiplingsEnding(theWord.slice(0, -1), theTranslation, part1, part2, color1)[0] + styleStart2 + theWord[index] + styleEnd;
          highlightedTranslation = _this.markSiplingsEnding(theWord.slice(0, -1), theTranslation, part1, part2, color1)[1];

        } else {
          highletedWord = theWord.replaceAt(index, styleStart2 + theWord[index] + styleEnd);
          highlightedTranslation = _this.markSiplingsEnding(highletedWord, theTranslation, part1, part2, color1)[1];
          highletedWord = _this.markSiplingsEnding(highletedWord, highlightedTranslation, part1, part2, color1)[0];
        }

      } else {

        if (index == (theTranslation.length) - 1) {
          highletedWord = _this.markSiplingsEnding(theWord, theTranslation.slice(0, -1), part1, part2, color1)[0];
          highlightedTranslation = _this.markSiplingsEnding(theWord, theTranslation.slice(0, -1), part1, part2, color1)[1] + styleStart2 + theTranslation[index] + styleEnd;

        } else {
          highlightedTranslation = theTranslation.replaceAt(index, styleStart2 + theTranslation[index] + styleEnd);
          highletedWord = _this.markSiplingsEnding(theWord, highlightedTranslation, part1, part2, color1)[0];
          highlightedTranslation = _this.markSiplingsEnding(highletedWord, highlightedTranslation, part1, part2, color1)[1];

        }

      }

    } else if (nOfChanges == 2 && index == null && p3 != null) {
      // if double sibling

      highletedWord = _this.markSiplingsEnding(theWord, theTranslation, part1, part2, '#07607d')[0];
      w1 = theWord.slice(0, -part1.length);
      w2 = w1.slice(0, -p3.length);
      highletedWord =` ${w2}<span style='color:#07607d'><u> ${p3} </u></span> ${styleEnd} ${styleStart1} ${part1} ${styleEnd}`;


      highlightedTranslation = _this.markSiplingsEnding(theWord, theTranslation, part1, part2, '#07607d')[1];
      t1 = theTranslation.slice(0, -part2.length);
      t2 = t1.slice(0, -p4.length);
      highlightedTranslation =`${t2} <span style='color:#07607d'><u> ${p4} </u></span> ${styleEnd} ${styleStart1} ${part2} ${styleEnd}`;


    } else if (nOfChanges == 2 && index != null && p3 != null) {
      if (changePlace == 0) {
        highletedWord = theWord.replaceAt(index, styleStart2 + theWord[index] + styleEnd);
        highletedWord = highletedWord.replace(p3, `<span style='color:#07607d'><u> ${p3}</u></span> ${styleEnd}`);
        highletedWord = highletedWord.replace(part1, styleStart1 + part1 + styleEnd);
        highlightedTranslation = theTranslation.replaceAt(index, styleStart2 + theTranslation[index] + styleEnd);
        highlightedTranslation = highlightedTranslation.replace(part2, styleStart1 + part2 + styleEnd);
        highlightedTranslation = highlightedTranslation.replace(p4, "<span style='color:#07607d'><u>" + p4 + "</u></span>" + styleEnd);

      } else if (changePlace == 1) {
        //if the change is in the word
        highletedWord = theWord.replaceAt(index, styleStart2 + theWord[index] + styleEnd);
        highletedWord = highletedWord.replace(p3, "<span style='color:#07607d'><u>" + p3 + "</u></span>" + styleEnd);
        highletedWord = highletedWord.replace(part1, styleStart1 + part1 + styleEnd);
        highlightedTranslation = theTranslation.replace(part2, styleStart1 + part2 + styleEnd);
        highlightedTranslation = highlightedTranslation.replace(p4, "<span style='color:#07607d'><u>" + p4 + "</u></span>" + styleEnd);


      } else {
        highletedWord = theWord.replace(p3, "<span style='color:#07607d'><u>" + p3 + "</u></span>" + styleEnd);
        highletedWord = highletedWord.replace(part1, styleStart1 + part1 + styleEnd);

        highlightedTranslation = theTranslation.replaceAt(index, styleStart2 + theTranslation[index] + styleEnd);
        highlightedTranslation = highlightedTranslation.replace(part2, styleStart1 + part2 + styleEnd);
        highlightedTranslation = highlightedTranslation.replace(p4, "<span style='color:#07607d'><u>" + p4 + "</u></span>" + styleEnd);
      }
    }

    if (document.querySelector('#word')) {
      document.querySelector('#word').innerHTML = highletedWord;
    } else if (document.querySelector('.masculine')) {
      document.querySelector('.masculine').innerHTML = highletedWord;
    } else if (document.querySelector('.word')) {
      // document.querySelector('.word').innerHTML =highletedWord
    }

    document.querySelector('.translationText').innerHTML = highlightedTranslation;

    if (highlightedTranslation == translation && highletedWord == note.word) {
      return false;
    }
  }

  mark() {

    let otherTranslations = note.translationWords.slice(1, );

    if (note.translationWords[0] == note.word) {
      document.querySelector("#ribbon").className = "ribbon ribbon--green";
    } else {

      let siblings = changeDetector.isSibling(note.word, note.translationWords[0], changeDetector.pairs);
      let adverbSibling = changeDetector.isSibling(note.word, note.translationWords[0], changeDetector.advPairs);
      let doupleSibling = changeDetector.isDoupleSibling(note.word, note.translationWords[0]);
      let chapeau = changeDetector.isChapeau(note.word, note.translationWords[0]);

      let flipped = changeDetector.hasAFlippedLetter(note.word, note.translationWords[0]);
      let longertTranslation = changeDetector.hasALongertTranslation(note.word, note.translationWords[0]);
      let shorterTranslation = changeDetector.hasAShorterTranslation(note.word, note.translationWords[0]);

      let siblingWithExtraLetter = changeDetector.isSiblingWithExtraLetter(note.word, note.translationWords[0], changeDetector.pairs);
      let siblingWithFlippedLetter = changeDetector.isSiblingWithFlippedLetter(note.word, note.translationWords[0], changeDetector.pairs);


      let advSiblingWithExtraLetter = changeDetector.isSiblingWithExtraLetter(note.word, note.translationWords[0], changeDetector.advPairs);
      let advsiblingWithFlippedLetter = changeDetector.isSiblingWithFlippedLetter(note.word, note.translationWords[0], changeDetector.advPairs);

      let doubleSiblingExtraLetter = changeDetector.hasDoubleSiblingExtraLetter(note.word, note.translationWords[0]);
      //let doubleSiblingflippedLetter = changeDetector.hasDoubleSiblingflippedLetter (note.word , note.translationWords[0]);


      if (siblings)
        return marker.highlightSpelling(1, note.word, note.translationWords[0], siblings[0], siblings[1], '#0099cc', null, null, null, otherTranslations);
      else if (adverbSibling)
        return marker.highlightSpelling(1, note.word, note.translationWords[0], adverbSibling[0], adverbSibling[1], '#0099cc', null, null, null, otherTranslations);
      else if (doupleSibling)
        return marker.highlightSpelling(2, note.word, note.translationWords[0], doupleSibling[0], doupleSibling[1], '#0099cc', '#07607d', null, null, otherTranslations, doupleSibling[2], doupleSibling[3]);
      else if (chapeau)
        return marker.highlightSpelling(1, note.word, note.translationWords[0], chapeau[0], chapeau[1], 'deeppink', null, null, null, otherTranslations);
      else if (flipped >= 0)
        return marker.highlightSpelling(1, note.word, note.translationWords[0], null, null, 'deeppink', null, flipped, 0, otherTranslations);
      else if (longertTranslation >= 0)
        return marker.highlightSpelling(1, note.word, note.translationWords[0], null, null, 'deeppink', null, longertTranslation, 2, otherTranslations);
      else if (shorterTranslation >= 0)
        return marker.highlightSpelling(1, note.word, note.translationWords[0], null, null, 'deeppink', null, shorterTranslation, 1, otherTranslations);
      else if (siblingWithExtraLetter)
        return marker.highlightSpelling(2, note.word, note.translationWords[0], siblingWithExtraLetter[1], siblingWithExtraLetter[2], '#0099cc', 'deeppink', siblingWithExtraLetter[0], siblingWithExtraLetter[3], otherTranslations);
      else if (advSiblingWithExtraLetter)
        return marker.highlightSpelling(2, note.word, note.translationWords[0], advSiblingWithExtraLetter[1], advSiblingWithExtraLetter[2], '#0099cc', 'deeppink', advSiblingWithExtraLetter[0], advSiblingWithExtraLetter[3], otherTranslations);
      else if (siblingWithFlippedLetter)
        return marker.highlightSpelling(2, note.word, note.translationWords[0], siblingWithFlippedLetter[0], siblingWithFlippedLetter[1], '#0099cc', 'deeppink', siblingWithFlippedLetter[2], 0, otherTranslations);
      else if (advsiblingWithFlippedLetter)
        return marker.highlightSpelling(2, note.word, note.translationWords[0], advsiblingWithFlippedLetter[0], advsiblingWithFlippedLetter[1], '#0099cc', 'deeppink', advsiblingWithFlippedLetter[2], 0, otherTranslations);
      else if (doubleSiblingExtraLetter)
        return marker.highlightSpelling(2, note.word, note.translationWords[0], doubleSiblingExtraLetter[1], doubleSiblingExtraLetter[2], '#0099cc', 'deeppink', doubleSiblingExtraLetter[0], doubleSiblingExtraLetter[5], otherTranslations, doubleSiblingExtraLetter[3], doubleSiblingExtraLetter[4]);
      else if (note.isVerb) {
        return true;
      } else {
        return false;
      }
      // else if (doubleSiblingflippedLetter)
      //   marker.highlightSpelling(2,word ,note.translationWords[0] ,doubleSiblingflippedLetter[1],doubleSiblingflippedLetter[2],'#0099cc','deeppink',doubleSiblingflippedLetter[0],0,otherTranslations,doubleSiblingflippedLetter[3],doubleSiblingflippedLetter[4]);
    }

  }

  markGender() {

    let siblings = changeDetector.isSibling(note.word, note.fem, changeDetector.femPairs);
    if (siblings) {

      document.querySelector("#ribbon").className = "";
      document.querySelector('.masculine').innerHTML = marker.markSiplingsEnding(note.word, fem, siblings[0], siblings[1], '#0099cc')[0];
      document.querySelector('.feminin').innerHTML = marker.markSiplingsEnding(note.word, fem, siblings[0], siblings[1], '#0099cc')[1];
    } else if (note.word + 'e' == note.fem) {
      document.querySelector("#ribbon").className = "";
      document.querySelector('.feminin').innerHTML = note.fem.slice(0, -1) + "<span style='color:#0099cc'><u>e</u></span>";
    } else if (note.word + note.word[note.word.length - 1] + 'e' == note.fem) {
      document.querySelector("#ribbon").className = "";
      document.querySelector('.feminin').innerHTML = note.fem.slice(0, -2) + "<span style='color:#0099cc'><u>" + note.word[note.word.length - 1] + "e</u></span>";
    } else if (note.word.endsWith('e') && note.word == note.fem) {
      document.querySelector("#ribbon").className = "";
      document.querySelector('.masculine').innerHTML = note.word.slice(0, -1) + "<span style='color:#0099cc'><u>e</u></span>";
      document.querySelector('.feminin').innerHTML = note.fem.slice(0, -1) + "<span style='color:#0099cc'><u>e</u></span>";
    }

  }

  markCustome() {
    document.querySelector('.translationText').innerHTML = note.html_translation;
    if (document.querySelector('#word')) {
      document.querySelector('#word').innerHTML = note.html_word;
    }

    //document.querySelector('.word').innerHTML = note.html_word
    else if (document.querySelector('.masculine')) {
      document.querySelector('.masculine').innerHTML = note.html_word;
    } else if (document.querySelector('.word')) {
      document.querySelector('.word').innerHTML = note.html_word;
    }
    styleManipulator.splitTranslation();
  }


  displaypPlural() {
    let siblings = changeDetector.isSibling(note.word, note.plural, changeDetector.plPairs);
    let word2;
    if (siblings) {
      pluralText = marker.markSiplingsEnding(note.word, note.plural, siblings[0], siblings[1], '#0099cc')[1];
      word2 = marker.markSiplingsEnding(note.word, note.plural, siblings[0], siblings[1], '#0099cc')[0];
    } else if (note.word + 's' == note.plural) {

      pluralText = note.plural.slice(0, -1) + "<span style='color:#0099cc'><u>s</u></span>";
      word2 = note.word;
    } else {
      pluralText = note.plural;
      word2 = note.word;
    }

    if (note.type.includes('noun') && !(note.type.includes('fem') && note.type.includes('mas'))) {

      var pluralText = word2 + "&nbsp <img class='plural-arrow-icon' src='arrow1.png'/>&nbsp" + pluralText;
      document.getElementsByClassName("word")[0].innerHTML = pluralText;
    } else {
      document.querySelector('#plural').innerHTML = pluralText;
      document.querySelector('#plural').style.display = ('block');
      document.getElementsByClassName("masculine")[0].innerHTML = word2;
    }

  }


  markVerbEnding() {
    let new_html;
    let org_html = document.querySelector("#word").innerText;
    let group = document.querySelector("#group").innerHTML;

    var lastChar = org_html[org_html.length - 1];
    var start = org_html.slice(0, -2);
    lastChar = org_html.slice(-2);
    if (group.trim() == "one") {

      new_html = start + "<span class='verb-first-group-ending'>" + lastChar + "</span>";
      document.querySelector("#word").innerHTML = new_html;
    } else if (group.trim() == "two") {
      new_html = start + "<span class='verb-second-group-ending'>" + lastChar + "</span>";
      document.querySelector("#word").innerHTML = new_html;
    } else if (group.trim() == "three") {
      new_html = start + "<span class='verb-third-group-ending'>" + lastChar + "</span>";
      document.querySelector("#word").innerHTML = new_html;
    }
  }

  unMark() {
    document.querySelector("#ribbon").className = "";
    document.querySelector('.translationText').innerHTML = note.translation;

    if (document.querySelector('.word') && (note.type.includes('noun') && !(note.type.includes('fem') && note.type.includes('mas')))) {
      document.querySelector('.word').innerHTML = note.word;
    }
    if (document.querySelector('#word'))
      document.querySelector('#word').innerHTML = note.word;

    if (document.querySelector('.masculine')) {
      document.querySelector('.masculine').innerHTML = note.word;
    }

    if (note.fem) {
      document.querySelector('.feminin').innerHTML = note.fem;
    }

    if (document.querySelector('.plural')) {
      document.querySelector('.plural').style.display = 'none';
    }
    document.querySelector('#ribbon').className = "";
    styleManipulator.splitTranslation();
  }

};
marker = new Marker(note, changeDetector);




NoteExtras = class {
  constructor(note) {
    this.note = note;
  }



  highlightWord(id) {
    if (id == 'highlightNone') {
      marker.unMark();
    } else if (id == 'highlightRoots') {
      marker.unMark();
      if (note.isVerb) {
        marker.markVerbEnding();
      } else {
        marker.mark();
      }
    } else if (id == 'highlightCustom') {
      marker.unMark();
      marker.markCustome();
    } else if (id == 'highlightGender') {
      marker.unMark();
      marker.markGender();
    } else if (id == 'highlightPlural') {
      marker.unMark();
      marker.displaypPlural();
    }
  }


  dispalyOption(id) {
    let extraOptions = document.getElementsByName('extraOptions');

    for (var i = 0, max = options.length; i < max; i++) {
      options[i].style.backgroundColor = '#f3dcf500';
    }
    for (i = 0, max = extraOptions.length; i < max; i++) {
      extraOptions[i].style.display = 'none';
    }

    document.getElementById(id).style.backgroundColor = '#60f0ad';
    if (id == 'root') {
      document.querySelector("#extraDiv").style.display = "block";
    } else if (id == "brain") {
      document.querySelector("#mnemonicDiv").style.display = "block";
    } else if (id == "tagsico") {
      document.querySelector("#tagsDiv").style.display = "block";
    }

  }



  checkIPABox(checker) {
    if (checker == true) {
      document.getElementsByClassName("ipa")[0].style.display = "block";
    } else if (checker == false) {
      document.getElementsByClassName("ipa")[0].style.display = "none";
    }
  }


  checkMaturity(checker) {
    if (checker == true) {
      document.getElementsByClassName("card-maturity")[0].style.display = "block";
    } else if (checker == false) {
      document.getElementsByClassName("card-maturity")[0].style.display = "none";
    }

  }



  checkPOSBox(checker) {

    if (checker == true) {
      document.getElementsByClassName("type-corner")[0].style.display = "block";
    } else if (checker == false) {
      document.getElementsByClassName("type-corner")[0].style.display = "none";
    }
  }


  checkExtraExamplesBox(checker) {
    let checkEX = document.querySelector('#oEX');
    if (checker == true) {
      if (note.bank == null || note.bank_length == 1) {
        checkEX.checked = false;
        utils.disableMenuOption("oEX");
        document.querySelector("#previousIcon").style.display = "none";
        document.querySelector("#nxtIcon").style.display = "none";
        document.querySelector("#noOfEx").style.display = "none";
        document.querySelector("#frenchExamble").style.display = "block";
      } else {
        checkEX.checked = true;
        document.querySelector("#previousIcon").style.display = "inline-block";
        document.querySelector("#nxtIcon").style.display = "inline-block";
        document.querySelector("#noOfEx").style.display = "block";
        document.querySelector("#frenchExamble").style.display = "inline-block";

      }

    } else if (checker == false) {
      checkEX.checked = false;
      document.querySelector("#previousIcon").style.display = "none";
      document.querySelector("#nxtIcon").style.display = "none";
      document.querySelector("#noOfEx").style.display = "none";
      document.querySelector("#frenchExamble").style.display = "block";
    }

  }




  dispalymenu(status) {

    if (status == 'close') {

      document.querySelector('.menus').style.backgroundColor = "#f3dcf500";
      document.querySelector('.menu_hidable').style.display = "none";
      document.querySelector(".menu__head__icon--open").style.display = "block";
      window.menuStatus = 'open';
    } else {

      document.querySelector('.menus').style.backgroundColor = "#f3dcf5d4";
      document.querySelector('.menu_hidable').style.display = "block";
      document.querySelector(".menu__head__icon--open").style.display = "none";
      window.menuStatus = 'close';
    }

  }







  prepMaturityStatus() {
    let stars = ['star1', 'star2', 'star3', 'nostar1', 'nostar2', 'nostar3'];
    if (note.ivl == null) {
      stars.forEach(star => document.getElementById(star).style.display = 'none');
    } else if (note.ivl == 0) {
      [stars[1], stars[2], stars[3]].forEach(star => document.getElementById(star).style.display = 'none');
    } else if (note.ivl < 21) {
      [stars[2], stars[3], stars[4]].forEach(star => document.getElementById(star).style.display = 'none');
    } else {
      [stars[3], stars[4], stars[5]].forEach(star => document.getElementById(star).style.display = 'none');
    }
  }



  prepOptionsMenu() {
    let current_index = -1;
    if (note.fem == null) {
      utils.disableMenuOption("highlightGender");
    }
    if (note.plural == null) {
      utils.disableMenuOption("highlightPlural");
    }
    if (note.html_word == note.word) {
      utils.disableMenuOption("highlightCustom");
    }
    if (marker.mark() == false) {
      utils.disableMenuOption("highlightRoots");
    }
    if (note.bank == null || note.bank_length == 1) {
      /* utils.disableMenuOption("oEX") ;  document.querySelector("#previousIcon").style.display = "none";document.querySelector("#nxtIcon").style.display = "none"; */
    } else {
      var indexOnScreen = 1;
      document.querySelector('#noOfEx').innerHTML = "<br> example " + indexOnScreen + " of " + note.bank_length;
      let current_example = utils.textId('frenchExamble');
      for (var i = 0; i < note.bank_length; i++) {
        if (current_example.toLowerCase() == note.bank[i].fr.toLowerCase()) {
          current_index = i;
          break;
        }
      }

    }

    return [current_index, indexOnScreen];
  }


  prepHighlightingMenu() {
    var _this = this;
    window.selectedHighlightingId = window.selectedHighlightingId || config.defaultHighlightingSelection;
    if (window.selectedHighlightingId) {
      if (document.getElementById(window.selectedHighlightingId)) {
        if (document.getElementById(window.selectedHighlightingId).disabled == false)
          var radio = document.getElementById(window.selectedHighlightingId);
        else {
          window.selectedHighlightingId = config.defaultHighlightingSelection;
          var radio = document.getElementById(window.selectedHighlightingId);
          radio.checked = 'checked';
          _this.highlightWord(window.selectedHighlightingId);
        }
      } else window.selectedHighlightingId = config.defaultHighlightingSelection;
      var radio = document.getElementById(window.selectedHighlightingId);
      radio.checked = 'checked';
      _this.highlightWord(window.selectedHighlightingId);
    }


    var radios = document.getElementsByName('highilightingOptions');
    for (var i = 0, max = radios.length; i < max; i++) {

      radios[i].addEventListener('change', function () {
        window.selectedHighlightingId = this.id;
        _this.highlightWord(window.selectedHighlightingId);

      }, false);
    }


  }


  prepAttatchmentsMenu() {
    var _this = this;
    let extraOptions = document.getElementsByName('extraOptions');


    if (document.querySelector("#extra")) {
      let extra = document.querySelector("#extra").innerHTML;
      if (config.interestInArabic == true && extra.includes("rabic")) {
        window.optionId = 'root';
      } else {
        window.optionId = config.defaultExtraSelection;
      }
    }



    window.optionId = window.optionId || configdefaultExtraSelection;
    if (window.optionId != 0) {
      let option = document.getElementById(window.optionId);
      option.style.backgroundColor = '#60f0ad';
      _this.dispalyOption(window.optionId);

    }

    for (var i = 0, max = options.length; i < max; i++) {

      options[i].onclick = function () {
        window.optionId = this.id;
        _this.dispalyOption(window.optionId);

      };
    }
  }


  prepExtraOptionsMenu() {
    var _this = this;
    let checkIPA = document.querySelector('#oIPA');
    if (window.checkedIPA === undefined) {
      window.checkedIPA = config.defaultIPA;
      checkIPA.checked = config.defaultIPA;
    }
    _this.checkIPABox(window.checkedIPA);
    checkIPA.checked = window.checkedIPA;
    checkIPA.addEventListener('change', function () {
      window.checkedIPA = checkIPA.checked;
      _this.checkIPABox(checkIPA.checked);
    });



    let checkPOS = document.querySelector('#oPOS');
    if (window.checkedPOS === undefined) {
      window.checkedPOS = config.defaultPOS;
      checkPOS.checked = config.defaultPOS;
    }
    _this.checkPOSBox(window.checkedPOS);
    checkPOS.checked = window.checkedPOS;
    checkPOS.addEventListener('change', function () {
      window.checkedPOS = checkPOS.checked;
      _this.checkPOSBox(checkPOS.checked);
    });


    let checkEX = document.querySelector('#oEX');
    if (window.checkedEX === undefined) {
      window.checkedEX = config.defaultExtraExamples;
      _this.checkExtraExamplesBox(window.checkedEX);

    } else {
      _this.checkExtraExamplesBox(window.checkedEX);
    }

    checkEX.addEventListener('change', function () {
      window.checkedEX = checkEX.checked;
      _this.checkExtraExamplesBox(checkEX.checked);
    });




    let checkMut = document.querySelector('#oMut');
    if (window.checkedMut === undefined) {
      window.checkedMut = config.defaultmaturityState;
      checkMut.checked = config.defaultmaturityState;
    }
    _this.checkMaturity(window.checkedMut);
    checkMut.checked = window.checkedMut;

    checkMut.addEventListener('change', function () {
      window.checkedMut = checkMut.checked;
      _this.checkMaturity(checkMut.checked);
    });

  }

  prepMainMenu() {
    var _this = this;
    if (window.menuStatus == undefined) {
      window.menuStatus = 'close';
      document.getElementsByClassName("menu__head__icon--open")[0].style.display = "none";
    } else if (window.menuStatus == 'open') {
      _this.dispalymenu('close');
    } else {
      _this.dispalymenu('open');
    }


    document.getElementsByClassName("menu__head__icon")[0].addEventListener("click", function () {
      _this.dispalymenu(window.menuStatus);
    });

    document.getElementsByClassName("menu__head__icon--open")[0].addEventListener("click", function () {
      _this.dispalymenu(window.menuStatus);
    });

  }


};
noteExtras = new NoteExtras(note);
noteExtras.prepMaturityStatus();
current_index = noteExtras.prepOptionsMenu()[0];
indexOnScreen = noteExtras.prepOptionsMenu()[1];
noteExtras.prepHighlightingMenu();
noteExtras.prepAttatchmentsMenu();
noteExtras.prepExtraOptionsMenu();
noteExtras.prepMainMenu();

/***************************************************************************************/




function addAPlayButton(src) {
  return `
  <audio  autoplay id="player" src="${src}"></audio>

       <a class="replay-button" onclick="document.querySelector('#player').play()">
         <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 480 480" style="enable-background:new 0 0 480 480;" xml:space="preserve">
         <path style="fill:#455A64;" d="M278.944,17.577c-5.568-2.656-12.128-1.952-16.928,1.92L106.368,144.009H32
           c-17.632,0-32,14.368-32,32v128c0,17.664,14.368,32,32,32h74.368l155.616,124.512c2.912,2.304,6.464,3.488,10.016,3.488
           c2.368,0,4.736-0.544,6.944-1.6c5.536-2.656,9.056-8.256,9.056-14.4v-416C288,25.865,284.48,20.265,278.944,17.577z"></path>
         <g>
           <path style="fill:#FFC107;" d="M368.992,126.857c-6.304-6.208-16.416-6.112-22.624,0.128c-6.208,6.304-6.144,16.416,0.128,22.656
             C370.688,173.513,384,205.609,384,240.009s-13.312,66.496-37.504,90.368c-6.272,6.176-6.336,16.32-0.128,22.624
             c3.136,3.168,7.264,4.736,11.36,4.736c4.064,0,8.128-1.536,11.264-4.64C399.328,323.241,416,283.049,416,240.009
             S399.328,156.777,368.992,126.857z"></path>
           <path style="fill:#FFC107;" d="M414.144,81.769c-6.304-6.24-16.416-6.176-22.656,0.096c-6.208,6.272-6.144,16.416,0.096,22.624
             C427.968,140.553,448,188.681,448,240.009s-20.032,99.424-56.416,135.488c-6.24,6.24-6.304,16.384-0.096,22.656
             c3.168,3.136,7.264,4.704,11.36,4.704c4.064,0,8.16-1.536,11.296-4.64C456.64,356.137,480,299.945,480,240.009
             S456.64,123.881,414.144,81.769z"></path>
         </g>
         <g>
         </g>
         <g>
         </g>
         <g>
         </g>
         <g>
         </g>
         <g>
         </g>
         <g>
         </g>
         <g>
         </g>
         <g>
         </g>
         <g>
         </g>
         <g>
         </g>
         <g>
         </g>
         <g>
         </g>
         <g>
         </g>
         <g>
         </g>
         <g>
         </g>
         </svg>

       </a>

  `;

}

function anotherExample(next) {
  current_index += next;
  indexOnScreen += next;
  if (indexOnScreen > note.bank_length) {
    indexOnScreen = 1;
  } else if (indexOnScreen <= 0) {
    indexOnScreen = note.bank_length;
  }
  document.querySelector('#noOfEx').innerHTML = "<br> example " + indexOnScreen + " of " + note.bank_length;
  if (current_index == note.bank_length) {
    current_index = 0;
  } else if (current_index == (-1)) {
    current_index = note.bank_length - 1;
  }

  styleManipulator.markFrenchWordInTheExample(note.bank[current_index].fr, note.bank[current_index].en);
  document.querySelector('#exampleSound').innerHTML = addAPlayButton(note.bank[current_index].audio);



  // "<span> <audio preload='none' style='margin-button:-20px;' controls ><source type='audio/mp3' src="+bank[current_index]['audio']+" /></span>"



  // document.getElementById('exampleSound').childNodes[1].innerHTML = '[sound:'+ bank[current_index]['audio']+']'

}