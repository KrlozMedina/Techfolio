/**
 * Enum que representa los posibles estados de un proyecto.
 * - DRAFT: Proyecto en borrador, no visible públicamente.
 * - PUBLISHED: Proyecto publicado y visible en el portafolio.
 * - ARCHIVED: Proyecto archivado, solo referencia histórica.
 */
export enum ProjectStatus {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
  ARCHIVED = "ARCHIVED",
}
