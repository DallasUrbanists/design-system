import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
for (const [width, height, placement] of [[320,360,'bottom'],[390,844,'bottom'],[768,1024,'bottom'],[1024,768,'side'],[1440,900,'side']]) {
  test(`shared shell adapts at ${width} by ${height}`, async ({ page }) => {
    await page.setViewportSize({ width, height })
    await page.goto('/iframe.html?id=components-map-shell--interaction-fixture&viewMode=story')
    await expect(page.locator('.map-shell')).toHaveAttribute('data-placement', placement)
    await expect(page.getByRole('img', { name: 'Synthetic map preview' })).toBeVisible()
    expect(await page.locator('html').evaluate(el => el.scrollWidth > el.clientWidth)).toBe(false)
    await expect(page.getByRole('complementary', { name: 'Community ideas' })).toBeVisible()
  })
}
for (const theme of ['light','dark']) test(`shared shell accessibility in ${theme}`, async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto(`/iframe.html?id=components-map-shell--interaction-fixture&viewMode=story&globals=theme:${theme}`)
  await expect(page.getByRole('complementary', { name: 'Community ideas' })).toBeVisible()
  expect((await new AxeBuilder({ page }).withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa']).analyze()).violations).toEqual([])
})
