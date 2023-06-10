import React, { useEffect, useState } from 'react'
import Slider from './Slider';

const API = "https://portafolioapi-production.up.railway.app/projects";

const ApplicationWeb = () => {
    const [applicationsWeb, setApplicationsWeb] = useState([]);

    useEffect(() => {
        fetch(API + "/WEB")
            .then(res => res.json())
            .then(data => setApplicationsWeb(data.content))
    }, [])

  return (
    <Slider>
        {{
            "spanish": {
                "title": "Aplicaciones web"
            },
            "english": {
                "title": "Applications web"
            },
            "data": applicationsWeb
        }}
    </Slider>
  )
}

export default ApplicationWeb
