# Spec: Unflaky Quality Lab homepage (MVP)

- Slug: `unflaky-homepage`
- Branch: `feature/unflaky-homepage`
- Source: Herbert's delivery document `especificacao-site-unflaky-qa.pdf` (Google Drive folder linked in README), built from
  the approved visual prototype "v5" (Direction A, premium-lab, dark with gold, company first).
- Literal copy: [`unflaky-homepage-copy.md`](unflaky-homepage-copy.md) (all PT/EN texts, fixed texts, links).

> Golden rule from the source: **this is not a new design.** Do not change layout, colors, hierarchy, section order or
> texts. If something is not in this spec, do not invent it: follow the closest described pattern and list it in the PR
> under "Assumptions to confirm".

## 1. Context

Unflaky is a quality engineering consultancy ("Quality Lab") that tests SaaS to the standard of a regulated laboratory,
with a special focus on AI-built products. It launches on **January 2, 2027**; booking for the first diagnostics is
already open. Clients can be anywhere in the world, work is remote, in Portuguese and English.

The site is a **single bilingual page** (PT/EN) that presents the firm, services, working standard, method, technical
leadership and FAQ, and leads visitors to start a conversation (via LinkedIn / herbertph.com / GitHub) about a quality
diagnostic.

Positioning: **company first.** Not a personal portfolio. No large founder photo in the hero, no first-person story.
Herbert appears exactly once, in the Technical leadership section, as the person who signs the reports.

## 2. Scope

### In scope
- Project scaffold: Vite + vanilla JavaScript, Vitest (unit), Playwright (e2e), GitHub Actions CI.
- The homepage, every section in the exact order of FR-3, with the literal copy file.
- Language auto-detection and the PT | EN switcher.
- FAQ accordion and the interactive "Run the suite" sample report.
- Responsive behavior at 1020px and 680px breakpoints.
- Deployment to GitHub Pages from `main` via GitHub Actions.
- A placeholder for Herbert's photo until he sends the real file.
- Fill in `CLAUDE.md` (stack, commands, structure).

### Out of scope (forbidden by the source)
- The course landing page "Teste Antes de Lançar" (separate document, not requested).
- Any contact/booking form, embedded calendar or chat.
- Prices, plans, packages.
- Testimonials, client logos, counters, ratings, invented social proof.
- Extra pages (blog, service pages, login).
- Offering game or iGaming testing anywhere.
- Any text saying Herbert approves or certifies games for the market.
- Any text not present in the copy file.
- Custom domain, analytics, cookie banner.

## 3. Functional requirements

### Visual identity

**FR-1 Design tokens.** A `:root` block with exactly these values, no other accent colors, no new gradients, no
illustrations:

```
--bg:#0B0A08; --bg-2:#12100C; --panel:#171410; --panel-2:#1D1913; --ink:#F2ECDD; --ink-2:#ABA18D; --ink-3:#7E7663;
--line:#2B2619; --line-soft:#211D14; --gold:#C6A15B; --gold-2:#E6C87E; --gold-dim:rgba(198,161,91,.14);
--pass:#5FC98B; --pass-bg:rgba(95,201,139,.12); --fail:#FF7A59; --fail-bg:rgba(255,122,89,.12);
--paper:#F5F0E1; --paper-ink:#16130C;
```

Body: background `--bg`, text `--ink`, base font 17px (16px up to 680px), line-height 1.6. Content in `.wrap`, max-width
1200px, 24px side padding. Sections with 96px vertical padding (64px up to 680px).

**FR-2 Typography and logo.**
- Google Fonts: `--sans` Archivo 400/500/600/700/800/900 (all text and headings); `--serif` Newsreader italic (opsz
  6..72, weights 500 and 600), used only for `<em>` emphasis words inside headings and highlight sentences, always in
  `--gold-2`; `--mono` IBM Plex Mono 400/500/600 for labels, kickers, section numbers, codes, small buttons and
  metadata (uppercase with letter-spacing).
- h1: between 2.8rem and 4.6rem (clamp), weight 800, letter-spacing -0.025em.
- Logo: inline SVG, viewBox `0 0 24 24`. Shield stroke `#C6A15B` width 1.7, fill `rgba(198,161,91,.16)`, path
  `M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z`.
  Check stroke `#E6C87E` width 2.1, path `m8.8 11.9 2.1 2.1 4.3-4.3`.
