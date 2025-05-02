// V1
import mongoose, { Document, Schema } from "mongoose";

// Define la interfaz para el documento del proyecto
export interface IProject extends Document {
  _id: string;
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

// V2

// import mongoose, { Document, Schema } from "mongoose";

// // Definición de interfaces para las subestructuras
// interface IProjectInfo {
//   title: string;
//   description: string;
// }

// interface ITeamInfo {
//   roleId: number;
//   teamSize: number;
//   duration: number; // en días
// }

// interface ITags {
//   platformId: number;
//   featureIds?: number[];
//   technologyIds: number[];
//   categoryIds: number[];
// }

// interface ILinks {
//   repository: string;
//   live: string;
// }

// interface IImages {
//   main: string;
//   blur: string;
// }

// // Interfaz del proyecto
// export interface IProject extends Document {
//   _id: string;
//   projectInfo: {
//     es: IProjectInfo;
//     en: IProjectInfo;
//   };
//   teamInfo: ITeamInfo;
//   tags: ITags;
//   slug: string;
//   links: ILinks;
//   images: IImages;
//   importanceScore: number;
//   status: 'finished' | 'in-progress' | 'archived';
//   createdAt?: Date;
//   updatedAt?: Date;
// }

// // Validación de URL reutilizable
// const validateUrl = (url: string): boolean => {
//   const regex = /^(https?:\/\/)?([\w.-]+)+(:\d+)?(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/;
//   return regex.test(url);
// };

// // Subesquemas
// const projectInfoSchema = new Schema<IProjectInfo>({
//   title: { type: String, required: true },
//   description: { type: String, required: true },
// });

// const teamInfoSchema = new Schema<ITeamInfo>({
//   roleId: { type: Number, required: true },
//   teamSize: { type: Number, required: true },
//   duration: { type: Number, required: true }, // en días
// });

// const tagsSchema = new Schema<ITags>({
//   platformId: { type: Number, required: true },
//   featureIds: { type: [Number] },
//   technologyIds: { type: [Number], required: true },
//   categoryIds: { type: [Number], required: true },
// });

// const linksSchema = new Schema<ILinks>({
//   repository: {
//     type: String,
//     required: true,
//     validate: {
//       validator: validateUrl,
//       message: "La URL del repositorio no es válida.",
//     },
//   },
//   live: {
//     type: String,
//     required: true,
//     validate: {
//       validator: validateUrl,
//       message: "La URL en vivo no es válida.",
//     },
//   },
// });

// const imagesSchema = new Schema<IImages>({
//   main: { type: String, required: true },
//   blur: { type: String, required: true },
// });

// // Esquema principal
// const projectSchema = new Schema<IProject>(
//   {
//     projectInfo: {
//       es: { type: projectInfoSchema, required: true },
//       en: { type: projectInfoSchema, required: true },
//     },
//     teamInfo: { type: teamInfoSchema, required: true },
//     tags: { type: tagsSchema, required: true },
//     slug: { type: String, required: true, unique: true },
//     links: { type: linksSchema, required: true },
//     images: { type: imagesSchema, required: true },
//     importanceScore: { type: Number, required: true },
//     status: { type: String, enum: ['finished', 'in-progress', 'archived'], required: true },
//   },
//   {
//     timestamps: true, // Agrega createdAt y updatedAt automáticamente
//   }
// );

// // Exporta el modelo o usa el existente si ya está definido
// export default mongoose.models.Project ||
//   mongoose.model<IProject>("Project", projectSchema);