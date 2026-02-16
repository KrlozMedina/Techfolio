import { createCategorySchema } from "@/dto/category/category.create.dto";
import { PERMISSIONS } from "@/lib/auth/permissions";
import { withAuthorization } from "@/lib/auth/withAuthorization";
import { sanitizeRegex } from "@/lib/db/sanitize-regex";
import { handleApiError } from "@/lib/http/handle-api-error";
import { toCategoryListDTO } from "@/mappers/category.mapper";
import {
  createCategory,
  getCategories,
  getTotalCategories,
} from "@/services/category.service";
import { LANGUAGES } from "@/shared/enums";
import { querySchema } from "@/shared/interfaces/query.schema";
import { NextRequest, NextResponse } from "next/server";

/**
 * Construye el filtro dinámico para búsqueda.
 *
 * - Sanitiza la expresión para evitar inyección Regex.
 * - Realiza búsqueda case-insensitive.
 * - Busca en título y descripción en ambos idiomas.
 */
function buildCategoryFilter(search?: string) {
  const filter: Record<string, unknown> = {};

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
 * GET /categories
 *
 * - Requiere permiso READ.
 * - Soporta paginación.
 * - Soporta búsqueda por texto.
 * - Permite seleccionar idioma.
 */
export const GET = withAuthorization(
  PERMISSIONS.READ,
  async (req: NextRequest) => {
    try {
      // Extrae query params
      const query = Object.fromEntries(
        req.nextUrl.searchParams.entries()
      );

      // Valida y parsea con Zod
      const {
        limit = 10,
        page = 1,
        language = LANGUAGES.ES,
        search,
      } = querySchema.parse(query);

      // Protección adicional contra abuso
      const safeLimit = Math.min(limit, 100);
      const safePage = Math.min(Math.max(page, 1), 1000);

      const filter = buildCategoryFilter(search);

      // Ejecuta consultas en paralelo
      const [categories, total] = await Promise.all([
        getCategories(filter, safePage, safeLimit),
        getTotalCategories(filter),
      ]);

      return NextResponse.json(
        {
          data: categories.map((category) =>
            toCategoryListDTO(category, language)
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
 * POST /categories
 *
 * - Requiere permiso CREATE.
 * - Valida el body con Zod.
 * - Devuelve únicamente el ID creado.
 */
export const POST = withAuthorization(
  PERMISSIONS.CREATE,
  async (req: NextRequest) => {
    try {
      const body = await req.json();

      // Validación estricta del payload
      const data = createCategorySchema.parse(body);

      const created = await createCategory(data);

      return NextResponse.json(
        { id: created._id.toString() },
        { status: 201 }
      );
    } catch (error) {
      return handleApiError(error);
    }
  }
);
