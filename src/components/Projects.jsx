import React, { useContext, useEffect, useState } from 'react'
import '@styles/Projects.scss'
import LenguajeContext from '@context/LenguajeContext';

const projectsData = require('@data/projects.json');

const Projects = () => {
  const {spanish, setSpanish} = useContext(LenguajeContext);

  return (
     <section id='projects' className="main-projects-container">
        <h2>{spanish ? "PROYECTOS" : "PROJECTS"}</h2>
        <div className="projects-cards-container">
          {
            projectsData.map(project => (
              <article className="project-card" key={project.id}>
                <a href={project['url-project']}>
                  <div className={`project-card--image ${project.image}`} />
                  <h3 className="project-card--title">{spanish ? project.titulo : project.title}</h3>
                  <p className="project-card--description">{spanish ? project.descripcion : project.description}</p>
                </a>
                <a className="project--code-link" href={project['url-project-code']}>
                  <div className="code-logo" /> {spanish ? "Codigo" : "Code"}
                </a>
              </article>
            ))
          }
        </div>
      </section>
  )
}

export default Projects
