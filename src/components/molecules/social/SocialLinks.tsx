import {
  FaLinkedin, FaGithub, FaYoutube,
  FaTwitter, FaFacebook, FaInstagram, FaTiktok
} from 'react-icons/fa';
import style from './SocialLinks.module.scss';

const socialLinks = [
  { icon: <FaLinkedin />, url: 'https://www.linkedin.com/in/carlos-alidio-medina-l%C3%B3pez-62406991/', label: 'LinkedIn' },
  { icon: <FaGithub />, url: 'https://github.com/KrlozMedina', label: 'GitHub' },
  { icon: <FaYoutube />, url: 'https://www.youtube.com/channel/UCwr2Oy0BSvLWbukMAi_Nk7g', label: 'YouTube' },
  // { icon: <FaTwitter />, url: 'https://twitter.com/Krloz_Medina', label: 'Twitter' },
  // { icon: <FaFacebook />, url: 'https://www.facebook.com/k.medina16', label: 'Facebook' },
  // { icon: <FaInstagram />, url: 'https://www.instagram.com/krloz_medina/', label: 'Instagram' },
  // { icon: <FaTiktok />, url: 'https://www.tiktok.com/@krlozmedina', label: 'TikTok' }
];

export default function Social() {
  return (
    <section className={style.social}>
      {socialLinks.map(({ icon, url, label }) => (
        <a
          key={label}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className='icon'
        >
          {icon}
        </a>
      ))}
    </section>
  );
}
