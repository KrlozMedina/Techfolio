import React, { ReactNode } from 'react';
import { LanguageToggleButton } from '@/components/molecules/LanguageSelector/LanguageSelector';
import Logo from '@/components/atom/Logo/Logo';
import { MenuAside, MenuPhone } from '@/components/organisms/Menu/Menu';
import style from './MainLayout.module.css';
import Social from '@/components/molecules/SocialLinks/SocialLinks';
import Logout from '@/components/atom/Logout/Logout';
import Link from 'next/link';
import ThemeToggle from '@/components/molecules/ThemeToggle/ThemeToggle';

// Defining the structure of the links that can be passed as props
interface Link {
  href: string;
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
  controlPanel?: ReactNode; // Optional control panel for admin actions
  isAdmin: boolean; // Flag indicating if the user is an admin
  language: 'es' | 'en'; // Language selection for content
}

// MainLayout component
const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  links = [], // Default to an empty array if no links are provided
  controlPanel,
  isAdmin,
  language = 'es',
}) => {

  // Function to render the navigation links dynamically
  const renderLinks = () => {
    return links.map((link, index) => (
      <Link
        key={index}
        href={link.href}
        className={style['template__link']}
        style={link.isActive ? { color: 'var(--color-button-hover)' } : {}}
      >
        {link.title[language]} {/* Display the title in the selected language */}
      </Link>
    ));
  };

  // Function to render the control panel and logout button if the user is an admin
  const renderControlPanel = () => {
    if (isAdmin) {
      return (
        <>
          <span className={style['template__header--controlPanel']}>
            {controlPanel} {/* Render the admin control panel */}
          </span>
          <span className={style['template__header--logout']}>
            <Logout language={language} /> {/* Render the logout button for admins */}
          </span>
        </>
      );
    }
    return null; // Return null if the user is not an admin
  };

  return (
    <div className={style.template}>
      {/* Mobile menu for smaller devices */}
      <MenuPhone links={links} isAdmin={isAdmin} language={language} />

      <div className={style['template-container']}>
        <header className={style['template__header']}>
          {/* Logo section */}
          <Logo isHeader label='Krloz Medina </>' />
          
          <nav className={style['template__nav']}>
            {/* Render the navigation links */}
            {renderLinks()}
          </nav>

          {/* Render the control panel and logout button if the user is an admin */}
          {renderControlPanel()}
        </header>

        <section className={style['template__container']}>
          <main className={style['template__main']}>
            {/* Control panel inside the main content */}
            {controlPanel && (
              <span className={style['template__main--controlPanel']}>
                {controlPanel}
              </span>
            )}
            {children} {/* Render children components here */}
          </main>

          {/* Footer section with social links */}
          <footer>
            <Social />
          </footer>
        </section>
      </div>

      {/* Sidebar with additional elements like the menu, language selector, and theme toggle */}
      <aside className={style['template__aside']}>
        <MenuAside language={language} />
        <LanguageToggleButton />
        <ThemeToggle language={language} />
      </aside>
    </div>
  );
};

export default MainLayout;
