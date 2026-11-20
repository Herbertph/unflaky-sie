import { expect, test } from '@playwright/test';

test.describe('homepage smoke', () => {
  test.use({ locale: 'pt-BR' });

  test('loads in Portuguese without console errors and switches to English', async ({ page }) => {
    const errors = [];
    page.on('console', (msg) => msg.type() === 'error' && errors.push(msg.text()));
    page.on('pageerror', (err) => errors.push(err.message));
    await page.goto('./');
    await expect(page.locator('html')).toHaveAttribute('lang', 'pt-BR');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('aprovado');

    await page.getByRole('button', { name: 'EN' }).click();
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page).toHaveTitle('Unflaky — Quality Lab · QA for SaaS');
    await expect(page.getByText('STEP 1', { exact: true })).toBeVisible();
    await expect(page.getByRole('img', { name: 'Portrait of Herbert Parasio' })).toBeVisible();
    expect(errors).toEqual([]);
  });

  test('runs the sample suite to the final state', async ({ page }) => {
    await page.goto('./');
    const run = page.getByRole('button', { name: 'Rodar a suíte' });
    await run.click();
    await expect(page.getByRole('button', { name: 'Rodando…' })).toBeDisabled();
    await expect(page.getByRole('button', { name: 'Rodar de novo' })).toBeEnabled();
    await expect(page.locator('.badge')).toHaveText(['FAIL', 'FAIL', 'FAIL', 'PASS', 'PASS']);
  });

  test('has no horizontal scroll at 390px', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('./');
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });

  test('serves the photo placeholder', async ({ page, request }) => {
    await page.goto('./');
    const src = await page.locator('#liderança img').getAttribute('src');
    expect(src).toMatch(/assets\/herbert-hero\.jpg$/);
    expect((await request.get(new URL(src, page.url()).href)).status()).toBe(200);
  });
});
