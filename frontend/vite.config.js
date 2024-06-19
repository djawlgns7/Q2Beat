import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://bit-two.com/q2beat/',
        changeOrigin: true,
        secure: false,
      },
      '/quiz': {
        target: 'https://bit-two.com/q2beat/',
        changeOrigin: true,
        secure: false,
      },
      '/naver': {
        target: 'https://bit-two.com/q2beat/',
        changeOrigin: true,
        secure: false,
      }
    },
  },
});
