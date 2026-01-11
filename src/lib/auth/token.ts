import jwt from 'jsonwebtoken';
import { AUTH_CONFIG, JWT_SECRET } from './config';

export interface SessionPayload {
  username: string;
  role: UserRole;
}

/**
 * Crea un token JWT
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
 * Verifica un token JWT
 */
import { z } from "zod";
import { UserRole } from './types';

const SessionPayloadSchema = z.object({
  username: z.string(),
  role: z.enum(["admin", "editor", "viewer"]),
});

export function verifyToken(token: string): SessionPayload {
  const decoded = jwt.verify(token, JWT_SECRET);
  return SessionPayloadSchema.parse(decoded);
}
