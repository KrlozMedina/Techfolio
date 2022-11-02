import React, { useContext } from 'react'
import LenguajeContext from '@context/LenguajeContext'

import '@styles/Aboutme.scss'

const Aboutme = () => {
    const { spanish, setSpanish } = useContext(LenguajeContext)
    return (
        <div>
            {/* <h1 id="home" class="myName">Krloz Medina</h1> */}
            <div class="container-main">
                <section class="main-title-container">
                    <div class="main-title--text">
                        {spanish
                            ?
                            <p class="main-title--description">
                                Hola! Soy
                                <span> Carlos Alidio Medina López</span>
                                ,
                                <span> Ingeniero </span>
                                en
                                <span> Control </span>
                                y
                                <span> Automatización </span>
                                y formándome como
                                <span> Desarrollador Web</span>.
                            </p>
                            :
                            <p class="main-title--description">
                                Hi! I'm
                                <span> Carlos Alidio Medina López</span>
                                ,
                                <span> Control </span>
                                and
                                <span> Automatization Enginer </span>
                                and forming myself as
                                <span> Developer Web</span>.
                            </p>
                        }
                    </div>

                    <img src="https://i.imgur.com/LKFGgrC.png" class="main-title--photo"></img >
                </section>

                <section id="aboutme" class="main-aboutme-container">
                    <h2>{spanish ? "SOBRE MI" : "ABOUT ME"}</h2>

                    <p class="main-aboutme--text">
                        {
                            spanish
                                ?
                                "Ingeniero en Control y Automatización, con conocimiento de varios lenguajes de programación y fortaleciendo el lenguaje en desarrollo web. Ejerciendo actualmente el cargo de operador de centro de reparación en una multinacional de soluciones de pagos digitales, y con experiencia en el sector energético, sistemas interrumpidos (UPS) y con conocimientos de energía renovables."
                                :
                                "Control and Automation Engineer, with knowledge of several programming languages ​​and strengthening the language in web development. Currently holding the position of repair center operator in a multinational of digital payment solutions, and with experience in the energy sector, interrupted systems (UPS) and with knowledge of renewable energy."
                        }
                    </p>
                    <p class="main-aboutme--text">
                        {
                            spanish
                                ?
                                "Me apasiona la idea de liderar proyectos en transformación digital para grandes empresas, optimizando sus procesos de producción. Poder contribuir a las pequeñas y medianas empresas a obtener soluciones tecnológicas de producción a bajo costo."
                                :
                                "I am passionate about the idea of ​​leading digital transformation projects for large companies, optimizing their production processes. Being able to contribute to small and medium-sized companies to obtain low-cost production technology solutions."
                        }
                    </p>
                    <p class="main-aboutme--text">
                        {
                            spanish
                                ?
                                "Durante mi desarrollo profesional he tenido la oportunidad de aprender sobre electricidad, electrónica de potencia, electrónica de telecomunicaciones, redes y cableado. Además de trabajar con entidades gubernamentales, militares y bancarias, generando en mí, habilidades para tratar altos ejecutivos, clientes directos y personal técnico."
                                :
                                "During my professional development I have had the opportunity to learn about electricity, power electronics, telecommunications electronics, networks and cabling. In addition to working with government, military and banking entities, generating in me skills to deal with senior executives, direct clients and technical personnel."
                        }
                    </p>
                </section>
            </div>
        </div>
    )
}

export default Aboutme
