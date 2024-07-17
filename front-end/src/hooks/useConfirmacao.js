//Hooks
import useMessageBox from "./useMessageBox";
import useTratarErro from "./useTratarErro";
import useLoader from '../hooks/useLoader';
import useFormularios from "./useFormularios";

//Services
import api from "../services/api";


const useConfirmacao = () => {

  const {exibirMessageBox} = useMessageBox();
  const {tratarErro} = useTratarErro();
  const {proximaEtapa} = useFormularios();
  const {exibirCardLoader, esconderCardLoader} = useLoader();

  const solicitarCodigoDeConfirmacao = (email) => {
    exibirCardLoader();
    api.post("/confirmacao?email=".concat(email))
    .then(() => {
      esconderCardLoader();
      proximaEtapa();
      exibirMessageBox(
        true,
        "",
        "O código de confirmação foi enviado com sucesso para seu email!!"
      );
    })
    .catch((error) => {
      tratarErro("", error)
    });
  }

  const buscarUsuarioPorEmail = (email) => {
    api.get("/usuario/email/".concat(email))
    .then(() => {
      proximaEtapa();
      solicitarCodigoDeConfirmacao(email);
    })
    .catch((error) => {
      tratarErro("", error);
    })
  }

  return{solicitarCodigoDeConfirmacao, buscarUsuarioPorEmail};
}

export default useConfirmacao;