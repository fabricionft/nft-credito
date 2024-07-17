import { createContext, useState } from "react";

export const FiltrosContext = createContext();

export const FiltrosProvider = ({children}) => {

  const [exibirConteudo, setExibirConteudo] = useState("dados");

  return(
    <FiltrosContext.Provider value={{exibirConteudo, setExibirConteudo}}>
      {children}
    </FiltrosContext.Provider>
  );
}