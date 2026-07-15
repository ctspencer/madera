# Madera

A memorial website for Madera Spencer — the site carries her name. An interactive globe: click a place she traveled, and her own writing from there comes up. Her words, mapped to the world she went and saw.

Live at: https://ctspencer.github.io/madera/

## Running it

```sh
npm install
npm run dev      # local dev server
npm run build    # typecheck + production build to dist/
npm run preview  # serve the production build locally
```

Pushing to `main` deploys automatically to GitHub Pages via `.github/workflows/deploy.yml`.

## How to add a place

1. Open [`src/data/entries.ts`](src/data/entries.ts).
2. Add one entry to the list: her name for the place, coordinates, year if known, title, and her writing as markdown in `body` (or a page photo path in `media` if it isn't transcribed yet — put the image in `public/media/`).
3. That's it. The globe and entry panel render entirely from that list.

Keep `place` exactly as she wrote it (Czechoslovakia stays Czechoslovakia); `lat`/`lng` are modern coordinates for the pin only.

Several entries can share one `place` — they render as one pin whose panel reads like a chapter: all pieces stacked in year order, separated by a quiet divider.

## Current state (third session)

Stylized vector globe (black ground, paper-tan countries), one pin per place with hover labels, top-right nav (MADERA / About / Places), mobile bottom-sheet reading panel. Type runs large on purpose — the site is meant to be read with reading glasses.

First real entries are in: her January 1956 letter from New York (transcribed verbatim, scan attached) and a photograph of her on a tank at a National Guard training camp in Florida. Montgomery carries two placeholder entries to demonstrate the chapter layout; remaining placeholders await transcription from the book.

## Open questions — ask, don't invent

- The About page text (currently a marked placeholder)
- Titles and text for the remaining placeholder places
- The full list of places (Greek islands and Czechoslovakia are known future additions)
- What the book actually is
- Whether photographs are included
- Whether other family members contribute memories
- Whether the eulogy is a page, an intro, or something the globe opens onto

## Deliberately deferred

- The eulogy
- A self-hosted serif (system serif stack for now; typography carries the design and will get real attention)
- Any appearance of her actual pages or handwriting — undecided; default is her words cleanly set

## Credits

- Country shapes: [Natural Earth](https://www.naturalearthdata.com/) 110m Admin 0 (public domain), pruned and committed at `public/data/countries.geo.json` so the build never depends on an external URL.
- Letter scan and photographs: family collection / Alabama Textual Materials Collection.
- Typewriter face for her words: [Courier Prime](https://fonts.google.com/specimen/Courier+Prime) by Alan Dague-Greene (OFL), self-hosted at `public/fonts/`.
