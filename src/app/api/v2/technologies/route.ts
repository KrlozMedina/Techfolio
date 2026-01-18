import { PERMISSIONS } from "@/lib/auth/permissions";
import { withAuthorization } from "@/lib/auth/withAuthorization";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";
import { createTechnology, getTechnologies } from "@/services/technologies.service";
import { toTechnologyListDTO } from "@/mappers/technology.mapper";
import { isValidObjectId } from "mongoose";
import { ExperienceLevel } from "@/shared/enums/experience-level.enum";

/* =========================
  Schemas
========================= */

/**
 * Esquema de validación para creación de tecnología.
 * - name: obligatorio, mínimo 1 carácter
 * - categoryId: obligatorio, debe ser un ObjectId válido
 * - iconUrl: opcional, mínimo 1 carácter si se provee
 * - websiteUrl: opcional, mínimo 1 carácter si se provee
 * - experienceLevel: obligatorio, debe ser uno de los valores del enum ExperienceLevel
 */
const createTechnologySchema = z.object({
  name: z.string().min(1),
  categoryId: z.string().refine(isValidObjectId, {
    message: "Invalid categoryId",
  }),
  iconUrl: z.string().min(1).optional(),
  websiteUrl: z.string().min(1).optional(),
  experienceLevel: z.enum(ExperienceLevel),
});

/* =========================
  GET /technologies
========================= */

/**
 * Obtiene el listado completo de tecnologías.
 * - No requiere permisos especiales
 * - Retorna un array de DTOs optimizados para listados
 * - Retorna 500 en caso de error de servidor
 */
export async function GET() {
  try {
    const technologies = await getTechnologies();
    const response = technologies.map(toTechnologyListDTO);

    return NextResponse.json(response, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

/* =========================
  POST /technologies
========================= */

/**
 * Crea una nueva tecnología.
 * - Requiere permiso CREATE
 * - Valida el payload usando Zod
 * - Retorna 201 con la tecnología creada
 * - Retorna 400 si los datos son inválidos
 * - Retorna 500 en caso de error de servidor
 */
export const POST = withAuthorization(
  PERMISSIONS.CREATE,
  async (req: NextRequest) => {
    try {
      const body = await req.json();
      const data = createTechnologySchema.parse(body);

      const created = await createTechnology(data);

      return NextResponse.json(created, { status: 201 });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
      }

      return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
  }
);
