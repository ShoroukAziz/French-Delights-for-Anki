
/************************************************************************/
 pairs = [ ['alt','alte'] , ['arian','aire'] ,  ['gen','gène'] , ['graph','graphe'] , ['ic','ique'] , ['isk','isque'] , ['ism','isme'],
['ist','iste'] , ['meter','mètre'] , ['mony','monie'] , ['oid' , 'oide'] , ['or' , 'eur'] , ['ot' , 'ote'] , ['sis' , 'se'] , ['ter' , 'tre'],
['ty','té'] , ['y','ie'] , ['acious' , 'ace'] , ['an','ain'] , ['ar' , 'aire'] , ['arious','aire'] , ['ary','aire'] , ['ferrous' , 'fère'] ,
 ['ical','ique'] , ['id' , 'ide'] , ['ine' , 'in'],
['ite','it'] , ['ive','if'] , ['nal','ne'] , ['ocious','oce'] , ['ous' , 'eux'] , ['und','ond'] , ['ure','ur'] ,
['ent','em'],['ect','ait'], ['act','aite'],['ate','ative'] ,['k','que'],['er','re'],['ous','e'],['ious','aire'],['ous','ique'],['ed','é']
]

 advPairs = [['y','ement'], ['ally','ellement'],['ly','ement'],['ly','ément'],['ly','ment']  ]

 femPairs = [ ['ère','er'] , ['se','s'] , ['ve','f'] , ['euse','eux'] , ['che','c'] , ['euse','eur'] ,
          ,['teuse','teur'] , ['eresse','eur'] , ['elle','eau'] , ['olle','ou'] , ['aîtresse','aître']]

 plPairs = [['aux','al'],['oux','ou'],['aux','ail'],['aux','au'],['eaux','eau'],['s','s'],['x','x'],['z','z']]

/***************************************************************************/

// Helpers functions

String.prototype.removeAt=function(index) {
  return this.substr(0, index) + this.substr(index+1,);
}
String.prototype.replaceAt=function(index, replacement) {
  return this.substr(0, index) + replacement+ this.substr(index+1,);
}

function strip(html){
  var doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || "";
}

/***************************************************************************/

// the word the HTML styling tags
var html_word =document.getElementById('word').innerHTML.trim();
word = strip(html_word.trim());

// the translation with the HTML styling tags
var html_translation = document.getElementsByClassName('translationText')[0].innerHTML;
translation = strip(html_translation.trim());


/******************************************/

if(document.getElementsByClassName('feminin')[0]){
    fem = strip(document.getElementsByClassName('feminin')[0].innerHTML.trim())
}
else{
  fem = null
  document.getElementById("o4").disabled = true;
  document.getElementById("o4").parentElement.style.color = '#4f5154';
}

if(document.getElementById('pluralM')){
    pluralM = strip(document.getElementById('pluralM').innerHTML.trim())
}
else if(document.getElementsByClassName('noun-plural')[0]){

    // for nouns
     //pass
}
else{
  // for verbs and adverbs
  pluralM = null
  document.getElementById("o5").disabled = true;
  document.getElementById("o5").parentElement.style.color = '#4f5154';
}

// if no custom HTML mrking
if (html_word == word){
  document.getElementById("o3").disabled = true;
  document.getElementById("o3").parentElement.style.color = '#4f5154';
}

/***************************************************************************/

/**
 *  Remove the extra new line tag that Anki adds at the end of the audio fields
*/
soundFieldsIds = ['wordSound','exampleSound','femeSound','pSound']

soundFieldsIds.forEach(removeExtraNewLineTagInSoundFields);
function removeExtraNewLineTagInSoundFields(item)
{
  if(document.getElementById(item)){
    if(document.getElementById(item).innerHTML.endsWith('<br>'))
    document.getElementById(item).innerHTML=document.getElementById(item).innerHTML.slice(0,-4)
  }
}

/***************************************************************************/

function prepareFields(){
  document.getElementsByClassName('translationText')[0].innerHTML = translation
  document.getElementById('word').innerHTML = word
}
function markFrenchWordInTheExample (){
  document.getElementById('frenchExamble').innerHTML =document.getElementById('frenchExamble').innerHTML.replace(word,"<span style='color:red; background-color:#c2e653bd;'>"+word+"</span>")

}
prepareFields()
markFrenchWordInTheExample ()


/***************************************************************************************************************/
/* -------------------------------------------Siblings detctors--- --------------------------------------------*/
/***************************************************************************************************************/


function isSibling (word , translation , testingPairs){
  var result = -1
  testingPairs.forEach(function(element){
    wordIndex = -element[1].length
    translationIndex = -element[0].length
    if(word.endsWith(element[1]) && translation.endsWith(element[0])){

      if(translation.slice(0,translationIndex) == word.slice(0,wordIndex)){
          result =  element;
      }
    }
  }
);
if (result != -1)return [result[1],result[0]]
}

/*********************************************/


