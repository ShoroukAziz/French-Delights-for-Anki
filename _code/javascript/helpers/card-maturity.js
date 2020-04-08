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
