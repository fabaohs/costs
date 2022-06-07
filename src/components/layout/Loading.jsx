import styles from './Loading.module.css'
import loading from '../../img/loading.svg'

export default function Loading(){

   return (
      <div className={styles.loader_container}>
         <img src={loading} alt="loading" className={styles.loader}/>
      </div>
   )

}