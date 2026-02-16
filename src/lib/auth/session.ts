import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { verifyToken, SessionPayload } from "./token";

/**
 * Type guard para validar que un objeto tenga la forma de SessionPayload.
 * Esto es útil porque `verifyToken` podría devolver algo inesperado
 * si el token es manipulado.
 * 
 * @param payload - Objeto a verificar
 * @returns true si el objeto cumple la estructura de SessionPayload
 */
function isValidSessionPayload(
  payload: unknown
): payload is SessionPayload {
  if (!payload || typeof payload !== "object") return false;

  const p = payload as Record<string, unknown>;

  // Verifica que la propiedad role exista y sea string
  if (typeof p.role !== "string") return false;

  return true;
}

/**
 * Obtiene la sesión del usuario a partir de la cookie 'authToken'.
 * Funciona tanto en Server Components como en middlewares o APIs.
 * 
 * @param req - Opcional. Request de Next.js. Si no se pasa, usa cookies del contexto actual.
 * @returns La carga útil del token si es válida, o null si no hay sesión
 */
export async function getSession(
  req?: NextRequest
): Promise<SessionPayload | null> {
  try {
    // Obtiene la tienda de cookies
    const store = req ? req.cookies : await cookies();

    // Obtiene el valor de la cookie 'authToken'
    const token = store.get("authToken")?.value;

    if (!token) return null; // No hay token, no hay sesión

    // Verifica y decodifica el token
    const payload = verifyToken(token);

    // Valida que la carga útil tenga la forma correcta
    if (!isValidSessionPayload(payload)) return null;

    return payload; // Sesión válida
  } catch {
    // Cualquier error (token inválido, expirado, etc.) devuelve null
    return null;
  }
}
