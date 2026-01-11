export const PERMISSIONS = {
  PROJECT_READ: "project:read",
  PROJECT_CREATE: "project:create",
  PROJECT_UPDATE: "project:update",
  PROJECT_DELETE: "project:delete",
  TECHNOLOGY_READ: "technology:read",
  TECHNOLOGY_CREATE: "technology:create",
  TECHNOLOGY_UPDATE: "technology:update",
  TECHNOLOGY_DELETE: "technology:delete",
} as const;

export type Permission = typeof PERMISSIONS[keyof typeof PERMISSIONS];