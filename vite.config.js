import { defineConfig } from 'vite';

export default defineConfig({
  base: '/unflaky-sie/',
  test: {
    include: ['tests/unit/**/*.test.js'],
  },
});
