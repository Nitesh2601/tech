import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ['axios'], // Ignore axios during build to prevent Vite errors
    },
  },
})