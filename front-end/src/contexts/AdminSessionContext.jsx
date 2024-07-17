import { createContext, useEffect, useState } from "react";

export const AdminSessionContext = createContext();

export const AdminSessionProvider = ({children}) => {

  const [adminSessao, setAdminSessao] = useState(() => {
    const adminSessao = localStorage.getItem('adminSessao');
    return (adminSessao) ? JSON.parse(adminSessao) : false;
  });

  useEffect(() =>{
    localStorage.setItem('adminSessao', JSON.stringify(adminSessao))
  }, [adminSessao]);

  const logarComoAdmin = (adminSessao) => setAdminSessao(adminSessao);
  const deslogarComoAdmin = () => setAdminSessao(false);

  let role = adminSessao.role;
  let token = adminSessao.token;

  return(
    <AdminSessionContext.Provider value={{adminSessao, role, token, logarComoAdmin, deslogarComoAdmin}}>
      {children}
    </AdminSessionContext.Provider>
  )
}