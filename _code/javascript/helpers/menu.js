if(window.menuStatus == undefined){
  window.menuStatus =  'close';
  document.getElementsByClassName("menu__head__icon--open")[0].style.display="none"
}
else if (window.menuStatus == 'open'){
}
else{
}

 document.getElementsByClassName("menu__head__icon")[0].addEventListener("click",function( ){
  dispalymenu(window.menuStatus);
});

document.getElementsByClassName("menu__head__icon--open")[0].addEventListener("click",function( ){
 dispalymenu(window.menuStatus);
});


function dispalymenu (status){

    if (status == 'close'){

      document.getElementsByClassName('menus')[0].style.backgroundColor="#f3dcf500";
      document.getElementsByClassName('menu_hidable')[0].style.display="none";
      document.getElementsByClassName("menu__head__icon--open")[0].style.display="block";
      window.menuStatus = 'open'
    }
    else{

      document.getElementsByClassName('menus')[0].style.backgroundColor="#f3dcf5d4";
      document.getElementsByClassName('menu_hidable')[0].style.display="block";
      document.getElementsByClassName("menu__head__icon--open")[0].style.display="none";
      window.menuStatus = 'close'
    }

}
