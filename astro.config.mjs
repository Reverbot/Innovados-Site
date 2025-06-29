// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel/serverless';

// https://astro.build/config
export default defineConfig({
  output: 'server', // Habilita el renderizado del lado del servidor
  adapter: vercel({
    // Configuración mínima requerida
    edgeMiddleware: false,
    webAnalytics: {
      enabled: true
    }
  }),
  integrations: [react()]
});
