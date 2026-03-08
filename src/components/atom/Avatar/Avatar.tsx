import React from 'react';
import Image from 'next/image';

interface Props {
  /**
   * Nombre del avatar.
   * Se utiliza para construir la ruta:
   * `/assets/avatars/{name}.png`
   */
  name: string;

  /**
   * Clase CSS opcional para aplicar estilos personalizados.
   */
  className?: string;

  /**
   * Estilos inline opcionales para el contenedor del avatar.
   */
  style?: React.CSSProperties;
}

/**
 * =========================================================
 * Avatar
 * ---------------------------------------------------------
 * Componente visual que renderiza una imagen de avatar
 * basada en el nombre recibido.
 *
 * Funcionamiento:
 * - Construye dinámicamente la ruta del asset.
 * - Usa Next.js <Image> para optimización automática.
 *
 * Responsabilidades:
 * - Renderizar imagen optimizada.
 * - Permitir personalización vía className y style.
 * - Proveer atributos básicos de accesibilidad.
 *
 * Nota:
 * Las dimensiones están actualmente fijas (220x330).
 * =========================================================
 */
const Avatar: React.FC<Props> = ({
  name,
  className,
  style,
}) => {
  return (
    <div
      style={{ ...style }}
      className={className}
      aria-label={`Avatar de ${name}`}
      role="img"
    >
      <Image
        src={`/assets/avatars/${name}.png`}
        alt={`Avatar de ${name}`}
        width={220}
        height={330}
        style={{ objectFit: "contain" }}
        loading="eager"
      />
    </div>
  );
};

export default Avatar;