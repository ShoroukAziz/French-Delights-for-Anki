
String.prototype.replaceAll = function(strReplace, strWith) {
    // See http://stackoverflow.com/a/3561711/556609
    var esc = strReplace.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    var reg = new RegExp(esc, 'ig');
    return this.replace(reg, strWith);
};

translation =document.getElementsByClassName('translation')[0].innerHTML
englishEx = document.getElementsByClassName('englishEx')[0].innerHTML
type = document.getElementsByClassName('type')[0].innerHTML

if(type.includes('phrase')){
  document.getElementById('imgcontainer').style.minHeight='0px'
  document.getElementById('question').innerHTML = 'How do we say <br>'
  document.getElementById('question-p2').innerHTML = '<br>in French ?'
  document.getElementsByClassName('translation--front')[0].style.fontSize='35px'

}



  parts = translation.split(",")
  parts.forEach((part, i) => {
    part = part.trim()
    if (!part.includes('(')){
      if(englishEx.includes(part)){
        document.getElementsByClassName('englishEx')[0].innerHTML=englishEx.replaceAll(part,"<span class='example__higlighted-word'>"+part+"</span>")
      }
    }
    if (type.includes('verb') && !type.includes('adverb')){
      parts.forEach((part, i) => {
        if(part.includes('to') || part.includes('for')){
          part = part.replace('to','').trim()
          part = part.replace('for','').trim()
          if (!part.includes('()')){
            if(englishEx.includes(part)){
              document.getElementsByClassName('englishEx')[0].innerHTML=englishEx.replaceAll(part,"<span class='example__higlighted-word'>"+part+"</span>")
            }
          }

        }
      });

    }
  });

  document.getElementsByClassName('translation')[0].innerHTML =""
  parts.forEach((part, i) => {
    part = part.trim()
    if (part.includes('(')){
      part = "<span class='translation__word translation__word--note'>"+part.replace('(','').replace(')','')+"<span/>"

    }
    else{
      part = "<span class='translation__word'>"+part+"<span/>"

    }
    document.getElementsByClassName('translation')[0].innerHTML += part
  });
