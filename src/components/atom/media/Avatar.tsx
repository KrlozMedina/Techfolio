import React from 'react';
import Image from 'next/image';

interface AvatarProps {
  /**
   * Nombre del avatar (se usará para cargar la imagen desde `/assets/avatars/{name}.png`)
   */
  name: string;

  /**
   * Ancho del avatar en píxeles. Por defecto: 40
   */
  width: number;

  /**
   * Alto del avatar en píxeles. Por defecto: 40
   */
  height: number;

  /**
   * Clase CSS opcional para aplicar estilos personalizados
   */
  className?: string;

  /**
   * Estilos inline opcionales para el contenedor del avatar
   */
  style?: React.CSSProperties;
}

/**
 * Componente Avatar que muestra una imagen del usuario basada en su nombre.
 * La imagen se busca en la ruta `/assets/avatars/{name}.png`.
 */
const Avatar: React.FC<AvatarProps> = ({
  name,
  width,
  height,
  className,
  style,
}) => {
  return (
    <div
      style={{ width, height, ...style }}
      className={className}
      aria-label={`Avatar de ${name}`}
      role="img"
    >
      <Image
        src={`/assets/avatars/${name}.png`}
        alt={`Avatar de ${name}`}
        width={width}
        height={height}
        loading="lazy"
      />
    </div>
  );
};

export default Avatar;
