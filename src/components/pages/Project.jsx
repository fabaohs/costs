import { parse, v4 as uuid } from "uuid";
import styles from "./Project.module.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loading from "../layout/Loading";
import Container from "../layout/Container";
import ProjectForm from "../Project/ProjectForm";
import Message from "../layout/Message";
import ServiceForm from "../service/ServiceForm";
import ServiceCard from "../service/ServiceCard";

export default function Project() {
  const { id } = useParams();
  const [type, setType] = useState("");
  const [message, setMessage] = useState("");
  const [project, setProject] = useState([]);
  const [services, setServices] = useState([]);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showServiceForm, setShowServiceForm] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:5000/projects/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setProject(data);
        setServices(data.services);
      })
      .catch((err) => console.log(`Ops... ${err.message}`));
  }, [id]);

  function toggleProjectForm() {
    setShowProjectForm(!showProjectForm);
  }

  function toggleServiceForm() {
    setShowServiceForm(!showServiceForm);
  }

  function createService(project) {
    setMessage("");
    // get the total cost
    const lastService = project.services[project.services.length - 1];
    lastService.id = uuid();

    const lastServiceCost = lastService.cost;

    const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost);

    // maximum value validation
    if (newCost > project.budget) {
      setMessage("Orçamento ultrapassado. Verifique o valor do custo");
      setType("error");
      project.services.pop();
      return false;
    }

    // add cost
    project.cost = newCost;

    // post
    fetch(`http://localhost:5000/projects/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(project),
    })
      .then((res) => res.json())
      .then((data) => {
        setServices(data.services);
        setShowServiceForm(!showServiceForm);
        setMessage("Serviço adicionado!");
        setType("success");
      })
      .catch((err) => {
        setMessage("Ocorreu um erro ao adicionar o serviço");
        setType("error");
        console.log(`Ops... ${err.message}`);
      });
  }

  function removeService(id, cost) {
    setMessage("");
    const servicesUpdated = project.services.filter(
      (service) => service.id !== id
    );

    const projectUpdated = project;
    projectUpdated.services = servicesUpdated;
    projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(cost);

    fetch(`http://localhost:5000/projects/${projectUpdated.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(projectUpdated),
    })
      .then((res) => res.json())
      .then((data) => {
        setProject(projectUpdated);
        setServices(data.services);
        setType("success");
        setMessage("Serviço removido!");
      })
      .catch((err) => {
        setType("error");
        setMessage("Ocorreu um erro ao remover o serviço");
        console.log(`Ops... ${err.message}`);
      });
  }

  function editPost(project) {
    setMessage();

    if (project.budget < project.cost) {
      setMessage("O orçamento não pode ser menor que o custo do projeto");
      setType("error");
      return false;
    }

    fetch(`http://localhost:5000/projects/${project.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(project),
    })
      .then((res) => res.json())
      .then((data) => {
        setProject(data);
        setShowProjectForm(!showProjectForm);
        setMessage("Projeto atualizado com sucesso!");
        setType("success");
      })
      .catch((err) => {
        console.log(`Ops... ${err}`);
        setMessage("Erro ao atualizar projeto!");
        setType("error");
      });
  }

  return (
    <>
      {project.name ? (
        <div className={styles.project_details}>
          {/* Container */}
          <Container customClass="column">
            {message && <Message message={message} type={type} />}
            <div className={styles.details_container}>
              {/* Header */}
              <h1>Projeto: {project.name}</h1>
              <button className={styles.btn} onClick={toggleProjectForm}>
                {!showProjectForm ? "Editar Projeto" : "Fechar"}
              </button>
              {/* Header */}

              {/* Details */}
              {!showProjectForm ? (
                <div className={styles.project_info}>
                  <p>
                    <span>Categoria:</span> {project.category.name}
                  </p>
                  <p>
                    <span>Total do orçamento:</span> R${project.budget}
                  </p>
                  <p>
                    <span>Total utilizado:</span> R${project.cost}
                  </p>
                </div>
              ) : (
                // Edit form
                <div className={styles.project_info}>
                  <ProjectForm
                    handleSubmit={editPost}
                    btnText="Concluir edição"
                    projectData={project}
                  />
                </div>
              )}
            </div>
            <div className={styles.service_form_container}>
              <h2>Adicione um serviço:</h2>
              <button className={styles.btn} onClick={toggleServiceForm}>
                {!showServiceForm ? "Adicionar serviço" : "Fechar"}
              </button>
              <div className={styles.project_info}>
                {showServiceForm && (
                  <ServiceForm
                    btnText="Adicionar serviço"
                    handleSubmit={createService}
                    projectData={project}
                  />
                )}
              </div>
              <h2>Serviços</h2>
              <Container customClass="start">
                {services.length > 0 &&
                  services.map((service) => (
                    <ServiceCard
                      id={service.id}
                      name={service.name}
                      cost={service.cost}
                      description={service.description}
                      handleRemove={removeService}
                      key={service.id}
                    />
                  ))}

                {services.length === 0 && (
                  <p>Parece que você ainda não criou nenhum serviço...</p>
                )}
              </Container>
            </div>
          </Container>
          {/* Container */}
        </div>
      ) : (
        // Load
        <Loading />
      )}
    </>
  );
}
