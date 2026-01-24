/**
 * Shared enums and constants barrel file.
 *
 * Centralizes and re-exports all enums and shared definitions
 * used across the application (API, services, schemas, DTOs).
 *
 * Purpose:
 * - Avoid deep import paths
 * - Keep enum usage consistent
 * - Improve maintainability and discoverability
 */

// Supported languages enum / constants
export * from './language';

// Shared quotes or text constants
export * from './quotes';

// Architecture-related enums
export * from './architecture-communication.enum';
export * from './architecture-style.enum';
export * from './architecture-type.enum';

// Database modeling strategy enum
export * from './database-model.enum';

// Target platform enum (web, mobile, backend, etc.)
export * from './platform.enum';

// Project lifecycle/status enum
export * from './project-status.enum';

// Project classification/type enum
export * from './project-type.enum';

// Team role enum
export * from './role.enum';