function isDoupleSibling (word , translation){

  var result = -1
  advPairs.forEach(function(element){
    index = -element[0].length
    if( word.endsWith(element[1]) &&  translation.endsWith(element[0]) )
    {
      wordIndex = -element[1].length
      translationIndex = -element[0].length
      adjSibilings = isSibling(word.slice(0,wordIndex),translation.slice(0,translationIndex),pairs)

      if (adjSibilings) {

          result = [element[1] , element[0] ,adjSibilings[0] , adjSibilings [1]  ]
      }
  }
}
);
if (result != -1){
  return result
}
}

/****************************************/
function isChapeau (word,translation){
  var result = -1
  var couples =[['ê','es'],['û','us'],['î','is'],['ô','os'],['â','as']]

  couples.forEach(function(element){
    if(word.includes(element[0]) && translation.includes(element[1])  ){
      new_word = word.replace(element[0],'')
      new_trans = translation.replace(element[1],'')
      if(new_word == new_trans){
        result =  element
      }
    }
  });
  if (result != -1){
    return result
  }
}


/****************************************************************************************************/
/* ---------------------------------------slight change detctors------------------------------------*/
/****************************************************************************************************/


function hasAFlippedLetter (word , translation){

  if(word.length == translation.length )
  {
    var loc ,  c = -1
    for(var i=0 ; i < word.length ; i++ ){
      if(word[i]  != translation[i] ){
        c++;
        if (c == 0) loc = i
      }
      if(c>0)  break;
    }
    if (c == 0)  return loc
  }
}
/*********************************************/
function hasALongertTranslation(word,translation){
  if((translation.length  ==  word.length+1) )
  {
    for (var i=0; i<translation.length ; i++){
      var newTrans  = translation.removeAt(i);
      if (newTrans == word) return i
    }
  }
}
/*********************************************/
function hasAShorterTranslation(word,translation){
  if((word.length  ==  translation.length+1) )
  {
    for (var i=0; i<word.length ; i++){
      var newWord  = word.removeAt(i);
      if (newWord == translation) return i
    }
  }
}

/***********************************************************************************************/
/* ---------------------------------------complicated change detctors--------------------------*/
/***********************************************************************************************/

function isSiblingWithExtraLetter(word,translation,testingPairs){

  for (var i=0; i<translation.length ; i++){
    var newTrans  = translation.removeAt(i);
    if (isSibling (word,newTrans,testingPairs) ){
      // console.log("has A different Letter in translation And A Sibling");
      return [i , isSibling (word,newTrans,testingPairs)[0] ,isSibling (word,newTrans,testingPairs)[1] , 2 ]

    }
  }

  for (var j=0; j<word.length ; j++){
    var newWord  = word.removeAt(j);
    if (isSibling (newWord,translation,testingPairs) ){
      // console.log("has A different Letter in word And A Sibling");
      return [j , isSibling (newWord,translation,testingPairs)[0] , isSibling  (newWord,translation,testingPairs)[1] , 1 ]

    }
  }
}

/*********************************************/

function isSiblingWithFlippedLetter (word ,translation,testingPairs){
  var result = -1

  testingPairs.forEach(function(element){
    index = -element[0].length
    if( translation.endsWith(element[0]) &&  word.endsWith(element[1]) )
    {
      newA=  word.slice(0,-element[1].length)
      newB = translation.slice(0,-element[0].length)

      if(hasAFlippedLetter (newA , newB)){
        result2 = hasAFlippedLetter (newA , newB)
        result =  element
        // console.log("is Sibling With Flipped Letter");
      }
    }
  }

);
if (result != -1){
  return [result[1] , result[0] , result2]
}
}
/*********************************************/

function hasDoubleSiblingExtraLetter (word,translation){

  for (var i=0; i<translation.length ; i++){
    var newTrans  = translation.removeAt(i);
    if (isDoupleSibling (word,newTrans) ){
      // console.log("Adverb Douple Sibling With Diff Letter in translation");
      return [i , isDoupleSibling(word,newTrans)[0] , isDoupleSibling (word,newTrans)[1],isDoupleSibling (word,newTrans)[2],isDoupleSibling (word,newTrans)[3] , 2 ]
    }
  }

  for (var j=0; j<word.length ; j++){
    var newWord  = word.removeAt(j);
    if (isDoupleSibling (newWord,translation) ){
      // console.log("Adverb Douple Sibling With DiffLetter in word");
      return [j , isDoupleSibling (newWord,translation)[0] , isDoupleSibling (newWord,translation)[1],isDoupleSibling (newWord,translation)[2],isDoupleSibling (newWord,translation)[3] , 1 ]
    }
  }

}

/*********************************************/
function hasDoubleSiblingflippedLetter (word ,translation){
//TODO
}

/*****************************************************************************/

//part1: the translation ending
//part2: the french word ending
//i the different letter index
//x undifines : filpped letter change both words
//x1 the extra letter in the word
//x2 the extra letter in the translation

