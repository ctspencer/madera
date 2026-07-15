---
name: verify
description: Build, run, and drive the Madera globe site to verify changes end-to-end.
---

# Verifying Madera

## Build and run

```sh
npm run build            # tsc typecheck + vite build (expect ~2.2MB chunk warning from Three.js — normal)
npm run dev              # serves at http://localhost:5173/madera/  (note the /madera/ base path)
npm run preview          # serves dist/ at http://localhost:4173/madera/
```

## Driving the page

No Playwright in this repo. Use `playwright-core` from a temp dir with the system Chrome
(`chromium.launch({ channel: 'chrome', headless: true })`) — no browser download needed.

```sh
mkdir -p /tmp/madera-verify && cd /tmp/madera-verify && npm i playwright-core
```

Selectors: pins are `.pin` (dot `.pin-dot`, hover-only label `.pin-label`), places nav
is `.places-toggle` / `.places-item`, panel is `.entry-panel` with `.entry-place`,
`.entry-section` (one per entry), `.entry-divider`, `.entry-title`, `.entry-body`,
close button `.entry-close`. Bird plate is `.bird` (non-interactive).

## Gotchas

- **Pins fail Playwright's stability check** because the globe auto-rotates — click/tap
  with `{ force: true }`. This is expected behavior, not a bug.
- **`locator.boundingBox()`/`locator.evaluate()` on `.pin` can hang** (CSS2D nodes mutate
  every frame). Use `page.evaluate(() => document.querySelector('.pin').getBoundingClientRect())`.
- Pin labels only appear on `:hover` — to test, chase the moving pin with repeated
  `page.mouse.move` to its current rect.
- Land polygons take ~1-2s to build after load; wait ~3s before screenshotting or the
  globe is a bare dark sphere.
- **Headless screenshots can capture a stale pre-polygon canvas frame** (dark globe,
  pins visible) even when the page renders fine — take two consecutive screenshots and
  trust the second, or interact first. Verified not a real rendering bug.
- Mobile emulation: use `deviceScaleFactor: 1` — at 2, `page.screenshot` hangs. Headed
  (`headless: false`) screenshots also hang on this page.
- **Mobile emulation against the prod URL runs at ~1fps** (SwiftShader software WebGL)
  — taps/screenshots starve waiting on rAF. Drive it with `page.evaluate` JS clicks
  instead, or test against localhost dev. Not a real-device signal.
- Pins on the far side of the globe are occlusion-hidden.
- `/favicon.ico` 404s in the console — no favicon exists yet; ignore.

## Flows worth driving

1. Globe: dark-green ground, paper-tan vector countries (no photo texture), slow
   rotation, one dot-ring pin per unique `place` in `src/data/entries.ts`.
2. Click a pin (or `.places-toggle` → a `.places-item`) → camera flies there, panel
   opens; a place with multiple entries shows stacked `.entry-section`s with dividers
   (Montgomery has two).
3. Close → panel unmounts. Rotation resumes ~3s after any interaction, even with the
   panel open.
4. Mobile (390×844, `isMobile`, `hasTouch`): panel is a bottom sheet (~68vh), places
   list collapses after selection.
