/**
 * PERMISSIONS
 * --------------------------------------------------
 * Lista de permisos posibles en el sistema.
 * Se define como `as const` para mantener los valores literales
 * y permitir tipado seguro.
 */
export const PERMISSIONS = {
  READ: "read",
  CREATE: "create",
  UPDATE: "update",
  DELETE: "delete",
} as const;

/**
 * Permission
 * --------------------------------------------------
 * Tipo TypeScript que representa cualquiera de los permisos
 * definidos en `PERMISSIONS`.
 *
 * Ejemplo:
 *   let p: Permission;
 *   p = "read";   // válido
 *   p = "delete"; // válido
 *   p = "foo";    // error de compilación
 */
export type Permission = typeof PERMISSIONS[keyof typeof PERMISSIONS];
