import { createContext, useEffect, useState } from "react"

export const SessionContext = createContext();

export const Sessionprovider = ({children}) => {

  const [sessao, setSessao] = useState(() => {
    const sessao = localStorage.getItem('sessao');
    return (sessao) ? JSON.parse(sessao) : false;
  });

  useEffect(() =>{
    localStorage.setItem('sessao', JSON.stringify(sessao))
  }, [sessao]);

  let codigo = sessao.codigo;

  const logar = (sessao) => setSessao(sessao);
  const deslogar = () => setSessao(false);

  return(
    <SessionContext.Provider value={{sessao, codigo, logar, deslogar}}>
      {children}
    </SessionContext.Provider>
  )
}