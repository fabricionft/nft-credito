import { createContext, useState } from "react";

export const FormulariosContext = createContext();

export const FormularioProvider = ({children}) => {

  //Form arquivo
  const [visibilidadeFormArquivos, setVisibilidadeFormArquivos] = useState(false);

  const exibirFormArquivos = () => setVisibilidadeFormArquivos(true);
  const esconderFormArquivos = () => setVisibilidadeFormArquivos(false);

  //Form trocar senha
  const [visibilidadeFormTrocarSenha, setVisibilidadeFormTrocarSenha] = useState(false);

  const exibirFormTrocarSenha = () => setVisibilidadeFormTrocarSenha(true);
  const esconderFormTrocarSenha = () => setVisibilidadeFormTrocarSenha(false);

  const [indiceEtapa, setIndiceEtapa] = useState(1);

  const proximaEtapa = () => setIndiceEtapa(indiceEtapa+1);
  const etapaAnterior = () => setIndiceEtapa(indiceEtapa-1);

  return(
    <FormulariosContext.Provider value={{
      visibilidadeFormArquivos, exibirFormArquivos, esconderFormArquivos,
      visibilidadeFormTrocarSenha, exibirFormTrocarSenha, esconderFormTrocarSenha,
      indiceEtapa, proximaEtapa, etapaAnterior,setIndiceEtapa
    }}>
      {children}
    </FormulariosContext.Provider>
  )
}