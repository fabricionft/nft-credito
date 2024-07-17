import styles from './TrocarSenhaForm.module.css';

//Assets
import iconFechar from '../../../assets/icons/iconFechar.png';

//Hooks
import { useState } from "react"
import useUSuario from '../../../hooks/useUsuario';
import useFormularios from '../../../hooks/useFormularios';


export default function TrocarSenhaForm(){

  const [visibilidadeInputs, setVisibilidadeInputs] = useState(false);
  const {usuario, preencherUsuario, enviarFormularioTrocarSenha} = useUSuario();
  const {esconderFormTrocarSenha} = useFormularios();

  return(
    <div className={styles.containerFormTrocarSenha}>
      <form onSubmit={enviarFormularioTrocarSenha} className={styles.formTrocarSenha}>
        <img 
          src={iconFechar} 
          alt="Icon fechar" 
          className={styles.iconFechar}
          onClick={esconderFormTrocarSenha}  
        />

        <div className={styles.margemFormTrocarSenha}>
          <input 
            type={(visibilidadeInputs) ? "text" : "password"} 
            placeholder="Digite a senha atual"
            name='senha'
            onChange={(e) => preencherUsuario(e)}
            value={usuario.senha || ""}
            maxLength={20}
          />

          <input 
            type={(visibilidadeInputs) ? "text" : "password"}
            placeholder="Digite a nova senha"
            name='novaSenha'
            onChange={(e) => preencherUsuario(e)}
            value={usuario.novaSenha || ""}
            maxLength={20}
          />

          <input 
            type={(visibilidadeInputs) ? "text" : "password"}
            placeholder="Confirme a nova senha"
            name='confirmacaoNovaSenha'
            onChange={(e) => preencherUsuario(e)}
            value={usuario.confirmacaoNovaSenha || ""}
            maxLength={20}
          />

          <div className={styles.linhaMudarVisibilidadeInputs}>
            <span 
              className={styles[(visibilidadeInputs) ? "esconder" : "exibir"]}
              onClick={() => setVisibilidadeInputs((visibilidadeInputs) ? false : true)}  
            ></span>
            <p
              onClick={() => setVisibilidadeInputs((visibilidadeInputs) ? false : true)}  
            >
              {
                visibilidadeInputs ? "Esconder senhas" : "Exibir senhas"
              }   
            </p>
          </div>

          <button>Salvar</button>
        </div>
      </form>
    </div>
  )
}