var type = document.getElementsByClassName('type')[0].innerHTML.trim();
var w = window.outerWidth;
conjugations = document.getElementById('conjugationsDict').innerHTML


function audioButton(audio_file){
  return `
  <span  class="button--tiny " style="display: inline-block;"><a href='javascript:pycmd("ankiplay`+audio_file+`");' " class="replaybutton browserhide"><span>
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


  </span></a><span style="display: none;">[sound:`+audio_file+`]</span></span>
  `
}





if (type.includes('verb') && type != 'adverb'   ){

  if(document.getElementById('conjugationsDict')){
    if( conjugations =="" || conjugations =="null"){
        var conjCheck = document.getElementById('CHECKconj').disabled = true
          document.getElementById("CHECKconj").parentElement.style.color = '#4f5154';
    }


  }

  group = document.getElementById('group').innerHTML;




  conjugations_Json = JSON.parse(conjugations);

indc_pres = conjugations_Json ['indc_pres']
indc_impf= conjugations_Json ['indc_impf']
indc_phis= conjugations_Json ['indc_phis']
indc_futr= conjugations_Json ['indc_futr']

indc_cond= conjugations_Json ['indc_cond']

indc_pp= conjugations_Json ['indc_pp']
indc_pqp= conjugations_Json ['indc_pqp']
indc_pa= conjugations_Json ['indc_pa']
indc_fa= conjugations_Json ['indc_fa']

indc_condp= conjugations_Json ['indc_condp']

subj_pres= conjugations_Json ['subj_pres']
subj_impf= conjugations_Json ['subj_impf']
subj_p= conjugations_Json ['subj_p']
subj_pqf= conjugations_Json ['subj_pqf']

imperative_smpl= conjugations_Json ['imperative_smpl']
imperative_comp= conjugations_Json ['imperative_comp']

function generate_card(dict){
  if(dict == imperative_smpl || dict == imperative_comp){
    j = 3
  }
  else{
      j=6
  }

  card =""
  for (i = 0 ; i < 6 ; i++){
    conj = dict['conjs'][i]
    ipa = dict['IPA'][i]
    ex_fr =dict['example_fr'][i]
    ex_en =dict['example_en'][i]
    audio =dict['audio'][i]

     if(audio != ""){
    audio = audioButton(audio)
      // audio = "<br><iframe src='silence.mp3' type='audio/mp3' allow='autoplay' id='audio' style='display:none'></iframe><audio controls='' autoplay='false' preload='none' type='audio/mp3'> <source src='../"+audio+"'></audio>"
     }

    if (i == 0 ){
      card+="<div class='verb-conj-mini-card--left'>Singular</div>"
    }
    if (i == 3 ){
      card+="<div class=' verb-conj-mini-card--left'>Plural</div>"
    }
    if( (i==0 || i ==2 || i ==5) && j ==3 ){
      card+=  `

      <div style="visibility: hidden;" class="verb-conj-mini-card"> ` +

      "<span style='font-weight: bold;'>" + conj + "</span><br> <span style='font-size:20px ; color:grey'> " + ipa + "</span> " + ex_fr + " " + ex_en + " " + audio

      + `</div>

      `
    }
    else if (i==1  && j ==3 ){
      card+=  `

      <div class="verb-conj-mini-card"> ` +

      "<span style='font-weight: bold;'>" + dict['conjs'][0] + "</span><br> <span style='font-size:20px ; color:grey'> " + dict['IPA'][0] + "</span> " + ex_fr + " " + ex_en + " " + audio

      + `</div>

      `

    }
    else if (i==3  && j ==3 ){
      card+=  `

      <div class="verb-conj-mini-card"> ` +

      "<span style='font-weight: bold;'>" + dict['conjs'][1] + "</span><br> <span style='font-size:20px ; color:grey'> " +  dict['IPA'][1]  + "</span> " + ex_fr + " " + ex_en + " " + audio

      + `</div>

      `

    }
    else if (i==4  && j ==3 ){
      card+=  `

      <div class="verb-conj-mini-card"> ` +

      "<span style='font-weight: bold;'>" + dict['conjs'][2] + "</span><br> <span style='font-size:20px ; color:grey'> " +  dict['IPA'][2]  + "</span> " + ex_fr + " " + ex_en + " " + audio

      + `</div>

      `

    }
    else{
      card+=  `

      <div class="verb-conj-mini-card"> ` +

      "<span style='font-weight: bold;'>" + conj + "</span><br> <span style='font-size:20px ; color:grey'> " + ipa + "</span> " + ex_fr + " " + ex_en + " " + audio

      + `</div>

      `

    }


    // cards= cards+card
  }
  return "<div style='padding: 5px 0 150px 0'><div style='padding-left:8% ; '><div class=' verb-conj-mini-card__label'>first</div> <div class=' verb-conj-mini-card__label'>second</div> <div class=' verb-conj-mini-card__label'>third</div></div>"+card+"</div>"
}


  var conjCheck = document.getElementById('CHECKconj');
  var verbTable = document.getElementById("verbTBL");
  var conjBtn = document.getElementById("conjBtn");
  var checkIPA = document.getElementById('oIPA');
  var seprators = document.getElementsByClassName('separator');
  var checkEX = document.getElementById('oEX');
  var checkPOS = document.getElementById('oPOS');




  conjCheck.addEventListener('change', function() {
    if (conjCheck.checked == true){


      document.getElementsByTagName('body')[0].classList.add('conj-card')
      document.getElementsByTagName('body')[0].classList.remove('card')

      document.getElementsByClassName("conj-menus")[0].classList.remove('hidden')
      document.getElementsByClassName("conj-menus")[0].classList.add('block')


        document.getElementById("conjugations").style.display='block'
        document.getElementById('imgcontainer').style.display="none"
        document.getElementsByClassName('ipa')[0].style.display="none"
        document.getElementById('translation').style.display="none"
        for (i = 0 ; i < seprators.length ; i++){
          seprators[i].style.display="none"
        }
        document.getElementById('previousIcon').style.display="none"
        document.getElementById('frenchExamble').style.display="none"
        document.getElementById('nxtIcon').style.display="none"
        document.getElementById('noOfEx').style.display="none"
        document.getElementById('englishExample').style.display="none"
        document.getElementById('exampleSound').style.display="none"
        document.getElementById('wordSound').style.display="none"
        document.getElementsByClassName('attachments')[0].style.display="none"

        if(document.getElementsByClassName('typed')[0]){
          document.getElementsByClassName('typed')[0].style.display="none"
        }

        checkEX.disabled = true
        checkIPA.disabled = true
        checkPOS.disabled = true

    }
    else{

      document.getElementsByClassName("conj-menus")[0].classList.remove('block')
      document.getElementsByClassName("conj-menus")[0].classList.add('hidden')

      document.getElementsByTagName('body')[0].classList.remove('conj-card')
      document.getElementsByTagName('body')[0].classList.add('card')

      document.getElementById("conjugations").style.display='none'
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
        document.getElementById('previousIcon').style.display="inline-block"
        document.getElementById('nxtIcon').style.display="inline-block"
        document.getElementById('noOfEx').style.display="block"
      }
      document.getElementById('englishExample').style.display="inline-block"
      document.getElementById('exampleSound').style.display="inline-block"
      document.getElementById('wordSound').style.display="inline-block"
      document.getElementsByClassName('attachments')[0].style.display="block"

      if(document.getElementsByClassName('typed')[0]){
        document.getElementsByClassName('typed')[0].style.display="block"
      }

      checkEX.disabled = false
      checkIPA.disabled = false
      checkPOS.disabled = false

    }

  });





