const { test, expect } = require('@playwright/test');

const BASE_URL = 'https://wikipedia.com/'

test.describe('Wikipedia test', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
  })

  test('Should have logo', async ({ page }) => {
    const centralLogoWrapper = page.locator('.central-textlogo-wrapper')

    const title = centralLogoWrapper.locator('span');

    await expect(title).toHaveText('Wikipedia');

    const subtitle = centralLogoWrapper.locator('.localized-slogan')

    await expect(subtitle).toHaveText('The Free Encyclopedia')
  })

  test('Should have search box', async ({ page }) => {
    const searchContainer = await page.locator('.search-input')

    await expect(searchContainer.locator('.screen-reader-text')).toHaveText('Search Wikipedia')
  })

  test('Should Search for input Real Madrid', async({page}) => {
    page.fill('#searchInput', 'Real Madrid')
    await page.click('.pure-button')
    await page.waitForTimeout(2000)
    const title = page.locator('.firstHeading')
    await expect(title).toHaveText('Real Madrid CF')
  })
})