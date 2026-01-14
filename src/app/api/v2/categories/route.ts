import { PERMISSIONS } from "@/lib/auth/permissions";
import { withAuthorization } from "@/lib/auth/withAuthorization";
import { toCategoryListDTO } from "@/mappers/category.mapper";
import { createCategory, getCategories } from "@/services/category.service";
import { LANGUAGES } from "@/shared/constants";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

/* =========================
  Schemas
========================= */

/**
 * Esquema de validación para query params.
 * Permite seleccionar el idioma del contenido.
 */
const querySchema = z.object({
  language: z.nativeEnum(LANGUAGES).optional(),
});

/**
 * Estructura base de contenido localizado
 * para un idioma específico.
 */
const localizedContentSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
});

/**
 * Esquema para creación de categorías.
 * Obliga a enviar contenido en español e inglés.
 */
const createCategorySchema = z.object({
  es: localizedContentSchema,
  en: localizedContentSchema,
});

/* =========================
  GET
========================= */

/**
 * Obtiene el listado de categorías.
 * - Soporta selección de idioma vía query param (?language=es|en)
 * - Devuelve DTOs optimizados para listados
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const query = Object.fromEntries(searchParams.entries());

    // Valida y normaliza el idioma
    const { language = "es" } = querySchema.parse(query);

    // Obtiene entidades desde la capa de servicio
    const categories = await getCategories();

    // Mapea entidades a DTO según idioma
    const response = categories.map((c) =>
      toCategoryListDTO(c, language)
    );

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    // Error de validación de query params
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid query parameters" },
        { status: 400 }
      );
    }

    // Error no controlado
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/* =========================
  POST
========================= */

/**
 * Crea una nueva categoría.
 * - Requiere permiso CREATE
 * - Valida estructura multilenguaje del body
 */
export const POST = withAuthorization(
  PERMISSIONS.CREATE,
  async (req: NextRequest) => {
    try {
      const body = await req.json();

      // Valida el payload de creación
      const data = createCategorySchema.parse(body);

      // Persiste la categoría
      const created = await createCategory(data);

      return NextResponse.json(created, { status: 201 });
    } catch (error) {
      // Error de validación del body
      if (error instanceof z.ZodError) {
        return NextResponse.json(
          { error: "Invalid request body" },
          { status: 400 }
        );
      }

      // Error no controlado
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 }
      );
    }
  }
);
