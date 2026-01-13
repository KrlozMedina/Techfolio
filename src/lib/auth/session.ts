import { cookies } from 'next/headers';
import { verifyToken, SessionPayload } from './token';

/**
 * getSession
 * --------------------------------------------------
 * Recupera la sesión activa a partir del token JWT
 * almacenado en cookies.
 *
 * Flujo:
 * 1. Obtiene la cookie `authToken`.
 * 2. Si no existe, retorna null (no hay sesión activa).
 * 3. Si existe, valida el token usando `verifyToken`.
 * 4. Si el token es inválido o expirado, retorna null.
 *
 * Nota:
 * - Debe ejecutarse en Node (server-side) porque `verifyToken`
 *   usa JWT que no funciona en Client Components.
 *
 * @returns SessionPayload | null
 */
export async function getSession(): Promise<SessionPayload | null> {
  const store = await cookies();
  const token = store.get('authToken')?.value;

  if (!token) return null;

  try {
    return verifyToken(token);
  } catch {
    // Token inválido, expirado o manipulado
    return null;
  }
}
