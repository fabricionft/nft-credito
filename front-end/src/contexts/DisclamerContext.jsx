import { createContext, useState } from "react";

export const DisclamerContext = createContext();

export const DisclamerProvider = ({children}) => {

  const [visibilidadeDisclamer, setvisibilidadeDisclamer] = useState(true);

  const esconderDisclamer = () => {
    setTimeout(() => {
      setvisibilidadeDisclamer(false);
    }, 60 * 1000)
  }

  return(
    <DisclamerContext.Provider value={{visibilidadeDisclamer, esconderDisclamer}}>
      {children}
    </DisclamerContext.Provider>
  )
}