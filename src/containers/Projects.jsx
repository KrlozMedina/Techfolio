import React from 'react'
import '@styles/Projects.scss'

const Projects = (children) => {
  return (
     <section id='projects' className="main-projects-container">
        <h2>PROYECTOS</h2>
        <div className="projects-cards-container">
          <article className="project-card">
            <a href="https://krlozmedina.github.io/Cronometro/">
              <div className="project-card--image cronometro" />
              <h3 className="project-card--title">Cronometro</h3>
              <p className="project-card--description">Cronometro y temporizador en una sola aplicacion web</p>
            </a>
            <a className="project--code-link" href="https://github.com/KrlozMedina/Cronometro">
              <div className="code-logo" /> Code
            </a>
          </article>

          <article className="project-card">
            <a href="https://krlozmedina.github.io/BatataBit/">
              <div className="project-card--image batatabit" />
              <h3 className="project-card--title">Clon Batata Bit</h3>
              <p className="project-card--description">Clone de la pagina Batata Bit</p>
            </a>
            <a className="project--code-link" href="https://github.com/KrlozMedina/BatataBit">
              <div className="code-logo" /> Code
            </a>
          </article>
          
          <article className="project-card">
            <a href="https://krlozmedina.github.io/RandomDogs/">
              <div className="project-card--image randomdogs" />
              <h3 className="project-card--title">Random Dogs</h3>
              <p className="project-card--description">Consumo de API de perros</p>
            </a>
            <a className="project--code-link" href="https://github.com/KrlozMedina/RandomDogs">
              <div className="code-logo" /> Code
            </a>
          </article>

          <article className="project-card">
            <a href="https://mypokedesk.herokuapp.com/">
              <div className="project-card--image pokemon" />
              <h3 className="project-card--title">Pokemon</h3>
              <p className="project-card--description">Minijuego usando la API de Pokemon</p>
            </a>
            <a className="project--code-link" href="https://github.com/KrlozMedina/MyPokedesk">
              <div className="code-logo" /> Code
            </a>
          </article>

          <article className="project-card">
            <a href="https://rickandmorty-krlozmedina.netlify.app/">
              <div className="project-card--image rick-morty" />
              <h3 className="project-card--title">Rick&Morty</h3>
              <p className="project-card--description">Reack Hooks con la API de Rick and Morty</p>
            </a>
            <a className="project--code-link" href="https://github.com/KrlozMedina/Rick-Morty">
              <div className="code-logo" /> Code
            </a>
          </article>

          <article className="project-card">
            <a href="https://krlozmedina.github.io/Exchange/">
              <div className="project-card--image exchange" />
              <h3 className="project-card--title">Exchange</h3>
              <p className="project-card--description">Usando API de criptomonedas, observando graficas con chart.js. Tiene falla de CORS</p>
            </a>
            <a className="project--code-link" href="https://github.com/KrlozMedina/Python">
              <div className="code-logo" /> Code
            </a>
          </article>

          <article className="project-card">
            <a href="https://github.com/KrlozMedina/Python">
              <div className="project-card--image" />
              <h3 className="project-card--title">Python</h3>
              <p className="project-card--description">Proyectos en el lenguaje Python</p>
            </a>
            <a className="project--code-link" href="https://github.com/KrlozMedina/Python">
              <div className="code-logo" /> Code
            </a>
          </article>

          <article className="project-card">
            <a href="https://github.com/KrlozMedina/Matlab">
              <div className="project-card--image" />
              <h3 className="project-card--title">Matlab</h3>
              <p className="project-card--description">Proyectos en el lenguaje Matlab</p>
            </a>
            <a className="project--code-link" href="https://github.com/KrlozMedina/Matlab">
              <div className="code-logo" /> Code
            </a>
          </article>

          <article className="project-card">
            <a href="https://github.com/KrlozMedina/Arduino">
              <div className="project-card--image" />
              <h3 className="project-card--title">Arduino</h3>
              <p className="project-card--description">Proyectos en el lenguaje Arduino</p>
            </a>
            <a className="project--code-link" href="https://github.com/KrlozMedina/Arduino">
              <div className="code-logo" /> Code
            </a>
          </article>

          <article className="project-card">
            <a href="https://github.com/KrlozMedina/Java">
              <div className="project-card--image" />
              <h3 className="project-card--title">Java</h3>
              <p className="project-card--description">Proyectos en el lenguaje Java</p>
            </a>
            <a className="project--code-link" href="https://github.com/KrlozMedina/Java">
              <div className="code-logo" /> Code
            </a>
          </article>

        </div>
      </section>
  )
}

export default Projects
