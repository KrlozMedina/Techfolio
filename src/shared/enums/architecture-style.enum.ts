/**
 * Enum que define los estilos de arquitectura aplicables a un proyecto.
 * - MVC: Modelo-Vista-Controlador.
 * - LAYERED: Arquitectura en capas (Capa de presentación, lógica, datos, etc.).
 * - CLEAN: Arquitectura limpia, separando dominio, casos de uso e interfaces.
 * - HEXAGONAL: Arquitectura hexagonal (Ports & Adapters), facilita la independencia de infraestructura.
 * - DDD: Domain-Driven Design, enfoque centrado en el modelo de dominio.
 */
export enum ArchitectureStyle {
  MVC = "MVC",
  LAYERED = "Layered",
  CLEAN = "Clean",
  HEXAGONAL = "Hexagonal",
  DDD = "DDD",
}
