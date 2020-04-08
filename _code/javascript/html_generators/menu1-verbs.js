
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
