import React from "react";
import '@styles/Header.scss'

import logo from '@images/Logo.png'

const Header = () => {
  return (
    <div className="header">
      <span className="header--logo">
        <img className="header-logo" src={logo} alt="Logo" />
        <a href="/hola">
        KrlozMedina
        </a> 
      </span>
      <nav className="header--nav">
        <ul>
          <li>
            {/* <a href="./src/cv.html">CV</a> */}
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
