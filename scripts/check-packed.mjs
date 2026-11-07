import { mkdtemp, readFile, writeFile, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { resolve, join, basename, sep } from 'node:path'
import { execFileSync } from 'node:child_process'
const archive = resolve(process.argv[2] || '')
if (!process.argv[2]) throw new Error('Pass the packed npm archive')
const dir = await mkdtemp(join(tmpdir(), 'ui-pack-check-'))
const manifest = { name: 'ui-pack-check', private: true, type: 'module', packageManager: 'pnpm@11.25.0', dependencies: { '@dallasurbanists/ui': `file:${archive.replaceAll('\\', '/')}`, vue: '3.5.44' }, devDependencies: { vite: '8.3.5', typescript: '5.9.3', 'vue-tsc': '3.3.14', '@vitejs/plugin-vue': '6.0.10' }, scripts: { build: 'vue-tsc --noEmit && vite build' } }
await writeFile(join(dir, 'package.json'), JSON.stringify(manifest, null, 2))
await writeFile(join(dir, 'pnpm-workspace.yaml'), 'packages: []\nallowBuilds:\n  esbuild: true\n')
await writeFile(join(dir, 'tsconfig.json'), JSON.stringify({ compilerOptions: { module: 'ESNext', moduleResolution: 'Bundler', target: 'ES2022', strict: true, skipLibCheck: true }, include: ['main.ts'] }))
await writeFile(join(dir, 'index.html'), '<!doctype html><html><body><div id="app"></div><script type="module" src="/main.ts"></script></body></html>')
await writeFile(join(dir, 'main.ts'), `import { createApp, h } from 'vue'
import { Button, type IconName } from '@dallasurbanists/ui'
import '@dallasurbanists/ui/style.css'
const name: IconName = 'search'; void name
createApp({ render: () => h(Button, () => 'Packed') }).mount('#app')
`)
const run = (args) => process.platform === 'win32'
  ? execFileSync(process.env.ComSpec || 'cmd.exe', ['/d', '/c', 'pnpm.cmd', ...args], { cwd: dir, stdio: 'inherit' })
  : execFileSync('pnpm', args, { cwd: dir, stdio: 'inherit' })
try {
  run(['install'])
  const installedManifest = JSON.parse(await readFile(join(dir, 'node_modules', '@dallasurbanists', 'ui', 'package.json'), 'utf8'))
  if (installedManifest.repository?.url !== 'git+https://github.com/DallasUrbanists/design-system.git') {
    throw new Error('The packed package must identify its public GitHub repository for npm provenance')
  }
  run(['build'])
  console.log('Packed fixture built:', dir)
} finally {
  const safeRoot = resolve(tmpdir()) + sep
  if (!resolve(dir).startsWith(safeRoot) || !basename(dir).startsWith('ui-pack-check-')) throw new Error('Unexpected temporary fixture path')
  await rm(dir, { recursive: true, force: true })
}
