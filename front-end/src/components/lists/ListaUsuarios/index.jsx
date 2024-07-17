import styles from './ListaUsuarios.module.css';

//Components
import BotaoLink from '../../utils/BotaoLink';
import Loader from "../../utils/Loader";
import BotoesPaginacao from '../BotoesPaginacao';

//Hooks
import useUSuarios from '../../../hooks/useUsuarios';
import usePaginacao from '../../../hooks/usePaginacao';
import useFiltros from '../../../hooks/useFiltros';

export default function ListaUsuarios(){

  const {usuarios} = useUSuarios();
  const {indicePaginaUsuarios, setIndicePaginaUsuarios, botoesPaginacaoUsuarios} = usePaginacao();
  const {ordem, setOrdem, pesquisa, setPesquisa} = useFiltros();

  return(
    <>
      {
        usuarios.length ? (
          <div className={styles.painelUsuarios}>
            <header className={styles.cabecalhoUsuarios}>
              <div className={styles.filtros}>
                <input type="text" 
                  placeholder='Digite o nome'
                  onChange={(e) => setPesquisa(e.target.value)}
                />

                <select 
                  onChange={(e) => setOrdem(e.target.value)}
                >
                  <option value="asc">A-Z</option>
                  <option value="desc">Z-A</option>
                  <option value="recente">+ Recente</option>
                  <option value="antigo">+ Antigo</option>
                </select>
              </div>

              <BotoesPaginacao
                dividido={true}
                indicePagina={indicePaginaUsuarios}
                setIndicePagina={setIndicePaginaUsuarios}
                botoesPaginacao={botoesPaginacaoUsuarios}
              />
            </header>

            <div className={styles.usuarios}>
              {
                usuarios.filter((usuario) => usuario.nomeCompleto.toLowerCase().includes(pesquisa.toLowerCase()))
                .sort((a, b) => 
                  (ordem === "asc") ? a.nomeCompleto.localeCompare(b.nomeCompleto) 
                  : (ordem === "desc") ? b.nomeCompleto.localeCompare(a.nomeCompleto) 
                  : (ordem === "recente") ? new Date(b.dataCadastro).getTime() - new Date(a.dataCadastro).getTime() 
                  : (ordem === "antigo") && new Date(a.dataCadastro).getTime() - new Date(b.dataCadastro).getTime()
                )
                .map((usuario, index) => (
                  <div key={usuario.codigo} className={styles.usuario+" "+styles[(index % 2 == 0) && "par"]}>
                    <div className={styles.margemUsuario}>
                      <div className={styles.infos}>
                        <p className={styles.coluna1}>
                          {usuario.codigo}
                        </p>

                        <p className={styles.coluna2}>
                          {usuario.nomeCompleto}
                        </p>

                        <p className={styles.coluna3}>
                          {usuario.email}
                        </p>
                      </div>

                      <div className={styles.coluna4}>
                        <BotaoLink
                          destino={"/adm/usuario/".concat(usuario.codigo)}
                        >
                          Detalhes
                        </BotaoLink>
                      </div>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        ) : (
          <Loader/>
        )
      }
    </>
  )
}