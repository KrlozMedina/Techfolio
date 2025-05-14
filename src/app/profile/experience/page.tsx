'use client'

import React from 'react';
// import LanguageContext, { LanguageContextType } from '@/context/LanguageContext';
// import MainLayout from '@/components/layouts/MainLayout/MainLayout';
// import StatusNotice from '@/components/organisms/Notice/Notice';

const ExperiencePage = () => {
  // const { isSpanish } = useContext(LanguageContext) as LanguageContextType;

  // const links = [
  //   { href: '/profile/about-me', title: {es: 'Sobre mí', en: 'About me'}, isActive:false },
  //   { href: '/profile/education', title: {es: 'Educación', en: 'Education'}, isActive:false },
  //   { href: '/profile/skills', title: {es: 'Habilidades', en: 'Skills'}, isActive:false },
  //   { href: '/profile/certifications', title: {es: 'Certificaciones', en: 'Certifications'}, isActive:false },
  //   { href: '/profile/experience', title: {es: 'Experiencia laboral', en: 'Work experience'}, isActive:true },
  //   { href: '/profile/achievements', title: {es: 'Logros', en: 'Achievements'}, isActive:false },
  // ]

  const experiences = [
    {
      company: 'Tech Solutions Inc.',
      role: 'Frontend Developer',
      duration: 'Jan 2020 - Present',
      description: 'Developed and maintained user interfaces using React and TypeScript. Collaborated with designers and backend developers to deliver high-quality web applications.',
    },
    {
      company: 'Web Innovators',
      role: 'Junior Developer',
      duration: 'Jun 2018 - Dec 2019',
      description: 'Assisted in building responsive websites and web applications. Gained experience in JavaScript, HTML, and CSS.',
    },
  ];

  return (
    <>
      {/* <StatusNotice type='construction' language={isSpanish ? 'es' : 'en'} /> */}
      <div style={{ padding: '20px' }}>
        <h1>Experiencia Profesional</h1>
        {experiences.map((exp, index) => (
          <div key={index} style={{ marginBottom: '20px' }}>
            <h2>{exp.role} - {exp.company}</h2>
            <p><strong>Duración:</strong> {exp.duration}</p>
            <p>{exp.description}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default ExperiencePage;