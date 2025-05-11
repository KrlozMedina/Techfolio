import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import style from './Logo.module.css';

interface LogoProps {
  /**
   * Texto a mostrar si no se usa el logo como encabezado.
   * @default "Krloz Medina </>"
   */
  label?: string;

  /**
   * Indica si se debe renderizar como logo gráfico (en el encabezado) o como texto.
   * @default false
   */
  isHeader?: boolean;
}

/**
 * Componente Logo
 *
 * Renderiza el logo gráfico (imagen) cuando `isHeader` es `true`,
 * o un texto como título cuando es `false`.
 */
const Logo: React.FC<LogoProps> = ({
  label = "Krloz Medina </>",
  isHeader = false,
}) => {
  // Si es parte del encabezado, se muestra como logo clickeable (enlace al home)
  if (isHeader) {
    return (
      <Link href="/" className={style.logo__link}>
        <Image
          src="/assets/logo.png"
          alt="Logo Krloz Medina"
          width={100}
          height={40}
          className={style.logo__image}
          loading="lazy"
        />
      </Link>
    );
  }

  // Si no es encabezado, se muestra como texto (ej: título principal de una página)
  return <h1 className={style.logo__text}>{label}</h1>;
};

export default Logo;
