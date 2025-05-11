'use client'

import React, { useContext } from 'react';
import LanguageContext, { LanguageContextType } from '@/context/LanguageContext';
import MainLayout from '@/components/templates/MainLayout/MainLayout';
import StatusNotice from '@/components/organisms/Notice/Notice';

const SkillsPage = () => {
  const { isSpanish } = useContext(LanguageContext) as LanguageContextType;

  const links = [
    { href: '/profile/about-me', title: {es: 'Sobre mí', en: 'About me'}, isActive:false },
    { href: '/profile/education', title: {es: 'Educación', en: 'Education'}, isActive:false },
    { href: '/profile/skills', title: {es: 'Habilidades', en: 'Skills'}, isActive:true },
    { href: '/profile/certifications', title: {es: 'Certificaciones', en: 'Certifications'}, isActive:false },
    { href: '/profile/experience', title: {es: 'Experiencia laboral', en: 'Work experience'}, isActive:false },
    { href: '/profile/achievements', title: {es: 'Logros', en: 'Achievements'}, isActive:false },
  ]

  return (
    <MainLayout isAdmin={false} links={links} language={isSpanish ? 'es' : 'en'} >
      <StatusNotice type='construction' language={isSpanish ? 'es' : 'en'} />
      <div className="skills-page">
        <h1>Mis Habilidades</h1>

        <section>
          <h2>Lenguajes de Programación</h2>
          <ul>
            <li>JavaScript</li>
            <li>TypeScript</li>
            <li>Python</li>
            <li>Java</li>
          </ul>
        </section>

        <section>
          <h2>Tecnologías</h2>
          <ul>
            <li>React</li>
            <li>Node.js</li>
            <li>Express</li>
            <li>MongoDB</li>
            <li>Docker</li>
          </ul>
        </section>

        <section>
          <h2>Habilidades Blandas</h2>
          <ul>
            <li>Comunicación efectiva</li>
            <li>Trabajo en equipo</li>
            <li>Resolución de problemas</li>
            <li>Adaptabilidad</li>
          </ul>
        </section>
      </div>
    </MainLayout>
  );
};

export default SkillsPage;