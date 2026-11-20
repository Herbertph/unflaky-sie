import { expect, test } from '@playwright/test';
import { DICT } from '../src/i18n.js';

// Acceptance tests for docs/specs/unflaky-homepage.md. Test cases: docs/test-cases/unflaky-homepage.md.

const SHIELD =
  'M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z';
const CHECK = 'm8.8 11.9 2.1 2.1 4.3-4.3';
const META_PT =
  'Unflaky — Quality Lab: consultoria de QA para SaaS, com foco em produtos construídos com IA. Diagnóstico, teste manual, automação Playwright e agentes de IA com revisão humana.';
const LINKS = {
  LinkedIn: 'https://www.linkedin.com/in/herbert-cunha',
  'herbertph.com': 'https://herbertph.com',
  GitHub: 'https://github.com/Herbertph',
};
const RESULTS = ['FAIL', 'FAIL', 'FAIL', 'PASS', 'PASS'];
const DESKTOP = { width: 1280, height: 800 };
const TABLET = { width: 900, height: 1000 };
const MOBILE = { width: 390, height: 844 };

test.use({ locale: 'pt-BR', viewport: DESKTOP });

const runButton = (page) => page.locator('.report-run');
const switchTo = (page, lang) => page.getByRole('button', { name: lang.toUpperCase(), exact: true }).click();

function trackErrors(page) {
  const errors = [];
  page.on('console', (msg) => msg.type() === 'error' && errors.push(msg.text()));
  page.on('pageerror', (err) => errors.push(err.message));
  return errors;
}

async function box(locator) {
  const b = await locator.boundingBox();
  expect(b, 'element should be rendered').not.toBeNull();
  return b;
}

async function horizontalOverflow(page) {
  return page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
}

// Records, per badge, the time (ms after the click) at which it left the waiting state.
async function clickAndRecord(page) {
  await page.evaluate(() => {
    const badges = [...document.querySelectorAll('.report .badge')];
    window.__resolved = [];
    const waiting = new Set();
    const observer = new MutationObserver(() => {
      badges.forEach((b, row) => {
        if (b.textContent === '···') waiting.add(row);
        else if (waiting.delete(row)) {
          window.__resolved.push({ row, at: performance.now() - window.__t0, text: b.textContent, cls: b.className });
        }
      });
    });
    badges.forEach((b) => observer.observe(b, { childList: true, characterData: true, subtree: true }));
    window.__t0 = performance.now();
    document.querySelector('.report-run').click();
  });
}

