//Contexts
import { AdminSessionContext } from "../contexts/AdminSessionContext";

//Hooks
import { useContext } from "react";


const useAdminSession = () => {

  const {adminSessao, role, token, logarComoAdmin, deslogarComoAdmin} = useContext(AdminSessionContext)
  return{adminSessao, role, token, logarComoAdmin, deslogarComoAdmin};
}

export default useAdminSession;