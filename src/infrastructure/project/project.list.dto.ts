/**
 * =========================================================
 * ProjectListDTO
 * ---------------------------------------------------------
 * Data Transfer Object utilizado para representar un
 * proyecto en vistas de listado (cards, grids, resúmenes).
 *
 * Propósito:
 * - Exponer solo la información necesaria para UI.
 * - Evitar filtrar el modelo completo de base de datos.
 * - Mantener contrato estable entre backend y frontend.
 *
 * Este DTO representa una versión:
 * - Transformada
 * - Simplificada
 * - Segura para consumo público
 *
 * Nota:
 * No contiene lógica de dominio ni entidades persistentes.
 * =========================================================
 */

import { ExperienceLevel } from "@/shared/enums/experience-level.enum";
import { FeatureDomain } from "@/shared/enums/feature-domain.enum";

export type ProjectListDTO = {

  /**
   * Identificador único del proyecto.
   */
  id: string;

  /**
   * Slug único utilizado para rutas públicas.
   */
  slug: string;

  /**
   * Título del proyecto según el idioma seleccionado.
   */
  title: string;

  /**
   * Descripción corta del proyecto.
   */
  description: string;

  /**
   * Plataforma principal del proyecto (ej: web, mobile).
   */
  platform: string;

  /**
   * Tipo o categoría del proyecto.
   */
  type: string;

  /**
   * Lista de features asociadas al proyecto.
   */
  features: {
    title: string;
    description: string;
    domain: FeatureDomain;
  }[];

  /**
   * Tecnologías asociadas al proyecto.
   */
  technologies: {
    name: string;
    category: string;
    icon: string;
    experience: ExperienceLevel;
  }[];

  /**
   * URL del repositorio (ej: GitHub).
   */
  repositoryUrl: string;

  /**
   * URL pública del proyecto en producción.
   * Puede ser null si no existe despliegue.
   */
  liveUrl: string | null;

  /**
   * Imagen principal del proyecto.
   */
  imageMain: string;

  /**
   * Versión blur o placeholder optimizado de la imagen principal.
   */
  imageBlur: string;
};