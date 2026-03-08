/**
 * =========================================================
 * Experience Level Metadata
 * ---------------------------------------------------------
 * Definición centralizada de metadatos para los distintos
 * niveles de experiencia utilizados en el sistema.
 *
 * Este archivo permite asociar a cada nivel:
 * - etiquetas multilenguaje
 * - descripciones del nivel de dominio
 * - iconos representativos
 * - color identificador para UI
 *
 * Arquitectura:
 * - Basado en enums para tipado fuerte
 * - Uso de Record<K, V> para mapear niveles
 * - Integración con el tipo compartido EntityMeta
 *
 * Responsabilidades:
 * - Centralizar la información sobre niveles de experiencia
 * - Facilitar representación visual consistente en UI
 * - Servir como referencia para clasificar habilidades
 *
 * Utilizado en:
 * - visualización de habilidades
 * - perfiles técnicos
 * - indicadores de dominio tecnológico
 * =========================================================
 */

import { ExperienceLevel } from "@/shared/enums/experience-level.enum";
import { EntityMeta } from "../shared/meta.types";
import {
  Compass,
  BookOpen,
  TrendingUp,
  Shield,
  Award,
  Briefcase,
} from "lucide-react";

/**
 * =========================================================
 * EXPERIENCE_LEVEL_META
 * ---------------------------------------------------------
 * Mapa de metadatos asociado a cada nivel de experiencia
 * definido en el enum `ExperienceLevel`.
 *
 * Estructura:
 * Record<ExperienceLevel, EntityMeta>
 *
 * Cada entrada define:
 * - labels y description en múltiples idiomas
 * - icono representativo (lucide-react)
 * - color identificador utilizado en UI
 * =========================================================
 */
export const EXPERIENCE_LEVEL_META: Record<
  ExperienceLevel,
  EntityMeta
> = {

  /**
   * ======================================================
   * EXPLORING
   * ------------------------------------------------------
   * Nivel inicial donde el usuario apenas comienza a
   * investigar o descubrir una tecnología o área.
   *
   * Características:
   * - curiosidad inicial
   * - conocimiento superficial
   * - sin formación estructurada
   * ======================================================
   */
  [ExperienceLevel.EXPLORING]: {
    es: {
      labels: "Explorando",
      description:
        "Etapa inicial de descubrimiento sin formación estructurada.",
    },
    en: {
      labels: "Exploring",
      description:
        "Early discovery stage without structured knowledge.",
    },
    icon: Compass,
    color: "#9CA3AF", // gris neutro
  },

  /**
   * ======================================================
   * BASIC
   * ------------------------------------------------------
   * Nivel introductorio donde se comprenden los conceptos
   * fundamentales de una tecnología o área de conocimiento.
   *
   * Características:
   * - aprendizaje inicial
   * - comprensión general
   * - primeros ejercicios o proyectos simples
   * ======================================================
   */
  [ExperienceLevel.BASIC]: {
    es: {
      labels: "Básico",
      description:
        "Conocimientos introductorios y comprensión general del área.",
    },
    en: {
      labels: "Basic",
      description:
        "Introductory knowledge with general understanding.",
    },
    icon: BookOpen,
    color: "#60A5FA", // azul claro
  },

  /**
   * ======================================================
   * INTERMEDIATE
   * ------------------------------------------------------
   * Nivel funcional donde la persona puede aplicar el
   * conocimiento en proyectos reales con cierto grado
   * de autonomía.
   *
   * Características:
   * - experiencia práctica
   * - resolución de problemas comunes
   * - participación activa en proyectos
   * ======================================================
   */
  [ExperienceLevel.INTERMEDIATE]: {
    es: {
      labels: "Intermedio",
      description:
        "Capacidad funcional con aplicación práctica en proyectos.",
    },
    en: {
      labels: "Intermediate",
      description:
        "Functional capability with practical project experience.",
    },
    icon: TrendingUp,
    color: "#2563EB", // azul sólido
  },

  /**
   * ======================================================
   * ADVANCED
   * ------------------------------------------------------
   * Nivel de dominio sólido donde el profesional tiene
   * criterio técnico, autonomía y capacidad para resolver
   * problemas complejos.
   *
   * Características:
   * - toma de decisiones técnicas
   * - autonomía en desarrollo
   * - optimización de soluciones
   * ======================================================
   */
  [ExperienceLevel.ADVANCED]: {
    es: {
      labels: "Avanzado",
      description:
        "Dominio sólido con criterio técnico y autonomía.",
    },
    en: {
      labels: "Advanced",
      description:
        "Strong mastery with technical judgment and autonomy.",
    },
    icon: Shield,
    color: "#7C3AED", // violeta
  },

  /**
   * ======================================================
   * EXPERT
   * ------------------------------------------------------
   * Nivel máximo de conocimiento técnico donde la persona
   * es capaz de diseñar arquitecturas complejas y guiar
   * decisiones estratégicas.
   *
   * Características:
   * - conocimiento profundo
   * - diseño de soluciones complejas
   * - liderazgo técnico
   * ======================================================
   */
  [ExperienceLevel.EXPERT]: {
    es: {
      labels: "Experto",
      description:
        "Alto nivel técnico, capaz de diseñar soluciones complejas.",
    },
    en: {
      labels: "Expert",
      description:
        "High technical level capable of designing complex solutions.",
    },
    icon: Award,
    color: "#F59E0B", // dorado
  },

  /**
   * ======================================================
   * PROFESSIONAL
   * ------------------------------------------------------
   * Nivel que representa experiencia real en entornos
   * laborales con responsabilidad directa sobre sistemas
   * o proyectos.
   *
   * Características:
   * - experiencia laboral comprobada
   * - responsabilidad técnica
   * - impacto en producción
   * ======================================================
   */
  [ExperienceLevel.PROFESSIONAL]: {
    es: {
      labels: "Profesional",
      description:
        "Experiencia aplicada en entorno laboral con responsabilidad directa.",
    },
    en: {
      labels: "Professional",
      description:
        "Applied experience in professional environments with direct responsibility.",
    },
    icon: Briefcase,
    color: "#10B981", // verde profesional
  },
};