- Header: logo + `UNFLAKY`, with only `Quality Lab` underneath (never "QA for SaaS" in the header).
- Footer: same mark at 18px before `UNFLAKY`.
- Favicon: same shield as an inline SVG data URI over a `#0B0A08` square.
- Approval panel gates: a smaller shield-with-check variant (check path `m9 12 2 2 4-4`) next to each gate.
- Icons on service cards and gates: inline gold stroke SVGs. No icon library, no external images.

### Page structure (exact order)

**FR-3 Section order.** 0a Launch strip · 0b Header · 1 Hero (with 1a Approval protocol panel) · 1b Stats ·
1c Positioning · 2 `01` Services · 3 `02` House standard · 4 `03` Focus · 5 `04` Method · 6 `05` Technical leadership ·
7 `06` FAQ · 8 Contact · 9 Footer.

Numbered section headers (01–06) always follow the same pattern: number in gold mono, title in Archivo, side label
right-aligned (the side label hides on mobile).

Anchors (ids): `serviços`, `padrão`, `foco`, `método`, `liderança`, `faq`, `contato` (literal, with accents, as in the
source).

**FR-4 Launch strip.** Full gold strip above everything: background `--gold`, text `#191407`, mono 12px uppercase weight
600. Left: `strip.left`; right: `strip.right`.

**FR-5 Header.** Left: logo + `UNFLAKY` / `brand.role`. Nav links Services, Standard, Focus, Method, FAQ to the anchors
above. Language switcher `PT | EN` (two buttons with `aria-pressed`). Solid button `nav.cta` that scrolls to `#contato`.

**FR-6 Hero.** Left: `hero.kicker`, `hero.h1` (with `<em>` word), `hero.lede`, solid button `hero.cta1` → `#contato`,
ghost button `hero.cta2` → `#padrão`, `hero.note`. Right: Approval protocol panel. Subtle radial gold glow in the top-right
corner of the hero background.

**FR-7 Approval protocol panel.** Panel with a 3px gold strip on top. Header (`verdict.t`, `verdict.m`), 4 gates numbered
01–04, each with shield icon, title and subtitle (`verdict.1..4`, `verdict.1s..4s`), footer with `verdict.foot` and the
stamp `verdict.stamp`.

**FR-8 Stats.** Row of 4 large gold numbers `95%`, `98%`, `10`, `11` with labels `stat.1..4`, followed by `stats.note`.

**FR-9 Positioning.** Large sentence `pos.big` (with `<em>` part) and paragraph `pos.body`. No section number, no section
title.

**FR-10 `01` Services (`#serviços`).** Header `svc.h` / side `svc.side`. Grid of 4 cards in order (Quality diagnostic,
Manual & exploratory, Playwright automation, AI agents). Each card: index `/01`–`/04`, gold stroke icon, title,
description, "Deliverable" area (`deliv`) with 3 chips (card 3: `Playwright · TypeScript`, `CI/CD`, `svc.3c3`).

**FR-11 `02` House standard (`#padrão`).** Header `std.h` / side `std.side`. 3 principles side by side (`std.1..3`),
and below them the independence block (`std.bt`, `std.bd`).

**FR-12 `03` Focus (`#foco`).** Side label `SaaS · IA` (fixed). Left: `focus.lead` highlight, `focus.p1`, `focus.p2`,
list of 4 risks `focus.r1..4` each marked with an X. Right: the sample report as "paper" (background `--paper`, text
`--paper-ink`, hard offset gold shadow): `report.t`, `report.m`, 5 rows each with code, text (`report.1..5`) and badge,
`report.sum`, and the button `report.run`. FAIL badges use `--fail`/`--fail-bg`, PASS badges `--pass`/`--pass-bg`.

**FR-13 `04` Method (`#método`).** Header `method.h` / side `method.side`. 4 steps in a row labeled `ETAPA 1`–`ETAPA 4`
(PT) / `STEP 1`–`STEP 4` (EN), each with title and description.

