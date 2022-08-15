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
      <span onClick={() => handlerMenu()}>🌖</span>

      <nav className={menu ? 'header--nav' : 'header--nav-none'}>
        <ul>
          <li>
            <a href="#home" onClick={() => setMenu(false)}>Home</a>
            <a href="#aboutme" onClick={() => setMenu(false)}>About me</a>
            <a href="#projects" onClick={() => setMenu(false)}>Projects</a>
            <a href="#education" onClick={() => setMenu(false)}>Education</a>
            {/* <a href="">Contact me</a> */}
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
