import styles from './BotaoLink.module.css';

//Components
import { Link, useLocation } from "react-router-dom"


export default function BotaoLink({margem, destino, children}){

  const location = useLocation();

  return(
    <Link to={destino} className={styles.botaoLink+" "+styles[(margem) && "margem"]+" "+styles[(location.pathname == "/") && "home"]}>
      {children}
    </Link>
  )
}