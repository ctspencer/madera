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

Selectors: pins are `.pin` (labels `.pin-label`), panel is `.entry-panel` with
`.entry-place`, `.entry-title`, `.entry-body`, close button `.entry-close`.

## Gotchas

- **Pins fail Playwright's stability check** because the globe auto-rotates — click with
  `{ force: true }`. This is expected behavior, not a bug.
- Wait ~3s after load for the globe texture before screenshotting.
- Pins on the far side of the globe are occlusion-hidden; iterate `.pin` elements and
  pick a visible one.
- `/favicon.ico` 404s in the console — no favicon exists yet; ignore.

## Flows worth driving

1. Globe renders on ivory (no black starfield), slowly rotating, all entries from
   `src/data/entries.ts` appear as labeled pins.
2. Click a pin → camera flies to it, panel opens with place/title/body.
3. Close button → panel unmounts, rotation resumes after ~4s.
