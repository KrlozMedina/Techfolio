import React, { useContext } from 'react'
import LenguajeContext from '../../context/LenguajeContext'

import '../../styles/components/molecules/Hero.css'

const Hero = (props) => {
    const { img, alt, phrase, author, frase } = props.children;
    const { isSpanish, setIsSpanish } = useContext(LenguajeContext)
    
    return (
        <section className='hero'>
            <div className='hero__phrase'>
                {isSpanish ? <p>{frase}</p> : <p>{phrase}</p>}
                <span>{author}</span>
            </div>

            <img src={img} alt={alt} className='hero__image' />
        </section>
    )
}

export default Hero
