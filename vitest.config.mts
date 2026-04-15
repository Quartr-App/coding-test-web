import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    exclude: [".direnv", "node_modules"],
    setupFiles: './setupTests.js',
  },
})
