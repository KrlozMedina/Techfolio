import { NextRequest, NextResponse } from "next/server";
import { Types } from "mongoose";
import z from "zod";
import { toProjectDetailDTO } from "@/mappers/project.mapper";
import { LANGUAGES } from "@/shared/enums";
import {
  deleteProject,
  getProjectById,
  updateProject,
} from "@/services/project.service";
import {
  ProjectType,
  Role,
  ArchitectureType,
  ArchitectureStyle,
  DatabaseModel,
  Platform,
  ProjectStatus,
  ArchitectureCommunication,
} from "@/shared/enums";
import { handleApiError } from "@/lib/http/handle-api-error";
import { PERMISSIONS, withAuthorization } from "@/lib/auth";

/* ================= Utils ================= */

/**
 * Valida si un string es un ObjectId válido de MongoDB.
 */
const isValidObjectId = (id: string) => Types.ObjectId.isValid(id);

/**
 * Esquema reutilizable para validar ObjectId en arrays.
 */
const objectIdSchema = z.string().refine(isValidObjectId);

/* ================= Schemas ================= */

/**
 * Esquema de validación para query params.
 * Permite seleccionar el idioma de respuesta.
 */
const querySchema = z.object({
  language: z.enum(LANGUAGES).optional(),
});

/**
 * Esquema base para contenido localizado del proyecto.
 */
const localizedContentSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  problem: z.string().min(1),
  solution: z.string().min(1),
});

/**
 * Esquema de validación para actualización de proyecto.
 * Define toda la estructura editable del proyecto.
 */
const updateProjectSchema = z.object({
  content: z.object({
    es: localizedContentSchema,
    en: localizedContentSchema,
  }),
  teamInfo: z.object({
    role: z.enum(Role),
    teamSize: z.number().int().positive(),
    duration: z.string(),
    projectType: z.enum(ProjectType),
  }),
  architecture: z.object({
    type: z.enum(ArchitectureType),
    style: z.enum(ArchitectureStyle),
    communication: z.array(z.enum(ArchitectureCommunication)).nonempty(),
    databaseModel: z.enum(DatabaseModel),
  }),
  platform: z.enum(Platform),
  technologyIds: z.array(objectIdSchema),
  featureIds: z.array(objectIdSchema),
  categoryIds: z.array(objectIdSchema),
  technicalChallenges: z.array(z.string()),
  impact: z.object({
    metrics: z.array(z.string()),
    users: z.string(),
  }),
  learnings: z.array(z.string()),
  urls: z.object({
    repository: z.string().url(),
    live: z.string().url().nullable(),
    documentation: z.string().url().nullable(),
  }),
  assets: z.object({
    main: z.string().url(),
    blur: z.string().url(),
  }),
  importanceScore: z.number().min(1).max(5),
  status: z.enum(ProjectStatus),
});

/* ================= GET ================= */

/**
 * Obtiene el detalle de un proyecto por ID.
 * - Valida ObjectId
 * - Permite seleccionar idioma vía query param
 * - Devuelve DTO localizado
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

/* ================= PUT ================= */

/**
 * Actualiza un proyecto existente.
 * - Requiere permiso UPDATE
 * - Valida ObjectId
 * - Valida body completo con Zod
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

/* ================= DELETE ================= */

/**
 * Elimina un proyecto por ID.
 * - Requiere permiso DELETE
 * - Valida ObjectId
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
