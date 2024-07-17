import styles from './Cliente.module.css';

//COmponents
import Container from '../../../components/layout/Container';
import HeaderAdmin from '../../../components/layout/HeaderAdmin';
import Loader from '../../../components/utils/Loader';
import ListaArquivos from '../../../components/lists/ListaArquivos';
import BotoesPaginacao from '../../../components/lists/BotoesPaginacao';

//Hooks
import useCliente from '../../../hooks/useCliente';
import useHistorico from '../../../hooks/useHistorico';
import useFiltros from '../../../hooks/useFiltros';
import usePaginacao from '../../../hooks/usePaginacao';

//Utils
import formatarCPF from '../../../utils/formatarCPF';


export default function CLiente(){

  const {cliente} = useCliente();
  const {historico} = useHistorico();
  const {exibirConteudo, setExibirConteudo} = useFiltros();
  const {indicePaginaHistorico, setIndicePaginaHistorico, botoesPaginacaoHistorico} = usePaginacao();
  
  return(
    <Container>
      <HeaderAdmin
        destino={localStorage.getItem('rotaAnterior')}
      />

      <div className={styles.escolhaConteudo}>
        <p
          onClick={() => setExibirConteudo("dados")}
          className={styles[(exibirConteudo == "dados") && "selecionado"]}
        >
          Dados
        </p>
        
        <p
          onClick={() => setExibirConteudo("historico")}
          className={styles[(exibirConteudo == "historico") && "selecionado"]}
        >
          Histórico
        </p>
      </div>


      {
        exibirConteudo == "dados" ? (
          <>
            {
              cliente.codigo ? (
                <div className={styles.cliente}>
                  <div className={styles.margemCliente}>
                    <div className={styles.divisor}>
                      <label>Nome</label>
                      <p>{cliente.nome}</p>
                    </div>
      
                    <div className={styles.divisor}>
                      <label>CPF</label>
                      <p>{formatarCPF(cliente.cpf)}</p>
                    </div>
      
                    <div className={styles.divisor}>
                      <label>Data de nascimento</label>
                      <p>{cliente.dataNascimento}</p>
                    </div>
      
                    <div className={styles.divisor}>
                      <label>Descrição</label>
                      <p>{cliente.descricao}</p>
                    </div>
      
                    <ListaArquivos/>
                  </div>
                </div> 
              ) : (
                <Loader/>
              )
            }
          </>
        ) : exibirConteudo == "historico" && (
          <>        
            {
              historico.length ? (
                <>
                  <BotoesPaginacao
                    inverter={true}
                    indicePagina={indicePaginaHistorico}
                    setIndicePagina={setIndicePaginaHistorico}
                    botoesPaginacao={botoesPaginacaoHistorico}
                  />

                  {
                    historico.slice().reverse().map((dia) => (
                      <div 
                        key={dia.codigo}
                      >
                        <details open>
                          <summary className={styles.dia}>{dia.dia}</summary>

                          {
                            dia.acoesDoDia.slice().reverse().map((acao) => (
                              <div
                                key={acao.codigo}
                                className={styles.acao+" "+styles[
                                  (["cadastrar", "adcionarArquivo"].includes(acao.tipo)) ? "adcionar" 
                                  : (acao.tipo == "atualizar") ? "atualizar" 
                                  : (acao.tipo == "excluirArquivo") && "excluir"
                                ]}
                              >
                                <div className={styles.margemAcao}>
                                    <p className={styles.dataAcao}>{acao.data}</p>
                                    <p className={styles.tituloAcao}>{acao.titulo}</p>

                                    <ul>
                                      {
                                        acao.detalhamento.map((detalhamento, index) => (
                                          <li key={index}>{detalhamento}</li>
                                        ))
                                      }
                                    </ul>
                                  </div>
                              </div>
                            ))
                          }
                        </details>
                      </div>
                    ))
                  }
                </>
              ) : (
                <Loader/>
              )
            }    
          </>
        )

      }
    </Container>
  )
}