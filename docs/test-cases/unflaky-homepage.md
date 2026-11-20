# Test cases: unflaky-homepage

Spec: [`docs/specs/unflaky-homepage.md`](../specs/unflaky-homepage.md). Copy: [`unflaky-homepage-copy.md`](../specs/unflaky-homepage-copy.md).
E2E tests live in `e2e/homepage.spec.js` (Chromium, port 4173). Static/source checks live in `tests/unit/delivery.test.js`.
Viewports: desktop 1280×800, tablet 900×1000, mobile 390×844; extra exploratory widths 360, 800 and 1400.

## Traceability

| AC | Test cases |
|---|---|
| AC-1 | TC-1 |
| AC-2 | TC-2 |
| AC-3 | TC-3 |
| AC-4 | TC-4 |
| AC-5 | TC-5 |
| AC-6 | TC-6, TC-7 |
| AC-7 | TC-8 |
| AC-8 | TC-9 |
| AC-9 | TC-10 |
| AC-10 | TC-11 |
| AC-11 | TC-12 |
| AC-12 | TC-13, TC-14 |
| AC-13 | TC-15 |
| AC-14 | TC-16 |
| AC-15 | TC-17 |
| AC-16 | TC-18 |
| AC-17 | TC-19 |
| AC-18 | TC-20 |
| AC-19 | TC-21 |
| AC-20 | TC-22 |
| AC-21 | TC-23 |
| AC-22 | TC-24, TC-25 |
| AC-23 | TC-26 |
| AC-24 | TC-27 |
| AC-25 | TC-28 |
| AC-26 | TC-29, TC-30 |
| AC-27 | TC-31 |
| AC-28 | TC-32 |
| AC-29 | TC-33 |
| AC-30 | TC-34, TC-35 |
| AC-31 | TC-36 |
| AC-32 | TC-37 |
| AC-33 | TC-38 |
| AC-34 | TC-43 |
| Exploratory (FR-23/24, a11y) | TC-39, TC-40, TC-41, TC-42 |

Common precondition for every e2e case: production build served by `vite preview` on port 4173 at `/unflaky-sie/`,
browser locale `pt-BR` unless stated, viewport 1280×800 unless stated.

## Identity and structure

### TC-1: design tokens have the exact FR-1 values
- **Acceptance criterion:** AC-1
- **Priority:** medium
- **Type:** functional
- **Preconditions:** page loaded
- **Test data:** the 18 tokens of FR-1
- **Steps:**
  1. For each token, resolve `var(--token)` as a color on a probe element.
  2. Compare it with the FR-1 literal resolved the same way (minifier-proof comparison).
- **Expected result:** every token resolves to the FR-1 color.
- **Automated by:** `e2e/homepage.spec.js` › `TC-1 (AC-1): root tokens match FR-1`
- **Status:** Pass

### TC-2: sections in FR-3 order with numbered headers 01–06
- **Acceptance criterion:** AC-2
- **Priority:** high
- **Type:** functional
- **Preconditions:** page loaded in PT
- **Test data:** —
- **Steps:**
  1. Locate strip, header, hero, panel, stats, positioning, `#serviços`, `#padrão`, `#foco`, `#método`, `#liderança`, `#faq`, `#contato`, footer.
  2. Check their document order; read `.sec-num` and the `h2` of each numbered section.
- **Expected result:** FR-3 order; numbers `01`–`06` with titles `svc.h`, `std.h`, `focus.h`, `method.h`, `lead.h`, `faq.h`.
- **Automated by:** `e2e/homepage.spec.js` › `TC-2 (AC-2): sections follow FR-3 order with headers 01-06`
- **Status:** Pass

### TC-3: header shows shield, UNFLAKY and only Quality Lab
- **Acceptance criterion:** AC-3
- **Priority:** medium
- **Type:** functional
- **Preconditions:** page loaded
- **Test data:** PT and EN
- **Steps:**
  1. Read the header SVG paths and the header text in PT.
  2. Switch to EN and read the header text again.
- **Expected result:** shield and check paths from FR-2; text contains `UNFLAKY` and `Quality Lab`; never "QA for SaaS" / "QA para SaaS".
- **Automated by:** `e2e/homepage.spec.js` › `TC-3 (AC-3): header shows the shield, UNFLAKY and only Quality Lab`
- **Status:** Pass

