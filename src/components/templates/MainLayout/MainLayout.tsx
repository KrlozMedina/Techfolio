import React, { ReactNode } from 'react';
import { LanguageToggleButton } from '@/components/molecules/LanguageSelector/LanguageSelector';
import Logo from '@/components/atom/Logo/Logo';
import { MenuAside, MenuPhone } from '@/components/organisms/Menu/Menu';
import style from './MainLayout.module.css';
import Social from '@/components/molecules/SocialLinks/SocialLinks';
import Logout from '@/components/atom/Logout/Logout';
import Link from 'next/link';
import ThemeToggle from '@/components/molecules/ThemeToggle/ThemeToggle';

interface Link {
  href: string;
  title: string;
  isActive: boolean;
}

interface MainLayoutProps {
  children: ReactNode;  // The children components that will be rendered in the layout.
  links?: Link[];  // An optional array of links for navigation.
  controlPanel?: ReactNode;  // An optional control panel for admin actions.
  isAdmin: boolean;  // Flag to determine if the current user is an admin.
  language: 'es' | 'en'
}

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  links = [],
  controlPanel,
  isAdmin,
  language = 'es'
}) => {

  // Renders the navigation links dynamically based on the provided links array.
  const renderLinks = () => (
    links.map((link, index) => (
      <Link
        key={index}
        href={link.href}
        className={style['template__link']}
        style={link.isActive ? { color: 'var(--color-button-hover)' } : {}}
      >
        {link.title}
      </Link>
    ))
  );

  // Renders the control panel and logout button if the user is an admin.
  const renderControlPanel = () => isAdmin && (
    <>
      <span className={style['template__header--controlPanel']}>
        {controlPanel}
      </span>
      <span className={style['template__header--logout']}>
        <Logout language={language} />
      </span>
    </>
  );

  return (
    <div className={style.template}>
      {/* Mobile menu rendering */}
      <MenuPhone links={links} isAdmin={isAdmin} language={language} />

      <div className={style['template-container']}>
        <header className={style['template__header']}>
          {/* Logo in the header */}
          <Logo isHeader label='Krloz Medina </>' />
          
          <nav className={style['template__nav']}>
            {/* Render navigation links */}
            {renderLinks()}
          </nav>

          {/* Render the control panel if the user is an admin */}
          {renderControlPanel()}
        </header>

        <section className={style['template__container']}>
          <main className={style['template__main']}>
            {/* Display the control panel within the main content */}
            <span className={style['template__main--controlPanel']}>
              {controlPanel}
            </span>
            {children}  {/* Render child components here */}
          </main>

          {/* Footer section */}
          <footer>
            <Social />
          </footer>
        </section>
      </div>

      <aside className={style['template__aside']}>
        {/* Aside section with menu, language, and theme toggle */}
        <MenuAside language={language} />
        <LanguageToggleButton />
        <ThemeToggle language={language} />
      </aside>
    </div>
  );
};

export default MainLayout;
