//Contexts
import { LoaderContext } from "../contexts/LoaderContext";

//Hooks
import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";

const useLoader = () => {

  const {
    visibilidadeLoader, setVisibilidadeLoader, alterarVisibilidadeLoader,
    visibilidadeLoaderSecundario, setVisibilidadeLoaderSecundario, alterarVisibilidadeLoaderSecundario,
    visibilidadeCardLoader, exibirCardLoader, esconderCardLoader
  } = useContext(LoaderContext);

  useEffect(() => {
    setVisibilidadeLoader(true);
    setVisibilidadeLoaderSecundario(true);
  }, [useLocation().pathname])

  return{
    visibilidadeLoader, alterarVisibilidadeLoader,
    visibilidadeLoaderSecundario, alterarVisibilidadeLoaderSecundario,
    visibilidadeCardLoader, exibirCardLoader, esconderCardLoader
  };
}

export default useLoader;