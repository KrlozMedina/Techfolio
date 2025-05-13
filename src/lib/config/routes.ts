// --- Tipos ---
/**
 * Tipos de avisos asociados a una ruta.
 */
export type NoticeType = 
  | 'dummy' 
  | 'construction' 
  | 'incomplete' 
  | 'maintenance' 
  | 'comingSoon' 
  | 'beta';

/**
 * Estructura de una ruta del sistema.
 */
interface RouteEntry {
  path: string;
  isProtected?: boolean;
  notice?: NoticeType[];
}

// --- Lista principal de rutas ---
/**
 * Lista centralizada de rutas de la aplicación con sus propiedades:
 * - `isProtected`: si requiere autenticación
 * - `notice`: estado informativo de la ruta
 */
export const ROUTES_LIST: readonly RouteEntry[] = [
  { path: '/api' },

  { path: '/blog', isProtected: true, notice: ['dummy', 'incomplete'] },
  { path: '/client', isProtected: true, notice: ['beta', 'construction'] },
  { path: '/contact', isProtected: false, notice: ['maintenance'] },

  { path: '/dashboard', isProtected: true, notice: ['beta', 'construction'] },
  { path: '/dashboard/projects', isProtected: true, notice: ['comingSoon','dummy', 'incomplete'] },

  { path: '/gallery', isProtected: true, notice: ['beta', 'construction'] },
  { path: '/login', isProtected: false, notice: [] },

  { path: '/profile', isProtected: true, notice: ['construction'] },
  { path: '/profile/about-me', isProtected: true, notice: ['maintenance'] },
  { path: '/profile/achievements', isProtected: true, notice: ['dummy', 'construction'] },
  { path: '/profile/certifications', isProtected: true, notice: ['dummy', 'construction'] },
  { path: '/profile/education', isProtected: true, notice: ['dummy', 'incomplete', 'maintenance'] },
  { path: '/profile/experience', isProtected: true, notice: ['dummy', 'construction'] },
  { path: '/profile/skills', isProtected: true, notice: ['dummy', 'construction'] },

  { path: '/projects', isProtected: false, notice: ['dummy', 'incomplete'] },
  { path: '/projects/case-studies', isProtected: false, notice: ['beta', 'dummy', 'incomplete'] },
  { path: '/projects/services', isProtected: true, notice: ['beta', 'dummy', 'construction'] },
  { path: '/projects/testimonials', isProtected: true, notice: ['beta', 'dummy', 'construction'] },

  { path: '/resources', isProtected: true, notice: ['beta', 'construction'] },
  { path: '/resume', isProtected: true, notice: ['dummy', 'maintenance'] },
  { path: '/unauthorized', isProtected: false, notice: ['dummy', 'maintenance'] },
] as const;

// --- Derivadas de la lista principal ---

/**
 * Rutas que requieren autenticación para ser accedidas.
 */
export const PROTECTED_ROUTES = ROUTES_LIST
  .filter(route => route.isProtected)
  .map(route => route.path);

/**
 * Rutas accesibles solo si el usuario NO está autenticado.
 */
export const PUBLIC_ROUTES = ['/login', '/unauthorized'];

/**
 * Rutas de redirección usadas en el sistema.
 */
export const REDIRECT_ROUTES = {
  toLogin: '/unauthorized',
  toDashboard: '/dashboard',
} as const;
