import { createContext, useState } from "react";

export const MessageBoxContext = createContext();

export const MessageBoxProvider = ({children}) => {

  const [visibilidadeMessageBox, setVisibilidadeMessageBox] = useState(false);

  const exibir = () => setVisibilidadeMessageBox(true);
  const esconder = () => setVisibilidadeMessageBox(false);

  return(
    <MessageBoxContext.Provider value={{visibilidadeMessageBox, exibir, esconder}}>
      {children}
    </MessageBoxContext.Provider>
  )
}