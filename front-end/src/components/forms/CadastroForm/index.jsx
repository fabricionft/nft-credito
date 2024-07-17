import styles from './CadastroForm.module.css';

//Componnets
import CardLoader from '../../utils/CardLoader';
import InputSenha from '../../utils/InputSenha';
import InputNumber from '../../utils/inputNumber';

//Hooks
import { useEffect} from "react";
import useUSuario from "../../../hooks/useUsuario";
import useValidacoes from '../../../hooks/useValidacoes';
import useConfirmacao from '../../../hooks/useConfirmacao';
import useLoader from '../../../hooks/useLoader';
import useFormularios from '../../../hooks/useFormularios';


export default function CadastroForm(){

  const {usuario, preencherUsuario, enviarFormularioCadastro} = useUSuario();
  const {visibilidadeCardLoader} = useLoader();
  const {indiceEtapa, proximaEtapa, etapaAnterior, setIndiceEtapa} = useFormularios();
  const {validarEtapa1FormularioCadastro, validarEtapa2FormularioCadastro} = useValidacoes();
  const {solicitarCodigoDeConfirmacao} = useConfirmacao();

  useEffect(() => {
    setIndiceEtapa(1);
  }, [])

  return(
    <>
      {
        visibilidadeCardLoader ? (
          <CardLoader/>
        ) : (
          <form onSubmit={enviarFormularioCadastro}>
            <h1 className={styles.tituloEtapaFormulario}>
              {
                indiceEtapa == 1 ? "Dados pessoais" : indiceEtapa == 2 ? "Dados de login" : "Confirmação"
              }
              <p className={styles.indice}>{indiceEtapa}/3</p>
            </h1>

            {
              indiceEtapa == 1 ? (
                <>
                  <label>Nome completo</label>
                  <input 
                    type="text" 
                    placeholder="Digite seu nome completo"
                    name="nomeCompleto"
                    onChange={(e) => preencherUsuario(e)}
                    value={usuario.nomeCompleto || ""}
                  />

                  <label>Você é autonomo?</label>  
                  <select 
                    className={styles.seletorAutonomo}
                    name="autonomo"
                    onChange={(e) => preencherUsuario(e)}
                    value={usuario.autonomo || ""}
                  >
                    <option value="escolha">Escolha</option>
                    <option value="sim">Sim</option>
                    <option value="nao">Não</option>
                  </select>

                  {
                    usuario.autonomo == "nao" && (
                      <>
                        <label>Qual o nome da imboliária que você trabalha?</label>
                        <input 
                          type="text"
                          placeholder="Digite o nome da imobiliária"
                          name="nomeImobiliaria"
                          onChange={(e) => preencherUsuario(e)}
                          value={usuario.nomeImobiliaria || ""}
                        />
                      </>
                    )
                  }

                  <label>Número da CRECI</label>
                  <InputNumber
                    dica={"Digite o seu CRECI"}
                    nome={"creci"}
                    entidade={usuario.creci}
                    preencherEntidade={preencherUsuario}
                    tamanhoMaximo={10}
                  />
                </>
              ) : indiceEtapa == 2 ? (
                <>
                  <label>Email</label>
                  <input 
                    type="text" 
                    placeholder="Digite o email"
                    name="email"
                    onChange={(e) => preencherUsuario(e)}
                    value={usuario.email || ""}
                  />

                  <label>Senha</label>  
                  <InputSenha
                    dica={"Digite a senha"}
                    nome={"senha"}
                    preenhcerEntidade={preencherUsuario}
                    valor={usuario.senha}
                  />

                  <label>Cofirme sua senha</label>
                  <InputSenha
                    dica={"Confirme a senha"}
                    nome={"confirmacaoSenha"}
                    preenhcerEntidade={preencherUsuario}
                    valor={usuario.confirmacaoSenha}
                  />
                </>
              ) : (
                <>
                  <label>Código confirmação</label>
                  <InputNumber
                    dica={"Digite o código de confirmação"}
                    nome={"codigoConfirmacao"}
                    entidade={usuario.codigoConfirmacao}
                    preencherEntidade={preencherUsuario}
                    tamanhoMaximo={4}
                  />
                </>
              )
            }

            {
              indiceEtapa == 1 ? (
                <button 
                  type='button'
                  onClick={() => {
                    if(validarEtapa1FormularioCadastro(usuario)) proximaEtapa()
                  }}
                >
                  Avançar
                </button>
              ) : indiceEtapa == 2 ? (
                <>
                  <button 
                    type='button'
                    className={styles.btnVoltar}
                    onClick={etapaAnterior}
                  >
                    Anterior
                  </button>

                  <button
                    type='button'
                    onClick={() => {
                      if(validarEtapa2FormularioCadastro(usuario)) solicitarCodigoDeConfirmacao(usuario.email)
                    }}
                  >
                    Solicitar código
                  </button>
                </>
              ) : (
                <>
                  <button 
                    type='button'
                    className={styles.btnVoltar}
                    onClick={etapaAnterior}
                  >
                    Anterior
                  </button>

                  <button>
                    Cadastro
                  </button>
                </> 
              )
            }
          </form>
        )
      }
    </>
  )
}