'use client'

import StatusNotice from '@/components/organisms/Notice/Notice';
import MainLayout from '@/components/layouts/MainLayout/MainLayout';
import LanguageContext, { LanguageContextType } from '@/context/LanguageContext';
import React, { useContext } from 'react'

const ProfilePage = () => {
  const { isSpanish } = useContext(LanguageContext) as LanguageContextType;
  const links = [
    { href: '/profile/about-me', title: {es: 'Sobre mí', en: 'About me'}, isActive:false },
    { href: '/profile/education', title: {es: 'Educación', en: 'Education'}, isActive:false },
    { href: '/profile/skills', title: {es: 'Habilidades', en: 'Skills'}, isActive:false },
    { href: '/profile/certifications', title: {es: 'Certificaciones', en: 'Certifications'}, isActive:false },
    { href: '/profile/experience', title: {es: 'Experiencia laboral', en: 'Work experience'}, isActive:false },
    { href: '/profile/achievements', title: {es: 'Logros', en: 'Achievements'}, isActive:false },
  ]

  return (
    <MainLayout links={links} isAdmin={false} language={isSpanish ? 'es' : 'en'} >
      <StatusNotice type="construction" language={isSpanish ? 'es' : 'en'} />
      
      <header>
          <h1>Mi Perfil Profesional y Personal</h1>
      </header>
      <main>
        <p>Bienvenido a mi perfil. Selecciona una sección para obtener más información.</p>
      </main>
    </MainLayout>
  )
}

export default ProfilePage

// 'use client';

// import React from 'react';
// import Link from 'next/link';
// import MainLayout from '@/components/templates/MainLayout';

// const ProfilePage = () => (
//   <MainLayout>
//     <div className="profile-page">
//       <header>
//         <h1>Mi Perfil Profesional y Personal</h1>
//         <nav>
//           <ul>
//             <li><Link href="/profile/about-me">Sobre Mí</Link></li>
//             <li><Link href="/profile/education">Educación</Link></li>
//             <li><Link href="/profile/skills">Habilidades</Link></li>
//             <li><Link href="/profile/certifications">Certificaciones</Link></li>
//             <li><Link href="/profile/experience">Experiencia Laboral</Link></li>
//             <li><Link href="/profile/achievements">Logros</Link></li>
//           </ul>
//         </nav>
//       </header>
//       <main>
//         <p>Bienvenido a mi perfil. Selecciona una sección para obtener más información.</p>
//       </main>
//       <style jsx>{`
//                   .profile-page {
//                       font-family: Arial, sans-serif;
//                       padding: 20px;
//                   }
//                   header {
//                       margin-bottom: 20px;
//                   }
//                   nav ul {
//                       list-style: none;
//                       padding: 0;
//                       display: flex;
//                       gap: 10px;
//                   }
//                   nav ul li {
//                       margin: 0;
//                   }
//                   nav ul li a {
//                       text-decoration: none;
//                       color: #0070f3;
//                   }
//                   nav ul li a:hover {
//                       text-decoration: underline;
//                   }
//               `}</style>
//     </div>
//   </MainLayout>
// );

// export default ProfilePage;