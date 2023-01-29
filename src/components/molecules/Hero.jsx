import React, { useContext } from 'react'
import LenguajeContext from '../../context/LenguajeContext'
import '../../styles/components/molecules/Hero.css'

const Hero = (props) => {
  const { img, author, english, spanish } = props.children;
  const { isSpanish } = useContext(LenguajeContext)
  
  return (
    <section className='hero'>
      <div className='hero__phrase'>
        {isSpanish ? <p>{spanish.phrase}</p> : <p>{english.phrase}</p>}
        <span>{author ? author : ""}</span>
      </div>

      <img src={img} alt={spanish.alt} className='hero__image' />
    </section>
  )
}

export default Hero
