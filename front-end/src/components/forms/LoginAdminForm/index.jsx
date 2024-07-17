//Components
import InputSenha from '../../utils/InputSenha';

//Hooks
import useAdmin from '../../../hooks/useAdmin';


export default function LoginAdminForm(){

  const {admin, preencherAdmin, enviarFormularioFazerLoginComoAdmin} = useAdmin();

  return(
    <form onSubmit={enviarFormularioFazerLoginComoAdmin}>
      <input 
        type="text" 
        placeholder="Digite o email"
        name='email'
        onChange={(e) => preencherAdmin(e)}
        value={admin.email || ""}
      />

      <InputSenha
        dica={"Digite a senha"}
        nome={"senha"}
        preenhcerEntidade={preencherAdmin}
        valor={admin.senha}
      />

      <InputSenha
        dica={"Digite a senha do sistema"}
        nome={"senhaLoginSistema"}
        preenhcerEntidade={preencherAdmin}
        valor={admin.senhaLoginSistema}
      />

      <button
        className={[(admin.email && admin.senha && admin.senhaLoginSistema) ? "" : "desativado"]}
        disabled={(admin.email && admin.senha && admin.senhaLoginSistema) ? false : true}
      >
        Autenticar
      </button>
    </form>
  )
}