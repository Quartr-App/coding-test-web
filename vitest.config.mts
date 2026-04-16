import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react({ plugins: [['@swc/plugin-styled-components', {}]] })],
  test: {
    environment: 'jsdom',
    exclude: [".direnv", "node_modules"],
    setupFiles: './setupTests.ts',
  },
})
