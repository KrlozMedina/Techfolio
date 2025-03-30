export const CATEGORIES = [
  'Frontend',
  'Backend',
  'Full Stack',
  'Database',
  'DevOps',
  'Mobile Development',
  'Testing',
  'Cloud & Infrastructure',
  'Machine Learning & AI',
  'Data Analysis & Big Data',
  'Cybersecurity',
  'Game Development',
  'AR/VR',
  'IoT (Internet of Things)',
  'Blockchain',
  'Other',
] as const; // Use `as const` para que TypeScript reconozca como un tipo literal

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

export interface ITechnology extends Document {
  _id: string;
  name: string;
  category: (typeof CATEGORIES)[number]; // Limita los valores al array de categorías
  logoUrl?: string; // Opcional
}