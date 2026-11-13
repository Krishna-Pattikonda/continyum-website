// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// SITE_URL and BASE_PATH are set automatically by the GitHub Pages workflow.
// Locally and on Vercel they fall back to the production domain served from "/".
const site = process.env.SITE_URL || 'https://continyum.in';
const base = process.env.BASE_PATH || '/';

export default defineConfig({
  site,
  base,
  output: 'static',
  trailingSlash: 'ignore',
  // CSS is small (~7 KB per page) — inline it so nothing blocks the first paint.
  build: { inlineStylesheets: 'always' },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404'),
    }),
  ],
  markdown: {
    shikiConfig: { theme: 'github-light' },
  },
});
