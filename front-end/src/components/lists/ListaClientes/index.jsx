import styles from './ListaClientes.module.css';

//Components
import BotaoLink from '../../utils/BotaoLink';
import { Link, useLocation } from 'react-router-dom';
import Loader from '../../utils/Loader';
import BotoesPaginacao from '../BotoesPaginacao';

//Hooks
import useLoader from '../../../hooks/useLoader';
import useFiltros from '../../../hooks/useFiltros';
import useClientes from '../../../hooks/useClientes';
import useRoutes from '../../../hooks/useRotas';
import usePaginacao from '../../../hooks/usePaginacao';


export default function ListaClientes(){

  const {clientes} = useClientes();
  const {visibilidadeLoaderSecundario} = useLoader();
  const {ordem, setOrdem, pesquisa, setPesquisa} = useFiltros();
  const pagina = useLocation().pathname;
  const {marcarRotaAnterior} = useRoutes();
  const {indicePaginaClientes, setIndicePaginaClientes, botoesPaginacaoClientes} = usePaginacao();

  return(
    <>
      {
        clientes.length ? (
          <>
            <header className={styles.botoesLista}>
              <div className={styles.acoes+" "+styles[(pagina == "/clientes") && "inteiro"]}>
                {
                  pagina == "/clientes" && <BotaoLink destino={"/adcionarCliente"}>Adcionar cliente</BotaoLink>
                }

                <div className={styles.buscas+" "+styles[(pagina == "/clientes") && "margemSuperior"]}>
                  <input
                    className={styles.buscarPornome}
                    type="text" 
                    placeholder='Buscar por nome'
                    onChange={(e) => setPesquisa(e.target.value)}
                  />

                  <select
                    className={styles.ordenarNome}
                    onChange={(e) => setOrdem(e.target.value)}
                  >
                    <option value="asc">A-Z</option>
                    <option value="desc">Z-A</option>
                  </select>
                </div>
              </div>

              <BotoesPaginacao
                dividido={true}
                completo={(pagina == "/clientes") ? true : false}
                indicePagina={indicePaginaClientes}
                setIndicePagina={setIndicePaginaClientes}
                botoesPaginacao={botoesPaginacaoClientes}
              />
            </header>
          
            <div className={styles.containerClientes}>
              {
                clientes.filter((cliente) => cliente.nome.toLowerCase().includes(pesquisa.toLowerCase()))
                .sort((a, b) => 
                  (ordem === "asc") ? a.nome.localeCompare(b.nome) 
                  : (ordem === "desc") && b.nome.localeCompare(a.nome) 
                )
                .map((cliente) => (
                  <Link 
                    to={(pagina == "/clientes") ? "/cliente/".concat(cliente.codigo) : "/adm/cliente/".concat(cliente.codigo)} 
                    key={cliente.codigo} 
                    className={styles.cliente}  
                    onClick={marcarRotaAnterior}
                  >
                    <div className={styles.margemClinte}>
                      <p>{cliente.dataCadastro}</p>
                      <h1 className={styles.nomeCliente}>{cliente.nome}</h1>
                      <p className={styles.dataCadastroCliente}>{cliente.dataCadastro.split(' ')[0]}</p>
                      <p className={styles.horarioCadastroCliente}>({cliente.dataCadastro.split(' ')[1]})</p>
                    </div>
                  </Link>
                ))
              }
            </div>
          </>
      ) : visibilidadeLoaderSecundario ? (
          <Loader/>
        ) : (
          <>
            {
              pagina == "/clientes" && (
                <header className={styles.botoesLista}>
                  <div className={styles.acoes}>
                    <BotaoLink destino={"/adcionarCliente"}>Adcionar cliente</BotaoLink>
                  </div>
                </header>
              )
            }

            <h1 className={styles.aviso}>Sem clientes nesta página!</h1>
          </>
        )
      }
    </>
  );
}