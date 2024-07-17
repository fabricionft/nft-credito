import styles from './Container.module.css';


export default function Container({children, completo, centralizar, admin}){

   return(
    <div className={styles.container+" "+styles[(admin) && "admin"]}>
      <div className={styles.margemContainer+" "+styles[(centralizar) && "centralizar"]+" "+styles[(completo) && "completo"]}>
        {children}
      </div>
    </div>
  )
}