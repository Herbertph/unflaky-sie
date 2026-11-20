# unflaky-sie

Especificaçao do site Unflaky no drive: https://drive.google.com/drive/folders/1HJlnzWD0rh4OiUu2eyqFWQdmzM23cT3a

Built with a multi-agent pipeline: requirements analyst → developer → tester → pull request. A human reviews and merges every PR.

## Stack

- Vite + vanilla JavaScript (ES modules), plain CSS. No framework.
- Vitest + jsdom for unit tests, Playwright (Chromium) for end-to-end tests.
- GitHub Actions: `ci.yml` (build, unit, e2e on PRs and `main`), `deploy.yml` (GitHub Pages on push to `main`).
- Vite `base` is `/unflaky-sie/` (served at https://herbertph.github.io/unflaky-sie/).

## Commands

- Install: `npm ci` then `npx playwright install chromium`
- Dev server: `npm run dev`
- Build: `npm run build` (output in `dist/`)
- Preview build: `npm run preview` (port 4173)
- Unit tests: `npm test`
- End-to-end tests: `npm run test:e2e` (builds and serves on port 4173; never use port 4545)

## Structure

- `index.html`: all markup. Translatable nodes use `data-i18n` (text), `data-i18n-html` (keys with `<em>`),
  `data-i18n-alt` (img alt) and `data-i18n-step` (Method step labels).
- `src/i18n.js`: `DICT` with every PT/EN text from `docs/specs/unflaky-homepage-copy.md` (single source of truth).
- `src/lang.js`: `detectLanguage`, `applyLanguage`, `currentLanguage`.
- `src/suite.js`: `buildSchedule` (pure) and the "Run the suite" DOM runner.
- `src/main.js`: wiring. `src/styles.css`: tokens, layout, breakpoints (1020px, 680px).
- `public/assets/herbert-hero.jpg`: photo (currently a neutral placeholder).
- `tests/unit/`: Vitest tests (`i18n.test.js` checks the dictionary against the copy file). `e2e/`: Playwright tests.
- `docs/specs/`: feature specs written by the requirements analyst
- `docs/test-cases/`: test cases (TC-n, with steps and expected results) written by the tester
- `docs/test-reports/`: test reports written by the tester
- Bugs found in testing are filed as GitHub issues labeled `bug` and `severity: *`. Fix commits reference the issue (`fix: ... (#12)`), and PRs close them with `Fixes #12`.

## Before publishing

- PENDING-HERBERT: numbers 10 (jurisdictions) and 11 (testers) in the stats, `lead.desc` and the leadership chip need
  Herbert's confirmation. Search the source for `PENDING-HERBERT`.
- Replace `public/assets/herbert-hero.jpg` (placeholder) with Herbert's real photo; no other change is needed.
- Enable GitHub Pages with source "GitHub Actions" in the repository settings.

## Conventions

- Everything in the repository is written in English: code, comments, docs, commit messages, PR descriptions.
- Keep business logic in pure, testable functions, separate from UI code.
- Never render user input as HTML.
- Prefer accessible markup (labels, roles, `aria-*`). End-to-end tests locate elements with `getByRole`, `getByLabel` and `getByText` where possible.
- Name tests after behavior. Acceptance tests start with their criterion ID, for example `AC-2: rejects a blank title`.
- Commits follow Conventional Commits: `feat:`, `fix:`, `test:`, `docs:`, `refactor:`, `chore:`.
- Feature branches are named `feature/<slug>`, or keep the branch Claude Code created for a worktree session. Never commit to `main`.

## Definition of done

- Every acceptance criterion in the spec is covered by at least one test.
- Build, unit tests and end-to-end tests all pass.
- No unrelated changes in the diff.
