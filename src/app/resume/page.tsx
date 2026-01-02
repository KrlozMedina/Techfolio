'use client'

import React from 'react';
// import LanguageContext from '@/context/LanguageContext';
import { FaFileDownload, FaJs, FaReact, FaNodeJs, FaDatabase, FaMicrochip, FaCogs, FaBriefcase, FaGraduationCap } from 'react-icons/fa';
import styles from './page.module.scss';
import { useTranslation } from '@/hooks/useTranslation';

// interface LanguageContextType {
//   isSpanish: boolean;
// }

const experienceMock = [
  {
    role: 'Full Stack Developer',
    company: 'TechCorp Solutions',
    period: '2023 - Present',
    description: 'Desarrollo de aplicaciones web completas usando React, Node.js y MongoDB.',
    icon: <FaBriefcase />
  },
  {
    role: 'IoT Engineer',
    company: 'GreenEnergy Inc.',
    period: '2022 - 2023',
    description: 'Implementación de plataformas IoT para monitoreo de energía renovable.',
    icon: <FaMicrochip />
  }
];

const educationMock = [
  {
    degree: 'Ingeniería en Control y Automatización',
    institution: 'Universidad Tecnológica',
    period: '2017 - 2022',
    icon: <FaGraduationCap />
  },
  {
    degree: 'Curso de Desarrollo Web Full Stack',
    institution: 'Platzi',
    period: '2021',
    icon: <FaGraduationCap />
  }
];

const skillsMock = [
  { name: 'JavaScript / TypeScript', icon: <FaJs size={24} color="#f7df1e"/> },
  { name: 'React / Next.js', icon: <FaReact size={24} color="#61dafb"/> },
  { name: 'Node.js / Express', icon: <FaNodeJs size={24} color="#339933"/> },
  { name: 'MongoDB / SQL Server', icon: <FaDatabase size={24} color="#4DB33D"/> },
  { name: 'IoT & ESP8266', icon: <FaMicrochip size={24} color="#555"/> },
  { name: 'Automatización y Control', icon: <FaCogs size={24} color="#777"/> }
];

const ResumePage: React.FC = () => {
  const { t } = useTranslation();
  // const { isSpanish } = useContext(LanguageContext) as LanguageContextType;

  const downloadCV = () => {
    fetch('CV.pdf')
      .then(res => res.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Carlos Alidio Medina Lopez.pdf';
        a.click();
      })
      .catch(err => console.error("Error downloading CV:", err));
  };

  return (
    <section className={styles.container}>
      <p className={styles.phrase}>
        {t.phrases.resume}
        {/* {isSpanish
          ? 'El éxito no es la clave de la felicidad. La felicidad es la clave del éxito.'
          : 'Success is not the key to happiness. Happiness is the key to success.'} */}
      </p>
      <p className={styles.author}>Albert Schweitzer</p>

      <h2 className={styles.title}>
        {t.resume.title}
        {/* {isSpanish ? "Curriculum Vitae" : "Resume"} */}
        <button onClick={downloadCV} style={{ marginLeft: '1rem' }}>
          <FaFileDownload /> {t.resume.download}
        </button>
      </h2>

      {/* Experiencia */}
    {experienceMock.map((exp, idx) => (
      <div key={idx} className={`${styles.card} ${styles.experience}`}>
        <div className={styles.cardIcon}>{exp.icon}</div>
        <div>
          <h4>{exp.role} - {exp.company}</h4>
          <span>{exp.period}</span>
          <p>{exp.description}</p>
        </div>
      </div>
    ))}

    {/* Educación */}
    {educationMock.map((edu, idx) => (
      <div key={idx} className={`${styles.card} ${styles.education}`}>
        <div className={styles.cardIcon}>{edu.icon}</div>
        <div>
          <h4>{edu.degree}</h4>
          <span>{edu.institution} | {edu.period}</span>
        </div>
      </div>
    ))}

    {/* Habilidades */}
    {skillsMock.map((skill, idx) => (
      <div key={idx} className={styles.skillCard}>
        {skill.icon}
        <span className={styles.skillName}>{skill.name}</span>
      </div>
    ))}

    </section>
  );
};

export default ResumePage;


// 'use client'

// import React, { useContext } from 'react';
// // import MainLayout from '@/components/layouts/MainLayout/MainLayout';
// // import { Viewer, Worker } from '@react-pdf-viewer/core';
// // import '@react-pdf-viewer/core/lib/styles/index.css';
// import '@/styles/pages/CV.css';
// import LanguageContext from '@/context/LanguageContext';
// import { FaFileDownload } from 'react-icons/fa';

// // Define the context type if not already defined
// interface LanguageContextType {
//   isSpanish: boolean;
// }

// const CV = () => {
//   const { isSpanish } = useContext(LanguageContext) as LanguageContextType;

//   const downloadCV = () => {
//     // Using JavaScript method to get PDF file
//     fetch('CV.pdf')
//       .then((response) => {
//         response.blob().then((blob) => {
//           // Creating new object of PDF file
//           const fileURL = window.URL.createObjectURL(blob);
//           // Setting various property values
//           const alink = document.createElement('a');
//           alink.href = fileURL;
//           alink.download = 'Carlos Alidio Medina Lopez.pdf';
//           alink.click();
//         });
//       })
//       .catch((error) => console.error('Error downloading the file', error));
//   };

//   // Función para descargar el CV
// // const downloadCV = () => {
// //   fetch('CV.pdf')
// //     .then(res => res.blob())
// //     .then(blob => {
// //       const url = window.URL.createObjectURL(blob);
// //       const a = document.createElement('a');
// //       a.href = url;
// //       a.download = 'Carlos Alidio Medina Lopez.pdf';
// //       a.click();
// //     });
// // };

//   return (
//     <>
//       <p className='phrase'>
//         {isSpanish
//           ? 'El éxito no es la clave de la felicidad. La felicidad es la clave del éxito.'
//           : 'Success is not the key to happiness. Happiness is the key to success.'}
//       </p>

//       <p className='author'>Albert Schweitzer</p>

//       <h2 className='title'>
//         Curriculum Vitae{' '}
//         <button onClick={downloadCV}>
//           <FaFileDownload />
//         </button>
//       </h2>

//       {/* <div className='pdf-container'>
//         <Worker workerUrl='https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js'>
//           <Viewer theme='dark' fileUrl='CV.pdf' />
//         </Worker>
//       </div> */}
//     </>
//   );
// };

// export default CV;
