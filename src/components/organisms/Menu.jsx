import React, { useContext, useState } from 'react'
import LenguajeContext from '../../context/LenguajeContext'

import { TiInfoLarge } from 'react-icons/ti';
import { IoIosSchool } from 'react-icons/io';
import { SiPolymerproject} from 'react-icons/si';
import { BiMessageDots } from 'react-icons/bi';
import { TfiMenuAlt } from 'react-icons/tfi';
import { AiOutlineClose, AiFillHome } from 'react-icons/ai'
// import { GrHomeRounded } from 'react-icons/gr'

import Lenguaje from '../molecules/Language';

import '../../styles/components/organisms.css'

const Menu = () => {
  const { isSpanish } = useContext(LenguajeContext)

  return (
    <div className='menu__container' >
      <a href="/">
        <AiFillHome className='icon'/>
        {isSpanish ? "Inicio" : "Home"}
      </a>

      <a href="/projects">
        <SiPolymerproject className='icon'/>
        {isSpanish ? "Proyectos" : "Projects"}
      </a>

      <a href='/aboutme'>
        <TiInfoLarge className='icon'/>
        {isSpanish ? "Sobre mi" : "About me"}
      </a>

      <a href='education'>
        <IoIosSchool className='icon'/>
        {isSpanish ? "Educación" : "Education"}
      </a>

      <a href='contactme'>
        <BiMessageDots className='icon'/>
        {isSpanish ? "Contactarme" : "Contact me"}
      </a>
    </div>
  )
}

const MenuPhone = () => {
  const [menu, setMenu] = useState(false);

  return (
    <>
      <TfiMenuAlt className={menu ? 'none' : 'icon-menu'} onClick={() => setMenu(true)} />
      <section className={menu ? 'menu-phone__container' : 'none'}>
        <AiOutlineClose className='icon-menu' onClick={() => setMenu(false)} />
        <Menu />
        <Lenguaje />
      </section>
    </>
  )
}

const MenuAside = () => {
  return (
    <div className='menu-aside__container'>
      <a href='/'>
        <AiFillHome className='icon' />
      </a>

      <a href='/projects'>
        <SiPolymerproject className='icon'/>
      </a>

      <a href='/aboutme'>
        <TiInfoLarge className='icon'/>
      </a>

      <a href='/education'>
        <IoIosSchool className='icon'/>
      </a>

      <a href='/contactme'>
        <BiMessageDots className='icon'/>
      </a>
    </div>
  )
}

export { Menu, MenuPhone, MenuAside }