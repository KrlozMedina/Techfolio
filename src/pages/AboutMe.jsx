import React, { useContext } from 'react'
import LanguageContext from '../context/LanguageContext'
import Page from '../components/templates/Page'
import '../styles/pages/AboutMe.css'

const AboutMe = () => {
  document.title = 'About me'
  const { isSpanish } = useContext(LanguageContext)

  return (
    <div>
      <Page>
        <img src="https://i.imgur.com/cy2PG85.jpg" alt="" className='aboutme__photo' />
        <h1 className='title' >
          {
            isSpanish
            ? "Sobre mi"
            : "About me"
          }
        </h1>
        
        <p className='text'>
          {
            isSpanish
            ? "Soy un ingeniero en Control y Automatización altamente capacitado con una amplia gama de habilidades y conocimiento. En mi formación académica he usado varías herramientas tecnológicas para visualización, análisis y procesamiento de datos aprendiendo Java, C++, VHDL, Matlab, Python, PLC (ladder, grafset, estructurado diagrama de bloques), bases de datos y servicios en la nube de AWS y Azure. En el último año me he enfocado en el aprendizaje de desarrollo FrontEnd (JavaScript, HTML5, CSS3 y React) y he iniciado mi formación como desarrollador BackEnd con Java. Tengo habilidades en la resolución de problemas y análisis de datos. Durante mi carrera profesional he logrado desarrollar habilidades técnicas en reparación de tarjetas electrónicas y obtener conocimiento practico de electrónica de potencia, telecomunicaciones y electricidad. He logrado adquirir habilidades de líder, proyección de tiempo y creación de documentos para auditorias y certificación ISO 9001. Me apasiona la idea de desarrollar proyectos de transformación digital para grandes empresas y ayudar a las pequeñas y medianas empresas a obtener soluciones tecnológicas de producción a bajo costo. Mi objetivo a largo plazo es seguir creciendo profesionalmente y contribuir al éxito de proyectos en transformación digital que tengan un impacto positivo en la sociedad. Estoy comprometido a utilizar mis habilidades y conocimientos, incluyendo mi habilidad para resolver problemas y analizar datos, para optimizar los procesos de producción y alcanzar resultados sobresalientes."
            : "I am a highly skilled engineer in Control and Automation with a broad range of abilities and knowledge. In my academic training, I have used various technological tools for data visualization, analysis, and processing. I have experience in Java, C++, VHDL, Matlab, Python, PLC (ladder, grafcet, structured block diagram), databases, and cloud services such as AWS and Azure. In the past year, I have focused on learning FrontEnd development (JavaScript, HTML5, CSS3, and React) and have started my training as a BackEnd developer with Java. I have problem-solving skills and expertise in data analysis. Throughout my professional career, I have developed technical skills in repairing electronic boards and gained practical knowledge in power electronics, telecommunications, and electricity. I have also acquired leadership skills, time projection abilities, and document creation for audits and ISO 9001 certification. I am passionate about the idea of developing digital transformation projects for large companies and helping small and medium-sized enterprises obtain low-cost technological production solutions. My long-term goal is to continue growing professionally and contribute to the success of digital transformation projects that have a positive impact on society. I am committed to utilizing my skills and knowledge, including my problem-solving and data analysis abilities, to optimize production processes and achieve outstanding results."
          }
        </p>
      </Page>
    </div>
  )
}

export default AboutMe
