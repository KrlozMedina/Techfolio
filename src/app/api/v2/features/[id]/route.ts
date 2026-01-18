/**
 * API Route para operaciones sobre una Feature específica por ID.
 * - GET: obtiene detalle de la feature
 * - PUT: actualiza la feature
 * - DELETE: elimina la feature
 * 
 * Cada operación valida:
 *  - ObjectId válido
 *  - Permisos mediante `withAuthorization` (PUT/DELETE)
 *  - Estructura de body o query params mediante Zod
 */

import { PERMISSIONS } from "@/lib/auth/permissions";
import { withAuthorization } from "@/lib/auth/withAuthorization";
import { toFeatureDetailDTO } from "@/mappers/feature.mapper";
import { deleteFeature, getFeatureById, updateFeature } from "@/services/features.service";
import { LANGUAGES } from "@/shared/enums";
import { FeatureDomain } from "@/shared/enums/feature-domain.enum";
import { Types } from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

/* =========================
  Utils & Schemas
========================= */

/** Valida si un string es un ObjectId válido de MongoDB */
const isValidObjectId = (id: string) => Types.ObjectId.isValid(id);

/** Esquema para query params */
const querySchema = z.object({
  language: z.enum(LANGUAGES).optional(),
});

/** Estructura base de contenido localizado */
const localizedContentSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
});

/** Contenido por idioma */
const contentSchema = z.object({
  es: localizedContentSchema,
  en: localizedContentSchema,
});

/** Esquema para actualización de feature */
const updateFeatureSchema = z.object({
  content: contentSchema,
  domain: z.enum(FeatureDomain),
});

/* =========================
  GET /features/:id
========================= */

/**
 * Obtiene una feature por ID.
 * - Valida que el ID sea un ObjectId válido
 * - Permite seleccionar el idioma del contenido vía query param
 * - Devuelve un DTO con la información localizada
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!isValidObjectId(id)) {
    return NextResponse.json(
      { error: "Invalid Id" },
      { status: 400 },
    );
  }

  try {
    const { searchParams } = new URL(req.url);
    const query = Object.fromEntries(searchParams.entries());
    const { language = LANGUAGES.ES } = querySchema.parse(query);

    const feat = await getFeatureById(id);

    if (!feat) {
      return NextResponse.json(
        { error: "Not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      toFeatureDetailDTO(feat, language),
      { status: 200 },
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
  PUT /features/:id
========================= */

/**
 * Actualiza una feature existente.
 * - Requiere permiso UPDATE
 * - Valida ID y estructura del body
 * - Retorna la feature actualizada o error si no existe
 */
export const PUT = withAuthorization(
  PERMISSIONS.UPDATE,
  async (
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> },
  ) => {
    const { id } = await params;

    if (!isValidObjectId(id)) {
      return NextResponse.json(
        { error: "Invalid id" },
        { status: 400 },
      );
    }

    try {
      const body = await req.json();
      const data = updateFeatureSchema.parse(body);

      const updated = await updateFeature(id, data);

      if (!updated) {
        return NextResponse.json(
          { error: "Not found" },
          { status: 404 },
        );
      }

      return NextResponse.json(
        updated,
        { status: 200 },
      );
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
  DELETE /features/:id
========================= */

/**
 * Elimina una feature por ID.
 * - Requiere permiso DELETE
 * - Valida ObjectId
 * - Retorna éxito o error si no existe
 */
export const DELETE = withAuthorization(
  PERMISSIONS.DELETE,
  async (
    _: NextRequest,
    { params }: { params: Promise<{ id: string }> },
  ) => {
    const { id } = await params;

    if (!isValidObjectId(id)) {
      return NextResponse.json(
        { error: "Invalid id" },
        { status: 400 },
      );
    }

    try {
      const deleted = await deleteFeature(id);

      if (!deleted) {
        return NextResponse.json(
          { error: "Not found" },
          { status: 404 },
        );
      }

      return NextResponse.json(
        { success: true },
        { status: 200 },
      );
    } catch (error) {
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 },
      );
    }
  }
);
