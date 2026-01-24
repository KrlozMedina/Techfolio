import { PERMISSIONS } from "@/lib/auth/permissions";
import { withAuthorization } from "@/lib/auth/withAuthorization";
import { toCategoryReadDTO } from "@/mappers/category.mapper";
import { createCategory, getCategories } from "@/services/category.service";
import { LANGUAGES } from "@/shared/enums";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

/* =========================
  Validation Schemas
========================= */

/**
 * Valida los query params de la petición.
 * Permite seleccionar el idioma del contenido retornado.
 */
const querySchema = z.object({
  language: z.nativeEnum(LANGUAGES).optional(),
});

/**
 * Define la estructura de contenido localizado
 * para un idioma específico.
 */
const localizedContentSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
});

/**
 * Contenido multilenguaje obligatorio.
 */
const contentSchema = z.object({
  es: localizedContentSchema,
  en: localizedContentSchema,
});

/**
 * Payload esperado para crear una categoría.
 */
const createCategorySchema = z.object({
  content: contentSchema,
});

/* =========================
  GET /categories
========================= */

/**
 * Retorna el listado de categorías.
 *
 * Comportamiento:
 * - Acepta ?language=es|en (opcional)
 * - Devuelve un DTO optimizado para listados
 *
 * Errores:
 * - 400: query params inválidos
 * - 500: error interno
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const query = Object.fromEntries(searchParams.entries());

    const { language = LANGUAGES.ES } = querySchema.parse(query);

    const categories = await getCategories();

    const response = categories.map((c) =>
      toCategoryReadDTO(c, language)
    );

    return NextResponse.json(
      response,
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid query parameters" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/* =========================
  POST /categories
========================= */

/**
 * Crea una nueva categoría.
 *
 * Seguridad:
 * - Requiere permiso CREATE
 *
 * Validaciones:
 * - Contenido multilenguaje obligatorio (es, en)
 *
 * Errores:
 * - 400: body inválido
 * - 401/403: autorización
 * - 500: error interno
 */
export const POST = withAuthorization(
  PERMISSIONS.CREATE,
  async (req: NextRequest) => {
    try {
      const body = await req.json();

      const data = createCategorySchema.parse(body);

      const created = await createCategory(data);

      return NextResponse.json(
        created,
        { status: 201 }
      );
    } catch (error) {
      if (error instanceof z.ZodError) {
        return NextResponse.json(
          { error: "Invalid request body" },
          { status: 400 }
        );
      }

      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 }
      );
    }
  }
);
