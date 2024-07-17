export default function InputNumber({entidade, dica, nome, preencherEntidade, tamanhoMaximo}){

  return(
    <input 
      type="number" 
      placeholder={dica}
      name={nome}
      onChange={(e) => {
        (!entidade) ? preencherEntidade(e) 
        : (e.target.value.length <= tamanhoMaximo) && preencherEntidade(e)
      }}
      value={entidade || ''}
    />
  )
}