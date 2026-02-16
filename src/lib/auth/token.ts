import jwt, { JwtPayload } from "jsonwebtoken";
import { AUTH_CONFIG, JWT_SECRET } from "./config";
import { z } from "zod";
import { UserRole } from "./types";

/**
 * Schema Zod para validar la carga útil (payload) del JWT.
 * Garantiza que el token siempre contenga:
 * - username: nombre del usuario
 * - role: rol del usuario ('admin' | 'editor' | 'viewer')
 */
const SessionPayloadSchema = z.object({
  username: z.string(),
  role: z.enum(["admin", "editor", "viewer"]),
});

/** Tipo TypeScript inferido de la carga útil del JWT */
export type SessionPayload = z.infer<typeof SessionPayloadSchema>;

/**
 * Crea un token JWT firmado para un usuario dado.
 * 
 * @param username - Nombre del usuario
 * @param role - Rol del usuario (admin, editor, viewer)
 * @returns Token JWT como string
 */
export function createToken(
  username: string,
  role: UserRole
): string {
  return jwt.sign(
    { username, role },         // Payload del token
    JWT_SECRET,                 // Secreto para firmar
    {
      expiresIn: AUTH_CONFIG.TOKEN_EXPIRATION, // Expiración del token (segundos)
      algorithm: "HS256",                      // Algoritmo de firma
    }
  );
}

/**
 * Verifica y decodifica un token JWT.
 * Valida que el payload cumpla con la estructura esperada.
 * 
 * @param token - Token JWT a verificar
 * @returns Payload del token tipado como SessionPayload
 * @throws Error si el token no es válido o la estructura es incorrecta
 */
export function verifyToken(token: string): SessionPayload {
  // Decodifica el token usando el secreto
  const decoded = jwt.verify(token, JWT_SECRET, {
    algorithms: ["HS256"],
  }) as JwtPayload;

  // Valida que el payload tenga la estructura correcta
  return SessionPayloadSchema.parse(decoded);
}
