import { Permission } from "./permissions";
import { UserRole } from "./types";
// import { UserRole } from "./roles";

export function authorize(role: UserRole, permission: Permission): boolean {
  const rolePermissions: Record<UserRole, Permission[]> = {
    admin: [
      "project:read",
      "project:create",
      "project:update",
      "project:delete",
      "technology:read",
      "technology:create",
      "technology:update",
      "technology:delete",
    ],
    editor: [
      "project:read",
      "project:create",
      "project:update",
      "technology:read",
      "technology:create",
      "technology:update",
    ],
    viewer: [
      "project:read",
      "technology:read",
    ],
  };

  return rolePermissions[role]?.includes(permission);
}
