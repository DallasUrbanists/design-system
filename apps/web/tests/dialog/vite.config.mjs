import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'node:path'
export default defineConfig({ root: 'apps/web', cacheDir: '../../node_modules/.vite-dialog', plugins: [vue()], resolve: { alias: { '@dallasurbanists/ui': resolve('dist/index.js'), 'vue': resolve('node_modules/vue/dist/vue.esm-bundler.js') }, dedupe: ['vue'] }, server: { host: '127.0.0.1', port: 4177, strictPort: true } })