function markSiplingsEnding (theWord , theTranslation ,  part1 , part2 , color1){

  var styleStart1 = '<span style="color:'+color1+'"><u>'
  var styleEnd = '</u></span>'

  theWordP1= theWord.slice(0,-part1.length)
  highlitedWord = theWordP1 + styleStart1 +part1 +styleEnd


  theTransP1= theTranslation.slice(0,-part2.length)
  highlitedTrans = theTransP1 + styleStart1 +part2 +styleEnd


  return [highlitedWord ,highlitedTrans ]
}

function highlightSpelling (nOfChanges , theWord , theTranslation ,  part1 , part2 ,  color1 , color2 , index , changePlace , otherTranslations,p3,p4){
  var styleStart1 = '<span style="color:'+color1+'"><u>'
  var styleStart2 = '<span style="color:'+color2+'"><u>'
  var styleEnd = '</u></span>'
  if(part1)   var p1Index = -part1.length
  if(part2) var p2Index = -part2.length


  // console.log( part1 , part2 ,p3,p4,index,changePlace)

  if (nOfChanges == 1 && index == null){
    // if thye're siblings or chapeau

    highletedWord = markSiplingsEnding(theWord , theTranslation ,  part1 , part2,color1) [0]
    highlightedTranslation = markSiplingsEnding(theWord , theTranslation ,  part1 , part2,color1) [1]
    if (color1 =='deeppink'){
          document.getElementById("ribbon").className="ribbon ribbon--pink";
    }
    else{
          document.getElementById("ribbon").className="ribbon ribbon--blue";
    }

  }
  else if (nOfChanges == 1  && index != null){
    // if slight change (é instead of e or extra letter etc..)
      document.getElementById("ribbon").className="ribbon ribbon--pink";
    if(changePlace == 0){
      //if the change in both word and translation
      highletedWord = theWord.replaceAt(index,styleStart1+theWord[index]+styleEnd)
      highlightedTranslation = theTranslation.replace(theTranslation[index],styleStart1+theTranslation[index]+styleEnd)
    }
    else if (changePlace == 1){
      highletedWord = theWord.replaceAt(index,styleStart1+theWord[index]+styleEnd)
      highlightedTranslation = theTranslation

    }
    else if(changePlace ==2){
      highletedWord = theWord
      highlightedTranslation = theTranslation.replaceAt(index,styleStart1+theTranslation[index]+styleEnd)
    }
  }
  else if (nOfChanges == 2  && index != null && p3== null) {
    document.getElementById("ribbon").className="ribbon ribbon--blue";
    //if the letter is changed from the word to the translation (flipped letter)
    if (changePlace == 0){
      highletedWord = theWord.replaceAt(index,styleStart2+theWord[index]+styleEnd)
      highlightedTranslation = theTranslation.replaceAt(index,styleStart2+theTranslation[index]+styleEnd)

      highletedWord = markSiplingsEnding(highletedWord , highlightedTranslation ,  part1 , part2,color1) [0]
      highlightedTranslation = markSiplingsEnding(highletedWord , highlightedTranslation ,  part1 , part2,color1) [1]

    }
    else if (changePlace == 1){
       if (index == (theWord.length)-1 ){
         highletedWord = markSiplingsEnding(theWord.slice(0,-1) , theTranslation ,  part1 , part2,color1) [0] + styleStart2 + theWord[index] + styleEnd
         highlightedTranslation = markSiplingsEnding(theWord.slice(0,-1) , theTranslation ,  part1 , part2,color1) [1]

       }
       else{
         highletedWord = theWord.replaceAt(index,styleStart2+theWord[index]+styleEnd)
         highlightedTranslation = markSiplingsEnding(highletedWord , theTranslation ,  part1 , part2,color1) [1]
         highletedWord = markSiplingsEnding(highletedWord , highlightedTranslation ,  part1 , part2,color1) [0]
       }

    }
    else {

      if (index == (theTranslation.length)-1 ){
        highletedWord = markSiplingsEnding(theWord, theTranslation.slice(0,-1),  part1 , part2,color1) [0]
        highlightedTranslation = markSiplingsEnding(theWord, theTranslation.slice(0,-1)  ,  part1 , part2,color1) [1] + styleStart2 + theTranslation[index] + styleEnd

      }
      else{
        highlightedTranslation =theTranslation.replaceAt(index,styleStart2+theTranslation[index]+styleEnd)
        highletedWord = markSiplingsEnding(theWord , highlightedTranslation ,  part1 , part2,color1) [0]
        highlightedTranslation = markSiplingsEnding(highletedWord , highlightedTranslation ,  part1 , part2,color1) [1]

      }

    }

  }
  else if (nOfChanges == 2  && index == null && p3 != null ){
    // if double sibling

      highletedWord =  markSiplingsEnding (theWord , theTranslation ,  part1 , part2 , '#07607d')[0]
      w1 = theWord.slice(0,-part1.length)
      w2 = w1.slice(0,-p3.length)
      highletedWord =  w2 + "<span style='color:#07607d'><u>"+p3+"</u></span>"+styleEnd + styleStart1 + part1 +styleEnd


      highlightedTranslation =  markSiplingsEnding (theWord , theTranslation ,  part1 , part2 , '#07607d')[1]
      t1=theTranslation.slice(0,-part2.length)
      t2=t1.slice(0,-p4.length)
      highlightedTranslation = t2 + "<span style='color:#07607d'><u>"+p4+"</u></span>"+styleEnd + styleStart1 + part2 +styleEnd


  }
  else if (nOfChanges == 2  && index != null && p3 != null) {
    if (changePlace == 0){
      highletedWord = theWord.replaceAt(index,styleStart2+theWord[index]+styleEnd)
      highletedWord = highletedWord.replace(p3,"<span style='color:#07607d'><u>"+p3+"</u></span>"+styleEnd)
      highletedWord = highletedWord.replace(part1,styleStart1+part1+styleEnd)
      highlightedTranslation = theTranslation.replaceAt(index,styleStart2+theTranslation[index]+styleEnd)
      highlightedTranslation = highlightedTranslation.replace(part2,styleStart1+part2+styleEnd)
      highlightedTranslation = highlightedTranslation.replace(p4,"<span style='color:#07607d'><u>"+p4+"</u></span>"+styleEnd)

    }
    else if (changePlace == 1){
      //if the change is in the word
      highletedWord = theWord.replaceAt(index,styleStart2+theWord[index]+styleEnd)
      highletedWord = highletedWord.replace(p3,"<span style='color:#07607d'><u>"+p3+"</u></span>"+styleEnd)
      highletedWord = highletedWord.replace(part1,styleStart1+part1+styleEnd)
      highlightedTranslation = theTranslation.replace(part2,styleStart1+part2+styleEnd)
      highlightedTranslation = highlightedTranslation.replace(p4,"<span style='color:#07607d'><u>"+p4+"</u></span>"+styleEnd)


    }
    else {
      highletedWord = theWord.replace(p3,"<span style='color:#07607d'><u>"+p3+"</u></span>"+styleEnd)
      highletedWord = highletedWord.replace(part1,styleStart1+part1+styleEnd)

      highlightedTranslation = theTranslation.replaceAt(index,styleStart2+theTranslation[index]+styleEnd)
      highlightedTranslation = highlightedTranslation.replace(part2,styleStart1+part2+styleEnd)
      highlightedTranslation = highlightedTranslation.replace(p4,"<span style='color:#07607d'><u>"+p4+"</u></span>"+styleEnd)
    }
  }

  if(document.getElementById('word')){
    document.getElementById('word').innerHTML =highletedWord
  }
  else if( document.getElementsByClassName('masculine')[0]){
      document.getElementsByClassName('masculine')[0].innerHTML =highletedWord
  }
  else if( document.getElementsByClassName('word')[0]){
    // document.getElementsByClassName('word')[0].innerHTML =highletedWord
  }

  document.getElementsByClassName('translationText')[0].innerHTML=highlightedTranslation
}


