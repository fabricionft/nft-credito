//Contexts
import { FormulariosContext } from "../contexts/FormulariosContext";

//Hooks
import { useContext,  useState } from "react";
import { useLocation } from "react-router-dom";


const useFormularios = () => {

  const {
    visibilidadeFormArquivos, exibirFormArquivos, esconderFormArquivos,
    visibilidadeFormTrocarSenha, exibirFormTrocarSenha, esconderFormTrocarSenha,
    indiceEtapa, proximaEtapa, etapaAnterior, setIndiceEtapa
  } = useContext(FormulariosContext);

  const [visibilidadeSenha, setVisibilidadeSenha] = useState(false);

  return{
    visibilidadeFormArquivos, exibirFormArquivos, esconderFormArquivos,
    visibilidadeFormTrocarSenha, exibirFormTrocarSenha, esconderFormTrocarSenha,
    indiceEtapa, proximaEtapa, etapaAnterior, setIndiceEtapa,
    visibilidadeSenha, setVisibilidadeSenha
  };
}

export default useFormularios;