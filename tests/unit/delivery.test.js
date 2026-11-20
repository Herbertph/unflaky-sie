import { existsSync, readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import viteConfig from '../../vite.config.js';

const read = (path) => readFileSync(new URL(`../../${path}`, import.meta.url), 'utf8');

describe('delivery (source checks)', () => {
  it('TC-10 (AC-9): marks every 10/11 occurrence with PENDING-HERBERT', () => {
    const lines = read('index.html').split('\n');
    const occurrences = lines
      .map((line, i) => [line, i])
      .filter(([line]) => /<span class="stat-num">1[01]<\/span>|<strong>10<\/strong>|data-i18n="lead\.desc"/.test(line));
    expect(occurrences).toHaveLength(4);
    for (const [line, i] of occurrences) expect(lines[i - 1], line.trim()).toContain('PENDING-HERBERT');

    expect(read('src/i18n.js')).toMatch(/PENDING-HERBERT.*stat\.3.*stat\.4.*lead\.desc.*lead\.c3/);
    const publishing = read('CLAUDE.md').split('## Before publishing')[1];
    expect(publishing).toBeDefined();
    expect(publishing).toMatch(/PENDING-HERBERT.*10.*11/s);
  });

  it('TC-38 (AC-33): CI checks PRs and there is no Pages deploy workflow', () => {
    const ci = read('.github/workflows/ci.yml');
    expect(ci).toMatch(/pull_request/);
    expect(ci).toMatch(/npm run build/);
    expect(ci).toMatch(/npm test/);
    expect(ci).toMatch(/npm run test:e2e/);

    expect(existsSync(new URL('../../.github/workflows/deploy.yml', import.meta.url))).toBe(false);
    expect(viteConfig.base).toBe('/');
  });
});
