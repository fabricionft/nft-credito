//Hooks
import useMessageBox from "./useMessageBox";


const useTratarErro = () => {

  const {exibirMessageBox} = useMessageBox();

  const tratarErro = (destino, error) => {
    exibirMessageBox(
      false,
      (error.response.status == 403) ? "/" : destino,
      (error.response.status == 403) ? "Seu token expirou ou não existe, por motivos de segurança você será deslogado!!" 
                                     : error.response.data.message,
      (error.response.status == 403) && true
    );
  }

  return{tratarErro};
}

export default useTratarErro;