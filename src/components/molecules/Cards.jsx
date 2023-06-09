import React, { useContext, useEffect, useState } from 'react'
import LenguajeContext from '../../context/LenguajeContext';
import { FaCode } from 'react-icons/fa';

import '../../styles/components/molecules/Cards.css'


export const CardProject = (props) => {
  // console.log(props.children)
  const { isSpanish } = useContext(LenguajeContext);
  const { linkDeploy, linkCode, thumbnails, english, spanish } = props.children;

  return (
    <article className="card__project">
      <a className='card__project--link' href={linkDeploy} target="_blank" rel="noopener noreferrer">
        <img src={thumbnails.url} className={"card__project--image"} />
        <h3 className="card__project--title">{isSpanish ? spanish.title : english.title}</h3>
        <p className="card__project--description">{isSpanish ? spanish.description : english.description}</p>
      </a>

      <a className="card__project--code" href={linkCode} target="_blank" rel="noopener noreferrer">
        <FaCode /> {isSpanish ? "Código" : "Code"}
      </a>
    </article>
  )
}


export const CardVideo = (props) => {
  const { isSpanish } = useContext(LenguajeContext);
  const { descripcion, description, link, title, titulo, thumbnails, type } = props.children;

  return (
    <article className="card__video">
      <a className='card__video--link' href={link} target="_blank" rel="noopener noreferrer">
        <div>
          <img src={thumbnails.medium.url} className={'card__video--image'} />
          <p className="card__video--description">{isSpanish ? descripcion : description}</p>
        </div>
        
        <p className="card__video--title">{title}</p>
      </a>
    </article>
  )
}