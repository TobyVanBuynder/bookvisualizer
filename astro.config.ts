import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import netlify from '@astrojs/netlify';

import path from 'path';
import { fileURLToPath } from 'url';

import svelte from '@astrojs/svelte';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  output: 'static',

  integrations: [tailwind(), svelte()],

  adapter: netlify(),

  vite: {
    build: {
      sourcemap: true,
    },
    resolve: {
      alias: {
        '~': path.resolve(__dirname, './src'),
      },
    },
    plugins: []
  },
});