import { handleApiError } from "@/lib/http/handle-api-error";
import { LANGUAGES } from "@/lib/i18n/language";
import { getProjectsSummary } from "@/services/projects/projects.summary.service";
import { Status } from "@/shared/enums";
import { querySchema } from "@/shared/interfaces/query.schema";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

/**
 * Extiende el schema base de query para permitir:
 * - status (opcional)
 */
const projectQuerySchema = querySchema.extend({
  status: z.enum(Status).optional(),
});

/**
 * GET /api/projects/summary
 *
 * Obtiene un resumen de proyectos.
 * - Permite filtrar por status.
 * - Permite seleccionar idioma.
 *
 * Query params:
 * - status (opcional)
 * - language (opcional)
 *
 * Respuestas:
 * - 200: Resumen generado correctamente
 * - 400: Query inválida
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const query = Object.fromEntries(searchParams.entries());

    const {
      status,
      language = LANGUAGES.ES,
    } = projectQuerySchema.parse(query);

    const summary = await getProjectsSummary(status, language);

    return NextResponse.json(summary, { status: 200 });
  } catch (error) {
    return handleApiError(error);
  }
}
