import React, { useEffect, useState } from 'react'
import Slider from './Slider';

const API = "https://dossier-api.grayground-a5b47aa0.eastus.azurecontainerapps.io/projects";

// Define types for the data structure that the API returns
interface Application {
  // Define the structure based on what properties you expect from the API response
  id: string;
  name: string;
  description: string;
  // Add any other fields based on the response
}

// interface SliderData {
//   spanish: {
//     title: string;
//   };
//   english: {
//     title: string;
//   };
//   data: Application[] | null; // data will either be an array of applications or null if the fetch fails
// }

const ApplicationDesktop: React.FC = () => {
  const [applicationsDesktop, setApplicationsDesktop] = useState<Application[] | null>(null);

  useEffect(() => {
    fetch(API + "/DESKTOP")
      .then(res => res.json())
      .then(data => setApplicationsDesktop(data.content))
      .catch(() => setApplicationsDesktop(null))
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

const ApplicationMobile: React.FC = () => {
  const [applicationsMobile, setApplicationsMobile] = useState<Application[] | null>(null);

  useEffect(() => {
    fetch(API + "/MOBILE")
      .then(res => res.json())
      .then(data => setApplicationsMobile(data.content))
      .catch(() => setApplicationsMobile(null))
  }, [])

  return (
    <Slider>
      {{
        "spanish": {
          "title": "Aplicaciones móviles"
        },
        "english": {
          "title": "Applications mobile"
        },
        "data": applicationsMobile
      }}
    </Slider>
  )
}

const ApplicationWeb: React.FC = () => {
  const [applicationsWeb, setApplicationsWeb] = useState<Application[] | null>(null);

  useEffect(() => {
    fetch(API + "/WEB")
      .then(res => res.json())
      .then(data => setApplicationsWeb(data.content))
      .catch(() => setApplicationsWeb(null))
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

export { ApplicationDesktop, ApplicationMobile, ApplicationWeb }