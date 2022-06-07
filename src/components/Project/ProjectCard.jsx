import { BsPencil, BsFillTrashFill } from "react-icons/bs";
import styles from "./ProjectCard.module.css";
import { Link } from "react-router-dom";

export default function ProjectCard({
  id,
  name,
  budget,
  category,
  handleRemove,
}) {
  const remove = (e) => {
    e.preventDefault();
    handleRemove(id);
  };

  return (
    <div className={styles.project_card}>
      <h4>{name}</h4>
      <p>
        <span>Orçamento:</span> R${budget}
      </p>
      <p className={styles.category_text}>
        <span className={`${styles[category]}`}></span>
        {category}
      </p>
      <div className={styles.project_card_actions}>
        <Link to={`/projects/${id}`}>
          <BsPencil /> Editar
        </Link>
        <button onClick={remove}>
          <BsFillTrashFill />
          Excluir
        </button>
      </div>
    </div>
  );
}