test.describe('identity and structure', () => {
  test('TC-1 (AC-1): root tokens match FR-1', async ({ page }) => {
    await page.goto('./');
    const tokens = {
      '--bg': '#0B0A08', '--bg-2': '#12100C', '--panel': '#171410', '--panel-2': '#1D1913',
      '--ink': '#F2ECDD', '--ink-2': '#ABA18D', '--ink-3': '#7E7663', '--line': '#2B2619',
      '--line-soft': '#211D14', '--gold': '#C6A15B', '--gold-2': '#E6C87E', '--gold-dim': 'rgba(198,161,91,.14)',
      '--pass': '#5FC98B', '--pass-bg': 'rgba(95,201,139,.12)', '--fail': '#FF7A59', '--fail-bg': 'rgba(255,122,89,.12)',
      '--paper': '#F5F0E1', '--paper-ink': '#16130C',
    };
    const mismatches = await page.evaluate((tokens) => {
      const probe = document.createElement('div');
      document.body.append(probe);
      const resolve = (value) => {
        probe.style.color = '';
        probe.style.color = value;
        return getComputedStyle(probe).color;
      };
      const out = [];
      for (const [name, expected] of Object.entries(tokens)) {
        const raw = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
        if (!raw || resolve(`var(${name})`) !== resolve(expected)) out.push(`${name}: ${raw}`);
      }
      probe.remove();
      return out;
    }, tokens);
    expect(mismatches).toEqual([]);
  });

  test('TC-2 (AC-2): sections follow FR-3 order with headers 01-06', async ({ page }) => {
    await page.goto('./');
    const order = ['.strip', 'header.site-header', 'section.hero', '.hero .verdict', 'section.stats', 'section.positioning',
      '#serviços', '#padrão', '#foco', '#método', '#liderança', '#faq', '#contato', 'footer.site-footer'];
    const inOrder = await page.evaluate((sels) => {
      const els = sels.map((s) => document.querySelector(s));
      if (els.some((e) => !e)) return sels.filter((_, i) => !els[i]);
      return els.slice(1).every((el, i) => els[i].compareDocumentPosition(el) & Node.DOCUMENT_POSITION_FOLLOWING);
    }, order);
    expect(inOrder).toBe(true);

    const numbered = [['#serviços', 'svc.h'], ['#padrão', 'std.h'], ['#foco', 'focus.h'], ['#método', 'method.h'],
      ['#liderança', 'lead.h'], ['#faq', 'faq.h']];
    for (const [i, [id, key]] of numbered.entries()) {
      await expect(page.locator(`${id} .sec-num`)).toHaveText(`0${i + 1}`);
      await expect(page.locator(`${id} h2`)).toHaveText(DICT.pt[key]);
    }
  });

  test('TC-3 (AC-3): header shows the shield, UNFLAKY and only Quality Lab', async ({ page }) => {
    await page.goto('./');
    const header = page.locator('header.site-header');
    const paths = header.locator('.brand svg path');
    await expect(paths.nth(0)).toHaveAttribute('d', SHIELD);
    await expect(paths.nth(1)).toHaveAttribute('d', CHECK);
    for (const lang of ['pt', 'en']) {
      await switchTo(page, lang);
      await expect(header.locator('.brand')).toContainText('UNFLAKY');
      await expect(header.locator('.brand-role')).toHaveText('Quality Lab');
      await expect(header).not.toContainText(/QA (for|para) SaaS/i);
    }
  });

  test('TC-4 (AC-4): favicon is an SVG data URI with the shield', async ({ page }) => {
    await page.goto('./');
    const href = await page.locator('link[rel="icon"]').getAttribute('href');
    expect(href.startsWith('data:image/svg+xml')).toBe(true);
    const svg = decodeURIComponent(href);
    expect(svg).toContain(SHIELD);
    expect(svg.toUpperCase()).toContain('#0B0A08');
  });

  test('TC-5 (AC-5): nav links point to existing section anchors', async ({ page }) => {
    await page.goto('./');
    const hrefs = await page.getByRole('navigation', { name: 'Main' }).getByRole('link')
      .evaluateAll((links) => links.map((a) => a.getAttribute('href')));
    expect(hrefs).toEqual(['#serviços', '#padrão', '#foco', '#método', '#faq']);
    for (const href of hrefs) await expect(page.locator(`[id="${href.slice(1)}"]`)).toHaveCount(1);
  });
});