/***************************************************************************************/
function mark(){

if(translation.split(" ").length > 0 ){
  firstTranslation =strip( translation.split(" ")[0])
  otherTranslations = translation.replace(firstTranslation,"")
}
else{
  firstTranslation = translation
  otherTranslations = ""
}

if(firstTranslation == word){
  document.getElementById("ribbon").className="ribbon ribbon--green";
}
else{

  siblings = isSibling (word , firstTranslation , pairs)
  adverbSibling = isSibling(word , firstTranslation , advPairs)
  doupleSibling = isDoupleSibling (word , firstTranslation)
  chapeau = isChapeau(word , firstTranslation)

  flipped = hasAFlippedLetter (word , firstTranslation)
  longertTranslation = hasALongertTranslation (word , firstTranslation)
  shorterTranslation = hasAShorterTranslation (word , firstTranslation)

  siblingWithExtraLetter = isSiblingWithExtraLetter(word , firstTranslation, pairs )
  siblingWithFlippedLetter   = isSiblingWithFlippedLetter (word , firstTranslation , pairs)


  advSiblingWithExtraLetter = isSiblingWithExtraLetter(word , firstTranslation , advPairs)
  advsiblingWithFlippedLetter = isSiblingWithFlippedLetter(word , firstTranslation , advPairs)

  doubleSiblingExtraLetter = hasDoubleSiblingExtraLetter (word , firstTranslation)
  //doubleSiblingflippedLetter = hasDoubleSiblingflippedLetter (word , firstTranslation)


  if (siblings)
    highlightSpelling(1,word ,firstTranslation,siblings[0],siblings[1],'#0099cc',null,null,null,otherTranslations)
  else if(adverbSibling)
    highlightSpelling(1,word ,firstTranslation,adverbSibling[0],adverbSibling[1],'#0099cc',null,null,null,otherTranslations)
  else if(doupleSibling)
    highlightSpelling(2,word ,firstTranslation,doupleSibling[0],doupleSibling[1],'#0099cc','#07607d',null,null,otherTranslations,doupleSibling[2],doupleSibling[3])
  else if (chapeau)
    highlightSpelling(1,word ,firstTranslation ,  chapeau[0],chapeau[1],'deeppink',null,null,null,otherTranslations)
    else if (flipped >=0)
      highlightSpelling(1,word ,firstTranslation ,null,null,'deeppink',null,flipped,0,otherTranslations)
  else if(longertTranslation >=0)
      highlightSpelling(1,word ,firstTranslation ,null,null,'deeppink',null,longertTranslation,2,otherTranslations)
  else if(shorterTranslation >=0)
      highlightSpelling(1,word ,firstTranslation ,null,null,'deeppink',null,shorterTranslation,1,otherTranslations)
  else if(siblingWithExtraLetter)
    highlightSpelling(2,word ,firstTranslation ,siblingWithExtraLetter[1],siblingWithExtraLetter[2],'#0099cc','deeppink',siblingWithExtraLetter[0],siblingWithExtraLetter[3],otherTranslations)
  else if(advSiblingWithExtraLetter)
    highlightSpelling(2,word ,firstTranslation ,advSiblingWithExtraLetter[1],advSiblingWithExtraLetter[2],'#0099cc','deeppink',advSiblingWithExtraLetter[0],advSiblingWithExtraLetter[3],otherTranslations)
  else if(siblingWithFlippedLetter)
    highlightSpelling(2,word ,firstTranslation ,siblingWithFlippedLetter[0],siblingWithFlippedLetter[1],'#0099cc','deeppink',siblingWithFlippedLetter[2],0,otherTranslations)
  else if(advsiblingWithFlippedLetter)
    highlightSpelling(2,word ,firstTranslation ,advsiblingWithFlippedLetter[0],advsiblingWithFlippedLetter[1],'#0099cc','deeppink',advsiblingWithFlippedLetter[2],0,otherTranslations)
  else if (doubleSiblingExtraLetter)
    highlightSpelling(2,word ,firstTranslation ,doubleSiblingExtraLetter[1],doubleSiblingExtraLetter[2],'#0099cc','deeppink',doubleSiblingExtraLetter[0],doubleSiblingExtraLetter[5],otherTranslations,doubleSiblingExtraLetter[3],doubleSiblingExtraLetter[4])
  // else if (doubleSiblingflippedLetter)
  //   highlightSpelling(2,word ,firstTranslation ,doubleSiblingflippedLetter[1],doubleSiblingflippedLetter[2],'#0099cc','deeppink',doubleSiblingflippedLetter[0],0,otherTranslations,doubleSiblingflippedLetter[3],doubleSiblingflippedLetter[4])



}
}

