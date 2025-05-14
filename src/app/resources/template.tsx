'use client';

import React, { ReactNode } from 'react';
import { usePathname } from 'next/navigation';

import MainLayout from '@/components/layouts/MainLayout/MainLayout';
import StatusNotice from '@/components/organisms/Notice/Notice';

import { useLanguage } from '@/hooks';
import { NoticeType, ROUTES_LIST } from '@/lib/config';

/**
 * Representa un texto multilingüe.
 */
// type LocaleText = {
//   es: string;
//   en: string;
// };

/**
 * Estructura de un enlace de navegación multilingüe.
 */
// type NavLink = {
//   title: LocaleText;
//   path: string;
//   // isActive: boolean;
// };

/**
 * Crea un enlace de navegación multilingüe.
 * @param es - Título en español
 * @param en - Título en inglés
 * @param href - Ruta del enlace
 * @returns Objeto tipo NavLink
 */
// const createNavLink = (es: string, en: string, path: string): NavLink => ({
//   title: { es, en },
//   path,
//   // isActive: false,
// });

/**
 * Enlaces de navegación para la sección de proyectos.
 */
// const NAV_LINKS_PROJECT: NavLink[] = [
//   createNavLink("Sobre mí", "About me", "/profile/about-me"),
//   createNavLink("Educación", "Education", "/profile/education"),
//   createNavLink("Habilidades", "Skills", "/profile/skills"),
//   createNavLink("Certificaciones", "Certifications", "/profile/certifications"),
//   createNavLink("Experiencia laboral", "Work experience", "/profile/experience"),
//   createNavLink("Logros", "Achievements", "/profile/achievements"),
// ];

/**
 * Plantilla de layout para páginas de proyectos.
 * Determina el idioma, navegación activa, estado de admin y avisos.
 *
 * @param children - Contenido hijo renderizado dentro del layout
 */
export default function Template({ children }: { children: ReactNode }) {
  const { isSpanish } = useLanguage();
  const path = usePathname();
  const language = isSpanish ? 'es' : 'en';

  // Ruta actual encontrada en la configuración global
  const currentRoute = ROUTES_LIST.find(route => route.path === path);

  // Mapear enlaces con estado activo basado en la ruta actual
  // const linksWithActive = NAV_LINKS_PROJECT.map(link => ({
  //   ...link,
  //   isActive: link.path === path,
  // }));

  return (
    <MainLayout
      language={language}
      // links={linksWithActive}
      isAdmin={currentRoute?.isProtected ?? false}
    >
      {currentRoute?.notice?.map((notice, index) => (
        <StatusNotice
          key={index}
          type={notice as NoticeType}
          language={language}
        />
      ))}

      {children}
    </MainLayout>
  );
}
