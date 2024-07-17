//contexts
import { FiltrosContext } from "../contexts/FiltrosContext";

//Hooks
import { useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";


const useFiltros = () => {

  const location = useLocation();
  const {exibirConteudo, setExibirConteudo} = useContext(FiltrosContext);
  const [ordem, setOrdem] = useState("asc");
  const [pesquisa, setPesquisa] = useState("");

  useEffect(() => {
    setExibirConteudo("dados");
  }, [location.pathname])

  return{ordem, setOrdem, pesquisa, setPesquisa, exibirConteudo, setExibirConteudo};
}

export default useFiltros;