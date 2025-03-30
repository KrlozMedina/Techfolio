import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";

const AUTH_CONFIG = {
  COOKIE_NAME: 'authToken',
  TOKEN_EXPIRATION: 60 * 60, // 1 hora en segundos
  SECRET: process.env.JWT_SECRET || 'secret-dev-only',
  CREDENTIALS: {
    username: "admin",
    password: "admin"
  }
};

const parseCookies = (cookieHeader) => 
  cookieHeader ? Object.fromEntries(cookieHeader.split(';').map(c => c.trim().split('='))) : {};

const createToken = (username) => jwt.sign(
  { exp: Math.floor(Date.now() / 1000) + AUTH_CONFIG.TOKEN_EXPIRATION, username },
  AUTH_CONFIG.SECRET
);

const setAuthCookie = (response, token) => {
  const serialized = serialize(AUTH_CONFIG.COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: AUTH_CONFIG.TOKEN_EXPIRATION,
    path: '/'
  });
  response.headers.set('Set-Cookie', serialized);
  return response;
};

/**
 * Verifica la autenticación mediante JWT
 */
export async function GET(request) {
  try {
    const token = parseCookies(request.headers.get('cookie'))[AUTH_CONFIG.COOKIE_NAME];
    const isValid = token ? !!jwt.verify(token, AUTH_CONFIG.SECRET) : false;
    return NextResponse.json(isValid, { status: 200 });
  } catch (error) {
    console.error('Auth verification failed:', error);
    return NextResponse.json(false, { status: 200 });
  }
}

/**
 * Procesa el login y genera token JWT
 */
export async function POST(request) {
  try {
    const { username, password } = await request.json();
    
    if (!username || !password) {
      return NextResponse.json(
        { error: 'Credentials required' },
        { status: 400 }
      );
    }

    if (username !== AUTH_CONFIG.CREDENTIALS.username || password !== AUTH_CONFIG.CREDENTIALS.password) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const token = createToken(username);
    const response = NextResponse.json(
      { message: 'Authentication successful' },
      { status: 200 }
    );
    
    return setAuthCookie(response, token);
    
  } catch (error) {
    console.error('Login process failed:', error);
    return NextResponse.json(
      { error: 'Authentication service unavailable' },
      { status: 503 }
    );
  }
}