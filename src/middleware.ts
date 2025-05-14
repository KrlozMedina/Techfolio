import { NextRequest, NextResponse } from 'next/server';
import {
  PROTECTED_ROUTES,
  PUBLIC_ROUTES,
  REDIRECT_ROUTES,
} from '@/lib/config';

/**
 * Middleware para controlar el acceso a las rutas basadas en el estado de autenticación del usuario.
 * - Redirige a login si el usuario no está autenticado y trata de acceder a una ruta protegida.
 * - Redirige a dashboard si el usuario está autenticado y trata de acceder a una ruta pública.
 * - Protege rutas API v2, permitiendo solo métodos POST con un token Bearer.
 * 
 * @param request - La solicitud HTTP de Next.js.
 * @returns NextResponse - Respuesta de Next.js (redirige o permite el acceso).
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const { method } = request;
  const token = request.cookies.get('authToken')?.value;
  const isAuthenticated = Boolean(token);

  // Verificación de rutas protegidas y públicas
  const isProtectedRoute = PROTECTED_ROUTES.some(route => pathname.startsWith(route));
  const isPublicRoute = PUBLIC_ROUTES.some(route => pathname.startsWith(route));

  // 1. Control de acceso a rutas protegidas y públicas
  if (isProtectedRoute && !isAuthenticated) {
    // Si no autenticado y se intenta acceder a una ruta protegida, redirige al login
    return NextResponse.redirect(new URL(REDIRECT_ROUTES.toLogin, request.url));
  }

  if (isPublicRoute && isAuthenticated) {
    // Si autenticado y se intenta acceder a una ruta pública, redirige al dashboard
    return NextResponse.redirect(new URL(REDIRECT_ROUTES.toDashboard, request.url));
  }

  // 2. Control de acceso a rutas API v2 - solo POST con Bearer Token
  if (pathname.startsWith('/api/v2/') && method !== 'GET' && !pathname.startsWith('/api/v2/auth')) {
    if (!isAuthenticated) {
      // Si el token Bearer falta, responde con un error 401
      return NextResponse.json({ error: 'Missing Bearer token' }, { status: 401 });
    }

    // Aquí puedes agregar lógica adicional para verificar roles o permisos si lo deseas
  }

  return NextResponse.next(); // Permite el acceso si no hay conflictos
}

/**
 * Configuración del middleware: rutas que serán interceptadas y protegidas.
 * Define las rutas de frontend protegidas y las rutas API v2 protegidas.
 */
export const config = {
  matcher: [
    // Rutas de frontend protegidas
    '/blog/:path*',
    '/client/:path*',
    '/contact/:path*',
    '/dashboard/:path*',
    '/gallery/:path*',
    '/login',
    '/profile/:path*',
    '/projects/:path*',
    '/resources/:path*',
    '/resume/:path*',
    '/unauthorized',

    // Rutas API v2 protegidas
    '/api/v2/:path*',
  ],
};
