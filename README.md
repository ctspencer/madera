# Madera

A memorial website. An interactive globe: click a place she traveled, and her own writing from there comes up. Her words, mapped to the world she went and saw.

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

## Current state (first session)

Structure first, content later. The globe works end to end with four placeholder pins — New York, Montgomery, Amsterdam, Mont Saint-Michel. All titles and bodies are placeholders awaiting transcription from the book.

## Open questions — ask, don't invent

- Her name, and what appears on the site
- Titles and text for the first four places
- The full list of places (Greek islands and Czechoslovakia are known future additions)
- What the book actually is
- Whether photographs are included
- Whether other family members contribute memories
- Whether the eulogy is a page, an intro, or something the globe opens onto

## Deliberately deferred

- Mockingbird artwork (Audubon *Birds of America* Plate 21; verify the specific scan's licensing before use)
- The eulogy
- A self-hosted serif (system serif stack for now; typography carries the design and will get real attention)
- Any appearance of her actual pages or handwriting — undecided; default is her words cleanly set

## Credits

Globe texture: NASA Visible Earth / Blue Marble (public domain), committed at `public/textures/` so the build never depends on an external URL.
