//Hooks
import { useEffect, useState } from "react";
import useTratarErro from "./useTratarErro";
import usePaginacao from "./usePaginacao";
import useLoader from "./useLoader";

//Services
import api from "../services/api";


const useUSuarios = () => {

  const [usuarios, setUsuarios] = useState([]);
  const {definirPaginacao, indicePaginaUsuarios, setIndicePaginaUsuarios, setBotoesPaginacaoUsuarios, tamanhosPaginacao} = usePaginacao();
  const {alterarVisibilidadeLoader} = useLoader();
  const {tratarErro} = useTratarErro();

  useEffect(() => {
    api.get("/usuario", 
    {
      params: {
        size : tamanhosPaginacao.tamanhoPaginacaoUsuarios,
        page: indicePaginaUsuarios
      }
    })
    .then((resp) => {
      setUsuarios(resp.data.content);
      alterarVisibilidadeLoader(resp.data);
      definirPaginacao(
        resp.data,
        setBotoesPaginacaoUsuarios,
        setIndicePaginaUsuarios,
        'indiceUsuarios'
      )
    })
    .catch((error) => {
      tratarErro("", error);
    })
  }, [indicePaginaUsuarios]);

  return{usuarios};
}

export default useUSuarios;