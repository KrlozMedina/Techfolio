'use client'

// import { useContext } from 'react'
import Image from 'next/image'
// import LanguageContext, { LanguageContextType } from '@/context/LanguageContext'
import { Banner } from '@/components/molecules/Cards/CardViews'
import { educationData } from '@/mocks/education.mock'
import { skillsData } from '@/mocks/skills.mock'
import '@/styles/pages/Education.css'
import { useTranslation } from '@/hooks/useTranslation'

const diploma = 'https://i.imgur.com/hPTmVAj.jpg'

export default function Education() {
  // const { isSpanish } = useContext(LanguageContext) as LanguageContextType
  const { t } = useTranslation();
  return (
    <>
      <p className="phrase">
        {t.phrases.education}
        {/* {isSpanish
          ? 'La educación es nuestro pasaporte para el futuro.'
          : 'Education is our passport to the future.'} */}
      </p>

      <p className="author">Malcolm X</p>

      <section id="education" className="main-education-container">
        <h2 className="title">
          {t.education.title}
          {/* {isSpanish ? 'Formación académica' : 'Educational background'} */}
        </h2>

        <div className="main-education">
          <div className="education-cards-container">
            {educationData.map(item => (
              <Banner key={item.id} data={item} />
            ))}
          </div>

          <Image
            src={diploma}
            width={200}
            height={300}
            className="diploma"
            alt="Diploma"
          />
        </div>

        <h2 className="title">
          {t.education.knowledge}
          {/* {isSpanish ? 'Conocimientos' : 'Knowledge'} */}
        </h2>

        <div className="education-code-container">
          {skillsData.map(skill => (
            <article key={skill.id}>
              <Image
                src={skill.logo}
                width={80}
                height={80}
                alt={skill.name}
              />
              <h3 className="education-code-name">{skill.name}</h3>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}


// 'use client'

// import React, { useContext } from 'react'
// import LanguageContext from '@/context/LanguageContext'
// // import MainLayout from '@/components/layouts/MainLayout/MainLayout'
// import { Banner } from '@/components/molecules/Cards/CardViews'
// import '@/styles/pages/Education.css'
// import Image from 'next/image'
// // import StatusNotice from '@/components/organisms/Notice/Notice'

// // Define the context type if not already defined
// interface LanguageContextType {
//   isSpanish: boolean;
// }

// // Define the types for education data
// interface EducationItem {
//   id: number;
//   url: string;
//   alt: string;
//   logo: string;
//   titulo: string;
//   title: string;
// }

// // Define the types for code data
// interface CodeItem {
//   id: number;
//   name: string;
//   logo: string;
//   type: 'FRONTEND' | 'BACKEND';
// }

// const educationData: EducationItem[] = [
//   {
//     id: 2,
//     url: "https://www.udistrital.edu.co/inicio",
//     alt: "UD",
//     logo: "https://i.imgur.com/Hkn5iBH.png",
//     titulo: "Ingeniero en Control y Automatización",
//     title: "Control and Automation Engineer"
//   },
//   {
//     id: 4,
//     url: "https://app.aluracursos.com/",
//     alt: "Alura Latam",
//     logo: "https://i.imgur.com/DSl3dDo.png",
//     titulo: "Desarrollador BackEnd",
//     title: "BackEnd Developer"
//   },
//   {
//     id: 1,
//     url: "https://www.udistrital.edu.co/inicio",
//     alt: "UD",
//     logo: "https://i.imgur.com/Hkn5iBH.png",
//     titulo: "Tecnólogo en Electrónica",
//     title: "Electronic Technologist"
//   }
// ]

// const codeData: CodeItem[] = [
//   {
//     id: 1,
//     name: "HTML5",
//     logo: "https://i.imgur.com/JgltpME.png",
//     type: "FRONTEND"
//   },
//   {
//     id: 2,
//     name: "CSS3",
//     logo: "https://i.imgur.com/Kpd0zcY.png",
//     type: "FRONTEND"
//   },
//   {
//     id: 3,
//     name: "JavaScript",
//     logo: "https://i.imgur.com/UpuDPY1.png",
//     type: "FRONTEND"
//   },
//   {
//     id: 4,
//     name: "C++",
//     logo: "https://i.imgur.com/kQm8upj.png",
//     type: "BACKEND"
//   },
//   {
//     id: 5,
//     name: "Matlab",
//     logo: "https://i.imgur.com/tlE0JYH.png",
//     type: "BACKEND"
//   },
//   {
//     id: 6,
//     name: "React",
//     logo: "https://i.imgur.com/FFG1qVn.png",
//     type: "FRONTEND"
//   },
//   {
//     id: 7,
//     name: "Java",
//     logo: "https://i.imgur.com/lyiUVyB.png",
//     type: "BACKEND"
//   },
//   {
//     id: 8,
//     name: "Spring",
//     logo: "https://i.imgur.com/5d0xPfM.png",
//     type: "BACKEND"
//   },
//   {
//     id: 9,
//     name: "Node.js",
//     logo: "https://i.imgur.com/CHg6SwF.png",
//     type: "BACKEND"
//   }
// ]

// const Education: React.FC = () => {
//   const { isSpanish } = useContext(LanguageContext) as LanguageContextType;

//   // const links = [
//   //   { href: '/profile/about-me', title: {es: 'Sobre mí', en: 'About me'}, isActive:false },
//   //   { href: '/profile/education', title: {es: 'Educación', en: 'Education'}, isActive:true },
//   //   { href: '/profile/skills', title: {es: 'Habilidades', en: 'Skills'}, isActive:false },
//   //   { href: '/profile/certifications', title: {es: 'Certificaciones', en: 'Certifications'}, isActive:false },
//   //   { href: '/profile/experience', title: {es: 'Experiencia laboral', en: 'Work experience'}, isActive:false },
//   //   { href: '/profile/achievements', title: {es: 'Logros', en: 'Achievements'}, isActive:false },
//   // ]

//   const diplomas = [
//     'https://i.imgur.com/hPTmVAj.jpg',
//     'https://i.imgur.com/nZXn3yW.jpg',
//     'https://i.imgur.com/nMm9R9P.jpg'
//   ]

//   return (
//     <>
//       <p className='phrase'>
//         {
//           isSpanish
//             ? "La educación es nuestro pasaporte para el futuro, porque el mañana pertenece a la gente que se prepara para el hoy."
//             : "Education is our passport to the future, because tomorrow belongs to the people who prepare for today."
//         }
//       </p>

//       {/* <StatusNotice type='dummy' language={isSpanish ? 'es' : 'en'} /> */}
//       {/* <StatusNotice type='incomplete' language={isSpanish ? 'es' : 'en'} /> */}

//       <p className='author'>Malcolm X</p>

//       <section id='education' className="main-education-container">
//         <h2 className='title'>{isSpanish ? "Formación académica" : "Educational background"}</h2>

//         <div className='main-education'>
//           <div className="education-cards-container">
//             {
//               educationData.map(education => (
//                 // <Banner key={education.id} {...education} />
//                 <Banner key={education.id} data={education} />
//               ))
//             }
//           </div>
          
//           <Image 
//             src={diplomas[0]} 
//             width={200}
//             height={300}
//             className='diploma' 
//             alt="Diploma"
//             loading='lazy'
//           />
//         </div>

//         <h2 className='title'>{isSpanish ? "Conocimientos" : "Knowledge"}</h2>

//         <div className="education-code-container">
//           {
//             codeData.map(code => (
//               <article key={code.id}>
//                 <Image
//                   className='education-code-logo'
//                   src={code.logo}
//                   width={300}
//                   height={200}
//                   alt={code.name}
//                   loading='lazy'
//                 />
//                 <h3 className='education-code-name'>{code.name}</h3>
//               </article>
//             ))
//           }
//         </div>
//       </section>
//     </>
//   )
// }

// export default Education;
