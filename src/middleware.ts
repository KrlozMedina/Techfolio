/**
 * Middleware de Next.js para controlar acceso a rutas protegidas y públicas.
 * Ejecuta lógica de autenticación antes de permitir el acceso a páginas o APIs.
 * ⚠️ Debe ejecutarse en Node.js para que funcione correctamente la validación de JWT.
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getSession } from '@/lib/auth/session';
import { REDIRECT_ROUTES, PROTECTED_ROUTES, PUBLIC_ROUTES } from '@/lib/config';

export const runtime = 'nodejs';

/**
 * Función principal del middleware
 * @param request - NextRequest recibido en cada petición
 * @returns NextResponse - redirecciona o permite continuar
 */
export async function middleware(request: NextRequest) {
  const { pathname, origin } = request.nextUrl;
  const session = await getSession();
  const isAuthenticated = Boolean(session);

  const isProtectedRoute = PROTECTED_ROUTES.some(route => pathname.startsWith(route));
  const isPublicRoute = PUBLIC_ROUTES.some(route => pathname.startsWith(route));

  // 🔒 Redirigir si la ruta es protegida y no hay sesión
  if (isProtectedRoute && !isAuthenticated) {
    return NextResponse.redirect(`${origin}${REDIRECT_ROUTES.toLogin}`);
  }

  // 🔓 Redirigir si la ruta es pública pero el usuario ya está autenticado
  if (isPublicRoute && isAuthenticated) {
    return NextResponse.redirect(`${origin}${REDIRECT_ROUTES.toDashboard}`);
  }

  // ⚙️ API v2: permite solo POST con sesión, excepto auth
  if (
    pathname.startsWith('/api/v2/') &&
    !pathname.startsWith('/api/v2/auth') &&
    request.method !== 'GET'
  ) {
    if (!isAuthenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  // Continuar con la petición normalmente
  return NextResponse.next();
}

/**
 * Configuración de rutas que aplican este middleware
 */
export const config = {
  matcher: [
    '/blog/:path*',
    '/clients/:path*',
    '/contact/:path*',
    '/dashboard/:path*',
    '/gallery/:path*',
    '/login',
    '/profile/:path*',
    '/projects/:path*',
    '/resources/:path*',
    '/resume/:path*',
    '/unauthorized',
    '/api/v2/:path*',
  ],
};
