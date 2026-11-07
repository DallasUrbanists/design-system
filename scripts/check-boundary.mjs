import { readdir, readFile } from 'node:fs/promises'
import assert from 'node:assert/strict'
async function walk(path) {
  for (const item of await readdir(path, { withFileTypes: true })) {
    const name = `${path}/${item.name}`
    if (item.isDirectory()) await walk(name)
    else if (/\.(vue|ts|js|mjs)$/.test(name)) {
      const text = await readFile(name, 'utf8')
      assert.doesNotMatch(text, /@lordicon|@googlemaps|lordicon-collection|google-map-adapter/, `App provider leaked into ${name}`)
    }
  }
}
await walk('apps/web/app')
console.log('Shared source has no app-provider dependencies')
