import React, { ReactNode } from 'react';
import Header from '@/components/organisms/Headers/Header';
import { Sidebar } from '@/components/molecules/Navbar';
import styles from './AuthLayout.module.scss';

// Defining the structure of the links that can be passed as props
interface Link {
  path: string;
  title: {
    es: string;
    en: string;
  };
  isActive: boolean; // Whether the link is active (used for highlighting)
}

interface AuthLayoutProps {
  children: ReactNode;
  lang: 'es' | 'en';
  links?: Link[];
}

/**
 * Componente AuthLayout
 *
 * Layout para las páginas que requieren autenticación.
 * Contiene Sidebar lateral, Header con menú y zona principal donde se renderiza el contenido hijo.
 *
 * @param children Contenido de la página que usa este layout
 * @param lang Idioma actual para pasar al Header
 */
const AuthLayout: React.FC<AuthLayoutProps> = ({ children, lang, links = [] }) => {
  return (
    <div className={styles['layoutContainer']}>
      {/* Navegación lateral */}
      <Sidebar lang={lang} />

      <main className={styles['mainContent']}>
        {/* Cabecera con idioma y rol de admin */}
        <Header language={lang} isAdmin links={links} />

        {/* Contenedor del contenido principal */}
        <section className={styles['pageContent']}>{children}</section>
      </main>
    </div>
  );
};

export default AuthLayout;
