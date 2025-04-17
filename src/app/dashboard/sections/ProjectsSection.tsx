import { TextInput } from "@/components/atom/Form/Form";
import Modal from "@/components/organisms/Modal/Modal";
import { IProject } from "@/models/Project.model";
import {
  useCreateProjectMutation,
  useDeleteProjectMutation,
  useGetProjectsQuery,
} from "@/redux/service/projectsApi";
import { useGetTechnologiesQuery } from "@/redux/service/technologiesApi";
import { ErrorResponse, ITechnology } from "@/types/common";
import React, { useContext, useEffect, useState } from "react";
import LanguageContext, {
  LanguageContextType,
} from "@/redux/context/LanguageContext";
import { PROJECT_TYPE } from "@/types/constants";
import style from "../page.module.css";
import Image from "next/image";

const ProjectsSection: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [projects, setProjects] = useState<IProject[]>([]);
  const [technologies, setTechnologies] = useState<ITechnology[]>([]);
  const { data: dataProjects, refetch } = useGetProjectsQuery(null);
  const { data: dataTechnologies, isLoading: isLoadingTechnologies } =
    useGetTechnologiesQuery(null);
  const [createProject, { isLoading, isError }] = useCreateProjectMutation();
  const [deleteProject] = useDeleteProjectMutation();
  const { isSpanish } = useContext(LanguageContext) as LanguageContextType;

  const [projectData, setProjectData] = useState({
    title: "",
    slug: "",
    description: "",
    technologies: [""],
    repositoryUrl: "",
    liveUrl: "",
    imageUrl: "",
    category: [""],
    role: "",
    teamSize: 0,
    duration: "",
    priority: 0,
    projectType: PROJECT_TYPE[0],
  });

  const setTitleAndSlug = (title: string) => {
    setProjectData((prev) => ({ ...prev, title }));
    setProjectData((prev) => ({
      ...prev,
      slug: title.replaceAll(" ", "-").toLowerCase(),
    }));
  };

  const handleTechnologiesChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const listCategory: string[] = [];
    const listTechnology = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );

    listTechnology.forEach((name) => {
      const tech = technologies.find((tech) => tech.name === name);
      if (tech && !listCategory.includes(tech.category)) {
        listCategory.push(tech.category);
      }
    });

    setProjectData((prev) => ({
      ...prev,
      technologies: listTechnology,
      category: listCategory,
    }));
  };

  const handlerPostProject = async () => {
    try {
      setErrorMessage(null);
      await createProject(projectData).unwrap();
      setShowModal(false);
      setProjectData({
        title: "",
        slug: "",
        description: "",
        technologies: [""],
        repositoryUrl: "",
        liveUrl: "",
        imageUrl: "",
        category: [""],
        role: "",
        teamSize: 0,
        duration: "",
        priority: 0,
        projectType: PROJECT_TYPE[0],
      });
      refetch();
    } catch (err) {
      const dataError = err as ErrorResponse;
      setErrorMessage(dataError.data?.error || "Unknown error");
    }
  };

  const handlerDeleteProject = async (id: string) => {
    try {
      await deleteProject(id);
      refetch();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (dataTechnologies) {
      setTechnologies(dataTechnologies);
    }

    if (dataProjects) {
      setProjects(dataProjects);
    }
  }, [dataProjects]);

  return (
    <>
      <div>
        <button
          onClick={() => setShowModal(true)}
          disabled={isLoadingTechnologies}
        >
          {isSpanish ? "Agregar proyecto" : "Add project"}
        </button>

        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <form
              className={style["modal__form"]}
              onSubmit={(e) => {
                e.preventDefault();
                handlerPostProject();
              }}
            >
              <fieldset className={style["modal__fieldset"]}>
                <legend className={style["modal__legend"]}>
                  {isSpanish ? "Agregar proyecto" : "Add project"}
                </legend>

                <TextInput
                  label={isSpanish ? "Titulo:" : "Title:"}
                  value={projectData.title}
                  onChange={(e) => setTitleAndSlug(e.target.value)}
                  id="title"
                  type="text"
                  required
                />

                <div>
                  <label htmlFor="description">
                    {isSpanish ? "Descripción" : "Description"}:
                  </label>
                  <textarea
                    name="description"
                    id="description"
                    rows={5}
                    onChange={(e) =>
                      setProjectData((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    required
                  ></textarea>
                </div>

                <div>
                  <label htmlFor="technologies">
                    {isSpanish ? "Tecnologías" : "Technologies"}:
                  </label>
                  <select
                    multiple
                    name="technologies"
                    id="technologiesProject"
                    onChange={(e) => handleTechnologiesChange(e)}
                    required
                  >
                    {technologies.map((tech, index) => (
                      <option key={index} value={tech.name}>
                        {tech.name}
                      </option>
                    ))}
                  </select>
                </div>

                <TextInput
                  label={isSpanish ? "URL del repositorio:" : "Repository URL:"}
                  value={projectData.repositoryUrl}
                  onChange={(e) =>
                    setProjectData((prev) => ({
                      ...prev,
                      repositoryUrl: e.target.value,
                    }))
                  }
                  id="repositoryUrl"
                  type="url"
                  required
                />

                <TextInput
                  label={isSpanish ? "URL de la demo:" : "Live URL:"}
                  value={projectData.liveUrl}
                  onChange={(e) =>
                    setProjectData((prev) => ({
                      ...prev,
                      liveUrl: e.target.value,
                    }))
                  }
                  id="liveUrl"
                  type="url"
                  required
                />

                <TextInput
                  label={isSpanish ? "URL de la imagen:" : "Image URL:"}
                  value={projectData.imageUrl}
                  onChange={(e) =>
                    setProjectData((prev) => ({
                      ...prev,
                      imageUrl: e.target.value,
                    }))
                  }
                  id="imageUrl"
                  type="url"
                  required
                />

                <TextInput
                  label={
                    isSpanish ? "Role en el proyecto:" : "Role in the project:"
                  }
                  value={projectData.role}
                  onChange={(e) =>
                    setProjectData((prev) => ({
                      ...prev,
                      role: e.target.value,
                    }))
                  }
                  id="role"
                  type="text"
                />

                <TextInput
                  label={isSpanish ? "Tamaño del equipo:" : "Team size:"}
                  value={projectData.teamSize}
                  onChange={(e) =>
                    setProjectData((prev) => ({
                      ...prev,
                      teamSize: parseInt(e.target.value),
                    }))
                  }
                  id="teamSize"
                  type="number"
                  min={0}
                />

                <TextInput
                  label={
                    isSpanish ? "Duración del proyecto:" : "Project duration:"
                  }
                  value={projectData.duration}
                  onChange={(e) =>
                    setProjectData((prev) => ({
                      ...prev,
                      duration: e.target.value,
                    }))
                  }
                  id="duration"
                  type="text"
                />

                <TextInput
                  label={
                    isSpanish ? "Prioridad del proyecto:" : "Project priority:"
                  }
                  value={projectData.priority}
                  onChange={(e) =>
                    setProjectData((prev) => ({
                      ...prev,
                      priority: parseInt(e.target.value),
                    }))
                  }
                  id="priority"
                  type="number"
                  min={0}
                  max={10}
                  required
                />

                <div>
                  <label htmlFor="projectType">
                    {isSpanish ? "Tipo de proyecto" : "Project type"}:
                  </label>
                  <select
                    name="projectType"
                    id="projectTypeProject"
                    onChange={(e) =>
                      setProjectData((prev) => ({
                        ...prev,
                        projectType: e.target.value,
                      }))
                    }
                    required
                  >
                    {PROJECT_TYPE.map((type, index) => (
                      <option key={index} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                {isError && <p style={{ color: "red" }}>{errorMessage}</p>}

                <button type="submit" disabled={isLoading}>
                  {
                    isLoading
                      ? isSpanish
                        ? "Enviando"
                        : "Sending"
                      : isSpanish
                        ? "Enviar"
                        : "Submit"
                  }
                </button>
              </fieldset>
            </form>
          </Modal>
        )}
      </div>

      <div className={style["project__list"]}>
        {projects.map((project, index) => (
          <div className={style["project__card"]} key={index}>
            <Image
              src={project.imageUrl}
              width={200}
              height={300}
              alt={`${project.title} screenshot`}
              className={style["project__card-image"]}
            />
            <h2 className={style["project__card-title"]}>{project.title}</h2>
            <p>{project.description}</p>
            <p>
              <strong>{isSpanish ? "Categoría" : "Category"}:</strong>{" "}
              {project.category.join(", ")}
            </p>
            <p>
              <strong>{isSpanish ? "Rol" : "Rol"}:</strong> {project.role}
            </p>
            <p>
              <strong>{isSpanish ? "Duración" : "Duration"}:</strong>{" "}
              {project.duration}
            </p>
            <p>
              <strong>{isSpanish ? "Tamaño del equipo" : "Team Size"}:</strong>{" "}
              {project.teamSize}
            </p>
            <p>
              <strong>{isSpanish ? "Prioridad" : "Priority"}:</strong>{" "}
              {project.priority}
            </p>
            <p>
              <strong>{isSpanish ? "Tipo" : "Type"}:</strong>{" "}
              {project.projectType}
            </p>
            <p>
              <strong>{isSpanish ? "Tecnologías" : "Technologies"}:</strong>{" "}
              {project.technologies.join(", ")}
            </p>
            <div>
              <a
                href={project.repositoryUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {isSpanish ? "Repositorio" : "Repository"}
              </a>
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {isSpanish ? "Demo en Vivo" : "Live Demo"}
              </a>
            </div>
            <div onClick={() => handlerDeleteProject(project["_id"])}>
              <button>{isSpanish ? "Eliminar" : "Delete"}</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ProjectsSection;
