import {
  ArchitectureCommunication,
  ArchitectureStyle,
  ArchitectureType,
  DatabaseModel,
  ProjectType
} from "@/shared/enums";

import { ProjectListDTO } from "./project.list.dto";

/**
 * =========================================================
 * ProjectDetailDTO
 * ---------------------------------------------------------
 * DTO que representa el detalle completo de un proyecto.
 *
 * Extiende ProjectListDTO (usado en vistas de listado)
 * agregando información adicional para:
 * - Página de detalle
 * - Modal avanzado
 * - Vista técnica completa
 *
 * Principio:
 * - No expone el modelo de base de datos directamente.
 * - Representa un contrato seguro y transformado para UI.
 * =========================================================
 */
export interface ProjectDetailDTO extends ProjectListDTO {

  /** Problema o necesidad que aborda el proyecto */
  problem: string;

  /** Solución propuesta e implementada */
  solution: string;

  /**
   * Información del equipo involucrado
   */
  teamInfo: {
    role: string;
    teamSize: number;
    duration: string;
    projectType: ProjectType;
    company: string | null;
  };

  /**
   * Descripción técnica de la arquitectura
   */
  architecture: {
    type: ArchitectureType;
    style: ArchitectureStyle;
    databaseModel: DatabaseModel;
    communication: {
      internal: ArchitectureCommunication[];
      external: ArchitectureCommunication[];
    };
  };

  /**
   * Impacto generado por el proyecto
   */
  impact: {
    users: string;
  };

  /** Principales aprendizajes del proyecto */
  learnings: string[];

  /** URL opcional de documentación */
  documentationUrl: string | null;

  /**
   * Resultado o caso de éxito asociado
   * Puede ser null si no aplica.
   */
  outcome: {
    slug: string | undefined;
    title: string | undefined;
    solution: string | undefined;
    media: {
      src: string | undefined;
      blurDataURL: string | undefined;
    }
  } | null;

  /** Puntaje de importancia interna */
  importanceScore: number;

  /** Estado actual del proyecto */
  status: string;
}