/**
 * =========================================================
 * Technology Mappers
 * ---------------------------------------------------------
 * Este módulo contiene funciones de transformación (mappers)
 * que convierten documentos de MongoDB (`TechnologyDocument`)
 * en DTOs utilizados por la aplicación.
 *
 * Los mappers permiten desacoplar el modelo de persistencia
 * (MongoDB / Mongoose) de los contratos expuestos por la API
 * o utilizados en la capa de aplicación.
 *
 * DTOs soportados:
 * - TechnologyListDTO   → versión ligera para listados
 * - TechnologyEntityDTO → versión completa de entidad
 *
 * Arquitectura:
 * - Ubicado en la capa de infraestructura
 * - Adaptador entre modelos de base de datos y DTOs
 *
 * Responsabilidades:
 * - Convertir `_id` de MongoDB a string
 * - Reducir estructura para listados
 * - Transformar relaciones populadas (ej. categoría)
 *
 * Utilizado en:
 * - servicios de aplicación
 * - endpoints de API
 * - respuestas GET de tecnologías
 * =========================================================
 */

import { TechnologyEntityDTO } from "@/infrastructure/technology/technology.entity.dto";
import { TechnologyListDTO } from "@/infrastructure/technology/technology.list.dto";
import { TechnologyDocument } from "@/models/technology/technology.document";

/**
 * =========================================================
 * toTechnologyListDTO
 * ---------------------------------------------------------
 * Transforma un documento de MongoDB (`TechnologyDocument`)
 * en un DTO ligero optimizado para listados.
 *
 * Características:
 * - Convierte `_id` a string
 * - Expone solo propiedades esenciales
 * - Reduce el tamaño del payload
 *
 * Uso típico:
 * - endpoints paginados
 * - tablas o grids de tecnologías
 * - selectores de tecnologías
 *
 * @param technology Documento proveniente del modelo
 * @returns Objeto en formato `TechnologyListDTO`
 * =========================================================
 */
export function toTechnologyListDTO(
  technology: TechnologyDocument,
): TechnologyListDTO {
  return {
    id: technology._id.toString(),
    name: technology.name,
    icon: technology.iconUrl,
    website: technology.websiteUrl,
  };
}

/**
 * =========================================================
 * toTechnologyEntityDTO
 * ---------------------------------------------------------
 * Transforma un documento de MongoDB (`TechnologyDocument`)
 * en un DTO completo de entidad.
 *
 * Requisitos:
 * - `categoryId` debe estar populado en la consulta
 *   ya que se accede a `categoryId.slug`.
 *
 * Características:
 * - Expone información ampliada de la tecnología
 * - Incluye categoría legible
 * - Incluye nivel de experiencia
 *
 * Uso típico:
 * - endpoints GET /technologies/:id
 * - vistas detalladas
 *
 * @param technology Documento proveniente del modelo
 * @returns Objeto en formato `TechnologyEntityDTO`
 * =========================================================
 */
export function toTechnologyEntityDTO(
  technology: TechnologyDocument
): TechnologyEntityDTO {
  return {
    id: technology._id.toString(),
    category: technology.categoryId.slug,
    name: technology.name,
    icon: technology.iconUrl,
    website: technology.websiteUrl,
    experienceLevel: technology.experienceLevel,
  };
}