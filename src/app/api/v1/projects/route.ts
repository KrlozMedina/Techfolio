import connectDB from "@/lib/db/connectDB";
import { CreateProjectDto, DeleteProjectDto, UpdateProjectDto } from "@/lib/dtos";
import { createSlugFromTitle, getCategoriesFromTechnologies } from "@/lib/helpers";
// import { createSlugFromTitle, getCategoriesFromTechnologies } from "@/lib/helpers/technology";
import { ProjectV1 as Project } from "@/models/project/Project.model";
import { NextResponse } from "next/server";

// Types
interface ErrorMongoDb {
  code: number;
  keyValue: Record<string, unknown>;
}

// ─────────────────────────────────────────────
// 🔧 Helpers
// ─────────────────────────────────────────────

function errorResponse(message: string, status = 500, extra: object = {}) {
  return NextResponse.json({ error: message, ...extra }, { status });
}

// ─────────────────────────────────────────────
// 🌐 Handlers
// ─────────────────────────────────────────────

export async function GET() {
  try {
    await connectDB();
    const projects = await Project.find();
    return NextResponse.json(projects, { status: 200 });
  } catch (err) {
    return errorResponse("Failed to fetch projects.", 500, { msg: err });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const json = await req.json();
    const result = CreateProjectDto.safeParse(json);

    if (!result.success) return errorResponse("Invalid data", 400);

    const data = result.data;
    data.slug = createSlugFromTitle(data.title);
    if (data.technologies) {
      data.category = await getCategoriesFromTechnologies(data.technologies);
    }

    const newProject = await new Project(data).save();
    return NextResponse.json({ message: "Project created successfully.", newProject }, { status: 201 });
  } catch (e) {
    const err = e as ErrorMongoDb;
    if (err.code === 11000) {
      return errorResponse("Duplicate project title.", 409, { duplicateKey: err.keyValue });
    }
    return errorResponse("Failed to create project.");
  }
}

export async function PUT(req: Request) {
  try {
    await connectDB();
    const projectId = new URL(req.url).searchParams.get("projectId");
    if (!projectId) return errorResponse("Missing 'projectId' parameter.", 400);

    const payload = await req.json();
    const result = UpdateProjectDto.safeParse(payload);
    if (!result.success) {
      return errorResponse("Invalid data", 400, { details: result.error.format() });
    }

    const data = result.data;
    if (data.title) data.slug = createSlugFromTitle(data.title);
    if (data.technologies) {
      data.category = await getCategoriesFromTechnologies(data.technologies);
    }

    const updated = await Project.findByIdAndUpdate(projectId, data, { new: true });
    if (!updated) return errorResponse("Project not found.", 404);

    return NextResponse.json({ message: "Project updated successfully.", updated }, { status: 200 });
  } catch (err) {
    console.error("Error updating project:", err);
    return errorResponse("Failed to update project.");
  }
}

export async function DELETE(req: Request) {
  try {
    await connectDB();
    const projectId = new URL(req.url).searchParams.get("projectId");
    if (!projectId) return errorResponse("Missing 'projectId' parameter.", 400);

    const result = DeleteProjectDto.safeParse({ projectId });
    if (!result.success) {
      return errorResponse("Invalid data", 400, { details: result.error.format() });
    }

    const deleted = await Project.findByIdAndDelete(projectId);
    if (!deleted) return errorResponse("Project not found.", 404);

    return NextResponse.json({ message: "Project deleted successfully." }, { status: 200 });
  } catch (err) {
    console.error("Error deleting project:", err);
    return errorResponse("Failed to delete project.");
  }
}
