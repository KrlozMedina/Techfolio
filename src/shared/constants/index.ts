/**
 * Punto centralizado de exportación de constantes del sistema.
 * Esto incluye roles, características, tecnologías, categorías, rutas y otros elementos de configuración global.
 */

// Importación de archivos JSON que contienen estructuras de datos.
import FEATURES from './features.json';
import ROLES from './roles.json';

// Exportación de constantes estructuradas desde otros archivos.
export * from './platforms';
export * from './categories';
export * from './technologies';
export * from './language';
export * from './enums';
export * from './navLinks';

// Exportación explícita de datos cargados desde JSON (para mantener consistencia con el sistema de módulos).
export {
  FEATURES,
  ROLES,
};
