import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  root: '',
  envDir: process.cwd(),
  build: {
    outDir: '../dist',
  },
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      '@': path.join(process.cwd(), 'src'),
      '@interfaces': path.join(process.cwd(), 'src/interfaces/index.ts'),
    },
  },
  define: {
    'process.platform': JSON.stringify(process.platform),
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true,
      },
      manifest: {
        name: 'React Vite',
        short_name: 'React Vite',
        theme_color: '#000000',
        icons: [
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
});