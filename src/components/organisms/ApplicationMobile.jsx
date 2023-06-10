import React, { useEffect, useState } from 'react'
import Slider from './Slider';

const API = "https://portafolioapi-production.up.railway.app/projects";

const ApplicationMobile = () => {
    const [applicationsMobile, setApplicationsMobile] = useState([]);

    useEffect(() => {
        fetch(API + "/MOBILE")
            .then(res => res.json())
            .then(data => setApplicationsMobile(data.content))
    }, [])

  return (
    <Slider>
                    {{
                        "spanish": {
                            "title": "Aplicaciones mobiles"
                        },
                        "english": {
                            "title": "Applications mobile"
                        },
                        "data": applicationsMobile
                    }}
                </Slider>
  )
}

export default ApplicationMobile
