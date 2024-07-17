import styles from './ClienteForm.module.css';

//Components
import Loader from '../../utils/Loader';
import InputNumber from '../../utils/inputNumber';

//Hooks
import { useLocation } from 'react-router-dom';
import useCliente from '../../../hooks/useCliente';


export default function ClienteForm(){

  const {
    meses, dias, anos, definirMes,
    preencherCliente,cliente,
    enviarFormularioAdcionarCliente, enviarFormularioAtualizarCliente
  } = useCliente();

  const location = useLocation();

  return(
    <>
      {
        location.pathname == "/adcionarCliente" || cliente.codigo ? (
          <form onSubmit={(location.pathname == "/adcionarCliente") ? enviarFormularioAdcionarCliente : enviarFormularioAtualizarCliente}>
            <label>Nome completo</label>
            <input
              type="text"
              placeholder='Digite o nome completo'  
              name='nome'
              onChange={(e) => preencherCliente(e)}
              value={cliente.nome || ""}
            />

            <label>CPF</label>
            <InputNumber
              dica={"Digite apenas números"}
              nome={"cpf"}
              entidade={cliente.cpf}
              preencherEntidade={preencherCliente}
              tamanhoMaximo={11}
            />

            <label>Data de nascimento</label>
            <div className={styles.linhaDataNascimento}>
              <select 
                className={styles.selectData} 
                name="mes"
                onChange={(e) => definirMes(e.target.value)}
                value={cliente.mes || ""}
              >
                <option value="escolha">Mês</option>
                {
                  meses.map((mes, index) => <option key={index} value={index+1}>{mes}</option>)
                }
              </select>

              <select
                className={styles.selectData}
                name='dia'
                onChange={(e) => preencherCliente(e)}
                value={cliente.dia || ""}
              >
                <option value="escolha">Dia</option>
                {
                  dias.map((dia) => <option key={dia} value={dia}>{dia}</option>)
                }
              </select>

              <select 
                className={styles.selectData}
                name='ano'
                onChange={(e) => preencherCliente(e)}
                value={cliente.ano || ""}
              >
                <option value="escolha">Ano</option>
                {
                  anos().map((ano) => <option key={ano} value={ano}>{ano}</option>)
                }
              </select>
            </div>

            <label>Descrição</label>
            <textarea
              placeholder='Digite os dados à acrescentar'
              name='descricao'
              onChange={(e) => preencherCliente(e)}
              value={cliente.descricao || ""}
            ></textarea>
            
            <button>
              {
                (location.pathname == "/adcionarCliente") ? "Adcionar" : "Editar"
              }
            </button>
          </form>
        ) : (
          <Loader/>
        )
      }
    </>
  )
}