/**
 * =========================================================
 * ExternalLink Component
 * ---------------------------------------------------------
 * Componente reutilizable para renderizar enlaces externos
 * de forma consistente dentro de la aplicación.
 *
 * Este componente encapsula la configuración recomendada
 * de seguridad para enlaces externos que abren en una
 * nueva pestaña del navegador.
 *
 * Características:
 * - Abre el enlace en una nueva pestaña (target="_blank")
 * - Previene vulnerabilidades de seguridad mediante
 *   rel="noopener noreferrer"
 * - Permite aplicar estilos personalizados mediante className
 * - Soporta contenido arbitrario mediante children
 *
 * Responsabilidades:
 * - Evitar repetición de configuración en enlaces externos
 * - Garantizar buenas prácticas de seguridad en navegación
 * - Mantener consistencia en enlaces externos del proyecto
 *
 * Utilizado en:
 * - Componentes que enlazan a recursos externos
 * - Links hacia redes sociales
 * - Links hacia repositorios, documentación o sitios externos
 * =========================================================
 */

import React from 'react';

// === Componente Reutilizable para enlaces externos ===

/**
 * Props del componente ExternalLink.
 *
 * @property href - URL del recurso externo al que se desea navegar.
 * @property className - Clases CSS opcionales para estilizar el enlace.
 * @property children - Contenido interno del enlace (texto, iconos, etc).
 */
export const ExternalLink: React.FC<
  React.PropsWithChildren<{
    href: string;
    className?: string;
  }>
> = ({ href, className, children }) => (
  /**
   * Elemento anchor configurado para navegación externa segura.
   *
   * target="_blank"
   *  Abre el enlace en una nueva pestaña del navegador.
   *
   * rel="noopener noreferrer"
   *  Evita que la nueva página tenga acceso al objeto window.opener,
   *  reduciendo riesgos de seguridad como tabnabbing.
   */
  <a className={className} href={href} target="_blank" rel="noopener noreferrer">
    {children}
  </a>
);