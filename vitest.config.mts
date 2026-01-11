import { defineConfig } from 'vitest/config'
import path from 'node:path'
import dotenv from 'dotenv'

// ⬅️ ESTO ES LO QUE FALTABA
dotenv.config({ path: '.env.test' })

export default defineConfig({
  test: {
    environment: 'node',
    globals: true,
    include: ['__tests__/**/*.test.ts'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
