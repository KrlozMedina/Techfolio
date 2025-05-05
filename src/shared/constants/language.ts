export const LANGUAGES = {
  ES: 'es',
  EN: 'en',
} as const;

export type Language = (typeof LANGUAGES)[keyof typeof LANGUAGES];
