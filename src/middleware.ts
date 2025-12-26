import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getSession } from '@/lib/auth/session';
import { REDIRECT_ROUTES, PROTECTED_ROUTES, PUBLIC_ROUTES } from '@/lib/config';

// ⚠️ Ejecutar en Node para que jwt funcione
export const runtime = 'nodejs';

/**
 * Middleware para controlar acceso a rutas protegidas y públicas.
 */
export async function middleware(request: NextRequest) {
  const { pathname, origin } = request.nextUrl;
  const session = await getSession();
  // console.log('session', session);

  const isAuthenticated = Boolean(session);
  const isProtectedRoute = PROTECTED_ROUTES.some((route) => pathname.startsWith(route));
  const isPublicRoute = PUBLIC_ROUTES.some((route) => pathname.startsWith(route));

  // Rutas protegidas
  if (isProtectedRoute && !isAuthenticated) {
    return NextResponse.redirect(`${origin}${REDIRECT_ROUTES.toLogin}`);
  }

  // Rutas públicas
  if (isPublicRoute && isAuthenticated) {
    return NextResponse.redirect(`${origin}${REDIRECT_ROUTES.toDashboard}`);
  }

  // API v2: permite solo POST con sesión
  if (
    pathname.startsWith('/api/v2/') &&
    !pathname.startsWith('/api/v2/auth') &&
    request.nextUrl.pathname !== '/api/v2/auth' &&
    request.method !== 'GET'
  ) {
    if (!isAuthenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  return NextResponse.next();
}

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


// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';
// import { getSession } from '@/lib/auth/session';
// import { REDIRECT_ROUTES, PROTECTED_ROUTES, PUBLIC_ROUTES } from '@/lib/config';

// /**
//  * Middleware para controlar acceso a rutas protegidas y públicas.
//  */
// export async function middleware(request: NextRequest) {
//   const { pathname, origin } = request.nextUrl;
//   const session = await getSession();
//   console.log('session',session)

//   const isAuthenticated = Boolean(session);
//   const isProtectedRoute = PROTECTED_ROUTES.some((route) => pathname.startsWith(route));
//   const isPublicRoute = PUBLIC_ROUTES.some((route) => pathname.startsWith(route));

//   // Rutas protegidas
//   if (isProtectedRoute && !isAuthenticated) {
//     return NextResponse.redirect(`${origin}${REDIRECT_ROUTES.toLogin}`);
//   }

//   // Rutas públicas
//   if (isPublicRoute && isAuthenticated) {
//     return NextResponse.redirect(`${origin}${REDIRECT_ROUTES.toDashboard}`);
//   }

//   // API v2: permite solo POST con sesión
//   if (pathname.startsWith('/api/v2/') && !pathname.startsWith('/api/v2/auth') && request.method !== 'GET') {
//     if (!isAuthenticated) {
//       return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
//     }
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: [
//     '/blog/:path*',
//     '/clients/:path*',
//     '/contact/:path*',
//     '/dashboard/:path*',
//     '/gallery/:path*',
//     '/login',
//     '/profile/:path*',
//     '/projects/:path*',
//     '/resources/:path*',
//     '/resume/:path*',
//     '/unauthorized',
//     '/api/v2/:path*',
//   ],
// };



// import { NextRequest, NextResponse } from 'next/server';
// import {
//   PROTECTED_ROUTES,
//   PUBLIC_ROUTES,
//   REDIRECT_ROUTES,
// } from '@/lib/config';

// /**
//  * Middleware para controlar el acceso a las rutas basadas en el estado de autenticación del usuario.
//  * - Redirige a login si el usuario no está autenticado y trata de acceder a una ruta protegida.
//  * - Redirige a dashboard si el usuario está autenticado y trata de acceder a una ruta pública.
//  * - Protege rutas API v2, permitiendo solo métodos POST con un token Bearer.
//  * 
//  * @param request - La solicitud HTTP de Next.js.
//  * @returns NextResponse - Respuesta de Next.js (redirige o permite el acceso).
//  */
// export function middleware(request: NextRequest) {
//   const { pathname } = request.nextUrl;
//   const { method } = request;
//   const token = request.cookies.get('authToken')?.value;
//   const isAuthenticated = Boolean(token);

//   // Verificación de rutas protegidas y públicas
//   const isProtectedRoute = PROTECTED_ROUTES.some(route => pathname.startsWith(route));
//   const isPublicRoute = PUBLIC_ROUTES.some(route => pathname.startsWith(route));

//   // 1. Control de acceso a rutas protegidas y públicas
//   if (isProtectedRoute && !isAuthenticated) {
//     // Si no autenticado y se intenta acceder a una ruta protegida, redirige al login
//     return NextResponse.redirect(new URL(REDIRECT_ROUTES.toLogin, request.url));
//   }

//   if (isPublicRoute && isAuthenticated) {
//     // Si autenticado y se intenta acceder a una ruta pública, redirige al dashboard
//     return NextResponse.redirect(new URL(REDIRECT_ROUTES.toDashboard, request.url));
//   }

//   // 2. Control de acceso a rutas API v2 - solo POST con Bearer Token
//   if (pathname.startsWith('/api/v2/') && method !== 'GET' && !pathname.startsWith('/api/v2/auth')) {
//     if (!isAuthenticated) {
//       // Si el token Bearer falta, responde con un error 401
//       return NextResponse.json({ error: 'Missing Bearer token' }, { status: 401 });
//     }

//     // Aquí puedes agregar lógica adicional para verificar roles o permisos si lo deseas
//   }

//   return NextResponse.next(); // Permite el acceso si no hay conflictos
// }

// /**
//  * Configuración del middleware: rutas que serán interceptadas y protegidas.
//  * Define las rutas de frontend protegidas y las rutas API v2 protegidas.
//  */
// export const config = {
//   matcher: [
//     // Rutas de frontend protegidas
//     '/blog/:path*',
//     '/client/:path*',
//     '/contact/:path*',
//     '/dashboard/:path*',
//     '/gallery/:path*',
//     '/login',
//     '/profile/:path*',
//     '/projects/:path*',
//     '/resources/:path*',
//     '/resume/:path*',
//     '/unauthorized',

//     // Rutas API v2 protegidas
//     '/api/v2/:path*',
//   ],
// };
