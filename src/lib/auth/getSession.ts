import { cookies } from 'next/headers';
import { verifyToken } from './token';

/**
 * getSession
 * --------------------------------------------------
 * Recupera la sesión activa a partir del JWT almacenado en cookies.
 *
 * Flujo:
 * 1. Obtiene la cookie 'authToken' usando `cookies()` (Next.js App Router / server-side).
 * 2. Si no existe la cookie → retorna null (no hay sesión activa).
 * 3. Si existe, verifica el token usando `verifyToken`.
 * 4. Si el token es inválido o expirado → retorna null.
 *
 * Nota:
 * - Debe ejecutarse en entorno Node/Server. No funciona en Client Components.
 *
 * @returns SessionPayload | null
 */
export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get('authToken')?.value;

  if (!token) return null;

  try {
    return verifyToken(token);
  } catch {
    // Token inválido, expirado o manipulado
    return null;
  }
}
