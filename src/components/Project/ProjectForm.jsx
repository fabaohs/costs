export default function ProjectForm() {

   return (
      <form>
         <div><input type="text" placeholder="Insira o nome do projeto" /></div>
         <div><input type="number" placeholder="Insira o orçamento total do projeto" /></div>
         <div>
            <select name="category_id">
               <option disabled>Selecione a categoria</option>
            </select>
         </div>
      </form>
   )

}