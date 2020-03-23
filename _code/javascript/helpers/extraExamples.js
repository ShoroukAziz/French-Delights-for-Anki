type = document.getElementsByClassName('type')[0].innerHTML

current_index = -1
original_index = -1
bankJSON=[]
var checkEX = document.getElementById('oEX');

indexOnScreen = 1
function brepBank(bank){
  bank = bank.split("'").join("\"")
  bankJSON = JSON.parse(bank);
  document.getElementById('noOfEx').innerHTML = "<br> example "+indexOnScreen+ " of "+ bankJSON.length
  return (bankJSON)
}
if(document.getElementById('exBank')){
      if(document.getElementById('exBank').innerHTML != ""){

                bank = strip(document.getElementById('exBank').innerHTML.trim())
                bankJSON = brepBank(bank)
                if(bankJSON.length > 1){
                current_index = -1
                original_index = -1
                current_example =strip(document.getElementById('frenchExamble').innerHTML.trim())
                for (var i = 0 ; i < bankJSON.length ; i++){
                  if (current_example == bankJSON[i]['fr']){
                    current_index = i
                    original_index = i
                  }
                }
              }
              else{
                document.getElementById('brIcon').style.display='none'
                document.getElementById('nxtIcon').style.display='none'
                document.getElementById('noOfEx').style.display='none'
                // checkEX.disabled = true
              }


              for (var i = 0 ; i < bankJSON.length ; i++){
                bankJSON[i]['fr'] = bankJSON[i]['fr'].replace(word,"<span style='color:red; background-color:#c2e653bd;'>"+word+"</span>")
                // bankJSON[i]['en'] =  bankJSON[i]['en'].replace(translation,"<span style='color:red; background-color:#c2e653bd;'>"+translation+"</span>")
                //
                // if (type.includes(' verb')){
                //   to_translation = translation.split('to ')
                //   if(to_translation.length == 2  ){
                //     bankJSON[i]['en'] = bankJSON[i]['en'].replace(to_translation[1],"<span style='color:red; background-color:#c2e653bd;'>"+to_translation[1]+"</span>")
                //
                //   }
                //   other_translations = translation.split(',')
                //   console.log(other_translations)
                //   if(other_translations.length > 1  ){
                //     for(var j = 0 ; j < other_translations.length ; j++ ){
                //       console.log(other_translations[j])
                //       other_translations[j] = other_translations[j].split('to')[1]
                //       bankJSON[i]['en'] =bankJSON[i]['en'].replace(other_translations[j],"<span style='color:red; background-color:#c2e653bd;'>"+other_translations[j]+"</span>")
                //
                //
                //
                //     }
                //
                //
                //   }
                // }
                // else {
                //   other_translations = translation.split(' ')
                //
                //   if(other_translations.length > 1 ){
                //     // console.log(other_translations)
                //     for(var j = 0 ; j < other_translations.length ; j++ ){
                //       if (bankJSON[i]['en'].includes(other_translations[j]) && other_translations[j]!="," && other_translations[j] != 'to'){
                //         bankJSON[i]['en']= bankJSON[i]['en'].replace(other_translations[j],"<span style='color:red; background-color:#c2e653bd;'>"+other_translations[j]+"</span>")
                //
                //       }
                //
                //     }
                //
                //
                //   }
                // }


              }

              // console.log(current_index)

      }
      else{



        checkEX.disabled = true
        document.getElementById('brIcon').style.display='none'
        document.getElementById('nxtIcon').style.display='none'
        document.getElementById('noOfEx').style.display='none'

      }

}
function nextExample(){
  indexOnScreen+=1;
  if(indexOnScreen > bankJSON.length){
    indexOnScreen = 1
  }
  document.getElementById('noOfEx').innerHTML = "<br> example "+indexOnScreen+ " of "+ bankJSON.length
  if (current_index == bankJSON.length-1 ){
    current_index = 0
    // console.log(current_index);
  }
  else{
    current_index += 1
    // console.log(current_index);
  }
  if (current_index == original_index){
    document.getElementById('frenchExamble').innerHTML = bankJSON[current_index]['fr']
    document.getElementById('englishExample').innerHTML = bankJSON[current_index]['en']
  }
  else{
    document.getElementById('frenchExamble').innerHTML = bankJSON[current_index]['fr'] + "<br><br><iframe src='silence.mp3' type='audio/mp3' allow='autoplay' id='audio' style='display:none'></iframe><audio controls='' autoplay='false' preload='none' type='audio/mp3'> <source src='../"+bankJSON[current_index]['audio']+"'></audio>"
    document.getElementById('englishExample').innerHTML = bankJSON[current_index]['en']
  }

}

function breviousExample(){
  indexOnScreen-=1;
  if(indexOnScreen <= 0){
    indexOnScreen = bankJSON.length
  }
  document.getElementById('noOfEx').innerHTML = "<br> example "+indexOnScreen+ " of "+ bankJSON.length
  if (current_index == 0 ){
    current_index = bankJSON.length-1
    console.log(current_index);
  }
  else{
    current_index -= 1
    console.log(current_index);
  }
  if (current_index == original_index){
    document.getElementById('frenchExamble').innerHTML = bankJSON[current_index]['fr']
    document.getElementById('englishExample').innerHTML = bankJSON[current_index]['en']
  }
  else{
    document.getElementById('frenchExamble').innerHTML = bankJSON[current_index]['fr'] + "<br><br><iframe src='silence.mp3' type='audio/mp3' allow='autoplay' id='audio' style='display:none'></iframe><audio controls='' autoplay='false' preload='none' type='audio/mp3'> <source src='../"+bankJSON[current_index]['audio']+"'></audio>"
    document.getElementById('englishExample').innerHTML = bankJSON[current_index]['en']
  }
}
