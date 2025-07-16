import { defineConfig } from 'vite'
import path from 'path';
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      // tsconfig.json 과 동일하게
      'src': path.resolve(__dirname, 'src'),
      '@':   path.resolve(__dirname, 'src'),
    }
  },
  plugins: [react()],
})
