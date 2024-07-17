import styles from './Home.module.css';

//Assets
import iconPapel from '../../../assets/icons/responsivo.png'
import iconFones from '../../../assets/icons/lampada.png'
import iconRaio from '../../../assets/icons/pratico.png'

//Components
import Container from "../../../components/layout/Container";

//Hooks
import useImagens from '../../../hooks/useImagens';
import useDisclamer from '../../../hooks/useDisclamer';


export default function Home(){

  const {imagem} = useImagens();
  const {visibilidadeDisclamer, esconderDisclamer} = useDisclamer();

  esconderDisclamer();


  return(
    <Container 
      completo={true}
      centralizar={true}
    >
      <div className={styles.apresentacao}>
        <img 
          src={imagem} 
          alt="Imagem fundo" 
          className={styles.imgFundo}
        />

        <div className={styles.degrade}></div>

        <div className={styles.infosAprentacao}>
          <div className={styles.card}>
            <h1 className={styles.tituloApresentacao}>
              NFT Crédito
            </h1>

            <p className={styles.textoApresentacao}>
              Implemente nosso sistema em sua imobiliária e veja a coleta de dados se tornar cada vez mais simples!!
            </p>
          </div>
        </div>

        <div className={styles.vantagens}>
          <div className={styles.vantagem}>
            <p className={styles.textoVantagens}>
              Sou rápido<br></br>
              é otimizado<br></br> 
            </p>

            <img 
              src={iconRaio} 
              alt="Icon raio" 
              className={styles.iconVantagens}
            />
          </div>

          <div className={styles.vantagem}>
            <p className={styles.textoVantagens}>
              Me adapto<br></br> 
              de acordo<br></br> 
              com suas<br></br> 
              necessidades
            </p>

            <img 
              src={iconPapel} 
              alt="Icon papel" 
              className={styles.iconVantagens}
            />
          </div>

          <div className={styles.vantagem}>
            <p className={styles.textoVantagens}>
              Lhe dou liberdade<br></br>
              para criar<br></br> 
            </p>

            <img 
              src={iconFones} 
              alt="Icon fones" 
              className={styles.iconVantagens}
            />
          </div>
        </div>
      </div>

      {
        visibilidadeDisclamer && (
          <div className={styles.disclamer}>
            <p>
              A Santo Crédito não oferece empréstimos e créditos pessoais e tampouco pede antecipação de valores aos seus clientes. Caso receba alguma mensagem oferecendo esses produtos e/ou pedindo antecipação de dinheiro para dar andamento no seu processo de financiamento imobiliário, suspenda o seu processo imediatamente e denuncie.
            </p>
          </div>
        )
      }
    </Container>
  )
}