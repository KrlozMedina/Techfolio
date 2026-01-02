/**
 * Archivo principal de internacionalización (i18n)
 * Exporta todos los idiomas disponibles y define el tipo Language.
 */

import { es } from './es';
import { en } from './en';

/**
 * Objeto con todos los idiomas disponibles en la aplicación
 */
export const i18n = { es, en };

/**
 * Tipo que representa los códigos de idioma disponibles
 * Usado en hooks y contextos para tipado seguro
 */
export type Language = keyof typeof i18n; // 'es' | 'en'
