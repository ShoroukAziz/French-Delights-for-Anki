type = document.getElementsByClassName('type')[0].innerHTML
double = document.getElementsByClassName('double')[0].innerHTML

if(type.includes('phrase')){
  document.getElementById('question').innerHTML = 'What does this phrase mean ?'
  document.getElementById('type').innerHTML = ''
}

if(double == 'y'){
  document.getElementById('attention').innerHTML = '<img class="attention__icon" src="_french-delights/assets/icons/attention.png"/>listen to the example cearfully!'


}
else{
  document.getElementById('attention').style.display='none'
}
