import React, { useContext, useEffect, useState } from 'react'
import LenguajeContext from '../../context/LenguajeContext';

import Card from '../molecules/Card';

import '../../styles/components/organisms/Application.css'

const applicationsData = [
  {
    "id": 1,
    "titulo": "Transformación digital",
    "title": "Digital transformation",
    "link": "https://grado.onrender.com/",
    "link-code": "https://github.com/Tranformacion-Digital",
    "thumbnails": {
      "medium": {
        "url": "https://i.imgur.com/f5yemqI.png"
      }
    },
    "descripcion": "Implementación de herramientas 4.0 para capturar datos de una planta de producción",
    "description": "Implementation of 4.0 tools to capture data from a production plant"
  },
  {
    "id": 2,
    "titulo": "Control laboratorio",
    "title": "Laboratory control",
    "link": "https://tubular-profiterole-64b7dd.netlify.app/records",
    "link-code": "https://github.com/Laboratorio-Electronica",
    "thumbnails": {
      "medium": {
        "url": "https://i.imgur.com/86z5FBN.png"
      }
    },
    "descripcion": "Control de registros y usuarios de un laboratorio de electronica",
    "description": "Control of records and users of an electronics laboratory"
  }
]

const Projects = () => {
  const {isSpanish, setIsSpanish} = useContext(LenguajeContext);

  return (
    <section className="projects">
      <h2 className='title'>{isSpanish ? "Aplicaciones" : "Applications"}</h2>
        
      <div className='projects__cards'>
        {
          applicationsData.map(app => (
            <Card key={app.id}>{app}</Card>
          ))
        }
      </div>
    </section>
  )
}

export default Projects