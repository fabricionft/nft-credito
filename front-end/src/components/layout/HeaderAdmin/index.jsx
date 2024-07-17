import { useLocation } from 'react-router-dom';

//Assets
import iconVoltar from '../../../assets/icons/iconVoltar.png';

//Components
import styles from './HeaderAdmin.module.css';
import { Link } from 'react-router-dom';
import SeletorTema from '../../utils/SeletorTema';

//Hooks
import useAdminSession from '../../../hooks/useAdminSession';


export default function HeaderAdmin({destino}){

  const location = useLocation();
  const {deslogarComoAdmin} = useAdminSession();

  return(
    <header className={styles.cabecalhoAdmin}>
      {
        location.pathname == "/adm/menu" ? (
          <button
            onClick={deslogarComoAdmin}
          >
            Deslogar
          </button>
        ) : (
          <Link to={destino}>
            <img 
              src={iconVoltar}
              alt="Icon voltar" 
              className={styles.iconVoltar}
            />
          </Link>
        )
      }

      <SeletorTema
        variacao={true}
        variacaoCirculo={true}
      />
    </header>
  )
}