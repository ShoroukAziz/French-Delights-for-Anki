


  var options = document.getElementsByName('options');

  if(document.getElementsByName('extraOptions')){

  var extraOptions = document.getElementsByName('extraOptions');
  }

  if(document.getElementById("extra")){
    extra = document.getElementById("extra").innerHTML
    if (extra.includes("rabic") ){
      window.optionId = "root";
    }
    else{
      window.optionId = "noteOnly";
    }

  }
  else{
    window.optionId = "noteOnly";
  }





  window.optionId = window.optionId || 'noteOnly';
  if(window.optionId != 0){
    var option = document.getElementById(window.optionId);
    option.style.backgroundColor='#60f0ad'
    dispalyOption(window.optionId);

  }

  for(var i = 0, max = options.length; i < max; i++) {

      options[i].onclick =function() {
        // console.log('clicked')
           window.optionId = this.id
           dispalyOption(window.optionId);

    };
  }

  function dispalyOption(id) {
    for(var i = 0, max = options.length; i < max; i++) {
        options[i].style.backgroundColor='#f3dcf500'
    }
    for(var i = 0, max = extraOptions.length; i < max; i++) {
        extraOptions[i].style.display='none'
    }

    document.getElementById(id).style.backgroundColor='#60f0ad'
    if(id == 'root'){
      document.getElementById("extraDiv").style.display="block"
    }
    else if (id == "brain"){
      document.getElementById("mnemonicDiv").style.display="block"
    }
    else if (id == "tagsico"){
      document.getElementById("tagsDiv").style.display="block"
    }

  }
