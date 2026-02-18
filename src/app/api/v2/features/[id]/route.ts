import { updateFeatureSchema } from "@/dto/feature/feature.update.dto";
import { PERMISSIONS } from "@/lib/auth/permissions";
import { withAuthorization } from "@/lib/auth/withAuthorization";
import { handleApiError } from "@/lib/http/handle-api-error";
import { toFeatureEntityDTO } from "@/mappers/feature.mapper";
import { deleteFeature, getFeatureById, updateFeature } from "@/services/features.service";
import { Types } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

/**
 * Valida que un string sea un ObjectId válido de MongoDB
 * @param id - String a validar
 * @returns true si es válido
 */
const isValidObjectId = (id: string) => Types.ObjectId.isValid(id);

/**
 * GET /features/:id
 * Obtiene una feature por su ID
 * Requiere permiso READ
 */
export const GET = withAuthorization(
  PERMISSIONS.READ,
  async (_: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    try {
      const { id } = await params;

      if (!isValidObjectId(id)) {
        return NextResponse.json({ error: "Invalid Id" }, { status: 400 });
      }

      const feature = await getFeatureById(id);

      if (!feature) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
      }

      return NextResponse.json(toFeatureEntityDTO(feature), { status: 200 });
    } catch (error) {
      return handleApiError(error);
    }
  }
);

/**
 * PUT /features/:id
 * Actualiza una feature por su ID
 * Requiere permiso UPDATE
 */
export const PUT = withAuthorization(
  PERMISSIONS.UPDATE,
  async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    try {
      const { id } = await params;

      if (!isValidObjectId(id)) {
        return NextResponse.json({ error: "Invalid id" }, { status: 400 });
      }

      const body = await req.json();
      const data = updateFeatureSchema.parse(body);

      const updated = await updateFeature(id, data);

      if (!updated) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
      }

      return NextResponse.json(updated, { status: 200 });
    } catch (error) {
      return handleApiError(error);
    }
  }
);

/**
 * DELETE /features/:id
 * Elimina una feature por su ID
 * Requiere permiso DELETE
 */
export const DELETE = withAuthorization(
  PERMISSIONS.DELETE,
  async (_: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    try {
      const { id } = await params;

      if (!isValidObjectId(id)) {
        return NextResponse.json({ error: "Invalid id" }, { status: 400 });
      }

      const deleted = await deleteFeature(id);

      if (!deleted) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
      }

      return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
      return handleApiError(error);
    }
  }
);