function markGender (){

  siblings = isSibling (word , fem , femPairs)
  if (siblings ){

      document.getElementById("ribbon").className="";
      document.getElementsByClassName('masculine')[0].innerHTML = markSiplingsEnding(word ,fem,siblings[0],siblings[1],'#0099cc')[0]
      document.getElementsByClassName('feminin')[0].innerHTML = markSiplingsEnding(word ,fem,siblings[0],siblings[1],'#0099cc')[1]
  }
  else if (word+'e' == fem){
    document.getElementById("ribbon").className="";
    document.getElementsByClassName('feminin')[0].innerHTML = fem.slice(0,-1)+"<span style='color:#0099cc'><u>e</u></span>"
  }
  else if (word+word[word.length-1]+'e' == fem){
    document.getElementById("ribbon").className="";
    document.getElementsByClassName('feminin')[0].innerHTML = fem.slice(0,-2)+"<span style='color:#0099cc'><u>"+word[word.length-1]+"e</u></span>"
  }
  else if (word.endsWith('e') && word == fem){
    document.getElementById("ribbon").className="";
    document.getElementsByClassName('masculine')[0].innerHTML = word.slice(0,-1)+"<span style='color:#0099cc'><u>e</u></span>"
    document.getElementsByClassName('feminin')[0].innerHTML = fem.slice(0,-1)+"<span style='color:#0099cc'><u>e</u></span>"
  }


}

function markCustome(){
  document.getElementsByClassName('translationText')[0].innerHTML = html_translation
  if(  document.getElementById('word')){
    document.getElementById('word').innerHTML = html_word
  }

  //document.getElementsByClassName('word').innerHTML = html_word

  else if(document.getElementsByClassName('masculine')[0]){
    document.getElementsByClassName('masculine')[0].innerHTML = html_word
  }
}

function unMark(){
  document.getElementById("ribbon").className="";
  document.getElementsByClassName('translationText')[0].innerHTML = translation
  //document.getElementsByClassName('word')[0].innerHTML = word
  if(document.getElementById('word'))
  document.getElementById('word').innerHTML = word

  if(document.getElementsByClassName('masculine')[0]){
    document.getElementsByClassName('masculine')[0].innerHTML = word
  }

  if(fem){
    document.getElementsByClassName('feminin')[0].innerHTML = strip(fem)
  }

  if (document.getElementsByClassName('plural')[0]){
    document.getElementsByClassName('plural')[0].style.display='none'
  }
  document.getElementById('ribbon').className="";
}

