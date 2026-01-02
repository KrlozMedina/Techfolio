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

  if (!user.isDummy && !bcrypt.compareSync(password, passwordHash)) {
    return null;
  }

  return createToken(username, user.isDummy);
};


// import { z } from "zod";
// import jwt from "jsonwebtoken";
// import { AUTH_CONFIG } from "../auth/config";
// // import { AUTH_CONFIG } from "../utils";

// /**
//  * Zod schema for validating login input.
//  */
// export const LoginSchema = z.object({
//   username: z.string().min(1, "Username is required"),
//   password: z.string().min(1, "Password is required"),
// });

// /**
//  * Parses cookies from the request header string.
//  */
// export const parseCookies = (cookieHeader: string | null): Record<string, string> =>
//   cookieHeader
//     ? Object.fromEntries(cookieHeader.split(";").map(c => c.trim().split("=")))
//     : {};

// /**
//  * Creates a JWT token with expiration and optional dummy user flag.
//  */
// export const createToken = (username: string, isDummy?: boolean): string =>
//   jwt.sign(
//     {
//       sub: username,
//       isDummy,
//       exp: Math.floor(Date.now() / 1000) + AUTH_CONFIG.TOKEN_EXPIRATION,
//     },
//     AUTH_CONFIG.SECRET
//   );
