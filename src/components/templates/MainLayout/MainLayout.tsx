import React, { ReactNode } from 'react';
import { Language } from '@/components/molecules/Language';
import Logo from '@/components/atom/Logo/Logo';
import { MenuAside, MenuPhone } from '@/components/organisms/Menu/Menu';
import style from './MainLayout.module.css';
import Social from '../../organisms/Social/Social';
import Logout from '../../atom/Logout/Logout';
import Link from 'next/link';

interface Link {
  href: string;
  title: string;
  isActive: boolean
}

interface MainLayoutProps {
  children: ReactNode;
  links?: Link[];
  controlPanel?: ReactNode;
  isAdmin: boolean;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, links, controlPanel, isAdmin }) => {
  return (
    <div className={style['template']}>
      <MenuPhone links={links} isAdmin={isAdmin} />

      <div className={style['template-container']}>
        <header className={style['template__header']}>
          <Logo isHeader label='Krloz Medina </>' />
          <nav className={style['template__nav']}>
          {
            links?.map((link, index) => (
              <Link
                key={index}
                href={link.href} 
                className={style['template__link']} 
                style={link.isActive ? {color: 'var( --color-button-hover)'} : {}}
              >{link.title}</Link>
            ))
          }
          </nav>
          {
            isAdmin && <span className={style['template__header--controlPanel']}>
            {controlPanel}
          </span>
          }
          {isAdmin && <span className={style['template__header--logout']}>
            <Logout />
          </span>}
        </header>

        <section className={style['template__container']}>
          <main className={style['template__main']}>
            <span className={style['template__main--controlPanel']}>
              {controlPanel}
            </span>
            {children}
          </main>

          <footer>
            <Social />
          </footer>
        </section>
      </div>

      <aside className={style['template__aside']}>
        <MenuAside />
        <Language />
      </aside>
    </div>
  );
};

export default MainLayout;