function displaypPlural(){

if(document.getElementsByClassName('noun-plural')[0]){

  var plural = strip((document.getElementsByClassName('noun-plural')[0].innerHTML).trim());

  if(plural!=""){

      siblings = isSibling (word , plural , plPairs)
      if (siblings ){
          pluralText = markSiplingsEnding(word ,plural,siblings[0],siblings[1],'#0099cc')[1]
          word2 = markSiplingsEnding(word ,plural,siblings[0],siblings[1],'#0099cc')[0]
      }
      else if (word+'s' == plural){

        pluralText = plural.slice(0,-1)+"<span style='color:#0099cc'><u>s</u></span>"
        word2 = word
      }
      else{
        pluralText = plural
        word2 = word
      }

      var pluralText = word2 +"&nbsp <img class='plural-arrow-icon' src='arrow1.png'/>&nbsp"+ pluralText;

      if(document.getElementById("word"))
      document.getElementById("word").innerHTML = pluralText
      else if(document.getElementsByClassName("word")[0])
        document.getElementsByClassName("word")[0].innerHTML = pluralText
  }



}
else if (document.getElementsByClassName('plural')[0]){

  if(document.getElementById('pluralM')){
    var pluralM = strip((document.getElementById('pluralM').innerHTML).trim());
    siblings = isSibling (word , pluralM , plPairs)
    if (siblings ){

        pluralText = markSiplingsEnding(word ,pluralM,siblings[0],siblings[1],'#0099cc')[1]
        word2 = markSiplingsEnding(word ,pluralM,siblings[0],siblings[1],'#0099cc')[0]
    }
    else if (word+'s' == pluralM){

      pluralText = pluralM.slice(0,-1)+"<span style='color:#0099cc'><u>s</u></span>"
      word2 = word

    }
    else{
      pluralText = pluralM
      word2 = word

    }

    document.getElementById('pluralM').innerHTML = pluralText
    document.getElementsByClassName("masculine")[0].innerHTML = word2


  }


  document.getElementsByClassName('plural')[0].style.display='block'
}

}
/***************************************************************************************/





  window.selectedId = window.selectedId|| "o2";
  if(window.selectedId){
    if(document.getElementById(window.selectedId)){
      if(document.getElementById(window.selectedId).disabled == false)
        var radio = document.getElementById(window.selectedId);
      else{
        window.selectedId = 'o2';
        var radio = document.getElementById(window.selectedId);
        radio.checked = 'checked';
        check3(window.selectedId);
      }
    }
    else window.selectedId = 'o2'
    var radio = document.getElementById(window.selectedId);
    radio.checked = 'checked';
    check3(window.selectedId);
  }


  var radios = document.getElementsByName('highlight');
  for(var i = 0, max = radios.length; i < max; i++) {

      radios[i].addEventListener('change', function() {
           window.selectedId = this.id
           check3(window.selectedId);

    }, false);
  }



  function check3(id) {
    if (id == 'o1'){
      unMark()
    }
    else if (id == 'o2') {
      unMark()
      mark();
    }
    else if (id == 'o3') {
      unMark()
      markCustome();
    }
    else if(id == 'o4'){
      unMark()
      markGender()
    }
    else if(id == 'o5'){
      unMark()
      displaypPlural()
    }
  }
/**************************/



  var options = document.getElementsByName('options');

  if(document.getElementsByName('extraOptions')){

  var extraOptions = document.getElementsByName('extraOptions');
  }

  if(document.getElementById("extra")){
    extra = document.getElementById("extra").innerHTML
    if (extra.includes("rabic") ){
      window.optionId = "root";
    }
    else{
      window.optionId = "noteOnly";
    }

  }
  else{
    window.optionId = "noteOnly";
  }





  window.optionId = window.optionId || 'noteOnly';
  if(window.optionId != 0){
    var option = document.getElementById(window.optionId);
    option.style.backgroundColor='#60f0ad'
    dispalyOption(window.optionId);

  }

  for(var i = 0, max = options.length; i < max; i++) {

      options[i].onclick =function() {
        // console.log('clicked')
           window.optionId = this.id
           dispalyOption(window.optionId);

    };
  }

  function dispalyOption(id) {
    for(var i = 0, max = options.length; i < max; i++) {
        options[i].style.backgroundColor='#f3dcf500'
    }
    for(var i = 0, max = extraOptions.length; i < max; i++) {
        extraOptions[i].style.display='none'
    }

    document.getElementById(id).style.backgroundColor='#60f0ad'
    if(id == 'root'){
      document.getElementById("extraDiv").style.display="block"
    }
    else if (id == "brain"){
      document.getElementById("mnemonicDiv").style.display="block"
    }
    else if (id == "tagsico"){
      document.getElementById("tagsDiv").style.display="block"
    }

  }

/*****************************************/

var checkIPA = document.getElementById('oIPA');
var checkPOS = document.getElementById('oPOS');
var checkEX = document.getElementById('oEX');
var checkMut = document.getElementById('oMut');

if (window.checkedIPA  === undefined){
  window.checkedIPA = false;
  checkIPA.checked = false;
}

