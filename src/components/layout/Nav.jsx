import { Link } from 'react-router-dom'
import Container from './Container'
import styles from './Nav.module.css'
import Logo from '../../img/costs_logo.png'


export default function Nav() {

   return (
      <nav className={styles.navbar}>
         <Container>
            <Link to='/'><img src={Logo} alt="Costs" /></Link>
            <ul className={styles.list}>
               <li className={styles.item}>
                  <Link to='/'>Home</Link>
               </li>
               <li className={styles.item}>
                  <Link to='/contact'>Contate-nos</Link>
               </li>
               <li className={styles.item}>
                  <Link to='/about'>Sobre nós</Link>
               </li>
               <li className={styles.item}>
                  <Link to='/projects'>Ver projetos</Link>
               </li>
            </ul>
         </Container>
      </nav>
   )

}