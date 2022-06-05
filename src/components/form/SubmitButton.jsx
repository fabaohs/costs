import styles from './SubmitButton.module.css'

export default function SubmitButton({ text }) {

   return (
      <button className={styles.btn} type="submit">{text}</button>
   )

}