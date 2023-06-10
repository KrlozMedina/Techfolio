import React, { useEffect, useState } from 'react'
import Slider from './Slider';

const API = "https://portafolioapi-production.up.railway.app/projects/WEB";
// const API = "http://localhost:8081/projects";

const Application = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch(API)
      .then(res => res.json())
      .then(data => setProjects(data.content))
    }, [])

    const topProjects = [];

    if (projects.length != 0) {
      for (let i = 0; i < 3; i++) {
        console.log(projects[i])
        topProjects.push(projects[i])
        console.log(topProjects)
      }
    }

    // console.log(topProjects)

  return (
    <>
      <Slider>
        {{
          "english": {
            "title": "Applications Web"
          },
          "spanish": {
            "title": "Aplicaciones Web"
          },
          "data": topProjects
        }}
      </Slider>
    </>
  )
}

export default Application