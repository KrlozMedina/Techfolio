import { Permission } from "./permissions";
import { UserRole } from "./types";

/**
 * authorize
 * --------------------------------------------------
 * Determina si un rol específico tiene permitido
 * ejecutar una acción (permission).
 *
 * @param role - Rol del usuario (admin | editor | viewer)
 * @param permission - Acción solicitada (read | create | update | delete)
 * @returns boolean
 *
 * Implementa un esquema RBAC (Role-Based Access Control)
 * simple y explícito.
 */
export function authorize(
  role: UserRole,
  permission: Permission
): boolean {

  /**
   * Mapa estático de permisos por rol.
   * Cada rol declara explícitamente qué acciones puede ejecutar.
   */
  const rolePermissions: Record<UserRole, Permission[]> = {
    admin: [
      "read",
      "create",
      "update",
      "delete",
    ],
    editor: [
      "read",
      "create",
      "update",
    ],
    viewer: [
      "read",
    ],
  };

  /**
   * Retorna true si el permiso solicitado
   * existe dentro de los permisos del rol.
   */
  return rolePermissions[role]?.includes(permission);
}
