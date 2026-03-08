/**
 * =========================================================
 * Card Views — Banner Component
 * ---------------------------------------------------------
 * Componente utilizado para mostrar tarjetas tipo banner
 * asociadas a contenido educativo o promocional.
 *
 * Este componente muestra:
 * - Logo o imagen representativa
 * - Título del contenido
 * - Enlace externo al recurso asociado
 *
 * Arquitectura:
 * - React + TypeScript
 * - Next.js Image para optimización de imágenes
 * - Uso de componente reutilizable ExternalLink
 *
 * Responsabilidades:
 * - Renderizar una tarjeta interactiva con imagen y título
 * - Redirigir al usuario a un recurso externo
 * - Guardar información contextual en localStorage
 *   (por ejemplo, el logo asociado al diploma)
 *
 * Utilizado en:
 * - secciones de educación
 * - certificados
 * - banners promocionales
 * =========================================================
 */

import React from 'react';
import Image from 'next/image';
import { ExternalLink } from '@/components/atom/external-link/ExternalLink';

// === Interfaces ===

/**
 * Props for the ProjectCard component.
 */


/**
 * =========================================================
 * BannerProps Interface
 * ---------------------------------------------------------
 * Define la estructura de datos requerida para renderizar
 * el componente Banner.
 *
 * @property data - Objeto que contiene la información
 *                  necesaria para construir la tarjeta.
 *
 * Campos del objeto:
 * - url   -> enlace externo al recurso
 * - logo  -> ruta o URL de la imagen representativa
 * - alt   -> texto alternativo de accesibilidad
 * - title -> título mostrado en la tarjeta
 * =========================================================
 */
interface BannerProps {
  data: {
    url: string;
    logo: string;
    alt: string;
    title: string;
  };
}

/**
 * =========================================================
 * Banner Component
 * ---------------------------------------------------------
 * Componente que renderiza una tarjeta tipo banner con
 * un logo y título que enlaza a un recurso externo.
 *
 * El componente envuelve el contenido dentro de
 * `ExternalLink`, garantizando que el enlace externo
 * se abra de forma segura en una nueva pestaña.
 *
 * Comportamiento adicional:
 * - Al hacer clic en la tarjeta se guarda el logo
 *   en localStorage bajo la clave "diploma".
 *
 * @param data - Información necesaria para renderizar
 *               el banner (url, logo, alt, title).
 *
 * @returns JSX.Element
 * =========================================================
 */
export const Banner: React.FC<BannerProps> = ({ data }) => {
  const { url, logo, alt, title } = data;

  /**
   * ======================================================
   * handleClick
   * ------------------------------------------------------
   * Maneja el evento de clic en la tarjeta.
   *
   * Guarda el logo en localStorage para que pueda ser
   * reutilizado posteriormente en otras vistas del
   * sistema (por ejemplo, visualización de diploma).
   *
   * Se valida que el código se ejecute únicamente en
   * entorno de navegador para evitar errores en SSR.
   * ======================================================
   */
  // const handleClick = () => localStorage.setItem('diploma', logo); // Store logo in localStorage on click
  const handleClick = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('diploma', logo);
    }
  };

  return (
    /**
     * ExternalLink envuelve la tarjeta para redirigir
     * al usuario al recurso externo.
     */
    <ExternalLink href={url}>

      {/* Tarjeta visual del banner */}
      <article className="card-education" onClick={handleClick}>

        {/* Contenedor interno del contenido */}
        <div>

          {/* Imagen optimizada con Next.js Image */}
          <Image
            className="education-logo"
            src={logo}
            width={50}
            height={50}
            alt={alt}
            loading="lazy"
          />

          {/* Título del banner */}
          <h3>{title}</h3>

        </div>

      </article>

    </ExternalLink>
  );
};