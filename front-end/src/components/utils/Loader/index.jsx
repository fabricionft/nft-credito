import styles from './Loader.module.css';

//Asssets
import gifLoader from '../../../assets/gifs/loading.gif';


export default function Loader({tamanhoRelativo, reduzido}){

  return(
    <div className={styles.containerLoader+" "+styles[(tamanhoRelativo) && "tamanhoRelativo"]}>
      <img src={gifLoader} alt="gif loading" className={styles.loader+" "+styles[(reduzido) && "reduzido"]}/>
    </div>
  )
}