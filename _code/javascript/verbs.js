/******************************************************************************************************************/
/******************************************************************************************************************/
/******************************************************************************************************************/
/******************************************************************************************************************/

var backgroundColor = document.createElement('script');
backgroundColor.type = 'text/javascript';
backgroundColor.src = '_code/javascript/helpers/backgroundColor.js';
document.getElementsByTagName('head')[0].appendChild(backgroundColor);



var menu2 = document.createElement('script');
menu2.type = 'text/javascript';
menu2.src = '_code/javascript/helpers/menu2.js';
document.getElementsByTagName('head')[0].appendChild(menu2);


var verbConj = document.createElement('script');
verbConj.type = 'text/javascript';
verbConj.src = '_code/javascript/helpers/verbConj.js';
document.getElementsByTagName('head')[0].appendChild(verbConj);


var menu3 = document.createElement('script');
menu3.type = 'text/javascript';
menu3.src = '_code/javascript/helpers/menu3.js';
document.getElementsByTagName('head')[0].appendChild(menu3);

var extraExamples = document.createElement('script');
extraExamples.type = 'text/javascript';
extraExamples.src = '_code/javascript/helpers/extraExamples.js';
document.getElementsByTagName('head')[0].appendChild(extraExamples);

var stars = document.createElement('script');
stars.type = 'text/javascript';
stars.src = '_code/javascript/helpers/stars.js';
document.getElementsByTagName('head')[0].appendChild(stars);

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
    console.log(org_html)
  group = document.getElementById("group").innerHTML;
  var lastChar = org_html[org_html.length -1];
  var start = org_html.slice(0,-2);
  var lastChar = org_html.slice(-2);
  if (group.trim() == "one") {

  new_html = start+ "<span class='first'>" + lastChar + "</span>";
  console.log(new_html)
  document.getElementById("word").innerHTML = new_html;
  }
  else if (group.trim() == "two") {
  new_html = start+ "<span class='second'>" + lastChar + "</span>";
  document.getElementById("word").innerHTML = new_html;
  }
  else if (group.trim() == "three") {
  new_html = start+ "<span class='third'>" + lastChar + "</span>";
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
  else if(id == 'o4'){
    unMark()
    markGender()
  }
  else if(id == 'o5'){
    unMark()
    displaypPlural()
  }
}

/*******************************************************************************************************************/
