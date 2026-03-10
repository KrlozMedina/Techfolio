import { IconType } from 'react-icons';

import { ImBlog, ImProfile } from 'react-icons/im';
import { BiMessageDots } from 'react-icons/bi';
import { SiPolymerproject, SiBookstack } from 'react-icons/si';
import { MdSpaceDashboard } from 'react-icons/md';
import { FaUsers } from 'react-icons/fa';
import { IoMdImages } from 'react-icons/io';
import { HiOutlineDocumentText } from 'react-icons/hi';

import { Feature } from '@/shared/auth/features.enum';

/**
 * Tipos de avisos o estados que puede tener una ruta.
 * Estos se utilizan normalmente para mostrar banners
 * o mensajes informativos en la interfaz.
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
 * Representa la configuración final de una ruta dentro del sistema.
 */
export interface RouteEntry {

  /** Path de la ruta dentro de la aplicación */
  path: string;

  /** Feature asociada (para control de permisos) */
  feature?: Feature;

  /** Indica si la ruta requiere autenticación */
  isProtected: boolean;

  /** Lista de avisos asociados a la ruta */
  notice: NoticeType[];

  /** Etiquetas localizadas para navegación */
  label?: { es: string; en: string };

  /** Icono utilizado en menús de navegación */
  icon?: IconType;
}

/**
 * Configuración de un grupo de rutas.
 *
 * Permite definir valores por defecto para
 * varias rutas relacionadas.
 */
interface RouteGroupConfig {

  /**
   * Valores por defecto aplicados a todas las rutas
   * del grupo.
   */
  defaults: Pick<RouteEntry, 'isProtected' | 'notice'>;

  /**
   * Definición de rutas individuales.
   */
  routes: Array<{
    path: string;
    feature?: Feature;
    label?: RouteEntry['label'];
    icon?: IconType;
    notice?: NoticeType[];
    isProtected?: boolean;
  }>;
}

/**
 * Construye la lista final de rutas combinando
 * las configuraciones de grupo con las rutas individuales.
 *
 * - Aplica valores por defecto
 * - Permite sobrescribir propiedades por ruta
 */
function buildRoutes(groups: RouteGroupConfig[]): RouteEntry[] {
  return groups.flatMap(group =>
    group.routes.map(route => ({
      path: route.path,
      feature: route.feature,
      isProtected: route.isProtected ?? group.defaults.isProtected,
      notice: route.notice ?? group.defaults.notice,
      label: route.label,
      icon: route.icon
    }))
  );
}

/**
 * Configuración base de rutas agrupadas.
 *
 * Cada grupo define:
 * - valores por defecto
 * - conjunto de rutas relacionadas
 */
const ROUTE_GROUPS: RouteGroupConfig[] = [

  /**
   * Rutas públicas principales
   */
  {
    defaults: { isProtected: false, notice: [] },
    routes: [
      { path: '/login' },
      { path: '/unauthorized', notice: ['dummy','maintenance'] },
      {
        path: '/projects',
        feature: Feature.PROJECTS,
        label: { es:'Proyectos', en:'Projects' },
        icon: SiPolymerproject
      }
    ]
  },

  /**
   * Subrutas relacionadas con proyectos
   */
  {
    defaults: { isProtected: false, notice:['dummy','incomplete'] },
    routes: [
      { path:'/projects/case-studies', feature: Feature.PROJECTS, isProtected:true },
      { path:'/projects/services', feature: Feature.PROJECTS, isProtected:true },
      { path:'/projects/testimonials', feature: Feature.PROJECTS, isProtected:true }
    ]
  },

  /**
   * Página de contacto
   */
  {
    defaults:{ isProtected:false, notice:['maintenance'] },
    routes:[
      {
        path:'/contact',
        label:{ es:'Contacto', en:'Contact' },
        icon: BiMessageDots
      }
    ]
  },

  /**
   * Dashboard administrativo
   */
  {
    defaults:{ isProtected:true, notice:['beta','construction'] },
    routes:[
      {
        path:'/dashboard',
        feature: Feature.DASHBOARD,
        label:{ es:'Dashboard', en:'Dashboard' },
        icon: MdSpaceDashboard
      },
      {
        path:'/dashboard/projects',
        feature: Feature.PROJECTS,
        notice:['comingSoon']
      }
    ]
  },

  /**
   * Perfil del usuario
   */
  {
    defaults:{ isProtected:true, notice:['dummy','construction'] },
    routes:[
      {
        path:'/profile',
        feature: Feature.PROFILE,
        label:{ es:'Perfil', en:'Profile' },
        icon: ImProfile
      },
      { path:'/profile/about-me', feature: Feature.PROFILE },
      { path:'/profile/education', feature: Feature.PROFILE }
    ]
  },

  /**
   * Secciones principales del sitio
   */
  {
    defaults:{ isProtected:true, notice:['beta','construction'] },
    routes:[
      {
        path:'/blog',
        feature: Feature.BLOG,
        label:{ es:'Blog', en:'Blog' },
        icon: ImBlog
      },
      {
        path:'/clients',
        feature: Feature.CLIENTS,
        label:{ es:'Clientes', en:'Clients' },
        icon: FaUsers
      },
      {
        path:'/gallery',
        feature: Feature.GALLERY,
        label:{ es:'Galería', en:'Gallery' },
        icon: IoMdImages
      },
      {
        path:'/resources',
        feature: Feature.RESOURCES,
        label:{ es:'Recursos', en:'Resources' },
        icon: SiBookstack
      }
    ]
  },

  /**
   * Hoja de vida
   */
  {
    defaults:{ isProtected:true, notice:['dummy','maintenance'] },
    routes:[
      {
        path:'/resume',
        feature: Feature.RESUME,
        label:{ es:'Hoja de vida', en:'Resume' },
        icon: HiOutlineDocumentText
      }
    ]
  }

];

/**
 * Lista final de rutas generada a partir de los grupos.
 */
export const ROUTES_LIST = buildRoutes(ROUTE_GROUPS);

/**
 * Rutas protegidas que requieren autenticación.
 */
export const PROTECTED_ROUTES =
  ROUTES_LIST.filter(r => r.isProtected).map(r => r.path);

/**
 * Elementos que deben aparecer en la navegación.
 * Solo incluye rutas con label e icono.
 */
export const NAV_ITEMS =
  ROUTES_LIST.filter(r => r.label && r.icon);

/**
 * Rutas públicas explícitas.
 */
export const PUBLIC_ROUTES = ['/login','/unauthorized'];

/**
 * Configuración de redirecciones del sistema.
 */
export const REDIRECT_ROUTES = {
  toLogin:'/unauthorized',
  toHome:'/'
};

import { PERMISSIONS } from "@/shared/auth/permissions";
import { canAccess } from "@/lib/auth/access";
import { Role } from '@/shared/auth/role.enum';

/**
 * Genera dinámicamente los elementos de navegación
 * según:
 * - estado de autenticación
 * - rol del usuario
 *
 * Filtra rutas protegidas y aplica control de permisos
 * basado en features.
 */
export function navItems(isAuth:boolean, role?:Role){

  return NAV_ITEMS.filter(route => {

    /** Oculta rutas protegidas a usuarios no autenticados */
    if(!isAuth && route.isProtected) return false;

    /** Verifica permisos según feature y rol */
    if(route.feature && role){
      return canAccess(role, route.feature, PERMISSIONS.READ);
    }

    return true;
  });

}