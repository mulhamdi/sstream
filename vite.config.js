import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/sstream/',
  plugins: [react()],
  resolve: {
    alias: {
      '#/': new URL('./src/', import.meta.url).pathname,
      '#data/': new URL('./data/', import.meta.url).pathname,
      '#services/': new URL('./src/services/', import.meta.url).pathname,
      '#components/': new URL('./src/components/', import.meta.url).pathname,
    },
  },
});
