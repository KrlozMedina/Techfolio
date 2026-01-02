// 👉 Solo en backend:
// API routes
// Server Actions
// getSession
// ❌ Nunca en middleware.ts
// ❌ Nunca en componentes client

import jwt, { JwtPayload } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined');
}

export interface SessionPayload extends JwtPayload {
  username: string;
  isDummy: boolean;
  role?: string;
}

export function verifyToken(token: string): SessionPayload {
  try {
    return jwt.verify(token, JWT_SECRET as string) as unknown as SessionPayload;
  } catch {
    throw new Error('Invalid or expired token');
  }
}
