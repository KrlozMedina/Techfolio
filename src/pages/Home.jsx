import React, { useContext } from 'react'
import LenguajeContext from '../context/LenguajeContext'
import Header from '../components/organisms/Header'
import Hero from '../components/molecules/Hero'
import Application from '../components/organisms/Application'
import Contact from '../components/organisms/Contact'
import Footer from '../components/organisms/Footer'
import Popup from '../components/Popup'
import Banner from '../components/molecules/Banner'
import '../styles/pages/Home.css'

document.title = "KrlozMedina";

const educationData = [
  {
      "id": 1,
      "url": "https://www.udistrital.edu.co/inicio",
      "alt": "UD",
      "logo": "https://i.imgur.com/Hkn5iBH.png",
      "titulo": "Tecnologo en Electronica",
      "title": "Electronic Technologist"
  },
  {
      "id": 2,
      "url": "https://www.udistrital.edu.co/inicio",
      "alt": "UD",
      "logo": "https://i.imgur.com/Hkn5iBH.png",
      "titulo": "Ingeniero en Control y Automatización",
      "title": "Control and Automation Engineer"
  },
  {
      "id": 3,
      "url": "https://platzi.com/home",
      "alt": "Platzi",
      "logo": "https://i.imgur.com/Rd2SS4U.png",
      "titulo": "Desarrollador FrontEnd",
      "title": "FrontEnd Developer"
  }
]

const codeData = [
  {
      "id": 4,
      "name": "HTML5",
      "logo": "https://i.imgur.com/JgltpME.png"
  },
  {
      "id": 5,
      "name": "CSS3",
      "logo": "https://i.imgur.com/Kpd0zcY.png"
  },
  {  
      "id": 6,
      "name": "JavaScript",
      "logo": "https://i.imgur.com/CHg6SwF.png"
  },
  {
      "id": 7,
      "name": "C++",
      "logo": "https://i.imgur.com/kQm8upj.png"
  },
  {
      "id": 8,
      "name": "Matlab",
      "logo": "https://i.imgur.com/tlE0JYH.png"
  }
]

const Home = () => {
  const { isSpanish } = useContext(LenguajeContext)

  return (
    <>
      <div className="background__intersection"></div>
      <Header />

      <section className='container'>
        <Hero>
          {{
            "english": {
              "phrase": "Hi! I'm Carlos Alidio Medina López, Control and Automatization Engineer adn forming myself as Developer Web",
              "alt": "Personal photo"
            },
            "spanish": {
              "phrase": "Hola! Soy Carlos Alidio Medina López, Ingeniero en control y automatización y formándome como Desarrollador Web",
              "alt": "Foto personal"
            },
            "img": "https://i.imgur.com/LKFGgrC.png",
          }}
        </Hero>

        <section className="about__description">
          <h2 className='title'>{isSpanish ? "Sobre mi" : "About me"}</h2>

          <p className="about__description--text">
            {
              isSpanish
                ?
                "Ingeniero en Control y Automatización, con conocimiento de varios lenguajes de programación y fortaleciendo el lenguaje en desarrollo web. Ejerciendo actualmente el cargo de operador de centro de reparación en una multinacional de soluciones de pagos digitales, y con experiencia en el sector energético, sistemas interrumpidos (UPS) y con conocimientos de energía renovables."
                :
                "Control and Automation Engineer, with knowledge of several programming languages and strengthening the language in web development. Currently holding the position of repair center operator in a multinational of digital payment solutions, and with experience in the energy sector, interrupted systems (UPS) and with knowledge of renewable energy."
            }
          </p>
          <p className="about__description--text">
            {
              isSpanish
                ?
                "Me apasiona la idea de liderar proyectos en transformación digital para grandes empresas, optimizando sus procesos de producción. Poder contribuir a las pequeñas y medianas empresas a obtener soluciones tecnológicas de producción a bajo costo."
                :
                "I am passionate about the idea of leading digital transformation projects for large companies, optimizing their production processes. Being able to contribute to small and medium-sized companies to obtain low-cost production technology solutions."
            }
          </p>
          <p className="about__description--text">
            {
              isSpanish
                ?
                "Durante mi desarrollo profesional he tenido la oportunidad de aprender sobre electricidad, electrónica de potencia, electrónica de telecomunicaciones, redes y cableado. Además de trabajar con entidades gubernamentales, militares y bancarias, generando en mí, habilidades para tratar altos ejecutivos, clientes directos y personal técnico."
                :
                "During my professional development I have had the opportunity to learn about electricity, power electronics, telecommunications electronics, networks and cabling. In addition to working with government, military and banking entities, generating in me skills to deal with senior executives, direct clients and technical personnel."
            }
          </p>
        </section>

        <Application />
        
        <section id='education' className="main-education-container">
          <h2 className='title'>{isSpanish ? "Educación" : "Education"}</h2>

          <div className="education-cards-container">
            {
              educationData.map(education => (
                <Banner key={education.id}>{education}</Banner>
              ))
            }
          </div>

          <div className="education-code-container">
            {
              codeData.map(code => (
                <article key={code.id}>
                  <img className='education-code-logo' src={code.logo} alt="" />
                  <h3 className='education-code-name'>{code.name}</h3>
                </article>
              ))
            }
          </div>
        </section>

        <Contact />
        <Footer />
      </section>
      
      <Popup />
    </>
  )
}

export default Home
