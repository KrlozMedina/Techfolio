import mongoose from "mongoose";
import { projectSchema, ProjectV2Schema } from "./Projects.schema";
import { IProject, IProjectV2 } from "./Project.interface";

// Utiliza modelos existentes si ya están registrados, si no, créalos
const ProjectV1 = mongoose.models.Project as mongoose.Model<IProject> 
  || mongoose.model<IProject>("Project", projectSchema);

const ProjectV2 = mongoose.models.ProjectV2 as mongoose.Model<IProjectV2> 
  || mongoose.model<IProjectV2>("ProjectV2", ProjectV2Schema);

export { ProjectV1, ProjectV2 };