**FR-14 `05` Technical leadership (`#liderança`).** Header `lead.h` / side `lead.side`. Single card with the circular
photo, `lead.who`, name `Herbert Parasio`, `lead.role`, `lead.desc`, and 4 credential chips (see copy file).
Photo: `assets/herbert-hero.jpg`, `border-radius:50%`, 2px `--gold` border, 200×200 desktop / 120×120 mobile,
`object-fit:cover`, `object-position:center 22%`, `filter:saturate(.85)`, `alt` = `lead.alt`.

**Pending decision (do not resolve):** the numbers 10 (jurisdictions) and 11 (testers) appear in the stats, in
`lead.desc` and in the leadership chips. Build them exactly as in the copy. Mark each occurrence in the source with an
HTML/JS comment `PENDING-HERBERT: numbers 10 and 11` and list them in `CLAUDE.md` under "Before publishing". Do not
invent substitutes, do not remove.

**FR-15 `06` FAQ (`#faq`).** Header `faq.h` / side `FAQ`. 5 questions as an accordion (`<details>`/`<summary>`), `+`
sign on the right of each question.

**FR-16 Contact (`#contato`).** `contact.kicker`, large heading `contact.h` (with `<em>` on "veredito"/"verdict"),
`contact.p`, 3 link buttons: `contact.b1` → LinkedIn (solid), `herbertph.com` (ghost), `GitHub` (ghost). Final line
`contact.note`. No form.

**FR-17 Footer.** Mark + `UNFLAKY`, metadata line `footer.meta`, links LinkedIn · GitHub · herbertph.com.

### Behavior

**FR-18 Initial language.** From `navigator.language`: starts with `en` → English; starts with `pt` → Portuguese;
anything else (or missing) → Portuguese.

**FR-19 Language switcher.** Clicking PT or EN swaps every dictionary text instantly without reloading, and updates
`<html lang>` (`pt-BR` / `en`), `document.title`, the photo `alt`, and the Method step labels. The active button has
`aria-pressed="true"`, the other `aria-pressed="false"`. Fixed texts and the meta description never change.

**FR-20 FAQ accordion.** No item open on load; each item opens and closes independently (opening one does not close
others).

**FR-21 Run the suite.**
1. Idle: badges show FAIL, FAIL, FAIL, PASS, PASS; button shows `report.run`.
2. On click: button disabled, shows `report.running`; all 5 badges show `···` in a waiting (neutral) style.
3. After 260ms, the badges return one by one, every 340ms, to their original result with the matching color.
4. End: button re-enabled, shows `report.rerun`. Clicking again repeats the cycle.
5. `prefers-reduced-motion: reduce`: all delays are 0, the result appears immediately.
6. If the language changes after a run, the button shows `report.rerun` in the new language (and `report.running` if the
   change happens mid-run).

**FR-22 Navigation.** All action buttons scroll to in-page anchors (`#contato`, `#padrão`). Only the 3 contact links
(and the 3 footer links) are external and open in a new tab (`target="_blank" rel="noopener noreferrer"`).

### Responsive

**FR-23 Up to 1020px.** Main nav hidden (brand, switcher and CTA remain). Hero becomes one column (text, then panel).
Focus grid one column. Method 2×2 without top border on the first two steps. The 3 standard principles stack, separated
by a top border.

**FR-24 Up to 680px.** Base font 16px, section padding 64px, hero top padding 46px. Header CTA hidden. Strip right text
hidden. Stats 2×2. Service cards and Method steps one column. Leadership card one column, photo 120×120. Section side
labels hidden. Sample report with smaller padding and the hard shadow reduced to 6px.

### Assets, delivery

**FR-25 Photo placeholder.** Until Herbert sends the photo, `assets/herbert-hero.jpg` (path served by the site) is a
neutral placeholder image (solid `--panel` color, 880×1100, no text, no stock photo). Replacing that one file must be
the only change needed later. `herbert-story.jpg` is never used.

**FR-26 Meta.** `<title>` = `title` key; fixed PT meta description from the copy file; `viewport` meta.

**FR-27 Deploy.** GitHub Actions: on every PR run build + unit + e2e; on push to `main`, build and deploy to GitHub Pages
(Vite `base` set to `/unflaky-sie/`).

## 4. Acceptance criteria

Viewports used below: desktop 1280×800, tablet 900×1000, mobile 390×844.

