import { NextRequest, NextResponse } from "next/server";
import { toCategoryDetailDto } from "@/mappers/category.mapper";
import { withAuthorization } from "@/lib/auth/withAuthorization";
import { PERMISSIONS } from "@/lib/auth/permissions";
import { Types } from "mongoose";
import {
  deleteCategory,
  getCategoryById,
  updateCategory,
} from "@/services/category.service";
import { z } from "zod";
import { LANGUAGES } from "@/shared/constants";

/* =========================
  Utils & Schemas
========================= */

/**
 * Valida si un string es un ObjectId válido de MongoDB
 */
const isValidObjectId = (id: string) => Types.ObjectId.isValid(id);

/**
 * Esquema de query params para GET
 * Permite filtrar el idioma de la respuesta
 */
const querySchema = z.object({
  language: z.nativeEnum(LANGUAGES).optional(),
});

/**
 * Esquema de contenido localizado
 */
const localizedContentSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
});

/**
 * Esquema del body para actualización de categoría
 * Requiere contenido en ES y EN
 */
const updateCategorySchema = z.object({
  es: localizedContentSchema,
  en: localizedContentSchema,
});

/* =========================
  GET /categories/:id
========================= */

/**
 * Obtiene una categoría por ID.
 * - Valida ObjectId
 * - Soporta idioma vía query param (?language=es|en)
 * - Devuelve DTO localizado
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!isValidObjectId(id)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const query = Object.fromEntries(searchParams.entries());
    const { language = "es" } = querySchema.parse(query);

    const cat = await getCategoryById(id);
    if (!cat) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(
      toCategoryDetailDto(cat, language),
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid query parameters" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/* =========================
  PUT /categories/:id
========================= */

/**
 * Actualiza una categoría existente.
 * - Requiere permiso UPDATE
 * - Valida ObjectId
 * - Valida body con Zod
 */
export const PUT = withAuthorization(
  PERMISSIONS.UPDATE,
  async (
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
  ) => {
    const { id } = await params;

    if (!isValidObjectId(id)) {
      return NextResponse.json({ error: "Invalid id" }, { status: 400 });
    }

    try {
      const body = await req.json();
      const data = updateCategorySchema.parse(body);

      const updated = await updateCategory(id, data);
      if (!updated) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
      }

      return NextResponse.json(updated, { status: 200 });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return NextResponse.json(
          { error: "Invalid request body" },
          { status: 400 }
        );
      }

      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 }
      );
    }
  }
);

/* =========================
  DELETE /categories/:id
========================= */

/**
 * Elimina una categoría por ID.
 * - Requiere permiso DELETE
 * - Valida ObjectId
 */
export const DELETE = withAuthorization(
  PERMISSIONS.DELETE,
  async (
    _: NextRequest,
    { params }: { params: Promise<{ id: string }> }
  ) => {
    const { id } = await params;

    if (!isValidObjectId(id)) {
      return NextResponse.json({ error: "Invalid id" }, { status: 400 });
    }

    try {
      const deleted = await deleteCategory(id);
      if (!deleted) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
      }

      return NextResponse.json({ success: true }, { status: 200 });
    } catch {
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 }
      );
    }
  }
);
