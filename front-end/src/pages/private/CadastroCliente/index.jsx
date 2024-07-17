//Components
import Container from "../../../components/layout/Container";
import HeaderVoltar from "../../../components/layout/HeaderVoltar";
import ClienteForm from "../../../components/forms/ClienteForm";


export default function CadastroCliente(){

  return(
    <Container centralizar={true}>

      <HeaderVoltar
        destino={"/clientes"}
      />

      <ClienteForm/>
    </Container>
  )
}