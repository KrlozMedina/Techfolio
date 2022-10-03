import React, { useEffect, useState } from 'react'
import '@styles/Projects.scss'

const projectsData = require('../storage/projects.json');

const Projects = () => {
  return (
     <section id='projects' className="main-projects-container">
        <h2>PROYECTOS</h2>
        <div className="projects-cards-container">
          {
            projectsData.map(project => 
              <article className="project-card">
                <a href={project['url-project']}>
                  <div className={`project-card--image ${project.image}`} />
                  <h3 className="project-card--title">{project.title}</h3>
                  <p className="project-card--description">{project.description}</p>
                </a>
                <a className="project--code-link" href={project['url-project-code']}>
                  <div className="code-logo" /> Code
                </a>
              </article>
            )
          }
        </div>
      </section>
  )
}

export default Projects
