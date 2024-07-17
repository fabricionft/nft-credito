//Components
import Container from "../../../components/layout/Container";
import CadastroForm from "../../../components/forms/CadastroForm";

//Hooks
import useRotas from '../../../hooks/useRotas';


export default function Cadastro(){

  const {bloquearRotaPublica} = useRotas();

  bloquearRotaPublica();

  return(
    <Container centralizar={true}>
      <CadastroForm/>
    </Container>
  )
}