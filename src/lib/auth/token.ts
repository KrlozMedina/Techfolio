import jwt from 'jsonwebtoken';
import { AUTH_CONFIG, JWT_SECRET } from './config';
import { z } from 'zod';
import { UserRole } from './types';

/**
 * SessionPayload
 * --------------------------------------------------
 * Interfaz que define la información mínima que
 * contendrá la sesión de un usuario en el JWT.
 */
export interface SessionPayload {
  username: string;
  role: UserRole;
}

/**
 * createToken
 * --------------------------------------------------
 * Genera un token JWT firmado para un usuario.
 *
 * @param username - Nombre de usuario
 * @param role - Rol del usuario (admin | editor | viewer)
 * @returns token JWT como string
 *
 * Opciones:
 * - Expira según AUTH_CONFIG.TOKEN_EXPIRATION (segundos)
 */
export function createToken(
  username: string,
  role: UserRole,
): string {
  return jwt.sign(
    { username, role },
    JWT_SECRET,
    { expiresIn: AUTH_CONFIG.TOKEN_EXPIRATION }
  );
}

/**
 * SessionPayloadSchema
 * --------------------------------------------------
 * Valida que el payload decodificado del JWT cumpla
 * con la estructura esperada.
 */
const SessionPayloadSchema = z.object({
  username: z.string(),
  role: z.enum(["admin", "editor", "viewer"]),
});

/**
 * verifyToken
 * --------------------------------------------------
 * Verifica y decodifica un token JWT.
 *
 * Flujo:
 * 1. Decodifica el token usando JWT_SECRET.
 * 2. Valida la estructura usando Zod.
 * 3. Retorna un SessionPayload tipado o lanza error.
 *
 * @param token - JWT a verificar
 * @returns SessionPayload
 * @throws si el token es inválido o no cumple la estructura
 */
export function verifyToken(token: string): SessionPayload {
  const decoded = jwt.verify(token, JWT_SECRET);
  return SessionPayloadSchema.parse(decoded);
}