if (window.checkedPOS  === undefined){
  window.checkedPOS = false;
  checkPOS.checked = false;
}


if (window.checkedEX  === undefined){
  window.checkedEX = true;
  checkEX.checked = true;
}

if (window.checkedMut  === undefined){
  window.checkedMut = true;
  checkMut.checked = true;
}



check(window.checkedIPA);
check2(window.checkedPOS);
checkx(window.checkedEX);
checkM(window.checkedMut);


checkIPA.checked = window.checkedIPA
checkPOS.checked = window.checkedPOS
checkEX.checked = window.checkedEX
checkMut.checked = window.checkedMut


checkIPA.addEventListener('change', function() {
    window.checkedIPA = checkIPA.checked;
    check(checkIPA.checked);
});

checkPOS.addEventListener('change', function() {
    window.checkedPOS = checkPOS.checked;
    check2(checkPOS.checked);
});


checkEX.addEventListener('change', function() {
    window.checkedEX = checkEX.checked;
    checkx(checkEX.checked);
});


checkMut.addEventListener('change', function() {
    window.checkedMut = checkMut.checked;
    checkM(checkMut.checked);
});



function checkM(checker) {
    if(checker == true) {
        document.getElementsByClassName("card-maturity")[0].style.display = "block";
    } else if (checker == false) {
        document.getElementsByClassName("card-maturity")[0].style.display = "none";
    }

}


function check(checker) {
    if(checker == true) {
        document.getElementsByClassName("ipa")[0].style.display = "block";
    } else if (checker == false) {
        document.getElementsByClassName("ipa")[0].style.display = "none";
    }
}

function check2(checker) {

    if(checker == true) {
         document.getElementsByClassName("type-corner")[0].style.display = "block";
    } else if (checker == false) {
         document.getElementsByClassName("type-corner")[0].style.display = "none";
    }
}


function checkx(checker) {

    if(checker == true) {
        // console.log('true')
          if (document.getElementById('exBank').innerHTML == ""){
            checkEX.checker = false;
          }
          else{
            document.getElementById("previousIcon").style.display = "inline-block";
            document.getElementById("nxtIcon").style.display = "inline-block";
            document.getElementById("noOfEx").style.display = "block";
            document.getElementById("frenchExamble").style.display = "inline-block";

          }

    } else if (checker == false) {

          document.getElementById("previousIcon").style.display = "none";
          document.getElementById("nxtIcon").style.display = "none";
          document.getElementById("noOfEx").style.display = "none";
          document.getElementById("frenchExamble").style.display = "block";
    }

}






  /****************************************************************************************/
  /*Change the card's background color according to its type*/
  var type = document.getElementsByClassName('type')[0].innerHTML.trim();
  if (type.includes('feminine') && type.includes('masculine')){
    document.getElementById("container").className = "both__background";
    document.getElementById("imgcontainer").className = "both__image";
  }
  else if (type.trim().includes('feminine')) {
    document.getElementById("container").className = "feminine__background";
    document.getElementById("imgcontainer").className = "feminine__image";
  }
  else if (type.trim().includes('masculine')){
    document.getElementById("container").className = "masculine__background";
    document.getElementById("imgcontainer").className = "masculine__image";
  }
  else if (type.trim().includes('adjective')) {
    document.getElementById("container").className = "adjective__background";
    document.getElementById("imgcontainer").className = "adjective__image";

  }
  else if (type.trim().includes('adverb')) {
    document.getElementById("container").className = "adverb__background";
    document.getElementById("imgcontainer").className = "adverb__image";
  }
  else if (type.trim().includes('verb')) {
    document.getElementById("container").className = "verb__background";
    document.getElementById("imgcontainer").className = "verb__image";
  }
  else if (type.trim().includes('verb')) {
    document.getElementById("container").className = "verb__background";
    document.getElementById("imgcontainer").className = "verb__image";
  }
  else {
    document.getElementById("container").className = "other__background";
    document.getElementById("imgcontainer").className = "other__image";
  }
  /***************************************************************************/


  ivl = document.getElementById('ivl').innerHTML ;

  if (ivl==0 ){
    document.getElementById('star2').style.display='none'
    document.getElementById('star3').style.display='none'
    document.getElementById('nostar1').style.display='none'
    // document.getElementById('star-msg').innerHTML='new'
  }
  else if (ivl < 21){

    document.getElementById('star3').style.display='none'
    document.getElementById('nostar1').style.display='none'
    document.getElementById('nostar2').style.display='none'
    // document.getElementById('star-msg').innerHTML='young'
  }
  else {
    document.getElementById('nostar1').style.display='none'
    document.getElementById('nostar2').style.display='none'
    document.getElementById('nostar3').style.display='none'
    // document.getElementById('star-msg').innerHTML='mature'
  }

/******************************************************************/

/***extra examples***/
type = document.getElementsByClassName('type')[0].innerHTML

current_index = -1
original_index = -1
bankJSON=[]
var checkEX = document.getElementById('oEX');

