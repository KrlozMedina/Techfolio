/**
 * Dominio funcional de una feature.
 * Define el área principal a la que pertenece la funcionalidad.
 */
export enum FeatureDomain {
  /** Funcionalidad técnica: autenticación, base de datos, APIs, integraciones */
  TECHNICAL = "Technical",

  /** Funcionalidad de negocio: reservas, pagos, reportes, flujos */
  FUNCTIONAL = "Functional",

  /** Elementos de interfaz de usuario */
  UI = "UI",

  /** Lógica específica del servidor */
  BACKEND = "BackEnd",
}
