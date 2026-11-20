# Test report: unflaky-homepage

- Mode: full test run
- Branch: `feature/unflaky-homepage`, commit `3317fe1` (tests added on top)
- Spec: `docs/specs/unflaky-homepage.md` · Test cases: `docs/test-cases/unflaky-homepage.md`
- Date: 2026-11-20

## Verdict: PASS

All 33 acceptance criteria have at least one passing test case. No critical or major issue is open. One minor issue (#1) was filed from the code review.

## Counts

| Suite | Result |
|---|---|
| Unit (Vitest), incl. new `tests/unit/delivery.test.js` | 20/20 pass |
| E2E (Playwright, Chromium) — 43 new + 4 existing smoke | 47/47 pass |
| Stability: timing, navigation and keyboard tests `--repeat-each=5` | 70/70 pass |
| Build (`npm run build`) | pass |

Test cases: 42 (TC-1…TC-42), all Pass. Flaky tests: none observed.

## Traceability

| AC | TC | Result |
|---|---|---|
| AC-1 | TC-1 | Pass |
| AC-2 | TC-2 | Pass |
| AC-3 | TC-3 | Pass |
| AC-4 | TC-4 | Pass |
| AC-5 | TC-5 | Pass |
| AC-6 | TC-6, TC-7 | Pass |
| AC-7 | TC-8 | Pass |
| AC-8 | TC-9 | Pass |
| AC-9 | TC-10 | Pass |
| AC-10 | TC-11 | Pass |
| AC-11 | TC-12 | Pass |
| AC-12 | TC-13, TC-14 | Pass |
| AC-13 | TC-15 | Pass |
| AC-14 | TC-16 | Pass |
| AC-15 | TC-17 | Pass |
| AC-16 | TC-18 | Pass |
| AC-17 | TC-19 | Pass |
| AC-18 | TC-20 | Pass |
| AC-19 | TC-21 | Pass |
| AC-20 | TC-22 | Pass |
| AC-21 | TC-23 | Pass |
| AC-22 | TC-24, TC-25 | Pass |
| AC-23 | TC-26 | Pass |
| AC-24 | TC-27 | Pass |
| AC-25 | TC-28 | Pass |
| AC-26 | TC-29, TC-30 | Pass |
| AC-27 | TC-31 | Pass |
| AC-28 | TC-32 | Pass |
| AC-29 | TC-33 | Pass |
| AC-30 | TC-34, TC-35 | Pass |
| AC-31 | TC-36 | Pass |
| AC-32 | TC-37 | Pass |
| AC-33 | TC-38 | Pass (static; real CI run happens on the PR, Pages deploy after merge) |
| Exploratory | TC-39 – TC-42 | Pass |

## Exploratory session

- Widths 360, 800, 1400 px (PT and EN): no horizontal scroll (TC-35).
- Keyboard only: Tab reaches the language buttons, the CTAs, the run button and the FAQ summaries; Enter/Space operate them; every focused control shows the gold outline; at 390 px focus never lands on a hidden control (TC-39, TC-40).
- Rapid language toggling (20 clicks) and switching mid-run: consistent state, no console errors (TC-25, TC-41).
- Breakpoints are inclusive at exactly 1020 px and 680 px (TC-42).

## Issues

| Issue | Severity | Title |
|---|---|---|
| #1 | minor | CI failure artifact is always empty because no HTML Playwright report is generated |

## Code review notes (suggestions, not issues)

- Security: `applyLanguage` uses `innerHTML` only for `data-i18n-html` keys from our own `DICT`; there is no user input anywhere. External links all use `rel="noopener noreferrer"`. No concerns.
- Accessibility: the run result changes badge text silently; an `aria-live="polite"` region on the report (or button) would announce the verdict to screen readers.
- `aria-label` values `Main`, `Language`, `Footer` are English in both languages. They are not visible text, but they are not in the copy file either; worth listing under "Assumptions to confirm" in the PR.
- `src/suite.js` schedules timers per click without cancelling; safe today because the button is disabled while running (TC-26).

## Spec issues

None blocking. Not covered by automation: visual fidelity to prototype v5 (fonts, glow, icon drawings) — needs Herbert's visual review.

## Retest 2026-11-20: #3 (branch `feature/vercel-hosting`, commit `f3d7986`)

| Issue | Result |
|---|---|
| #3 (critical): Production site on Vercel loads without CSS/JS | Fixed locally; production verification pending merge |

- `e2e/delivery.spec.js` › `AC-34 …` (TC-43): Pass on the local build served at `/`.
- Full suite: unit 20/20, e2e 48/48, build ok. No regressions.
- Against https://unflaky-sie.vercel.app/ AC-34 still fails, as expected: production serves the old `main` (`50475c4`, assets under `/unflaky-sie/`). The branch is not pushed, so there is no Vercel preview. Run TC-43 against production right after merge.
- TC-38 updated: Pages deploy workflow removed, base `/`.
