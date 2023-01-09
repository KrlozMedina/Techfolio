import React, { useContext, useState } from "react";
import LenguajeContext from "../../context/LenguajeContext";

import ButtonLenguaje from "../atoms/ButtonLenguaje";

import '../../styles/components/molecules/Navbar.css'

const Navbar = () => {
  const [menu, setMenu] = useState(false)
  const {isSpanish, setIsSpanish} = useContext(LenguajeContext);

  function handlerMenu() {
    setMenu(!menu)
  }

  return (
    <div className="navbar">
      <span className={menu ? "navbar__icon--lock" : ""} >
        <span className="navbar__icon material-symbols-outlined" onClick={() => handlerMenu()}>Menu</span>
      </span>

      <nav className={menu ? 'navbar__list--mobile' : 'navbar__list--desktop'}>
        <div>
          <ButtonLenguaje />
        </div>
        <div>
          <a href="/#projects" onClick={() => setMenu(false)}>{isSpanish ? "Proyectos" : "Projects"}</a>
          <a href="/#contact" onClick={() => setMenu(false)}>{isSpanish ? "Contacta me" : "Contact me"}</a>
        </div>
        
      </nav>

    </div>
  );
};

export default Navbar;