import styles from './ListaArquivos.module.css';

//Assets
import iconLixeira from '../../../assets/icons/lixeira.png';
import iconDonwload from '../../../assets/icons/download.png';

//Components
import Loader from '../../utils/Loader';

//Hooks
import { useLocation, useParams } from 'react-router-dom';
import useArquivos from "../../../hooks/useArquivos"
import useLoader from '../../../hooks/useLoader';


export default function ListaArquivos(){

  const {arquivos, excluirArquivo, fazerDownload} = useArquivos();
  const {visibilidadeLoader} = useLoader();
  const {id} = useParams();
  const pagina = useLocation().pathname;

  return(
    <>
      {
        arquivos.length ? (
          <>
            {
              arquivos.map((arquivo, index) => (
                <div key={arquivo.codigo} className={styles.arquivo+" "+styles[(index % 2 == 0) && "par"]}>
                  <p className={styles.nomeArquivo}>
                    {(arquivo.nomeArquivo.length > 15) ? arquivo.nomeArquivo.substring(0, 13)+"... ("+arquivo.extensao+")" : arquivo.nomeArquivo}
                  </p>

                  <div className={styles.btnsArquivo}>
                    {
                      pagina == "/cliente/".concat(id) && (
                        <button
                          className={styles.btnExcluirArquivo}
                          onClick={() => excluirArquivo(arquivo.codigo)}
                        >
                          <img 
                            src={iconLixeira} 
                            alt="Icon lixeira" 
                            className={styles.iconBtnArquivo}
                          />
                        </button>
                      )
                    }

                    <button
                      className={styles.btnDownloadArquivo}
                      onClick={() => fazerDownload(arquivo.codigo)}
                    >
                      <img src={iconDonwload} 
                        alt="Icon download" 
                        className={styles.iconBtnArquivo}
                        name="image"
                      />
                    </button>
                  </div>
                </div>
              ))
            }
          </>
        ) : visibilidadeLoader ? (
          <Loader 
            tamanhoRelativo={true}
            reduzido={true}  
          />
        ) : (
          <div className={styles.arquivo}>
            <p className={styles.aviso}>
              Sem arquivos até o momento.
            </p>
          </div>
        )
      }
    </>
  )
}