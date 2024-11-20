import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

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
  ],
});