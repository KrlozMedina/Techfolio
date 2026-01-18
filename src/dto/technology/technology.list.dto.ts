/**
 * DTO para listar tecnologías.
 *
 * Representa la información básica necesaria
 * para mostrar un listado de tecnologías.
 */
export interface TechnologyListDTO {
  /** ID de la tecnología (ObjectId serializado) */
  id: string;

  /** Nombre de la tecnología */
  name: string;

  /** URL del icono representativo (opcional) */
  iconUrl?: string;

  /** URL del sitio web oficial o documentación (opcional) */
  websiteUrl?: string;
}
