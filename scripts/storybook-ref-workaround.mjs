import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'

// Storybook 10.6.5 embeds a helper without a verifiable copyright notice.
// Remove that block and use its existing, MIT-licensed Radix compose-refs hook.
// Exact input hashes make a Storybook upgrade fail closed for renewed review.
const inputs = {
  manager: {
    sha256: '0b74735ab108e575d8366afd93b79a8410e3313b0a2d8111e81b0973fde64e0d',
    replacement: 'useComposedRefs2',
  },
  components: {
    sha256: '39fcce380a3be4c92e993f636f88854512b6c53ab6ec55d6a4827708493dc42f',
    replacement: 'useComposedRefs',
  },
}
const startMarker = '// ../../node_modules/use-composed-ref/dist/use-composed-ref.esm.js'
const endMarker = '// ../../node_modules/react-textarea-autosize/dist/react-textarea-autosize.browser.esm.js'
const call = 'useComposedRef(libRef, userRef)'

function uniqueIndex(source, needle, start = 0) {
  const index = source.indexOf(needle, start)
  assert.notEqual(index, -1, `Storybook workaround could not find ${needle}`)
  assert.equal(source.indexOf(needle, index + needle.length), -1, `Storybook workaround found multiple ${needle}`)
  return index
}

export function excludeUnreviewedRef(source, variant) {
  const expected = inputs[variant]
  assert.ok(expected, `Unknown Storybook input: ${variant}`)
  assert.equal(createHash('sha256').update(source).digest('hex'), expected.sha256,
    `Storybook ${variant} changed; review the embedded dependencies before building`)
  const start = uniqueIndex(source, startMarker)
  // The preview input has another textarea marker before the excluded block.
  const end = uniqueIndex(source, endMarker, start)
  assert.ok(source.includes(`function ${expected.replacement}(...refs)`), 'Radix compose-refs hook is missing')
  let result = source.slice(0, start) + source.slice(end)
  const callIndex = uniqueIndex(result, call)
  result = result.slice(0, callIndex) + `${expected.replacement}(libRef, userRef)` + result.slice(callIndex + call.length)
  assert.ok(!result.includes(startMarker) && !result.includes('useComposedRef('), 'Unreviewed helper remains')
  return result
}

export function excludeUnreviewedRefFromPreview() {
  let transformed = 0
  return {
    name: 'exclude-unreviewed-storybook-ref',
    enforce: 'pre',
    transform(source, id) {
      const normalized = id.split('?')[0].replaceAll('\\', '/')
      if (!normalized.endsWith('/storybook/dist/components/index.js')) return
      transformed += 1
      return { code: excludeUnreviewedRef(source, 'components'), map: null }
    },
    generateBundle() {
      assert.equal(transformed, 1, 'Expected exactly one reviewed Storybook components input')
    },
  }
}
