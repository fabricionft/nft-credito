import styles from './Cliente.module.css';

//Assets
import iconCalendario from '../../../assets/icons/calendario.png';
import iconRelogio from '../../../assets/icons/relogio.png';

//Components
import Container from "../../../components/layout/Container";
import HeaderVoltar from "../../../components/layout/HeaderVoltar";
import BotaoLink from '../../../components/utils/BotaoLink';
import Loader from '../../../components/utils/Loader';
import ArquivoForm from '../../../components/forms/ArquivoForm';
import ListaArquivos from '../../../components/lists/ListaArquivos';

//Hooks
import useFormularios from '../../../hooks/useFormularios';
import useCliente from '../../../hooks/useCliente';

//Utils
import formatarCPF from '../../../utils/formatarCPF';


export default function Cliente(){

  const {cliente, excluirCliente} = useCliente();
  const {visibilidadeFormArquivos, exibirFormArquivos} = useFormularios();

  return(
    <Container centralizar={true}>
      <HeaderVoltar
        destino={"/clientes"}
      />

      {
        cliente.codigo ? (
          <div className={styles.cliente}>
            <div className={styles.margemCliente}>
                <div className={styles.infos}>

                  <h1 className={styles.textoNomeCLiente}>{cliente.nome}</h1>

                  <span className={styles.dataCadastroCLiente}>
                    <img 
                      src={iconCalendario} 
                      alt="Icon relógio" 
                      className={styles.iconDataCadastro}
                    />

                    {cliente.dataCadastro.split(" ")[0]}
                  </span>
                    
                  <span className={styles.dataCadastroCLiente}>
                    <img 
                      src={iconRelogio} 
                      alt="Icon relógio" 
                      className={styles.iconDataCadastro}
                    />

                    {cliente.dataCadastro.split(" ")[1]}
                  </span>

                  <p className={styles.textoDadosCLiente}>{formatarCPF(cliente.cpf)} - {cliente.dataNascimento}</p>

                  <p className={styles.textoDescricaoCliente}>{cliente.descricao}</p>

                  <div className={styles.btnsCliente}>
                    <BotaoLink
                      className={styles.btnExcluir}
                      destino={"/editarCliente/".concat(cliente.codigo)}
                    >
                      Editar
                    </BotaoLink>

                    <button
                      className={styles.btnExcluir}
                      onClick={() => excluirCliente(cliente.codigo)}
                    >
                      Excluir
                    </button>
                  </div>
                </div>

              <div className={styles.arquivos}>
                <ListaArquivos/>

                <button
                  onClick={exibirFormArquivos}
                  className={styles.btnAdcionarArquivo}
                >
                  Adcionar arquivo
                </button>
              </div>
            </div>
          </div>
        ) : <Loader/>
      }

      { 
        visibilidadeFormArquivos && (
          <ArquivoForm 
            codigoCliente={cliente.codigo}
          />
        )
      }
    </Container>
  )
}