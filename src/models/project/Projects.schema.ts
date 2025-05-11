import { Schema } from "mongoose";
import { IProject, IProjectV2 } from "@/models/project/Project.interface";
import { ProjectStatus } from "@/shared/constants/enums";

// ====================================
// VALIDADORES Y CAMPOS REUTILIZABLES 
// ====================================

const isValidUrl = (url: string) =>
  /^(https?:\/\/)?([\w.-]+)+(:\d+)?(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/.test(url);

const stringField = (required = true) => ({ type: String, required });
const stringArrayField = (required = true) => ({ type: [String], required });

const urlField = (required = true) => ({
  type: String,
  required,
  validate: { validator: isValidUrl, message: "La URL no es válida." },
});

const numberField = (options: Partial<{ required: boolean; min: number; max: number }> = {}) => ({
  type: Number,
  ...options,
});

// ====================================
// SCHEMA V1
// ====================================

export const projectSchema = new Schema<IProject>(
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

// ====================================
// SCHEMA V2
// ====================================

const localizedInfo = () => ({
  title: stringField(),
  description: stringField(),
});

export const ProjectV2Schema = new Schema<IProjectV2>(
  {
    projectInfo: {
      es: localizedInfo(),
      en: localizedInfo(),
    },
    teamInfo: {
      roleId: { type: String },
      teamSize: numberField(),
      duration: stringField(false),
    },
    tags: {
      platformId: { type: Schema.Types.Mixed, required: true },
      featureIds: [{ type: String }],
      technologyIds: [{ type: String, required: true }],
      categoryIds: [{ type: String }],
    },
    slug: { type: String, unique: true, sparse: true },
    urls: {
      repository: urlField(),
      live: urlField(),
      isDownloadable: { type: Boolean, default: false }
    },
    assets: {
      main: stringField(),
      blur: stringField(),
    },
    importanceScore: numberField({ required: true, min: 1, max: 10 }),
    status: {
      type: String,
      required: true,
      enum: Object.values(ProjectStatus),
    },
  },
  { timestamps: true }
);

// ====================================
// ÍNDICES
// ====================================

ProjectV2Schema.index({ "projectInfo.es.title": "text", "projectInfo.en.title": "text" });
ProjectV2Schema.index({ status: 1, tags: 1 });
