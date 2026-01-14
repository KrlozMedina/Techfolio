import { ProjectsLocale } from "../es/projects";

export const projects: ProjectsLocale = {
  hero: {
    title: 'Impactful Projects',
    quote: {
      text: 'The way to get started is to stop talking and begin doing.',
      author: 'Walt Disney',
    },
  },

  projects: {
    title: 'Explore Projects',
    intro:
      'A selection of professional and personal projects where I apply full stack development, automation, and IoT. Each project reflects a real problem, a technical solution, and its current status.',
  },

  stack: {
    title: "Tech Stack",
    intro: 
      "Technologies I actively use across my projects. The number shows how many projects each tool or language has been applied to.",
  },

  successStories: {
    title: 'Success Stories',
    intro:
      'Projects where the implemented solution produced measurable results, operational improvements, or direct impact on processes and users.',
  },

  cta: {
    title: 'Would you like to work with me on your next project?',
    action: 'Explore services',
  },

  labels: {
    client: 'Client',
    challenge: 'Challenge',
    solution: 'Solution',
    results: 'Results',
  },
} as const;

