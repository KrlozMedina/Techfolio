/**
 * =========================================================
 * Feature Enum
 * ---------------------------------------------------------
 * Define los módulos o secciones principales del sistema.
 *
 * Cada feature representa una funcionalidad o área de la
 * aplicación que puede estar asociada a permisos o control
 * de acceso basado en roles (RBAC).
 *
 * Se utiliza normalmente para:
 * - controlar acceso a rutas
 * - organizar permisos por módulo
 * - habilitar/deshabilitar secciones del sistema
 * =========================================================
 */
export enum Feature {

  /**
   * Panel principal del sistema.
   * Usado normalmente para métricas, accesos rápidos y
   * resumen de información.
   */
  DASHBOARD = "DASHBOARD",

  /**
   * Gestión y visualización de proyectos.
   */
  PROJECTS = "PROJECTS",

  /**
   * Gestión de clientes o portafolio de clientes.
   */
  CLIENTS = "CLIENTS",

  /**
   * Sección de artículos o publicaciones.
   */
  BLOG = "BLOG",

  /**
   * Recursos técnicos, documentación o materiales.
   */
  RESOURCES = "RESOURCES",

  /**
   * Perfil del usuario autenticado.
   */
  PROFILE = "PROFILE",

  /**
   * Galería multimedia (imágenes, demos, proyectos visuales).
   */
  GALLERY = "GALLERY",

  /**
   * Hoja de vida o resumen profesional.
   */
  RESUME = "RESUME"
}