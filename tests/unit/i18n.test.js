import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { DICT } from '../../src/i18n.js';

// Parses the dictionary tables of the copy file: | `key` | PT | EN |
function parseCopy() {
  const md = readFileSync(new URL('../../docs/specs/unflaky-homepage-copy.md', import.meta.url), 'utf8');
  const section = md.split('## 1. Dictionary keys')[1].split('## 2.')[0];
  const clean = (cell) =>
    cell
      .replace(/\*\*\(A[^)]*\)\*\*/g, '')
      .replace(/`/g, '')
      .replace(/\\\*/g, '*')
      .trim();
  const copy = { pt: {}, en: {} };
  for (const line of section.split(/\r?\n/)) {
    const m = line.match(/^\| `([^`]+)`[^|]*\| (.*) \| (.*) \|$/);
    if (!m) continue;
    copy.pt[m[1]] = clean(m[2]);
    copy.en[m[1]] = clean(m[3]);
  }
  return copy;
}

describe('dictionary', () => {
  const copy = parseCopy();

  it('has the same keys in PT and EN', () => {
    expect(Object.keys(DICT.en).sort()).toEqual(Object.keys(DICT.pt).sort());
  });

  it('has no empty values', () => {
    for (const lang of ['pt', 'en']) {
      for (const [key, value] of Object.entries(DICT[lang])) {
        expect(value.trim(), `${lang}.${key}`).not.toBe('');
      }
    }
  });

  it('has exactly the keys of the copy file', () => {
    expect(Object.keys(copy.pt).length).toBeGreaterThan(100);
    expect(Object.keys(DICT.pt).sort()).toEqual(Object.keys(copy.pt).sort());
  });

  it.each(['pt', 'en'])('matches the copy file literally (%s)', (lang) => {
    for (const key of Object.keys(copy[lang])) {
      expect(DICT[lang][key], `${lang}.${key}`).toBe(copy[lang][key]);
    }
  });

  it('only uses <em> as markup', () => {
    for (const lang of ['pt', 'en']) {
      for (const value of Object.values(DICT[lang])) {
        expect(value.replace(/<\/?em>/g, '')).not.toMatch(/[<>]/);
      }
    }
  });
});
