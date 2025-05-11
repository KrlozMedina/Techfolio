import { NextRequest, NextResponse } from 'next/server';
import {
  PROTECTED_ROUTES,
  PUBLIC_ROUTES,
  REDIRECT_ROUTES,
} from '@/lib/config';

/**
 * Middleware de control de acceso.
 * Redirige según el estado de autenticación del usuario.
 */
export function middleware(request: NextRequest) {
  const token = request.cookies.get('authToken')?.value;
  const pathname = request.nextUrl.pathname;

  const isAuthenticated = Boolean(token);

  const isProtectedRoute = PROTECTED_ROUTES.some(route =>
    pathname.startsWith(route)
  );
  const isPublicRoute = PUBLIC_ROUTES.some(route =>
    pathname.startsWith(route)
  );

  // Si no autenticado y accede a ruta protegida, redirige a login
  if (isProtectedRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL(REDIRECT_ROUTES.toLogin, request.url));
  }

  // Si autenticado y accede a ruta pública, redirige a dashboard
  if (isPublicRoute && isAuthenticated) {
    return NextResponse.redirect(new URL(REDIRECT_ROUTES.toDashboard, request.url));
  }

  return NextResponse.next(); // Permitir acceso si no hay conflictos
}

/**
 * Configuración del middleware: define las rutas que serán interceptadas.
 */
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/profile/:path*',
    '/projects/:path*',
    '/blog/:path*',
    '/login',
  ],
};
