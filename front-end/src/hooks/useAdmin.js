//Hooks
import { useState } from 'react';
import useTratarErro from '../hooks/useTratarErro';
import useAdminSession from './useAdminSession';
import useMessageBox from './useMessageBox';
import useLoader from './useLoader';

//Services
import api from '../services/api';


const useAdmin = () => {
  
  const [admin, setAdmin] = useState({});
  const {tratarErro} = useTratarErro();
  const {logarComoAdmin} = useAdminSession();
  const {exibirMessageBox} = useMessageBox();
  const {exibirCardLoader} = useLoader();

  const preencherAdmin = (e) => setAdmin({...admin, [e.target.name] : e.target.value});

  const fazerLoginComoAdmin = () => {
    exibirCardLoader();
    api.post("/usuario/loginAdmin", {...admin})
    .then((resp) => {
      logarComoAdmin(resp.data);
      exibirMessageBox(
        true,
        "/adm/menu",
        "logado no painel administrativo com sucesso!"
      );
    })
    .catch((error) => {
      tratarErro("", error)
    })
  }

  const enviarFormularioFazerLoginComoAdmin = (e) => {
    e.preventDefault();
    fazerLoginComoAdmin();
  }

  return{admin, preencherAdmin, enviarFormularioFazerLoginComoAdmin};
}

export default useAdmin;