indexOnScreen = 1
function brepBank(bank){
  bank = bank.split("'").join("\"")

  bankJSON = JSON.parse(bank);
  document.getElementById('noOfEx').innerHTML = "<br> example "+indexOnScreen+ " of "+ bankJSON.length
  return (bankJSON)
}
if(document.getElementById('exBank')){
      if(document.getElementById('exBank').innerHTML.length>2){

                bank = strip(document.getElementById('exBank').innerHTML.trim())
                bankJSON = brepBank(bank)
                if(bankJSON.length > 1){
                current_index = -1
                original_index = -1
                current_example =strip(document.getElementById('frenchExamble').innerHTML.trim())
                for (var i = 0 ; i < bankJSON.length ; i++){
                  if (current_example == bankJSON[i]['fr']){
                    current_index = i
                    original_index = i
                  }
                }
              }
              else{
                document.getElementById('previousIcon').style.display='none'
                document.getElementById('nxtIcon').style.display='none'
                document.getElementById('noOfEx').style.display='none'
                // checkEX.disabled = true
              }


              for (var i = 0 ; i < bankJSON.length ; i++){
                bankJSON[i]['fr'] = bankJSON[i]['fr'].replace(word,"<span style='color:red; background-color:#c2e653bd;'>"+word+"</span>")


      }
    }
      else{
        checkEX.disabled = true;
        document.getElementById('previousIcon').style.display='none'
        document.getElementById('nxtIcon').style.display='none'
        document.getElementById('noOfEx').style.display='none'

      }

}
function nextExample(){
  indexOnScreen+=1;
  if(indexOnScreen > bankJSON.length){
    indexOnScreen = 1
  }
  document.getElementById('noOfEx').innerHTML = "<br> example "+indexOnScreen+ " of "+ bankJSON.length
  if (current_index == bankJSON.length-1 ){
    current_index = 0
    // console.log(current_index);
  }
  else{
    current_index += 1
    // console.log(current_index);
  }
  if (current_index == original_index){
    document.getElementById('frenchExamble').innerHTML = bankJSON[current_index]['fr']
    document.getElementById('englishExample').innerHTML = bankJSON[current_index]['en']
  }
  else{
    document.getElementById('frenchExamble').innerHTML = bankJSON[current_index]['fr'] + "<br><br><iframe src='silence.mp3' type='audio/mp3' allow='autoplay' id='audio' style='display:none'></iframe><audio controls='' autoplay='false' preload='none' type='audio/mp3'> <source src='../"+bankJSON[current_index]['audio']+"'></audio>"
    document.getElementById('englishExample').innerHTML = bankJSON[current_index]['en']
  }

}

function previousExample(){
  indexOnScreen-=1;
  if(indexOnScreen <= 0){
    indexOnScreen = bankJSON.length
  }
  document.getElementById('noOfEx').innerHTML = "<br> example "+indexOnScreen+ " of "+ bankJSON.length
  if (current_index == 0 ){
    current_index = bankJSON.length-1
    console.log(current_index);
  }
  else{
    current_index -= 1
    console.log(current_index);
  }
  if (current_index == original_index){
    document.getElementById('frenchExamble').innerHTML = bankJSON[current_index]['fr']
    document.getElementById('englishExample').innerHTML = bankJSON[current_index]['en']
  }
  else{
    document.getElementById('frenchExamble').innerHTML = bankJSON[current_index]['fr'] + "<br><br><iframe src='silence.mp3' type='audio/mp3' allow='autoplay' id='audio' style='display:none'></iframe><audio controls='' autoplay='false' preload='none' type='audio/mp3'> <source src='../"+bankJSON[current_index]['audio']+"'></audio>"
    document.getElementById('englishExample').innerHTML = bankJSON[current_index]['en']
  }
}

/****************************************************/

/**open/close menu*/


if(window.menuStatus == undefined){
  window.menuStatus =  'close';
  document.getElementsByClassName("menu__head__icon--open")[0].style.display="none"
}
else if (window.menuStatus == 'open'){
   dispalymenu ('close')
}
else{
  dispalymenu ('open')
}


 document.getElementsByClassName("menu__head__icon")[0].addEventListener("click",function( ){
  dispalymenu(window.menuStatus);
});

document.getElementsByClassName("menu__head__icon--open")[0].addEventListener("click",function( ){
 dispalymenu(window.menuStatus);
});


function dispalymenu (status){

    if (status == 'close'){

      document.getElementsByClassName('menus')[0].style.backgroundColor="#f3dcf500";
      document.getElementsByClassName('menu_hidable')[0].style.display="none";
      document.getElementsByClassName("menu__head__icon--open")[0].style.display="block";
      window.menuStatus = 'open'
    }
    else{

      document.getElementsByClassName('menus')[0].style.backgroundColor="#f3dcf5d4";
      document.getElementsByClassName('menu_hidable')[0].style.display="block";
      document.getElementsByClassName("menu__head__icon--open")[0].style.display="none";
      window.menuStatus = 'close'
    }

}

/***************************************/
