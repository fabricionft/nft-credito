import styles from './Menu.module.css';

//Assets
import iconUsuarios from '../../../assets/icons/clientes.png';

//Components
import Container from '../../../components/layout/Container';
import { Link } from 'react-router-dom';
import HeaderAdmin from '../../../components/layout/HeaderAdmin';


export default function Menu(){

  return(
    <Container admin={true}>
      <HeaderAdmin/>
      
      <div className={styles.containerOpcoes}>
        <Link to={"/adm/usuarios"} className={styles.opcao}>
          <div className={styles.margemOpcao}>
            <img 
              src={iconUsuarios} 
              alt="Icon usuaios"
            />

            <h1 className={styles.tituloOpcao}>Corretores</h1>

            <p>Aqui você pode ver todos os corretores cadastrados em seu site</p>
          </div>
        </Link>
      </div>
    </Container>
  )
}