/**
 * Punto centralizado para exportar todas las constantes del sistema.
 *
 * Este archivo actúa como un barril (barrel file) que reúne y expone constantes globales,
 * como roles de usuario, características disponibles, plataformas, categorías,
 * tecnologías, idiomas y enumeraciones usadas en la aplicación.
 *
 * Además, exporta datos cargados desde archivos JSON para mantener la consistencia
 * y facilitar su importación desde un único lugar.
 *
 * Constantes exportadas incluyen:
 * - FEATURES: Características del sistema definidas en JSON.
 * - ROLES: Roles de usuario definidos en JSON.
 * - Plataformas, Categorías, Tecnologías, Idiomas, y Enums definidos en archivos TS separados.
 */

import FEATURES from './features.json';
import ROLES from './roles.json';

export * from './platforms';
export * from './categories';
export * from './technologies';
export * from './language';
export * from './enums';
export * from './quotes'

export {
  FEATURES,
  ROLES,
};
