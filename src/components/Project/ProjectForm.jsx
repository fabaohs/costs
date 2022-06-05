import { useEffect, useState } from 'react'
import Input from '../form/Input'
import Select from '../form/Select'
import SubmitButton from '../form/SubmitButton'
import styles from './ProjectForm.module.css'

export default function ProjectForm({ handleSubmit, btnText, projectData }) {

   const [categories, setCategories] = useState([])
   const [project, setProject] = useState(projectData || [])

   useEffect(() => {
      fetch("http://localhost:5000/categories", {
         method: "GET",
         headers: {
            'Content-Type': 'application/json'
         }
      }).then(res => res.json())
         .then(data => {
            setCategories(data)
         })
         .catch(error => console.log(error))
   }, [])

   const submit = (e => {
      e.preventDefault()
      handleSubmit(project)
      
   })

   function handleChange(e) {
      setProject({ ...project, [e.target.name]: e.target.value })
   }

   function handleSelect(e) {
      setProject({
         ...project, category: {
            id: e.target.value,
            name: e.target.options[e.target.selectedIndex].text
         }
      })
   }

   return (
      <form onSubmit={submit} className={styles.form}>
         <Input type="text" text="Nome do projeto" name="name" placeholder="Digite o nome do projeto" handleOnChange={handleChange} value={project.name ? project.name : ''} />

         <Input type="number" text="Orçamento do projeto" name="budget" placeholder="Digite o orçamento do projeto" handleOnChange={handleChange} value={project.budget ? project.budget : ''} />

         <Select name="category_id" text="Selecione a categoria" options={categories} handleOnChange={handleSelect} value={project.category ? project.category.id : ''} />

         <SubmitButton text={btnText} />
      </form>
   )

}