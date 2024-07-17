//Components
import Header from "./components/layout/Header";
import MenuBar from "./components/layout/MenuBar";
import Footer from "./components/layout/Footer";
import MessageBox from "./components/utils/MessageBox";
import CardLoader from './components/utils/CardLoader';
import { Outlet } from "react-router-dom"

//Hooks
import useRotas from "./hooks/useRotas";
import useTheme from "./hooks/useTheme";
import { useEffect } from "react";

//Pages
import PrivatePage from "./pages/private/PrivatePage";
import AdminPage from "./pages/admin/AdminPage";


function App() {

  const {verificarSeARotaEPublica, verificarSeARotaEPrivada, verificarSeARotaEAdministrativa} = useRotas();
  const {tema, carregarTema} = useTheme();

  useEffect(() => {
    carregarTema();
  }, [tema])

  return(
    <>
      {
        verificarSeARotaEAdministrativa() ? (
          <AdminPage>
            <Outlet/>
          </AdminPage>
        ) : (
          <>
            <MenuBar/>
            <Header/>
            {
               verificarSeARotaEPublica() ? (
                <Outlet/>
              ) 
              : verificarSeARotaEPrivada() && (
                <PrivatePage>
                  <Outlet/>
                </PrivatePage>
              )
            }
            <Footer/>
          </>
        )
      }

      <MessageBox/>
      <CardLoader/>
    </>
  )
}

export default App;
