/**
 * =========================================================
 * Architecture Style Metadata
 * ---------------------------------------------------------
 * Definición centralizada de metadatos para los distintos
 * estilos arquitectónicos utilizados en el sistema.
 *
 * Este archivo permite asociar a cada estilo de arquitectura:
 * - etiquetas multilenguaje
 * - descripciones técnicas
 * - iconos representativos
 * - color identificador para UI
 *
 * Arquitectura:
 * - Basado en enums para tipado fuerte
 * - Uso de Record<K, V> para mapear entidades
 * - Integración con el tipo compartido EntityMeta
 *
 * Responsabilidades:
 * - Centralizar información descriptiva de estilos arquitectónicos
 * - Facilitar renderizado consistente en la interfaz
 * - Servir como catálogo de arquitectura dentro de la aplicación
 *
 * Utilizado en:
 * - documentación técnica en UI
 * - visualización de arquitectura de proyectos
 * - componentes que muestran metadatos de arquitectura
 * =========================================================
 */

import { ArchitectureStyle } from "@/shared/enums";
import { EntityMeta } from "@/domain/shared/meta.types";
import { Brain, Circle, Hexagon, Layers, SplitSquareVertical } from "lucide-react";

/**
 * =========================================================
 * ARCHITECTURE_STYLE_META
 * ---------------------------------------------------------
 * Mapa de metadatos asociado a cada estilo arquitectónico
 * definido en el enum `ArchitectureStyle`.
 *
 * Estructura:
 * Record<ArchitectureStyle, EntityMeta>
 *
 * Cada entrada define:
 * - labels y description en múltiples idiomas
 * - icono representativo (lucide-react)
 * - color identificador usado en UI
 * =========================================================
 */
export const ARCHITECTURE_STYLE_META: Record<
  ArchitectureStyle,
  EntityMeta
> = {

  /**
   * ======================================================
   * MVC (Model-View-Controller)
   * ------------------------------------------------------
   * Patrón arquitectónico que separa la lógica de negocio,
   * la interfaz de usuario y el control de flujo de la
   * aplicación.
   *
   * Facilita:
   * - mantenibilidad
   * - separación de responsabilidades
   * - reutilización de componentes
   * ======================================================
   */
  [ArchitectureStyle.MVC]: {
    es: {
      labels: "MVC",
      description: "Patrón que separa modelo, vista y controlador para organizar la lógica y la interfaz.",
    },
    en: {
      labels: "MVC",
      description: "Pattern that separates model, view, and controller to organize logic and interface.",
    },
    icon: SplitSquareVertical,
    color: "#2563EB",
  },

  /**
   * ======================================================
   * LAYERED ARCHITECTURE
   * ------------------------------------------------------
   * Estilo arquitectónico que organiza el sistema en capas
   * jerárquicas donde cada capa tiene responsabilidades
   * definidas y depende únicamente de capas inferiores.
   *
   * Comúnmente incluye capas como:
   * - presentación
   * - aplicación
   * - dominio
   * - infraestructura
   * ======================================================
   */
  [ArchitectureStyle.LAYERED]: {
    es: {
      labels: "Arquitectura en capas",
      description: "Organiza el sistema en capas jerárquicas con dependencias controladas.",
    },
    en: {
      labels: "Layered Architecture",
      description: "Organizes the system into hierarchical layers with controlled dependencies.",
    },
    icon: Layers,
    color: "#10B981",
  },

  /**
   * ======================================================
   * CLEAN ARCHITECTURE
   * ------------------------------------------------------
   * Arquitectura centrada en el dominio que promueve
   * independencia de frameworks, bases de datos y UI
   * mediante inversión de dependencias.
   *
   * Objetivos principales:
   * - independencia de frameworks
   * - testabilidad
   * - separación clara de responsabilidades
   * ======================================================
   */
  [ArchitectureStyle.CLEAN]: {
    es: {
      labels: "Clean Architecture",
      description: "Arquitectura centrada en el dominio y la inversión de dependencias, independiente de frameworks.",
    },
    en: {
      labels: "Clean Architecture",
      description: "Domain-centered architecture focused on dependency inversion and framework independence.",
    },
    icon: Circle,
    color: "#7C3AED",
  },

  /**
   * ======================================================
   * HEXAGONAL ARCHITECTURE
   * ------------------------------------------------------
   * También conocida como Ports and Adapters.
   *
   * Este modelo aísla el núcleo del sistema (dominio)
   * de las dependencias externas mediante interfaces
   * llamadas "puertos" y adaptadores que implementan
   * dichas interfaces.
   * ======================================================
   */
  [ArchitectureStyle.HEXAGONAL]: {
    es: {
      labels: "Arquitectura Hexagonal",
      description: "Modelo basado en puertos y adaptadores que aísla el núcleo del sistema.",
    },
    en: {
      labels: "Hexagonal Architecture",
      description: "Ports and adapters model that isolates the system core.",
    },
    icon: Hexagon,
    color: "#F59E0B",
  },

  /**
   * ======================================================
   * DOMAIN-DRIVEN DESIGN (DDD)
   * ------------------------------------------------------
   * Enfoque arquitectónico centrado en el dominio del
   * negocio mediante modelado profundo y colaboración
   * entre expertos del dominio y desarrolladores.
   *
   * Conceptos clave:
   * - bounded contexts
   * - ubiquitous language
   * - aggregates
   * - entities y value objects
   * ======================================================
   */
  [ArchitectureStyle.DDD]: {
    es: {
      labels: "Domain-Driven Design",
      description: "Enfoque estratégico y táctico basado en el modelado profundo del dominio y lenguaje ubicuo.",
    },
    en: {
      labels: "Domain-Driven Design",
      description: "Strategic and tactical approach based on deep domain modeling and ubiquitous language.",
    },
    icon: Brain,
    color: "#EF4444",
  },
};