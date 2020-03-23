

group = document.getElementById('group').innerHTML;

_1S = document.getElementById('1S').innerHTML
_2S = document.getElementById('2S').innerHTML
_3S = document.getElementById('3S').innerHTML
_4S = document.getElementById('4S').innerHTML
_5S = document.getElementById('5S').innerHTML
_6S = document.getElementById('6S').innerHTML
_7S = document.getElementById('7S').innerHTML
_8S = document.getElementById('8S').innerHTML
_9S = document.getElementById('9S').innerHTML
_10S = document.getElementById('10S').innerHTML
_11S = document.getElementById('11S').innerHTML
_12S = document.getElementById('12S').innerHTML
_13S = document.getElementById('13S').innerHTML
_14S = document.getElementById('14S').innerHTML
_15S = document.getElementById('15S').innerHTML
_16S = document.getElementById('16S').innerHTML
_17S = document.getElementById('17S').innerHTML
_18S = document.getElementById('18S').innerHTML
// console.log(_1S)
// console.log(_2S)
// console.log(_3S)
// console.log(_4S)
// console.log(_5S)
// console.log(_6S)
// console.log(_7S)
// console.log(_8S)
// console.log(_9S)
// console.log(_10S)
// console.log(_11S)
// console.log(_12S)
// console.log(_13S)
// console.log(_14S)
// console.log(_15S)
// console.log(_16S)
// console.log(_17S)
// console.log(_18S)

_1e = document.getElementById('1e').innerHTML;
_2e = document.getElementById('2e').innerHTML;
_3e = document.getElementById('3e').innerHTML;
_4e = document.getElementById('4e').innerHTML;
_5e = document.getElementById('5e').innerHTML;
_6e = document.getElementById('6e').innerHTML;
_7e = document.getElementById('7e').innerHTML;
_8e = document.getElementById('8e').innerHTML;
_9e = document.getElementById('9e').innerHTML;
_10e = document.getElementById('10e').innerHTML;
_11e = document.getElementById('11e').innerHTML;
_12e = document.getElementById('12e').innerHTML;
_13e = document.getElementById('13e').innerHTML;
_14e = document.getElementById('14e').innerHTML;
_15e = document.getElementById('15e').innerHTML;
_16e = document.getElementById('16e').innerHTML;
_17e = document.getElementById('17e').innerHTML;
_18e = document.getElementById('18e').innerHTML;

pje_content = document.getElementById('pje').innerHTML;
ptu_content = document.getElementById('ptu').innerHTML;
pil_content = document.getElementById('pil').innerHTML;
pnous_content = document.getElementById('pnous').innerHTML;
pvous_content = document.getElementById('pvous').innerHTML;
pils_content = document.getElementById('pils').innerHTML;
pcje_content = document.getElementById('pcje').innerHTML;
pctu_content = document.getElementById('pctu').innerHTML;
pcil_content = document.getElementById('pcil').innerHTML;
pcnous_content = document.getElementById('pcnous').innerHTML;
pcvous_content = document.getElementById('pcvous').innerHTML;
pcils_content = document.getElementById('pcils').innerHTML;
fje_content = document.getElementById('fje').innerHTML;
ftu_content = document.getElementById('ftu').innerHTML;
fil_content = document.getElementById('fil').innerHTML;
fnous_content = document.getElementById('fnous').innerHTML;
fvous_content = document.getElementById('fvous').innerHTML;
fils_content = document.getElementById('fils').innerHTML;


if(group.trim() == "one"){
btn="<button  id='conjBtn' style='display:none ; background-color:#8bc787; ' type='button' class='collapsibleStyle collapsible '>conjugations <img class='icon3' src='arrow3.png'/> </button>";
}
if(group.trim() == "two"){
btn="<button id='conjBtn' style='display:none ;background-color:#d7e4fc; color:#0c386b; ' type='button' class='collapsibleStyle collapsible '>conjugations <img class='icon3' src='arrow3.png'/> </button>";
}
if(group.trim() == "three"){
btn="<button id='conjBtn' style='display:none ;background-color:#fcb3b3; color:#a6082b; ' type='button' class='collapsibleStyle collapsible '>conjugations <img class='icon3' src='arrow3.png'/> </button>"
}


