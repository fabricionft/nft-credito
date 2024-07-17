import styles from './CardLoader.module.css';

//Assets
import gifLoader from '../../../assets/gifs/loading.gif';

//Hooks
import useLoader from '../../../hooks/useLoader';


export default function CardLoader(){

  const {visibilidadeCardLoader} = useLoader();

  return(
    <>
      {
        visibilidadeCardLoader && (
          <div className={styles.containerCardLoader}>
            <div className={styles.cardLoader}>
              <img 
                src={gifLoader} 
                alt="Gif loading" 
                className={styles.gifLoader}
              />
            </div>
          </div>
        )
      }
    </>
  )
}