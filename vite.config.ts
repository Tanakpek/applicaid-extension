import path, { resolve } from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import commonjs from '@rollup/plugin-commonjs';

export default defineConfig({

  build: {

    commonjsOptions: { transformMixedEsModules: true } ,
    
    rollupOptions: {
      input: {
        service_worker: resolve(__dirname, 'src/extension/service_worker.ts'),
        content_script: resolve(__dirname, 'src/extension/content_script.ts'),
        sidebar: resolve(__dirname, 'index.html'),
      },
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: 'c[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
      },
    },
    outDir: 'dist',
  },
  plugins: [
    commonjs(), // Converts CommonJS modules to ES6, so they can be included in a Rollup bundle
    // legacy({
    //   targets: ['defaults', 'not IE 11'],
    // }),
    nodePolyfills(),
    react(), 
    ],
  server: {
    port: 6000
  },
  
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})