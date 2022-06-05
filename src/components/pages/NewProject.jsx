import ProjectForm from '../Project/ProjectForm'
import styles from './NewProject.module.css'

export default function NewProject() {

   return (
      <div className={styles.newproject_container}>
         <h1>Criar projeto</h1>
         <p>Crie um projeto para depois adicionar os serviços</p>
         <ProjectForm btnText="Criar projeto" />
      </div>
   )

}