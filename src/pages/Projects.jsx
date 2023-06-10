import React, { useEffect, useState } from 'react'
import Header from '../components/organisms/Header';
import Hero from '../components/molecules/Hero';
import Application from '../components/organisms/Application';
import Footer from '../components/organisms/Footer';
import Slider from '../components/organisms/Slider';
import img from '../assets/projects.webp'
import Contact from '../components/organisms/Contact';

const videoAPI = 'https://youtube-v31.p.rapidapi.com/search?channelId=UCwr2Oy0BSvLWbukMAi_Nk7g&part=snippet%2Cid&order=date&maxResults=12';
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '22dab2bc01msh2310900cbcea451p119d45jsna7f9a371b8e2',
        'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
    }
};

const API = "https://portafolioapi-production.up.railway.app/projects";
// const projectsAPI = "http://localhost:8081/projects";

const Projects = () => {
    document.title = 'Projects'

    const [applicationsWeb, setApplicationsWeb] = useState([]);
    const [applicationsDesktop, setApplicationsDesktop] = useState([]);
    const [applicationsMobile, setApplicationsMobile] = useState([]);
    const [videos, setVideos] = useState([])

    useEffect(() => {
        fetch(API + "/WEB")
            .then(res => res.json())
            .then(data => setApplicationsWeb(data.content))
    }, [])

    useEffect(() => {
        fetch(API + "/DESKTOP")
            .then(res => res.json())
            .then(data => setApplicationsDesktop(data.content))
    })

    useEffect(() => {
        fetch(API + "/MOBILE")
            .then(res => res.json())
            .then(data => setApplicationsMobile(data.content))
    })

    useEffect(() => {
        fetch(videoAPI, options)
            .then(res => res.json())
            .then(data => setVideos(data.items))
    }, [])

    let videosYoutube = [];

    videos.map(video => {
        video.snippet.link = `https://www.youtube.com/watch?v=${video.id.videoId}`;
        video.snippet.type = 'video';
        video.snippet.descripcion = video.snippet.description;
        video.snippet.id = video.id.videoId;
        videosYoutube.push(video.snippet)
    })

    return (
        <>
            <span className="background__intersection"></span>
            <Header />
            <section className='container'>
                <Hero>
                    {{
                        "english": {
                            "phrase": "Rewards and motivation are an oil change for project engines. Do it regularly and often.",
                            "alt": "Projects"
                        },
                        "spanish": {
                            "phrase": "Las recompensas y la motivación son un cambio de aceite para los motores del proyecto. Hazlo regularmente y con frecuencia.",
                            "alt": "Proyectos"
                        },
                        "author": "Woody Williams",
                        "img": img,
                    }}
                </Hero>

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

                <Slider>
                    {{
                        "spanish": {
                            "title": "Videos"
                        },
                        "english": {
                            "title": "Videos"
                        },
                        "data": videosYoutube
                    }}
                </Slider>

                <Footer />
            </section>
        </>
    )
}

export default Projects
