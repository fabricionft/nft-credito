//Hooks
import useRotas from "../../../hooks/useRotas"
import useSession from "../../../hooks/useSession";


export default function PrivatePage({children}){

  const {codigo} = useSession();
  const {bloquearRotaPrivada} = useRotas();
  
  bloquearRotaPrivada();

  return(
    <>
      {codigo && children}
    </> 
  )
}