### TC-4: SVG data-URI favicon with the shield path
- **Acceptance criterion:** AC-4
- **Priority:** low
- **Type:** functional
- **Preconditions:** page loaded
- **Test data:** —
- **Steps:**
  1. Read `link[rel=icon]` href and decode it.
- **Expected result:** starts with `data:image/svg+xml`, contains the FR-2 shield path and the `#0B0A08` square.
- **Automated by:** `e2e/homepage.spec.js` › `TC-4 (AC-4): favicon is an SVG data URI with the shield`
- **Status:** Pass

### TC-5: nav links point to existing anchors
- **Acceptance criterion:** AC-5
- **Priority:** medium
- **Type:** functional
- **Preconditions:** desktop viewport
- **Test data:** —
- **Steps:**
  1. Read the 5 `href`s of the main nav.
  2. For each, check the target id exists.
- **Expected result:** `#serviços`, `#padrão`, `#foco`, `#método`, `#faq`, all present.
- **Automated by:** `e2e/homepage.spec.js` › `TC-5 (AC-5): nav links point to existing section anchors`
- **Status:** Pass

## Copy

### TC-6: every dictionary node renders its value (PT and EN)
- **Acceptance criterion:** AC-6
- **Priority:** high
- **Type:** functional
- **Preconditions:** page loaded (the dictionary itself is checked against the copy file by `tests/unit/i18n.test.js`)
- **Test data:** `DICT.pt`, `DICT.en`
- **Steps:**
  1. In PT, compare each `[data-i18n]` text and each `[data-i18n-html]` inner HTML with the dictionary value.
  2. Switch to EN and repeat.
- **Expected result:** all equal; `<em>` keys render a real `em` element.
- **Automated by:** `e2e/homepage.spec.js` › `TC-6 (AC-6): every dictionary node renders the PT and EN value`
- **Status:** Pass

### TC-7: every rendered dictionary key is used on the page
- **Acceptance criterion:** AC-6
- **Priority:** medium
- **Type:** negative
- **Preconditions:** page loaded
- **Test data:** all `DICT.pt` keys
- **Steps:**
  1. Collect the keys referenced by the DOM (plus `title`, `lead.alt`, `method.steps`, `report.rerun`, `report.running`).
  2. Compare with the dictionary keys.
- **Expected result:** no dictionary key is missing from the page (no copy silently dropped).
- **Automated by:** `e2e/homepage.spec.js` › `TC-7 (AC-6): no dictionary key is left off the page`
- **Status:** Pass

### TC-8: fixed texts, stat numbers and badges
- **Acceptance criterion:** AC-7
- **Priority:** high
- **Type:** functional
- **Preconditions:** page loaded
- **Test data:** copy file section 2
- **Steps:**
  1. In PT and in EN, look up each fixed text; read the stat numbers and badges.
- **Expected result:** all fixed texts present; stats `95%`, `98%`, `10`, `11`; badges `FAIL, FAIL, FAIL, PASS, PASS`.
- **Automated by:** `e2e/homepage.spec.js` › `TC-8 (AC-7): fixed texts, stats and badges are unchanged in PT and EN`
- **Status:** Pass

### TC-9: no form, inputs, iframe or prices
- **Acceptance criterion:** AC-8
- **Priority:** high
- **Type:** negative
- **Preconditions:** page loaded
- **Test data:** regex `(R\$|US\$|\$|€|£)\s?\d`
- **Steps:**
  1. Count `form, input, textarea, select, iframe` in PT and EN.
  2. Scan the body text for currency amounts.
- **Expected result:** zero elements, no currency amounts.
- **Automated by:** `e2e/homepage.spec.js` › `TC-9 (AC-8): no form, input, iframe or price in either language`
- **Status:** Pass

### TC-10: PENDING-HERBERT markers and Before publishing note
- **Acceptance criterion:** AC-9
- **Priority:** medium
- **Type:** functional
- **Preconditions:** source checkout
- **Test data:** `index.html`, `src/i18n.js`, `CLAUDE.md`
- **Steps:**
  1. For each `stat-num` 10/11 and the `<strong>10</strong>` chip, check a `PENDING-HERBERT` comment directly above.
  2. Check `lead.desc` and `src/i18n.js` are marked; check `CLAUDE.md` "Before publishing" lists the decision.
