import { DICT } from './i18n.js';

export function detectLanguage(navigatorLanguage) {
  const value = String(navigatorLanguage ?? '').toLowerCase();
  return value.startsWith('en') ? 'en' : 'pt';
}

export function currentLanguage(doc) {
  return doc.documentElement.lang === 'en' ? 'en' : 'pt';
}

export function applyLanguage(doc, lang) {
  const dict = DICT[lang];
  doc.documentElement.lang = lang === 'en' ? 'en' : 'pt-BR';
  doc.title = dict.title;
  doc.querySelectorAll('[data-i18n]').forEach((el) => {
    el.textContent = dict[el.dataset.i18n];
  });
  // Only our own dictionary values (with <em>) are rendered as HTML, never user input.
  doc.querySelectorAll('[data-i18n-html]').forEach((el) => {
    el.innerHTML = dict[el.dataset.i18nHtml];
  });
  doc.querySelectorAll('[data-i18n-alt]').forEach((el) => {
    el.alt = dict[el.dataset.i18nAlt];
  });
  doc.querySelectorAll('[data-i18n-step]').forEach((el) => {
    el.textContent = `${dict['method.steps']} ${el.dataset.i18nStep}`;
  });
  doc.querySelectorAll('[data-lang]').forEach((el) => {
    el.setAttribute('aria-pressed', String(el.dataset.lang === lang));
  });
}
