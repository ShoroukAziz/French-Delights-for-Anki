
var checkIPA = document.getElementById('oIPA');
var checkPOS = document.getElementById('oPOS');
var checkEX = document.getElementById('oEX');

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


check(window.checkedIPA);
check2(window.checkedPOS);
checkx(window.checkedEX);

checkIPA.checked = window.checkedIPA
checkPOS.checked = window.checkedPOS
checkEX.checked = window.checkedEX

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

function check(checker) {
    if(checker == true) {
        document.getElementsByClassName("ipa")[0].style.display = "block";
    } else if (checker == false) {
        document.getElementsByClassName("ipa")[0].style.display = "none";
    }
}

function check2(checker) {

    if(checker == true) {
         document.getElementsByClassName("corner")[0].style.display = "block";
    } else if (checker == false) {
         document.getElementsByClassName("corner")[0].style.display = "none";
    }
}

function checkx(checker) {

    if(checker == true) {
        // console.log('true')
          if (document.getElementById('exBank').innerHTML == ""){
            checkEX.checker = false;
          }
          else{
            document.getElementById("brIcon").style.display = "inline-block";
            document.getElementById("nxtIcon").style.display = "inline-block";
            document.getElementById("noOfEx").style.display = "block";
          }

    } else if (checker == false) {

          document.getElementById("brIcon").style.display = "none";
          document.getElementById("nxtIcon").style.display = "none";
          document.getElementById("noOfEx").style.display = "none";
    }

}
