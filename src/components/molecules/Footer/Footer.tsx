import React from 'react';
import styles from './Footer.module.scss';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

interface FooterProps {
  lang: 'es' | 'en';
}

/**
 * Text content for the footer component, localized in Spanish and English.
 */
const texts = {
  project: {
    title: 'Techfolio - KrlozMedina',
    slogan: {
      es: 'Transformamos ideas en sistemas reales mediante ingeniería, diseño, desarrollo ágil y tecnología moderna escalable.',
      en: 'We transform ideas into real systems through engineering, design, agile development, and modern scalable technology.',
    },
  },
  contact: {
    title: {
      es: 'Contacto',
      en: 'Contact',
    },
  },
  links: {
    title: {
      es: 'Enlaces útiles',
      en: 'Useful links',
    },
    items: [
      { href: 'https://github.com/KrlozMedina/Techfolio/wiki', label: { es: 'Documentación', en: 'Documentation' } },
      { href: 'https://github.com/KrlozMedina/Techfolio/blob/main/LICENSE.md', label: { es: 'Licencia CC BY-NC 4.0', en: 'License CC BY-NC 4.0' } },
      { href: '/api', label: { es: 'API V2', en: 'API V2' } },
    ],
  },
};

/**
 * Footer component displays project info, contact, useful links,
 * and social media icons with localized texts.
 */
const Footer: React.FC<FooterProps> = ({ lang }) => {
  return (
    <footer className={styles['footer']}>
      {/* Top section with project info, contact, and useful links */}
      <div className={styles['footer__top']}>
        {/* Project Info */}
        <div className={styles['footer__top-column']}>
          <h4>{texts.project.title}</h4>
          <p>{texts.project.slogan[lang]}</p>
        </div>

        {/* Contact Info */}
        <div className={styles['footer__top-column']}>
          <h4>{texts.contact.title[lang]}</h4>
          <p>Email: <a href="mailto:kamedinal16@outlook.com">kamedinal16@outlook.com</a></p>
          <p>
            WhatsApp: <a href="https://wa.me/573504312615" target="_blank" rel="noopener noreferrer" >+57 350 431 2615</a>
          </p>
        </div>

        {/* Useful Links */}
        <div className={styles['footer__top-column']}>
          <h4>{texts.links.title[lang]}</h4>
          <ul>
            {texts.links.items.map(({ href, label }) => (
              <li key={href}>
                <a href={href} target="_blank" rel="noopener noreferrer">
                  {label[lang]}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom section with social media icons and copyright */}
      <div className={styles['footer__bottom']}>
        <div className={styles['footer__bottom-social']}>
          <a href="https://github.com/KrlozMedina" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <FaGithub />
          </a>
          <a href="https://linkedin.com/in/krlozmedina" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <FaLinkedin />
          </a>
          <a href="mailto:kamedinal16@outlook.com" aria-label="Email">
            <FaEnvelope />
          </a>
        </div>

        <p>© 2025 Techfolio KrlozMedina — Todos los derechos reservados.</p>
        <p>Versión 2.1.0</p>
      </div>
    </footer>
  );
};

export default Footer;
