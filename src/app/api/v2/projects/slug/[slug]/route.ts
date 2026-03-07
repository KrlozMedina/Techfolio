import { NextRequest, NextResponse } from "next/server";
import { getProjectBySlug } from "@/services/projects/projects.service";
import { toProjectDetailDTO } from "@/infrastructure/project/project.mapper";
import { handleApiError } from "@/lib/http/handle-api-error";
import { querySchema } from "@/shared/interfaces/query.schema";
import "@/models"
import { LANGUAGES } from "@/lib/i18n/language";

/**
 * GET /api/projects/slug/[slug]
 *
 * Obtiene el detalle de un proyecto por su slug único.
 * - Permite seleccionar idioma vía query param.
 * - Devuelve DTO transformado.
 *
 * Query params:
 * - language (opcional)
 *
 * Respuestas:
 * - 200: Proyecto encontrado
 * - 404: Proyecto no encontrado
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const query = Object.fromEntries(
      req.nextUrl.searchParams.entries()
    );

    const { language = LANGUAGES.ES } =
      querySchema.parse(query);

    const project = await getProjectBySlug(slug);

    if (!project) {
      return NextResponse.json(
        { error: "Not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      toProjectDetailDTO(project, language),
      { status: 200 }
    );
  } catch (error) {
    return handleApiError(error);
  }
}
