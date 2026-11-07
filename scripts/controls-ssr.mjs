import assert from 'node:assert/strict'
import { test } from 'node:test'
import { createRequire } from 'node:module'
const require = createRequire(new URL('../package.json', import.meta.url))
const { createSSRApp, h } = require('vue')
const { renderToString } = require('vue/server-renderer')
const compiled = await import('../dist/index.js')

test('fields render unique label and validation associations; progress normalizes invalid ranges', async () => {
    const { Progress } = compiled
    const { Input } = compiled
    const { Switch } = compiled
    const { SegmentedControl } = compiled
    const choices = [{ value: 'all', label: 'All' }, { value: 'saved', label: 'Saved' }]
    const html = await renderToString(createSSRApp({ render: () => h('form', [
      h(Input, { label: 'First', modelValue: '', hint: 'Hint', error: 'Required', name: 'first' }),
      h(Input, { label: 'Second', modelValue: 'A draft', multiline: true }),
      h(Progress, { label: 'Upload', value: 150, max: 100 }),
      h(Progress, { label: 'Unknown', value: Number.NaN, max: -1 }),
      h(Input, { label: 'Search ideas', modelValue: 'shade', type: 'search', hint: 'Search by place', name: 'query' }),
      h(Switch, { label: 'Show ideas', modelValue: true, hint: 'Applies immediately', name: 'ideas' }),
      h(SegmentedControl, { label: 'First view', modelValue: 'all', options: choices }),
      h(SegmentedControl, { label: 'Second view', modelValue: 'saved', options: choices }),
    ]) }))
    const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map(match => match[1])
    assert.equal(new Set(ids).size, ids.length)
    for (const [, id] of html.matchAll(/for="([^"]+)"/g)) assert.ok(ids.includes(id))
    for (const [, list] of html.matchAll(/aria-describedby="([^"]+)"/g)) for (const id of list.split(' ')) assert.ok(ids.includes(id))
    assert.match(html, /aria-invalid="true"/)
    assert.match(html, /name="first"/)
    assert.match(html, /<textarea[^>]*>A draft<\/textarea>/)
    assert.match(html, /<progress[^>]*value="100"[^>]*max="100"/)
    assert.match(html, /<progress id="[^"]+" max="100"/)
    assert.match(html, /<input[^>]*name="query"[^>]*type="search"[^>]*value="shade"/)
    assert.match(html, /<input[^>]*name="ideas"[^>]*role="switch"[^>]*checked/)
    const radioNames = [...html.matchAll(/type="radio" name="([^"]+)"/g)].map(match => match[1])
    assert.equal(radioNames.length, 4)
    assert.equal(new Set(radioNames).size, 2)
    for (const [, id] of html.matchAll(/aria-labelledby="([^"]+)"/g)) assert.ok(ids.includes(id))
})
