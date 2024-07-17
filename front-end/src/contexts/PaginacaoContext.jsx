import { createContext, useState } from "react";

export const PaginacaoContext = createContext();

export const PaginacaoProvider = ({children}) => {

  //Paginação usuários
  const [indicePaginaUsuarios, setIndicePaginaUsuarios] = useState(() => {
    let indiceHistorico = localStorage.getItem('indiceUsuarios');
    return (indiceHistorico) ? JSON.parse(indiceHistorico) : 0;
  });
  const [botoesPaginacaoUsuarios, setBotoesPaginacaoUsuarios] = useState([]);

  //Paginação clientes
  const [indicePaginaClientes, setIndicePaginaClientes] = useState(() => {
    let indiceHistorico = localStorage.getItem('indiceClientes');
    return (indiceHistorico) ? JSON.parse(indiceHistorico) : 0;
  });
  const [botoesPaginacaoClientes, setBotoesPaginacaoClientes] = useState([]);

  //Paginação arquivos
  const [indicePaginaHistorico, setIndicePaginaHistorico] = useState(() => {
    let indiceHistorico = localStorage.getItem('indiceHistorico');
    return (indiceHistorico) ? JSON.parse(indiceHistorico) : 0;
  });
  const [botoesPaginacaoHistorico, setBotoesPaginacaoHistorico] = useState([]);


  const definirPaginacao = (pagina, setBotoes, setIndice, item) => {
    localStorage.setItem(item, pagina.number)

    let num = [];
    for(var i = 1; i <= pagina.totalPages; i++) num.push(i);
    setBotoes(num);

    if(pagina.content.length == 0) setIndice(0);
  }

  const tamanhosPaginacao = {
    tamanhoPaginacaoUsuarios: 20,
    tamanhoPaginacaoClientes: 15,
    tamanhoPaginacaohistorico: 5
  }

  return(
    <PaginacaoContext.Provider value={{
      definirPaginacao,
      indicePaginaUsuarios, setIndicePaginaUsuarios, botoesPaginacaoUsuarios, setBotoesPaginacaoUsuarios,
      indicePaginaClientes, setIndicePaginaClientes, botoesPaginacaoClientes, setBotoesPaginacaoClientes,
      indicePaginaHistorico, setIndicePaginaHistorico, botoesPaginacaoHistorico, setBotoesPaginacaoHistorico,
      tamanhosPaginacao
    }}>
      {children}
    </PaginacaoContext.Provider>
  )
}