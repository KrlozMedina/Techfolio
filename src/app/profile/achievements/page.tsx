'use client';

import React, { useContext } from 'react';
import LanguageContext, { LanguageContextType } from '@/context/LanguageContext';

const TEXT = {
  es: {
    title: 'Premios y Reconocimientos',
    achievements: [
      {
        title: 'Premio al Mejor Centro de Reparación LATAM',
        description:
          'Reconocimiento obtenido por el desempeño, calidad y eficiencia del laboratorio.',
        date: '2023',
      },
      {
        title: 'Certificación ISO 9001',
        description:
          'Participación activa en la implementación y certificación del sistema de gestión de calidad.',
        date: '2022',
      },
      {
        title: 'Automatización de Variables Ambientales',
        description:
          'Proyecto de automatización para captura y análisis de variables ambientales, reduciendo uso de papel.',
        date: '2021',
      },
    ],
  },
  en: {
    title: 'Awards and Achievements',
    achievements: [
      {
        title: 'Best Repair Center LATAM Award',
        description:
          'Recognition obtained for performance, quality, and efficiency of the laboratory.',
        date: '2023',
      },
      {
        title: 'ISO 9001 Certification',
        description:
          'Active participation in the implementation and certification of the quality management system.',
        date: '2022',
      },
      {
        title: 'Environmental Variables Automation',
        description:
          'Automation project for capturing and analyzing environmental variables, reducing paper usage.',
        date: '2021',
      },
    ],
  },
};

const AchievementsPage: React.FC = () => {
  const { isSpanish } = useContext(LanguageContext) as LanguageContextType;
  const t = isSpanish ? TEXT.es : TEXT.en;

  return (
    <section style={{ padding: '20px' }}>
      <h1>{t.title}</h1>

      <ul>
        {t.achievements.map(a => (
          <li key={a.title} style={{ marginBottom: '16px' }}>
            <h2>{a.title}</h2>
            <p>{a.description}</p>
            <small>{a.date}</small>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default AchievementsPage;


// 'use client'

// import React from 'react';
// // import LanguageContext, { LanguageContextType } from '@/context/LanguageContext';
// // import MainLayout from '@/components/layouts/MainLayout/MainLayout';
// // import StatusNotice from '@/components/organisms/Notice/Notice';

// const AchievementsPage = () => {
//   // const { isSpanish } = useContext(LanguageContext) as LanguageContextType;

//   // const links = [
//   //   { href: '/profile/about-me', title: {es: 'Sobre mí', en: 'About me'}, isActive:false },
//   //   { href: '/profile/education', title: {es: 'Educación', en: 'Education'}, isActive:false },
//   //   { href: '/profile/skills', title: {es: 'Habilidades', en: 'Skills'}, isActive:false },
//   //   { href: '/profile/certifications', title: {es: 'Certificaciones', en: 'Certifications'}, isActive:false },
//   //   { href: '/profile/experience', title: {es: 'Experiencia laboral', en: 'Work experience'}, isActive:false },
//   //   { href: '/profile/achievements', title: {es: 'Logros', en: 'Achievements'}, isActive:true },
//   // ]

//   const achievements = [
//     {
//       title: 'Premio al Mejor Desarrollador',
//       description: 'Reconocimiento otorgado por la comunidad de desarrolladores en 2022.',
//       date: '2022',
//     },
//     {
//       title: 'Contribución Destacada en Open Source',
//       description: 'Aportaciones significativas a proyectos de código abierto.',
//       date: '2021',
//     },
//     {
//       title: 'Reconocimiento por Innovación Tecnológica',
//       description: 'Premio recibido por desarrollar soluciones innovadoras en el sector.',
//       date: '2020',
//     },
//   ];

//   return (
//     <>
//       {/* <StatusNotice type='construction' language={isSpanish ? 'es' : 'en'} /> */}
//       <div style={{ padding: '20px' }}>
//         <h1>Premios y Reconocimientos</h1>
//         <ul>
//           {achievements.map((achievement, index) => (
//             <li key={index} style={{ marginBottom: '15px' }}>
//               <h2>{achievement.title}</h2>
//               <p>{achievement.description}</p>
//               <small>{achievement.date}</small>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </>
//   );
// };

// export default AchievementsPage;