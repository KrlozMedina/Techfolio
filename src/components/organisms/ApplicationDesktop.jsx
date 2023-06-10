import React, { useEffect, useState } from 'react'
import Slider from './Slider';

const API = "https://portafolioapi-production.up.railway.app/projects";

const ApplicationDesktop = () => {
    const [applicationsDesktop, setApplicationsDesktop] = useState([]);

    useEffect(() => {
        fetch(API + "/DESKTOP")
            .then(res => res.json())
            .then(data => setApplicationsDesktop(data.content))
    }, [])

  return (
    <Slider>
        {{
            "spanish": {
                "title": "Aplicaciones de escritorio"
            },
            "english": {
                "title": "Applications desktop"
            },
            "data": applicationsDesktop
        }}
    </Slider>
  )
}

export default ApplicationDesktop
