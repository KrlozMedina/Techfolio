import connectDB from "@/lib/db/connectDB";
import { Language } from "@/lib/i18n";
import { LANGUAGES } from "@/lib/i18n/language";
import { ProjectV2 } from "@/models/project/project.model";
import { Status } from "@/shared/enums";

/**
 * =========================================================
 * getProjectsSummary
 * ---------------------------------------------------------
 * Genera un resumen estadístico de los proyectos almacenados
 * en la base de datos utilizando una agregación de MongoDB.
 *
 * Esta función está pensada para alimentar:
 * - filtros dinámicos en la UI
 * - dashboards analíticos
 * - estadísticas del portafolio
 *
 * Utiliza una única consulta con `$facet`, lo que permite
 * obtener múltiples métricas en paralelo evitando múltiples
 * consultas a la base de datos.
 *
 * =========================================================
 * Información generada
 * ---------------------------------------------------------
 * Filters:
 * - technologies → tecnologías utilizadas y su frecuencia
 * - categories   → categorías asociadas a las tecnologías
 * - features     → funcionalidades utilizadas en proyectos
 * - platform     → plataformas de los proyectos
 * - outcome      → casos de éxito asociados
 *
 * Stats:
 * - totalProjects
 * - totalTechnologies
 * - totalCategories
 * - totalFeatures
 * - totalPlatform
 * - mostUsed por tipo
 *
 * =========================================================
 * Flujo de la agregación
 * ---------------------------------------------------------
 * 1. Filtrar proyectos por estado
 * 2. Proyectar solo los campos necesarios
 * 3. Ejecutar múltiples pipelines paralelos con `$facet`
 * 4. Agrupar resultados y calcular frecuencias
 * 5. Generar estadísticas derivadas
 *
 * =========================================================
 * @param status
 * Estado del proyecto a considerar.
 * Default: Status.PUBLISHED
 *
 * @param language
 * Idioma utilizado para resolver campos localizados.
 * Default: LANGUAGES.ES
 *
 * @returns Resumen estadístico del portafolio
 *
 * =========================================================
 */
