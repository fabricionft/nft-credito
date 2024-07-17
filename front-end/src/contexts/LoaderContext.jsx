import { createContext, useState } from "react";

export const LoaderContext = createContext();

export const LoaderProvider = ({children}) => {

  const [visibilidadeLoader, setVisibilidadeLoader] = useState(true);
  const [visibilidadeCardLoader, setVisibilidadeCardLoader] = useState(false);

  const alterarVisibilidadeLoader = (entidade) => {
    setVisibilidadeLoader((entidade.length) ? true : false);
  }

  const [visibilidadeLoaderSecundario, setVisibilidadeLoaderSecundario] = useState(true);

  const alterarVisibilidadeLoaderSecundario = (entidade) => {
    setVisibilidadeLoaderSecundario((entidade.length) ? true : false);
  }

  const exibirCardLoader = () => setVisibilidadeCardLoader(true);
  const esconderCardLoader = () => setVisibilidadeCardLoader(false);

  return(
    <LoaderContext.Provider value={{
      visibilidadeLoader, setVisibilidadeLoader, alterarVisibilidadeLoader,
      visibilidadeLoaderSecundario, setVisibilidadeLoaderSecundario, alterarVisibilidadeLoaderSecundario,
      visibilidadeCardLoader, exibirCardLoader, esconderCardLoader
    }}>
      {children}
    </LoaderContext.Provider>
  )
}