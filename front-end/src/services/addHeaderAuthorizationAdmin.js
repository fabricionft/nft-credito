//Hooks
import useAdminSession from "../hooks/useAdminSession";

//Services
import api from "./api";


const addHeaderAuthorizationAdmin = () => {

  const {token} = useAdminSession();

  if(token){
    api.defaults.headers.authorization = `Bearer ${token}`;
  }
}


export default addHeaderAuthorizationAdmin;