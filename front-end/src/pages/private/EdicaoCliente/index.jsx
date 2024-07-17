//Components
import Container from "../../../components/layout/Container";
import HeaderVoltar from "../../../components/layout/HeaderVoltar";
import ClienteForm from "../../../components/forms/ClienteForm";

//Hooks
import { useParams } from "react-router-dom";


export default function EdicaoCliente(){

  const {id} = useParams();

  return(
    <Container centralizar={true}>

      <HeaderVoltar
        destino={"/cliente/".concat(id)}
      />

      <ClienteForm/>
    </Container>
  )
}