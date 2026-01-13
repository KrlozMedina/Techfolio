import { AuthUser } from './types';

/**
 * Validación de variables de entorno críticas.
 * --------------------------------------------------
 * Si no existen, se lanza un error al iniciar la app.
 */
if (!process.env.PASSWORD_HASH)
  throw new Error('JWT_PASSWORD not set');

if (!process.env.JWT_SECRET)
  throw new Error('JWT_SECRET not set');

/**
 * Configuración de autenticación del sistema.
 */
export const AUTH_CONFIG = {
  /** Nombre de la cookie donde se guardará el token JWT */
  COOKIE_NAME: 'authToken',

  /** Tiempo de expiración del token en segundos (1 hora) */
  TOKEN_EXPIRATION: 60 * 60,

  /**
   * Usuarios estáticos cargados desde la variable de entorno.
   * Debe ser un JSON válido que cumpla la interfaz AuthUser.
   */
  USERS: JSON.parse(process.env.STATIC_USERS || '[]') as AuthUser[],

  /** Hash de contraseña principal (bcrypt) para autenticación */
  PASSWORD_HASH: process.env.PASSWORD_HASH,
};

/** Secret para firmar/verificar tokens JWT */
export const JWT_SECRET = process.env.JWT_SECRET;
