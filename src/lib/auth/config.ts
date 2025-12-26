import { AuthUser } from './types';

if (!process.env.JWT_PASSWORD) throw new Error('JWT_PASSWORD not set');
if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET not set');

export const AUTH_CONFIG = {
  COOKIE_NAME: 'authToken',
  TOKEN_EXPIRATION: 60 * 60, // 1 hora en segundos
  USERS: JSON.parse(process.env.STATIC_USERS || '[]') as AuthUser[],
  PASSWORD_HASH: process.env.JWT_PASSWORD, // debe ser hash bcrypt
};

export const JWT_SECRET = process.env.JWT_SECRET; // secret para JWT


// /**
//  * Configuración del sistema de autenticación.
//  */
// export const AUTH_CONFIG = {
//   COOKIE_NAME: "authToken", // Nombre de la cookie donde se guarda el token
//   TOKEN_EXPIRATION: 60 * 60, // Duración del token: 1 hora (en segundos)
//   SECRET: process.env.JWT_SECRET || "secret-dev-only", // Clave secreta para firmar/verificar el JWT
//   CREDENTIALS: {
//     password: process.env.JWT_PASSWORD || "admin",
//     users: JSON.parse(process.env.STATIC_USERS || "[]"),
//   },
// };