import { copyFile } from 'node:fs/promises'
await copyFile('apps/web/src/styles/tokens.css', 'dist/tokens.css')
