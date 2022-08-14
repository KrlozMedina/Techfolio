import React from 'react'
import '@styles/Projects.scss'

const Projects = () => {
  return (
    <div>
     <section id='projects' className="main-projects-container container">
        <h1>MIS PROYECTOS</h1>
        <div className="projects-cards-container">
          <article className="project-card">
            <a href="https://krlozmedina.github.io/Cronometro/">
              <div className="project-card--image cronometro" />
              <h2 className="project-card--title">Cronometro</h2>
              <p className="project-card--description">Cronometro y temporizador en una sola aplicacion web</p>
            </a>
            <a className="project--code-link" href="https://github.com/KrlozMedina/Cronometro">
              <div className="code-logo" /> Code
            </a>
          </article>
          <article className="project-card">
            <a href="https://krlozmedina.github.io/BatataBit/">
              <div className="project-card--image batatabit" />
              <h2 className="project-card--title">Clon Batata Bit</h2>
              <p className="project-card--description">Clone de la pagina Batata Bit</p>
            </a>
            <a className="project--code-link" href="https://github.com/KrlozMedina/BatataBit">
              <div className="code-logo" /> Code
            </a>
          </article>
          <article className="project-card">
            <a href="https://krlozmedina.github.io/RandomDogs/">
              <div className="project-card--image randomdogs" />
              <h2 className="project-card--title">Random Dogs</h2>
              <p className="project-card--description">Consumo de API de perros</p>
            </a>
            <a className="project--code-link" href="https://github.com/KrlozMedina/RandomDogs">
              <div className="code-logo" /> Code
            </a>
          </article>
          <article className="project-card">
            <a href="https://krlozmedina.github.io/Portafolio/">
              <div className="project-card--image portafolio" />
              <h2 className="project-card--title">Portafolio</h2>
              <p className="project-card--description">Portafolio personal</p>
            </a>
            <a className="project--code-link" href="https://github.com/KrlozMedina/Portafolio">
              <div className="code-logo" /> Code
            </a>
          </article>
        </div>
      </section>
    </div>
  )
}

export default Projects
