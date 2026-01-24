/**
 * API route for managing projects (v2).
 * Includes:
 * - GET: list projects with filters, pagination and localization
 * - POST: create a new project with validation and authorization
 */

import { NextRequest, NextResponse } from "next/server";
import { GetProjectsV2Dto } from "@/dto/project/projects.dto";
import { ProjectV2 } from "@/models/project/project.model";
import z from "zod";
import { createProject, getProjects } from "@/services/project.service";
import { isValidObjectId } from "mongoose";
import {
  ArchitectureCommunication,
  ArchitectureStyle,
  ArchitectureType,
  DatabaseModel,
  LANGUAGES,
  Platform,
  ProjectStatus,
  ProjectType,
  Role
} from "@/shared/enums";
import { toProjectListDTO } from "@/mappers/project.mapper";
import { handleApiError } from "@/lib/http/handle-api-error";
import { PERMISSIONS, withAuthorization } from "@/lib/auth";

/* ================== Utils ================== */

/**
 * Escapes special regex characters to avoid injection
 * when building MongoDB $regex queries.
 */
function sanitizeSearch(input: string): string {
  return input.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Validates and parses query params for GET /projects
 * Throws ZodError if validation fails.
 */
function validateGetProjects(query: Record<string, string>) {
  const result = GetProjectsV2Dto.safeParse(query);
  if (!result.success) {
    throw result.error;
  }
  return result.data;
}

/* ================== Schemas ================== */

/**
 * Schema for localized content per language.
 */
const localizedContentSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  problem: z.string().min(1),
  solution: z.string().min(1),
});

/**
 * Schema for multilingual project content.
 */
const contentSchema = z.object({
  es: localizedContentSchema,
  en: localizedContentSchema,
});

/**
 * Schema describing team and project context.
 */
const teamInfoSchema = z.object({
  role: z.enum(Role),
  teamSize: z.number().int().positive(),
  duration: z.string(),
  projectType: z.enum(ProjectType),
});

/**
 * Schema defining software architecture decisions.
 */
const architectureSchema = z.object({
  type: z.enum(ArchitectureType),
  style: z.enum(ArchitectureStyle),
  communication: z.array(z.enum(ArchitectureCommunication)).nonempty(),
  databaseModel: z.enum(DatabaseModel),
});

/**
 * Schema for project impact information.
 */
const impactSchema = z.object({
  metrics: z.array(z.string()),
  users: z.string(),
});

/**
 * Schema for project-related URLs.
 */
const urlSchema = z.object({
  repository: z.string().url(),
  live: z.string().url().nullable(),
  documentation: z.string().url().nullable(),
});

/**
 * Schema for visual assets.
 */
const assetSchema = z.object({
  main: z.string().min(1),
  blur: z.string().min(1),
});

/**
 * Schema for creating a new project.
 * Used to validate POST request body.
 */
const createProjectSchema = z.object({
  content: contentSchema,
  teamInfo: teamInfoSchema,
  architecture: architectureSchema,
  platform: z.enum(Platform),
  technologyIds: z.array(z.string().refine(isValidObjectId)),
  featureIds: z.array(z.string().refine(isValidObjectId)),
  categoryIds: z.array(z.string().refine(isValidObjectId)),
  technicalChallenges: z.array(z.string()),
  impact: impactSchema,
  learnings: z.array(z.string()),
  urls: urlSchema,
  assets: assetSchema,
  importanceScore: z.number().min(1).max(5),
  status: z.enum(ProjectStatus),
});

/* ================== Filters ================== */

/**
 * Builds a MongoDB filter object based on
 * project status and text search.
 */
function buildProjectFilter(status?: string, search?: string) {
  const filter: Record<string, unknown> = {};

  if (status) filter.status = status;

  if (search) {
    const safeSearch = sanitizeSearch(search);
    filter.$or = [
      { "content.es.title": { $regex: safeSearch, $options: "i" } },
      { "content.en.title": { $regex: safeSearch, $options: "i" } },
      { "content.es.description": { $regex: safeSearch, $options: "i" } },
      { "content.en.description": { $regex: safeSearch, $options: "i" } },
    ];
  }

  return filter;
}

/* ================== GET ================== */

/**
 * GET /projects
 * Returns a paginated and filtered list of projects.
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const query = Object.fromEntries(searchParams.entries());

    const {
      status,
      search,
      limit = 10,
      page = 1,
      language = LANGUAGES.ES,
    } = validateGetProjects(query);

    const safeLimit = Math.min(Number(limit), 100);
    const safePage = Math.max(Number(page), 1);
    const filter = buildProjectFilter(status, search);

    const [projects, total] = await Promise.all([
      getProjects(filter, safePage, safeLimit),
      ProjectV2.countDocuments(filter),
    ]);

    return NextResponse.json({
      data: projects.map(p => toProjectListDTO(p, language)),
      pagination: {
        total,
        limit: safeLimit,
        currentPage: safePage,
        totalPages: Math.ceil(total / safeLimit),
      },
    });
  } catch (error) {
    return handleApiError(error);
  }
}

/* ================== POST ================== */

/**
 * POST /projects
 * Creates a new project.
 * Requires CREATE permission.
 */
export const POST = withAuthorization(
  PERMISSIONS.CREATE,
  async (req: NextRequest) => {
    try {
      const body = await req.json();
      const data = createProjectSchema.parse(body);
      const created = await createProject(data);

      return NextResponse.json(
        { id: created._id },
        { status: 201 }
      );
    } catch (error) {
      return handleApiError(error);
    }
  }
);
