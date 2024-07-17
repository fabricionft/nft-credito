import styles from './MessageBox.module.css'

//Hooks
import useMessageBox from '../../../hooks/useMessageBox'


export default function MessageBox(){

  const {visibilidadeMessageBox, dados, esconder, fecharFormularioEDeslogar} = useMessageBox();

  return(
    <>
      {
        visibilidadeMessageBox && (
          <div className={styles.containerMessageBox}>
            <div className={styles.messageBox+" "+styles[(dados.sucesso) ? "sucesso" : "erro"]}>
              <div className={styles.margemMessageBox}>
                <span className={styles.textoMessageBox}>
                  {
                    typeof(dados.msg) == "string" ? dados.msg
                    : dados.msg.map((linha, index) => (
                      <div key={index}>
                        - {linha}
                        <br/>
                      </div>
                    ))
                  }
                </span>
                <button 
                  onClick={
                    (dados.recarregar) ? () => location.reload() 
                    : (dados.deslogar) ? fecharFormularioEDeslogar 
                    : esconder
                  }
                  className={styles[(dados.sucesso) ? "sucessoBtn" : "erroBtn"]}
                >
                  {dados.txtBotao}
                </button>
              </div>
            </div>
          </div>
        )
      }
    </>
  )
}