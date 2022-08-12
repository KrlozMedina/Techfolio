import React from 'react'

import '@styles/Home.scss'

import iconHTML from '@icons/HTML5.png'
import iconCSS from '@icons/CSS3.png'
import iconJavaScript from '@icons/JavaScript.png'
import iconC from '@icons/C++.png'
import iconMatlab from '@icons/Matlab.png'
import iconPython from '@icons/Python.png'
import iconUD from "@icons/UD.png"
import iconPlatzi from "@icons/platzi.png"


const Home = () => {
  return (
    <div>
      <main className="main">
        <section className="main-title-container">
          <div className="main-title--text">
            <h1>PORTAFOLIO</h1>
            {/* <p class="main-title--profession">Ingeniero en Control y Automatizacion</p> */}
            <p className="main-title--profession">Web developer (Formacion)</p>
            <p className="main-title--name">Carlos Alidio Medina Lopez</p>
          </div>
          <span className="main-title--photo" />
        </section>
        <section className="main-aboutme-container container">
          <h1>ACERCA DE</h1>
          <p className="main-aboutme--text">
            {/* Tecnologo en Electronica, pronto a graduarme de Ingeniero en Control y Automatizacion, con conocimiento de varios lenguajes de programacion. Ejerciendo actualmente el cargo de operador de centro de repacion en una internacional de soluciones de pagos digitales, y con experiencia en el sector energetivo de sistemas initerrupidos UPS y con conocimientos de energia renovables.
          Me apasiona la idea de liderar proyectos en transformacion digital para grandes empresas, optimizando sus procesos de produccion. Poder contribuir a la pequenas y medinas empresas a obtener soluciones tecnologicas de produccion a bajo costo.
          Durante mi desarrollo profesional he tendio la oportunidad de aprender sobre electricidad, electronica de potencia, electronica de telecomunicaciones, redes y cableado. Ademas de trabajar con entidades gubernamentales, militares y bancarias, generando en mi, habilidades para tratar altos ejecutivos, clientes directos y personal tecnico. */}
            Desarrollador web en formación, con conocimiento en ejecución de proyectos, POO y varios lenguajes de programación de los que incluye HTML5, CSS3 y JavaScript. Capaz de maquetar cualquier diseño web, buenas habilidades de lógica de programación y trabajo en equipo.
            He ejecutado varios proyectos personales, proyectos propuestos por la universidad y cursos virtuales. He trabajado en equipo para solucionar problemáticas que se observan en la sociedad. La ejecución de los proyectos requieren conocimiento de microprocesadores, PLC, comunicación de datos por protocolos RS232, TCP/IP y HTTP. Desarrollo de código en Python, Matlab, bases de datos, VHDL, C++, servicios Cloud Computing, entre otros.
          </p>
        </section>
        <section className="main-projects-container container">
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
        <section className="main-education-container container">
          <h1>MI EDUCACION</h1>
          <div className="education-code-container">
            <img src={iconHTML} className="education-code"/>
            <img src={iconCSS} className="education-code" />
            <img src={iconJavaScript} className="education-code" />
            <img src={iconC} className="education-code" />
            <img src={iconMatlab} className="education-code" />
            <img src={iconPython} className="education-code" />
          </div>
          <div className="education-logos-container">
            <a href="https://www.udistrital.edu.co/inicio">
              <img className="education-logo" src={iconUD} />
            </a>
            <a href="https://platzi.com/home">
              <img className="education-logo" src={iconPlatzi} />
            </a>
          </div>
        </section>
      </main>

    </div>
  )
}

export default Home
