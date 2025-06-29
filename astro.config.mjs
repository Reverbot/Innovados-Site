// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  output: 'server', // Enable server-side rendering for API endpoints
  adapter: vercel(),
  integrations: [react()]
});
