import React, { useContext } from 'react'
import LenguajeContext from '../../context/LenguajeContext'

import '../../styles/components/molecules/Banner.css'

const Banner = ( props ) => {
  const {isSpanish, setIsSpanish} = useContext(LenguajeContext)
    const { url, logo, alt, titulo, title } = props.children
  return (
        <a href={url} target="_blank" rel="noopener noreferrer">
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
