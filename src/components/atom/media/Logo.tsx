import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/hooks';

interface LogoProps {
  /**
   * Determina si el logo se mostrará en el encabezado.
   * - `true`: se muestra en tamaño pequeño y como enlace a la página principal.
   * - `false`: se muestra en tamaño grande sin enlace.
   * @default false
   */
  inHeader?: boolean;
}

const ALT_TEXT = {
  default: {
    es: 'Logotipo de Krloz Medina',
    en: 'Krloz Medina Logo',
  },
  header: {
    es: 'Inicio - Krloz Medina',
    en: 'Home - Krloz Medina',
  },
};

/**
 * Logo
 *
 * Componente reutilizable para mostrar el logotipo de Krloz Medina.
 * Si `inHeader` es verdadero, se renderiza una versión más pequeña del logo
 * envuelta en un enlace hacia la página principal. Si es falso, se muestra
 * el logotipo en un tamaño más grande y sin enlace.
 */
const Logo: React.FC<LogoProps> = ({ inHeader = false }) => {
  const { isSpanish } = useLanguage();
  const lang = isSpanish ? 'es' : 'en';

  const width = inHeader ? 90 : 300;
  const height = inHeader ? 60 : 200;
  const alt = inHeader ? ALT_TEXT.header[lang] : ALT_TEXT.default[lang];

  const LogoImage = (
    <Image
      src="/assets/logo.png"
      alt={alt}
      width={width}
      height={height}
      loading="lazy"
    />
  );

  return inHeader ? <Link href="/" aria-label={inHeader ? alt : undefined}>{LogoImage}</Link> : LogoImage;
};

export default Logo;
