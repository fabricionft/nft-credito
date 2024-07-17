//Constants
import publicRoutes from "../constants/publicRoutes";
import privateRoutes from "../constants/privateRoutes";
import adminRoutes from "../constants/adminRoutes";

//Hooks
import { useLocation, useNavigate } from "react-router-dom";
import useSession from "./useSession";
import { useEffect } from "react";
import useAdminSession from "./useAdminSession";


const useRoutes = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const {sessao} = useSession();
  const {role} = useAdminSession();

  const verificarSeARotaEPublica = () => {
    return publicRoutes.includes(location.pathname);
  }

  const verificarSeARotaEPrivada = () => {
    const rotaPrivada = "/".concat(location.pathname.split("/")[1]);
    return privateRoutes.includes(rotaPrivada);
  }

  const verificarSeARotaEAdministrativa = () => {
    const rotaAdmin = "/adm/".concat(location.pathname.split("/")[2]);
    return adminRoutes.includes(rotaAdmin);
  }

  const bloquearRotaPublica = () => {
    useEffect(() => {
      if(sessao) navigate("/");
    }, [sessao]);
  }

  const bloquearRotaPrivada = () => {
    useEffect(() => {
      if(!sessao) navigate("/");
    }, [sessao]);
  }

  const bloquearRotaAdmin = () => {
    useEffect(() => {
      if(role != "ROLE_ADMIN" && location.pathname != "/adm/login") navigate("/");
      else if(role && location.pathname == "/adm/login") navigate("/adm/menu");
    }, [role])
  }

  const marcarRotaAnterior = () => {
    localStorage.setItem('rotaAnterior', location.pathname)
  }

  return{
    verificarSeARotaEPublica, verificarSeARotaEPrivada, verificarSeARotaEAdministrativa,
    bloquearRotaPublica, bloquearRotaPrivada, bloquearRotaAdmin,
    marcarRotaAnterior
  };
}

export default useRoutes;