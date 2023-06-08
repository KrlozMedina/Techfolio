import React, { useEffect, useState } from 'react'
import Header from '../components/organisms/Header';
import Hero from '../components/molecules/Hero';
import Application from '../components/organisms/Application';
import Footer from '../components/organisms/Footer';
import Slider from '../components/organisms/Slider';
import img from '../assets/projects.webp'
import Contact from '../components/organisms/Contact';

const projectsData = [
    {
        "id": 1,
        "spanish": {
            "title": "Cronometro",
            "description": "Cronometro y temporizador en una sola aplicación web",
        },
        "english": {
            "title": "Chronometer",
            "description": "Stopwatch and timer in a single web application"
        },
        "link": "https://krlozmedina.github.io/Cronometro/",
        "link-code": "https://github.com/KrlozMedina/Cronometro",
        "thumbnail": {
            "medium": {
                "url": "https://i.imgur.com/f7pXh08.png",
            }
        },
        "type": "PROJECT"
    },
    {
        "id": 2,
        "spanish": {
            "title": "Clon Batata Bit",
            "description": "Clon de la pagina Batata Bit",
        },
        "english":{
            "title": "Clone Batata Bit",
            "description": "Clone of the page Batata Bit",
        },
        "link": "https://krlozmedina.github.io/BatataBit/",
        "link-code": "https://github.com/KrlozMedina/BatataBit",
        "thumbnail": {
            "medium": {
                "url": "https://i.imgur.com/srOyMs3.png",
            }
        },
        "type": "PROJECT"
    },
    {
        "id": 3,
        "spanish": {
            "title": "Perros aleatorios",
            "description": "Consumo de API de perros",
        },
        "english": {
            "title": "Random Dogs",
            "description": "API consumption of dogs",
        },
        "link": "https://krlozmedina.github.io/RandomDogs/",
        "link-code": "https://github.com/KrlozMedina/Randomdogs",
        "thumbnail": {
            "medium": {
                "url": "https://i.imgur.com/hmeeYqQ.png",
            }
        },
        "type": "PROJECT"
    },
    {
        "id": 4,
        "spanish": {
            "title": "Rick&Morty",
            "description": "Encuentra cualquier personaje de Rick&Morty",
        },
        "english": {
            "title": "Rick&Morty",
            "description": "Find any Rick&Morty character",
        },
        "link": "https://rickandmorty-krlozmedina.netlify.app/",
        "link-code": "https://github.com/KrlozMedina/Rick-Morty",
        "thumbnail": {
            "medium": {
                "url": "https://i.imgur.com/8dloLlb.png",
            }
        },
        "type": "PROJECT"
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
    document.title = 'Projects'
    const [videos, setVideos] = useState([])

    useEffect(() => {
        fetch(API, options)
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

                <Application />

                <Slider>
                    {{
                        "spanish": {
                            "title": "Proyectos"
                        },
                        "english": {
                            "title": "projects"
                        },
                        "data": projectsData
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

                <Contact />
                <Footer />
            </section>
        </>
    )
}

export default Projects