export async function getProjectsSummary(
  status: Status = Status.PUBLISHED,
  language: Language = LANGUAGES.ES
) {
  await connectDB();

  const [result] = await ProjectV2.aggregate([
    { $match: { status } },

    {
      $project: {
        "relations.technologyIds": 1,
        "relations.categoryIds": 1,
        "relations.featureIds": 1,
        platform: 1,
        outcome: 1
      }
    },

    /**
     * ======================================================
     * FACET
     * ------------------------------------------------------
     * Ejecuta múltiples agregaciones en paralelo.
     * Cada pipeline genera un tipo de filtro o estadística.
     * ======================================================
     */
    {
      $facet: {

        /** ================================
         * Total de proyectos
         * ================================ */
        totalProjects: [{ $count: "count" }],

        /** ================================
         * Tecnologías utilizadas
         * ================================ */
        technologies: [
          {
            $lookup: {
              from: "technologies",
              localField: "relations.technologyIds",
              foreignField: "_id",
              pipeline: [
                {
                  $lookup: {
                    from: "categories",
                    localField: "categoryId",
                    foreignField: "_id",
                    as: "categoryData"
                  }
                },
                { $unwind: "$categoryData" },
                {
                  $project: {
                    name: 1,
                    slug: 1,
                    iconUrl: 1,
                    experienceLevel: 1,
                    category: `$categoryData.content.${language}.title`
                  }
                }
              ],
              as: "technologies"
            }
          },
          { $unwind: "$technologies" },
          {
            $group: {
              _id: "$technologies.name",
              count: { $sum: 1 },
              slug: { $first: "$technologies.slug" },
              icon: { $first: "$technologies.iconUrl" },
              experience: { $first: "$technologies.experienceLevel" },
              category: { $first: "$technologies.category" }
            }
          },
          { $sort: { count: -1 } },
          {
            $project: {
              _id: 0,
              name: "$_id",
              slug: 1,
              count: 1,
              icon: 1,
              experience: 1,
              category: 1
            }
          }
        ],

        /** ================================
         * Categorías de tecnologías
         * ================================ */
        categories: [
          {
            $lookup: {
              from: "technologies",
              localField: "relations.technologyIds",
              foreignField: "_id",
              as: "technologies"
            }
          },
          { $unwind: "$technologies" },
          {
            $group: {
              _id: "$technologies.categoryId",
              count: { $sum: 1 }
            }
          },
          {
            $lookup: {
              from: "categories",
              localField: "_id",
              foreignField: "_id",
              as: "category"
            }
          },
          { $unwind: "$category" },
          {
            $project: {
              _id: 0,
              id: "$_id",
              slug: "$category.slug",
              name: `$category.content.${language}.title`,
              count: 1
            }
          },
          { $sort: { name: 1 } }
        ],

        /** ================================
         * Features utilizadas
         * ================================ */
        features: [
          {
            $lookup: {
              from: "features",
              localField: "relations.featureIds",
              foreignField: "_id",
              pipeline: [
                { $project: { slug: 1, name: `$content.${language}.title` } }
              ],
              as: "features"
            }
          },
          { $unwind: "$features" },
          {
            $group: {
              _id: "$features._id",
              name: { $first: "$features.name" },
              slug: { $first: "$features.slug" },
              count: { $sum: 1 }
            }
          },
          { $sort: { name: 1 } },
          { $project: { _id: 0, id: "$_id", name: 1, slug: 1, count: 1 } }
        ],

        /** ================================
         * Plataforma de los proyectos
         * ================================ */
        platform: [
          {
            $group: { _id: "$platform", count: { $sum: 1 } }
          },
          { $project: { _id: 0, platform: "$_id", count: 1 } },
          { $sort: { platform: 1 } }
        ],

        /** ================================
         * Casos de éxito asociados
         * ================================ */
        outcome: [
          {
            $addFields: {
              outcome: {
                $cond: [
                  { $eq: [{ $type: "$outcome" }, "string"] },
                  { $toObjectId: "$outcome" },
                  "$outcome"
                ]
              }
            }
          },
          {
            $lookup: {
              from: "successCases",
              localField: "outcome",
              foreignField: "_id",
              as: "outcome"
            }
          },
          { $unwind: "$outcome" },
          {
            $group: {
              _id: "$outcome._id",
              slug: { $first: "$outcome.slug" },
              title: { $first: `$outcome.content.${language}.title` },
              solution: { $first: `$outcome.content.${language}.solution` },
              media: { $first: "$outcome.media" },
              count: { $sum: 1 }
            }
          },
          { $sort: { count: -1 } },
          {
            $project: {
              _id: 0,
              id: "$_id",
              slug: 1,
              title: 1,
              solution: 1,
              media: 1,
              count: 1
            }
          }
        ]
      }
    }
  ]);

  const {
    technologies = [],
    categories = [],
    features = [],
    platform = [],
    outcome = [],
    totalProjects = []
  } = result || {};

  const total = totalProjects[0]?.count ?? 0;

  /**
   * Devuelve el elemento más utilizado dentro
   * de un conjunto de estadísticas.
   */
  const getMostUsed = (arr: any[]) =>
    arr.length
      ? arr.reduce((max, item) => (item.count > max.count ? item : max))
      : null;

  return {
    filters: { technologies, categories, features, platform, outcome },
    stats: {
      totalProjects: total,
      totalTechnologies: technologies.length,
      totalCategories: categories.length,
      totalFeatures: features.length,
      totalPlatform: platform.length,
      mostUsed: {
        Technology: getMostUsed(technologies),
        Category: getMostUsed(categories),
        Feature: getMostUsed(features),
        Platform: getMostUsed(platform)
      }
    }
  };
}