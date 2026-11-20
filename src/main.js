import { applyLanguage, currentLanguage, detectLanguage } from './lang.js';
import { initSuite } from './suite.js';

applyLanguage(document, detectLanguage(navigator.language));

document.querySelectorAll('[data-lang]').forEach((button) => {
  button.addEventListener('click', () => {
    if (button.dataset.lang !== currentLanguage(document)) applyLanguage(document, button.dataset.lang);
  });
});

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
initSuite(document.querySelector('.report'), { reducedMotion });
