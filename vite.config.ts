import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  // GitHub Pages project page：資源路徑前綴需為 repo 名稱
  base: '/board-game-alias/',
  plugins: [react(), tailwindcss()],
})
