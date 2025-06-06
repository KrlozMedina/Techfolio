'use client'

import React, { useContext } from 'react';
import LanguageContext, { LanguageContextType } from '@/context/LanguageContext';
import MainLayout from '@/components/templates/MainLayout/MainLayout';
import StatusNotice from '@/components/organisms/Notice/Notice';

const certifications = [
  {
    title: 'Certified Kubernetes Administrator (CKA)',
    issuer: 'The Linux Foundation',
    date: 'June 2023',
  },
  {
    title: 'AWS Certified Solutions Architect – Associate',
    issuer: 'Amazon Web Services',
    date: 'March 2023',
  },
  {
    title: 'Microsoft Certified: Azure Developer Associate',
    issuer: 'Microsoft',
    date: 'January 2023',
  },
];

const CertificationsPage: React.FC = () => {
  const { isSpanish } = useContext(LanguageContext) as LanguageContextType;

  const links = [
    { href: '/profile/about-me', title: {es: 'Sobre mí', en: 'About me'}, isActive:false },
    { href: '/profile/education', title: {es: 'Educación', en: 'Education'}, isActive:false },
    { href: '/profile/skills', title: {es: 'Habilidades', en: 'Skills'}, isActive:false },
    { href: '/profile/certifications', title: {es: 'Certificaciones', en: 'Certifications'}, isActive:true },
    { href: '/profile/experience', title: {es: 'Experiencia laboral', en: 'Work experience'}, isActive:false },
    { href: '/profile/achievements', title: {es: 'Logros', en: 'Achievements'}, isActive:false },
  ]

  return (
    <MainLayout isAdmin={false} links={links} language={isSpanish ? 'es' : 'en'}>
      <StatusNotice type='construction' language={isSpanish ? 'es' : 'en'} />
      <div style={{ padding: '20px' }}>
        <h1>Certificaciones Profesionales y Técnicas</h1>
        <ul>
          {certifications.map((cert, index) => (
            <li key={index} style={{ marginBottom: '15px' }}>
              <h2>{cert.title}</h2>
              <p><strong>Emitido por:</strong> {cert.issuer}</p>
              <p><strong>Fecha:</strong> {cert.date}</p>
            </li>
          ))}
        </ul>
      </div>
    </MainLayout>
  );
};

export default CertificationsPage;