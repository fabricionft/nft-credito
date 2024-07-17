//Assets
import imgFundo from '../assets/images/fundo.png';
import imgItens from '../assets/images/fundo3.jpeg';

//Hooks
import { useEffect, useState } from 'react';


const useImagens = () => {

  const [imagem, setImagem] = useState(imgFundo);
  
  useEffect(() => {
    function redimencionar(){
      if(window.innerWidth < 800){
        setImagem(imgItens);
      }
      else{
        setImagem(imgFundo);
      }
    }

    redimencionar();

    window.addEventListener('resize', redimencionar);

    return() => {
      window.removeEventListener('resize', redimencionar);
    }
  }, []);

  return{imagem};
}

export default useImagens;