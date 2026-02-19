import { PERMISSIONS } from "@/lib/auth";
import { withAuthorization } from "@/lib/auth/withAuthorization";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";
import {
  createTechnology,
  getTechnologies,
  getTotalTechnologies,
} from "@/services/technologies/technologies.service";
import { toTechnologyListDTO } from "@/mappers/technology.mapper";
import { ExperienceLevel } from "@/shared/enums/experience-level.enum";
import { querySchema } from "@/shared/interfaces/query.schema";
import { Category } from "@/models/category/category.model";
import { sanitizeRegex } from "@/lib/db/sanitize-regex";
import { handleApiError } from "@/lib/http/handle-api-error";
import { createTechnologySchema } from "@/dto/technology/technology.create.dto";

/**
 * Extensión del query schema base para el endpoint de tecnologías.
 *
 * Permite filtrar por:
 * - experienceLevel
 * - category (slug)
 */
const technologyQuerySchema = querySchema.extend({
  experienceLevel: z.enum(ExperienceLevel).optional(),
  category: z.string().optional(), // se valida indirectamente por búsqueda
});

/**
 * Construye dinámicamente el filtro para MongoDB
 * según los parámetros de consulta recibidos.
 *
 * @param search Texto para búsqueda parcial por nombre.
 * @param experienceLevel Nivel de experiencia.
 * @param category Slug de la categoría.
 * @returns Filtro compatible con Mongoose.
 */
async function buildTechnologyFilter(
  search?: string,
  experienceLevel?: ExperienceLevel,
  category?: string
) {
  const filter: Record<string, unknown> = {};

  // Filtrado por categoría (slug → _id)
  if (category) {
    const cat = await Category.findOne({ slug: category }).select("_id");

    if (!cat) {
      // Si la categoría no existe, fuerza resultado vacío
      filter._id = null;
      return filter;
    }

    filter["categoryId"] = cat._id;
  }

  // Filtrado por nivel de experiencia
  if (experienceLevel) {
    filter.experienceLevel = experienceLevel;
  }

  // Búsqueda por nombre (case-insensitive, protegida contra regex injection)
  if (typeof search === "string" && search.trim().length > 0) {
    const safeSearch = sanitizeRegex(search.trim());

    filter.$or = [{ name: { $regex: safeSearch, $options: "i" } }];
  }

  return filter;
}

/**
 * GET /technologies
 *
 * - Requiere permiso READ.
 * - Permite paginación y filtros.
 * - Devuelve listado paginado.
 */
export const GET = withAuthorization(
  PERMISSIONS.READ,
  async (req: NextRequest) => {
    try {
      const query = Object.fromEntries(req.nextUrl.searchParams.entries());

      const {
        limit = 10,
        page = 1,
        experienceLevel,
        category,
        search,
      } = technologyQuerySchema.parse(query);

      // Protección contra abuso de paginación
      const safeLimit = Math.min(limit, 100);
      const safePage = Math.min(Math.max(page, 1), 1000);

      const filter = await buildTechnologyFilter(
        search,
        experienceLevel,
        category
      );

      const [technologies, total] = await Promise.all([
        getTechnologies(filter, safePage, safeLimit),
        getTotalTechnologies(filter),
      ]);

      return NextResponse.json(
        {
          data: technologies.map(toTechnologyListDTO),
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
 * POST /technologies
 *
 * - Requiere permiso CREATE.
 * - Valida el body con Zod.
 * - Crea una nueva tecnología.
 */
export const POST = withAuthorization(
  PERMISSIONS.CREATE,
  async (req: NextRequest) => {
    try {
      const body = await req.json();
      const data = createTechnologySchema.parse(body);

      const created = await createTechnology(data);

      return NextResponse.json(
        { id: created._id },
        { status: 201 }
      );
    } catch (error) {
      return handleApiError(error);
    }
  }
);
