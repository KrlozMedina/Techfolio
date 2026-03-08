import { updateSuccessCaseSchema } from "@/infrastructure/success-case/success-case.update.dto";
import { PERMISSIONS, withAuthorization } from "@/lib/auth";
import { handleApiError } from "@/lib/http/handle-api-error";
import { toSuccessCaseEntityDTO } from "@/infrastructure/success-case/success-case.mapper";
import {
  deleteSuccessCase,
  getSuccessCaseById,
  updateSuccessCase
} from "@/services/success-cases/success-cases.service";
import { querySchema } from "@/shared/interfaces/query.schema";
import { Types } from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import { LANGUAGES } from "@/lib/i18n/language";

/**
 * Valida si un string es un ObjectId válido de MongoDB.
 */
const isValidObjectId = (id: string) => Types.ObjectId.isValid(id);

/**
 * GET /api/success-cases/:id
 *
 * - Requiere permiso READ.
 * - Valida ObjectId.
 * - Retorna el caso completo (EntityDTO).
 */
export const GET = withAuthorization(
  PERMISSIONS.READ,
  async (
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
  ) => {
    try {
      const { id } = await params;

      if (!isValidObjectId(id)) {
        return NextResponse.json(
          { error: "Invalid id" },
          { status: 400 }
        );
      }

      // Se parsea pero actualmente no se usa en el mapper
      const { language = LANGUAGES.ES } = querySchema.parse(
        Object.fromEntries(req.nextUrl.searchParams.entries())
      );

      const successCase = await getSuccessCaseById(id);

      if (!successCase) {
        return NextResponse.json(
          { error: "Not found" },
          { status: 404 }
        );
      }

      return NextResponse.json(
        toSuccessCaseEntityDTO(successCase),
        { status: 200 }
      );
    } catch (error) {
      return handleApiError(error);
    }
  }
);

/**
 * PUT /api/success-cases/:id
 *
 * - Requiere permiso UPDATE.
 * - Valida ObjectId.
 * - Valida body con Zod.
 * - Retorna éxito si actualiza correctamente.
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

      const data = updateSuccessCaseSchema.parse(await req.json());
      const updated = await updateSuccessCase(id, data);

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
 * DELETE /api/success-cases/:id
 *
 * - Requiere permiso DELETE.
 * - Valida ObjectId.
 * - Elimina físicamente el documento.
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

      const deleted = await deleteSuccessCase(id);

      if (!deleted) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
      }

      return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
      return handleApiError(error);
    }
  }
);
