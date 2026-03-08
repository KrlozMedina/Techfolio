import { AuthUser } from "./types";
import { z } from "zod";

/**
 * Validaciones de entorno necesarias para la autenticación.
 * Si alguna variable crítica no está definida, el proceso falla al iniciar.
 */
if (!process.env.PASSWORD_HASH)
  throw new Error("PASSWORD_HASH not set");

if (!process.env.JWT_SECRET)
  throw new Error("JWT_SECRET not set");

if (process.env.JWT_SECRET.length < 32)
  throw new Error("JWT_SECRET must be at least 32 characters long");

/**
 * Schema Zod para validar cada usuario estático.
 * - username: nombre de usuario obligatorio
 * - role: rol del usuario, solo puede ser 'admin', 'editor' o 'viewer'
 */
const AuthUserSchema = z.object({
  username: z.string(),
  role: z.enum(["admin", "editor", "viewer"]),
});

/**
 * Schema Zod para validar el arreglo completo de usuarios estáticos.
 */
const StaticUsersSchema = z.array(AuthUserSchema);

/**
 * Array tipado de usuarios autenticados.
 * Se llena al parsear la variable de entorno STATIC_USERS.
 */
let parsedUsers: AuthUser[] = [];

try {
  parsedUsers = StaticUsersSchema.parse(
    JSON.parse(process.env.STATIC_USERS || "[]")
  );
} catch {
  throw new Error("STATIC_USERS must be valid JSON with correct structure");
}

/**
 * Configuración de autenticación exportada para usar en la aplicación.
 */
export const AUTH_CONFIG = {
  COOKIE_NAME: "authToken",        // Nombre de la cookie para almacenar JWT
  TOKEN_EXPIRATION: 60 * 60,       // Expiración del token en segundos (1 hora)
  USERS: parsedUsers,              // Usuarios estáticos validados
  PASSWORD_HASH: process.env.PASSWORD_HASH, // Hash de contraseña global
};

/**
 * Secreto usado para firmar y verificar JWTs.
 * Debe ser seguro (mínimo 32 caracteres).
 */
export const JWT_SECRET: string = process.env.JWT_SECRET;
