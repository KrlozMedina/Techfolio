import { PERMISSIONS } from "@/lib/auth/permissions";
import { withAuthorization } from "@/lib/auth/withAuthorization";
import { NextRequest, NextResponse } from "next/server";
import { Types } from "mongoose";
import {
  deleteTechnology,
  getTechnologyById,
  updateTechnology,
} from "@/services/technologies/technologies.service";
import { toTechnologyEntityDTO } from "@/infrastructure/technology/technology.mapper";
import { handleApiError } from "@/lib/http/handle-api-error";
import { updateTechnologySchema } from "@/infrastructure/technology/technology.update.dto";

/**
 * Valida si un string es un ObjectId válido de MongoDB.
 */
const isValidObjectId = (id: string) => Types.ObjectId.isValid(id);

/**
 * GET /technologies/:id
 *
 * - Requiere permiso READ.
 * - Valida que el id sea un ObjectId válido.
 * - Retorna la tecnología transformada a DTO.
 */
export const GET = withAuthorization(
  PERMISSIONS.READ,
  async (_: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    try {
      const { id } = await params;

      // Validación de formato de ID
      if (!isValidObjectId(id)) {
        return NextResponse.json({ error: "Invalid id" }, { status: 400 });
      }

      const technology = await getTechnologyById(id);

      // Si no existe el documento
      if (!technology) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
      }

      return NextResponse.json(
        toTechnologyEntityDTO(technology),
        { status: 200 }
      );
    } catch (error) {
      return handleApiError(error);
    }
  }
);

/**
 * PUT /technologies/:id
 *
 * - Requiere permiso UPDATE.
 * - Valida id.
 * - Valida body con Zod.
 * - Retorna documento actualizado.
 */
export const PUT = withAuthorization(
  PERMISSIONS.UPDATE,
  async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    try {
      const { id } = await params;

      // Validación de formato de ID
      if (!isValidObjectId(id)) {
        return NextResponse.json({ error: "Invalid id" }, { status: 400 });
      }

      const body = await req.json();
      const data = updateTechnologySchema.parse(body);

      const updated = await updateTechnology(id, data);

      // Si el documento no existe
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
 * DELETE /technologies/:id
 *
 * - Requiere permiso DELETE.
 * - Valida id.
 * - Elimina el documento.
 */
export const DELETE = withAuthorization(
  PERMISSIONS.DELETE,
  async (_: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    try {
      const { id } = await params;

      // Validación de formato de ID
      if (!isValidObjectId(id)) {
        return NextResponse.json({ error: "Invalid id" }, { status: 400 });
      }

      const deleted = await deleteTechnology(id);

      // Si no existía el documento
      if (!deleted) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
      }

      return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
      return handleApiError(error);
    }
  }
);
