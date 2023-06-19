import React, { useContext } from 'react'
import LenguajeContext from '../context/LenguajeContext'
import Page from '../components/templates/Page'
import Banner from '../components/molecules/Banner'
import '../styles/pages/Education.css'

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
  // {
  //     "id": 3,
  //     "url": "https://platzi.com/home",
  //     "alt": "Platzi",
  //     "logo": "https://i.imgur.com/Rd2SS4U.png",
  //     "titulo": "Desarrollador FrontEnd",
  //     "title": "FrontEnd Developer"
  // },
  {
      "id": 4,
      "url": "https://app.aluracursos.com/",
      "alt": "Alura Latam",
      "logo": "https://i.imgur.com/DSl3dDo.png",
      "titulo": "Desarrollador BackEnd",
      "title": "BackEnd Developer"
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
  },
  {
      "id": 9,
      "name": "React",
      "logo": "https://i.imgur.com/FFG1qVn.png"
  }
]

const Education = () => {
  const { isSpanish } = useContext(LenguajeContext)

  return (
    <Page>
      <p className='phrase'>
        {
          isSpanish
          ? "La educación es nuestro pasaporte para el futuro, porque el mañana pertenece a la gente que se prepara para el hoy."
          : "Education is our passport to the future, because tomorrow belongs to the people who prepare for today."
        }
      </p>

      <p className='author'>Malcolm X</p>

      <section id='education' className="main-education-container">
          <h2 className='title'>{isSpanish ? "Formación académica" : "Educational background"}</h2>

          <div className='main-education'>
            <div className="education-cards-container">
              {
                educationData.map(education => (
                  <Banner key={education.id}>{education}</Banner>
                ))
              }
            </div>

            <img src='https://i.imgur.com/IzU8uWs.png' className='diploma'>
              
            </img>
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
    </Page>
  )
}

export default Education
