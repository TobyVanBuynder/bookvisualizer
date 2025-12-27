import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

import path from 'path';
import { fileURLToPath } from 'url';

import svelte from '@astrojs/svelte';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  output: 'static',

  integrations: [tailwind(), svelte(),
    (await import("@playform/compress")).default({
      CSS: true,
      HTML: {
        'html-minifier-terser': {
          removeAttributeQuotes: false,
        },
      },
      Image: false,
      JavaScript: true,
      JSON: true,
      SVG: false,
    })
  ],

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