if (group){
(pje_content ? Pje = "<span>"+  pje_content +" </span>"  : Pje = "to be added" );
(ptu_content ? Ptu = "<span>"+  ptu_content +"</span>" : Ptu = "to be added" );
(pil_content ? Pil = "<span>"+  pil_content +"</span>" : Pil = "to be added" );
(pnous_content ? Pnous = "<span>"+  pnous_content +"</span>" : Pnous = "to be added" );
(pvous_content ? Pvous = "<span>"+  pvous_content +"</span>"  : Pvous = "to be added" );
(pils_content ? Pils = "<span>"+  pils_content +"</span>"  : Pils = "to be added" );

(pcje_content ? PCje ="<span>"+  pcje_content +"</span>"  : PCje = "to be added" );
(pctu_content ? PCtu = "<span>"+  pctu_content +"</span>"  : PCtu = "to be added" );
(pcil_content ? PCil = "<span>"+  pcil_content +"</span>"  : PCil = "to be added" );
(pcnous_content ? PCnous ="<span>"+  pcnous_content +"</span>" : PCnous = "to be added" );
(pcvous_content ? PCvous = "<span>"+  pcvous_content +"</span>"  : PCvous = "to be added" );
(pcils_content ? PCils = "<span>"+  pcils_content +"</span>"  : PCils = "to be added" );

(fje_content ? fje = "<span>"+  fje_content +"</span>"  : fje = "to be added" );
(ftu_content ? ftu = "<span>"+  ftu_content  +"</span> " : ftu = "to be added" );
(fil_content ? fil = "<span>"+  fil_content +"</span> " : fil = "to be added" );
(fnous_content  ? fnous = "<span>"+  fnous_content +"</span>  ": fnous = "to be added" );
(fvous_content ? fvous = "<span>"+  fvous_content +"</span>" : fvous = "to be added" );
(fils_content ? fils = "<span>"+  fils_content +"</span> " : fils = "to be added" );


conjExamples = `
<div id ="present" style="display:none" >
<div  class =' miniCard' id ='miniVerbCard' > <span style="font-size:25px; color:red"><b>`+ Pje+'</b></span> <br>' +_1e +"<iframe src='../silence.mp3' type='audio/mp3' allow='autoplay' id='audio' style='display:none'></iframe><audio controls=''  preload='none' type='audio/mp3'> <source src=../"+_1S+"></audio>"  + ` </div>
<div  class =' miniCard' id ='miniVerbCard' ><span style="font-size:25px; color:red"><b>`+ Ptu+'</b></span> <br>'  +_2e + "<iframe src='silence.mp3' type='audio/mp3' allow='autoplay' id='audio' style='display:none'></iframe><audio controls='' preload='none' type='audio/mp3'> <source src=../"+_2S+"></audio>" + ` </div>
<div  class =' miniCard' id ='miniVerbCard' ><span style="font-size:25px; color:red"><b>`+ Pil+'</b></span> <br>'  +_3e + "<iframe src='silence.mp3' type='audio/mp3' allow='autoplay' id='audio' style='display:none'></iframe><audio controls='' preload='none' type='audio/mp3'> <source src=../"+_3S+"></audio>" + ` </div>
<div  class =' miniCard' id ='miniVerbCard' ><span style="font-size:25px; color:red"><b>`+ Pnous+'</b></span> <br>'  +_4e + "<iframe src='silence.mp3' type='audio/mp3' allow='autoplay' id='audio' style='display:none'></iframe><audio controls='' preload='none' type='audio/mp3'> <source src=../"+_4S+"></audio>" + ` </div>
<div  class =' miniCard' id ='miniVerbCard' ><span style="font-size:25px; color:red"><b>`+ Pvous+'</b></span> <br>'  +_5e + "<iframe src='silence.mp3' type='audio/mp3' allow='autoplay' id='audio' style='display:none'></iframe><audio controls='' preload='none' type='audio/mp3'> <source src=../"+_5S+"></audio>" + ` </div>
<div  class =' miniCard' id ='miniVerbCard' ><span style="font-size:25px; color:red"><b>`+ Pils+'</b></span> <br>'  +_6e + "<iframe src='silence.mp3' type='audio/mp3' allow='autoplay' id='audio' style='display:none'></iframe><audio controls='' preload='none' type='audio/mp3'> <source src=../"+_6S+"></audio>" + ` </div>
</div>

<div id ="PC" style="display:none" >
<div  class =' miniCard' id ='miniVerbCard' ><span style="font-size:25px; color:red"><b>`+ PCje+'</b></span> <br>'  +_7e + "<iframe src='silence.mp3' type='audio/mp3' allow='autoplay' id='audio' style='display:none'></iframe><audio controls='' preload='none' type='audio/mp3'> <source src=../"+_7S+"></audio>" + ` </div>
<div  class =' miniCard' id ='miniVerbCard' ><span style="font-size:25px; color:red"><b>`+ PCtu+'</b></span> <br>'  +_8e + "<iframe src='silence.mp3' type='audio/mp3' allow='autoplay' id='audio' style='display:none'></iframe><audio controls='' preload='none' type='audio/mp3'> <source src=../"+_8S+"></audio>" + ` </div>
<div  class =' miniCard' id ='miniVerbCard' ><span style="font-size:25px; color:red"><b>`+ PCil+'</b></span> <br>'  +_9e + "<iframe src='silence.mp3' type='audio/mp3' allow='autoplay' id='audio' style='display:none'></iframe><audio controls='' preload='none' type='audio/mp3'> <source src=../"+_9S+"></audio>" + ` </div>
<div  class =' miniCard' id ='miniVerbCard' ><span style="font-size:25px; color:red"><b>`+ PCnous+'</b></span> <br>'  +_10e + "<iframe src='silence.mp3' type='audio/mp3' allow='autoplay' id='audio' style='display:none'></iframe><audio controls='' preload='none' type='audio/mp3'> <source src=../"+_10S+"></audio>" + ` </div>
<div  class =' miniCard' id ='miniVerbCard' ><span style="font-size:25px; color:red"><b>`+ PCvous+'</b></span> <br>'  +_11e + "<iframe src='silence.mp3' type='audio/mp3' allow='autoplay' id='audio' style='display:none'></iframe><audio controls='' preload='none' type='audio/mp3'> <source src=../"+_11S+"></audio>" + ` </div>
<div  class =' miniCard' id ='miniVerbCard' ><span style="font-size:25px; color:red"><b>`+ PCils+'</b></span> <br>'  +_12e + "<iframe src='silence.mp3' type='audio/mp3' allow='autoplay' id='audio' style='display:none'></iframe><audio controls='' preload='none' type='audio/mp3'> <source src=../"+_12S+"></audio>" + ` </div>
</div>


<div id ="future" style="display:none" >
<div  class =' miniCard' id ='miniVerbCard' ><span style="font-size:25px; color:red"><b>`+ fje+'</b></span> <br>'  +_13e + "<iframe src='silence.mp3' type='audio/mp3' allow='autoplay' id='audio' style='display:none'></iframe><audio controls='' preload='none' type='audio/mp3'> <source src=../"+_13S+"></audio>" + ` </div>
<div  class =' miniCard' id ='miniVerbCard' ><span style="font-size:25px; color:red"><b>`+ ftu+'</b></span> <br>'  +_14e + "<iframe src='silence.mp3' type='audio/mp3' allow='autoplay' id='audio' style='display:none'></iframe><audio controls='' preload='none' type='audio/mp3'> <source src=../"+_14S+"></audio>" + ` </div>
<div  class =' miniCard' id ='miniVerbCard' ><span style="font-size:25px; color:red"><b>`+ fil+'</b></span> <br>'  +_15e + "<iframe src='silence.mp3' type='audio/mp3' allow='autoplay' id='audio' style='display:none'></iframe><audio controls='' preload='none' type='audio/mp3'> <source src=../"+_15S+"></audio>" + ` </div>
<div  class =' miniCard' id ='miniVerbCard' ><span style="font-size:25px; color:red"><b>`+ fnous+'</b></span> <br>'  +_16e + "<iframe src='silence.mp3' type='audio/mp3' allow='autoplay' id='audio' style='display:none'></iframe><audio controls='' preload='none' type='audio/mp3'> <source src=../"+_16S+"></audio>" + ` </div>
<div  class =' miniCard' id ='miniVerbCard' ><span style="font-size:25px; color:red"><b>`+ fvous+'</b></span> <br>'  +_17e + "<iframe src='silence.mp3' type='audio/mp3' allow='autoplay' id='audio' style='display:none'></iframe><audio controls='' preload='none' type='audio/mp3'> <source src=../"+_17S+"></audio>" + ` </div>
<div  class =' miniCard' id ='miniVerbCard' ><span style="font-size:25px; color:red"><b>`+ fils+'</b></span> <br>'  +_18e + "<iframe src='silence.mp3' type='audio/mp3' allow='autoplay' id='audio' style='display:none'></iframe><audio controls='' preload='none' type='audio/mp3'> <source src=../"+_18S+"></audio>" + ` </div>

`


document.getElementById("conjugations").innerHTML = btn+
`
<div id="verbTBL" class='content verbBackground'>
<div class='divTable minimalistBlack'>
<div class='divTableHeading'>
<div class='divTableRow'>
  <div  style="cursor: pointer;" class='time divTableHead'>Présent </div>
    <div  style="cursor: pointer;" class='time divTableHead'>Passé composé</div>
  <div  style="cursor: pointer;" class='time divTableHead'>futur</div>
</div>
</div>
<div class='divTableBody'>
<div class='divTableRow'>
  <div  id='Pje' class='divTableCell'>` + Pje  + `</div>
  <div id='PCje' class='divTableCell'>` + PCje  + `</div>
  <div id='PCje' class='divTableCell'>` + fje  + `</div>
</div>
<div class='divTableRow'>
  <div id='Ptu' class='divTableCell'>` +  Ptu + `</div>
  <div id='PCtu' class='divTableCell'>` + PCtu  + `</div>
  <div id='PCje' class='divTableCell'>` + ftu  + `</div>
</div>
<div class='divTableRow'>
  <div id='Pil' class='divTableCell'>` +  Pil + `</div>
  <div id='PCil' class='divTableCell'>` + PCil  + `</div>
  <div id='PCje' class='divTableCell'>` + fil  + `</div>

</div>
<div class='divTableRow'>
  <div id='Pnous' class='divTableCell'>` +  Pnous + `</div>
  <div id='PCnous' class='divTableCell'>` + PCnous  + `</div>
  <div id='PCje' class='divTableCell'>` + fnous  + `</div>

</div>
<div class='divTableRow'>
  <div id='Pvous' class='divTableCell'>` +  Pvous + `</div>
  <div id='PCvous' class='divTableCell'>` + PCvous  + `</div>
  <div id='PCje' class='divTableCell'>` + fvous  + `</div>

</div>
<div class='divTableRow'>
  <div id='Pils' class='divTableCell'>` +  Pils + `</div>
  <div  id='PCils' class='divTableCell'>` + PCils  + `</div>
  <div id='PCje' class='divTableCell'>` + fils  + `</div>

</div>
</div>
</div>
</div>
<div id="conjEx">

</div>
</div>
`;
}



