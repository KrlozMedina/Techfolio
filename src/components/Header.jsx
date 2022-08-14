import React from "react";
import '@styles/Header.scss'

const Header = () => {
  return (
    <div className="header">
      <nav className="header--nav">
        <ul>
          <li>
            <a href="#home">Home</a>
            <a href="#aboutme">About me</a>
            <a href="#projects">Projects</a>
            <a href="#education">Education</a>
            {/* <a href="">Contact me</a> */}
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
