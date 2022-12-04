import React, { useContext, useState } from "react";
import '@styles/Header.scss'
import LenguajeContext from "@context/LenguajeContext";

const Header = () => {
  const [menu, setMenu] = useState(false)

  const {isSpanish, setIsSpanish} = useContext(LenguajeContext);

  function handlerMenu() {
    setMenu(!menu)
  }

  const handlerLenguaje = () => {
    setIsSpanish(!isSpanish)
    console.log(isSpanish)
  }

  return (
    <div className="header">
      <span onClick={() => handlerMenu()}>
        <span className="material-symbols-outlined">
          menu
        </span>
      </span>

      <nav className={menu ? 'header--nav' : 'header--nav-none'}>
        <ul>
          <li>
            <a href="#home" onClick={() => setMenu(false)}>{isSpanish ? "Inicio" : "Home"}</a>
            <a href="#about" onClick={() => setMenu(false)}>{isSpanish ? "Sobre mi" : "About me"}</a>
            <a href="#projects" onClick={() => setMenu(false)}>{isSpanish ? "Proyectos" : "Projects"}</a>
            <a href="#education" onClick={() => setMenu(false)}>{isSpanish ? "Educación" : "Education"}</a>
            <a href="#contact" onClick={() => setMenu(false)}>{isSpanish ? "Contacta me" : "Contact me"}</a>
          </li>
        </ul>
      </nav>

      <button className="header--buttonLenguaje" onClick={() => handlerLenguaje()}>
        {isSpanish ? "Ingles" : "Spanish"}
      </button>
    </div>
  );
};

export default Header;
