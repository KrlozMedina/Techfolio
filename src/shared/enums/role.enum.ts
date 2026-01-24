/**
 * Defines the possible roles a team member can have within a project.
 *
 * Used in:
 * - Project team information
 * - Validation schemas (Zod)
 * - Business logic and filtering
 *
 * Each value represents a professional specialization or responsibility.
 */
export enum Role {
  /** Developer responsible for both frontend and backend layers */
  FULL_STACK = "Full Stack",

  /** Specialist focused on user interface and client-side logic */
  FRONTEND = "FrontEnd",

  /** Specialist focused on server-side logic and APIs */
  BACKEND = "BackEnd",

  /** Engineer focused on automation systems and control processes */
  AUTOMATION = "Automation",

  /** Specialist in Internet of Things solutions */
  IOT = "IOT",

  /** Engineer focused on low-level and hardware-near development */
  EMBEDDED = "Embedded",

  /** Engineer responsible for CI/CD, infrastructure and deployment */
  DEVOPS = "DevOps",

  /** Technical leader responsible for architectural and technical decisions */
  TECH_LEAD = "Tech Lead",
}
