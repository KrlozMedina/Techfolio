import React, { useContext } from 'react'
import LanguageContext from '../../context/LanguageContext'

import '../../styles/components/molecules.css'

const Banner = ( props ) => {
  const {isSpanish, setIsSpanish} = useContext(LanguageContext)
    const { url, logo, alt, titulo, title } = props.children
  return (
    // <a onClick={localStorage.setItem('diploma', logo)}>
    <a href={'/education'} onClick={localStorage.setItem('diploma', logo)} target="_blank" rel="noopener noreferrer">
      <article className='card-education'>
      <div>
        <img className='education-logo' src={logo} alt={alt} />
        <h3>{isSpanish ? titulo : title}</h3>
      </div>
      </article>
    </a>
  )
}

export default Banner
