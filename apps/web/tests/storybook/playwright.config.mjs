import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: '.',
  workers: 2,
  expect: { timeout: 15000 },
  testMatch: ['docs.spec.mjs', 'tooltip.spec.mjs', 'catalog.spec.mjs', 'overview.spec.mjs', 'component-review.spec.mjs', 'shared-shell.spec.mjs', 'layout.spec.mjs', 'tray.spec.mjs', 'manager-ref.spec.mjs'],
  use: {
    baseURL: 'http://127.0.0.1:6011',
    browserName: 'chromium',
    launchOptions: process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {},
  },
  webServer: {
    cwd: '../../../..',
    command: process.env.STORYBOOK_TEST_STATIC === '1'
      ? 'pnpm exec vite preview --outDir storybook-static --host 127.0.0.1 --port 6011 --strictPort'
      : 'pnpm exec storybook dev -c apps/web/.storybook --port 6011 --host 127.0.0.1 --no-open --ci',
    url: 'http://127.0.0.1:6011',
    reuseExistingServer: false,
    env: { STORYBOOK_MAPS_TEST_MODE: '1' },
    timeout: 120000,
  },
})
