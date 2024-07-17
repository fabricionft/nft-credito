//Components
import CardLoader from '../../utils/CardLoader';
import InputSenha from '../../utils/InputSenha';
import  InputNumber from '../../utils/inputNumber';

//Hooks
import useConfirmacao from '../../../hooks/useConfirmacao';
import useFormularios from '../../../hooks/useFormularios';
import useLoader from '../../../hooks/useLoader';
import useUSuario from '../../../hooks/useUsuario';
import { useEffect } from 'react';


export default function recuperarSenhaForm(){

  const {indiceEtapa, etapaAnterior, setIndiceEtapa} = useFormularios();
  const {buscarUsuarioPorEmail} = useConfirmacao();
  const {visibilidadeCardLoader} = useLoader();
  const {usuario, preencherUsuario, enviarFormularioRecuperarSenha} = useUSuario();

  useEffect(() => {
    setIndiceEtapa(1);
  }, [])

  return(
    <>
      {
        visibilidadeCardLoader ? (
          <CardLoader/>
        ) : (
          <form onSubmit={enviarFormularioRecuperarSenha}>
            {
              indiceEtapa == 1 ? (
                <>
                  <input 
                    type="text" 
                    placeholder="Digite o email da conta"
                    name='email'
                    onChange={(e) => preencherUsuario(e)}
                    value={usuario.email || ""}
                  />

                  <button
                    type='button'
                    onClick={() => buscarUsuarioPorEmail(usuario.email)}
                    disabled={(usuario.email) ? false : true}
                    className={(usuario.email) ? "" : "desativado"}
                  >
                    Solicitar código
                  </button>
                </>
              ) : (
                <>
                  <InputNumber
                    dica={"Digite o código de confirmação"}
                    nome={"codigoConfirmacao"}
                    entidade={usuario.codigoConfirmacao}
                    preencherEntidade={preencherUsuario}
                    tamanhoMaximo={4}
                  />

                  <InputSenha
                    dica={"Digite a nova senha"}
                    nome={"novaSenha"}
                    preenhcerEntidade={preencherUsuario}
                    valor={usuario.novaSenha}
                  />

                  <InputSenha
                    dica={"Confirme a nova senha"}
                    nome={"confirmacaoNovaSenha"}
                    preenhcerEntidade={preencherUsuario}
                    valor={usuario.confirmacaoNovaSenha}
                  />

                  <button
                    onClick={etapaAnterior}
                  >
                    Etapa anterior
                  </button>

                  <button>
                    Alterar senha
                  </button>
                </>
              )
            }
          </form>
        )
      }
    </>
  );
}