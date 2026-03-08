import { cookies } from 'next/headers';
import { AUTH_CONFIG } from './config';

/** Nombre de la cookie usada para almacenar el JWT */
const COOKIE_NAME = 'authToken';

/**
 * setAuthToken
 * --------------------------------------------------
 * Guarda el token JWT en las cookies del navegador.
 *
 * @param token - JWT generado tras login exitoso
 *
 * Opciones:
 * - httpOnly: evita acceso desde JS del cliente
 * - secure: solo en HTTPS en producción
 * - sameSite: 'strict' para evitar CSRF
 * - path: '/' para que la cookie sea accesible en toda la app
 * - maxAge: duración de la cookie (segundos)
 */
export async function setAuthToken(token: string) {
  const store = await cookies();
  store.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: AUTH_CONFIG.TOKEN_EXPIRATION,
  });
}

/**
 * deleteAuthToken
 * --------------------------------------------------
 * Elimina la cookie de autenticación del usuario.
 * Se usa para logout o invalidación de sesión.
 */
export async function deleteAuthToken() {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}
