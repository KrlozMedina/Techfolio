'use client'

import React, { useContext } from 'react';
import LanguageContext, { LanguageContextType } from '@/context/LanguageContext';
import MainLayout from '@/components/layouts/MainLayout/MainLayout';
import StatusNotice from '@/components/organisms/Notice/Notice';

const AchievementsPage = () => {
  const { isSpanish } = useContext(LanguageContext) as LanguageContextType;

  const links = [
    { href: '/profile/about-me', title: {es: 'Sobre mí', en: 'About me'}, isActive:false },
    { href: '/profile/education', title: {es: 'Educación', en: 'Education'}, isActive:false },
    { href: '/profile/skills', title: {es: 'Habilidades', en: 'Skills'}, isActive:false },
    { href: '/profile/certifications', title: {es: 'Certificaciones', en: 'Certifications'}, isActive:false },
    { href: '/profile/experience', title: {es: 'Experiencia laboral', en: 'Work experience'}, isActive:false },
    { href: '/profile/achievements', title: {es: 'Logros', en: 'Achievements'}, isActive:true },
  ]

  const achievements = [
    {
      title: 'Premio al Mejor Desarrollador',
      description: 'Reconocimiento otorgado por la comunidad de desarrolladores en 2022.',
      date: '2022',
    },
    {
      title: 'Contribución Destacada en Open Source',
      description: 'Aportaciones significativas a proyectos de código abierto.',
      date: '2021',
    },
    {
      title: 'Reconocimiento por Innovación Tecnológica',
      description: 'Premio recibido por desarrollar soluciones innovadoras en el sector.',
      date: '2020',
    },
  ];

  return (
    <MainLayout isAdmin={false} links={links} language={isSpanish ? 'es' : 'en'}>
      <StatusNotice type='construction' language={isSpanish ? 'es' : 'en'} />
      <div style={{ padding: '20px' }}>
        <h1>Premios y Reconocimientos</h1>
        <ul>
          {achievements.map((achievement, index) => (
            <li key={index} style={{ marginBottom: '15px' }}>
              <h2>{achievement.title}</h2>
              <p>{achievement.description}</p>
              <small>{achievement.date}</small>
            </li>
          ))}
        </ul>
      </div>
    </MainLayout>
  );
};

export default AchievementsPage;