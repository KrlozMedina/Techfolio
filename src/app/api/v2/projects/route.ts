import { NextRequest, NextResponse } from "next/server";
import { GetProjectsV2Dto, CreateProjectV2Dto } from "@/lib/dtos/projects.dto";
import connectDB from "@/lib/db/connectDB";
import { ProjectV2 } from "@/models/project/Project.model";
import { ZodError } from "zod";
import { verifyOrClearToken } from "@/lib/utils";

/**
 * Centralized validation for GET requests
 * @param query - Query parameters from the request
 * @returns Validated query parameters
 * @throws {Error} If validation fails
 */
function validateGetProjects(query: Record<string, string>) {
  const parseResult = GetProjectsV2Dto.safeParse(query);
  if (!parseResult.success) {
    console.error("Validation error:", parseResult.error.format());
    throw new Error("Invalid query parameters");
  }
  return parseResult.data;
}

/**
 * Centralized validation for POST requests
 * @param body - Request body
 * @returns Validated body
 * @throws {ZodError} If validation fails
 */
function validateCreateProject(body: unknown) {
  const parseResult = CreateProjectV2Dto.safeParse(body);
  if (!parseResult.success) {
    console.error("Validation error:", parseResult.error.format());
    throw new ZodError(parseResult.error.issues);
  }
  return parseResult.data;
}

/**
 * Builds a dynamic filter for projects based on status and search terms
 * @param status - The status filter (optional)
 * @param search - The search query (optional)
 * @returns A filter object for MongoDB query
 */
function buildProjectFilter(status?: string, search?: string): Record<string, unknown> {
  const filter: Record<string, unknown> = {};
  if (status) {
    filter.status = status;
  }
  if (search) {
    // Apply search across project titles and descriptions in both languages
    filter["$or"] = [
      { "projectInfo.es.title": { $regex: search, $options: "i" } },
      { "projectInfo.en.title": { $regex: search, $options: "i" } },
      { "projectInfo.es.description": { $regex: search, $options: "i" } },
      { "projectInfo.en.description": { $regex: search, $options: "i" } },
    ];
  }
  return filter;
}

/**
 * Determines which fields to select for the response based on the 'data' parameter
 * @param data - The 'data' query parameter (simple or all)
 * @param language - The language for the project content (default is 'es')
 * @returns Array of selected fields for MongoDB projection
 */
function getFieldSelection(data: string, language: string): string[] {
  if (data === "simple") {
    return [`projectInfo.${language}`, "tags", "urls", "assets", "updatedAt"];
  }
  return [];
}

/**
 * GET handler for fetching projects
 * @param req - The incoming request
 * @returns JSON response containing the projects and pagination info
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = Object.fromEntries(searchParams.entries());

  try {
    const {
      status,
      search,
      limit = 10,
      page = 1,
      data = "all",
      language = "es",
    } = validateGetProjects(query);

    await connectDB();

    const filter = buildProjectFilter(status, search);

    const safeLimit = Math.min(Number(limit), 100);
    const safePage = Math.max(Number(page), 1);
    const fields = getFieldSelection(data, language);

    const projectQuery = ProjectV2.find(filter)
      .skip((safePage - 1) * safeLimit)
      .limit(safeLimit)
      .sort("-importanceScore");

    if (fields.length > 0) {
      projectQuery.select(fields);
    }

    const [projects, total] = await Promise.all([
      projectQuery.exec(),
      ProjectV2.countDocuments(filter),
    ]);

    const totalPages = Math.ceil(total / safeLimit);

    const res = NextResponse.json(
      {
        data: projects,
        pagination: {
          total,
          limit: safeLimit,
          currentPage: safePage,
          totalPages,
        },
      },
      { status: 200 }
    );

    return verifyOrClearToken(req, res);
  } catch (error) {
    console.error("GET /v2/projects error:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching projects." },
      { status: 500 }
    );
  }
}

/**
 * POST handler for creating a new project
 * @param req - The incoming request
 * @returns JSON response with the created project or error message
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const projectData = validateCreateProject(body);

    await connectDB();

    const createdProject = await ProjectV2.create(projectData);

    const res = NextResponse.json(createdProject, { status: 201 });
    return verifyOrClearToken(req, res);
  } catch (error) {
    if (error instanceof ZodError) {
      // console.error("Validation failed:", error.errors);
      return NextResponse.json({ error: error }, { status: 400 });
    }
    console.error("POST /v2/projects error:", error);
    return NextResponse.json(
      { error: "Failed to create project." },
      { status: 500 }
    );
  }
}