document.getElementById("conjBtn").addEventListener("click", function() {
  if(document.getElementById('verbTBL').style.display =="none"){
    document.getElementById('conjEx').innerHTML = ""
    document.getElementById('verbTBL').style.display ="block"
    // document.getElementById('present').style.display ="none"
    // document.getElementById('PC').style.display ="none"
    // document.getElementById('future').style.display ="none"
  }
});

var times = document.getElementsByClassName("time");

times[0].addEventListener("click", function() {
document.getElementById('conjEx').innerHTML = conjExamples
document.getElementById('present').style.display="block"
document.getElementById('verbTBL').style.display ="none"

});
times[1].addEventListener("click", function() {
  document.getElementById('conjEx').innerHTML = conjExamples
document.getElementById('PC').style.display="block"
document.getElementById('verbTBL').style.display ="none"

});
times[2].addEventListener("click", function() {
  document.getElementById('conjEx').innerHTML = conjExamples
document.getElementById('future').style.display="block"
document.getElementById('verbTBL').style.display ="none"

});



var conjCheck = document.getElementById('CHECKconj');
var verbTable = document.getElementById("verbTBL");
var conjBtn = document.getElementById("conjBtn");
var checkIPA = document.getElementById('oIPA');
var seprators = document.getElementsByClassName('separator');
var checkEX = document.getElementById('oEX');
var checkPOS = document.getElementById('oPOS');

