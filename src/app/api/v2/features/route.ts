import { createFeatureSchema } from "@/dto/feature/feature.create.dto";
import { PERMISSIONS, withAuthorization } from "@/lib/auth";
import { sanitizeRegex } from "@/lib/db/sanitize-regex";
import { handleApiError } from "@/lib/http/handle-api-error";
import { toFeatureListDTO } from "@/mappers/feature.mapper";
import { createFeature, getFeatures, getTotalFeatures } from "@/services/features.service";
import { LANGUAGES } from "@/shared/enums";
import { FeatureDomain } from "@/shared/enums/feature-domain.enum";
import { querySchema } from "@/shared/interfaces/query.schema";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

/**
 * Schema para validar y transformar los query params de GET /features
 * - limit: cantidad de items por página (coerción a número)
 * - page: número de página (coerción a número)
 * - language: idioma para mostrar el contenido
 * - domain: dominio/categoría de la feature
 * - search: texto a buscar en títulos o descripciones
 */
const featuresQuerySchema = querySchema.extend({
  domain: z.enum(FeatureDomain).optional(),
})

/**
 * Construye el filtro para la consulta de features en MongoDB
 * - Permite filtrar por dominio
 * - Permite búsqueda por texto en título y descripción (es y en)
 * 
 * @param search - Texto de búsqueda opcional
 * @param domain - Dominio opcional
 * @returns Filtro compatible con Mongoose
 */
function buildFeatureFilter(
  search?: string,
  domain?: FeatureDomain
) {
  const filter: Record<string, unknown> = {};

  if (domain) filter.domain = domain;

  if (typeof search === "string" && search.trim().length > 0) {
    const safeSearch = sanitizeRegex(search.trim());

    filter.$or = [
      { "content.es.title": { $regex: safeSearch, $options: "i" } },
      { "content.en.title": { $regex: safeSearch, $options: "i" } },
      { "content.es.description": { $regex: safeSearch, $options: "i" } },
      { "content.en.description": { $regex: safeSearch, $options: "i" } },
    ];
  }

  return filter;
}

/**
 * GET /features
 * Lista features con paginación, filtrado y búsqueda.
 * Protegido por permiso READ.
 */
export const GET = withAuthorization(
  PERMISSIONS.READ,
  async (req: NextRequest) => {
    try {
      // Obtiene los query params como objeto
      const query = Object.fromEntries(req.nextUrl.searchParams.entries());
  
      // Valida y transforma los query params
      const {
        limit = 10,
        page = 1,
        language = LANGUAGES.ES,
        domain,
        search
      } = featuresQuerySchema.parse(query);
  
      // Límites seguros para evitar exceso de resultados
      const safeLimit = Math.min(limit, 100);
      const safePage = Math.min(Math.max(page, 1), 1000);
  
      // Construye filtro para MongoDB
      const filter = buildFeatureFilter(search, domain);
  
      // Obtiene features y total de forma paralela
      const [features, total] = await Promise.all([
        getFeatures(filter, safePage, safeLimit),
        getTotalFeatures(filter)
      ]);
  
      // Retorna datos con paginación
      return NextResponse.json(
        {
          data: features.map((feature) =>
            toFeatureListDTO(feature, language)
          ),
          pagination: {
            total,
            limit: safeLimit,
            currentPage: safePage,
            totalPages: Math.ceil(total / safeLimit),
          },
        },
        { status: 200 }
      );
    } catch (error) {
      return handleApiError(error);
    }
  }
);

/**
 * POST /features
 * Crea una nueva feature.
 * Protegido por permiso CREATE.
 */
export const POST = withAuthorization(
  PERMISSIONS.CREATE,
  async (req: NextRequest) => {
    try {
      const body = await req.json();

      // Valida el body usando Zod
      const data = createFeatureSchema.parse(body);

      // Crea la feature en la base de datos
      const created = await createFeature(data);
  
      // Retorna solo el ID de la feature creada
      return NextResponse.json(
        { id: created._id },
        { status: 201 }
      );
    } catch (error) {
      return handleApiError(error);
    }
  }
);