/************************************************************/

//make default selection the Indicative present
window.selectedConjId = window.selectedConjId|| "c1";

if(window.selectedConjId){
  if(document.getElementById(window.selectedConjId)){
    if(document.getElementById(window.selectedConjId).disabled == false)
      var radio = document.getElementById(window.selectedConjId);
    else{
      window.selectedId = 'c1';
      var radio = document.getElementById(window.selectedConjId);
      radio.checked = 'checked';
      checkConj(window.selectedConjId);
    }
  }
  else window.selectedConjId = 'c1'
  var radio = document.getElementById(window.selectedConjId);
  radio.checked = 'checked';
  checkConj(window.selectedConjId);
}


var conj_radios = document.getElementsByName('conj-radio');
for(var i = 0, max = conj_radios.length; i < max; i++) {
    conj_radios[i].addEventListener('change', function() {
         window.selectedConjId = this.id
         checkConj(window.selectedConjId);

  }, false);
}



function checkConj(id) {
  if (id == 'c1'){
    document.getElementById("conjugations").innerHTML= generate_card(indc_pres)
  }
  else if (id == 'c2') {

      document.getElementById("conjugations").innerHTML= generate_card(indc_impf)
  }
  else if (id == 'c3') {
  document.getElementById("conjugations").innerHTML= generate_card(indc_futr)
  }
  else if(id == 'c4'){
  document.getElementById("conjugations").innerHTML= generate_card(indc_phis)
  }
  /***************************/
  else if(id == 'c5'){
  document.getElementById("conjugations").innerHTML= generate_card(indc_pp)
}
else if(id == 'c6'){
  document.getElementById("conjugations").innerHTML= generate_card(indc_pqp)
}
else if(id == 'c7'){
  document.getElementById("conjugations").innerHTML= generate_card(indc_pa)
}
else if(id == 'c8'){
  document.getElementById("conjugations").innerHTML= generate_card(indc_fa)
}
  /***************************/
else if(id == 'c9'){
  document.getElementById("conjugations").innerHTML= generate_card(subj_pres)
}
else if(id == 'c10'){
  document.getElementById("conjugations").innerHTML= generate_card(subj_impf)
}
else if(id == 'c11'){
  document.getElementById("conjugations").innerHTML= generate_card(subj_p)
}
else if(id == 'c12'){
  document.getElementById("conjugations").innerHTML= generate_card(subj_pqf)
}
/***************************/
else if(id == 'c13'){
  document.getElementById("conjugations").innerHTML= generate_card(indc_cond)
}
else if(id == 'c14'){
  document.getElementById("conjugations").innerHTML= generate_card(indc_condp)
}
/***************************/
else if(id == 'c15'){
  document.getElementById("conjugations").innerHTML= generate_card(imperative_smpl)
}
else if(id == 'c16'){
  document.getElementById("conjugations").innerHTML= generate_card(imperative_comp)
}
}













}