test.describe('copy', () => {
  test('TC-6 (AC-6): every dictionary node renders the PT and EN value', async ({ page }) => {
    await page.goto('./');
    for (const lang of ['pt', 'en']) {
      await switchTo(page, lang);
      const rendered = await page.evaluate(() => ({
        text: [...document.querySelectorAll('[data-i18n]')].map((el) => [el.dataset.i18n, el.textContent]),
        html: [...document.querySelectorAll('[data-i18n-html]')].map((el) => [el.dataset.i18nHtml, el.innerHTML, !!el.querySelector('em')]),
      }));
      for (const [key, text] of rendered.text) expect(text, `${lang} ${key}`).toBe(DICT[lang][key]);
      for (const [key, html, hasEm] of rendered.html) {
        expect(html, `${lang} ${key}`).toBe(DICT[lang][key]);
        expect(hasEm, `${lang} ${key} renders <em>`).toBe(DICT[lang][key].includes('<em>'));
      }
    }
  });

  test('TC-7 (AC-6): no dictionary key is left off the page', async ({ page }) => {
    await page.goto('./');
    const used = await page.evaluate(() => [
      ...[...document.querySelectorAll('[data-i18n]')].map((el) => el.dataset.i18n),
      ...[...document.querySelectorAll('[data-i18n-html]')].map((el) => el.dataset.i18nHtml),
      ...[...document.querySelectorAll('[data-i18n-alt]')].map((el) => el.dataset.i18nAlt),
    ]);
    // Keys consumed by code rather than a static attribute.
    const byCode = ['title', 'method.steps', 'report.rerun', 'report.running'];
    const missing = Object.keys(DICT.pt).filter((k) => !used.includes(k) && !byCode.includes(k));
    expect(missing).toEqual([]);
  });

  test('TC-8 (AC-7): fixed texts, stats and badges are unchanged in PT and EN', async ({ page }) => {
    await page.goto('./');
    const fixed = ['SaaS · IA', 'CTFL · ISTQB 2026', 'CHK-014 · PAGAMENTOS', 'SEC-003 · ACESSO', 'AUT-021 · LOGIN',
      'AUT-007 · LOGIN', 'UPL-009 · ARQUIVOS', 'Herbert Parasio', 'CI/CD'];
    for (const lang of ['pt', 'en']) {
      await switchTo(page, lang);
      for (const text of fixed) await expect(page.getByText(text, { exact: true }).first()).toBeVisible();
      await expect(page.getByText('Playwright · TypeScript', { exact: true })).toHaveCount(2);
      await expect(page.locator('.brand-name')).toHaveText('UNFLAKY');
      await expect(page.locator('.footer-brand')).toHaveText('UNFLAKY');
      await expect(page.getByRole('navigation', { name: 'Main' }).getByRole('link', { name: 'FAQ', exact: true })).toBeVisible();
      await expect(page.locator('#faq .sec-side')).toHaveText('FAQ');
      await expect(page.locator('.stat-num')).toHaveText(['95%', '98%', '10', '11']);
      await expect(page.locator('.report .badge')).toHaveText(RESULTS);
      await expect(page.locator('.gate-num')).toHaveText(['01', '02', '03', '04']);
      await expect(page.locator('.card-idx')).toHaveText(['/01', '/02', '/03', '/04']);
      await expect(page.locator('#contato .actions a')).toHaveText([DICT[lang]['contact.b1'], 'herbertph.com', 'GitHub']);
      await expect(page.locator('.footer-links a')).toHaveText(['LinkedIn', 'GitHub', 'herbertph.com']);
    }
  });

  test('TC-9 (AC-8): no form, input, iframe or price in either language', async ({ page }) => {
    await page.goto('./');
    for (const lang of ['pt', 'en']) {
      await switchTo(page, lang);
      await expect(page.locator('form, input, textarea, select, iframe')).toHaveCount(0);
      const text = await page.locator('body').innerText();
      expect(text).not.toMatch(/(R\$|US\$|\$|€|£)\s?\d/);
    }
  });
});

