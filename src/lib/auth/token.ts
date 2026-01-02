import jwt from 'jsonwebtoken';
import { AUTH_CONFIG, JWT_SECRET } from './config';

export interface SessionPayload {
  username: string;
  isDummy: boolean;
}

/**
 * Crea un token JWT
 */
export function createToken(username: string, isDummy = false): string {
  return jwt.sign(
    { username, isDummy },
    JWT_SECRET,
    { expiresIn: AUTH_CONFIG.TOKEN_EXPIRATION } // en segundos
  );
}

/**
 * Verifica un token JWT
 */
export function verifyToken(token: string): SessionPayload {
  try {
    return jwt.verify(token, JWT_SECRET) as SessionPayload;
  } catch (e) {
    console.log('Token verification error:', e);
    throw new Error('Invalid or expired token');
  }
}


// import jwt from 'jsonwebtoken';
// import { AUTH_CONFIG, JWT_SECRET } from './config';
// import { AuthUser } from './types';

// export interface SessionPayload {
//   username: string;
//   isDummy: boolean;
// }

// export function createToken(username: string, isDummy = false): string {
//   return jwt.sign(
//     { username, isDummy },
//     JWT_SECRET,
//     { expiresIn: AUTH_CONFIG.TOKEN_EXPIRATION } // o usa AUTH_CONFIG.TOKEN_EXPIRATION si quieres segundos
//   );
// }

// export function verifyToken(token: string): SessionPayload {
//   try {
//     // console.log(jwt.verify(token, JWT_SECRET))
//     return jwt.verify(token, JWT_SECRET) as SessionPayload;
//   } catch (e) {
//     console.log(e)
//     throw new Error('Invalid or expired token');
//   }
// }