**Identity and structure**
- **AC-1** Given the page loads, when computed styles of `:root` are read, then every token in FR-1 has the exact value.
- **AC-2** Given the page loads, then sections appear in the FR-3 order, and the numbered headers read 01–06 with the
  titles from the copy file.
- **AC-3** Given the header, then it shows the shield SVG, `UNFLAKY` and only `Quality Lab` underneath; the text "QA for
  SaaS" / "QA para SaaS" does not appear in the header in either language.
- **AC-4** Given the page loads, then a favicon is declared as an SVG data URI containing the shield path.
- **AC-5** Given the nav, then its 5 links point to `#serviços`, `#padrão`, `#foco`, `#método`, `#faq` and each target
  element exists.

**Copy (both languages)**
- **AC-6** Given language PT, then every dictionary text on the page equals its PT value in the copy file; given EN, its
  EN value (checked key by key, including `<em>` emphasis rendered as an `em` element).
- **AC-7** Given either language, then all fixed texts (copy file section 2) are present and unchanged, the stat numbers
  read 95%, 98%, 10, 11 in order, and the report badges read FAIL, FAIL, FAIL, PASS, PASS.
- **AC-8** Given the page in either language, then it contains no form, no `input`/`textarea`/`select`, no iframe, no
  price (no currency symbol or "R$", "$", "US$" amounts), and no text outside the copy file (verified against the
  dictionary by the unit tests and visually by QA).
- **AC-9** Given the source, then each occurrence of the numbers 10 and 11 tied to jurisdictions/testers is marked with
  `PENDING-HERBERT`, and `CLAUDE.md` has a "Before publishing" note listing that decision.

**Language**
- **AC-10** Given a browser language `en-US`, when the page loads, then the page is in English, `<html lang="en">`, the
  title is `Unflaky — Quality Lab · QA for SaaS`, and EN has `aria-pressed="true"`.
- **AC-11** Given a browser language `pt-BR`, when the page loads, then it is in Portuguese with `lang="pt-BR"` and the PT
  title.
- **AC-12** Given a browser language `fr-FR` (or empty), when the page loads, then it is in Portuguese.
- **AC-13** Given the page in PT, when the user clicks EN, then without a reload all dictionary texts, `lang`, title,
  photo alt and Method labels (`STEP 1`–`STEP 4`) switch to EN; clicking PT switches back (`ETAPA 1`–`ETAPA 4`). The meta
  description stays the PT text.
- **AC-14** Given the PT button is already active, when it is clicked again, then nothing changes and no error is logged.

**FAQ**
- **AC-15** Given the page loads, then 5 FAQ items exist and none is open.
- **AC-16** Given item 1 is open, when item 3 is opened, then both are open; when item 1 is clicked again, it closes and
  item 3 stays open.

**Run the suite**
- **AC-17** Given the idle report, then the button shows `Rodar a suíte` / `Run the suite` and is enabled.
- **AC-18** Given the user clicks the button, then immediately the button is disabled with `Rodando…` / `Running…` and all
  5 badges show `···`.
- **AC-19** Given the run started, then badges resolve one at a time in row order (first at ~260ms, then every ~340ms) to
  FAIL, FAIL, FAIL, PASS, PASS with the matching colors; at the end the button is enabled and shows `Rodar de novo` /
  `Run it again`.
- **AC-20** Given a finished run, when the button is clicked again, then the same cycle repeats and ends in the same
  state.
- **AC-21** Given `prefers-reduced-motion: reduce`, when the button is clicked, then the final state appears with no
  delay.
- **AC-22** Given a finished run in PT, when the user switches to EN, then the button reads `Run it again`.
- **AC-23** Given the button is disabled during a run, when it is clicked again, then no second run starts (badges keep
  resolving once, in order).

**Navigation and links**
- **AC-24** Given the hero, when `hero.cta1` or the header CTA is clicked, then the page scrolls to `#contato`; when
  `hero.cta2` is clicked, it scrolls to `#padrão`. No navigation to another page happens.
- **AC-25** Given the contact and footer, then LinkedIn, herbertph.com and GitHub link exactly to the URLs in the copy
  file, with `target="_blank"` and `rel` containing `noopener`.

**Leadership and photo**
- **AC-26** Given the page, then exactly one `img` of Herbert exists, inside `#liderança`, with `src` ending in
  `assets/herbert-hero.jpg`, circular, 200×200 on desktop and 120×120 at 390px, with the language's `lead.alt`; no
  reference to `herbert-story.jpg` exists anywhere.
