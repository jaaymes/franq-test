import path from 'node:path';

import tailwindcss from '@tailwindcss/vite';
import vue from '@vitejs/plugin-vue';
import dotenv from 'dotenv';
import vsharp from 'vite-plugin-vsharp';
import { defineConfig } from 'vitest/config';
dotenv.config();

export default defineConfig({
  plugins: [vue(), tailwindcss(), vsharp()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  define: {
    API_URL: JSON.stringify(process.env.API_URL),
    JWT_SECRET: JSON.stringify(process.env.JWT_SECRET),
    API_FINANCE: JSON.stringify(process.env.API_FINANCE),
    FINANCE_KEY: JSON.stringify(process.env.FINANCE_KEY),
  },
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['**/*.{test,spec}.{js,ts,jsx,tsx}'],
  },
  build: {
    sourcemap: false,
    cssCodeSplit: true,
    minify: 'esbuild',
  },
  server: {
    fs: {
      strict: true,
    },
  },
});
