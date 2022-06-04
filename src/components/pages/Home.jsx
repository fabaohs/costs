import styles from './Home.module.css'
import saving from '../../img/savings.svg'
import LinkButton from '../layout/LinkButton'

export default function Home() {

   return (
      <section className={styles.home_container}>
         <h1>Seja bem-vindo(a) ao <span>Costs</span>!</h1>
         <p>Comece a gerenciar os seus projetos agora mesmo!</p>
         <LinkButton to="/newproject" text="Começar agora mesmo!" />
         <img src={saving} alt="Costs"></img>
      </section >
   )

}