- **Expected result:** every occurrence marked; note present.
- **Automated by:** `tests/unit/delivery.test.js` › `TC-10 (AC-9): marks every 10/11 occurrence with PENDING-HERBERT`
- **Status:** Pass

## Language

### TC-11: en-US browser loads English
- **Acceptance criterion:** AC-10
- **Priority:** high
- **Type:** functional
- **Preconditions:** locale `en-US`
- **Steps:** 1. Load the page.
- **Expected result:** `lang="en"`, title `Unflaky — Quality Lab · QA for SaaS`, EN `aria-pressed="true"`, PT `false`, h1 EN text.
- **Automated by:** `e2e/homepage.spec.js` › `TC-11 (AC-10): en-US browser loads in English`
- **Status:** Pass

### TC-12: pt-BR browser loads Portuguese
- **Acceptance criterion:** AC-11
- **Priority:** high
- **Type:** functional
- **Preconditions:** locale `pt-BR`
- **Steps:** 1. Load the page.
- **Expected result:** `lang="pt-BR"`, PT title, PT pressed.
- **Automated by:** `e2e/homepage.spec.js` › `TC-12 (AC-11): pt-BR browser loads in Portuguese`
- **Status:** Pass

### TC-13: unsupported language falls back to Portuguese
- **Acceptance criterion:** AC-12
- **Priority:** medium
- **Type:** negative
- **Preconditions:** locale `fr-FR`
- **Steps:** 1. Load the page.
- **Expected result:** PT page, `lang="pt-BR"`.
- **Automated by:** `e2e/homepage.spec.js` › `TC-13 (AC-12): fr-FR browser falls back to Portuguese`
- **Status:** Pass

### TC-14: empty navigator.language falls back to Portuguese
- **Acceptance criterion:** AC-12
- **Priority:** medium
- **Type:** boundary
- **Preconditions:** `navigator.language` overridden to `''` before load
- **Steps:** 1. Load the page.
- **Expected result:** PT page, `lang="pt-BR"`.
- **Automated by:** `e2e/homepage.spec.js` › `TC-14 (AC-12): empty browser language falls back to Portuguese`
- **Status:** Pass

### TC-15: switching PT → EN → PT without reload
- **Acceptance criterion:** AC-13
- **Priority:** high
- **Type:** functional
- **Preconditions:** PT page; a marker set on `window` to detect reloads
- **Steps:**
  1. Click EN; check lang, title, alt, `STEP 1`–`STEP 4`, meta description.
  2. Click PT; check `ETAPA 1`–`ETAPA 4` and PT values.
- **Expected result:** all switch, marker survives (no reload), meta description stays the PT text.
- **Automated by:** `e2e/homepage.spec.js` › `TC-15 (AC-13): switches PT to EN and back without reloading`
- **Status:** Pass

### TC-16: clicking the active language does nothing
- **Acceptance criterion:** AC-14
- **Priority:** low
- **Type:** negative
- **Preconditions:** PT page
- **Steps:** 1. Snapshot body HTML. 2. Click PT twice. 3. Snapshot again.
- **Expected result:** identical HTML, PT still pressed, no console error.
- **Automated by:** `e2e/homepage.spec.js` › `TC-16 (AC-14): clicking the active language changes nothing`
- **Status:** Pass

## FAQ

### TC-17: 5 FAQ items, all closed on load
- **Acceptance criterion:** AC-15
- **Priority:** medium
- **Type:** functional
- **Steps:** 1. Load. 2. Count `#faq details` and open ones.
- **Expected result:** 5 items, 0 open.
- **Automated by:** `e2e/homepage.spec.js` › `TC-17 (AC-15): five FAQ items, none open`
- **Status:** Pass

### TC-18: items open and close independently
- **Acceptance criterion:** AC-16
- **Priority:** medium
- **Type:** functional
- **Steps:** 1. Open 1. 2. Open 3. 3. Click 1 again.
- **Expected result:** after step 2 both open; after step 3 item 1 closed, item 3 open; answers visible only when open.
- **Automated by:** `e2e/homepage.spec.js` › `TC-18 (AC-16): FAQ items open and close independently`
- **Status:** Pass

