/**
 * DTO base para listar tecnologías.
 *
 * Representa la versión ligera de la entidad,
 * utilizada normalmente en endpoints de listado (GET paginado).
 *
 * No incluye información extendida como categoría completa
 * ni nivel de experiencia detallado.
 */
export interface TechnologyListDTO {
  /** Identificador único de la tecnología */
  id: string;

  /** Nombre de la tecnología */
  name: string;

  /** URL del ícono representativo (opcional) */
  icon?: string;

  /** URL del sitio web oficial (opcional) */
  website?: string;
}
