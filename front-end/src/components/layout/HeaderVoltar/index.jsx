import styles from './HeaderVoltar.module.css';

//Assets
import iconVoltar from '../../../assets/icons/iconVoltar.png';

//Components
import { Link } from 'react-router-dom';


export default function HeaderVoltar({destino}){

  return(
    <header className={styles.cabecalhoVoltar}>
      <div className={styles.margemCabecalhoVoltar}>
        <Link to={destino}>
          <img 
            src={iconVoltar}
            alt="Icon voltar" 
            className={styles.iconVoltar}
            name="image"
          />
        </Link>
      </div>
    </header>
  )
}