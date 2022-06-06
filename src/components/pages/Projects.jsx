import { useState } from "react";
import { useLocation } from "react-router-dom";
import Message from "../layout/Message";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const location = useLocation();

  let message = "";
  if (location.state) {
    message = location.state.message;
  }

  fetch("http://localhost:5000/projects", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      setProjects(data);
    })
    .catch((err) => console.log(err));

  return (
    <div>
      <h1>Meus Projetos</h1>

      {message && <Message type="success" message={message} />}

      <div className="projects">
        {projects.map((project) => (
          <div key={project.id}>
            <h2>{project.name}</h2>
            <p>{project.budget}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
