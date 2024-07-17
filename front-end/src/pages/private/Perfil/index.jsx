import styles from './Perfil.module.css'

//Components
import Loader from '../../../components/utils/Loader';
import Container from '../../../components/layout/Container';
import TrocarSenhaForm from '../../../components/forms/TrocarSenhaForm';

//Hooks
import useUSuario from '../../../hooks/useUsuario';
import useFormularios from '../../../hooks/useFormularios';


export default function Perfil(){

  const {usuario, preencherUsuario, enviarFormularioAtualizarCadastro} = useUSuario();
  const {visibilidadeFormTrocarSenha, exibirFormTrocarSenha} = useFormularios();

  return(
    <Container centralizar={true}>
      {
        usuario.codigo ? (
          <form onSubmit={enviarFormularioAtualizarCadastro}>
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
            <input 
              type="text"
              placeholder="Digite o seu CRECI"
              name="creci"
              onChange={(e) => preencherUsuario(e)}
              value={usuario.creci || ""}
              maxLength={10}
            />
    
            <label>Email</label>
            <input 
              type="text" 
              placeholder="Digite o email"
              name="email"
              onChange={(e) => preencherUsuario(e)}
              value={usuario.email || ""}
              readOnly={true}
            />
    
            <button>Salvar</button>
    
            <button
              type='button'
              onClick={exibirFormTrocarSenha}
            >
              Mudar senha
            </button>
          </form>
        ) : (
          <Loader/>
        )
      }
     

      {visibilidadeFormTrocarSenha && <TrocarSenhaForm/>}
    </Container>
  )
}