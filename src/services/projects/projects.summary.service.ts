import connectDB from "@/lib/db/connectDB";
import { ProjectV2 } from "@/models/project/project.model";
import { Status, Language, LANGUAGES } from "@/shared/enums";

/**
 * Genera un resumen estadístico de proyectos publicados.
 *
 * Incluye:
 * - Total de proyectos
 * - Distribución por tecnologías
 * - Distribución por categorías
 * - Distribución por features
 * - Distribución por plataforma
 * - Distribución por outcome (casos)
 * - Elementos más utilizados por tipo
 *
 * Utiliza aggregation con $facet para resolver todo en una sola consulta.
 *
 * @param {Status} status - Estado del proyecto (default: PUBLISHED)
 * @param {Language} language - Idioma para campos multilenguaje
 * @returns {Promise<{
 *   filters: {
 *     technologies: any[],
 *     categories: any[],
 *     features: any[],
 *     platform: any[],
 *     outcome: any[]
 *   },
 *   stats: {
 *     totalProjects: number,
 *     totalTechnologies: number,
 *     totalCategories: number,
 *     totalFeatures: number,
 *     totalPlatform: number,
 *     mostUsed: {
 *       Technology: any | null,
 *       Category: any | null,
 *       Feature: any | null,
 *       Platform: any | null
 *     }
 *   }
 * }>}
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

    {
      $facet: {
        totalProjects: [{ $count: "count" }],

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

        platform: [
          {
            $group: { _id: "$platform", count: { $sum: 1 } }
          },
          { $project: { _id: 0, platform: "$_id", count: 1 } },
          { $sort: { platform: 1 } }
        ],

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
              from: "cases",
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