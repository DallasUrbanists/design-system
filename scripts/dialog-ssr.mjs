import assert from 'node:assert/strict'
import { test } from 'node:test'
import { createRequire } from 'node:module'

const require = createRequire(new URL('../package.json', import.meta.url))
const { createSSRApp, h } = require('vue')
const { renderToString } = require('vue/server-renderer')
const compiled = await import('../dist/index.js')

test('the closed dialog trigger renders on the server', async () => {
    const { Dialog } = compiled
    const html = await renderToString(createSSRApp({ render: () => h(Dialog, { title: 'Title', description: 'Description' }, { trigger: () => h('button', 'Open dialog') }) }))
    assert.match(html, /<button[^>]*>Open dialog<\/button>/)
})
