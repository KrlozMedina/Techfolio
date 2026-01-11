import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { createToken } from '@/lib/auth/token';
import { AUTH_CONFIG } from '@/lib/auth/config';
import { AuthUser } from '@/lib/auth/types';

export const LoginSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

export const parseCookies = (cookieHeader: string | null): Record<string, string> =>
  cookieHeader
    ? Object.fromEntries(cookieHeader.split(';').map(c => c.trim().split('=')))
    : {};

export const loginUser = (username: string, password: string): string | null => {
  const users: AuthUser[] = AUTH_CONFIG.USERS;
  const passwordHash = AUTH_CONFIG.PASSWORD_HASH;

  const user = users.find(u => u.username === username);
  if (!user) return null;

  if (!user.role && !bcrypt.compareSync(password, passwordHash)) {
    return null;
  }

  return createToken(username, user.role);
};

// export const loginUser = (username: string, password: string): string | null => {
//   const users: AuthUser[] = AUTH_CONFIG.USERS;
//   const passwordHash = AUTH_CONFIG.PASSWORD_HASH;

//   const user = users.find(u => u.username === username);
//   if (!user) return null;

//   if (!bcrypt.compareSync(password, passwordHash)) {
//     return null;
//   }

//   return createToken(user.username, user.role);
// };

