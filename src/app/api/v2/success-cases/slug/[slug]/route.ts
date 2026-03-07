import { handleApiError } from "@/lib/http/handle-api-error";
import { toSuccessCaseDetailDTO } from "@/infrastructure/success-case/success-case.mapper";
import { getSuccessCaseBySlug } from "@/services/success-cases/success-cases.service";
import { querySchema } from "@/shared/interfaces/query.schema";
import { NextRequest, NextResponse } from "next/server";
import { LANGUAGES } from "@/lib/i18n/language";

/**
 * GET /api/success-cases/slug/:slug
 *
 * - Obtiene un caso de éxito mediante su slug público.
 * - Permite resolver idioma mediante query param (?language=es|en).
 * - Retorna un DTO detallado.
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const query = Object.fromEntries(req.nextUrl.searchParams.entries());
    const { language = LANGUAGES.ES } = querySchema.parse(query);

    const successCase = await getSuccessCaseBySlug(slug);

    if (!successCase) {
      return NextResponse.json(
        { error: "Not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      toSuccessCaseDetailDTO(successCase, language),
      { status: 200 }
    );
  } catch (error) {
    return handleApiError(error);
  }
}
