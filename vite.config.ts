import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');

    // The key configuration for fixing Vercel path issues
    const baseConfig = {
      // 1. Explicitly set the base path for Vercel deployment
      base: '/', 
      
      // 2. Explicitly define the build root
      root: './',
    }

    return {
      ...baseConfig, // Spread the base config properties

      server: {
        port: 3000,
        host: '0.0.0.0',
      }, 
      plugins: [react()],
      
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },

      // 3. The single, unified 'resolve' block with all path fixes
      resolve: {
        alias: {
          // Keep existing alias
          '@': path.resolve(__dirname, '.'),
        },
        // Path resolution fix for Rollup
        mainFields: ['module', 'jsnext:main', 'jsnext'],
      }
    };
});
