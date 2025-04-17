import React, { useContext, useState } from 'react';
import Link from 'next/link';
import LanguageContext from '@/redux/context/LanguageContext';
import { AiOutlineClose } from 'react-icons/ai';
import { SiPolymerproject } from 'react-icons/si';
import { BiMessageDots } from 'react-icons/bi';
import { TfiMenuAlt } from 'react-icons/tfi';
import { ImBlog, ImProfile } from 'react-icons/im';
import { LanguagePhone } from '@/components/molecules/Language';
import styles from './Menu.module.css'
import Logout from '@/components/atom/Logout/Logout';

interface LanguageContextType {
  isSpanish: boolean;
}

interface Link {
  href: string;
  title: string;
}

interface MenuPhoneProps {
  links?: Link[];
  isAdmin: boolean;
}

const navItems = [
  { href: '/projects', labelEs: 'Proyectos', labelEn: 'Projects', icon: SiPolymerproject, key: 'projects' },
  { href: '/profile', labelEs: 'Perfil', labelEn: 'Profile', icon: ImProfile, key: 'about' },
  { href: '/blog', labelEs: 'Blog', labelEn: 'Blog', icon: ImBlog, key: 'blog' },
  { href: '/contact', labelEs: 'Contactarme', labelEn: 'Contact me', icon: BiMessageDots, key: 'contact' },
];

// Función para descargar el CV
// const downloadCV = () => {
//   fetch('CV.pdf')
//     .then(res => res.blob())
//     .then(blob => {
//       const url = window.URL.createObjectURL(blob);
//       const a = document.createElement('a');
//       a.href = url;
//       a.download = 'Carlos Alidio Medina Lopez.pdf';
//       a.click();
//     });
// };

// Subcomponente para los enlaces del menú
const MenuLinks: React.FC<{ isSpanish: boolean; isPhone?: boolean; links?: Link[] }> = ({ isSpanish, isPhone = false, links }) => {
  const containerClass = isPhone ? styles['menu__container--phone'] : styles['menu__container'];

  return (
    <div className={containerClass}>
      {navItems.map(({ href, labelEs, labelEn, icon: Icon, key }) => (
        <Link href={href} key={key}>
          <Icon className="icon" />
          {isSpanish ? labelEs : labelEn}
        </Link>
      ))}
      <div className={styles['menu__container--links']}>
        {
          links?.map((link, index) => (
            <a key={index} href={link.href}>{link.title}</a>
          ))
        }
      </div>
    </div>
  );
};

const Menu: React.FC = () => {
  const { isSpanish } = useContext(LanguageContext) as LanguageContextType;
  return <MenuLinks isSpanish={isSpanish} />;
};

const MenuPhone: React.FC<MenuPhoneProps> = ({ links, isAdmin }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isSpanish } = useContext(LanguageContext) as LanguageContextType;

  return (
    <>
      {!menuOpen && (
        <TfiMenuAlt className={styles['icon-menu']} onClick={() => setMenuOpen(true)} />
      )}
      {menuOpen && (
        <section className={styles['menu-phone__container']}>
          <AiOutlineClose className={styles['icon-menu']} onClick={() => setMenuOpen(false)} />
          <MenuLinks isSpanish={isSpanish} isPhone links={links} />
          <LanguagePhone />
          {isAdmin && <Logout />}
        </section>
      )}
    </>
  );
};

const MenuAside: React.FC = () => {
  const { isSpanish } = useContext(LanguageContext) as LanguageContextType;
  const [hover, setHover] = useState<string | null>(null);

  return (
    <div className={styles['menu-aside__container']}>
      {navItems.map(({ href, labelEs, labelEn, icon: Icon, key }) => (
        <Link
          href={href}
          key={key}
          onMouseOver={() => setHover(key)}
          onMouseLeave={() => setHover(null)}
        >
          {hover === key ? (
            <p className='text-icon'>{isSpanish ? labelEs : labelEn}</p>
          ) : (
            <Icon className="icon" />
          )}
        </Link>
      ))}
    </div>
  );
};

export { Menu, MenuPhone, MenuAside };
