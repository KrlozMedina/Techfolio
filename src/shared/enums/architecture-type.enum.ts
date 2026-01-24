/**
 * Enum que representa los tipos de arquitectura que un proyecto puede adoptar.
 * - MONOLITH: Arquitectura monolítica tradicional.
 * - MICROSERVICES: Arquitectura basada en microservicios.
 * - MODULAR: Arquitectura modular, separando responsabilidades en módulos independientes.
 * - EVENT_DRIVEN: Arquitectura orientada a eventos.
 * - EDGE: Arquitectura distribuida hacia el edge (procesamiento cercano al usuario o dispositivo).
 */
export enum ArchitectureType {
  MONOLITH = "Monolith",
  MICROSERVICES = "Micro services",
  MODULAR = "Modular",
  EVENT_DRIVEN = "Event driven",
  EDGE = "Edge",
}
