/**
 * =========================================================
 * VideoCard Component
 * ---------------------------------------------------------
 * Componente utilizado para mostrar una tarjeta de video
 * asociada a un proyecto o contenido multimedia.
 *
 * La tarjeta presenta:
 * - Miniatura del video
 * - Título del video
 * - Descripción breve
 * - Enlace externo al recurso (por ejemplo YouTube)
 *
 * Arquitectura:
 * - React + TypeScript
 * - Next.js Image para optimización de imágenes
 * - Uso del componente ExternalLink para navegación segura
 *
 * Responsabilidades:
 * - Renderizar una tarjeta visual de video
 * - Mostrar miniatura optimizada del video
 * - Proporcionar enlace externo al contenido
 * - Mantener estructura consistente con el sistema de tarjetas
 *
 * Utilizado en:
 * - sección de proyectos
 * - galerías de videos
 * - portafolios multimedia
 * =========================================================
 */

import { ExternalLink } from "@/components/atom/external-link/ExternalLink";
import Image from "next/image";

/**
 * =========================================================
 * CardVideoData Interface
 * ---------------------------------------------------------
 * Define la estructura de datos requerida para renderizar
 * una tarjeta de video.
 *
 * @property description - Descripción breve del video.
 * @property link - URL del video o recurso externo.
 * @property title - Título del video mostrado en la tarjeta.
 * @property thumbnails - Objeto que contiene las miniaturas
 *                        disponibles del video.
 *
 * Estructura esperada:
 * thumbnails.medium.url -> URL de la miniatura principal.
 * =========================================================
 */
interface CardVideoData {
  description: string;
  link: string;
  title: string;
  thumbnails: {
    medium: {
      url: string;
    };
  };
}

/**
 * =========================================================
 * VideoCardProps Interface
 * ---------------------------------------------------------
 * Define las propiedades aceptadas por el componente
 * VideoCard.
 *
 * @property children - Objeto con la información necesaria
 *                      para construir la tarjeta del video.
 * =========================================================
 */
interface VideoCardProps {
  children: CardVideoData;
}

/**
 * =========================================================
 * VideoCard Component
 * ---------------------------------------------------------
 * Renderiza una tarjeta visual que representa un video.
 *
 * La tarjeta incluye:
 * - imagen miniatura del video
 * - descripción breve
 * - título del video
 * - enlace externo para visualizar el contenido
 *
 * @param children - Datos del video (title, description,
 *                   link y thumbnails).
 *
 * @returns JSX.Element
 * =========================================================
 */
export const VideoCard: React.FC<VideoCardProps> = ({ children }) => {

  /**
   * Desestructuración de los datos del video.
   */
  const { link, title, thumbnails, description } = children;

  return (

    /**
     * Contenedor principal de la tarjeta de video.
     */
    <article className="card__video">

      {/* Enlace externo hacia el video */}
      <ExternalLink href={link}>

        {/* Contenedor de miniatura y descripción */}
        <div>

          {/* Imagen optimizada del video */}
          <Image
            src={thumbnails.medium.url}
            className="card__video--image"
            alt={title}
            loading="lazy"
          />

          {/* Descripción del video */}
          <p className="card__video--description">
            {description}
          </p>

        </div>

        {/* Título del video */}
        <p className="card__video--title">
          {title}
        </p>

      </ExternalLink>

    </article>
  );
};