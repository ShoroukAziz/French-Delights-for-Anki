group = document.getElementById('group').innerHTML;

conjugations = document.getElementById('conjugationsDict').innerHTML
conjugations_Json = JSON.parse(conjugations);

var conjCheck = document.getElementById('CHECKconj');
var verbTable = document.getElementById("verbTBL");
var conjBtn = document.getElementById("conjBtn");
var checkIPA = document.getElementById('oIPA');
var seprators = document.getElementsByClassName('separator');
var checkEX = document.getElementById('oEX');
var checkPOS = document.getElementById('oPOS');

conjCheck.addEventListener('change', function() {
  if (conjCheck.checked == true){

      // verbTable.style.display = "block";
      // conjBtn.style.display = "block";
      document.getElementById("conjugations").innerHTML=conjugations_Json['indc_pres']['conjs'] + conjugations_Json['indc_pres']['IPA']
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

    // verbTable.style.display = "none";
    // conjBtn.style.display = "none";
    // document.getElementById('conjEx').innerHTML = ""
document.getElementById("conjugations").innerHTML=""
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
