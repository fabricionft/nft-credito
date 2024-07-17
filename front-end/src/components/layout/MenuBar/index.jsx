import styles from './MenuBar.module.css';

//Assets
import iconCasa from '../../../assets/icons/iconCasa.png';
import iconClientes from '../../../assets/icons/clientes.png';
import iconSimulador from '../../../assets/icons/simulador.png';
import iconPerfil from '../../../assets/icons/user.png';

//Components
import SeletorTema from '../../utils/SeletorTema';
import { Link } from 'react-router-dom';

//Hooks
import useSession from '../../../hooks/useSession';


export default function MenuBar(){

  const {sessao, deslogar} = useSession();

  const fecharMenuBar = () => {document.getElementById('menuBar').checked=false}

  return(
    <>
      <input type="checkbox" className={styles.inputMenuBar} id='menuBar'/>

      <label htmlFor="menuBar" className={styles.esconder}></label>

      <nav className={styles.menuBar}>
        <div className={styles.margemMenuBar}>
          <div className={styles.linksSessao}>
            {
              sessao ? (
                <strong className={styles.textoLinkSessao}
                  onClick={deslogar}
                >sair</strong>
              ) : (
                <p className={styles.textoLinkSessao}>
                  Faça <Link to={"/login"} onClick={fecharMenuBar} className={styles.strongLinkSessao}>login</Link><br/>
                  ou <Link to={"/cadastro"} onClick={fecharMenuBar} className={styles.strongLinkSessao}>cadastre-se</Link>
                </p>
              )
            }
          </div>

          <div className={styles.linksPaginas}>
            <Link to={"/"} onClick={fecharMenuBar} className={styles.linkPagina}>
              <img src={iconCasa} className={styles.iconLink} alt="Icon casa" />

              <p className={styles.textoLinkPagina}>Home</p>
            </Link>

            {
              sessao && (
                <>
                  <Link to={"/perfil"} onClick={fecharMenuBar} className={styles.linkPagina}>
                    <img src={iconPerfil} className={styles.iconLink} alt="Icon dashboard" />

                    <p className={styles.textoLinkPagina}>Perfil</p>
                  </Link>

                  <Link to={"/clientes"} onClick={fecharMenuBar} className={styles.linkPagina}>
                    <img src={iconClientes} className={styles.iconLink} alt="Icon dashboard" />

                    <p className={styles.textoLinkPagina}>Clientes</p>
                  </Link>
                </>
              )
            }

            <Link to={"https://www8.caixa.gov.br/siopiinternet-web/simulaOperacaoInternet.do?method=inicializarCasoUso"} onClick={fecharMenuBar} className={styles.linkPagina}>
              <img src={iconSimulador} className={styles.iconLink} alt="Icon casa" />

              <p className={styles.textoLinkPagina}>Simulador</p>
            </Link>
          </div>
        </div>
        <SeletorTema/>
      </nav>
    </>
  )
}