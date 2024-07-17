import styles from './LoginForm.module.css';

//Components
import InputSenha from '../../utils/InputSenha';

//Hooks
import useUSuario from "../../../hooks/useUsuario";
import { Link } from 'react-router-dom';


export default function LoginForm(){

  const {usuario, preencherUsuario, enviarFormularioLogin} = useUSuario();

  return(
    <form onSubmit={enviarFormularioLogin}>
      <input 
        type="text" 
        placeholder="Digite o email"
        name="email"
        onChange={(e) => preencherUsuario(e)}
        value={usuario.email || ""}
      />
     
      <InputSenha
        dica={"Digite a senha"}
        nome={"senha"}
        preenhcerEntidade={preencherUsuario}
        valor={usuario.senha}
      />

      <button
        disabled={!(usuario.email && usuario.senha) ? true : false}
        className={(usuario.email && usuario.senha) ? "" : "desativado"}
      >
        Login
      </button>

      <Link to={"/recuperarSenha"} className={styles.recuperarSenha}>
        Esqueceu a senha?
      </Link>
    </form>
  )
}