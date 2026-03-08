/**
 * =========================================================
 * Project Type Metadata
 * ---------------------------------------------------------
 * Definición centralizada de metadatos para los distintos
 * tipos de proyectos dentro del sistema.
 *
 * Este archivo permite asociar a cada tipo de proyecto:
 * - etiquetas multilenguaje
 * - descripciones del contexto del proyecto
 * - iconos representativos
 * - color identificador para UI
 *
 * Arquitectura:
 * - Basado en enums para tipado fuerte
 * - Uso de Record<K, V> para mapear cada tipo
 * - Integración con el tipo compartido EntityMeta
 *
 * Responsabilidades:
 * - Clasificar proyectos según su contexto de desarrollo
 * - Facilitar representación visual consistente en UI
 * - Servir como catálogo de tipologías de proyectos
 *
 * Utilizado en:
 * - portafolio de proyectos
 * - documentación de experiencias
 * - visualización de metadatos en UI
 * =========================================================
 */

import { ProjectType } from "@/shared/enums";
import { EntityMeta } from "../shared/meta.types";
import {
  User,
  Building2,
  Laptop,
  GraduationCap,
} from "lucide-react";

/**
 * =========================================================
 * PROJECT_TYPE_META
 * ---------------------------------------------------------
 * Mapa de metadatos asociado a cada tipo de proyecto
 * definido en el enum `ProjectType`.
 *
 * Estructura:
 * Record<ProjectType, EntityMeta>
 *
 * Cada entrada define:
 * - labels y description en múltiples idiomas
 * - icono representativo (lucide-react)
 * - color identificador utilizado en UI
 * =========================================================
 */
export const PROJECT_TYPE_META: Record<ProjectType, EntityMeta> = {

  /**
   * ======================================================
   * PERSONAL
   * ------------------------------------------------------
   * Proyecto desarrollado por iniciativa propia con
   * objetivos de aprendizaje, experimentación o
   * construcción de portafolio.
   *
   * Características:
   * - autonomía total del desarrollador
   * - exploración tecnológica
   * - prototipos o demostraciones
   * ======================================================
   */
  [ProjectType.PERSONAL]: {
    es: {
      labels: "Personal",
      description:
        "Proyecto desarrollado por iniciativa propia con fines de aprendizaje o portafolio.",
    },
    en: {
      labels: "Personal",
      description:
        "Self-initiated project focused on learning or portfolio development.",
    },
    icon: User,
    color: "#6366F1", // índigo individual
  },

  /**
   * ======================================================
   * WORK
   * ------------------------------------------------------
   * Proyecto desarrollado dentro de un entorno profesional
   * como parte de responsabilidades laborales.
   *
   * Características:
   * - trabajo en equipo
   * - alineación con objetivos empresariales
   * - desarrollo en producción
   * ======================================================
   */
  [ProjectType.WORK]: {
    es: {
      labels: "Laboral",
      description:
        "Proyecto desarrollado dentro de una empresa o entorno profesional.",
    },
    en: {
      labels: "Work",
      description:
        "Project developed within a company or professional role.",
    },
    icon: Building2,
    color: "#2563EB", // azul corporativo
  },

  /**
   * ======================================================
   * FREELANCE
   * ------------------------------------------------------
   * Proyecto realizado de forma independiente para
   * clientes externos, generalmente bajo contrato o
   * acuerdo de prestación de servicios.
   *
   * Características:
   * - relación directa con el cliente
   * - responsabilidad individual del desarrollo
   * - entregables definidos
   * ======================================================
   */
  [ProjectType.FREELANCE]: {
    es: {
      labels: "Freelance",
      description:
        "Proyecto realizado de forma independiente para un cliente externo.",
    },
    en: {
      labels: "Freelance",
      description:
        "Independent project delivered for an external client.",
    },
    icon: Laptop,
    color: "#F59E0B", // ámbar autónomo
  },

  /**
   * ======================================================
   * ACADEMIC
   * ------------------------------------------------------
   * Proyecto desarrollado dentro de un contexto educativo
   * como parte de formación académica o programas de
   * aprendizaje formal.
   *
   * Características:
   * - asociado a cursos o programas educativos
   * - enfocado en aprendizaje y evaluación
   * - supervisado por docentes o instructores
   * ======================================================
   */
  [ProjectType.ACADEMIC]: {
    es: {
      labels: "Académico",
      description:
        "Proyecto desarrollado en contexto educativo o formación formal.",
    },
    en: {
      labels: "Academic",
      description:
        "Project developed in an educational or formal training context.",
    },
    icon: GraduationCap,
    color: "#10B981", // verde aprendizaje
  },
};