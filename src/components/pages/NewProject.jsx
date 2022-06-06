import ProjectForm from '../Project/ProjectForm'
import styles from './NewProject.module.css'
import { useNavigate } from 'react-router-dom'

export default function NewProject() {

   // redirect
   const navigate = useNavigate()

   // post project
   function createPost(project) {

      // fields
      project.cost = 0
      project.services = []

      fetch("http://localhost:5000/projects", {
         method: 'POST',
         headers: {
            "Content-Type": "application/json"
         },
         body: JSON.stringify(project)

      }).then(res => res.json())
         .then(data => {
            navigate('/projects', { state: { message: "Projeto criado com sucesso!" } })
         })
         .catch(err => console.log(err))

   }

   return (
      <div className={styles.newproject_container}>
         <h1>Criar projeto</h1>
         <p>Crie um projeto para depois adicionar os serviços</p>
         <ProjectForm handleSubmit={createPost} btnText="Criar projeto" />
      </div>
   )

}