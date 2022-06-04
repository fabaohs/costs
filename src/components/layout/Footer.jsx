import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa'
import styles from './Footer.module.css'

export default function Footer() {

   return (
      <footer className={styles.footer}>

         <ul className={styles.social_list}>
            <li><FaFacebook /></li>
            <li><FaInstagram /></li>
            <li><FaLinkedin /></li>
         </ul>

         <p className={styles.copy_right}><span>Costs</span> &copy;2022</p>

      </footer>
   )

}