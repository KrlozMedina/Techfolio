import { withAuthorization } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { PERMISSIONS } from "@/lib/auth";
import { LANGUAGES, Status, Visibility } from "@/shared/enums";
import { handleApiError } from "@/lib/http/handle-api-error";
import { querySchema } from "@/shared/interfaces/query.schema";
import z from "zod";
import { sanitizeRegex } from "@/lib/db/sanitize-regex";
import {
  createSuccessCase,
  getSuccessCases,
  getTotalSuccessCases
} from "@/services/success-cases/success-cases.service";
import { toSuccessCaseListDTO } from "@/mappers/success-case.mapper";
import { createSuccessCaseSchema } from "@/dto/success-case/success-case.create.dto";
import "@/models";

/**
 * Extiende el esquema base de query agregando filtros específicos
 * para SuccessCase.
 */
const successCaseQuerySchema = querySchema.extend({
  status: z.enum(Status).optional(),
  visibility: z.enum(Visibility).optional(),
});

/**
 * Construye dinámicamente el filtro MongoDB.
 *
 * - Aplica filtros por status y visibility si existen.
 * - Permite búsqueda full-text básica usando regex.
 * - Sanitiza el input para evitar regex injection.
 */
async function buildSuccessCaseFilter(
  search?: string,
  status?: Status,
  visibility?: Visibility
) {
  const filter: Record<string, unknown> = {};

  if (status) filter.status = status;
  if (visibility) filter.visibility = visibility;

  if (typeof search === "string" && search.trim().length > 0) {
    const safeSearch = sanitizeRegex(search.trim());

    filter.$or = [
      { "content.es.title": { $regex: safeSearch, $options: "i" } },
      { "content.en.title": { $regex: safeSearch, $options: "i" } },
      { "content.es.summary": { $regex: safeSearch, $options: "i" } },
      { "content.en.summary": { $regex: safeSearch, $options: "i" } },
      { "content.es.problem": { $regex: safeSearch, $options: "i" } },
      { "content.en.problem": { $regex: safeSearch, $options: "i" } },
      { "content.es.solution": { $regex: safeSearch, $options: "i" } },
      { "content.en.solution": { $regex: safeSearch, $options: "i" } },
    ];
  }

  return filter;
}

/**
 * GET /api/success-cases
 *
 * - Soporta paginación.
 * - Soporta filtros por status y visibility.
 * - Soporta búsqueda parcial.
 * - Resuelve idioma en el mapper.
 */
export async function GET(req: NextRequest) {
  try {
    const query = Object.fromEntries(req.nextUrl.searchParams.entries());

    const {
      limit = 10,
      page = 1,
      language = LANGUAGES.ES,
      status,
      visibility,
      search
    } = successCaseQuerySchema.parse(query);

    // Hard caps defensivos
    const safeLimit = Math.min(limit, 100);
    const safePage = Math.min(Math.max(page, 1), 1000);

    const filter = await buildSuccessCaseFilter(
      search,
      status,
      visibility
    );

    const [successCases, total] = await Promise.all([
      getSuccessCases(filter, safePage, safeLimit),
      getTotalSuccessCases(filter)
    ]);

    return NextResponse.json(
      {
        data: successCases.map((sc) =>
          toSuccessCaseListDTO(sc, language)
        ),
        pagination: {
          total,
          limit: safeLimit,
          currentPage: safePage,
          totalPages: Math.ceil(total / safeLimit)
        }
      },
      { status: 200 }
    );
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * POST /api/success-cases
 *
 * - Requiere permiso CREATE.
 * - Valida body con Zod.
 * - Crea un nuevo documento.
 */
export const POST = withAuthorization(
  PERMISSIONS.CREATE,
  async (req: NextRequest) => {
    try {
      const body = await req.json();
      const data = createSuccessCaseSchema.parse(body);

      const created = await createSuccessCase(data);

      return NextResponse.json(
        { id: created._id.toString() },
        { status: 201 }
      );
    } catch (error) {
      return handleApiError(error);
    }
  }
);
