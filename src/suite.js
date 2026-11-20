import { DICT } from './i18n.js';
import { currentLanguage } from './lang.js';

const ROWS = 5;
const FIRST_DELAY = 260;
const STEP_DELAY = 340;

export function buildSchedule({ reducedMotion }) {
  return Array.from({ length: ROWS }, (_, row) => ({
    row,
    delay: reducedMotion ? 0 : FIRST_DELAY + row * STEP_DELAY,
  }));
}

// The button's data-i18n key tracks its state, so a language switch relabels it.
function label(button, key) {
  button.dataset.i18n = key;
  button.textContent = DICT[currentLanguage(button.ownerDocument)][key];
}

export function initSuite(report, { reducedMotion }) {
  const button = report.querySelector('.report-run');
  const badges = [...report.querySelectorAll('.badge')];
  const results = badges.map((b) => b.dataset.result);

  button.addEventListener('click', () => {
    if (button.disabled) return;
    button.disabled = true;
    label(button, 'report.running');
    badges.forEach((b) => {
      b.className = 'badge badge-wait';
      b.textContent = '···';
    });
    const schedule = buildSchedule({ reducedMotion: reducedMotion() });
    schedule.forEach(({ row, delay }, i) => {
      const resolve = () => {
        const result = results[row];
        badges[row].className = `badge badge-${result.toLowerCase()}`;
        badges[row].textContent = result;
        if (i === schedule.length - 1) {
          button.disabled = false;
          label(button, 'report.rerun');
        }
      };
      if (delay === 0) resolve();
      else setTimeout(resolve, delay);
    });
  });
}
