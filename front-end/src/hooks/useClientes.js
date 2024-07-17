//Hooks
import { useEffect, useState } from "react"
import useSession from './useSession';
import useTratarErro from './useTratarErro';
import useLoader from "./useLoader";
import { useParams } from "react-router-dom";
import usePaginacao from "./usePaginacao";

//Services
import api from '../services/api';


const useClientes = () => {

  const {codigo} = useSession();
  const {tratarErro} = useTratarErro();
  const [clientes, setClientes] = useState([]);
  const {alterarVisibilidadeLoaderSecundario} = useLoader();
  const {id} = useParams();
  const {definirPaginacao, indicePaginaClientes, setIndicePaginaClientes, setBotoesPaginacaoClientes, tamanhosPaginacao} = usePaginacao();

  const listarClientes = (codigo) => {
    api.get("/cliente/clientesDeUmUsuario/".concat(codigo),
    {
      params: {
        size : tamanhosPaginacao.tamanhoPaginacaoClientes,
        page: indicePaginaClientes
      }
    })
    .then((resp) => {
      alterarVisibilidadeLoaderSecundario(resp.data.content);
      setClientes(resp.data.content);
      definirPaginacao(
        resp.data,
        setBotoesPaginacaoClientes,
        setIndicePaginaClientes,
        'indiceClientes'
      )
    })
    .catch((error) => {
      tratarErro(error);
    });
  }

  useEffect(() => {
    listarClientes((id) ? id : codigo);
  }, [indicePaginaClientes]);


  return{clientes}
}

export default useClientes;