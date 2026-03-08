import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { createToken } from '@/lib/auth/token';
import { AUTH_CONFIG } from '@/lib/auth/config';
import { AuthUser } from '@/lib/auth/types';

/**
 * LoginSchema
 * --------------------------------------------------
 * Valida el payload de login recibido desde el cliente.
 * Ambos campos son obligatorios.
 */
export const LoginSchema = z.object({
  username: z.string().min(1, "Username cannot be empty"),
  password: z.string().min(1, "Password cannot be empty"),
});

/**
 * parseCookies
 * --------------------------------------------------
 * Convierte el header de cookies en un objeto key/value.
 * @param cookieHeader - string del header 'cookie'
 * @returns Record<string, string> de cookies
 */
export const parseCookies = (cookieHeader: string | null): Record<string, string> =>
  cookieHeader
    ? Object.fromEntries(cookieHeader.split(';').map(c => c.trim().split('=')))
    : {};

/**
 * loginUser
 * --------------------------------------------------
 * Valida las credenciales de un usuario y devuelve
 * un JWT firmado si son correctas.
 *
 * Flujo:
 * 1. Busca el usuario en la lista estática de AUTH_CONFIG.USERS
 * 2. Si no existe → retorna null
 * 3. Valida contraseña usando bcrypt.compareSync contra PASSWORD_HASH
 * 4. Si falla → retorna null
 * 5. Si es correcto → genera token con createToken(username, role)
 *
 * @param username - Nombre de usuario
 * @param password - Contraseña en texto plano
 * @returns token JWT como string | null si falla autenticación
 */
export const loginUser = (username: string, password: string): string | null => {
  const users: AuthUser[] = AUTH_CONFIG.USERS;
  const passwordHash = AUTH_CONFIG.PASSWORD_HASH;

  const user = users.find(u => u.username === username);
  if (!user) return null;

  // ⚠️ Condición extra: si no tiene rol y la contraseña no coincide, falla
  if (!user.role && !bcrypt.compareSync(password, passwordHash)) {
    return null;
  }

  return createToken(username, user.role);
};
