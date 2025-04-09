import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'https://localhost:5000', // your .NET backend
        changeOrigin: true,
        secure: false, // allows self-signed SSL certs
        // Uncomment this later if you use cookie-based auth:
        // cookieDomainRewrite: 'localhost',
      },
    },
  },
});
