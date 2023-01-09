import React, { useContext } from 'react'
import LenguajeContext from '../../context/LenguajeContext'

import Banner from '../molecules/Banner'

import '../../styles/components/organisms/Education.css'

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

const Education = () => {
  const {isSpanish, setIsSpanish} = useContext(LenguajeContext)

  return (
    <section id='education' className="main-education-container">
      <h2>{isSpanish ? "EDUCACIÓN" : "EDUCATION"}</h2>

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
  )
}

export default Education