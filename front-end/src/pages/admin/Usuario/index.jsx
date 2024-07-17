import styles from './Usuario.module.css';

//Components
import HeaderAdmin from '../../../components/layout/HeaderAdmin';
import Container from "../../../components/layout/Container";
import Loader from '../../../components/utils/Loader';
import ListaClientes from '../../../components/lists/ListaClientes';

//Hooks
import useUSuario from "../../../hooks/useUsuario";


export default function Usuario(){

  const {usuario} = useUSuario();
  
  return(
    <Container admin={true}>
      <HeaderAdmin
        destino={"/adm/usuarios"}
      />

      {
        usuario.codigo ? (
          <div className={styles.usuario}>
            <div className={styles.margemUsuario}>
              <div className={styles.divisor}>
                <label>Data cadastro</label>
                <p>{usuario.dataCadastro}</p>
              </div>

              <div className={styles.divisor}>
                <label>Nome</label>
                <p>{usuario.nomeCompleto}</p>
              </div>
    
              <div className={styles.divisor}>
                <label>Email</label>
                <p>{usuario.email}</p>
              </div>
    
              <div className={styles.divisor}>
                <label>CRECI</label>
                <p>{usuario.creci}</p>
              </div>
    
              <div className={styles.divisor}>
                <label>É autonômo?</label>
                <p className={(usuario.autonomo == "sim") ? "sucesso" : "falha"}>{usuario.autonomo}</p>
              </div>
    
              {
                usuario.autonomo == "nao" && (
                  <div className={styles.divisor}>
                    <label>Nome da imobiliária</label>
                    <p>{usuario.nomeImobiliaria}</p>
                  </div>
                )
              }
            </div>
          </div>
        ) : <Loader/>
      }

      <ListaClientes/>
    </Container>
  )
}