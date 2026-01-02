'use client'

import React from 'react';
// import { useLanguage } from '@/hooks';
import { servicesData } from '@/mocks/services.mock';
import styles from './page.module.css';
import { useTranslation } from '@/hooks/useTranslation';

const ServicesPage: React.FC = () => {
  // const { isSpanish } = useLanguage();
  // const lang = isSpanish ? 'es' : 'en';
  const { t, language } = useTranslation();

  return (
    <section className={styles.page}>
      <header className={styles.header}>
        <h1>{t.service.title}</h1>
      </header>

      <ul className={styles.servicesList}>
        {servicesData.map(service => (
          <li key={service.id} className={styles.serviceItem}>
            <h2>{service.name[language]}</h2>
            <p>{service.description[language]}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ServicesPage;



// 'use client'

// import React from 'react';
// // import MainLayout from '@/components/layouts/MainLayout/MainLayout';
// // import LanguageContext, { LanguageContextType } from '@/context/LanguageContext';
// // import StatusNotice from '@/components/organisms/Notice/Notice';

// const ServicesPage = () => {
//   // const { isSpanish } = useContext(LanguageContext) as LanguageContextType;

//   // const links = [
//   //   {
//   //     title: {es: "Servicios", en: "Services"},
//   //     path: "/projects/services",
//   //     isActive: true,
//   //   },
//   //   {
//   //     title: {es: "Testimonios", en: "Testimonials"},
//   //     path: "/projects/testimonials",
//   //     isActive: false,
//   //   },
//   //   {
//   //     title: {es: "Casos de éxito", en: "Success Stories"},
//   //     path: "/projects/case-studies",
//   //     isActive: false,
//   //   },
//   // ];

//   const services = [
//     { id: 1, name: 'Desarrollo Web', description: 'Creación de sitios web modernos y responsivos.' },
//     { id: 2, name: 'Aplicaciones Móviles', description: 'Desarrollo de aplicaciones móviles para iOS y Android.' },
//     { id: 3, name: 'Consultoría Técnica', description: 'Asesoramiento en tecnología y mejores prácticas.' },
//     { id: 4, name: 'Diseño UI/UX', description: 'Diseño de interfaces atractivas y fáciles de usar.' },
//   ];

//   return (
//     <>
//       {/* <StatusNotice type='construction' language={isSpanish ? 'es' : 'en'} /> */}
//       <div style={{ padding: '20px' }}>
//         <h1>Servicios Ofrecidos</h1>
//         <ul style={{ listStyle: 'none', padding: 0 }}>
//           {services.map((service) => (
//             <li key={service.id} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '15px', borderRadius: '8px' }}>
//               <h2>{service.name}</h2>
//               <p>{service.description}</p>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </>
//   );
// };

// export default ServicesPage;