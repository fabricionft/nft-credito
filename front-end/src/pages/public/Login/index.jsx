//Components
import Container from "../../../components/layout/Container";
import LoginForm from "../../../components/forms/LoginForm";

//Hooks
import useRotas from '../../../hooks/useRotas';


export default function Login(){

  const {bloquearRotaPublica} = useRotas();

  bloquearRotaPublica();

  return(
    <Container centralizar={true}>
      <LoginForm/>
    </Container>
  )
}