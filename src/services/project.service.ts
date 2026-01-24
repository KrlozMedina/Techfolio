/**
 * Project service layer.
 *
 * Contains all database operations related to projects:
 * - Creation
 * - Update
 * - Retrieval (single and list)
 * - Deletion
 *
 * Responsibilities:
 * - Ensure DB connection
 * - Handle MongoDB-specific errors
 * - Translate low-level errors into domain errors
 */

import { CreateProjectDTO } from "@/dto/project/project.create.dto";
import { UpdateProjectDTO } from "@/dto/project/project.update.dto";
import connectDB from "@/lib/db/connectDB";
import { ProjectV2 } from "@/models/project/project.model";
import { SlugAlreadyExistsError } from "@/errors/domain/slug-already-exists.error";

/**
 * Creates a new project.
 *
 * @param data - Validated project creation DTO
 * @throws SlugAlreadyExistsError when the slug is duplicated
 * @returns The created project document
 */
export async function createProject(data: CreateProjectDTO) {
  await connectDB();

  try {
    return await ProjectV2.create(data);
  } catch (error: any) {
    if (error?.code === 11000 && error?.keyPattern?.slug) {
      throw new SlugAlreadyExistsError();
    }
    throw error;
  }
}

/**
 * Updates an existing project by ID.
 *
 * @param id - MongoDB ObjectId of the project
 * @param data - Partial project update DTO
 * @throws SlugAlreadyExistsError when the slug is duplicated
 * @returns The updated project document or null if not found
 */
export async function updateProject(
  id: string,
  data: UpdateProjectDTO,
) {
  await connectDB();

  try {
    return await ProjectV2.findByIdAndUpdate(
      id,
      data,
      {
        new: true,
        runValidators: true,
      }
    );
  } catch (error: any) {
    if (error?.code === 11000 && error?.keyPattern?.slug) {
      throw new SlugAlreadyExistsError();
    }
    throw error;
  }
}

/**
 * Retrieves a project by its ID.
 *
 * Populates related references with minimal fields (slug only)
 * to reduce payload size.
 *
 * @param id - MongoDB ObjectId of the project
 * @returns The project document or null if not found
 */
export async function getProjectById(id: string) {
  await connectDB();

  return ProjectV2
    .findById(id)
    .populate("technologyIds", "slug")
    .populate("featureIds", "slug")
    .populate("categoryIds", "slug");
}

/**
 * Retrieves a paginated list of projects.
 *
 * @param filter - MongoDB filter object
 * @param safePage - Current page (1-based)
 * @param safeLimit - Maximum number of results per page
 * @returns Array of project documents
 */
export async function getProjects(
  filter: Record<string, unknown>,
  safePage: number,
  safeLimit: number
) {
  await connectDB();

  return ProjectV2
    .find(filter)
    .skip((safePage - 1) * safeLimit)
    .limit(safeLimit)
    .sort({ importanceScore: -1 })
    .populate("technologyIds", "slug")
    .populate("featureIds", "slug")
    .populate("categoryIds", "slug");
}

/**
 * Deletes a project by ID.
 *
 * @param id - MongoDB ObjectId of the project
 * @returns The deleted project document or null if not found
 */
export async function deleteProject(id: string) {
  await connectDB();
  return ProjectV2.findByIdAndDelete(id);
}
