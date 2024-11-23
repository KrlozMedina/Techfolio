import React, { useContext, useState } from 'react'
import LenguajeContext from '@/context/LanguageContext'
import { TiInfoLarge } from 'react-icons/ti';
import { IoIosSchool } from 'react-icons/io';
import { SiPolymerproject } from 'react-icons/si';
import { BiMessageDots } from 'react-icons/bi';
import { TfiMenuAlt } from 'react-icons/tfi';
import { AiOutlineClose, AiFillHome } from 'react-icons/ai'
import { MdDocumentScanner } from 'react-icons/md'
import { LanguagePhone } from '@/components/molecules/Language';
import '@/styles/components/organisms.css';

// Tipo para el contexto
interface LanguageContextType {
  isSpanish: boolean;
}

let menu: boolean, setMenu: any

// Función para descargar el CV
const downloadCV = (): void => {
  fetch('CV.pdf').then((response) => {
    response.blob().then((blob) => {
      const fileURL = window.URL.createObjectURL(blob);
      const alink = document.createElement('a');
      alink.href = fileURL;
      alink.download = 'Carlos Alidio Medina Lopez.pdf';
      alink.click();
    });
  });
};

// Componente Menu
const Menu: React.FC = () => {
  const context = useContext(LenguajeContext);

  if (!context) {
    throw new Error('LanguageContext debe ser usado dentro de un LanguageContextProvider');
  }

  const { isSpanish } = context as LanguageContextType;

  return (
    <div className={menu ? 'menu__container--phone' : 'menu__container'}>
      <a href="/">
        <AiFillHome className="icon" />
        {isSpanish ? 'Inicio' : 'Home'}
      </a>

      <a href="/projects">
        <SiPolymerproject className="icon" />
        {isSpanish ? 'Proyectos' : 'Projects'}
      </a>

      <a href="/aboutme">
        <TiInfoLarge className="icon" />
        {isSpanish ? 'Sobre mi' : 'About me'}
      </a>

      <a href="/education">
        <IoIosSchool className="icon" />
        {isSpanish ? 'Educación' : 'Education'}
      </a>

      <a href="/contactme">
        <BiMessageDots className="icon" />
        {isSpanish ? 'Contactarme' : 'Contact me'}
      </a>

      <a href="cv">
        <MdDocumentScanner className="icon" />
        CV
      </a>
    </div>
  );
};

// Componente MenuPhone
const MenuPhone: React.FC = () => {
  [menu, setMenu] = useState<boolean>(false);

  return (
    <>
      <TfiMenuAlt
        className={menu ? 'none' : 'icon-menu'}
        onClick={() => setMenu(true)}
      />
      <section className={menu ? 'menu-phone__container' : 'none'}>
        <AiOutlineClose
          className="icon-menu"
          onClick={() => setMenu(false)}
        />
        <Menu />
        <LanguagePhone />
      </section>
    </>
  );
};

// Componente MenuAside
const MenuAside: React.FC = () => {
  const [hoverState, setHoverState] = useState<Record<string, boolean>>({
    home: false,
    projects: false,
    about: false,
    education: false,
    contact: false,
    cv: false,
  });

  const handleMouseOver = (key: string) => {
    setHoverState((prev) => ({ ...prev, [key]: true }));
  };

  const handleMouseLeave = (key: string) => {
    setHoverState((prev) => ({ ...prev, [key]: false }));
  };

  const context = useContext(LenguajeContext);

  if (!context) {
    throw new Error('LanguageContext debe ser usado dentro de un LanguageContextProvider');
  }

  const { isSpanish } = context as LanguageContextType;

  return (
    <div className="menu-aside__container">
      <a
        href="/"
        onMouseOver={() => handleMouseOver('home')}
        onMouseLeave={() => handleMouseLeave('home')}
      >
        {hoverState.home ? <p className="text-icon">{isSpanish ? "Inicio" : "Home"}</p> : <AiFillHome className="icon" />}
      </a>

      <a
        href="/projects"
        onMouseOver={() => handleMouseOver('projects')}
        onMouseLeave={() => handleMouseLeave('projects')}
      >
        {hoverState.projects ? <p className="text-icon">{isSpanish ? "Proyectos" : "Projects"}</p> : <SiPolymerproject className="icon" />}
      </a>

      <a
        href="/aboutme"
        onMouseOver={() => handleMouseOver('about')}
        onMouseLeave={() => handleMouseLeave('about')}
      >
        {hoverState.about ? <p className="text-icon">{isSpanish ? "Sobre mi" : "About me"}</p> : <TiInfoLarge className="icon" />}
      </a>

      <a
        href="/education"
        onMouseOver={() => handleMouseOver('education')}
        onMouseLeave={() => handleMouseLeave('education')}
      >
        {hoverState.education ? <p className="text-icon">{isSpanish ? "Educación" : "Education"}</p> : <IoIosSchool className="icon" />}
      </a>

      <a
        href="/contactme"
        onMouseOver={() => handleMouseOver('contact')}
        onMouseLeave={() => handleMouseLeave('contact')}
      >
        {hoverState.contact ? <p className="text-icon">{isSpanish ? "Contacto" : "Contact"}</p> : <BiMessageDots className="icon" />}
      </a>

      <a
        href="cv"
        onMouseOver={() => handleMouseOver('cv')}
        onMouseLeave={() => handleMouseLeave('cv')}
      >
        {hoverState.cv ? <p className="text-icon">CV</p> : <MdDocumentScanner className="icon" />}
      </a>
    </div>
  );
};

export { Menu, MenuPhone, MenuAside }