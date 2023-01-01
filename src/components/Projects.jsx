import React, { useContext, useEffect, useState } from 'react'
import LenguajeContext from '../context/LenguajeContext';

import '../styles/Projects.css'

const projectsData = [
  {
      "id": 1,
      "titulo": "Cronometro",
      "title": "Chronometer",
      "url-project": "https://krlozmedina.github.io/Cronometro/",
      "url-project-code": "https://github.com/KrlozMedina/Cronometro",
      "image": "cronometro",
      "descripcion": "Cronometro y temporizador en una sola aplicación web",
      "description": "Stopwatch and timer in a single web application"
  },
  {
      "id": 2,
      "titulo": "Clon Batata Bit",
      "title": "Clone Batata Bit",
      "url-project": "https://krlozmedina.github.io/BatataBit/",
      "url-project-code": "https://github.com/KrlozMedina/BatataBit",
      "image": "batatabit",
      "descripcion": "Clon de la pagina Batata Bit",
      "description": "Clone of the page Batata Bit"
  },
  {
      "id": 3,
      "titulo": "Perros aleatorios",
      "title": "Random Dogs",
      "url-project": "https://krlozmedina.github.io/RandomDogs/",
      "url-project-code": "https://github.com/KrlozMedina/Randomdogs",
      "image": "randomdogs",
      "descripcion": "Consumo de API de perros",
      "description": "API consumption of dogs"
  },
  {
      "id": 4,
      "titulo": "Pokemon",
      "title": "Pokemon",
      "url-project": "https://pokemon-32ua.onrender.com/",
      "url-project-code": "https://github.com/KrlozMedina/MyPokedesk",
      "image": "pokemon",
      "descripcion": "Mini juego usando la API de Pokemon",
      "description": "Mini game using the Pokemon API"
  },
  {
      "id": 5,
      "titulo": "Rick&Morty",
      "title": "Rick&Morty",
      "url-project": "https://rickandmorty-krlozmedina.netlify.app/",
      "url-project-code": "https://github.com/KrlozMedina/Rick-Morty",
      "image": "rick-morty",
      "descripcion": "Encuentra cualquier personaje de Rick&Morty",
      "description": "Find any Rick&Morty character"
  }
]

const API = 'https://youtube-v31.p.rapidapi.com/search?channelId=UCwr2Oy0BSvLWbukMAi_Nk7g&part=snippet%2Cid&order=date&maxResults=12';
const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '22dab2bc01msh2310900cbcea451p119d45jsna7f9a371b8e2',
    'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
  }
};

const Projects = () => {
  const {isSpanish, setIsSpanish} = useContext(LenguajeContext);

  const [videos, setVideos] = useState([])

  useEffect(() => {
    fetch(API, options)
      .then(res => res.json())
      .then(data => setVideos(data.items))
  }, [])

  return (
    <section id='projects' className="main-projects-container">
        <h2>{isSpanish ? "PROYECTOS" : "PROJECTS"}</h2>
        <div className="projects-cards-container">
          {
            projectsData.map(project => (
              <article className="project-card" key={project.id}>
                <a href={project['url-project']}>
                  <div className={`project-card--image ${project.image}`} />
                  <h3 className="project-card--title">{isSpanish ? project.titulo : project.title}</h3>
                  <p className="project-card--description">{isSpanish ? project.descripcion : project.description}</p>
                </a>
                <a className="project--code-link" href={project['url-project-code']}>
                  <div className="code-logo" /> {isSpanish ? "Código" : "Code"}
                </a>
              </article>
            ))
          }
        </div>
        <div className="projects-cards-container">
          {
            videos.map(video => (
              <article className="video-card" key={video.id.videoId}>
                <a href={`https://www.youtube.com/watch?v=${video.id.videoId}`}>
                  <img className='video-card--image' src={video.snippet.thumbnails.medium.url} alt="" />
                  <h3 className="video-card--title">{video.snippet.title}</h3>
                  {/* <p className="project-card--description">{video.snippet.description}</p> */}
                </a>
                {/* {console.log(video)} */}
              </article>
            ))
          }
        </div>
      </section>
  )
}

export default Projects