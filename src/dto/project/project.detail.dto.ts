import { ProjectListDTO } from "./project.list.dto";

/**
 * DTO que representa el detalle completo de un proyecto.
 * Extiende la información básica usada en listados (ProjectListDTO)
 * con datos adicionales para vistas de detalle.
 */
export interface ProjectDetailDTO extends ProjectListDTO {
  /** Problema o necesidad que aborda el proyecto */
  problem: string;

  /** Solución propuesta e implementada */
  solution: string;

  /** Información del equipo involucrado (roles, cantidad, etc.) */
  teamInfo: object;

  /** Descripción de la arquitectura del proyecto */
  architecture: object;

  /** Impacto generado por el proyecto (negocio, técnico, usuario, etc.) */
  impact: object;

  /** Principales aprendizajes obtenidos durante el desarrollo */
  learnings: string[];

  /** URL de la documentación del proyecto (puede ser nula) */
  documentationUrl: string | null;

  /** Puntaje que indica la importancia o relevancia del proyecto */
  importanceScore: number;

  /** Estado actual del proyecto (ej: draft, active, archived) */
  status: string;
}
