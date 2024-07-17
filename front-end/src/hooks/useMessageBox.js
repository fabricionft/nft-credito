//Components
import { MessageBoxContext } from "../contexts/MessaBoxContext";

//Hooks
import { useContext } from "react";
import {useLocation, useNavigate} from 'react-router-dom';
import useAdminSession from "./useAdminSession";
import useLoader from "./useLoader";


const useMessageBox = () => {

  const {visibilidadeMessageBox, exibir, esconder} = useContext(MessageBoxContext);
  const {deslogarComoAdmin} = useAdminSession();
  const location = useLocation();
  const navigate = useNavigate();
  const {esconderCardLoader} = useLoader();

  const exibirMessageBox = (sucesso, destino, msg, deslogar, recarregar) => {
    esconderCardLoader();
    navigate(
      (destino) ? destino : location.pathname,{
        state:{
          sucesso: sucesso,
          msg: msg,
          txtBotao: (sucesso) ? "Prosseguir" : (deslogar) ? "Ok" : "Tentar novamente",
          deslogar: deslogar,
          recarregar: recarregar
        }
      }
    );
    exibir();
  }

  const state = location.state;

  const dados = (state) && {
    sucesso: state.sucesso,
    msg: state.msg,
    txtBotao: state.txtBotao,
    deslogar: state.deslogar,
    recarregar: state.recarregar
  }

  const fecharFormularioEDeslogar = () => {
    esconder()
    deslogarComoAdmin();
  }

  return{visibilidadeMessageBox, dados, exibirMessageBox, esconder, fecharFormularioEDeslogar};
}

export default useMessageBox;