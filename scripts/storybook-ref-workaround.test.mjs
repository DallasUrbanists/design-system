import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { test } from 'node:test'
import { excludeUnreviewedRef } from './storybook-ref-workaround.mjs'

for (const [variant, path, replacement] of [
  ['manager', 'node_modules/storybook/dist/manager/globals-runtime.js', 'useComposedRefs2(libRef, userRef)'],
  ['components', 'node_modules/storybook/dist/components/index.js', 'useComposedRefs(libRef, userRef)'],
]) {
  test(`excludes the unreviewed helper from Storybook ${variant}`, async () => {
    const source = await readFile(path, 'utf8')
    const result = excludeUnreviewedRef(source, variant)
    assert.ok(result.includes(replacement))
    assert.ok(!result.includes('use-composed-ref') && !result.includes('prevUserRef'))
    assert.throws(() => excludeUnreviewedRef(`${source}\n`, variant), /changed/)
  })
}
