import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'node:path'

export default defineConfig({
  plugins: [vue()],
  build: {
    cssMinify: false,
    lib: { entry: resolve(import.meta.dirname, 'index.ts'), formats: ['es'], fileName: () => 'index.js', cssFileName: 'style' },
    rollupOptions: { external: ['vue', 'reka-ui', '@lucide/vue'] },
  },
})
