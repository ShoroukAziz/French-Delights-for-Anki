/******************************************************************************************************************/
/******************************************************************************************************************/
/******************************************************************************************************************/
/******************************************************************************************************************/
var backgroundColor = document.createElement('script');
backgroundColor.type = 'text/javascript';
backgroundColor.src = '_code/javascript/helpers/backgroundColor.js';
document.getElementsByTagName('head')[0].appendChild(backgroundColor);


var extraExamples = document.createElement('script');
extraExamples.type = 'text/javascript';
extraExamples.src = '_code/javascript/helpers/extraExamples.js';
document.getElementsByTagName('head')[0].appendChild(extraExamples);

var menu2 = document.createElement('script');
menu2.type = 'text/javascript';
menu2.src = '_code/javascript/helpers/menu2.js';
document.getElementsByTagName('head')[0].appendChild(menu2);


var menu3 = document.createElement('script');
menu3.type = 'text/javascript';
menu3.src = '_code/javascript/helpers/menu3.js';
document.getElementsByTagName('head')[0].appendChild(menu3);

var stars = document.createElement('script');
stars.type = 'text/javascript';
stars.src = '_code/javascript/helpers/stars.js';
document.getElementsByTagName('head')[0].appendChild(stars);

/******************************************************************************************************************/
/******************************************************************************************************************/
/******************************************************************************************************************/
/******************************************************************************************************************/
/******************************************************************************************************************/



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



String.prototype.removeAt=function(index) {
  return this.substr(0, index) + this.substr(index+1,);
}
String.prototype.replaceAt=function(index, replacement) {
  return this.substr(0, index) + replacement+ this.substr(index+1,);
}
String.prototype.splitAt = function(index){
  return this.substring(0, index) + "," + this.substring(index);
}

function strip(html){
  var doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || "";
}

  translation = strip(document.getElementsByClassName('translationText')[0].innerHTML.trim());
  word =strip(document.getElementById('word').innerHTML.trim());

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
else if(document.getElementsByClassName('pluralText')[0]){

}
else{
  pluralM = null
  document.getElementById("o5").disabled = true;
  document.getElementById("o5").parentElement.style.color = '#4f5154';
}


if(document.getElementById('wordSound')){
  if(document.getElementById('wordSound').innerHTML.endsWith('<br>'))
  document.getElementById('wordSound').innerHTML=document.getElementById('wordSound').innerHTML.slice(0,-4)
}
if(document.getElementById('exampleSound')){
  if(document.getElementById('exampleSound').innerHTML.endsWith('<br>'))
  document.getElementById('exampleSound').innerHTML=document.getElementById('exampleSound').innerHTML.slice(0,-4)
}
if(document.getElementById('femeSound')){
  if(document.getElementById('femeSound').innerHTML.endsWith('<br>'))
  document.getElementById('femeSound').innerHTML=document.getElementById('femeSound').innerHTML.slice(0,-4)
}
if(document.getElementById('pSound')){
  if(document.getElementById('pSound').innerHTML.endsWith('<br>'))
  document.getElementById('pSound').innerHTML=document.getElementById('pSound').innerHTML.slice(0,-4)
}



var html_translation = document.getElementsByClassName('translationText')[0].innerHTML;
var html_word =document.getElementById('word').innerHTML;

document.getElementsByClassName('translationText')[0].innerHTML = translation
document.getElementById('word').innerHTML = word
document.getElementById('frenchExamble').innerHTML =document.getElementById('frenchExamble').innerHTML.replace(word,"<span style='color:red; background-color:#c2e653bd;'>"+word+"</span>")

/*****************************************************************************************************************************/
/* -------------------------------------------Siblings detctors--- ----------------------------------------------------------*/
/*****************************************************************************************************************************/


function isSibling (word , translation , testingPairs){
  var result = -1
  testingPairs.forEach(function(element){
    wordIndex = -element[1].length
    translationIndex = -element[0].length
    if(word.endsWith(element[1]) && translation.endsWith(element[0])){

      if(translation.slice(0,translationIndex) == word.slice(0,wordIndex)){
          console.log("Sibling");
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
          console.log(result)
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
        console.log("Chapeau")
      }
    }
  });
  if (result != -1){
    return result
  }
}


/*****************************************************************************************************************************/
/* --------------------------------------------slight change detctors--------------------------------------------------------*/
/*****************************************************************************************************************************/


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

/*****************************************************************************************************************************/
/* --------------------------------------------complicated change detctors---------------------------------------------------*/
/*****************************************************************************************************************************/

