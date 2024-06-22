import { coverageConfigDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    coverage: {
      exclude: [
        '**/custom-pattern/**',
        'src/app.js',
        'src/routes/tasks.js',
        ...coverageConfigDefaults.exclude
    ]
    },
  },
});
