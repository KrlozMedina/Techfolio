/**
 * =========================================================
 * Architecture Communication Metadata
 * ---------------------------------------------------------
 * Definición centralizada de metadatos para los distintos
 * tipos de comunicación entre componentes dentro de una
 * arquitectura de software.
 *
 * Este archivo actúa como una capa de configuración que
 * permite asociar a cada tipo de comunicación:
 *
 * - etiquetas multilenguaje
 * - descripciones técnicas
 * - iconos representativos
 * - color identificador
 *
 * Arquitectura:
 * - Basado en enums para tipado fuerte
 * - Uso de Record<K, V> para mapear entidades
 * - Integración con sistema de metadatos (EntityMeta)
 *
 * Responsabilidades:
 * - Proveer información descriptiva de protocolos
 * - Centralizar configuración visual para UI
 * - Facilitar renderizado de etiquetas e iconos en la interfaz
 *
 * Utilizado en:
 * - visualización de arquitecturas
 * - documentación técnica en UI
 * - diagramas o listados de tecnologías
 * =========================================================
 */

import { ArchitectureCommunication } from "@/shared/enums";
import { EntityMeta } from "../shared/meta.types";
import {
  Globe,
  GitBranch,
  Activity,
  Zap,
  Wifi,
  Cpu,
  Database,
} from "lucide-react";

/**
 * =========================================================
 * ARCHITECTURE_COMMUNICATION_META
 * ---------------------------------------------------------
 * Mapa de metadatos asociado a cada tipo de comunicación
 * definido en el enum `ArchitectureCommunication`.
 *
 * Estructura:
 * Record<ArchitectureCommunication, EntityMeta>
 *
 * Cada entrada define:
 * - labels y description en múltiples idiomas
 * - icono representativo (lucide-react)
 * - color identificador usado en UI
 * =========================================================
 */
export const ARCHITECTURE_COMMUNICATION_META: Record<
  ArchitectureCommunication,
  EntityMeta
> = {

  /**
   * ======================================================
   * REST
   * ------------------------------------------------------
   * Arquitectura basada en HTTP que sigue el modelo
   * request-response. Es el estándar más común en APIs
   * web modernas.
   * ======================================================
   */
  [ArchitectureCommunication.REST]: {
    es: {
      labels: "REST",
      description: "Arquitectura basada en HTTP bajo el modelo request-response.",
    },
    en: {
      labels: "REST",
      description: "HTTP-based architecture following the request-response model.",
    },
    icon: Globe,
    color: "#2563EB",
  },

  /**
   * ======================================================
   * GRAPHQL
   * ------------------------------------------------------
   * Lenguaje de consultas para APIs que permite a los
   * clientes solicitar exactamente los datos que necesitan.
   * ======================================================
   */
  [ArchitectureCommunication.GRAPHQL]: {
    es: {
      labels: "GraphQL",
      description:
        "API basada en consultas tipadas que permite solicitar solo los datos necesarios.",
    },
    en: {
      labels: "GraphQL",
      description:
        "Typed query-based API that allows requesting only the necessary data.",
    },
    icon: GitBranch, // representa bien el concepto de grafo
    color: "#E10098",
  },

  /**
   * ======================================================
   * WEBSOCKET
   * ------------------------------------------------------
   * Protocolo que permite comunicación bidireccional
   * persistente entre cliente y servidor en tiempo real.
   * ======================================================
   */
  [ArchitectureCommunication.WEBSOCKET]: {
    es: {
      labels: "WebSocket",
      description:
        "Comunicación bidireccional en tiempo real sobre una conexión persistente.",
    },
    en: {
      labels: "WebSocket",
      description:
        "Real-time bidirectional communication over a persistent connection.",
    },
    icon: Activity,
    color: "#10B981",
  },

  /**
   * ======================================================
   * EVENT DRIVEN
   * ------------------------------------------------------
   * Arquitectura basada en eventos donde los servicios
   * reaccionan a eventos emitidos por otros componentes.
   * ======================================================
   */
  [ArchitectureCommunication.EVENT_DRIVEN]: {
    es: {
      labels: "Arquitectura orientada a eventos",
      description:
        "Comunicación asíncrona donde los servicios reaccionan a eventos publicados.",
    },
    en: {
      labels: "Event-driven architecture",
      description:
        "Asynchronous communication where services react to published events.",
    },
    icon: Zap,
    color: "#F59E0B",
  },

  /**
   * ======================================================
   * MQTT
   * ------------------------------------------------------
   * Protocolo ligero de mensajería basado en el modelo
   * publish/subscribe, ampliamente utilizado en sistemas
   * IoT y dispositivos con recursos limitados.
   * ======================================================
   */
  [ArchitectureCommunication.MQTT]: {
    es: {
      labels: "MQTT",
      description:
        "Protocolo ligero de mensajería publish/subscribe, común en IoT.",
    },
    en: {
      labels: "MQTT",
      description:
        "Lightweight publish/subscribe messaging protocol, common in IoT.",
    },
    icon: Wifi,
    color: "#0EA5E9",
  },

  /**
   * ======================================================
   * OPC UA
   * ------------------------------------------------------
   * Estándar industrial para interoperabilidad entre
   * sistemas de automatización y control industrial.
   * ======================================================
   */
  [ArchitectureCommunication.OPCUA]: {
    es: {
      labels: "OPC UA",
      description:
        "Estándar industrial para interoperabilidad en sistemas de automatización.",
    },
    en: {
      labels: "OPC UA",
      description:
        "Industrial standard for interoperability in automation systems.",
    },
    icon: Cpu,
    color: "#7C3AED",
  },

  /**
   * ======================================================
   * JDBC
   * ------------------------------------------------------
   * API utilizada en entornos Java para conectarse y
   * ejecutar consultas sobre bases de datos relacionales.
   * ======================================================
   */
  [ArchitectureCommunication.JDBC]: {
    es: {
      labels: "JDBC",
      description:
        "API para conexión y ejecución de consultas en bases de datos relacionales.",
    },
    en: {
      labels: "JDBC",
      description:
        "API for connecting and executing queries on relational databases.",
    },
    icon: Database,
    color: "#6B7280",
  },
};