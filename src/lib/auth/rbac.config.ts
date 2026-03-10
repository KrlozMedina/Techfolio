import { Feature } from "@/shared/auth/features.enum";
import { Permission } from "@/shared/auth/permissions";
import { Role } from "@/shared/auth/role.enum";

/**
 * Representa el conjunto de permisos asociados a una feature.
 *
 * Cada feature puede tener múltiples permisos:
 * - READ
 * - CREATE
 * - UPDATE
 * - DELETE
 */
type FeaturePermissions = Record<Feature, Permission[]>;

/**
 * =========================================================
 * RBAC (Role-Based Access Control)
 * ---------------------------------------------------------
 * Define la matriz de permisos del sistema basada en roles.
 *
 * Estructura:
 *
 * Role → Feature → Permisos permitidos
 *
 * Permite controlar qué acciones puede realizar cada rol
 * sobre las diferentes áreas del sistema.
 *
 * Roles definidos:
 * - ADMIN
 * - EDITOR
 * - VIEWER
 *
 * Permisos disponibles:
 * - READ
 * - CREATE
 * - UPDATE
 * - DELETE
 *
 * Este objeto es utilizado por la función `canAccess`
 * para validar autorización dentro de la aplicación.
 * =========================================================
 */
export const RBAC: Record<Role, FeaturePermissions> = {

  /**
   * Rol con acceso completo al sistema.
   * Puede realizar operaciones de lectura,
   * creación, actualización y eliminación
   * en la mayoría de features.
   */
  ADMIN: {
    DASHBOARD: ["READ"],
    PROJECTS: ["READ","CREATE","UPDATE","DELETE"],
    CLIENTS: ["READ","CREATE","UPDATE","DELETE"],
    BLOG: ["READ","CREATE","UPDATE","DELETE"],
    RESOURCES: ["READ","CREATE","UPDATE","DELETE"],
    PROFILE: ["READ","UPDATE"],
    GALLERY: ["READ","CREATE","DELETE"],
    RESUME: ["READ","UPDATE"]
  },

  /**
   * Rol de edición con permisos limitados.
   * Puede crear y modificar contenido
   * pero no eliminar en la mayoría de casos.
   */
  EDITOR: {
    DASHBOARD: ["READ"],
    PROJECTS: ["READ","CREATE","UPDATE"],
    CLIENTS: ["READ","UPDATE"],
    BLOG: ["READ","CREATE","UPDATE"],
    RESOURCES: ["READ","CREATE"],
    PROFILE: ["READ","UPDATE"],
    GALLERY: ["READ","CREATE"],
    RESUME: ["READ"]
  },

  /**
   * Rol de solo lectura.
   * Puede consultar información
   * pero no modificarla.
   */
  VIEWER: {
    DASHBOARD: [],
    PROJECTS: ["READ"],
    CLIENTS: ["READ"],
    BLOG: ["READ"],
    RESOURCES: ["READ"],
    PROFILE: ["READ"],
    GALLERY: ["READ"],
    RESUME: ["READ"]
  }

};