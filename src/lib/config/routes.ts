// Rutas que requieren autenticación
export const PROTECTED_ROUTES = ['/dashboard', '/profile'];

// Rutas públicas (visibles solo si no estás autenticado)
export const PUBLIC_ROUTES = ['/login'];

// Rutas de redirección
export const REDIRECT_ROUTES = {
  toLogin: '/login',
  toDashboard: '/dashboard',
};
