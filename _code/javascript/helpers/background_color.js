/****************************************************************************************/
/*Change the card's background color according to its type*/
var type = document.getElementsByClassName('type')[0].innerHTML.trim();
if (type.includes('feminine') && type.includes('masculine')){
  document.getElementById("container").className = "both__background";
  document.getElementById("imgcontainer").className = "both__image";
}
else if (type.trim().includes('feminine')) {
  document.getElementById("container").className = "feminine__background";
  document.getElementById("imgcontainer").className = "feminine__image";
}
else if (type.trim().includes('masculine')){
  document.getElementById("container").className = "masculine__background";
  document.getElementById("imgcontainer").className = "masculine__image";
}
else if (type.trim().includes('adjective')) {
  document.getElementById("container").className = "adjective__background";
  document.getElementById("imgcontainer").className = "adjective__image";

}
else if (type.trim().includes('adverb')) {
  document.getElementById("container").className = "adverb__background";
  document.getElementById("imgcontainer").className = "adverb__image";
}
else if (type.trim().includes('verb')) {
  document.getElementById("container").className = "verb__background";
  document.getElementById("imgcontainer").className = "verb__image";
}
else if (type.trim().includes('verb')) {
  document.getElementById("container").className = "verb__background";
  document.getElementById("imgcontainer").className = "verb__image";
}
else {
  document.getElementById("container").className = "other__background";
  document.getElementById("imgcontainer").className = "other__image";
}