## Run the suite

### TC-19: idle report
- **Acceptance criterion:** AC-17
- **Priority:** medium
- **Type:** functional
- **Steps:** 1. Load in PT, then EN.
- **Expected result:** button `Rodar a suíte` / `Run the suite`, enabled.
- **Automated by:** `e2e/homepage.spec.js` › `TC-19 (AC-17): idle button is enabled with the run label`
- **Status:** Pass

### TC-20: running state right after click
- **Acceptance criterion:** AC-18
- **Priority:** high
- **Type:** functional
- **Steps:** 1. Click the button and read state in the same task.
- **Expected result:** disabled, `Rodando…`, 5 badges `···` with the waiting class.
- **Automated by:** `e2e/homepage.spec.js` › `TC-20 (AC-18): click disables the button and shows waiting badges`
- **Status:** Pass

### TC-21: badges resolve in order and on schedule with colors
- **Acceptance criterion:** AC-19
- **Priority:** high
- **Type:** functional
- **Steps:** 1. Record badge change timestamps with a MutationObserver. 2. Click. 3. Wait for end.
- **Expected result:** rows resolve 0→4 at ~260, 600, 940, 1280, 1620 ms (±150 ms); colors match `--fail`/`--pass`; button `Rodar de novo`, enabled.
- **Automated by:** `e2e/homepage.spec.js` › `TC-21 (AC-19): badges resolve in row order on the 260/340ms schedule`
- **Status:** Pass

### TC-22: re-run repeats the cycle
- **Acceptance criterion:** AC-20
- **Priority:** medium
- **Type:** functional
- **Steps:** 1. Run to the end. 2. Click `Rodar de novo`.
- **Expected result:** waiting state again, then same final state.
- **Automated by:** `e2e/homepage.spec.js` › `TC-22 (AC-20): running again repeats the cycle`
- **Status:** Pass

### TC-23: reduced motion resolves immediately
- **Acceptance criterion:** AC-21
- **Priority:** medium
- **Type:** functional
- **Preconditions:** `prefers-reduced-motion: reduce`
- **Steps:** 1. Click and read state synchronously.
- **Expected result:** final badges and `Rodar de novo`, enabled, in the same task.
- **Automated by:** `e2e/homepage.spec.js` › `TC-23 (AC-21): reduced motion shows the final state at once`
- **Status:** Pass

### TC-24: language switch after a run
- **Acceptance criterion:** AC-22
- **Priority:** medium
- **Type:** functional
- **Steps:** 1. Run to end in PT. 2. Click EN.
- **Expected result:** button `Run it again`.
- **Automated by:** `e2e/homepage.spec.js` › `TC-24 (AC-22): finished run relabels to Run it again in EN`
- **Status:** Pass

### TC-25: language switch mid-run
- **Acceptance criterion:** AC-22 (FR-21.6)
- **Priority:** low
- **Type:** boundary
- **Steps:** 1. Click run in PT. 2. Immediately click EN. 3. Wait for end.
- **Expected result:** `Running…` while running, then `Run it again`.
- **Automated by:** `e2e/homepage.spec.js` › `TC-25 (AC-22): switching mid-run shows Running then Run it again in EN`
- **Status:** Pass

### TC-26: clicks during a run do not start a second run
- **Acceptance criterion:** AC-23
- **Priority:** medium
- **Type:** negative
- **Steps:** 1. Click. 2. Dispatch 3 more clicks while disabled. 3. Count badge resolutions.
- **Expected result:** exactly 5 resolutions, in order 0–4.
- **Automated by:** `e2e/homepage.spec.js` › `TC-26 (AC-23): repeated clicks during a run start no second run`
- **Status:** Pass

## Navigation and links

### TC-27: CTAs scroll to in-page anchors
- **Acceptance criterion:** AC-24
- **Priority:** high
- **Type:** functional
- **Steps:** 1. Click header CTA, hero CTA 1, hero CTA 2 (reloading between).
- **Expected result:** `#contato` / `#padrão` in viewport, same document (no navigation).
- **Automated by:** `e2e/homepage.spec.js` › `TC-27 (AC-24): CTAs scroll to #contato and #padrão in place`
- **Status:** Pass

