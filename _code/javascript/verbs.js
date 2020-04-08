
var script = document.createElement('script');
script.type = 'text/javascript';
script.src = '_code/javascript/helpers/verb_conj.js';
document.getElementsByTagName('head')[0].appendChild(script);

/******************************************************************************************************************/
/******************************************************************************************************************/
/******************************************************************************************************************/
/******************************************************************************************************************/
/******************************************************************************************************************/

pairs = [ ['ate','er'] , ['fy','fier'] ,  ['ise','iser'] , ['e','er']
]


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
  var html_word =document.getElementById('word').innerHTML.trim();



document.getElementById("o4").disabled = true;
document.getElementById("o4").parentElement.style.color = '#4f5154';
document.getElementById("o5").disabled = true;
document.getElementById("o5").parentElement.style.color = '#4f5154';

if (html_word == word){
  document.getElementById("o3").disabled = true;
  document.getElementById("o3").parentElement.style.color = '#4f5154';
}



if(document.getElementById('wordSound')){
  if(document.getElementById('wordSound').innerHTML.endsWith('<br>'))
  document.getElementById('wordSound').innerHTML=document.getElementById('wordSound').innerHTML.slice(0,-4)
}
if(document.getElementById('exampleSound')){
  if(document.getElementById('exampleSound').innerHTML.endsWith('<br>'))
  document.getElementById('exampleSound').innerHTML=document.getElementById('exampleSound').innerHTML.slice(0,-4)
}



var html_translation = document.getElementsByClassName('translationText')[0].innerHTML;
var html_word =document.getElementById('word').innerHTML;

document.getElementsByClassName('translationText')[0].innerHTML = translation
document.getElementById('word').innerHTML = word

document.getElementById('frenchExamble').innerHTML =document.getElementById('frenchExamble').innerHTML.replace(word,"<span style='color:red; background-color:#c2e653bd;'>"+word+"</span>")
// document.getElementById('englishExample').innerHTML =document.getElementById('englishExample').innerHTML.replace(translation,"<span style='color:red; background-color:#c2e653bd;'>"+translation+"</span>")
// to_translation = translation.split('to ')
// if(to_translation.length == 2  ){
//   document.getElementById('englishExample').innerHTML =document.getElementById('englishExample').innerHTML.replace(to_translation[1],"<span style='color:red; background-color:#c2e653bd;'>"+to_translation[1]+"</span>")
//
// }
// other_translations = translation.split(',')
// console.log(other_translations)
// if(other_translations.length > 1  ){
//   for(var j = 0 ; j < other_translations.length ; j++ ){
//     console.log(other_translations[j])
//     other_translations[j] = other_translations[j].split('to')[1]
//     document.getElementById('englishExample').innerHTML = document.getElementById('englishExample').innerHTML.replace(other_translations[j],"<span style='color:red; background-color:#c2e653bd;'>"+other_translations[j]+"</span>")
//
//   }
//
//
// }

function mark(){
//TODO
}



function markVerbEnding(){

  org_html = strip(document.getElementById("word").innerHTML)
  group = document.getElementById("group").innerHTML;
  var lastChar = org_html[org_html.length -1];
  var start = org_html.slice(0,-2);
  var lastChar = org_html.slice(-2);
  if (group.trim() == "one") {

  new_html = start+ "<span class='verb-first-group-ending'>" + lastChar + "</span>";
  document.getElementById("word").innerHTML = new_html;
  }
  else if (group.trim() == "two") {
  new_html = start+ "<span class='verb-second-group-ending'>" + lastChar + "</span>";
  document.getElementById("word").innerHTML = new_html;
  }
  else if (group.trim() == "three") {
  new_html = start+ "<span class='verb-third-group-ending'>" + lastChar + "</span>";
  document.getElementById("word").innerHTML = new_html;
  }
}



function markCustome(){
  document.getElementsByClassName('translationText')[0].innerHTML = html_translation
  if(  document.getElementById('word')){
    document.getElementById('word').innerHTML = html_word
  }



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


  document.getElementById('ribbon').className="";
}
/*****************************************************************************************/


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
    markVerbEnding();
  }
  else if (id == 'o3') {
    unMark()
    markCustome();
  }

}

/*******************************************************************************************************************/



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
    window.checkedMut = document.getElementById('oMut').checked;
    checkM(window.checkedMut);
});

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


function checkM(checker) {
    if(checker == true) {
        document.getElementsByClassName("card-maturity")[0].style.display = "block";
    } else if (checker == false) {
        document.getElementsByClassName("card-maturity")[0].style.display = "none";
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
