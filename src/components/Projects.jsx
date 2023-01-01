import React, { useContext, useEffect, useState } from 'react'
// import '@styles/Projects.scss'
import LenguajeContext from '../context/LenguajeContext';

const API = 'https://youtube-v31.p.rapidapi.com/search?channelId=UCwr2Oy0BSvLWbukMAi_Nk7g&part=snippet%2Cid&order=date&maxResults=12';
const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '22dab2bc01msh2310900cbcea451p119d45jsna7f9a371b8e2',
    'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
  }
};

const projectsData = require('../data/projects.json');

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
                {console.log(video)}
              </article>
            ))
          }
        </div>
      </section>
  )
}

export default Projects