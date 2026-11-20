// @vitest-environment jsdom
import { describe, expect, it } from 'vitest';
import { applyLanguage, detectLanguage } from '../../src/lang.js';
import { DICT } from '../../src/i18n.js';

describe('detectLanguage', () => {
  it.each([
    ['en-US', 'en'],
    ['en', 'en'],
    ['EN-gb', 'en'],
    ['pt-BR', 'pt'],
    ['pt', 'pt'],
    ['fr-FR', 'pt'],
    ['', 'pt'],
    [undefined, 'pt'],
    [null, 'pt'],
  ])('maps %s to %s', (input, expected) => {
    expect(detectLanguage(input)).toBe(expected);
  });
});

describe('applyLanguage', () => {
  function setup() {
    document.documentElement.innerHTML = `<head><title></title></head><body>
      <p data-i18n="nav.cta"></p>
      <h1 data-i18n-html="hero.h1"></h1>
      <img data-i18n-alt="lead.alt">
      <span data-i18n-step="2"></span>
      <button data-lang="pt" aria-pressed="false">PT</button>
      <button data-lang="en" aria-pressed="false">EN</button></body>`;
    return document;
  }

  it('swaps texts, lang, title, alt, step labels and pressed state', () => {
    const doc = setup();
    applyLanguage(doc, 'en');
    expect(doc.documentElement.lang).toBe('en');
    expect(doc.title).toBe(DICT.en.title);
    expect(doc.querySelector('[data-i18n]').textContent).toBe('Book a diagnostic');
    expect(doc.querySelector('h1 em').textContent).toBe('cleared');
    expect(doc.querySelector('img').alt).toBe('Portrait of Herbert Parasio');
    expect(doc.querySelector('[data-i18n-step]').textContent).toBe('STEP 2');
    expect(doc.querySelector('[data-lang="en"]').getAttribute('aria-pressed')).toBe('true');
    expect(doc.querySelector('[data-lang="pt"]').getAttribute('aria-pressed')).toBe('false');

    applyLanguage(doc, 'pt');
    expect(doc.documentElement.lang).toBe('pt-BR');
    expect(doc.querySelector('[data-i18n-step]').textContent).toBe('ETAPA 2');
    expect(doc.querySelector('h1 em').textContent).toBe('aprovado');
  });
});
