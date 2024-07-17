import styles from './SeletorTema.module.css';

//Assets
import imgLua from '../../../assets/images/lua.png';
import imgSol from '../../../assets/images/sol.png';

//Hooks
import useTheme from "../../../hooks/useTheme"


export default function SeletorTema({variacao, variacaoCirculo}){

  const {alterarTema, tema} = useTheme();

  return(
    <div className={styles.seletorTema+" "+styles[(variacao) && "variacao"]}
        onClick={alterarTema}
      >
        <img src={imgLua} className={styles.iconSeletorTema}/>
        <img src={imgSol} className={styles.iconSeletorTema}/>
        <div className={styles.circulo+" "+styles[(tema == "escuro") && "escuro"]+" "+styles[(variacaoCirculo) && "variacaoCirculo"]}></div>
      </div>
  )
}