import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/

// export default defineConfig({
//   plugins: [react()]
  
  
// })




export default defineConfig({
  plugins: [react()],
  base: '/',  // Ensures correct asset loading in Vercel
  build: {
    outDir: 'dist',  // Ensures correct build output
  }
});