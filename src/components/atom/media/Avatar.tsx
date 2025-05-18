import React from 'react';
import Image from 'next/image';

interface AvatarProps {
  /**
   * URL de la imagen del avatar.
   */
  src?: string;

  /**
   * Nombre del usuario para mostrar iniciales o para accesibilidad.
   */
  name: string;

  /**
   * Tamaño en píxeles del avatar (ancho y alto).
   * @default 40
   */
  size?: number;

  /**
   * Si es `true`, mostrará solo las iniciales como fallback.
   * @default true
   */
  fallback?: boolean;
}

/**
 * Componente Avatar
 *
 * Muestra una imagen de perfil del usuario. Si la imagen no está disponible,
 * muestra las iniciales del nombre como alternativa.
 */
const Avatar: React.FC<AvatarProps> = ({ src, name, size = 40, fallback = true }) => {
  const getInitials = () =>
    name
      .split(' ')
      .map((n) => n[0]?.toUpperCase())
      .slice(0, 2)
      .join('');

  return (
    <div
      className="rounded-full overflow-hidden flex items-center justify-center bg-gray-200 text-gray-600 font-semibold"
      style={{ width: size, height: size }}
      aria-label={name}
      role="img"
    >
      {src ? (
        <Image
          src={src}
          alt={`Avatar de ${name}`}
          width={size}
          height={size}
          className="object-cover"
        />
      ) : fallback ? (
        <span>{getInitials()}</span>
      ) : null}
    </div>
  );
};

export default Avatar;
