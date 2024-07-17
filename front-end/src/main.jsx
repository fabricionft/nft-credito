import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

//Punlic pages
import PageError from './pages/public/PageError/index.jsx'
import Home from './pages/public/Home/index.jsx';
import PoliticaDePrivacidade from './pages/public/PoliticaDePrivacidade/index.jsx'
import Termos from './pages/public/Termos';
import Suporte from './pages/public/Suporte/index.jsx'
import Cadastro from './pages/public/Cadastro/index.jsx';
import Login from './pages/public/Login/index.jsx';
import RecuperarSenha from './pages/public/RecuperarSenha/index.jsx'

//Private pages
import Perfil from './pages/private/Perfil/index.jsx'
import Clientes from './pages/private/Clientes/index.jsx';
import CadastroCliente from './pages/private/CadastroCliente/index.jsx';
import Cliente from './pages/private/Cliente/index.jsx';
import EdicaoCliente from './pages/private/EdicaoCliente/index.jsx';

//Admin pages
import LoginAdmin from './pages/admin/LoginAdmin/index.jsx'
import Menu from './pages/admin/Menu/index.jsx'
import Usuarios from './pages/admin/Usuarios/index.jsx'
import Usuario from './pages/admin/Usuario/index.jsx'
import ClienteAdmin from './pages/admin/Cliente/index.jsx';

//Contextos
import { Sessionprovider } from './contexts/SessionContext.jsx';
import { LoaderProvider } from './contexts/LoaderContext.jsx';
import { MessageBoxProvider } from './contexts/MessaBoxContext.jsx';
import { ThemeProvider } from './contexts/ThemeContext.jsx'
import { AdminSessionProvider } from './contexts/AdminSessionContext.jsx'
import { FormularioProvider } from './contexts/FormulariosContext.jsx'
import { FiltrosProvider } from './contexts/FiltrosContext.jsx'
import { PaginacaoProvider } from './contexts/PaginacaoContext.jsx'
import { DisclamerProvider } from './contexts/DisclamerContext.jsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <PageError/>,
    children: [
      {
        path: "/",
        element: <Home/>  
      },
      {
        path: "/politica",
        element: <PoliticaDePrivacidade/>
      },
      {
        path: "/termos",
        element: <Termos/>
      },
      {
        path: "/suporte",
        element: <Suporte/>
      },
      {
        path: "/cadastro",
        element: <Cadastro/>  
      },
      {
        path: "/login",
        element: <Login/>  
      },
      {
        path: "/recuperarSenha",
        element: <RecuperarSenha/>
      },
      {
        path: "/perfil",
        element: <Perfil/>
      },
      {
        path: "/adcionarCliente",
        element: <CadastroCliente/>
      },
      {
        path: "/editarCliente/:id",
        element: <EdicaoCliente/>
      },
      {
        path: "/clientes",
        element: <Clientes/>
      },
      {
        path: "/cliente/:id",
        element: <Cliente/>
      },
      {
        path: "/adm/login",
        element: <LoginAdmin/>
      },
      {
        path: "/adm/menu",
        element: <Menu/>  
      },
      {
        path: "/adm/usuarios",
        element: <Usuarios/>
      },
      {
        path:"/adm/usuario/:id",
        element: <Usuario/>
      },
      {
        path: "/adm/cliente/:id",
        element: <ClienteAdmin/>
      }
    ]
  }
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider>
    <Sessionprovider>
      <AdminSessionProvider>
        <MessageBoxProvider>
          <FormularioProvider>
            <LoaderProvider>
              <FiltrosProvider>
                <PaginacaoProvider>
                  <DisclamerProvider>
                    <RouterProvider router={router}/>
                  </DisclamerProvider>
                </PaginacaoProvider>
              </FiltrosProvider>
            </LoaderProvider>
          </FormularioProvider>
        </MessageBoxProvider>
      </AdminSessionProvider>
    </Sessionprovider>
  </ThemeProvider>
);
