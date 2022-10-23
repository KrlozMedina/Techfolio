import React, { useContext } from 'react'
import LenguajeContext from '@context/LenguajeContext'

import '@styles/Education.scss'

const educationData = require('@data/education.json')
const codeData = require('@data/code.json')

const Education = () => {
  const {spanish, setSpanish} = useContext(LenguajeContext)

  return (
    <section id='education' className="main-education-container">
      <h2>{spanish ? "EDUCACIÓN" : "EDUCATION"}</h2>

      <div className="education-cards-container">
        {
          educationData.map(education => (
            <a href={education.url}>
              <article className='card-education' key={education.id}>
                <div>
                  <img className='education-logo' src={education.logo} alt={education.alt} />
                  <h3>{spanish ? education.titulo : education.title}</h3>
                </div>
              </article>
            </a>
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
