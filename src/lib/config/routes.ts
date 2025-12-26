import { IconType } from 'react-icons';
import { ImBlog, ImProfile } from 'react-icons/im';
import { BiMessageDots } from 'react-icons/bi';
import { SiPolymerproject, SiBookstack } from 'react-icons/si';
import { MdSpaceDashboard } from 'react-icons/md';
import { FaUsers } from 'react-icons/fa';
import { IoMdImages } from 'react-icons/io';
import { HiOutlineDocumentText } from 'react-icons/hi';

// --- Tipos ---

/**
 * Tipos de avisos que indican el estado de desarrollo de una ruta.
 */
export type NoticeType =
  | 'dummy'
  | 'construction'
  | 'incomplete'
  | 'maintenance'
  | 'comingSoon'
  | 'beta'
  | 'bugs';

/**
 * Representa una entrada de ruta en la aplicación.
 */
export interface RouteEntry {
  path: string;
  isProtected?: boolean;
  notice?: NoticeType[];
  label?: { es: string; en: string };
  icon?: IconType;
}

// --- Lista principal de rutas ---

/**
 * Lista centralizada de rutas disponibles en la aplicación.
 * Define propiedades como protección por autenticación, etiquetas traducibles e iconos.
 */
export const ROUTES_LIST: readonly RouteEntry[] = [
  // API
  { path: '/api' },

  // Dashboard
  {
    path: '/dashboard',
    isProtected: true,
    notice: ['beta', 'construction'],
    label: { es: 'Dashboard', en: 'Dashboard' },
    icon: MdSpaceDashboard,
  },
  {
    path: '/dashboard/projects',
    isProtected: true,
    notice: ['comingSoon', 'dummy', 'incomplete'],
  },

  // Projects
  {
    path: '/projects',
    isProtected: false,
    notice: ['dummy', 'incomplete'],
    label: { es: 'Proyectos', en: 'Projects' },
    icon: SiPolymerproject,
  },
  { path: '/projects/case-studies', notice: ['beta', 'dummy', 'incomplete'] },
  { path: '/projects/services', isProtected: true, notice: ['beta', 'dummy', 'construction'] },
  { path: '/projects/testimonials', isProtected: true, notice: ['beta', 'dummy', 'construction'] },

  // Profile
  {
    path: '/profile',
    isProtected: true,
    notice: ['construction'],
    label: { es: 'Perfil', en: 'Profile' },
    icon: ImProfile,
  },
  { path: '/profile/about-me', isProtected: true, notice: ['maintenance', 'comingSoon'] },
  { path: '/profile/achievements', isProtected: true, notice: ['dummy', 'construction'] },
  { path: '/profile/certifications', isProtected: true, notice: ['dummy', 'construction'] },
  { path: '/profile/education', isProtected: true, notice: ['dummy', 'incomplete', 'maintenance'] },
  { path: '/profile/experience', isProtected: true, notice: ['dummy', 'construction'] },
  { path: '/profile/skills', isProtected: true, notice: ['dummy', 'construction'] },

  // Blog
  {
    path: '/blog',
    isProtected: true,
    notice: ['dummy', 'incomplete', 'bugs'],
    label: { es: 'Blog', en: 'Blog' },
    icon: ImBlog,
  },

  // Clients
  {
    path: '/clients',
    isProtected: true,
    notice: ['beta', 'construction'],
    label: { es: 'Clientes', en: 'Clients' },
    icon: FaUsers,
  },

  // Gallery
  {
    path: '/gallery',
    isProtected: true,
    notice: ['beta', 'construction'],
    label: { es: 'Galería', en: 'Gallery' },
    icon: IoMdImages,
  },

  // Login
  { path: '/login', isProtected: false, notice: [] },

  // Resources
  {
    path: '/resources',
    isProtected: true,
    notice: ['beta', 'construction'],
    label: { es: 'Recursos', en: 'Resources' },
    icon: SiBookstack,
  },

  // Contact
  {
    path: '/contact',
    isProtected: false,
    notice: ['maintenance'],
    label: { es: 'Contacto', en: 'Contact' },
    icon: BiMessageDots,
  },

  // Resume
  {
    path: '/resume',
    isProtected: true,
    notice: ['dummy', 'maintenance'],
    label: { es: 'Hoja de vida', en: 'Resume' },
    icon: HiOutlineDocumentText,
  },

  // Unauthorized
  {
    path: '/unauthorized',
    notice: ['dummy', 'maintenance'],
  },
] as const;

// --- Derivaciones útiles de rutas ---

/**
 * Rutas que requieren autenticación.
 */
export const PROTECTED_ROUTES = ROUTES_LIST
  .filter(route => route.isProtected)
  .map(route => route.path);

/**
 * Rutas accesibles públicamente (sin autenticación).
 */
export const PUBLIC_ROUTES: string[] = ['/login', '/unauthorized'];

/**
 * Rutas utilizadas para redirección.
 */
export const REDIRECT_ROUTES = {
  toLogin: '/unauthorized',
  toDashboard: '/dashboard',
} as const;

/**
 * Lista de ítems visibles en la navegación, usados en menús.
 * Se consideran válidos los que contienen etiqueta e icono.
 */
export const NAV_ITEMS = ROUTES_LIST.filter(
  (route): route is RouteEntry & { label: { es: string; en: string }; icon: IconType } =>
    Boolean(route.label && route.icon)
);

/**
 * Devuelve los ítems de navegación visibles según el estado de autenticación.
 * @param isAuth Estado de autenticación del usuario
 * @returns Lista filtrada de rutas con ítems visibles
 */
export function navItems(isAuth: boolean) {
  return ROUTES_LIST.filter(
    (route): route is RouteEntry & { label: { es: string; en: string }; icon: IconType } =>
      Boolean(route.label && route.icon) &&
      (isAuth || route.isProtected === false)
  );
}
