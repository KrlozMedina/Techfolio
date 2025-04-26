import React from 'react';
import {
  FaLinkedin, FaGithub, FaYoutube,
  FaTwitter, FaFacebook, FaInstagram, FaTiktok
} from 'react-icons/fa';
import style from './SocialLinks.module.css';

// Social media link data
const socialLinks = [
  { icon: <FaLinkedin />, url: 'https://www.linkedin.com/in/carlos-alidio-medina-l%C3%B3pez-62406991/' },
  { icon: <FaGithub />, url: 'https://github.com/KrlozMedina' },
  { icon: <FaYoutube />, url: 'https://www.youtube.com/channel/UCwr2Oy0BSvLWbukMAi_Nk7g' },
  { icon: <FaTwitter />, url: 'https://twitter.com/Krloz_Medina' },
  { icon: <FaFacebook />, url: 'https://www.facebook.com/k.medina16' },
  { icon: <FaInstagram />, url: 'https://www.instagram.com/krloz_medina/' },
  { icon: <FaTiktok />, url: 'https://www.tiktok.com/@krlozmedina' }
];

const Social: React.FC = () => {
  return (
    <section className={style['social']}>
      {socialLinks.map((item, index) => (
        <a
          key={index}
          href={item.url}
          className='icon'
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Link to ${item.url}`}
        >
          {item.icon}
        </a>
      ))}
    </section>
  );
};

export default Social;
