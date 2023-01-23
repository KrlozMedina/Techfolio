import React from 'react'

import Navbar from '../molecules/Navbar'
import ButtonLenguaje from "../atoms/ButtonLenguaje";

import logo from '../../assets/Logo.png'

import '../../styles/components/organisms/Header.css'

const Header = () => {
  return (
    <section className='header'>
      <div href='/' className='header__logo'>
        <a href="/">
          <img src={logo} className="header__logo--image" alt="" />
        </a>
        <a href='/' className="header__logo--text">Krloz Medina</a>
      </div>

      {/* <section className='config'>
      <ButtonLenguaje />
      </section> */}
      
      <Navbar />
    </section>
  )
}

export default Header