- **AC-27** Given the image file is the placeholder, then it loads without a broken-image state (HTTP 200).

**Responsive**
- **AC-28** Given 900px width, then the main nav is hidden, the hero is one column with the panel below the text, the
  Focus grid is one column and the Method is 2×2.
- **AC-29** Given 390px width, then the header CTA and strip right text are hidden, stats are 2×2, service cards and Method
  steps are one column, section side labels are hidden.
- **AC-30** Given 390px width in PT and in EN, then the document has no horizontal scroll
  (`scrollWidth <= clientWidth`) and no element in strip, hero, panel, stats, report or leadership card overflows the
  viewport.
- **AC-31** Given 1280px width, then the hero has two columns and `.wrap` max-width is 1200px.

**Quality and delivery**
- **AC-32** Given the page loads and the user switches language and runs the suite, then the browser console has no
  errors.
- **AC-33** Given a PR, then CI runs build, unit and e2e tests and all pass; given a push to `main`, the site is deployed
  to GitHub Pages.

## 5. Assumptions (Herbert to confirm in review)

1. **`<em>` placement.** The PDF lost the italic markup. Assumed emphasis: hero "aprovado"/"cleared"; positioning "Nós
   conferimos."/"We do."; focus lead "principalmente o SaaS feito com IA."/"especially AI-built SaaS."; contact
   "veredito"/"verdict" (PT confirmed by the source, EN assumed).
2. **Prototype v5 HTML is not available.** The PDF is the reference. Details it does not specify (service card icon
   drawings, exact paddings inside cards, chip styles) are reproduced faithfully to the described style and listed in
   the PR.
3. **Hosting:** GitHub Pages under `https://herbertph.github.io/unflaky-sie/`. Custom domain later.
4. **Photo:** placeholder until Herbert sends `herbert-hero.jpg`.
5. **Numbers 10 and 11:** kept and flagged as pending (FR-14), as the source requires.

## 6. Technical notes

- Stack: Vite + vanilla JavaScript (ES modules), plain CSS, Vitest + jsdom for unit tests, Playwright (Chromium) for
  e2e. The Playwright web server must use its own port (e.g. 4173 via `vite preview --port 4173 --strictPort`), never
  4545.
- Suggested structure:
  - `index.html`: semantic markup; every translatable node has `data-i18n="<key>"` (use `data-i18n-html` only for keys
    that contain `<em>`; values come from our own dictionary, never from user input).
  - `src/i18n.js`: `DICT = { pt: {...}, en: {...} }` with every key from the copy file (single source of truth).
  - `src/lang.js`: pure `detectLanguage(navigatorLanguage) → 'pt' | 'en'`, `applyLanguage(root, lang)`.
  - `src/suite.js`: pure `buildSchedule({ reducedMotion }) → [{ row, delay }]` (260 + i·340 or all 0) plus the DOM runner.
  - `src/main.js`: wiring.
  - `public/assets/herbert-hero.jpg`: placeholder.
  - `src/styles.css`: tokens + layout + breakpoints (1020px, 680px).
- Unit tests: dictionary completeness (PT and EN have the same keys, no empty values, values match the copy file),
  `detectLanguage`, `buildSchedule`.
- Fonts via Google Fonts `<link>` with `preconnect`.

### Task list (in order)
1. Scaffold Vite + Vitest + Playwright, npm scripts (`dev`, `build`, `preview`, `test`, `test:e2e`), CI workflow (PR
   checks) and Pages deploy workflow. Fill `CLAUDE.md` (stack, commands, structure, "Before publishing").
2. `src/i18n.js` with the full dictionary from the copy file + unit tests for completeness.
3. `detectLanguage` + `buildSchedule` pure functions with unit tests.
4. `index.html` + `styles.css`: tokens, fonts, logo/favicon, strip, header, hero + panel, stats, positioning.
5. Sections 01–06, contact, footer, photo placeholder.
6. Behavior: language switcher, FAQ, Run the suite.
7. Responsive breakpoints and the 390px no-overflow check.
8. Front-end polish against the source (Front-End Dev), then QA test cases and e2e for every AC.
