import mongoose, { Document, Schema } from "mongoose";

// Define la interfaz para el documento del proyecto
export interface IProject extends Document {
  title: string;
  slug: string;
  description: string;
  technologies: string[];
  // features: string[];
  repositoryUrl: string;
  liveUrl: string;
  imageUrl: string;
  category: string[];
  role: string;
  teamSize: number;
  duration: string;
  priority: number;
  projectType: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Define el esquema de Mongoose
const projectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true, unique: true },
    slug: { type: String, required: true },
    description: { type: String, required: true },
    technologies: { type: [String], required: true },
    // features: { type: [String], required: true },
    repositoryUrl: {
      type: String,
      required: true,
      validate: {
        validator: function (url: string) {
          // Validar formato de URL
          const regex = /^(https?:\/\/)?([\w.-]+)+(:\d+)?(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/;
          return regex.test(url);
        },
        message: "La URL no es válida.",
      },
    },
    liveUrl: {
      type: String,
      required: true,
      validate: {
        validator: function (url: string) {
          // Validar formato de URL
          return /^(https?:\/\/)?([\w.-]+)+(:\d+)?(\/([\w/_.]*)?)?$/.test(url);
        },
        message: "La URL no es válida.",
      },
    },
    imageUrl: { type: String, required: true },
    category: { type: [String], required: true },
    role: { type: String },
    teamSize: { type: Number },
    duration: { type: String },
    priority: { type: Number, required: true, min: 1, max: 10 },
    projectType: { type: String, required: true },
  },
  {
    timestamps: true, // Agrega createdAt y updatedAt automáticamente
  }
);

// Exporta el modelo o usa el existente si ya está definido
export default mongoose.models.Project ||
  mongoose.model<IProject>("Project", projectSchema);
