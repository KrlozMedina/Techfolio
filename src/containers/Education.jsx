import React from 'react'
import '@styles/Education.scss'

import iconHTML from '@icons/HTML5.png'
import iconCSS from '@icons/CSS3.png'
import iconJavaScript from '@icons/JavaScript.png'
import iconC from '@icons/C++.png'
import iconMatlab from '@icons/Matlab.png'
import iconPython from '@icons/Python.png'
import iconUD from "@icons/UD.png"
import iconPlatzi from "@icons/platzi.png"

const Education = () => {
  return (
    <div>
      <section id='education' className="main-education-container container">
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
    </div>
  )
}

export default Education
