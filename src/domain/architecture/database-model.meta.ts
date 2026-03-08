/**
 * =========================================================
 * Database Model Metadata
 * ---------------------------------------------------------
 * Definición centralizada de metadatos para los diferentes
 * modelos de bases de datos utilizados en el sistema.
 *
 * Este archivo permite asociar a cada modelo de base de datos:
 * - etiquetas multilenguaje
 * - descripciones técnicas
 * - iconos representativos
 * - color identificador para UI
 *
 * Arquitectura:
 * - Basado en enums para garantizar tipado fuerte
 * - Uso de Record<K, V> para mapear cada modelo
 * - Integración con el tipo compartido EntityMeta
 *
 * Responsabilidades:
 * - Centralizar información sobre modelos de datos
 * - Facilitar representación visual en la interfaz
 * - Servir como catálogo de paradigmas de almacenamiento
 *
 * Utilizado en:
 * - visualización de stack tecnológico
 * - documentación técnica de proyectos
 * - componentes que muestran metadatos de base de datos
 * =========================================================
 */

import { DatabaseModel } from "@/shared/enums";
import { EntityMeta } from "../shared/meta.types";
import {
  Table,
  FileJson,
  Key,
  Share2,
  Clock,
  Layers,
} from "lucide-react";

/**
 * =========================================================
 * DATABASE_MODEL_META
 * ---------------------------------------------------------
 * Mapa de metadatos asociado a cada modelo de base de datos
 * definido en el enum `DatabaseModel`.
 *
 * Estructura:
 * Record<DatabaseModel, EntityMeta>
 *
 * Cada entrada define:
 * - labels y description en múltiples idiomas
 * - icono representativo (lucide-react)
 * - color identificador utilizado en UI
 * =========================================================
 */
export const DATABASE_MODEL_META: Record<
  DatabaseModel,
  EntityMeta
> = {

  /**
   * ======================================================
   * RELATIONAL DATABASE
   * ------------------------------------------------------
   * Modelo de datos basado en tablas con filas y columnas,
   * donde las relaciones entre entidades se representan
   * mediante claves primarias y foráneas.
   *
   * Tecnologías comunes:
   * - PostgreSQL
   * - MySQL
   * - SQL Server
   * - Oracle
   * ======================================================
   */
  [DatabaseModel.RELATIONAL]: {
    es: {
      labels: "Relacional",
      description:
        "Datos organizados en tablas con relaciones mediante claves y consultas SQL.",
    },
    en: {
      labels: "Relational",
      description:
        "Data organized in tables with relationships using keys and SQL queries.",
    },
    icon: Table,
    color: "#2563EB",
  },

  /**
   * ======================================================
   * DOCUMENT DATABASE
   * ------------------------------------------------------
   * Modelo NoSQL basado en documentos donde los datos se
   * almacenan como estructuras tipo JSON o BSON con
   * esquemas flexibles.
   *
   * Tecnologías comunes:
   * - MongoDB
   * - CouchDB
   * - Firestore
   * ======================================================
   */
  [DatabaseModel.DOCUMENT]: {
    es: {
      labels: "Documental",
      description:
        "Almacenamiento basado en documentos tipo JSON/BSON con esquema flexible.",
    },
    en: {
      labels: "Document",
      description:
        "Document-based storage using flexible JSON/BSON structures.",
    },
    icon: FileJson,
    color: "#10B981",
  },

  /**
   * ======================================================
   * KEY-VALUE DATABASE
   * ------------------------------------------------------
   * Modelo de almacenamiento extremadamente simple donde
   * cada elemento se guarda como un par clave-valor.
   *
   * Optimizado para:
   * - alto rendimiento
   * - baja latencia
   * - caching
   *
   * Tecnologías comunes:
   * - Redis
   * - DynamoDB
   * - Riak
   * ======================================================
   */
  [DatabaseModel.KEY_VALUE]: {
    es: {
      labels: "Clave-Valor",
      description:
        "Estructura simple basada en pares clave-valor optimizada para alto rendimiento.",
    },
    en: {
      labels: "Key-Value",
      description:
        "Simple key-value structure optimized for high performance.",
    },
    icon: Key,
    color: "#F59E0B",
  },

  /**
   * ======================================================
   * GRAPH DATABASE
   * ------------------------------------------------------
   * Modelo de datos basado en nodos y relaciones que
   * permite representar y consultar estructuras altamente
   * conectadas.
   *
   * Ideal para:
   * - redes sociales
   * - motores de recomendación
   * - análisis de relaciones
   *
   * Tecnologías comunes:
   * - Neo4j
   * - Amazon Neptune
   * - ArangoDB
   * ======================================================
   */
  [DatabaseModel.GRAPH]: {
    es: {
      labels: "Grafos",
      description:
        "Modelo basado en nodos y relaciones, ideal para datos altamente conectados.",
    },
    en: {
      labels: "Graph",
      description:
        "Node and relationship-based model ideal for highly connected data.",
    },
    icon: Share2,
    color: "#7C3AED",
  },

  /**
   * ======================================================
   * TIME SERIES DATABASE
   * ------------------------------------------------------
   * Modelo optimizado para almacenar datos indexados por
   * tiempo, permitiendo consultas eficientes sobre
   * secuencias temporales.
   *
   * Usos comunes:
   * - métricas de sistemas
   * - monitoreo
   * - telemetría
   * - IoT
   *
   * Tecnologías comunes:
   * - InfluxDB
   * - TimescaleDB
   * - Prometheus
   * ======================================================
   */
  [DatabaseModel.TIMESERIES]: {
    es: {
      labels: "Series Temporales",
      description:
        "Optimizado para datos indexados por tiempo como métricas y telemetría.",
    },
    en: {
      labels: "Time Series",
      description:
        "Optimized for time-indexed data such as metrics and telemetry.",
    },
    icon: Clock,
    color: "#0EA5E9",
  },

  /**
   * ======================================================
   * HYBRID DATABASE
   * ------------------------------------------------------
   * Motores de base de datos que combinan múltiples
   * paradigmas de almacenamiento en una misma plataforma.
   *
   * Permiten manejar diferentes modelos de datos dentro
   * de un mismo sistema.
   *
   * Tecnologías comunes:
   * - ArangoDB
   * - Cosmos DB
   * - OrientDB
   * ======================================================
   */
  [DatabaseModel.HYBRID]: {
    es: {
      labels: "Híbrido",
      description:
        "Combina múltiples paradigmas de almacenamiento en un mismo motor.",
    },
    en: {
      labels: "Hybrid",
      description:
        "Combines multiple storage paradigms within the same engine.",
    },
    icon: Layers,
    color: "#6B7280",
  },
};