import React, { useContext } from 'react'

import Social from "../components/organisms/Social"
import { Language } from '../components/molecules/Language'
import { Logo } from '../components/atom/Logo'
import { Menu, MenuPhone, MenuAside } from '../components/organisms/Menu'

import LanguageContext from '../context/LanguageContext'

import '../styles/pages/Home.css'

import logo from '../assets/Logo.png'

const Home = () => {
  const { isSpanish } = useContext(LanguageContext)

  return (
    <div className='home--container'>
      <MenuPhone />
      <Language />

      <main className='home__main'>
        <section className='home__main--info'>
          {/* <Logo /> */}
          {/* <div className='logo-imagen'></div> */}
          <img src={logo} alt="logo" className='logo-imagen'/>

          <p>
            {
              isSpanish
              ? "Hola! 👋🏼"
              : "Hi! 👋🏼"
            }
          </p>

          <p>
            {
              isSpanish
              ? "Soy Carlos Alidio Medina López, Desarrollador de Software e Ingeniero en Control y Automatización"
              : "I'm Carlos Alidio Medina López, Software Developer and Engineer in Control and Automation"
            }
          </p>
          
          <Social />
        </section>

        <Menu />
      </main>

      <aside className='home__aside'>
        <MenuAside />
      </aside>

      






      {/* <div className="background__intersection"></div> */}
      {/* <Header /> */}

      {/* <section className='container'> */}





        {/* <div className='header__phone'>
          <h1 className='logo__text'>{"Krloz Medina </>"}</h1>
          <RiMenuFoldFill className='menu' />
        </div>
        
        <p className='description'>
          {
            isSpanish
              ? "Hola! Soy Carlos Alidio Medina López, Ingeniero en control y automatización y desarrollador de software en formacion"
              : "Hello! I'm Carlos Alidio Medina López, an engineer in control and automation and a software developer in training."
          }
        </p>

        <Social /> */}





        {/* <Hero>
          {{
            "english": {
              "phrase": "Hi! I'm Carlos Alidio Medina López, Control and Automatization Engineer adn forming myself as Developer FullStack",
              "alt": "Personal photo"
            },
            "spanish": {
              "phrase": "Hola! Soy Carlos Alidio Medina López, Ingeniero en control y automatización y formándome como Desarrollador FullStack",
              "alt": "Foto personal"
            },
            "img": "https://i.imgur.com/LKFGgrC.png",
          }}
        </Hero> */}

        {/* <section className="about__description">
          <h2 className='title'>{isSpanish ? "Sobre mi" : "About me"}</h2>

          <p className="about__description--text">
            {
              isSpanish
                ?
                "Soy un ingeniero en Control y Automatización altamente capacitado con una amplia gama de habilidades y conocimiento. En mi formación académica he usado varías herramientas tecnológicas para visualización, análisis y procesamiento de datos aprendiendo Java, C++, VHDL, Matlab, Python, PLC (ladder, grafset, estructurado diagrama de bloques), bases de datos y servicios en la nube de AWS y Azure. En el último año me he enfocado en el aprendizaje de desarrollo FrontEnd (JavaScript, HTML5, CSS3 y React) y he iniciado mi formación como desarrollador BackEnd con Java. Tengo habilidades en la resolución de problemas y análisis de datos."
                :
                "I am a highly trained Automation and Control Engineer with a wide range of skills and knowledge. In my academic training I have used various technological tools for data visualization, analysis and processing, learning Java, C++, VHDL, Matlab, Python, PLC (ladder, grafset, structured block diagram), databases and AWS cloud services and Azure. In the last year I have focused on learning FrontEnd development (JavaScript, HTML5, CSS3 and React) and I have started my training as a BackEnd developer with Java. I have skills in problem solving and data analysis."
            }
          </p>
          <p className="about__description--text">
            {
              isSpanish
                ?
                "Durante mi carrera profesional he logrado desarrollar habilidades técnicas en reparación de tarjetas electrónicas y obtener conocimiento practico de electrónica de potencia, telecomunicaciones y electricidad. He logrado adquirir habilidades de líder, proyección de tiempo y  creación de documentos para auditorias y certificación ISO 9001."
                :
                "During my professional career I have managed to develop technical skills in electronic board repair and gain practical knowledge of power electronics, telecommunications and electricity. I have managed to acquire leadership skills, time projection and document creation for audits and ISO 9001 certification."
            }
          </p>
          <p className="about__description--text">
            {
              isSpanish
                ?
                "Me apasiona la idea de desarrollar proyectos de transformación digital para grandes empresas y ayudar a las pequeñas y medianas empresas a obtener soluciones tecnológicas de producción a bajo costo."
                :
                "I am passionate about the idea of developing digital transformation projects for large companies and helping small and medium-sized companies to obtain low-cost production technology solutions."
            }
          </p>
          <p className="about__description--text">
            {
              isSpanish
                ?
                "Mi objetivo a largo plazo es seguir creciendo profesionalmente y contribuir al éxito de proyectos en transformación digital que tengan un impacto positivo en la sociedad. Estoy comprometido a utilizar mis habilidades y conocimientos, incluyendo mi habilidad para resolver problemas y analizar datos, para optimizar los procesos de producción y alcanzar resultados sobresalientes."
                :
                "My long-term goal is to continue growing professionally and contribute to the success of digital transformation projects that have a positive impact on society. I am committed to using my skills and knowledge, including my ability to solve problems and analyze data, to optimize production processes and achieve outstanding results."
            }
          </p>
        </section> */}

        {/* <Application /> */}
        
        {/* <section id='education' className="main-education-container">
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
        </section> */}

        {/* <Contact /> */}
        {/* <Footer /> */}
      {/* </section> */}
      {/* <Popup /> */}
    </div>
  )
}

export default Home
