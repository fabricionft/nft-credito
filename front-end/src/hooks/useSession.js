//Contexts
import { SessionContext } from "../contexts/SessionContext";

//Hooks
import { useContext } from "react";


const useSession = () => {

  const {sessao, codigo, logar, deslogar} = useContext(SessionContext);
  return{sessao, codigo, logar, deslogar};
}

export default useSession;