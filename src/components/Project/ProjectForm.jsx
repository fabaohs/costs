import Input from '../form/Input'
import Select from '../form/Select'
import SubmitButton from '../form/SubmitButton'
import styles from './ProjectForm.module.css'

export default function ProjectForm({ btnText }) {

   return (
      <form className={styles.form}>
         <Input type="text" text="Nome do projeto" name="name" placeholder="Digite o nome do projeto" />
         <Input type="number" text="Orçamento do projeto" name="budget" placeholder="Digite o orçamento do projeto" />
         <Select name="category_id" text="Selecione a categoria" />
         <SubmitButton text={btnText} />
      </form>
   )

}