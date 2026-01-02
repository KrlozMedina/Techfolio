import { IconType } from 'react-icons';
import { ImBlog, ImProfile } from 'react-icons/im';
import { BiMessageDots } from 'react-icons/bi';
import { SiPolymerproject, SiBookstack } from 'react-icons/si';
import { MdSpaceDashboard } from 'react-icons/md';
import { FaUsers } from 'react-icons/fa';
import { IoMdImages } from 'react-icons/io';
import { HiOutlineDocumentText } from 'react-icons/hi';

/* ===== Tipos ===== */

/**
 * Tipos de aviso que pueden asociarse a una ruta
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
 * Definición de una ruta de la aplicación
 */
export interface RouteEntry {
  path: string;
  isProtected: boolean;
  notice: NoticeType[];
  label?: { es: string; en: string };
  icon?: IconType;
}

/**
 * Configuración de un grupo de rutas
 */
interface RouteGroupConfig {
  defaults: Pick<RouteEntry, 'isProtected' | 'notice'>;
  routes: Array<{
    path: string;
    label?: RouteEntry['label'];
    icon?: IconType;
    notice?: NoticeType[];
    isProtected?: boolean;
  }>;
}

/* ===== Builder ===== */

/**
 * Convierte grupos de rutas en un array plano de RouteEntry
 */
function buildRoutes(groups: RouteGroupConfig[]): RouteEntry[] {
  return groups.flatMap(group =>
    group.routes.map(route => ({
      path: route.path,
      isProtected: route.isProtected ?? group.defaults.isProtected,
      notice: route.notice ?? group.defaults.notice,
      label: route.label,
      icon: route.icon,
    }))
  );
}

/* ===== Configuración de rutas ===== */

const ROUTE_GROUPS: RouteGroupConfig[] = [
  {
    defaults: { isProtected: false, notice: [] },
    routes: [
      { path: '/api' },
      { path: '/login' },
      { path: '/unauthorized', notice: ['dummy', 'maintenance'] },
    ],
  },
  {
    defaults: { isProtected: false, notice: ['dummy', 'incomplete'] },
    routes: [
      { path: '/projects', label: { es: 'Proyectos', en: 'Projects' }, icon: SiPolymerproject },
      { path: '/projects/case-studies', isProtected: true},
      { path: '/projects/services', isProtected: true },
      { path: '/projects/testimonials', isProtected: true },
    ],
  },
  {
    defaults: { isProtected: false, notice: ['maintenance'] },
    routes: [
      { path: '/contact', label: { es: 'Contacto', en: 'Contact' }, icon: BiMessageDots },
    ],
  },
  {
    defaults: { isProtected: true, notice: ['beta', 'construction'] },
    routes: [
      { path: '/dashboard', label: { es: 'Dashboard', en: 'Dashboard' }, icon: MdSpaceDashboard },
      { path: '/dashboard/projects', notice: ['comingSoon'] },
    ],
  },
  {
    defaults: { isProtected: true, notice: ['dummy', 'construction'] },
    routes: [
      { path: '/profile', label: { es: 'Perfil', en: 'Profile' }, icon: ImProfile, notice: ['construction'] },
      { path: '/profile/about-me', notice: ['maintenance', 'comingSoon'] },
      { path: '/profile/education', notice: ['incomplete', 'maintenance'] },
    ],
  },
  {
    defaults: { isProtected: true, notice: ['beta', 'construction'] },
    routes: [
      { path: '/blog', label: { es: 'Blog', en: 'Blog' }, icon: ImBlog, notice: ['dummy', 'incomplete', 'bugs'] },
      { path: '/clients', label: { es: 'Clientes', en: 'Clients' }, icon: FaUsers },
      { path: '/gallery', label: { es: 'Galería', en: 'Gallery' }, icon: IoMdImages },
      { path: '/resources', label: { es: 'Recursos', en: 'Resources' }, icon: SiBookstack },
    ],
  },
  {
    defaults: { isProtected: true, notice: ['dummy', 'maintenance'] },
    routes: [
      { path: '/resume', label: { es: 'Hoja de vida', en: 'Resume' }, icon: HiOutlineDocumentText },
    ],
  },
];

/* ===== Exportables ===== */

export const ROUTES_LIST = buildRoutes(ROUTE_GROUPS);
// Todas las rutas aplanadas y listas para usar

export const PROTECTED_ROUTES = ROUTES_LIST.filter(r => r.isProtected).map(r => r.path);
// Solo rutas que requieren autenticación

export const PUBLIC_ROUTES = ['/login', '/unauthorized'];
// Rutas siempre accesibles sin login

export const REDIRECT_ROUTES = {
  toLogin: '/unauthorized',
  toDashboard: '/dashboard',
};
// URLs de redirección por defecto

export const NAV_ITEMS = ROUTES_LIST.filter(r => r.label && r.icon);
// Rutas con etiqueta e icono para menús de navegación

/**
 * Filtra rutas visibles en navegación según si el usuario está autenticado
 * @param isAuth - true si el usuario está logueado
 */
export function navItems(isAuth: boolean) {
  return NAV_ITEMS.filter(r => isAuth || r.isProtected === false);
}