### TC-28: external links exact and in a new tab
- **Acceptance criterion:** AC-25
- **Priority:** high
- **Type:** security
- **Steps:** 1. Read `href`, `target`, `rel` of the 3 contact and 3 footer links. 2. Check no other link leaves the page.
- **Expected result:** copy-file URLs, `_blank`, `rel` with `noopener`.
- **Automated by:** `e2e/homepage.spec.js` › `TC-28 (AC-25): contact and footer links are exact and open safely in a new tab`
- **Status:** Pass

## Leadership and photo

### TC-29: single circular photo, 200×200 desktop with alt per language
- **Acceptance criterion:** AC-26
- **Priority:** medium
- **Type:** functional
- **Steps:** 1. Count imgs. 2. Read box, radius, alt in PT and EN. 3. Search the HTML for `herbert-story`.
- **Expected result:** one img in `#liderança`, src ends `assets/herbert-hero.jpg`, 200×200, radius 50%, alt `lead.alt`, no `herbert-story.jpg`.
- **Automated by:** `e2e/homepage.spec.js` › `TC-29 (AC-26): one circular 200px photo with translated alt`
- **Status:** Pass

### TC-30: photo is 120×120 at 390px
- **Acceptance criterion:** AC-26
- **Priority:** medium
- **Type:** boundary
- **Preconditions:** 390×844
- **Expected result:** 120×120.
- **Automated by:** `e2e/homepage.spec.js` › `TC-30 (AC-26): photo is 120px at 390px`
- **Status:** Pass

### TC-31: placeholder loads with HTTP 200
- **Acceptance criterion:** AC-27
- **Priority:** medium
- **Type:** functional
- **Expected result:** HTTP 200, `naturalWidth` > 0.
- **Automated by:** `e2e/homepage.spec.js` › `TC-31 (AC-27): photo placeholder loads with HTTP 200`
- **Status:** Pass

## Responsive

### TC-32: 900px layout
- **Acceptance criterion:** AC-28
- **Priority:** high
- **Type:** functional
- **Preconditions:** 900×1000
- **Expected result:** nav hidden; panel below hero text; report below focus text; steps 2×2 with no top border on steps 1–2; principles stacked.
- **Automated by:** `e2e/homepage.spec.js` › `TC-32 (AC-28): 900px layout`
- **Status:** Pass

### TC-33: 390px layout
- **Acceptance criterion:** AC-29
- **Priority:** high
- **Type:** functional
- **Preconditions:** 390×844
- **Expected result:** header CTA, strip right and side labels hidden; stats 2×2; cards and steps one column.
- **Automated by:** `e2e/homepage.spec.js` › `TC-33 (AC-29): 390px layout`
- **Status:** Pass

### TC-34: no overflow at 390px (PT and EN)
- **Acceptance criterion:** AC-30
- **Priority:** high
- **Type:** boundary
- **Steps:** 1. At 390px in PT and EN, compare `scrollWidth`/`clientWidth`. 2. Check every element in strip, hero, panel, stats, report and leadership card stays within the viewport.
- **Expected result:** no horizontal scroll, no overflowing element.
- **Automated by:** `e2e/homepage.spec.js` › `TC-34 (AC-30): no overflow at 390px in PT and EN`
- **Status:** Pass

### TC-35: no horizontal scroll at 360, 800 and 1400px
- **Acceptance criterion:** AC-30 (exploratory widths requested by Front-End Dev)
- **Priority:** medium
- **Type:** boundary
- **Expected result:** `scrollWidth <= clientWidth` in PT and EN at each width.
- **Automated by:** `e2e/homepage.spec.js` › `TC-35 (AC-30): no horizontal scroll at 360, 800 and 1400px`
- **Status:** Pass

### TC-36: 1280px two-column hero and 1200px wrap
- **Acceptance criterion:** AC-31
- **Priority:** medium
- **Type:** functional
- **Expected result:** panel to the right of hero text; `.wrap` max-width `1200px`.
- **Automated by:** `e2e/homepage.spec.js` › `TC-36 (AC-31): 1280px hero has two columns and wrap is 1200px`
- **Status:** Pass

## Quality and delivery

