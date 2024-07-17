import styles from './InputSenha.module.css';

//Assets
import iconOlho from '../../../assets/icons/olho.png';
import iconOlhoF from '../../../assets/icons/olhoF.png';

//Hooks
import useFormularios from '../../../hooks/useFormularios';


export default function InputSenha({dica, nome, preenhcerEntidade, valor}){

  const {visibilidadeSenha,setVisibilidadeSenha} = useFormularios();

  return(
    <div className={styles.linhaInputSenha}>
      <input 
        type={(visibilidadeSenha) ? "text" : "password"} 
        placeholder={dica}
        name={nome}
        onChange={(e) => preenhcerEntidade(e)}
        value={valor || ""}
        maxLength={20}
      />

      <img 
        src={(visibilidadeSenha) ? iconOlhoF : iconOlho} 
        alt="Icon olho" 
        className={styles.iconOlho}  
        onClick={() => setVisibilidadeSenha((visibilidadeSenha) ? false : true)}
      />
    </div>
  )
}