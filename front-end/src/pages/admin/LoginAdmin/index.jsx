//components
import Container from '../../../components/layout/Container';
import LoginAdminForm from '../../../components/forms/LoginAdminForm';


export default function LoginAdmin(){

  return(
    <Container centralizar={true} admin={true}>
      <LoginAdminForm/>
    </Container>
  )
}