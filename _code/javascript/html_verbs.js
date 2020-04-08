/*Attachments*/
if (document.getElementById('extraField')){
  extra = document.getElementById('extraField').innerHTML;
  p1 =  `
  <div name="extraOptions" style="display:none" id="extraDiv">
  <button  type='button' class=' card-attachment__title  card-attachment__title--extra'> etymology  &nbsp
    <img  class='card-attachment__title__icon card-attachment__title__icon--small' src='_code/_rooticon.png'/>&nbsp and extra  </button>
  <div id="extra" class="card-attachment__body card-attachment__body--extra" >`+extra+`</div>
  </div>
   `
}
else{
  p1 =""
}
if (document.getElementById('mnemonicField')){
  mnemonic = document.getElementById('mnemonicField').innerHTML;
  p2 = `

  <div name="extraOptions" style="display:none" id="mnemonicDiv">
  <button  type='button' class=' card-attachment__title card-attachment__title--mnemonic '>
  <img  class='card-attachment__title__icon card-attachment__title__icon--med' src='_code/_brain1.png'/>&nbsp &nbsp mnemonic </button>
  <div id ="mnemonic" class ='card-attachment__body card-attachment__body--mnemonic' > `+ mnemonic+` </div>
  </div>


  `
}
else{
  p2=""
}
if(document.getElementById('tagsField')){
  tags = document.getElementById('tagsField').innerHTML;
  p3 = `


  <div name="extraOptions" style="display:none" id="tagsDiv">
  <button  type='button' class=' card-attachment__title card-attachment__title--tags '>
  <img class='card-attachment__title__icon card-attachment__title__icon--med' src='_code/_ptag.png'/>&nbsp &nbsp tags </button>
  <div id="tagsText" class ='card-attachment__body card-attachment__body--tags'  >`+tags+`</div>
  </div>
  `
}
else{
  p3=""
}



var div_attachments = document.createElement('div');
div_attachments.innerHTML = p1 + p2 + p3
document.getElementsByClassName('attachments')[0].appendChild(div_attachments);

/******************************************************************/


var divs = document.createElement('div');
divs.className='card-maturity'
divs.innerHTML = `
<img id="star1" class="card-maturity__star-icon" src="_code/_star.png">
<img id="star2" class="card-maturity__star-icon" src="_code/_star.png">
<img id="star3" class="card-maturity__star-icon" src="_code/_star.png">
<img id="nostar1" class="card-maturity__star-icon" src="_code/_star_dim.png">
<img id="nostar2" class="card-maturity__star-icon" src="_code/_star_dim.png">
<img id="nostar3" class="card-maturity__star-icon" src="_code/_star_dim.png">
<!-- <p id="star-msg" class="card-maturity__text"> </p> -->
`

document.getElementsByClassName('template')[0].appendChild(divs);


/******************************************************************/


function strip(html){
  var doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || "";
}

word = strip(document.getElementById('word').innerHTML);
var divL = document.createElement('div');
divL.className='links'
divL.innerHTML = `
  <div class="link link1"> <a class="text"  href="https://www.collinsdictionary.com/dictionary/french-english/`+word+`"> Collins</a> </div>
  <div class="link link2" > <a class="text"  href="https://en.wiktionary.org/wiki/`+word+`#French"> wiktionary</a> </div>
  <div class="link link3" > <a class="text"  href="https://www.linguee.com/english-french/search?source=auto&query=`+word+`"> linguee</a> </div>
  <div class="link link4" > <a class="text"  href="https://www.google.com/search?q=`+word+`"> Google</a> </div>
`
document.getElementsByClassName('template')[0].appendChild(divL);


/******************************************************************/


extra = document.getElementById('extra')
mnemonic = document.getElementById('mnemonicDiv')
tags = document.getElementById('tagsDiv')
var p1
var p2
var p3
if(extra){
    p1 = `<img name="options" id="root" class='menu2-icon' src='_code/_rooticon.png'/>`
}
else{
  p1 = ` <img  class='menu2-icon' src='_code/_rooticonoff.png'/>`
}
if(mnemonic){
  p2= `<img name="options" id="brain" class='menu2-icon' src='_code/_brain1.png'/>`
}
else{
  p2= `<img  class='menu2-icon' src='_code/_brain1off.png'/>`
}
if(tags){
  p3= `<img name="options" id="tagsico" class='menu2-icon' src='_code/_ptag.png'/>`
}
else{
  p3= `<img  class='menu2-icon' src='_code/_ptag.pngoff.png'/>`
}




var m = document.createElement('div');
m.innerHTML = `
<div class='menu__head__icon--open'>
<img class="menu__head__icon--open" src="_code/menu.png">
</div>

<div class="menu_hidable">

<div class="menu-head">
<img class="menu__head__icon" src="_code/close.png">
Options Menu
</div>

<div class="menu menu--1">

<label class="highlightOption">
<input  class="option-input " id="oIPA" type="checkbox"  value="showAPI"  ></input>
IPA
</label>

<label class="highlightOption">
<input class="option-input " id="oPOS" type="checkbox"  value="showPOS" >Part of Speech</input>
</label>

<label class="highlightOption">
<input class="option-input "  id="oEX" type="checkbox"  value="showEX" >extra examples</input>
</label>

<label class="highlightOption">
<input class="option-input "  id="oMut" type="checkbox"  value="showMaturity" >Card Maturity</input>
</label>

</div>

<div class="menu menu--3">

<p class="menu__title"> Highlighting Options </p>

<label class="highlightOption">
<input class="option-input radio" id="o1" type="radio" name="highlight" value="higlightRoots" >None</input>
</label>

<label class="highlightOption">
<input  class="option-input radio" id="o2" type="radio" name="highlight" value="higlightRoots" >Roots</input>
</label>

<label class="highlightOption">
<input class="option-input radio" id="o3" type="radio" name="highlight" value="higlightSpelling">Custom</input>
</label>

<label class="highlightOption">
<input class="option-input radio"  id="o4" type="radio" name="highlight" value="highlightGender">Gender</input>
</label>


<label class="highlightOption">
<input class="option-input radio" id="o5" type="radio" name="highlight" value="highlightGender">Plural</input>
</label>

</div>

<p class="menu__title">
Note Extras
</p>
<div class="menu menu--2'">
<img name="options" id="noteOnly" class='menu2-icon' src='_code/_note.png'/>
` + p1 + p2 + p3 + `</div>

<div class="menu menu--4">
<p class="menu__title">
Verbs
</p>
<label class="highlightOption">
<input  class="option-input " id="CHECKconj" type="checkbox"  value="showCONJ"  >Conjugations</input>
</label>
</div>


</div>
`

document.getElementsByClassName('menus')[0].appendChild(m);