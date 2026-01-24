import { Schema } from "mongoose";
import { IProjectV1, IProjectV2 } from "@/models/project/project.interface";
import { Role } from "@/shared/enums/role.enum";
import { ProjectType } from "@/shared/enums/project-type.enum";
import { ArchitectureType } from "@/shared/enums/architecture-type.enum";
import { ArchitectureStyle } from "@/shared/enums/architecture-style.enum";
import { DatabaseModel } from "@/shared/enums/database-model.enum";
import { Platform } from "@/shared/enums/platform.enum";
import { ProjectStatus } from "@/shared/enums/project-status.enum";
import { slugify } from "@/lib/utils/slugify";
import { ArchitectureCommunication } from "@/shared/enums/architecture-communication.enum";

/* =========================================================
 * VALIDADORES Y HELPERS REUTILIZABLES
 * ========================================================= */

/**
 * Valida URLs HTTP/HTTPS de forma básica.
 */
const isValidUrl = (url: string) =>
  /^(https?:\/\/)?([\w.-]+)+(:\d+)?(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/.test(url);

/**
 * Campo string genérico.
 */
const stringField = (required = true) => ({ type: String, required });

/**
 * Campo array de strings.
 */
const stringArrayField = (required = true) => ({ type: [String], required });

/**
 * Campo URL con validación.
 */
const urlField = (required = true) => ({
  type: String,
  required,
  validate: { validator: isValidUrl, message: "La URL no es válida." },
});

/**
 * Campo numérico con opciones.
 */
const numberField = (
  options: Partial<{ required: boolean; min: number; max: number }> = {}
) => ({
  type: Number,
  ...options,
});

/* =========================================================
 * SCHEMA PROJECT V1 (LEGACY / SIMPLE)
 * ========================================================= */

/**
 * Schema V1:
 * - Modelo plano y legacy
 * - No localizado
 * - Mantiene compatibilidad con proyectos antiguos
 */
export const projectV1Schema = new Schema<IProjectV1>(
  {
    title: { ...stringField(), unique: true },
    slug: stringField(),
    description: stringField(),
    technologies: stringArrayField(),
    repositoryUrl: urlField(),
    liveUrl: urlField(),
    imageUrl: stringField(),
    category: stringArrayField(),
    role: { type: String },
    teamSize: numberField(),
    duration: stringField(false),
    priority: numberField({ required: true, min: 1, max: 10 }),
    projectType: stringField(),
  },
  { timestamps: true }
);

/* =========================================================
 * SCHEMA PROJECT V2 (ACTUAL)
 * ========================================================= */

/**
 * Schema V2:
 * - Soporte multilenguaje
 * - Arquitectura, plataforma y dominio explícitos
 * - Relaciones con Technology, Feature y Category
 */
export const ProjectV2Schema = new Schema<IProjectV2>(
  {
    /**
     * Slug único del proyecto.
     * Se genera automáticamente si no se envía.
     */
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    /**
     * Contenido localizado (ES / EN).
     */
    content: {
      es: {
        title: { type: String, required: true },
        description: { type: String, required: true },
        problem: { type: String, required: true },
        solution: { type: String, required: true },
      },
      en: {
        title: { type: String, required: true },
        description: { type: String, required: true },
        problem: { type: String, required: true },
        solution: { type: String, required: true },
      },
    },

    /**
     * Información del equipo.
     */
    teamInfo: {
      role: {
        type: String,
        enum: Object.values(Role),
        required: true,
      },
      teamSize: { type: Number },
      duration: { type: String },
      projectType: {
        type: String,
        enum: Object.values(ProjectType),
        required: true,
      },
    },

    /**
     * Arquitectura del proyecto.
     */
    architecture: {
      type: {
        type: String,
        enum: Object.values(ArchitectureType),
        required: true,
      },
      style: {
        type: String,
        enum: Object.values(ArchitectureStyle),
        required: true,
      },
      communication: [
        {
          type: String,
          enum: Object.values(ArchitectureCommunication),
          required: true,
        },
      ],
      databaseModel: {
        type: String,
        enum: Object.values(DatabaseModel),
        required: true,
      },
    },

    /**
     * Plataforma objetivo.
     */
    platform: {
      type: String,
      enum: Object.values(Platform),
      required: true,
    },

    /**
     * Relaciones (referencias).
     */
    technologyIds: [
      { type: Schema.Types.ObjectId, ref: "Technology", required: true },
    ],
    featureIds: [
      { type: Schema.Types.ObjectId, ref: "Feature", required: true },
    ],
    categoryIds: [
      { type: Schema.Types.ObjectId, ref: "Category", required: true },
    ],

    /**
     * Información cualitativa.
     */
    technicalChallenges: [{ type: String }],
    impact: {
      metrics: [{ type: String }],
      users: { type: String },
    },
    learnings: [{ type: String }],

    /**
     * URLs del proyecto.
     */
    urls: {
      repository: { type: String, required: true },
      live: { type: String },
      documentation: { type: String },
    },

    /**
     * Recursos gráficos.
     */
    assets: {
      main: { type: String, required: true },
      blur: { type: String, required: true },
    },

    /**
     * Peso del proyecto para ordenamiento.
     */
    importanceScore: { type: Number, required: true },

    /**
     * Estado del proyecto.
     */
    status: {
      type: String,
      enum: Object.values(ProjectStatus),
      required: true,
    },
  },
  { timestamps: true }
);

/* =========================================================
 * HOOKS
 * ========================================================= */

/**
 * Genera el slug automáticamente antes de validar,
 * usando el título en EN o ES.
 */
ProjectV2Schema.pre("validate", function (next) {
  if (!this.slug) {
    const source = this.content.en?.title || this.content.es?.title;
    if (source) this.slug = slugify(source);
  }
  next();
});

/**
 * Recalcula el slug si el título cambia en un update.
 */
ProjectV2Schema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate() as any;

  const langSource =
    update?.$set?.content?.en?.title ||
    update?.$set?.content?.es?.title ||
    update?.content?.en?.title ||
    update?.content?.es?.title;

  if (langSource) {
    update.$set = {
      ...(update.$set || {}),
      slug: slugify(langSource),
    };
  }

  next();
});
