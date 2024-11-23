'use client'

import React, { useContext } from 'react'
import LanguageContext from '@/context/LanguageContext'
import Page from '@/components/templates/Page'
import '@/styles/pages/AboutMe.css'
import { MdCastForEducation, MdOutlineWorkOutline } from 'react-icons/md';
import { GiSkills, GiThink, GiStairsGoal } from 'react-icons/gi'
import { MdTravelExplore, MdOutlineSocialDistance } from "react-icons/md"
import Social from '@/components/organisms/Social';

const AboutMe: React.FC = () => {
  // document.title = 'About me'

  // Define the type for LanguageContext
  type LanguageContextType = {
    isSpanish: boolean;
    setIsSpanish: (language: boolean) => void;
  };

  const { isSpanish, setIsSpanish } = useContext(LanguageContext) as LanguageContextType;

  return (
    <Page>
      <p className='phrase'>
        {
          isSpanish
          ? "Conocer a otros es inteligencia, conocerse a sí mismos es sabiduría. Manejar a otros es fuerza, manejarse a sí mismos es verdadero poder."
          : "To know others is intelligence, to know oneself is wisdom. To manage others is strength, to manage oneself is true power."
        }
      </p>

      <p className='author'>Tao Te Ching</p>

      <img src="https://i.imgur.com/cy2PG85.jpg" alt="" className='aboutme__photo' />
      
      <h1 className='title' >{isSpanish ? "Sobre mi" : "About me"}</h1>

      <section className='section-text'>
        <p className='text'>
          {
            isSpanish
            ? "Soy Carlos Alidio Medina López, un apasionado de la tecnología y el desarrollo de software. Actualmente, desempeño el rol de líder técnico en un laboratorio de electrónica para una multinacional. Durante mi tiempo libre, me dedico al estudio del desarrollo de software y a la creación de aplicaciones para aplicar mis conocimientos. Me encanta explorar el mundo y estar al tanto de las últimas tendencias tecnológicas."
            : "I am Carlos Alidio Medina López, a technology enthusiast and software developer. Currently, I hold the position of technical leader in an electronics laboratory for a multinational company. During my free time, I dedicate myself to studying software development and creating applications to apply my knowledge. I love exploring the world and staying up-to-date with the latest technology trends."
          }
        </p>

        <span className='text__title'>
          <MdCastForEducation /> {
            isSpanish ? "Formación académica" : "Educational Background"
          }
        </span>

        <p className='text'>
          {
            isSpanish
            ? "Completé mi carrera en Tecnología en Electrónica en la Universidad Distrital Francisco José de Caldas, donde realicé un proyecto de grado centrado en el diseño de un medidor y analizador de baterías VRLA. Este proyecto involucró tanto el desarrollo de hardware como de software. En el aspecto de hardware, diseñé un circuito para capturar el voltaje y realizar cargas y descargas controladas de las baterías. Para el software, desarrollé un programa en Matlab que realizaba los cálculos necesarios y generaba informes finales."
            : "I completed my degree in Electronics Technology at the Universidad Distrital Francisco José de Caldas, where I worked on a degree project focused on designing a VRLA battery meter and analyzer. This project involved the development of both hardware and software. On the hardware side, I designed a circuit to capture voltage and perform controlled charging and discharging of the batteries. For the software, I created a program in Matlab that performed the necessary calculations and generated final reports."
          }
        </p>

        <p className="text">
          {
            isSpanish
            ? "Continué mi formación académica en Ingeniería en Control y Automatización, también en la Universidad Distrital Francisco José de Caldas. Durante mi proyecto de grado en esta disciplina, participé en la transformación digital de una planta de producción química. Colaboré en el desarrollo de una aplicación web que mostraba datos de la planta, lo que impulsó la eficiencia y la toma de decisiones en la compañía. Para lograr esto, trabajé en la captura de datos desde un PLC, su conversión a protocolo HTTP a través de un servidor local, el envío a una API implementada en AWS y, finalmente, la visualización de los datos en la aplicación web."
            : "I continued my academic journey with a degree in Control and Automation Engineering, also at the Universidad Distrital Francisco José de Caldas. During my degree project in this field, I participated in the digital transformation of a chemical production plant. I collaborated in the development of a web application that displayed plant data, improving efficiency and decision-making in the company. To achieve this, I worked on data capture from a PLC, conversion to HTTP protocol through a local server, sending data to an API implemented in AWS, and finally visualizing the data in the web application."
          }
        </p>

        <span className="text__title">
          <MdOutlineWorkOutline /> {
            isSpanish ? "Experiencia Profesional" : "Professional Experience"
          } 
        </span>

        <p className="text">
          {
            isSpanish
            ? "Comencé mi experiencia profesional en el campo del mantenimiento de UPS (Sistemas de Alimentación Ininterrumpida), donde adquirí habilidades en sistemas electrónicos y energías renovables. Desarrollé un sólido entendimiento de los sistemas electrónicos y la conexión entre las diferentes etapas de las UPS. También tuve la oportunidad de participar en proyectos de energía renovable, y contribuí a la implementación del primer sistema fotovoltaico de la empresa."
            : "I started my professional experience in the field of Uninterruptible Power Supply (UPS) maintenance, where I gained skills in electronic systems and renewable energy. I developed a solid understanding of electronic systems and the connection between different stages of UPS. I also had the opportunity to participate in renewable energy projects and contributed to the implementation of the company's first photovoltaic system."
          }
        </p>

        <p className="text">
          {
            isSpanish
            ? "Luego, me uní a una empresa de soluciones de pagos digitales, donde progresé rápidamente y me convertí en líder técnico. Durante mi tiempo allí, adquirí habilidades en liderazgo, planificación de producción y métodos de calidad. Participé en la implementación de métodos para mejorar la calidad del laboratorio y logramos obtener la certificación ISO9001. Uno de nuestros mayores logros fue ganar el premio al mejor centro de reparación en Latinoamérica. Además, lideré un proyecto para automatizar los registros de variables ambientales en el laboratorio, lo cual nos permitió tener datos más precisos y reducir el uso de papel."
            : "Later, I joined a digital payment solutions company, where I quickly progressed and became a technical leader. During my time there, I acquired skills in leadership, production planning, and quality methods. I participated in the implementation of methods to improve the quality of the laboratory, and we obtained ISO9001 certification. One of our greatest achievements was winning the award for the best repair center in Latin America. Additionally, I led a project to automate environmental variable records in the laboratory, which allowed us to have more accurate data and reduce paper usage."
          }
        </p>

        <span className="text__title">
          <GiSkills /> {
            isSpanish ? "Habilidades y Conocimientos" : "Skills and Knowledge"
          }
        </span>

        <p className="text">
          {
            isSpanish
            ? "A lo largo de mi formación académica y experiencia profesional, he desarrollado habilidades y conocimientos."
            : "Throughout my academic training and professional experience, I have developed skills and knowledge."
          }
        </p>

        <ul className='text'>
          <li>
            {
              isSpanish
              ? "Poseo sólidas habilidades analíticas, lo que me permite descomponer problemas complejos y encontrar soluciones innovadoras."
              : "I possess strong analytical skills, enabling me to break down complex problems and find innovative solutions."
            }
          </li>

          <li>
            {
              isSpanish
              ? "Tengo una habilidad natural para identificar desafíos, analizar las causas raíz e implementar soluciones efectivas."
              : "I have a natural aptitude for identifying challenges, analyzing root causes, and implementing effective resolutions."
            }
          </li>

          <li>
            {
              isSpanish
              ? "Poseo habilidades en planificación, organización y ejecución de proyectos, asegurando la entrega oportuna y la utilización eficiente de los recursos."
              : "I am skilled in planning, organizing, and executing projects, ensuring timely delivery and efficient resource utilization."
            }
          </li>

          <li>
            {
              isSpanish
              ? "Tengo un sólido conocimiento en electrónica, sistemas de control, desarrollo de software y análisis de datos."
              : "I have a solid understanding of electronics, control systems, software development, and data analysis."
            }
          </li>

          <li>
            {
              isSpanish
              ? "Destaco en la colaboración con equipos multidisciplinarios, aprovechando las fortalezas colectivas para alcanzar objetivos comunes."
              : "I excel in collaborating with multidisciplinary teams, leveraging collective strengths to achieve common goals."
            }
          </li>

          <li>
            {
              isSpanish
              ? "He perfeccionado mis habilidades de liderazgo a través de diversos proyectos y roles, guiando eficazmente a los equipos hacia el éxito."
              : "I have honed my leadership abilities through various projects and roles, effectively guiding teams towards success."
            }
          </li>
        </ul>

        <p className='text'>
          {
            isSpanish
            ? "Estas habilidades me permiten enfrentar desafíos complejos, colaborar en equipos multidisciplinarios y encontrar soluciones efectivas. Continúo buscando oportunidades para seguir aprendiendo y mejorando en el campo del desarrollo de software y la transformación digital."
            : "These skills enable me to tackle complex challenges, collaborate effectively in multidisciplinary teams, and find effective solutions. I continue to seek opportunities to learn and improve in the field of software development and digital transformation."
          }
        </p>

        <span className="text__title">
          <GiThink /> {
            isSpanish ? "Valores Personales" : "Personal Values"
          }
        </span>

        <p className="text">
          {
            isSpanish
            ? "Como individuo, considero que los valores personales son fundamentales para establecer relaciones sólidas y constructivas. Los valores que considero clave en mi vida y trabajo son:"
            : "As an individual, I believe that personal values are crucial for establishing strong and constructive relationships. The values that I consider key in my life and work are:"
          }
        </p>

        <ul className='text'>
          <li>
            <u>{isSpanish ? "Respeto" : "Respect"}</u>
            <u>Respeto</u>
            {
              isSpanish
              ? ": Reconozco y valoro las diferencias de las personas, manteniendo una actitud abierta y tolerante hacia sus perspectivas y opiniones. Respetar a los demás es fundamental para fomentar un ambiente armonioso y colaborativo."
              : ": I recognize and value the differences in people, maintaining an open and tolerant attitude towards their perspectives and opinions. Respecting others is essential for fostering a harmonious and collaborative environment."
            }
          </li>
          <li>
            <u>{isSpanish ? "Confianza" : "Trust"}</u>
            {
              isSpanish
              ? ": Creo en la importancia de construir relaciones basadas en la confianza mutua. Busco ser una persona confiable, cumpliendo mis compromisos y demostrando integridad en mis acciones. La confianza es la base para establecer vínculos duraderos y efectivos."
              : ": I believe in the importance of building relationships based on mutual trust. I strive to be a trustworthy person, fulfilling my commitments and demonstrating integrity in my actions. Trust is the foundation for establishing lasting and effective connections."
            }
          </li>
          <li>
            <u>{isSpanish ? "Lealtad" : "Loyalty"}</u>
            {
              isSpanish
              ? ": Considero que la lealtad es esencial en las relaciones personales y profesionales. Me comprometo a apoyar a mis compañeros de equipo y colegas, siendo leal a sus intereses y brindándoles mi respaldo cuando lo necesiten. La lealtad promueve la colaboración y el crecimiento conjunto."
              : ": I consider loyalty to be essential in both personal and professional relationships. I am committed to supporting my teammates and colleagues, being loyal to their interests and providing them with my support when needed. Loyalty promotes collaboration and mutual growth."
            }
          </li>
        </ul>

        <p className="text">
          {
            isSpanish
            ? "Estos valores me guían en mi interacción con los demás, y los considero pilares fundamentales para mantener relaciones saludables y productivas."
            : "These values guide me in my interactions with others, and I consider them fundamental pillars for maintaining healthy and productive relationships."
          }
        </p>

        <span className="text__title">
          <GiStairsGoal /> {
            isSpanish ? "Objetivo Profesional" : "Professional Objective"
          }
        </span>

        <p className="text">
          {
            isSpanish
            ? "Busco oportunidades desafiantes para aplicar mis habilidades tecnológicas y de liderazgo en proyectos significativos. Mi objetivo es contribuir a la transformación digital en Colombia, mejorando la calidad de vida de las personas y aumentando la productividad empresarial. Estoy motivado por crear soluciones innovadoras que generen un impacto positivo en la sociedad y contribuyan al desarrollo sostenible."
            : "I am seeking challenging opportunities to apply my technology and leadership skills to meaningful projects. My objective is to contribute to Colombia's digital transformation, enhancing quality of life for individuals and driving business productivity. I am driven to create innovative solutions that have a positive impact on society and contribute to sustainable development."
          }
        </p>

        <span className="text__title">
          <MdTravelExplore /> {
            isSpanish ? "Intereses y Pasatiempos" : "Interests and Hobbies"
          }
        </span>

        <p className="text">
          {
            isSpanish
            ? "Además de mi trabajo, tengo una variedad de intereses y pasatiempos que me mantienen equilibrado y enriquecen mi vida. Algunos de ellos incluyen:"
            : "In addition to my work, I have a variety of interests and hobbies that keep me balanced and enrich my life. Some of them include:"
          }
        </p>

        <ul className="text">
          <li>
            {
              isSpanish
              ? "Tengo una gran pasión por ampliar mis conocimientos y mantenerme actualizado con los últimos avances en tecnología y otras áreas."
              : "I have a great passion for expanding my knowledge and staying updated with the latest advancements in technology and other fields."
            }
          </li>
          
          <li>
            {
              isSpanish
              ? "Disfruto jugar videojuegos como una forma de relajarme y desafiarme en mundos virtuales."
              : "I enjoy playing video games as a way to relax and challenge myself in virtual worlds."
            }
          </li>

          <li>
            {
              isSpanish
              ? "Explorar nuevos lugares y experimentar diferentes culturas es una fuente de inspiración y crecimiento personal para mí."
              : "Exploring new places and experiencing different cultures is a source of inspiration and personal growth for me."
            }
          </li>

          <li>
            {
              isSpanish
              ? "Me fascinan los mundos imaginativos y los conceptos estimulantes que se representan en las películas de ciencia ficción."
              : "I'm fascinated by imaginative worlds and thought-provoking concepts depicted in science fiction films."
            }
          </li>

          <li>
            {
              isSpanish
              ? "Tengo un profundo interés en las tecnologías emergentes y disfruto estar al tanto de las últimas tendencias e innovaciones."
              : "I have a deep interest in emerging technologies and enjoy staying up to date with the latest trends and innovations."
            }
          </li>

          <li>
            {
              isSpanish
              ? "Aprecio el arte culinario y disfruto explorar diferentes cocinas y probar nuevos platos."
              : "I appreciate the culinary arts and enjoy exploring different cuisines and trying new dishes."
            }
          </li>
        </ul>

        <p className="text">
          {
            isSpanish
            ? "Estos son solo algunos de los intereses y pasatiempos que me mantienen motivado y me permiten disfrutar de un enfoque equilibrado en mi vida."
            : "These are just some of the interests and hobbies that keep me motivated and allow me to enjoy a balanced approach to life."
          }
        </p>

        <span className="text__title">
          <MdOutlineSocialDistance /> {
            isSpanish ? "Redes sociales" : "Social media"
          }
        </span>

        <Social />
      </section>
    </Page>
  )
}

export default AboutMe
