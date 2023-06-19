import React from 'react'

import { FaLinkedin, FaGithub, FaYoutube, FaTwitter, FaFacebook, FaInstagram, FaTiktok } from 'react-icons/fa';

import '../../styles/components/organisms.css'

const Social = () => {
  return (
    <div className='social'>
        <a href="https://www.linkedin.com/in/carlos-alidio-medina-l%C3%B3pez-62406991/" className='icon'><FaLinkedin /></a>
        <a href="https://github.com/KrlozMedina" className='icon'><FaGithub /></a>
        <a href="https://www.youtube.com/channel/UCwr2Oy0BSvLWbukMAi_Nk7g" className='icon'><FaYoutube /></a>
        <a href="https://twitter.com/Krloz_Medina" className='icon'><FaTwitter /></a>
        <a href="https://www.facebook.com/k.medina16" className='icon'><FaFacebook /></a>
        <a href="https://www.instagram.com/krloz_medina/" className='icon'><FaInstagram /></a>
        <a href="https://www.tiktok.com/@krlozmedina" className='icon'><FaTiktok /></a>
    </div>
  )
}

export default Social