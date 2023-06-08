import React, { useEffect, useState } from 'react'
import Slider from './Slider';

const applicationsData = [
  {
    "id": 1,
    "spanish": {
      "title": "Transformación digital",
      "description": "Implementación de herramientas 4.0 para capturar datos de una planta de producción",
    },
    "english": {
      "title": "Digital transformation",
      "description": "Implementation of 4.0 tools to capture data from a production plant",
    },
    "link": "https://grado.onrender.com/",
    "link-code": "https://github.com/Tranformacion-Digital",
    "thumbnails": {
      "medium": {
        "url": "https://i.imgur.com/f5yemqI.png"
      }
    },
    "type": "application"
  },
  {
    "id": 2,
    "spanish": {
      "title": "Control laboratorio",
      "description": "Control de registros y usuarios de un laboratorio de electronica",
    },
    "english": {
      "title": "Laboratory control",
      "description": "Control of records and users of an electronics laboratory",
    },
    "link": "https://tubular-profiterole-64b7dd.netlify.app/records",
    "link-code": "https://github.com/Laboratorio-Electronica",
    "thumbnails": {
      "medium": {
        "url": "https://i.imgur.com/86z5FBN.png"
      }
    },
    "type": "application"
  },
  {
    "id": 3,
    "spanish": {
        "title": "Pokemon",
        "description": "Mini juego usando la API de Pokemon",
    },
    "english": {
        "title": "Pokemon",
        "description": "Mini game using the Pokemon API",
    },
    "link": "https://pokemon-32ua.onrender.com/",
    "link-code": "https://github.com/KrlozMedina/MyPokedesk",
    "thumbnails": {
        "medium": {
            "url": "https://i.imgur.com/DKlA2ut.png",
        }
    },
    "type": "project"
},
]

const Application = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch("https://portafolioapi-production.up.railway.app/projects")
        .then(res => res.json())
        .then(data => setProjects(data.content))
}, [])

  return (
    <>
      <Slider>
        {{
          "english": {
            "title": "Applications"
          },
          "spanish": {
            "title": "Aplicaciones"
          },
          "data": projects
        }}
      </Slider>
    </>
  )
}

export default Application