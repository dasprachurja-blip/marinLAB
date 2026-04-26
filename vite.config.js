import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') }
  },
  build: {
    target: 'esnext',
    chunkSizeWarningLimit: 600
  },
  optimizeDeps: {
    include: ['gsap', 'lenis', '@tanstack/react-query']
  }
})
