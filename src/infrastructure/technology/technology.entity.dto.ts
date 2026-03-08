/**
 * =========================================================
 * Technology Entity DTO
 * ---------------------------------------------------------
 * Define la estructura de datos que representa una
 * Tecnología completa dentro de la capa de aplicación.
 *
 * Este DTO extiende `TechnologyListDTO` para incluir
 * información adicional que no siempre es necesaria
 * en vistas de listado.
 *
 * Diferencia principal:
 * - TechnologyListDTO → usado para listados
 * - TechnologyEntityDTO → usado para respuestas completas
 *
 * Arquitectura:
 * - DTO de salida de la capa de aplicación
 * - utilizado en transformaciones desde el modelo
 *   de persistencia (MongoDB / Mongoose)
 * - desacopla la base de datos del contrato de API
 *
 * Responsabilidades:
 * - representar una tecnología con información ampliada
 * - exponer el nombre legible de la categoría
 * - incluir el nivel de experiencia asociado
 *
 * Utilizado en:
 * - endpoints GET /technologies/:id
 * - mappers de infraestructura
 * - servicios de aplicación
 * =========================================================
 */

import { ExperienceLevel } from "@/shared/enums/experience-level.enum";
import { TechnologyListDTO } from "./technology.list.dto";

/**
 * =========================================================
 * TechnologyEntityDTO
 * ---------------------------------------------------------
 * DTO que representa la entidad completa de Tecnología
 * en la capa de aplicación o salida de la API.
 *
 * Extiende `TechnologyListDTO` agregando:
 * - categoría ya transformada desde ObjectId
 * - nivel de experiencia asociado
 * =========================================================
 */
export interface TechnologyEntityDTO extends TechnologyListDTO {

  /**
   * Nombre o identificador legible de la categoría
   * asociada a la tecnología.
   *
   * Este valor ya ha sido transformado desde el ObjectId
   * almacenado en la base de datos.
   */
  category: string;

  /**
   * Nivel de experiencia asociado a la tecnología.
   *
   * Se basa en el enum `ExperienceLevel` para garantizar
   * valores consistentes dentro del sistema.
   */
  experienceLevel: ExperienceLevel;
}