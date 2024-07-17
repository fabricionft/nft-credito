import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({children}) => {

  const [tema, setTema]  = useState(() => {
    const tema = localStorage.getItem('tema');
    return (tema) ? tema : "claro";
  });

  useEffect(() =>{
    localStorage.setItem('tema', tema)
  }, [tema]);

  const alterarTema = () => setTema((tema == "claro") ? "escuro" : "claro");

  return(
    <ThemeContext.Provider value={{tema, alterarTema}}>
      {children}
    </ThemeContext.Provider>
  )
}