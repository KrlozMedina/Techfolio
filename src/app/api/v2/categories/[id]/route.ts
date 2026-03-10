import { NextRequest, NextResponse } from "next/server";
import { withAuthorization } from "@/lib/auth/withAuthorization";
// import { PERMISSIONS } from "@/lib/auth/permissions";
import { Types } from "mongoose";
import {
  deleteCategory,
  getCategoryById,
  updateCategory,
} from "@/services/categories/categories.service";
import { toCategoryEntityDTO } from "@/infrastructure/category/category.mapper";
import { handleApiError } from "@/lib/http/handle-api-error";
import { updateCategorySchema } from "@/infrastructure/category/category.update.dto";
import { PERMISSIONS } from "@/shared/auth/permissions";

/**
 * Valida que el id sea un ObjectId válido de MongoDB.
 */
const isValidObjectId = (id: string) => Types.ObjectId.isValid(id);

/**
 * GET /categories/:id
 * 
 * - Requiere permiso READ
 * - Devuelve la categoría completa (multi-idioma)
 */
export const GET = withAuthorization(
  PERMISSIONS.READ,
  async (_: NextRequest, { params }: any) => {
    try {
      const { id } = await params;

      if (!isValidObjectId(id)) {
        return NextResponse.json({ error: "Invalid id" }, { status: 400 });
      }

      const category = await getCategoryById(id);

      if (!category) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
      }

      return NextResponse.json(
        toCategoryEntityDTO(category),
        { status: 200 }
      );
    } catch (error) {
      return handleApiError(error);
    }
  }
);

/**
 * PUT /categories/:id
 * 
 * - Requiere permiso UPDATE
 * - Valida body con Zod
 * - Devuelve documento actualizado
 */
export const PUT = withAuthorization(
  PERMISSIONS.UPDATE,
  async (req: NextRequest, { params }: any) => {
    try {
      const { id } = await params;

      if (!isValidObjectId(id)) {
        return NextResponse.json({ error: "Invalid id" }, { status: 400 });
      }

      const body = await req.json();
      const data = updateCategorySchema.parse(body);

      const updated = await updateCategory(id, data);

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
 * DELETE /categories/:id
 * 
 * - Requiere permiso DELETE
 * - Elimina categoría por ID
 */
export const DELETE = withAuthorization(
  PERMISSIONS.DELETE,
  async (_: NextRequest, { params }: any) => {
    try {
      const { id } = await params;

      if (!isValidObjectId(id)) {
        return NextResponse.json({ error: "Invalid id" }, { status: 400 });
      }

      const deleted = await deleteCategory(id);

      if (!deleted) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
      }

      return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
      return handleApiError(error);
    }
  }
);
