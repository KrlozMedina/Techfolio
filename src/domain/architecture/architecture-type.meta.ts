/**
 * =========================================================
 * Architecture Type Metadata
 * ---------------------------------------------------------
 * Definición centralizada de metadatos para los distintos
 * tipos de arquitectura de software utilizados en el sistema.
 *
 * Este archivo permite asociar a cada tipo arquitectónico:
 * - etiquetas multilenguaje
 * - descripciones técnicas
 * - iconos representativos
 * - color identificador para visualización en UI
 *
 * Arquitectura:
 * - Basado en enums para tipado fuerte
 * - Uso de Record<K, V> para mapear entidades
 * - Integración con el tipo compartido EntityMeta
 *
 * Responsabilidades:
 * - Centralizar la información descriptiva de tipos de arquitectura
 * - Facilitar la visualización de arquitecturas en la interfaz
 * - Servir como catálogo estructural del sistema
 *
 * Utilizado en:
 * - documentación de proyectos
 * - visualización de arquitectura
 * - componentes de metadata en UI
 * =========================================================
 */

import { ArchitectureType } from "@/shared/enums";
import { EntityMeta } from "@/domain/shared/meta.types";
import { Box, Cpu, Grid, Network, Zap } from "lucide-react";

/**
 * =========================================================
 * ARCHITECTURE_TYPE_META
 * ---------------------------------------------------------
 * Mapa de metadatos asociado a cada tipo arquitectónico
 * definido en el enum `ArchitectureType`.
 *
 * Estructura:
 * Record<ArchitectureType, EntityMeta>
 *
 * Cada entrada define:
 * - labels y description en múltiples idiomas
 * - icono representativo (lucide-react)
 * - color identificador utilizado en UI
 * =========================================================
 */
export const ARCHITECTURE_TYPE_META: Record<
  ArchitectureType,
  EntityMeta
> = {

  /**
   * ======================================================
   * MONOLITH
   * ------------------------------------------------------
   * Arquitectura donde toda la aplicación se despliega
   * como una única unidad ejecutable que contiene todos
   * los componentes del sistema.
   *
   * Características:
   * - simplicidad inicial de desarrollo
   * - despliegue único
   * - fuerte acoplamiento entre módulos
   * ======================================================
   */
  [ArchitectureType.MONOLITH]: {
    es: {
      labels: "Monolito",
      description:
        "Aplicación desplegada como una única unidad con todos sus componentes integrados.",
    },
    en: {
      labels: "Monolith",
      description:
        "Application deployed as a single unit with all components integrated.",
    },
    icon: Box,
    color: "#2563EB",
  },

  /**
   * ======================================================
   * MICROSERVICES
   * ------------------------------------------------------
   * Arquitectura distribuida donde el sistema se divide
   * en múltiples servicios independientes que se comunican
   * entre sí mediante APIs o eventos.
   *
   * Características:
   * - despliegue independiente
   * - escalabilidad por servicio
   * - desacoplamiento funcional
   * ======================================================
   */
  [ArchitectureType.MICROSERVICES]: {
    es: {
      labels: "Microservicios",
      description:
        "Sistema compuesto por múltiples servicios independientes y desplegables de forma autónoma.",
    },
    en: {
      labels: "Microservices",
      description:
        "System composed of multiple independent services deployed autonomously.",
    },
    icon: Network,
    color: "#10B981",
  },

  /**
   * ======================================================
   * MODULAR ARCHITECTURE
   * ------------------------------------------------------
   * Arquitectura donde el sistema se organiza en módulos
   * internos bien definidos que encapsulan responsabilidades
   * específicas.
   *
   * Ventajas:
   * - mejor mantenibilidad
   * - separación clara de responsabilidades
   * - evolución gradual hacia microservicios
   * ======================================================
   */
  [ArchitectureType.MODULAR]: {
    es: {
      labels: "Arquitectura modular",
      description:
        "Aplicación organizada en módulos internos bien definidos con responsabilidades claras.",
    },
    en: {
      labels: "Modular Architecture",
      description:
        "Application organized into well-defined internal modules with clear responsibilities.",
    },
    icon: Grid,
    color: "#7C3AED",
  },

  /**
   * ======================================================
   * EVENT-DRIVEN ARCHITECTURE
   * ------------------------------------------------------
   * Arquitectura basada en eventos donde los componentes
   * del sistema se comunican mediante la publicación y
   * suscripción de eventos.
   *
   * Características:
   * - alto desacoplamiento
   * - escalabilidad en sistemas distribuidos
   * - procesamiento asíncrono
   * ======================================================
   */
  [ArchitectureType.EVENT_DRIVEN]: {
    es: {
      labels: "Arquitectura orientada a eventos",
      description:
        "Sistema distribuido donde los componentes se comunican mediante eventos desacoplados.",
    },
    en: {
      labels: "Event-driven Architecture",
      description:
        "Distributed system where components communicate through decoupled events.",
    },
    icon: Zap,
    color: "#F59E0B",
  },

  /**
   * ======================================================
   * EDGE COMPUTING
   * ------------------------------------------------------
   * Arquitectura donde el procesamiento se realiza cerca
   * de la fuente de datos o dispositivos periféricos
   * para reducir latencia y uso de red.
   *
   * Común en:
   * - IoT
   * - sistemas industriales
   * - aplicaciones en tiempo real
   * ======================================================
   */
  [ArchitectureType.EDGE]: {
    es: {
      labels: "Edge Computing",
      description:
        "Procesamiento distribuido cercano a dispositivos o fuentes de datos para reducir latencia.",
    },
    en: {
      labels: "Edge Computing",
      description:
        "Distributed processing closer to devices or data sources to reduce latency.",
    },
    icon: Cpu,
    color: "#EF4444",
  },
};