conjCheck.addEventListener('change', function() {
  if (conjCheck.checked == true){
      verbTable.style.display = "block";
      conjBtn.style.display = "block";
      document.getElementById('imgcontainer').style.display="none"
      document.getElementsByClassName('ipa')[0].style.display="none"
      document.getElementById('translation').style.display="none"
      for (i = 0 ; i < seprators.length ; i++){
        seprators[i].style.display="none"
      }
      document.getElementById('brIcon').style.display="none"
      document.getElementById('frenchExamble').style.display="none"
      document.getElementById('nxtIcon').style.display="none"
      document.getElementById('noOfEx').style.display="none"
      document.getElementById('englishExample').style.display="none"
      document.getElementById('exampleSound').style.display="none"
      document.getElementById('wordSound').style.display="none"
      document.getElementsByClassName('no-mobile')[0].style.display="none"

      checkEX.disabled = true
      checkIPA.disabled = true
      checkPOS.disabled = true

  }
  else{
    verbTable.style.display = "none";
    conjBtn.style.display = "none";
    document.getElementById('conjEx').innerHTML = ""

    document.getElementById('imgcontainer').style.display="block"
    if(checkIPA.checked == true){
      document.getElementsByClassName('ipa')[0].style.display="block"
    }
    document.getElementById('translation').style.display="block"
    for (i = 0 ; i < seprators.length ; i++){
      seprators[i].style.display="block"
    }
    document.getElementById('frenchExamble').style.display="inline-block"
    if(checkEX.checked == true){
      document.getElementById('brIcon').style.display="inline-block"
      document.getElementById('nxtIcon').style.display="inline-block"
      document.getElementById('noOfEx').style.display="block"
    }
    document.getElementById('englishExample').style.display="inline-block"
    document.getElementById('exampleSound').style.display="inline-block"
    document.getElementById('wordSound').style.display="inline-block"
    document.getElementsByClassName('no-mobile')[0].style.display="block"

    checkEX.disabled = false
    checkIPA.disabled = false
    checkPOS.disabled = false

  }

});
