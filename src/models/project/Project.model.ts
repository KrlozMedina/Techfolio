import mongoose from "mongoose";
import { projectV1Schema, ProjectV2Schema } from "./project.schema";
import { IProjectV1 } from "./project.interface";

/**
 * ============================
 * MODELO PROJECT V1 (LEGACY)
 * ============================
 *
 * - Usa el nombre de colección por defecto (`projects`)
 * - Mantiene compatibilidad con la versión antigua del proyecto
 * - Evita redefinir el modelo si ya existe (hot-reload / serverless)
 */
export const ProjectV1 =
  (mongoose.models.Project as mongoose.Model<IProjectV1>) ||
  mongoose.model<IProjectV1>("Project", projectV1Schema);

/**
 * ============================
 * MODELO PROJECT V2 (ACTUAL)
 * ============================
 *
 * - Modelo moderno con soporte multilenguaje y relaciones
 * - Usa explícitamente la colección `projectsV2`
 * - Previene errores de redefinición en entornos serverless
 */
export const ProjectV2 =
  mongoose.models.ProjectV2 ||
  mongoose.model("ProjectV2", ProjectV2Schema, "projectsV2");
