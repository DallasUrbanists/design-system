import vue from '@vitejs/plugin-vue'
import { resolve } from 'node:path'
import { excludeUnreviewedRefFromPreview } from '../../../scripts/storybook-ref-workaround.mjs'

export default {
  stories: ['../stories/**/*.mdx', '../stories/**/*.stories.js'],
  addons: ['@storybook/addon-docs'],
  framework: '@storybook/vue3-vite',
  features: { viewport: true },
  staticDirs: ['../public-licenses'],
  viteFinal: async (config, { configType }) => {
    const production = configType === 'PRODUCTION'
    const existing = config.resolve?.alias || []
    const aliases = Array.isArray(existing) ? existing : Object.entries(existing).map(([find, replacement]) => ({ find, replacement }))
    return {
      ...config,
      build: { ...config.build, cssMinify: false, sourcemap: false },
      plugins: [...(config.plugins || []), vue(), ...(production ? [excludeUnreviewedRefFromPreview()] : [])],
      resolve: { ...config.resolve, alias: [
        { find: '@shared-styles', replacement: resolve(process.cwd(), production ? 'dist/style.css' : 'apps/web/src/styles/tokens.css') },
        { find: '@dallasurbanists/ui', replacement: resolve(process.cwd(), production ? 'dist/index.js' : 'index.ts') },
        ...aliases,
      ], dedupe: ['vue'] },
    }
  },
}
