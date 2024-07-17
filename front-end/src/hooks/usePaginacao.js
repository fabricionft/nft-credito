//Contexts
import { PaginacaoContext } from "../contexts/PaginacaoContext";

//Hooks
import { useContext } from "react";


const usePaginacao = () => {

  const {
    definirPaginacao,
    indicePaginaUsuarios, setIndicePaginaUsuarios, botoesPaginacaoUsuarios, setBotoesPaginacaoUsuarios,
    indicePaginaClientes, setIndicePaginaClientes, botoesPaginacaoClientes, setBotoesPaginacaoClientes,
    indicePaginaHistorico, setIndicePaginaHistorico, botoesPaginacaoHistorico, setBotoesPaginacaoHistorico,
    tamanhosPaginacao
  } = useContext(PaginacaoContext);

  return{
    definirPaginacao,
    indicePaginaUsuarios, setIndicePaginaUsuarios, botoesPaginacaoUsuarios, setBotoesPaginacaoUsuarios,
    indicePaginaClientes, setIndicePaginaClientes, botoesPaginacaoClientes, setBotoesPaginacaoClientes,
    indicePaginaHistorico, setIndicePaginaHistorico, botoesPaginacaoHistorico, setBotoesPaginacaoHistorico,
    tamanhosPaginacao
  };
}

export default usePaginacao;