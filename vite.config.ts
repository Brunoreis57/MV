import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    rollupOptions: {
      input: {
        main: './index.html',
        barbearia: './barbearia/index.html',
        estetica: './estetica/index.html',
      },
    },
  },
  server: {
    proxy: {
      '/api': 'http://localhost:3000'
    }
  },
  base: '/'
});