test.describe('language', () => {
  test.describe('en-US browser', () => {
    test.use({ locale: 'en-US' });
    test('TC-11 (AC-10): en-US browser loads in English', async ({ page }) => {
      await page.goto('./');
      await expect(page.locator('html')).toHaveAttribute('lang', 'en');
      await expect(page).toHaveTitle('Unflaky — Quality Lab · QA for SaaS');
      await expect(page.getByRole('button', { name: 'EN', exact: true })).toHaveAttribute('aria-pressed', 'true');
      await expect(page.getByRole('button', { name: 'PT', exact: true })).toHaveAttribute('aria-pressed', 'false');
      await expect(page.locator('h1')).toHaveText('Your software cleared before it ships.');
    });
  });

  test('TC-12 (AC-11): pt-BR browser loads in Portuguese', async ({ page }) => {
    await page.goto('./');
    await expect(page.locator('html')).toHaveAttribute('lang', 'pt-BR');
    await expect(page).toHaveTitle(DICT.pt.title);
    await expect(page.getByRole('button', { name: 'PT', exact: true })).toHaveAttribute('aria-pressed', 'true');
    await expect(page.locator('h1')).toHaveText('Seu software aprovado antes de ir pro ar.');
  });

  test.describe('fr-FR browser', () => {
    test.use({ locale: 'fr-FR' });
    test('TC-13 (AC-12): fr-FR browser falls back to Portuguese', async ({ page }) => {
      await page.goto('./');
      await expect(page.locator('html')).toHaveAttribute('lang', 'pt-BR');
      await expect(page).toHaveTitle(DICT.pt.title);
    });
  });

  test('TC-14 (AC-12): empty browser language falls back to Portuguese', async ({ page }) => {
    await page.addInitScript(() => Object.defineProperty(Navigator.prototype, 'language', { get: () => '' }));
    await page.goto('./');
    expect(await page.evaluate(() => navigator.language)).toBe('');
    await expect(page.locator('html')).toHaveAttribute('lang', 'pt-BR');
    await expect(page.locator('h1')).toHaveText('Seu software aprovado antes de ir pro ar.');
  });

  test('TC-15 (AC-13): switches PT to EN and back without reloading', async ({ page }) => {
    await page.goto('./');
    await page.evaluate(() => { window.__noReload = true; });
    const steps = page.locator('.step-label');
    const photo = page.locator('#liderança img');
    const meta = page.locator('meta[name="description"]');

    await switchTo(page, 'en');
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page).toHaveTitle(DICT.en.title);
    await expect(photo).toHaveAttribute('alt', DICT.en['lead.alt']);
    await expect(steps).toHaveText(['STEP 1', 'STEP 2', 'STEP 3', 'STEP 4']);
    await expect(page.locator('.lede')).toHaveText(DICT.en['hero.lede']);
    await expect(meta).toHaveAttribute('content', META_PT);

    await switchTo(page, 'pt');
    await expect(page.locator('html')).toHaveAttribute('lang', 'pt-BR');
    await expect(page).toHaveTitle(DICT.pt.title);
    await expect(photo).toHaveAttribute('alt', DICT.pt['lead.alt']);
    await expect(steps).toHaveText(['ETAPA 1', 'ETAPA 2', 'ETAPA 3', 'ETAPA 4']);
    await expect(meta).toHaveAttribute('content', META_PT);
    expect(await page.evaluate(() => window.__noReload)).toBe(true);
  });

  test('TC-16 (AC-14): clicking the active language changes nothing', async ({ page }) => {
    const errors = trackErrors(page);
    await page.goto('./');
    const before = await page.evaluate(() => document.documentElement.outerHTML);
    await switchTo(page, 'pt');
    await switchTo(page, 'pt');
    expect(await page.evaluate(() => document.documentElement.outerHTML)).toBe(before);
    await expect(page.getByRole('button', { name: 'PT', exact: true })).toHaveAttribute('aria-pressed', 'true');
    expect(errors).toEqual([]);
  });
});

test.describe('FAQ', () => {
  test('TC-17 (AC-15): five FAQ items, none open', async ({ page }) => {
    await page.goto('./');
    await expect(page.locator('#faq details')).toHaveCount(5);
    await expect(page.locator('#faq details[open]')).toHaveCount(0);
  });

  test('TC-18 (AC-16): FAQ items open and close independently', async ({ page }) => {
    await page.goto('./');
    const items = page.locator('#faq details');
    await items.nth(0).locator('summary').click();
    await items.nth(2).locator('summary').click();
    await expect(items.nth(0)).toHaveAttribute('open', '');
    await expect(items.nth(2)).toHaveAttribute('open', '');
    await expect(page.getByText(DICT.pt['faq.1a'])).toBeVisible();
    await items.nth(0).locator('summary').click();
    await expect(items.nth(0)).not.toHaveAttribute('open');
    await expect(items.nth(2)).toHaveAttribute('open', '');
    await expect(page.getByText(DICT.pt['faq.1a'])).toBeHidden();
    await expect(page.getByText(DICT.pt['faq.3a'])).toBeVisible();
  });
});

