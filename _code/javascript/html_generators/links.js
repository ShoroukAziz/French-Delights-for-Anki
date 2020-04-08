// function strip(html){
//   var doc = new DOMParser().parseFromString(html, 'text/html');
//   return doc.body.textContent || "";
// }
//
// word = strip(document.getElementById('word').innerHTML);
// var divL = document.createElement('div');
// divL.className='links'
// divL.innerHTML = `
//   <div class="link link1"> <a class="text"  href="https://www.collinsdictionary.com/dictionary/french-english/`+word+`"> Collins</a> </div>
//   <div class="link link2" > <a class="text"  href="https://en.wiktionary.org/wiki/`+word+`#French"> wiktionary</a> </div>
//   <div class="link link3" > <a class="text"  href="https://www.linguee.com/english-french/search?source=auto&query=`+word+`"> linguee</a> </div>
//   <div class="link link4" > <a class="text"  href="https://www.google.com/search?q=`+word+`"> Google</a> </div>
// `
// document.getElementsByClassName('template')[0].appendChild(divL);
