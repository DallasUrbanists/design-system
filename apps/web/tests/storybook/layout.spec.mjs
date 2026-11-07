import { test, expect } from '@playwright/test'

const storyPath = '/iframe.html?id=components-page-layout--document-layout&viewMode=story&globals=theme:light'

for (const width of [320, 768, 1280]) {
  test(`page layout fills the viewport and reflows at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 })
    await page.goto(storyPath)
    await expect(page.getByRole('navigation')).toBeVisible()
    const boxes = await page.locator('.page-layout, .page-header, .page-body, .page-navigation, .nav-rail, .page-main, .page-aside').evaluateAll(elements =>
      Object.fromEntries(elements.map(element => {
        const { top, bottom, height } = element.getBoundingClientRect()
        return [element.className, { top, bottom, height }]
      })))
    expect(boxes['page-layout'].height).toBeCloseTo(900, 0)
    expect(boxes['page-body'].top).toBeCloseTo(boxes['page-header'].bottom, 0)
    expect(boxes['page-body'].bottom).toBeCloseTo(900, 0)
    expect(boxes['nav-rail'].height).toBeCloseTo(boxes['page-navigation'].height, 0)
    if (width > 760) {
      for (const region of ['nav-rail', 'page-main', 'page-aside']) {
        expect(boxes[region].height).toBeCloseTo(boxes['page-body'].height, 0)
      }
    } else {
      expect(boxes['page-main'].top).toBeCloseTo(boxes['nav-rail'].bottom, 0)
      expect(boxes['page-aside'].top).toBeCloseTo(boxes['page-main'].bottom, 0)
    }
    expect(await page.locator('html').evaluate(element => ({
      horizontal: element.scrollWidth > element.clientWidth,
      vertical: element.scrollHeight > element.clientHeight,
    }))).toEqual({ horizontal: false, vertical: false })
    await page.keyboard.press('Tab')
    await expect(page.getByRole('link', { name: 'Skip to main content' })).toBeFocused()
    await page.keyboard.press('Enter')
    await expect(page.getByRole('main')).toBeFocused()

    await page.getByRole('main').evaluate(element => {
      for (let index = 0; index < 80; index++) {
        const content = element.ownerDocument.createElement('p')
        content.textContent = `Community idea ${index + 1}`
        element.append(content)
      }
    })
    expect(await page.locator('html').evaluate(element => element.scrollHeight > element.clientHeight)).toBe(true)
    await page.getByRole('complementary').scrollIntoViewIfNeeded()
    await expect(page.getByRole('complementary')).toBeVisible()
    expect(await page.locator('html').evaluate(element => element.scrollWidth > element.clientWidth)).toBe(false)
  })
}
