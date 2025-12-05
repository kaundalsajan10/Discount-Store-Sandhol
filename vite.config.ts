import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
        resolve: {
    // Keep your existing alias
        alias: {
          '@': path.resolve(__dirname, '.'),
        },
        // 💡 NEW: Tell Rollup/Vite to prioritize looking in the project root
        mainFields: ['module', 'jsnext:main', 'jsnext'], 
      },
      // 💡 NEW: Explicitly define the build root
      root: './',
      // 💡 NEW: Set the base path for Vercel deployment
      base: '/', 

      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
