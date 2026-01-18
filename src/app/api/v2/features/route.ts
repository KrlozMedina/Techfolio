/**
 * API Route para Features
 * 
 * - GET: Obtiene el listado de features
 *   - Soporta query param `language` para localización
 *   - Devuelve DTOs optimizados para listados
 * 
 * - POST: Crea una nueva feature
 *   - Requiere permiso CREATE
 *   - Valida estructura multilenguaje y dominio
 */

import { PERMISSIONS } from "@/lib/auth/permissions";
import { withAuthorization } from "@/lib/auth/withAuthorization";
import { toFeatureListDTO } from "@/mappers/feature.mapper";
import { createFeature, getFeatures } from "@/services/features.service";
import { LANGUAGES } from "@/shared/enums";
import { FeatureDomain } from "@/shared/enums/feature-domain.enum";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

/* =========================
  Schemas
========================= */

/**
 * Esquema para query params
 * - Permite especificar idioma opcional
 */
const querySchema = z.object({
  language: z.enum(LANGUAGES).optional(),
});

/**
 * Estructura base de contenido localizado
 * - Obligatorio título y descripción
 */
const localizedContentSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
})

const contentSchema = z.object({
  es: localizedContentSchema,
  en: localizedContentSchema,
})

/**
 * Esquema para creación de feature
 * - Valida contenido en ambos idiomas
 * - Valida dominio de la feature
 */
const createFeatureSchema = z.object({
  content: contentSchema,
  domain: z.enum(FeatureDomain),
});

/* =========================
  GET /features
========================= */

/**
 * Obtiene el listado de features.
 * - Soporta selección de idioma mediante query param
 * - Devuelve DTOs optimizados para listado
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const query = Object.fromEntries(searchParams.entries());

    const { language = LANGUAGES.ES } = querySchema.parse(query);

    const features = await getFeatures();

    const response = features.map(f =>
      toFeatureListDTO(f, language)
    );

    return NextResponse.json(
      response,
      { status: 200 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid query parameters" },
        { status: 400 },
      );
    };

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  };
};

/* =========================
  POST /features
========================= */

/**
 * Crea una nueva feature.
 * - Requiere permiso CREATE
 * - Valida contenido multilenguaje y dominio
 */
export const POST = withAuthorization(
  PERMISSIONS.CREATE,
  async (req: NextRequest) => {
    try {
      const body = await req.json();
      const data = createFeatureSchema.parse(body);
      const created = await createFeature(data);

      return NextResponse.json(
        created,
        { status: 201 },
      );
    } catch (error) {
      if (error instanceof z.ZodError) {
        return NextResponse.json(
          { error: "Invalid request body" },
          { status: 400 },
        );
      };

      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 }
      );
    };
  }
);
