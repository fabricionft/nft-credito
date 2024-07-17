//Hooks
import { useEffect, useState } from "react";
import useLoader from "./useLoader";
import useTratarErro from "./useTratarErro";
import { useParams } from "react-router-dom";
import useFiltros from "./useFiltros";
import usePaginacao from "./usePaginacao";

//Services
import api from "../services/api";


const useHistorico = () => {

  const [historico, setHistorico] = useState([]);
  const {alterarVisibilidadeLoader} = useLoader();
  const {tratarErro} = useTratarErro();
  const {id} = useParams();
  const {exibirConteudo} = useFiltros();
  const {definirPaginacao, indicePaginaHistorico, setIndicePaginaHistorico, setBotoesPaginacaoHistorico, tamanhosPaginacao} = usePaginacao();

  const buscarHistorico = () => {
    api.get("/cliente/historicoDeAcoes/".concat(id),
    {
      params: {
        size : tamanhosPaginacao.tamanhoPaginacaohistorico,
        page: indicePaginaHistorico
      }
    })
    .then((resp) => {
      alterarVisibilidadeLoader(resp.data.content);
      setHistorico(resp.data.content);
      definirPaginacao(
        resp.data,
        setBotoesPaginacaoHistorico,
        setIndicePaginaHistorico,
        'indiceHistorico'
      );
    })
    .catch((error) => {
      tratarErro('', error)
    });
  }

  useEffect(() => {
    if(exibirConteudo === "historico"){
      buscarHistorico();
    }
  }, [exibirConteudo, indicePaginaHistorico])
  
  return{historico}
}

export default useHistorico;