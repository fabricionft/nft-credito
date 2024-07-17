//Hooks
import useRotas from '../../../hooks/useRotas';

//Services
import addHeaderAuthorizationAdmin from '../../../services/addHeaderAuthorizationAdmin';


export default function AdminPage({children}){

  const {bloquearRotaAdmin} = useRotas(); 
    
  bloquearRotaAdmin();
  addHeaderAuthorizationAdmin();

  return(
    <>
      {children}
    </>
  )
}