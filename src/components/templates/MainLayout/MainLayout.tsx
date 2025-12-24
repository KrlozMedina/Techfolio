import React, { ReactNode } from 'react';
import style from './MainLayout.module.css';
import Link from 'next/link';
import SettingsButton from '@/components/organisms/SettingPanel/SettingsPanel';
import Headers from '@/components/organisms/Headers/Header';
import { MenuAside, MobileHamburgerMenu } from '@/components/molecules/Navbar';
import Footer from '@/components/molecules/Footer/Footer';

// Defining the structure of the links that can be passed as props
interface Link {
  path: string;
  title: {
    es: string;
    en: string;
  };
  isActive: boolean; // Whether the link is active (used for highlighting)
}

// Props definition for MainLayout component
interface MainLayoutProps {
  children: ReactNode; // The child components to be rendered within the layout
  links?: Link[]; // An optional array of links for navigation
  isAdmin?: boolean; // Flag indicating if the user is an admin
  language: 'es' | 'en'; // Language selection for content
}

// MainLayout component
const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  links = [], // Default to an empty array if no links are provided
  isAdmin = false,
  language,
}) => {
  return (
    <div className={style.template}>
      {/* Mobile menu for smaller devices */}
      <MobileHamburgerMenu links={links} isAdmin={isAdmin} language={language} />

      <div className={style['template-container']}>
        <Headers language={language} links={links} isAdmin={isAdmin} />

        <section className={style['template__container']}>
          <main className={style['template__main']}>
            {children} {/* Render children components here */}
          </main>

          {/* Footer section with social links */}
          
          <Footer lang={language} />
        </section>
      </div>

      {/* Sidebar with additional elements like the menu, language selector, and theme toggle */}
      <aside className={style['template__aside']}>
        <MenuAside language={language} />
        <SettingsButton isFloating />
      </aside>
    </div>
  );
};

export default MainLayout;
