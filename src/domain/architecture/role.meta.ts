/**
 * =========================================================
 * Role Metadata
 * ---------------------------------------------------------
 * Definición centralizada de metadatos para los distintos
 * roles técnicos que una persona puede desempeñar dentro
 * de un proyecto o sistema.
 *
 * Este archivo permite asociar a cada rol:
 * - etiquetas multilenguaje
 * - descripciones del rol y responsabilidades
 * - iconos representativos
 * - color identificador para UI
 *
 * Arquitectura:
 * - Basado en enums para tipado fuerte
 * - Uso de Record<K, V> para mapear cada rol
 * - Integración con el tipo compartido EntityMeta
 *
 * Responsabilidades:
 * - Clasificar responsabilidades dentro de proyectos
 * - Facilitar representación visual consistente en UI
 * - Servir como catálogo de roles técnicos
 *
 * Utilizado en:
 * - visualización de roles en proyectos
 * - perfiles técnicos
 * - documentación de responsabilidades
 * =========================================================
 */

import { Role } from "@/shared/enums";
import { EntityMeta } from "../shared/meta.types";
import {
  Layers,
  Monitor,
  Server,
  Cpu,
  Wifi,
  Microchip,
  CloudCog,
  Crown,
} from "lucide-react";

/**
 * =========================================================
 * ROLE_META
 * ---------------------------------------------------------
 * Mapa de metadatos asociado a cada rol definido en el
 * enum `Role`.
 *
 * Estructura:
 * Record<Role, EntityMeta>
 *
 * Cada entrada define:
 * - labels y description en múltiples idiomas
 * - icono representativo (lucide-react)
 * - color identificador utilizado en UI
 * =========================================================
 */
export const ROLE_META: Record<Role, EntityMeta> = {

  /**
   * ======================================================
   * FULL STACK
   * ------------------------------------------------------
   * Rol que abarca desarrollo tanto en frontend como
   * backend, incluyendo integración completa del sistema.
   *
   * Responsabilidades comunes:
   * - desarrollo UI
   * - desarrollo APIs
   * - integración de servicios
   * - manejo de datos
   * ======================================================
   */
  [Role.FULL_STACK]: {
    es: {
      labels: "Full Stack",
      description:
        "Participa en frontend, backend e integración completa del sistema.",
    },
    en: {
      labels: "Full Stack",
      description:
        "Works across frontend, backend, and full system integration.",
    },
    icon: Layers,
    color: "#6366F1",
  },

  /**
   * ======================================================
   * FRONTEND
   * ------------------------------------------------------
   * Rol enfocado en el desarrollo de la interfaz de usuario
   * y la experiencia del lado cliente.
   *
   * Responsabilidades:
   * - desarrollo de UI
   * - interacción del usuario
   * - accesibilidad
   * - optimización del rendimiento visual
   * ======================================================
   */
  [Role.FRONTEND]: {
    es: {
      labels: "Frontend",
      description:
        "Responsable de la interfaz de usuario y experiencia del lado cliente.",
    },
    en: {
      labels: "Frontend",
      description:
        "Responsible for user interface and client-side experience.",
    },
    icon: Monitor,
    color: "#0EA5E9",
  },

  /**
   * ======================================================
   * BACKEND
   * ------------------------------------------------------
   * Rol encargado de la lógica del servidor, APIs y
   * persistencia de datos.
   *
   * Responsabilidades:
   * - desarrollo de APIs
   * - lógica de negocio
   * - gestión de bases de datos
   * - integración de servicios
   * ======================================================
   */
  [Role.BACKEND]: {
    es: {
      labels: "Backend",
      description:
        "Encargado de lógica de negocio, APIs y persistencia.",
    },
    en: {
      labels: "Backend",
      description:
        "Handles business logic, APIs, and persistence.",
    },
    icon: Server,
    color: "#F97316",
  },

  /**
   * ======================================================
   * AUTOMATION
   * ------------------------------------------------------
   * Rol enfocado en el diseño e implementación de sistemas
   * de automatización industrial y control de procesos.
   *
   * Incluye:
   * - sistemas de control
   * - PLC
   * - integración industrial
   * ======================================================
   */
  [Role.AUTOMATION]: {
    es: {
      labels: "Automatización",
      description:
        "Diseño e implementación de sistemas de control y procesos industriales.",
    },
    en: {
      labels: "Automation Engineer",
      description:
        "Design and implementation of control systems and industrial processes.",
    },
    icon: Cpu,
    color: "#F59E0B",
  },

  /**
   * ======================================================
   * IOT
   * ------------------------------------------------------
   * Rol especializado en integración de dispositivos
   * conectados y sistemas distribuidos.
   *
   * Incluye:
   * - sensores
   * - gateways
   * - comunicación de dispositivos
   * ======================================================
   */
  [Role.IOT]: {
    es: {
      labels: "IoT Specialist",
      description:
        "Integración y desarrollo de dispositivos conectados y sistemas distribuidos.",
    },
    en: {
      labels: "IoT Specialist",
      description:
        "Development and integration of connected devices and distributed systems.",
    },
    icon: Wifi,
    color: "#10B981",
  },

  /**
   * ======================================================
   * EMBEDDED
   * ------------------------------------------------------
   * Rol enfocado en el desarrollo de firmware y software
   * para hardware dedicado o sistemas embebidos.
   *
   * Incluye:
   * - microcontroladores
   * - firmware
   * - sistemas en tiempo real
   * ======================================================
   */
  [Role.EMBEDDED]: {
    es: {
      labels: "Embebidos",
      description:
        "Desarrollo de firmware y software sobre hardware dedicado.",
    },
    en: {
      labels: "Embedded Engineer",
      description:
        "Firmware and software development on dedicated hardware.",
    },
    icon: Microchip,
    color: "#7C3AED",
  },

  /**
   * ======================================================
   * DEVOPS
   * ------------------------------------------------------
   * Rol encargado de la automatización de despliegues,
   * gestión de infraestructura y pipelines de integración
   * y entrega continua.
   *
   * Incluye:
   * - CI/CD
   * - infraestructura como código
   * - monitoreo
   * ======================================================
   */
  [Role.DEVOPS]: {
    es: {
      labels: "DevOps",
      description:
        "Automatización de despliegues, infraestructura y pipelines CI/CD.",
    },
    en: {
      labels: "DevOps Engineer",
      description:
        "Automation of deployments, infrastructure, and CI/CD pipelines.",
    },
    icon: CloudCog,
    color: "#2563EB",
  },

  /**
   * ======================================================
   * TECH LEAD
   * ------------------------------------------------------
   * Rol de liderazgo técnico encargado de definir la
   * arquitectura, estándares y guiar al equipo de
   * desarrollo.
   *
   * Responsabilidades:
   * - diseño de arquitectura
   * - revisión técnica
   * - mentoría
   * - decisiones tecnológicas
   * ======================================================
   */
  [Role.TECH_LEAD]: {
    es: {
      labels: "Tech Lead",
      description:
        "Define arquitectura, estándares técnicos y guía al equipo.",
    },
    en: {
      labels: "Technical Lead",
      description:
        "Defines architecture, technical standards, and guides the team.",
    },
    icon: Crown,
    color: "#EF4444",
  },
};