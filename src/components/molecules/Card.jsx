import React, { useContext, useEffect, useState } from 'react'
import LenguajeContext from '../../context/LenguajeContext';

import '../../styles/components/molecules/Card.css'

const Card = (props) => {
    const {isSpanish, setIsSpanish} = useContext(LenguajeContext);
    const children = props.children;

    // console.log(children)
    const { descripcion, description, link, title, titulo, thumbnails, type } = props.children;

    // console.log(type)

    return (
        <article className="card">
            <a className='card__link' href={link}>
                <img src={thumbnails.medium.url} className={`card__image`} />
                
                {type==='youtube'
                    ?
                    <p />
                    :
                    <h3 className="card__title">{isSpanish ? titulo : title}</h3>
                }
                
                <p className="card__description">{isSpanish ? descripcion : description}</p>
            </a>
            
            {type==="youtube" ? <span /> : 
                <a className="card__code--link" href={children['url-project-code']}>
                    <div className="code__logo" /> {isSpanish ? "Código" : "Code"}
                </a>
            }

        </article>
    )
}

export default Card