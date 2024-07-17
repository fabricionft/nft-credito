import styles from './BotoesPaginacao.module.css';


export default function BotoesPaginacao({dividido, completo, inverter, botoesPaginacao, indicePagina, setIndicePagina}){

  let botoes = (inverter) ? botoesPaginacao.slice().reverse() : botoesPaginacao;

  return(
    <div className={styles.btns+" "+styles[(dividido) && "dividido"]+" "+styles[(completo) && "completo"]}>
      {
        botoes.map((botao) => (
          <button
            className={styles.btnPaginacao+" "+styles[(indicePagina+1 == botao) && "botaoSelecionado"]} 
            key={botao}
            onClick={() => setIndicePagina(botao - 1)}
          >
            {botao}
          </button>
        ))
      }
    </div>
  );
}