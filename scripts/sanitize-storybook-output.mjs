import assert from 'node:assert/strict'
import { readdir, readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { excludeUnreviewedRef } from './storybook-ref-workaround.mjs'

const root = 'storybook-static'
const manager = join(root, 'sb-manager', 'globals-runtime.js')
const source = await readFile(manager, 'utf8')
await writeFile(manager, excludeUnreviewedRef(source, 'manager'))

async function checkOutput(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const file = join(directory, entry.name)
    if (entry.isDirectory()) await checkOutput(file)
    else if (/\.(js|html|map)$/.test(entry.name)) {
      assert.ok(!entry.name.endsWith('.map'), `Source maps require a separate rights review: ${file}`)
      const text = await readFile(file, 'utf8')
      assert.ok(!text.includes('use-composed-ref') && !text.includes('prevUserRef') && !text.includes('useComposedRef('),
        `Unreviewed Storybook reference helper may remain in ${file}`)
    }
  }
}
await checkOutput(root)
const notices = await readFile('apps/web/public-licenses/THIRD-PARTY-NOTICES.txt', 'utf8')
assert.ok(!notices.includes('UNRESOLVED:'), 'The catalog notice contains an unresolved entry')
assert.ok(await readFile(join(root, 'THIRD-PARTY-NOTICES.txt'), 'utf8') === notices,
  'The static catalog must include the reviewed notice file')
console.log('Removed the unreviewed Storybook ref helper and checked static output')
