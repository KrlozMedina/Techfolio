import React, { useContext } from 'react'
import LenguajeContext from '../context/LenguajeContext'

// import '@styles/Education.scss'

const educationData = require('@data/education.json')
const codeData = require('@data/code.json')

const Education = () => {
  const {isSpanish, setIsSpanish} = useContext(LenguajeContext)

  return (
    <section id='education' className="main-education-container">
      <h2>{isSpanish ? "EDUCACIÓN" : "EDUCATION"}</h2>

      <div className="education-cards-container">
        {
          educationData.map(education => (
            <a href={education.url} key={education.id}>
              <article className='card-education'>
                <div>
                  <img className='education-logo' src={education.logo} alt={education.alt} />
                  <h3>{isSpanish ? education.titulo : education.title}</h3>
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