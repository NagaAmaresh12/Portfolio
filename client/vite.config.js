import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import glsl from 'vite-plugin-glsl'

export default defineConfig({
  plugins: [react(), tailwindcss(), glsl()],
  build: {
    minify: 'esbuild', // fastest minifier
    sourcemap: false, // remove for production unless needed
    chunkSizeWarningLimit: 600, // raise chunk warning threshold
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Separate react & vendor into their own chunk
          if (id.includes('node_modules')) {
            if (id.includes('react')) return 'vendor-react'
            return 'vendor'
          }
        },
      },
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom'],
    exclude: ['three'], // reduce pre-bundling weight
  },
})
