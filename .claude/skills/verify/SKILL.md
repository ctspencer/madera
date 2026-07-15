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

Selectors: pins are `.pin` (dot `.pin-dot`, label `.pin-label` — zoom-gated: hidden via
`.labels-hidden` ancestor until camera altitude < 1.7, hover always reveals). The places
index is a bottom chip strip: `.places-strip` > `.chip` (one per place, always visible;
horizontally scrollable on mobile). Nav is top-LEFT: gold `.wordmark`, `.nav-link`s for
About and Eulogy. Entries, About, and Eulogy open in a centered modal:
`.modal-backdrop` > `.modal-card`, containing `.entry-place` (full dateline),
`.entry-section` (one per entry), `.entry-divider`, `.entry-title`, `.entry-body`
(Special Elite typewriter face), close button `.entry-close`. No `.entry-panel` or
`.places-toggle`/`.places-item` anymore.

## Gotchas

- **Pins fail Playwright's stability check** because the globe auto-rotates — click/tap
  with `{ force: true }`. This is expected behavior, not a bug.
- **`locator.boundingBox()`/`locator.evaluate()` on `.pin` can hang** (CSS2D nodes mutate
  every frame). Use `page.evaluate(() => document.querySelector('.pin').getBoundingClientRect())`.
- Pin labels are always visible (2026-07 lilac redesign) — read them straight from
  `.pin-label` textContent.
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

1. Globe: soft lilac ground, translucent sapphire ocean, pale cream vector countries
   (no photo texture), slow rotation, one muted-red labeled pin per unique `place` in
   `src/data/entries.ts`.
2. Click a pin (or `.places-toggle` → a `.places-item`) → camera flies there and a
   centered modal opens; a place with multiple entries shows stacked `.entry-section`s
   with dividers.
3. Close via the × **and** via clicking the backdrop outside the card — both must work.
   Rotation resumes ~3s after any interaction.
4. Mobile (390×844, `isMobile`, `hasTouch`, `deviceScaleFactor: 1`): same centered
   modal, near-full-width; places list collapses after selection.
