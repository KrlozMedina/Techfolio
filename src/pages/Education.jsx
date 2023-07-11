import React, { useContext, useState } from 'react'
import LanguageContext from '../context/LanguageContext'
import Pages from '../components/templates/Page'
import Banner from '../components/molecules/Banner'
import '../styles/pages/Education.css'

const educationData = [
  {
    "id": 2,
    "url": "https://www.udistrital.edu.co/inicio",
    "alt": "UD",
    "logo": "https://i.imgur.com/Hkn5iBH.png",
    "titulo": "Ingeniero en Control y Automatización",
    "title": "Control and Automation Engineer"
  },
  {
    "id": 4,
    "url": "https://app.aluracursos.com/",
    "alt": "Alura Latam",
    "logo": "https://i.imgur.com/DSl3dDo.png",
    "titulo": "Desarrollador BackEnd",
    "title": "BackEnd Developer"
  },
  {
    "id": 1,
    "url": "https://www.udistrital.edu.co/inicio",
    "alt": "UD",
    "logo": "https://i.imgur.com/Hkn5iBH.png",
    "titulo": "Tecnólogo en Electrónica",
    "title": "Electronic Technologist"
  }
]

const codeData = [
  {
    "id": 1,
    "name": "HTML5",
    "logo": "https://i.imgur.com/JgltpME.png",
    "type": "FRONTEND"
  },
  {
    "id": 2,
    "name": "CSS3",
    "logo": "https://i.imgur.com/Kpd0zcY.png",
    "type": "FRONTEND"
  },
  {  
    "id": 3,
    "name": "JavaScript",
    "logo": "https://i.imgur.com/UpuDPY1.png",
    "type": "FRONTEND"
  },
  {
    "id": 4,
    "name": "C++",
    "logo": "https://i.imgur.com/kQm8upj.png",
    "type": "BACKEND"
  },
  {
    "id": 5,
    "name": "Matlab",
    "logo": "https://i.imgur.com/tlE0JYH.png",
    "type": "BACKEND"
  },
  {
    "id": 6,
    "name": "React",
    "logo": "https://i.imgur.com/FFG1qVn.png",
    "type": "FRONTEND"
  },
  {
    "id": 7,
    "name": "Java",
    "logo": "https://i.imgur.com/lyiUVyB.png",
    "type": "BACKEND"
  },
  {
    "id": 8,
    "name": "Spring",
    "logo": "https://i.imgur.com/5d0xPfM.png",
    "type": "BACKEND"
  },
  {
    "id": 9,
    "name": "Node.js",
    "logo": "https://i.imgur.com/CHg6SwF.png",
    "type": "BACKEND"
  }
]

const Education = () => {
  const { isSpanish } = useContext(LanguageContext)

  const diplomas = [
    'https://i.imgur.com/hPTmVAj.jpg',
    'https://i.imgur.com/nZXn3yW.jpg',
    'https://i.imgur.com/nMm9R9P.jpg'
  ]

  return (
    <Pages>
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
          
          <img src={diplomas[0]} className='diploma' />
        </div>

        <h2 className='title'>{isSpanish ? "Conocimientos" : "Knowledge"}</h2>

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
    </Pages>
  )
}

export default Education
