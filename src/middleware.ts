import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getSession } from '@/lib/auth/session';
import { REDIRECT_ROUTES, PROTECTED_ROUTES, PUBLIC_ROUTES } from '@/lib/config';

export const runtime = 'nodejs';

export async function middleware(request: NextRequest) {
  const { pathname, origin } = request.nextUrl;
  const session = await getSession();

  const isApiRoute = pathname.startsWith('/api/');
  const isAuthenticated = Boolean(session);

  /* =======================
   * API ROUTES
   * ======================= */
  if (isApiRoute) {
    if (
      pathname.startsWith('/api/v2/') &&
      !pathname.startsWith('/api/v2/auth') &&
      request.method !== 'GET'
    ) {
      if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }

      if (session.role !== 'admin') {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
      }
    }

    return NextResponse.next();
  }

  /* =======================
   * PAGE ROUTES
   * ======================= */
  const isProtectedRoute = PROTECTED_ROUTES.some(route =>
    pathname.startsWith(route)
  );
  const isPublicRoute = PUBLIC_ROUTES.some(route =>
    pathname.startsWith(route)
  );

  if (isProtectedRoute && !isAuthenticated) {
    return NextResponse.redirect(`${origin}${REDIRECT_ROUTES.toLogin}`);
  }

  if (isPublicRoute && isAuthenticated) {
    return NextResponse.redirect(`${origin}${REDIRECT_ROUTES.toDashboard}`);
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
