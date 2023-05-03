import React, { useContext, useState } from "react";
import LenguajeContext from "../../context/LenguajeContext";
import '../../styles/components/organisms/Header.css'

const Header = () => {
  const [menu, setMenu] = useState(false)
  const {isSpanish, setIsSpanish} = useContext(LenguajeContext);
  const handlerLenguaje = () => {
      setIsSpanish(!isSpanish);
      localStorage.setItem('isSpanish', !isSpanish)
  }

  function handlerMenu() {
    setMenu(!menu)
  }

  const downloadCV = () => {
    // using Java Script method to get PDF file
    fetch('CV.pdf').then(response => {
        response.blob().then(blob => {
            // Creating new object of PDF file
            const fileURL = window.URL.createObjectURL(blob);
            // Setting various property values
            let alink = document.createElement('a');
            alink.href = fileURL;
            alink.download = 'CV Carlos Medina.pdf';
            alink.click();
        })
    })
}

  return (
    <section className='header'>
      <div className='header__logo'>
        <a href="/">
          <img src="https://i.imgur.com/BLvkTxB.png" className="header__logo--image" alt="" />
        </a>
        <a href='/' className="header__logo--text">Krloz Medina</a>
      </div>

      <div className="navbar">
        <span className={menu ? "navbar__icon--lock" : ""} >
          <span className="navbar__icon material-symbols-outlined" onClick={() => handlerMenu()}>Menu</span>
        </span>

        <nav className={menu ? 'navbar__list--mobile' : 'navbar__list--desktop'}>
          <div>
            <button className="navbar--buttonLenguaje" onClick={handlerLenguaje}>
                {isSpanish ? "Ingles" : "Spanish"}
            </button>
          </div>
          <div>
            <a href="/" onClick={() => setMenu(false)}>{isSpanish ? "Inicio" : "Home"}</a>
            <a href="/projects" onClick={() => setMenu(false)}>{isSpanish ? "Proyectos" : "Projects"}</a>
            {/* <a href="/certificates" onClick={() => setMenu(false)}>{isSpanish ? 'Certificados' : 'Certificates'}</a> */}
            <a onClick={downloadCV}>CV</a>
          </div>
        </nav>
      </div>
    </section>
  )
}

export default Header