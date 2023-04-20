import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

export default defineConfig({
  test: {
    alias: {
      '@lib': resolve(__dirname, 'src'),
    },
    coverage: {
      provider: 'istanbul',
    },
  },
})
