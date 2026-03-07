/**
 * =========================================================
 * Platform Metadata
 * ---------------------------------------------------------
 * Definición centralizada de metadatos para los distintos
 * tipos de plataformas donde puede ejecutarse o desplegarse
 * un sistema o aplicación.
 *
 * Este archivo permite asociar a cada plataforma:
 * - etiquetas multilenguaje
 * - descripciones técnicas
 * - iconos representativos
 * - color identificador para UI
 *
 * Arquitectura:
 * - Basado en enums para garantizar tipado fuerte
 * - Uso de Record<K, V> para mapear cada plataforma
 * - Integración con el tipo compartido EntityMeta
 *
 * Responsabilidades:
 * - Clasificar aplicaciones según su entorno de ejecución
 * - Facilitar representación visual consistente en UI
 * - Servir como catálogo de plataformas tecnológicas
 *
 * Utilizado en:
 * - documentación técnica de proyectos
 * - visualización de stack tecnológico
 * - clasificación de sistemas por plataforma
 * =========================================================
 */

import { Platform } from "@/shared/enums";
import { EntityMeta } from "../shared/meta.types";
import {
  Globe,
  Smartphone,
  Monitor,
  Cpu,
  Factory,
  Server,
  Plug,
} from "lucide-react";

/**
 * =========================================================
 * PLATFORM_META
 * ---------------------------------------------------------
 * Mapa de metadatos asociado a cada plataforma definida
 * en el enum `Platform`.
 *
 * Estructura:
 * Record<Platform, EntityMeta>
 *
 * Cada entrada define:
 * - labels y description en múltiples idiomas
 * - icono representativo (lucide-react)
 * - color identificador utilizado en UI
 * =========================================================
 */
export const PLATFORM_META: Record<Platform, EntityMeta> = {

  /**
   * ======================================================
   * WEB
   * ------------------------------------------------------
   * Aplicaciones accesibles mediante navegador web.
   *
   * Puede incluir:
   * - SPA (Single Page Applications)
   * - SSR (Server-Side Rendering)
   * - aplicaciones web tradicionales
   * ======================================================
   */
  [Platform.WEB]: {
    es: {
      labels: "Web",
      description:
        "Aplicación accesible desde navegador, ya sea SPA, SSR o tradicional.",
    },
    en: {
      labels: "Web",
      description:
        "Browser-accessible application (SPA, SSR, or traditional).",
    },
    icon: Globe,
    color: "#2563EB",
  },

  /**
   * ======================================================
   * MOBILE
   * ------------------------------------------------------
   * Aplicaciones diseñadas para dispositivos móviles como
   * smartphones o tablets.
   *
   * Tipos comunes:
   * - aplicaciones nativas
   * - aplicaciones híbridas
   * - aplicaciones multiplataforma
   * ======================================================
   */
  [Platform.MOBILE]: {
    es: {
      labels: "Móvil",
      description:
        "Aplicación móvil nativa, híbrida o multiplataforma.",
    },
    en: {
      labels: "Mobile",
      description:
        "Native, hybrid, or cross-platform mobile application.",
    },
    icon: Smartphone,
    color: "#10B981",
  },

  /**
   * ======================================================
   * DESKTOP
   * ------------------------------------------------------
   * Aplicaciones ejecutadas directamente en sistemas
   * operativos de escritorio como Windows, macOS o Linux.
   *
   * Ejemplos:
   * - Electron apps
   * - aplicaciones nativas
   * - herramientas profesionales
   * ======================================================
   */
  [Platform.DESKTOP]: {
    es: {
      labels: "Desktop",
      description:
        "Aplicación de escritorio ejecutada en sistemas operativos tradicionales.",
    },
    en: {
      labels: "Desktop",
      description:
        "Desktop application running on traditional operating systems.",
    },
    icon: Monitor,
    color: "#0EA5E9",
  },

  /**
   * ======================================================
   * IOT
   * ------------------------------------------------------
   * Sistemas ejecutados en dispositivos conectados o
   * sistemas embebidos.
   *
   * Incluye:
   * - sensores
   * - microcontroladores
   * - dispositivos inteligentes
   * ======================================================
   */
  [Platform.IOT]: {
    es: {
      labels: "IoT",
      description:
        "Dispositivos conectados, sensores y sistemas embebidos.",
    },
    en: {
      labels: "IoT",
      description:
        "Connected devices, sensors, and embedded systems.",
    },
    icon: Cpu,
    color: "#F59E0B",
  },

  /**
   * ======================================================
   * INDUSTRIAL
   * ------------------------------------------------------
   * Sistemas utilizados en entornos industriales para
   * automatización, monitoreo y control de procesos.
   *
   * Incluye:
   * - sistemas SCADA
   * - control industrial
   * - plataformas de producción
   * ======================================================
   */
  [Platform.INDUSTRIAL]: {
    es: {
      labels: "Industrial",
      description:
        "Sistemas de automatización, control y entornos productivos.",
    },
    en: {
      labels: "Industrial",
      description:
        "Automation, control systems, and production environments.",
    },
    icon: Factory,
    color: "#7C3AED",
  },

  /**
   * ======================================================
   * BACKEND
   * ------------------------------------------------------
   * Servicios ejecutados en el servidor encargados de
   * lógica de negocio, procesamiento y orquestación de
   * datos.
   *
   * Ejemplos:
   * - APIs
   * - microservicios
   * - servicios de procesamiento
   * ======================================================
   */
  [Platform.BACKEND]: {
    es: {
      labels: "Backend",
      description:
        "Servicios de lógica de negocio y procesamiento ejecutados en servidor.",
    },
    en: {
      labels: "Backend",
      description:
        "Business logic and processing services running on servers.",
    },
    icon: Server,
    color: "#F97316",
  },

  /**
   * ======================================================
   * API
   * ------------------------------------------------------
   * Interfaces expuestas para que otros sistemas o
   * aplicaciones puedan interactuar con el sistema.
   *
   * Puede incluir:
   * - REST APIs
   * - GraphQL
   * - gRPC
   * - servicios de integración
   * ======================================================
   */
  [Platform.API]: {
    es: {
      labels: "API",
      description:
        "Servicio expuesto para integración con otros sistemas.",
    },
    en: {
      labels: "API",
      description:
        "Service exposed for integration with other systems.",
    },
    icon: Plug,
    color: "#EF4444",
  },
};