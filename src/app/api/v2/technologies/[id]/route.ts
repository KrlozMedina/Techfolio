import { PERMISSIONS } from "@/lib/auth/permissions";
import { withAuthorization } from "@/lib/auth/withAuthorization";
import { NextRequest, NextResponse } from "next/server";
import { Types } from "mongoose";
import z from "zod";
import { deleteTechnology, getTechnologyById, updateTechnology } from "@/services/technologies.service";
import { toTechnologyDetailDTO } from "@/mappers/technology.mapper";
import { ExperienceLevel } from "@/shared/enums/experience-level.enum";

/* =========================
  Utils & Schemas
========================= */

/**
 * Valida si un string es un ObjectId válido de MongoDB
 * @param id - String a validar
 * @returns boolean
 */
const isValidObjectId = (id: string) => Types.ObjectId.isValid(id);

/**
 * Esquema de validación para actualización de tecnología.
 * - Todos los campos son opcionales
 * - categoryId debe ser un ObjectId válido si se provee
 * - experienceLevel debe ser uno de los valores definidos en el enum
 */
const updateTechnologySchema = z.object({
  name: z.string().min(1),
  categoryId: z.string().refine(isValidObjectId, {
    message: "Invalid categoryId",
  }).optional(),
  iconUrl: z.string().min(1).optional(),
  websiteUrl: z.string().min(1).optional(),
  experienceLevel: z.enum(ExperienceLevel).optional(),
});

/* =========================
  GET /technologies/:id
========================= */

/**
 * Obtiene una tecnología por su ID.
 * - Valida que el ID sea un ObjectId válido
 * - Devuelve un DTO de detalle
 * - Retorna 404 si no existe
 * - Retorna 400 si el ID es inválido
 * - Retorna 500 en caso de error de servidor
 */
export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!isValidObjectId(id)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  try {
    const tech = await getTechnologyById(id);

    if (!tech) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(toTechnologyDetailDTO(tech), { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid query parameters" }, { status: 400 });
    }

    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

/* =========================
  PUT /technologies/:id
========================= */

/**
 * Actualiza una tecnología existente.
 * - Requiere permiso UPDATE
 * - Valida ID y body
 * - Retorna la tecnología actualizada
 * - Retorna 404 si no existe
 * - Retorna 400 si los datos son inválidos
 * - Retorna 500 en caso de error de servidor
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
      const data = updateTechnologySchema.parse(body);

      const updated = await updateTechnology(id, data);
      if (!updated) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
      }

      return NextResponse.json(updated, { status: 200 });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
      }

      return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
  }
);

/* =========================
  DELETE /technologies/:id
========================= */

/**
 * Elimina una tecnología por su ID.
 * - Requiere permiso DELETE
 * - Valida que el ID sea un ObjectId válido
 * - Retorna 404 si no existe
 * - Retorna 400 si el ID es inválido
 * - Retorna 500 en caso de error de servidor
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
      const deleted = await deleteTechnology(id);
      if (!deleted) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
      }

      return NextResponse.json({ success: true }, { status: 200 });
    } catch {
      return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
  }
);
