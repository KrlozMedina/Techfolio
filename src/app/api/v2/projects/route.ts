import { NextRequest, NextResponse } from "next/server";
import {
  createProject,
  getProjects,
  getTotalProjects
} from "@/services/projects/projects.service";
import { LANGUAGES, Platform, Status } from "@/shared/enums";
import { toProjectListDTO } from "@/mappers/project.mapper";
import { handleApiError } from "@/lib/http/handle-api-error";
import { PERMISSIONS, withAuthorization } from "@/lib/auth";
import { createProjectSchema } from "@/dto/project/project.create.dto";
import { sanitizeRegex } from "@/lib/db/sanitize-regex";
import { Technology } from "@/models/technology/technology.model";
import { Feature } from "@/models/features/feature.model";
import "@/models";
import { querySchema } from "@/shared/interfaces/query.schema";
import z from "zod";

/**
 * Extiende el schema base de query para permitir:
 * - status
 * - technology (slug)
 * - platform
 * - feature (slug)
 */
const projectQuerySchema = querySchema.extend({
  status: z.enum(Status).optional(),
  technology: z.string().optional(),
  platform: z.enum(Platform).optional(),
  feature: z.string().optional(),
});

/**
 * Construye dinámicamente el filtro Mongo en base
 * a los parámetros de query recibidos.
 *
 * - Convierte slugs (technology, feature) a ObjectId.
 * - Aplica filtro por status y platform.
 * - Aplica búsqueda textual segura usando regex sanitizada.
 */
async function buildProjectFilter(
  status?: Status,
  search?: string,
  technology?: string,
  platform?: Platform,
  feature?: string,
) {
  const filter: Record<string, unknown> = {};

  if (technology) {
    const tech = await Technology.findOne({ slug: technology }).select("_id");

    if (!tech) {
      filter._id = null;
      return filter;
    }

    filter["relations.technologyIds"] = tech._id;
  }

  if (feature) {
    const feat = await Feature.findOne({ slug: feature }).select("_id");

    if (!feat) {
      filter._id = null;
      return filter;
    }

    filter["relations.featureIds"] = feat._id;
  }

  if (status) filter.status = status;
  if (platform) filter.platform = platform;

  if (search) {
    const safeSearch = sanitizeRegex(search);
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
 * GET /api/projects
 *
 * Lista proyectos con:
 * - Filtros dinámicos
 * - Búsqueda textual
 * - Paginación
 * - Selección de idioma
 *
 * Query params:
 * - status (opcional)
 * - technology (slug, opcional)
 * - feature (slug, opcional)
 * - platform (opcional)
 * - search (opcional)
 * - page (default 1)
 * - limit (default 10, max 100)
 * - language (opcional)
 *
 * Respuesta:
 * {
 *   data: ProjectListDTO[],
 *   pagination: {
 *     total: number,
 *     limit: number,
 *     currentPage: number,
 *     totalPages: number
 *   }
 * }
 */
export async function GET(req: NextRequest) {
  try {
    const query = Object.fromEntries(req.nextUrl.searchParams.entries());

    const {
      status,
      search,
      technology,
      platform,
      feature,
      limit = 10,
      page = 1,
      language = LANGUAGES.ES,
    } = projectQuerySchema.parse(query);

    const safeLimit = Math.min(limit, 100);
    const safePage = Math.min(Math.max(page, 1), 1000);

    const filter = await buildProjectFilter(
      status,
      search,
      technology,
      platform,
      feature
    );

    const [projects, total] = await Promise.all([
      getProjects(filter, safePage, safeLimit),
      getTotalProjects(filter),
    ]);

    const response = {
      data: projects.map(p => toProjectListDTO(p, language)),
      pagination: {
        total,
        limit: safeLimit,
        currentPage: safePage,
        totalPages: Math.ceil(total / safeLimit),
      },
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * POST /api/projects
 *
 * Crea un nuevo proyecto.
 * - Requiere permiso CREATE.
 * - Valida body con schema Zod.
 *
 * Respuestas:
 * - 201: Proyecto creado
 * - 400: Body inválido
 */
export const POST = withAuthorization(
  PERMISSIONS.CREATE,
  async (req: NextRequest) => {
    try {
      const body = await req.json();
      const data = createProjectSchema.parse(body);
      const created = await createProject(data);

      return NextResponse.json(
        { id: created._id },
        { status: 201 }
      );
    } catch (error) {
      return handleApiError(error);
    }
  }
);
