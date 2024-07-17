//Contexts
import { ThemeContext } from "../contexts/ThemeContext";

//Hooks
import { useContext } from "react";


const useTheme = () => {

  const {tema, alterarTema} = useContext(ThemeContext);

  const carregarTema = () =>{
    const html = document.querySelector('html');

    if(tema == "claro"){
      html.classList.remove('temaEscuro');
      html.classList.add('temaClaro');
      document.querySelector('meta[name="theme-color"]').setAttribute("content", "(251, 249, 255)");
      //alterarTemaImagens(30);
     
    }else{
      html.classList.remove('temaClaro');
      html.classList.add('temaEscuro');
      document.querySelector('meta[name="theme-color"]').setAttribute("content", "rgb(33, 33, 33)");
    }
  }

  return{tema, alterarTema, carregarTema};
}

export default useTheme;