### TC-37: no console errors in the main flow
- **Acceptance criterion:** AC-32
- **Priority:** high
- **Type:** functional
- **Steps:** 1. Load. 2. Switch to EN and back. 3. Run the suite to the end.
- **Expected result:** no console error or page error.
- **Automated by:** `e2e/homepage.spec.js` › `TC-37 (AC-32): no console errors while switching language and running the suite`
- **Status:** Pass

### TC-38: CI workflow and hosting config
- **Acceptance criterion:** AC-33
- **Priority:** medium
- **Type:** functional
- **Steps:** 1. Read `ci.yml`, `deploy.yml`, `vite.config.js`.
- **Expected result:** CI on PRs runs build, unit and e2e; no GitHub Pages deploy workflow (Vercel deploys `main`); base `/`.
- **Automated by:** `tests/unit/delivery.test.js` › `TC-38 (AC-33): CI checks PRs and there is no Pages deploy workflow`
- **Status:** Pass (static check only; a real CI run happens when the PR is opened)

### TC-43: build served at the root loads styles, script and photo
- **Acceptance criterion:** AC-34
- **Priority:** high
- **Type:** functional
- **Preconditions:** production build served at `/` (locally by `vite preview`; after merge, https://unflaky-sie.vercel.app/)
- **Test data:** —
- **Steps:**
  1. Load `/`; read the stylesheet, module script and photo URLs.
  2. Request each URL; read the body background color.
  3. Click EN.
- **Expected result:** no URL contains `/unflaky-sie/`; each returns 200; background `rgb(11, 10, 8)`; page switches to EN.
- **Automated by:** `e2e/delivery.spec.js` › `AC-34: production build served at / loads styles, script and photo`
- **Status:** Pass locally (f3d7986); production pending merge (#3)

## Exploratory

### TC-39: keyboard-only use of the interactive controls
- **Acceptance criterion:** FR-5, FR-20, FR-21 (exploratory)
- **Priority:** medium
- **Type:** accessibility
- **Steps:** 1. Tab to EN and press Enter. 2. Tab to the first FAQ summary and press Enter. 3. Focus the run button and press Space.
- **Expected result:** language switches, FAQ opens, the suite runs; every focused control shows a visible outline.
- **Automated by:** `e2e/homepage.spec.js` › `TC-39: keyboard alone switches language, opens FAQ and runs the suite`
- **Status:** Pass

### TC-40: tab order reaches every interactive control, all visible
- **Acceptance criterion:** FR-22 (exploratory)
- **Priority:** low
- **Type:** accessibility
- **Steps:** 1. Press Tab repeatedly at 1280px and at 390px, collecting focused elements.
- **Expected result:** every focused element is visible (no focus lands on a hidden control) and has an outline.
- **Automated by:** `e2e/homepage.spec.js` › `TC-40: tab order only lands on visible controls at 1280 and 390px`
- **Status:** Pass

### TC-41: rapid language toggling
- **Acceptance criterion:** FR-19 (exploratory)
- **Priority:** low
- **Type:** boundary
- **Steps:** 1. Click EN/PT 20 times quickly, ending on EN.
- **Expected result:** page consistently EN, exactly one button pressed.
- **Automated by:** `e2e/homepage.spec.js` › `TC-41: rapid language toggling ends in a consistent state`
- **Status:** Pass

### TC-42: 1020px / 680px boundaries
- **Acceptance criterion:** FR-23, FR-24 (exploratory)
- **Priority:** low
- **Type:** boundary
- **Steps:** 1. At 1020px nav hidden; at 1021px visible. 2. At 680px side labels hidden; at 681px visible.
- **Expected result:** breakpoints apply "up to" the stated width inclusive.
- **Automated by:** `e2e/homepage.spec.js` › `TC-42: breakpoints apply at 1020px and 680px inclusive`
- **Status:** Pass

## Not covered

- Visual fidelity to prototype v5 (fonts actually rendering, glow, shadows, icon drawings): no baseline exists; judged by eye only, listed in the report.
- Google Fonts loading: external network, not asserted (offline runs would be flaky).
- Vercel production deployment: only verifiable after merge to `main` (TC-43 is run manually against production then).
- Browsers other than Chromium: the project's Playwright config is Chromium-only by design.
