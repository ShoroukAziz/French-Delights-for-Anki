
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


if (window.checkMut  === undefined){
  window.checkMut = true;
  checkMut.checked = true;
}


check(window.checkedIPA);
check2(window.checkedPOS);
checkx(window.checkedEX);
checkM(window.checkMut);


checkIPA.checked = window.checkedIPA
checkPOS.checked = window.checkedPOS
checkEX.checked = window.checkedEX
checkMut.checked = window.checkMut


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
    window.checkMut = document.getElementById('oMut').checked;
    checkM(window.checkMut);
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
          }

    } else if (checker == false) {

          document.getElementById("previousIcon").style.display = "none";
          document.getElementById("nxtIcon").style.display = "none";
          document.getElementById("noOfEx").style.display = "none";
    }

}


function checkM(checker) {
    if(checker == true) {
        document.getElementsByClassName("card-maturity")[0].style.display = "block";
    } else if (checker == false) {
        document.getElementsByClassName("card-maturity")[0].style.display = "none";
    }

}
