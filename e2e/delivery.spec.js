import { expect, test } from '@playwright/test';

test.use({ locale: 'pt-BR' });

test('AC-34: production build served at / loads styles, script and photo', async ({ page, request }) => {
  await page.goto('/');

  const assets = await page.evaluate(() => [
    document.querySelector('link[rel="stylesheet"][href*="/assets/"]').getAttribute('href'),
    document.querySelector('script[type="module"]').getAttribute('src'),
    document.querySelector('#liderança img').getAttribute('src'),
  ]);
  expect(assets[2]).toMatch(/assets\/herbert-hero\.jpg$/);
  for (const url of assets) {
    expect(url).not.toContain('/unflaky-sie/');
    expect((await request.get(new URL(url, page.url()).href)).status(), url).toBe(200);
  }

  const bg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
  expect(bg).toBe('rgb(11, 10, 8)');

  await page.getByRole('button', { name: 'EN' }).click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('cleared');
});
