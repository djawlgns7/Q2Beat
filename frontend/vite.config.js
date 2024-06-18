import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://3.36.56.34:8080/q2beat/',
        changeOrigin: true,
        secure: false,
      },
      '/quiz': {
        target: 'http://3.36.56.34:8080/q2beat/',
        changeOrigin: true,
        secure: false,
      },
      '/naver': {
        target: 'http://3.36.56.34:8080/q2beat/',
        changeOrigin: true,
        secure: false,
      }
    },
  },
});
