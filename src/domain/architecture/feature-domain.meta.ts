/**
 * =========================================================
 * Feature Domain Metadata
 * ---------------------------------------------------------
 * Definición centralizada de metadatos para los distintos
 * dominios funcionales o técnicos de características del
 * sistema.
 *
 * Este archivo permite asociar a cada dominio:
 * - etiquetas multilenguaje
 * - descripciones del tipo de característica
 * - iconos representativos
 * - color identificador para UI
 *
 * Arquitectura:
 * - Basado en enums para garantizar tipado fuerte
 * - Uso de Record<K, V> para mapear cada dominio
 * - Integración con el tipo compartido EntityMeta
 *
 * Responsabilidades:
 * - Clasificar características del sistema por dominio
 * - Facilitar representación visual consistente en UI
 * - Servir como referencia para categorización de features
 *
 * Utilizado en:
 * - documentación técnica de funcionalidades
 * - visualización de características en UI
 * - categorización de capacidades del sistema
 * =========================================================
 */

import { FeatureDomain } from "@/shared/enums/feature-domain.enum";
import { EntityMeta } from "../shared/meta.types";
import {
  Cpu,
  Puzzle,
  Monitor,
  Server,
  Shield,
  GitBranch,
} from "lucide-react";

/**
 * =========================================================
 * FEATURE_DOMAIN_META
 * ---------------------------------------------------------
 * Mapa de metadatos asociado a cada dominio de
 * características definido en el enum `FeatureDomain`.
 *
 * Estructura:
 * Record<FeatureDomain, EntityMeta>
 *
 * Cada entrada define:
 * - labels y description en múltiples idiomas
 * - icono representativo (lucide-react)
 * - color identificador utilizado en UI
 * =========================================================
 */
export const FEATURE_DOMAIN_META: Record<
  FeatureDomain,
  EntityMeta
> = {

  /**
   * ======================================================
   * TECHNICAL
   * ------------------------------------------------------
   * Dominio que agrupa características relacionadas con
   * la implementación técnica del sistema y su comportamiento
   * interno.
   *
   * Ejemplos:
   * - algoritmos
   * - optimizaciones
   * - manejo de memoria
   * - procesamiento interno
   * ======================================================
   */
  [FeatureDomain.TECHNICAL]: {
    es: {
      labels: "Técnico",
      description:
        "Aspectos relacionados con implementación técnica y comportamiento interno del sistema.",
    },
    en: {
      labels: "Technical",
      description:
        "Features related to technical implementation and internal system behavior.",
    },
    icon: Cpu,
    color: "#6366F1", // índigo técnico
  },

  /**
   * ======================================================
   * FUNCTIONAL
   * ------------------------------------------------------
   * Dominio que representa características basadas en
   * reglas de negocio y comportamiento funcional del sistema.
   *
   * Ejemplos:
   * - procesos de negocio
   * - validaciones
   * - flujos funcionales
   * ======================================================
   */
  [FeatureDomain.FUNCTIONAL]: {
    es: {
      labels: "Funcional",
      description:
        "Características enfocadas en reglas de negocio y requisitos funcionales.",
    },
    en: {
      labels: "Functional",
      description:
        "Features focused on business rules and functional requirements.",
    },
    icon: Puzzle,
    color: "#10B981", // verde negocio
  },

  /**
   * ======================================================
   * USER INTERFACE (UI)
   * ------------------------------------------------------
   * Dominio relacionado con la capa de presentación
   * y la interacción del usuario con el sistema.
   *
   * Incluye aspectos de:
   * - diseño visual
   * - experiencia de usuario (UX)
   * - accesibilidad
   * - interacción
   * ======================================================
   */
  [FeatureDomain.UI]: {
    es: {
      labels: "Interfaz",
      description:
        "Características relacionadas con la experiencia de usuario e interfaz visual.",
    },
    en: {
      labels: "User Interface",
      description:
        "Features affecting the user interface and user experience.",
    },
    icon: Monitor,
    color: "#0EA5E9", // azul UI
  },

  /**
   * ======================================================
   * BACKEND
   * ------------------------------------------------------
   * Dominio asociado a la lógica del lado del servidor,
   * incluyendo APIs, procesamiento y servicios internos.
   *
   * Incluye:
   * - APIs
   * - servicios
   * - lógica del servidor
   * - procesamiento de datos
   * ======================================================
   */
  [FeatureDomain.BACKEND]: {
    es: {
      labels: "Backend",
      description:
        "Procesos del servidor, APIs y lógica interna del sistema.",
    },
    en: {
      labels: "Backend",
      description:
        "Server processes, APIs, and internal system logic.",
    },
    icon: Server,
    color: "#F97316", // naranja infraestructura
  },

  /**
   * ======================================================
   * SECURITY
   * ------------------------------------------------------
   * Dominio relacionado con la protección del sistema
   * y control de acceso a recursos.
   *
   * Incluye:
   * - autenticación
   * - autorización
   * - cifrado
   * - control de acceso
   * ======================================================
   */
  [FeatureDomain.SECURITY]: {
    es: {
      labels: "Seguridad",
      description:
        "Aspectos relacionados con protección, autenticación y control de acceso.",
    },
    en: {
      labels: "Security",
      description:
        "Features addressing protection, authentication, and access control.",
    },
    icon: Shield,
    color: "#EF4444", // rojo seguridad
  },

  /**
   * ======================================================
   * ARCHITECTURE
   * ------------------------------------------------------
   * Dominio que agrupa decisiones estructurales y de
   * diseño que determinan la organización general
   * del sistema.
   *
   * Incluye:
   * - patrones arquitectónicos
   * - organización de componentes
   * - diseño estructural
   * ======================================================
   */
  [FeatureDomain.ARCHITECTURE]: {
    es: {
      labels: "Arquitectura",
      description:
        "Decisiones estructurales y de diseño que afectan la organización del sistema.",
    },
    en: {
      labels: "Architecture",
      description:
        "Structural and design decisions shaping the system organization.",
    },
    icon: GitBranch,
    color: "#8B5CF6", // violeta arquitectura
  },
};