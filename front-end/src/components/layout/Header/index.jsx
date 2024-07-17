import styles from './Header.module.css';

//Assets
import iconMenu from '../../../assets/icons/cardapio.png';

//Components
import { Link, useLocation } from 'react-router-dom';
import BotaoLink from '../../utils/BotaoLink';

//Hooks
import useSession from '../../../hooks/useSession';


export default function Header(){

  const {sessao} = useSession();
  const location = useLocation();

  return(
    <header className={styles.cabecalho+" "+styles[(location.pathname == "/") && "home"]}>
      <div className={styles.margemCabecalho}>
        <label htmlFor="menuBar">
          <img src={iconMenu} alt="Icon menu" className={styles.iconMenu}/>
        </label>

        <div className={styles.links}>
          <Link to={"/"} className={styles.link}>
            Home
          </Link>

          {
            sessao ? (
              <>
                <Link to={"/perfil"} className={styles.link}>
                  Perfil
                </Link>

                <Link to={"/clientes"} className={styles.link}>
                  Clientes
                </Link>

                <Link to={"https://www8.caixa.gov.br/siopiinternet-web/simulaOperacaoInternet.do?method=inicializarCasoUso"} className={styles.link}>
                  Simulador
                </Link>
              </>
            ) : (
              <>
                <Link to={"https://www8.caixa.gov.br/siopiinternet-web/simulaOperacaoInternet.do?method=inicializarCasoUso"} className={styles.link}>
                  Simulador
                </Link>

                <BotaoLink margem={true} destino={"/login"}>
                  Login
                </BotaoLink>
                
                <BotaoLink destino={"/cadastro"}>
                  Cadastro
                </BotaoLink>
              </>
            )
          }
        </div>
      </div>
    </header>
  )
}