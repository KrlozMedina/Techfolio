/**
 * =========================================================
 * Visibility Metadata
 * ---------------------------------------------------------
 * Definición centralizada de metadatos para los niveles de
 * visibilidad de recursos dentro del sistema.
 *
 * Este archivo permite asociar a cada nivel de visibilidad:
 * - etiquetas multilenguaje
 * - descripciones del alcance de acceso
 * - iconos representativos
 * - color identificador para UI
 *
 * Arquitectura:
 * - Basado en enums para tipado fuerte
 * - Uso de Record<K, V> para mapear cada nivel
 * - Integración con el tipo compartido EntityMeta
 *
 * Responsabilidades:
 * - Estandarizar niveles de acceso a recursos
 * - Facilitar representación visual consistente en UI
 * - Servir como catálogo semántico de visibilidad
 *
 * Utilizado en:
 * - gestión de contenido
 * - control de acceso en UI
 * - visualización de estado de recursos
 * =========================================================
 */

import { Visibility } from "@/shared/enums";
import { EntityMeta } from "../shared/meta.types";
import {
  Globe,
  Lock,
  FileEdit,
} from "lucide-react";

/**
 * =========================================================
 * VISIBILITY_META
 * ---------------------------------------------------------
 * Mapa de metadatos asociado a cada nivel de visibilidad
 * definido en el enum `Visibility`.
 *
 * Estructura:
 * Record<Visibility, EntityMeta>
 *
 * Cada entrada define:
 * - labels y description en múltiples idiomas
 * - icono representativo (lucide-react)
 * - color identificador utilizado en UI
 * =========================================================
 */
export const VISIBILITY_META: Record<Visibility, EntityMeta> = {

  /**
   * ======================================================
   * PUBLIC
   * ------------------------------------------------------
   * Nivel de visibilidad donde el recurso puede ser
   * accedido por cualquier usuario sin restricciones.
   *
   * Características:
   * - acceso abierto
   * - visible públicamente
   * - no requiere autenticación
   * ======================================================
   */
  [Visibility.PUBLIC]: {
    es: {
      labels: "Público",
      description:
        "Visible para cualquier usuario sin restricciones.",
    },
    en: {
      labels: "Public",
      description:
        "Visible to any user without restrictions.",
    },
    icon: Globe,
    color: "#10B981", // verde accesible
  },

  /**
   * ======================================================
   * PRIVATE
   * ------------------------------------------------------
   * Nivel de visibilidad restringido donde el recurso
   * solo puede ser accedido por usuarios autenticados
   * o con permisos específicos.
   *
   * Características:
   * - acceso controlado
   * - requiere autenticación
   * - puede requerir roles o permisos
   * ======================================================
   */
  [Visibility.PRIVATE]: {
    es: {
      labels: "Privado",
      description:
        "Accesible únicamente para usuarios autenticados o con permisos específicos.",
    },
    en: {
      labels: "Private",
      description:
        "Accessible only to authenticated users or specific permissions.",
    },
    icon: Lock,
    color: "#EF4444", // rojo restricción
  },

  /**
   * ======================================================
   * DRAFT
   * ------------------------------------------------------
   * Estado preliminar donde el recurso se encuentra
   * en proceso de creación o edición y aún no está
   * disponible públicamente.
   *
   * Características:
   * - contenido en desarrollo
   * - visible solo para editores o creadores
   * - no accesible públicamente
   * ======================================================
   */
  [Visibility.DRAFT]: {
    es: {
      labels: "Borrador",
      description:
        "Recurso en estado preliminar no visible públicamente.",
    },
    en: {
      labels: "Draft",
      description:
        "Preliminary resource not publicly visible.",
    },
    icon: FileEdit,
    color: "#9CA3AF", // gris edición
  },
};