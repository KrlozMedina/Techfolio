import { NextResponse } from "next/server";
import { ProjectV2 } from "@/models/project/Project.model";
import connectDB from "@/lib/db/connectDB";
import { UpdateProjectV2Dto } from "@/lib/dtos";
import { apiHandler } from "@/lib/utils/apiHandler";

// Helpers
const projectNotFound = () =>
  NextResponse.json({ error: "Project not found" }, { status: 404 });

const jsonError = (error: unknown, status = 400) =>
  NextResponse.json({ error: error instanceof Error ? error.message : error }, { status });

// Función común para obtener y manejar proyectos
async function handleProjectRequest(id: string) {
  await connectDB();
  const project = await ProjectV2.findById(id);
  return project ? project : null;
}

// GET
export const GET = apiHandler(
  async (_req: Request, context: { params: { id: string } }) => {
    const { id } = await context.params;
    const project = await handleProjectRequest(id);
    return project ? NextResponse.json(project) : projectNotFound();
  }
);

// PUT
export const PUT = apiHandler(
  async (req: Request, context: { params: { id: string } }) => {
    const { id } = await context.params;
    const body = await req.json();

    // Validación de datos de entrada
    const validation = UpdateProjectV2Dto.safeParse(body);
    if (!validation.success) {
      return jsonError(validation.error.errors);
    }

    const project = await handleProjectRequest(id);
    if (!project) return projectNotFound();

    // Actualización del proyecto
    await connectDB();
    const updatedProject = await ProjectV2.findByIdAndUpdate(id, validation.data, {
      new: true,
      runValidators: true,
    });

    return updatedProject ? NextResponse.json(updatedProject) : projectNotFound();
  }
);

// DELETE
export const DELETE = apiHandler(
  async (_req: Request, context: { params: { id: string } }) => {
    const { id } = await context.params;

    const project = await handleProjectRequest(id);
    if (!project) return projectNotFound();

    // Eliminación del proyecto
    await connectDB();
    const deleted = await ProjectV2.findByIdAndDelete(id);
    return deleted
      ? NextResponse.json({ message: "Project deleted successfully" })
      : projectNotFound();
  }
);
