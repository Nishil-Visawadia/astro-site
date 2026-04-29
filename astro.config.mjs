import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // Static site generation (secure by default - no server code execution)
  output: 'static',

  // Site metadata
  site: 'https://docs.example.com',

  // Vite plugins for build time
  vite: {
    plugins: [tailwindcss()]
  },

  // Markdown processing
  markdown: {
    remarkPlugins: [],
    rehypePlugins: []
  },

  // Security: Enable middleware for runtime security headers
  // Note: Middleware runs at deployment (Vercel, Netlify, etc)
  // For self-hosted, use Nginx config instead
  integrations: [react()],

  // Build optimization
  build: {
    // Solid static generation for security
    concurrency: 4
  }
});
