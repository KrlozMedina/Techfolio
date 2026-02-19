import { NextRequest, NextResponse } from "next/server";
import { Types } from "mongoose";
import { toProjectDetailDTO } from "@/mappers/project.mapper";
import { LANGUAGES } from "@/shared/enums";
import {
  deleteProject,
  getProjectById,
  updateProject,
} from "@/services/projects/projects.service";
import { handleApiError } from "@/lib/http/handle-api-error";
import { PERMISSIONS, withAuthorization } from "@/lib/auth";
import { querySchema } from "@/shared/interfaces/query.schema";
import { updateProjectSchema } from "@/dto/project/project.update.dto";

const isValidObjectId = (id: string) => Types.ObjectId.isValid(id);

/**
 * GET /api/projects/[id]
 *
 * Obtiene el detalle de un proyecto por ID.
 * - Valida ObjectId.
 * - Permite seleccionar idioma vía query param.
 * - Devuelve DTO transformado.
 *
 * Query params:
 * - language (opcional)
 *
 * Respuestas:
 * - 200: Proyecto encontrado
 * - 400: ID inválido
 * - 404: Proyecto no encontrado
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!isValidObjectId(id)) {
      return NextResponse.json({ error: "Invalid id" }, { status: 400 });
    }

    const { searchParams } = new URL(req.url);
    const { language = LANGUAGES.ES } = querySchema.parse(
      Object.fromEntries(searchParams.entries())
    );

    const project = await getProjectById(id);

    if (!project) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(
      toProjectDetailDTO(project, language),
      { status: 200 }
    );
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * PUT /api/projects/[id]
 *
 * Actualiza un proyecto existente.
 * - Requiere permiso UPDATE.
 * - Valida ObjectId.
 * - Valida body con schema Zod.
 *
 * Respuestas:
 * - 200: Actualización exitosa
 * - 400: ID inválido o body inválido
 * - 404: Proyecto no encontrado
 */
export const PUT = withAuthorization(
  PERMISSIONS.UPDATE,
  async (
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
  ) => {
    try {
      const { id } = await params;

      if (!isValidObjectId(id)) {
        return NextResponse.json({ error: "Invalid id" }, { status: 400 });
      }

      const data = updateProjectSchema.parse(await req.json());
      const updated = await updateProject(id, data);

      if (!updated) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
      }

      return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
      return handleApiError(error);
    }
  }
);

/**
 * DELETE /api/projects/[id]
 *
 * Elimina un proyecto existente.
 * - Requiere permiso DELETE.
 * - Valida ObjectId.
 *
 * Respuestas:
 * - 200: Eliminación exitosa
 * - 400: ID inválido
 * - 404: Proyecto no encontrado
 */
export const DELETE = withAuthorization(
  PERMISSIONS.DELETE,
  async (
    _: NextRequest,
    { params }: { params: Promise<{ id: string }> }
  ) => {
    try {
      const { id } = await params;

      if (!isValidObjectId(id)) {
        return NextResponse.json({ error: "Invalid id" }, { status: 400 });
      }

      const deleted = await deleteProject(id);

      if (!deleted) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
      }

      return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
      return handleApiError(error);
    }
  }
);
