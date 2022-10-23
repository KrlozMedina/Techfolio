import React, { useContext, useState } from "react";
import '@styles/Header.scss'
import LenguajeContext from "@context/LenguajeContext";

const Header = () => {
  const [menu, setMenu] = useState(false)

  const {spanish, setSpanish} = useContext(LenguajeContext);

  function handlerMenu() {
    // console.log(menu)
    setMenu(!menu)
  }

  const handlerLenguaje = () => {
    setSpanish(!spanish)
    console.log(spanish)
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
            <a href="#home" onClick={() => setMenu(false)}>{spanish ? "Inicio" : "Home"}</a>
            <a href="#aboutme" onClick={() => setMenu(false)}>{spanish ? "Sobre mi" : "About me"}</a>
            <a href="#projects" onClick={() => setMenu(false)}>{spanish ? "Proyectos" : "Projects"}</a>
            <a href="#education" onClick={() => setMenu(false)}>{spanish ? "Educacion" : "Education"}</a>
            <a href="#contactme" onClick={() => setMenu(false)}>{spanish ? "Contactame" : "Contact me"}</a>
          </li>
        </ul>
      </nav>

      <button className="header--buttonLenguaje" onClick={() => handlerLenguaje()}>
        {spanish ? "Ingles" : "Spanish"}
      </button>
    </div>
  );
};

export default Header;
