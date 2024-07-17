//Components
import Container from "../../../components/layout/Container";
import HeaderAdmin from "../../../components/layout/HeaderAdmin";
import ListaUsuarios from '../../../components/lists/ListaUsuarios';


export default function Usuarios(){

  return(
    <Container>
      <HeaderAdmin
        destino={"/adm/menu"}
      />
      
      <ListaUsuarios/>
    </Container>
  )
}