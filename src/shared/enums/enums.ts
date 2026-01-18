// ======================
// Project status
// ======================

/**
 * Estado actual de un proyecto dentro de su ciclo de vida.
 */
export enum ProjectStatus {
  /** Borrador, no visible públicamente */
  DRAFT = "draft",

  /** Publicado y visible */
  PUBLISHED = "published",

  /** Archivado, sin cambios activos */
  ARCHIVED = "archived",

  /** Proyecto finalizado completamente */
  FINISHED = "finished",

  /** Proyecto en ejecución */
  IN_PROGRESS = "in-progress",

  /** Planeado pero no iniciado */
  PLANNED = "planned",

  /** Cancelado definitivamente */
  CANCELLED = "cancelled",

  /** En pausa temporal */
  ON_HOLD = "on-hold",
}

// ======================
// Project type
// ======================

/**
 * Tipo de proyecto según su contexto profesional.
 */
export enum ProjectType {
  /** Proyecto personal */
  PERSONAL = "personal",

  /** Proyecto freelance para terceros */
  FREELANCE = "freelance",

  /** Proyecto laboral / corporativo */
  WORK = "work",
}

// ======================
// Platforms
// ======================

/**
 * Plataforma principal donde se ejecuta el proyecto.
 */
export enum Platform {
  /** Aplicación web */
  WEB = "web",

  /** Aplicación móvil */
  MOBILE = "mobile",

  /** Proyecto de Internet of Things */
  IOT = "iot",
}

// ======================
// Team role
// ======================

/**
 * Rol desempeñado dentro del equipo del proyecto.
 */
export enum TeamRole {
  /** Desarrollador */
  DEVELOPER = "developer",

  /** Líder técnico o de proyecto */
  LEAD = "lead",

  /** Diseñador UI/UX o visual */
  DESIGNER = "designer",
}
