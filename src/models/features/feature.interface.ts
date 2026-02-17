import { FeatureDomain } from "@/shared/enums/feature-domain.enum";
import { IPaginationData } from "@/shared/interfaces/pagination.interface";
import { Types } from "mongoose";

/**
 * Representa la entidad Feature tal como existe en base de datos.
 *
 * Incluye:
 * - Identificador (_id)
 * - Slug único
 * - Contenido multilenguaje (es, en)
 * - Dominio funcional (FeatureDomain)
 * - Timestamps opcionales
 */
export interface IFeature {
  /** Identificador único (ObjectId o string serializado) */
  _id: Types.ObjectId | string;

  /** Slug único para rutas o identificación pública */
  slug: string;

  /**
   * Contenido localizado por idioma.
   * Permite internacionalización (i18n).
   */
  content: {
    es: {
      title: string;
      description: string;
    };
    en: {
      title: string;
      description: string;
    };
  };

  /** Dominio al que pertenece la feature */
  domain: FeatureDomain;

  /** Fecha de creación */
  createdAt?: Date;

  /** Fecha de última actualización */
  updatedAt?: Date;
}

/**
 * Versión ligera de Feature para listados.
 *
 * Se utiliza en endpoints paginados
 * donde no se requiere toda la estructura interna.
 */
export interface IFeatureList {
  /** ID serializado */
  id: string;

  /** Título según idioma seleccionado */
  title: string;

  /** Descripción resumida */
  description: string;

  /** Dominio funcional */
  domain: FeatureDomain;
}

/**
 * Respuesta paginada de features.
 *
 * Contiene:
 * - Lista de elementos transformados
 * - Metadatos de paginación
 */
export interface IFeaturePaginated {
  data: IFeatureList[];
  pagination: IPaginationData;
}
