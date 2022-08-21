import React from 'react'
import '@styles/Education.scss'

import iconHTML from '@icons/HTML5.png'
import iconCSS from '@icons/CSS3.png'
import iconJavaScript from '@icons/JavaScript.png'
import iconC from '@icons/C++.png'
import iconMatlab from '@icons/Matlab.png'
import iconUD from "@icons/UD.png"
import iconPlatzi from "@icons/platzi.png"

const Education = () => {
  return (
    <section id='education' className="main-education-container">
      <h2>MI EDUCACION</h2>

      <div className="education-cards-container">
        <a href="https://www.udistrital.edu.co/inicio">
          <article className='card-education'>
            <div>
              <img className="education-logo" src={iconUD} />
              <h3>Tecnologo en Electronica</h3>
            </div>
            {/* <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cupiditate aliquid maiores inventore et facilis neque! Voluptate voluptatibus perspiciatis tenetur et? Unde assumenda ratione esse reiciendis eaque dolores laudantium optio totam.</p> */}
          </article>
        </a>

        <a href="https://www.udistrital.edu.co/inicio">
          <article className='card-education'>
            <div>
              <img className="education-logo" src={iconUD} />
              <h3>Ingeniero en Control y Automatizacion</h3>
            </div>
            {/* <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi, aut hic voluptate, nesciunt temporibus dolorem natus, laboriosam velit animi laborum rerum quia. Quia corporis consequatur perspiciatis similique quam hic minus?</p> */}
          </article>
        </a>

        <a href="https://platzi.com/home">
          <article className="card-education">
            <div>
              <img className="education-logo" src={iconPlatzi} />
              <h3>FrontEnd Developer</h3>
            </div>
            {/* <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam eum facilis maiores! Minus, modi? Soluta et ab eveniet explicabo, dicta nisi possimus ipsam corporis quam sit ex ipsum perferendis voluptatum!</p> */}
          </article>
        </a>
      </div>

      <div className="education-code-container">
        <article>
          <img src={iconHTML} className="education-code-logo"/>
          <h3 className='education-code-name'>HTML</h3>
        </article>

        <article>
          <img src={iconCSS} className="education-code-logo" />
          <h3 className='education-code-name'>CSS</h3>
        </article>

        <article>
          <img src={iconJavaScript} className="education-code-logo" />
          <h3 className='education-code-name'>JavaScript</h3>
        </article>

        <article>
          <img src={iconC} className="education-code-logo" />
          <h3 className='education-code-name'>C++</h3>
        </article>

        <article>
          <img src={iconMatlab} className="education-code-logo" />
          <h3 className='education-code-name'>Matlab</h3>
        </article>
      </div>
    </section>
  )
}

export default Education
