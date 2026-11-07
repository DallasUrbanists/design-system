import { expect, test } from '@playwright/test'

test('manager text controls resize and update the story', async ({ page }) => {
  const errors = []
  page.on('pageerror', (error) => errors.push(error.message))
  await page.goto('/?path=/story/components-status--default')
  const message = page.locator('#control-message')
  await expect(message).toHaveValue('Scheduled')
  const initialHeight = await message.evaluate((element) => element.offsetHeight)
  await message.fill('Updated status\nSecond line\nThird line')
  await expect.poll(() => message.evaluate((element) => element.offsetHeight)).toBeGreaterThan(initialHeight)
  await expect(page.frameLocator('#storybook-preview-iframe').getByText(/Updated status/)).toBeVisible()
  await message.fill('Saved')
  await expect(page.frameLocator('#storybook-preview-iframe').getByText('Saved', { exact: true })).toBeVisible()
  expect(errors).toEqual([])
})
