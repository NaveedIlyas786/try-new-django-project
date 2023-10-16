import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      // Specify the esbuild loader for ".jsx" files
      output: {
        manualChunks: undefined,
      },
    },
  },
  resolve: {
    alias: {
      'react-pdf': '@react-pdf/renderer', // Alias react-pdf to avoid symbol naming conflicts
    },
  },
  optimizeDeps: {
    include: ['@react-pdf/renderer'], // Include @react-pdf/renderer in optimization
  },
  esbuild: {
    jsxFactory: 'jsx', // Specify the JSX factory (if necessary)
    jsxFragment: 'Fragment', // Specify the JSX fragment (if necessary)
  },
});
