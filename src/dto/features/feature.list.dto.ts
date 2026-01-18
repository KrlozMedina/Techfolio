/**
 * DTO para listado de Features.
 * - Contiene solo la información básica necesaria para listados
 * - Localizado a un idioma específico
 */
export interface FeatureListDTO {
  /** ID del documento (ObjectId serializado) */
  id: string;

  /** Slug único legible para URLs */
  slug: string;

  /** Título de la feature en el idioma solicitado */
  title: string;
}
