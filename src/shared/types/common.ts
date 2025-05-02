// Tipos e interfaces reutilizables en todo el proyecto.
// user.ts, project.ts, apiResponse.ts

import { CATEGORIES } from "../constants/constants";

// export interface IProject extends Document {
//   _id: string;
//   title: string;
//   slug: string;
//   description: string;
//   technologies: string[];
//   // features: string[];
//   repositoryUrl: string;
//   liveUrl: string;
//   imageUrl: string;
//   category: string[];
//   role: string;
//   teamSize: number;
//   duration: string;
//   priority: number;
//   projectType: string;
//   createdAt?: Date;
//   updatedAt?: Date;
// }

export interface ITechnology extends Document {
  _id: string;
  name: string;
  category: (typeof CATEGORIES)[number];
  logoUrl?: string;
  // id: number;
  // category: (typeof CATEGORIES)[number];
  // logoUrl: string;
  // name: string;
  // es: {
  //   description: string
  // };
  // en: {
  //   description: string
  // }

}

interface MessageProps {
  successMessage: string | null;
  error: string | null;
  isLoading: boolean;
}

interface apiDataProps {
  postData: (endpoint: string, data: object) => Promise<void>;
}

export interface SectionProps {
  apiData: apiDataProps;
  message: MessageProps;
}

export interface ErrorResponse {
  data: {
    duplicateKey: {
      name?: string;
    }
    error?: string;
  }
}