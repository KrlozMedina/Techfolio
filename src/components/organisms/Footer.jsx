import React from 'react'

import { FaLinkedin, FaGithub, FaYoutube, FaTwitter, FaFacebook, FaInstagram, FaTiktok } from 'react-icons/fa';

import '../../styles/components/organisms/Footer.css'

const Footer = () => {
  return (
    <section className='footer'>
        <a href="https://www.linkedin.com/in/carlos-alidio-medina-l%C3%B3pez-62406991/" className='footer__icon'><FaLinkedin /></a>
        <a href="https://github.com/KrlozMedina" className='footer__icon'><FaGithub /></a>
        <a href="https://www.youtube.com/channel/UCwr2Oy0BSvLWbukMAi_Nk7g" className='footer__icon'><FaYoutube /></a>
        <a href="https://twitter.com/Krloz_Medina" className='footer__icon'><FaTwitter /></a>
        <a href="https://www.facebook.com/k.medina16" className='footer__icon'><FaFacebook /></a>
        <a href="https://www.instagram.com/krloz_medina/" className='footer__icon'><FaInstagram /></a>
        <a href="https://www.tiktok.com/@krlozmedina" className='footer__icon'><FaTiktok /></a>
    </section>
  )
}

export default Footer