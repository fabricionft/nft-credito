import styles from './ArquivoForm.module.css';

//Assets
import iconFechar from '../../../assets/icons/iconFechar.png';

//Hooks
import useArquivos from '../../../hooks/useArquivos';
import useFormularios from '../../../hooks/useFormularios';


export default function ArquivoForm({codigoCliente}){

  const {arquivo, preencherArquivo, adcionarArquivo, removerArquivo} = useArquivos();
  const {esconderFormArquivos} = useFormularios();

  return(
    <div className={styles.containerFormulario}>
      <form onSubmit={(e) => adcionarArquivo(e, codigoCliente)} className={styles.formularioArquivo}>
        <img 
          src={iconFechar} 
          alt="Icon fechar" 
          className={styles.iconFechar}
          onClick={esconderFormArquivos}  
        />

        <div className={styles.margemFormularioArquivo}>
          <label 
            htmlFor="inputArquivo"
          >
            <div className={styles.seletorArquivo+" "+styles[(arquivo) && "selecionado"]}>
              <p className={styles.textoSeletorArquivo}>
                {
                  (arquivo) ? arquivo.name : "Escolher arquivo"
                }
              </p>
            </div>
          </label>

          <input
            id={"inputArquivo"}
            type="file"
            className={styles.inputArquivo}
            onChange={(e) => preencherArquivo(e)}
          />

          <div className={styles.btnsArquivoForm}>
            {
              (arquivo) && (
                <button
                  onClick={removerArquivo}
                  className={styles[(!arquivo) && "desativado"]}
                >
                  Remover
                </button>
              )
            }

             <button
              className={styles[(!arquivo) && "desativado"]}
              disabled={(arquivo) ? false : true}
            >
              Adcionar
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}