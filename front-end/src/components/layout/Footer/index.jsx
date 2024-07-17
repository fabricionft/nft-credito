import styles from './Footer.module.css';

//Assets
import iconInstagram from '../../../assets/icons/instagram.png';
import iconFacebook from '../../../assets/icons/facebook.png';

//Components
import { Link } from 'react-router-dom';


export default function Footer(){

  return(
    <footer className={styles.rodape}>
      <div className={styles.margemRodape}>
        <div className={styles.contato}>
          <h1 className={styles.tituloSessao}>Whatsapp</h1>
          <p className={styles.textoContato}>(XX) XXXXX-XXXX</p>
        </div>

        <div className={styles.paginas}>
          <h1 className={styles.tituloSessao}>Atalhos</h1>

          <Link
            to={"/termos"}
            className={styles.linkPagina}
          >
            termos de uso
          </Link>

          <Link
            to={"/suporte"}
            className={styles.linkPagina}
          >
            suporte
          </Link>

          <Link
            to={"/politica"}
            className={styles.linkPagina}
          >
            Política de privacidade
          </Link>
        </div>

        <div className={styles.redes}>
          <a 
            href="https://www.facebook.com/"
            className={styles.linkRede}
          >
            <img 
              src={iconFacebook} 
              alt="Icon Facebook" 
              className={styles.iconRede}  
            />
          </a>

          <a 
            href="https://www.instagram.com/"
            className={styles.linkRede}
          >
            <img 
              src={iconInstagram} 
              alt="Icon Instagram" 
              className={styles.iconRede}  
            />
          </a>
        </div>
      </div>

      <div className={styles.disclamer}>
        <p className={styles.textoDisclamer}>CPNJ: XX.XXX.XXX/0001-XX - Todos os direitos reservados.</p>
      </div>
    </footer>
  )
}