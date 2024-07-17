const verificarSeOtextoPossuiSomenteNumeros = (texto) => {

  for(var i = 0; i < texto.length; i++){
    if(![0,1,2,3,4,5,6,7,8,9].includes(parseInt(texto.substring(i, i+1))))
      return true;
  }
}

export default verificarSeOtextoPossuiSomenteNumeros;