function isSiblingWithExtraLetter(word,translation,testingPairs){

  for (var i=0; i<translation.length ; i++){
    var newTrans  = translation.removeAt(i);
    if (isSibling (word,newTrans,testingPairs) ){
      console.log("has A different Letter in translation And A Sibling");
      return [i , isSibling (word,newTrans,testingPairs)[0] ,isSibling (word,newTrans,testingPairs)[1] , 2 ]

    }
  }

  for (var j=0; j<word.length ; j++){
    var newWord  = word.removeAt(j);
    if (isSibling (newWord,translation,testingPairs) ){
      console.log("has A different Letter in word And A Sibling");
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
      console.log(newA , newB)

      if(hasAFlippedLetter (newA , newB)){
        console.log(newA , newB)
        result2 = hasAFlippedLetter (newA , newB)
        result =  element
        console.log("is Sibling With Flipped Letter");
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
      console.log("Adverb Douple Sibling With Diff Letter in translation");
      return [i , isDoupleSibling(word,newTrans)[0] , isDoupleSibling (word,newTrans)[1],isDoupleSibling (word,newTrans)[2],isDoupleSibling (word,newTrans)[3] , 2 ]
    }
  }

  for (var j=0; j<word.length ; j++){
    var newWord  = word.removeAt(j);
    if (isDoupleSibling (newWord,translation) ){
      console.log("Adverb Douple Sibling With DiffLetter in word");
      return [j , isDoupleSibling (newWord,translation)[0] , isDoupleSibling (newWord,translation)[1],isDoupleSibling (newWord,translation)[2],isDoupleSibling (newWord,translation)[3] , 1 ]
    }
  }

}

/*********************************************/
function hasDoubleSiblingflippedLetter (word ,translation){
//TODO
}



/*****************************************************************************************************/
/*****************************************************************************************************/
/*****************************************************************************************************/

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


  console.log( part1 , part2 ,p3,p4,index,changePlace)

  if (nOfChanges == 1 && index == null){
    // if thye're siblings or chapeau

    highletedWord = markSiplingsEnding(theWord , theTranslation ,  part1 , part2,color1) [0]
    highlightedTranslation = markSiplingsEnding(theWord , theTranslation ,  part1 , part2,color1) [1]
    if (color1 =='deeppink'){
          document.getElementById("ribbon").className="ribbonPink";
    }
    else{
          document.getElementById("ribbon").className="ribbonBLUE";
    }

  }
  else if (nOfChanges == 1  && index != null){
    // if slight change (é instead of e or extra letter etc..)
      document.getElementById("ribbon").className="ribbonPink";
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
    document.getElementById("ribbon").className="ribbonBLUE";
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
    console.log('1')
  }
  else if( document.getElementsByClassName('masculine')[0]){
    console.log('2')
      document.getElementsByClassName('masculine')[0].innerHTML =highletedWord
  }
  else if( document.getElementsByClassName('word')[0]){
    // document.getElementsByClassName('word')[0].innerHTML =highletedWord
  }

  document.getElementsByClassName('translationText')[0].innerHTML=highlightedTranslation
}



/*****************************************************************************************************/
/*****************************************************************************************************/
/*****************************************************************************************************/
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
  document.getElementById("ribbon").className="ribbon";
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

  if (document.getElementsByClassName('plurals')[0]){
    document.getElementsByClassName('plurals')[0].style.display='none'
  }
  document.getElementById('ribbon').className="";
}
/*****************************************************************************************/

function displaypPlural(){

if(document.getElementsByClassName('pluralText')[0]){
  console.log('aa')
  var plural = strip((document.getElementsByClassName('pluralText')[0].innerHTML).trim());


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

  var pluralText = word2 +"&nbsp <img class='icon' src='arrow1.png'/>&nbsp"+ pluralText;

  if(document.getElementById("word"))
  document.getElementById("word").innerHTML = pluralText
  else if(document.getElementsByClassName("word")[0])
    document.getElementsByClassName("word")[0].innerHTML = pluralText

}
else if (document.getElementsByClassName('plurals')[0]){
console.log('ko')
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

  if(document.getElementById('pluralF')){
    var pluralF = strip((document.getElementById('pluralF').innerHTML).trim());

    siblings = isSibling (fem , pluralF , plPairs)
    if (siblings ){
        pluralText = markSiplingsEnding(fen ,pluralF,siblings[0],siblings[1],'#0099cc')[1]
        word2 = markSiplingsEnding(fem ,pluralF,siblings[0],siblings[1],'#0099cc')[0]
    }
    else if (fem+'s' == pluralF){

      pluralText = pluralF.slice(0,-1)+"<span style='color:#0099cc'><u>s</u></span>"
      word2 = fem

    }
    else{
      pluralText = pluralF
      word2 = fem

    }

    document.getElementById('pluralF').innerHTML = pluralText
    document.getElementsByClassName("feminin")[0].innerHTML = word2


  }

  document.getElementsByClassName('plurals')[0].style.display='block'
}

}



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
