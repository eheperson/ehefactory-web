import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import glsl from 'vite-plugin-glsl';

export default defineConfig({
  define: {
    'process.env': {}
  },
  plugins: [
    react(),
    glsl(),  // Enable importing .glsl files
  ],
  build: {
    sourcemap: false, // Disable source maps for production
  }
});
