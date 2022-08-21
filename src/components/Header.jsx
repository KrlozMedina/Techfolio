import React, { useState } from "react";
import '@styles/Header.scss'

const Header = () => {
  const [menu, setMenu] = useState(false)

  function handlerMenu() {
    // console.log(menu)
    setMenu(!menu)
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
            <a href="#home" onClick={() => setMenu(false)}>Inicio</a>
            <a href="#aboutme" onClick={() => setMenu(false)}>Sobre mi</a>
            <a href="#projects" onClick={() => setMenu(false)}>Proyectos</a>
            <a href="#education" onClick={() => setMenu(false)}>Educacion</a>
            <a href="#contactme" onClick={() => setMenu(false)}>Contactarme</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
