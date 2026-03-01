import {
  FaLinkedin,
  FaGithub,
  FaYoutube
} from 'react-icons/fa';

import styles from './SocialLinks.module.scss';
import { Icon } from '@/components/atom/Icon/Icon';

/**
 * ==================================================
 * 🌐 SocialLinks Component
 * --------------------------------------------------
 * Renderiza enlaces externos a redes sociales.
 *
 * Responsabilidades:
 * - Mapear configuración declarativa de enlaces
 * - Usar componente Icon como abstracción visual
 * - Garantizar apertura en nueva pestaña segura
 * - Proveer accesibilidad básica
 *
 * Accesibilidad:
 * - aria-label describe destino del enlace
 * - <nav> semántico con aria-label descriptivo
 *
 * Seguridad:
 * - rel="noopener noreferrer" evita vulnerabilidades
 *   al usar target="_blank"
 * ==================================================
 */

const socialLinks = [
  {
    icon: FaLinkedin,
    url: 'https://www.linkedin.com/in/...',
    label: 'LinkedIn'
  },
  {
    icon: FaGithub,
    url: 'https://github.com/...',
    label: 'GitHub'
  },
  {
    icon: FaYoutube,
    url: 'https://www.youtube.com/...',
    label: 'YouTube'
  }
];

export default function SocialLinks() {
  return (
    <nav
      className={styles.social}
      aria-label="Social media links"
    >
      {socialLinks.map(({ icon, url, label }) => (
        <a
          key={label}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className={styles['social__link']}
        >
          <Icon icon={icon} />
        </a>
      ))}
    </nav>
  );
}