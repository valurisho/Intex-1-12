import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    headers: {
      'Content-Security-Policy':
        "default-src 'self'; " +
        "script-src 'self' 'unsafe-inline' 'unsafe-eval'; " +
        "style-src 'self' 'unsafe-inline'; " +
        "img-src 'self' data: https://inteximages.blob.core.windows.net; " +
        "frame-ancestors 'none'; " +
        "font-src 'self' data:; " +
        "connect-src 'self' https://localhost:5000; " +
        "object-src 'none'; " +
        "base-uri 'self'; " +
        "form-action 'self';"},
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
