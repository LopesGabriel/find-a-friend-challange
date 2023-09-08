import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    dir: 'tests',
    environmentMatchGlobs: [['tests/e2e/**', 'prisma']],
  },
})