test.describe('run the suite', () => {
  test('TC-19 (AC-17): idle button is enabled with the run label', async ({ page }) => {
    await page.goto('./');
    await expect(page.getByRole('button', { name: 'Rodar a suíte' })).toBeEnabled();
    await switchTo(page, 'en');
    await expect(page.getByRole('button', { name: 'Run the suite' })).toBeEnabled();
  });

  test('TC-20 (AC-18): click disables the button and shows waiting badges', async ({ page }) => {
    await page.goto('./');
    const state = await page.evaluate(() => {
      const button = document.querySelector('.report-run');
      button.click();
      return {
        disabled: button.disabled,
        label: button.textContent,
        badges: [...document.querySelectorAll('.report .badge')].map((b) => [b.textContent, b.className]),
      };
    });
    expect(state.disabled).toBe(true);
    expect(state.label).toBe('Rodando…');
    expect(state.badges).toEqual(Array(5).fill(['···', 'badge badge-wait']));
  });

  test('TC-21 (AC-19): badges resolve in row order on the 260/340ms schedule', async ({ page }) => {
    await page.goto('./');
    await clickAndRecord(page);
    await expect(page.getByRole('button', { name: 'Rodar de novo' })).toBeEnabled();
    const resolved = await page.evaluate(() => window.__resolved);
    expect(resolved.map((r) => r.row)).toEqual([0, 1, 2, 3, 4]);
    expect(resolved.map((r) => r.text)).toEqual(RESULTS);
    resolved.forEach((r, i) => {
      expect(r.cls).toBe(`badge badge-${RESULTS[i].toLowerCase()}`);
      expect(Math.abs(r.at - (260 + i * 340)), `row ${i} at ${r.at}ms`).toBeLessThan(150);
    });
    const colors = await page.locator('.report .badge').evaluateAll((bs) => bs.map((b) => getComputedStyle(b).color));
    expect(colors).toEqual([...Array(3).fill('rgb(255, 122, 89)'), ...Array(2).fill('rgb(95, 201, 139)')]);
  });

  test('TC-22 (AC-20): running again repeats the cycle', async ({ page }) => {
    await page.goto('./');
    await runButton(page).click();
    await expect(page.getByRole('button', { name: 'Rodar de novo' })).toBeEnabled();
    await clickAndRecord(page);
    await expect(page.locator('.report .badge').first()).toHaveText('···');
    await expect(page.getByRole('button', { name: 'Rodar de novo' })).toBeEnabled();
    expect((await page.evaluate(() => window.__resolved)).map((r) => r.row)).toEqual([0, 1, 2, 3, 4]);
    await expect(page.locator('.report .badge')).toHaveText(RESULTS);
  });

  test('TC-23 (AC-21): reduced motion shows the final state at once', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('./');
    const state = await page.evaluate(() => {
      const button = document.querySelector('.report-run');
      button.click();
      return {
        disabled: button.disabled,
        label: button.textContent,
        badges: [...document.querySelectorAll('.report .badge')].map((b) => b.textContent),
      };
    });
    expect(state).toEqual({ disabled: false, label: 'Rodar de novo', badges: RESULTS });
  });

  test('TC-24 (AC-22): finished run relabels to Run it again in EN', async ({ page }) => {
    await page.goto('./');
    await runButton(page).click();
    await expect(page.getByRole('button', { name: 'Rodar de novo' })).toBeEnabled();
    await switchTo(page, 'en');
    await expect(runButton(page)).toHaveText('Run it again');
  });

  test('TC-25 (AC-22): switching mid-run shows Running then Run it again in EN', async ({ page }) => {
    await page.goto('./');
    await runButton(page).click();
    await switchTo(page, 'en');
    await expect(runButton(page)).toHaveText('Running…');
    await expect(runButton(page)).toBeDisabled();
    await expect(runButton(page)).toHaveText('Run it again');
    await expect(runButton(page)).toBeEnabled();
  });

  test('TC-26 (AC-23): repeated clicks during a run start no second run', async ({ page }) => {
    await page.goto('./');
    await clickAndRecord(page);
    await page.evaluate(() => {
      const button = document.querySelector('.report-run');
      for (let i = 0; i < 3; i++) button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    await runButton(page).click({ force: true }).catch(() => {});
    await expect(page.getByRole('button', { name: 'Rodar de novo' })).toBeEnabled();
    await page.waitForTimeout(500);
    const resolved = await page.evaluate(() => window.__resolved);
    expect(resolved.map((r) => r.row)).toEqual([0, 1, 2, 3, 4]);
  });
});

test.describe('navigation and links', () => {
  for (const [name, target, locate] of [
    ['header CTA', '#contato', (p) => p.locator('.header-cta')],
    ['hero.cta1', '#contato', (p) => p.locator('.hero').getByRole('link', { name: DICT.pt['hero.cta1'] })],
    ['hero.cta2', '#padrão', (p) => p.locator('.hero').getByRole('link', { name: DICT.pt['hero.cta2'] })],
  ]) {
    test(`TC-27 (AC-24): CTAs scroll to #contato and #padrão in place — ${name}`, async ({ page }) => {
      await page.goto('./');
      await page.evaluate(() => { window.__noReload = true; });
      const startPath = new URL(page.url()).pathname;
      await locate(page).click();
      await expect(page.locator(`[id="${target.slice(1)}"]`)).toBeInViewport();
      expect(new URL(page.url()).pathname).toBe(startPath);
      expect(decodeURIComponent(new URL(page.url()).hash)).toBe(target);
      expect(await page.evaluate(() => window.__noReload)).toBe(true);
    });
  }

  test('TC-28 (AC-25): contact and footer links are exact and open safely in a new tab', async ({ page }) => {
    await page.goto('./');
    for (const scope of ['#contato .actions', '.footer-links']) {
      for (const [label, url] of Object.entries(LINKS)) {
        const name = label === 'LinkedIn' && scope === '#contato .actions' ? DICT.pt['contact.b1'] : label;
        const link = page.locator(scope).getByRole('link', { name, exact: true });
        await expect(link).toHaveAttribute('href', url);
        await expect(link).toHaveAttribute('target', '_blank');
        await expect(link).toHaveAttribute('rel', /\bnoopener\b/);
      }
    }
    const external = await page.locator('a[href^="http"]').count();
    expect(external).toBe(6);
  });
});

test.describe('leadership and photo', () => {
  test('TC-29 (AC-26): one circular 200px photo with translated alt', async ({ page }) => {
    await page.goto('./');
    await expect(page.locator('img')).toHaveCount(1);
    const photo = page.locator('#liderança img');
    await expect(photo).toHaveAttribute('src', /assets\/herbert-hero\.jpg$/);
    await expect(photo).toHaveAttribute('alt', DICT.pt['lead.alt']);
    await expect(photo).toHaveCSS('border-radius', '50%');
    const b = await box(photo);
    expect([Math.round(b.width), Math.round(b.height)]).toEqual([200, 200]);
    await switchTo(page, 'en');
    await expect(photo).toHaveAttribute('alt', DICT.en['lead.alt']);
    expect(await page.content()).not.toContain('herbert-story');
  });

  test.describe('mobile', () => {
    test.use({ viewport: MOBILE });
    test('TC-30 (AC-26): photo is 120px at 390px', async ({ page }) => {
      await page.goto('./');
      const b = await box(page.locator('#liderança img'));
      expect([Math.round(b.width), Math.round(b.height)]).toEqual([120, 120]);
    });
  });

  test('TC-31 (AC-27): photo placeholder loads with HTTP 200', async ({ page, request }) => {
    await page.goto('./');
    const photo = page.locator('#liderança img');
    const src = await photo.evaluate((img) => img.currentSrc || img.src);
    expect((await request.get(src)).status()).toBe(200);
    await photo.scrollIntoViewIfNeeded();
    await expect.poll(() => photo.evaluate((img) => img.complete && img.naturalWidth)).toBeGreaterThan(0);
  });
});

test.describe('responsive', () => {
  test.describe('900px', () => {
    test.use({ viewport: TABLET });
    test('TC-32 (AC-28): 900px layout', async ({ page }) => {
      await page.goto('./');
      await expect(page.getByRole('navigation', { name: 'Main' })).toBeHidden();
      await expect(page.locator('.lang-switch')).toBeVisible();
      await expect(page.locator('.header-cta')).toBeVisible();

      const text = await box(page.locator('.hero-text'));
      const panel = await box(page.locator('.verdict'));
      expect(panel.y).toBeGreaterThanOrEqual(text.y + text.height);

      const focusText = await box(page.locator('.focus-text'));
      const report = await box(page.locator('.report'));
      expect(report.y).toBeGreaterThanOrEqual(focusText.y + focusText.height);

      const steps = await Promise.all([0, 1, 2, 3].map((i) => box(page.locator('.step').nth(i))));
      expect(Math.round(steps[0].y)).toBe(Math.round(steps[1].y));
      expect(Math.round(steps[2].y)).toBe(Math.round(steps[3].y));
      expect(steps[2].y).toBeGreaterThan(steps[0].y);
      expect(steps[1].x).toBeGreaterThan(steps[0].x);
      await expect(page.locator('.step').nth(0)).toHaveCSS('border-top-width', '0px');
      await expect(page.locator('.step').nth(1)).toHaveCSS('border-top-width', '0px');

      const principles = await Promise.all([0, 1, 2].map((i) => box(page.locator('.principle').nth(i))));
      expect(principles[1].y).toBeGreaterThanOrEqual(principles[0].y + principles[0].height - 1);
      expect(principles[2].y).toBeGreaterThanOrEqual(principles[1].y + principles[1].height - 1);
      await expect(page.locator('.principle').nth(1)).toHaveCSS('border-top-style', 'solid');
    });
  });

  test.describe('390px', () => {
    test.use({ viewport: MOBILE });
    test('TC-33 (AC-29): 390px layout', async ({ page }) => {
      await page.goto('./');
      await expect(page.locator('.header-cta')).toBeHidden();
      await expect(page.locator('.strip-right')).toBeHidden();
      for (const side of await page.locator('.sec-side').all()) await expect(side).toBeHidden();

      const stats = await Promise.all([0, 1, 2, 3].map((i) => box(page.locator('.stat').nth(i))));
      expect(Math.round(stats[0].y)).toBe(Math.round(stats[1].y));
      expect(stats[2].y).toBeGreaterThan(stats[0].y);
      expect(Math.round(stats[2].y)).toBe(Math.round(stats[3].y));

      for (const sel of ['.card', '.step']) {
        const xs = await page.locator(sel).evaluateAll((els) => els.map((e) => Math.round(e.getBoundingClientRect().x)));
        expect(new Set(xs).size, `${sel} in one column`).toBe(1);
      }
    });

    test('TC-34 (AC-30): no overflow at 390px in PT and EN', async ({ page }) => {
      await page.goto('./');
      for (const lang of ['pt', 'en']) {
        await switchTo(page, lang);
        expect(await horizontalOverflow(page), `${lang} horizontal scroll`).toBeLessThanOrEqual(0);
        const overflowing = await page.evaluate(() => {
          const vw = document.documentElement.clientWidth;
          return ['.strip', '.hero', '.verdict', '.stats', '.report', '.lead-card']
            .flatMap((s) => [document.querySelector(s), ...document.querySelectorAll(`${s} *`)])
            .filter((el) => {
              const r = el.getBoundingClientRect();
              return r.width > 0 && (r.left < -0.5 || r.right > vw + 0.5);
            })
            .map((el) => el.className || el.tagName);
        });
        expect(overflowing, `${lang} overflowing elements`).toEqual([]);
      }
    });
  });

  test('TC-35 (AC-30): no horizontal scroll at 360, 800 and 1400px', async ({ page }) => {
    for (const width of [360, 800, 1400]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto('./');
      for (const lang of ['pt', 'en']) {
        await switchTo(page, lang);
        expect(await horizontalOverflow(page), `${width}px ${lang}`).toBeLessThanOrEqual(0);
      }
    }
  });

  test('TC-36 (AC-31): 1280px hero has two columns and wrap is 1200px', async ({ page }) => {
    await page.goto('./');
    const text = await box(page.locator('.hero-text'));
    const panel = await box(page.locator('.verdict'));
    expect(panel.x).toBeGreaterThanOrEqual(text.x + text.width);
    expect(panel.y).toBeLessThan(text.y + text.height);
    await expect(page.locator('.wrap').first()).toHaveCSS('max-width', '1200px');
  });
});

test.describe('quality', () => {
  test('TC-37 (AC-32): no console errors while switching language and running the suite', async ({ page }) => {
    const errors = trackErrors(page);
    await page.goto('./');
    await switchTo(page, 'en');
    await switchTo(page, 'pt');
    await runButton(page).click();
    await expect(page.getByRole('button', { name: 'Rodar de novo' })).toBeEnabled();
    expect(errors).toEqual([]);
  });
});

test.describe('exploratory', () => {
  async function focusOutline(page) {
    return page.evaluate(() => {
      const s = getComputedStyle(document.activeElement);
      return s.outlineStyle !== 'none' && parseFloat(s.outlineWidth) > 0;
    });
  }

  async function tabUntil(page, predicate, max = 60) {
    for (let i = 0; i < max; i++) {
      await page.keyboard.press('Tab');
      if (await page.evaluate(predicate)) return;
    }
    throw new Error('focus target not reached with Tab');
  }

  test('TC-39: keyboard alone switches language, opens FAQ and runs the suite', async ({ page }) => {
    await page.goto('./');
    await tabUntil(page, () => document.activeElement?.dataset.lang === 'en');
    expect(await focusOutline(page)).toBe(true);
    await page.keyboard.press('Enter');
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');

    await tabUntil(page, () => document.activeElement?.classList.contains('report-run'));
    expect(await focusOutline(page)).toBe(true);
    await page.keyboard.press('Space');
    await expect(page.getByRole('button', { name: 'Run it again' })).toBeEnabled();

    await tabUntil(page, () => document.activeElement?.tagName === 'SUMMARY');
    expect(await focusOutline(page)).toBe(true);
    await page.keyboard.press('Enter');
    await expect(page.locator('#faq details').first()).toHaveAttribute('open', '');
  });

  for (const viewport of [DESKTOP, MOBILE]) {
    test(`TC-40: tab order only lands on visible controls at 1280 and 390px — ${viewport.width}px`, async ({ page }) => {
      await page.setViewportSize(viewport);
      await page.goto('./');
      const problems = [];
      let count = 0;
      for (let i = 0; i < 60; i++) {
        await page.keyboard.press('Tab');
        const info = await page.evaluate(() => {
          const el = document.activeElement;
          if (!el || el === document.body) return null;
          const r = el.getBoundingClientRect();
          const s = getComputedStyle(el);
          return {
            label: `${el.tagName} ${el.textContent.trim().slice(0, 30)}`,
            visible: el.checkVisibility() && r.width > 0 && r.height > 0,
            outline: s.outlineStyle !== 'none' && parseFloat(s.outlineWidth) > 0,
          };
        });
        if (!info) break;
        count++;
        if (!info.visible) problems.push(`hidden: ${info.label}`);
        if (!info.outline) problems.push(`no outline: ${info.label}`);
      }
      expect(count).toBeGreaterThan(10);
      expect(problems).toEqual([]);
    });
  }

  test('TC-41: rapid language toggling ends in a consistent state', async ({ page }) => {
    const errors = trackErrors(page);
    await page.goto('./');
    for (let i = 0; i < 20; i++) await switchTo(page, i % 2 ? 'pt' : 'en');
    await switchTo(page, 'en');
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.locator('.lang-switch [aria-pressed="true"]')).toHaveText('EN');
    await expect(page.locator('h1')).toHaveText('Your software cleared before it ships.');
    expect(errors).toEqual([]);
  });

  test('TC-42: breakpoints apply at 1020px and 680px inclusive', async ({ page }) => {
    const nav = page.getByRole('navigation', { name: 'Main' });
    await page.setViewportSize({ width: 1021, height: 800 });
    await page.goto('./');
    await expect(nav).toBeVisible();
    await page.setViewportSize({ width: 1020, height: 800 });
    await expect(nav).toBeHidden();
    await page.setViewportSize({ width: 681, height: 800 });
    await expect(page.locator('#serviços .sec-side')).toBeVisible();
    await page.setViewportSize({ width: 680, height: 800 });
    await expect(page.locator('#serviços .sec-side')).toBeHidden();
  });
});
