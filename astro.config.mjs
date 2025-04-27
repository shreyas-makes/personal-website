import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import cloudflare from '@astrojs/cloudflare';

const LIVE_URL = "https://shreyasprakash.com";

export default defineConfig({
  site: 'https://shreyasprakash.com',
  output: 'server',
  adapter: cloudflare(),
  experimental: {
    session: true
  },
  integrations: [
    react({
      include: ['**/react/*', '**/Search.tsx', '**/SearchButton.tsx', '**/Chat.jsx']
    }),
    sitemap(),
    tailwind(),
  ],
  build: {
    format: 'directory',
    assets: '_assets',
    inlineStylesheets: 'auto'
  },
  markdown: {
    assets: {
      path: './images'
    },
    shikiConfig: {
      theme: 'one-dark-pro',
      wrap: true
    },
    remarkPlugins: [],
    rehypePlugins: []
  },
  viewTransitions: true,
  headers: {
    '/*.{js,css,jpg,jpeg,png,gif,svg}': [
      {
        key: 'Cache-Control',
        value: 'public, max-age=31536000, immutable'
      }
    ]
  },
  vite: {
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor': ['astro:content', 'astro:assets'],
            'utils': ['/src/utils/'],
            'markdown': ['marked', 'prismjs'],
            'transitions': ['astro:transitions']
          }
        }
      },
      target: 'esnext',
      minify: 'terser',
      cssMinify: true,
      cssCodeSplit: true,
      modulePreload: {
        polyfill: true
      },
      chunkSizeWarningLimit: 1000
    },
    optimizeDeps: {
      include: ['astro:content', 'astro:assets'],
      exclude: ['@astrojs/prism']
    },
    ssr: {
      noExternal: ['@react-icons/all-files', 'openai']
    }
  }
}); 