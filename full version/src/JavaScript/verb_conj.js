var type = document.getElementsByClassName('type')[0].innerHTML.trim();
var w = window.outerWidth;
var body_inner = document.getElementsByTagName('body')[0].innerHTML
var body_class = document.getElementsByTagName('body')[0].className




if (type.includes('verb') && type != 'adverb' && window.outerWidth > 1200){

  group = document.getElementById('group').innerHTML;
  conjugations = document.getElementById('conjugationsDict').innerHTML



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
      audio = "<br><iframe src='silence.mp3' type='audio/mp3' allow='autoplay' id='audio' style='display:none'></iframe><audio controls='' autoplay='false' preload='none' type='audio/mp3'> <source src='../"+audio+"'></audio>"
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

      // x = document.getElementsByTagName('body')[0].className
      // x = x.replace('card' , 'conj-card')
      //   document.getElementsByTagName('body')[0].className = x
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

        checkEX.disabled = true
        checkIPA.disabled = true
        checkPOS.disabled = true

    }
    else{


      // x = document.getElementsByTagName('body')[0].className
      // x = x.replace('conj-card' , 'card')
      // document.getElementsByTagName('body')[0].className = x

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

      checkEX.disabled = false
      checkIPA.disabled = false
      checkPOS.disabled = false

    }

  });



  // window.addEventListener('resize', function(event){
  //   var w = window.outerWidth;
  //
  //   if(w > 1200){
  //
  //       func()
  //   }
  //   else{
  //     document.getElementsByTagName('body')[0].innerHTML = body_inner
  //     document.getElementsByTagName('body')[0].className = body_class
  //
  //   }
  //
  // });




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
