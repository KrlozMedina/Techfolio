/**
 * UserRole
 * --------------------------------------------------
 * Define los roles posibles en el sistema.
 * Se utiliza en el RBAC y para tipado de JWT.
 */
export type UserRole = "admin" | "editor" | "viewer";

/**
 * AuthUser
 * --------------------------------------------------
 * Representa un usuario autenticable en el sistema.
 *
 * @property username - Nombre de usuario único
 * @property role - Rol asignado al usuario (UserRole)
 */
export type AuthUser = {
  username: string;
  role: UserRole;
};
