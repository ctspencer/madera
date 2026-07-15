# Madera — working guidance

A memorial site built around one person's travel writing. There is no deadline; this is maintained in small sessions, sometimes weeks apart. Always leave the repo in a state that can be picked up cold.

## Architecture rules

- Everything renders from the single list in `src/data/entries.ts`. Adding a place must never require more than one entry there.
- `place` is her name for the place, verbatim, even when the name no longer exists (Czechoslovakia). Never modernize it. `lat`/`lng` are modern coordinates for the pin only.
- `body` (markdown) and `media` are both optional with no special case between them; the entry view renders whatever exists.
- Content is local data + markdown. No CMS, no database, no accounts, no analytics.
- Keep dependencies minimal and exact-pinned. This should still build in five years.

## Design rules

- Elegant, southern, feminine in a strong way. Restraint over ornament: if a decision is decorative, cut it.
- Current palette (owner's direction, 2026-07): soft lilac ground, opaque soft-sapphire ocean (#6f8bc0), pale cream land, muted faded-red markers, gold wordmark (#a8862d), ink-plum UI text; her words on warm ivory. Refined and elegant over loud.
- Layout: header top-LEFT (MADERA / About / Eulogy); all places as a chip strip along the bottom. Entries, About, and Eulogy open as centered modals (X or backdrop click to close).
- Pin labels are always visible (owner's rule 2026-07): U.S. places show the city/place name, places abroad show the COUNTRY (`pinLabel` in entries.ts). The chip strip keeps the specific names (`mapLabel`); her dateline `place` shows in the modal. De-clashing: duplicate pin labels render once, and latitude-neighbors cycle four label positions (below/above/right/left).
- **Typography exception (owner-approved 2026-07):** her words — entry bodies only — are set in Courier Prime (OFL, self-hosted at `public/fonts/`; chosen over Special Elite for readability). Titles, UI, About/Eulogy stay in the serif. Do not spread the typewriter face further.
- Type runs large on purpose — the site must be readable with reading glasses. Don't shrink it for aesthetics.
- Forbidden defaults: black starfield globe, glowing arcs, script fonts, lace, monograms, antebellum nostalgia, anything that reads as a tech dashboard or genealogy service.
- The globe is an object — warm, turned, held — not a data visualization. Land over ocean.
- Typography carries the design. The reading experience of a single entry matters more than the globe.
- **The mockingbird is the only bird.** It carries voices that aren't its own; that is the site's thesis. Never use the yellowhammer/northern flicker — its Alabama symbolism is explicitly Confederate. (The Audubon Plate 21 corner image was tried and removed at the owner's request, 2026-07 — if the bird returns, it returns somewhere it earns.)
- Never simulate her cursive or her typewriter (no handwriting webfonts, no Courier pastiche). If her cursive appears at all, sparingly — her name, maybe. Never body text.
- No AI-generated imagery anywhere on this site.

## Transcription sessions

If the task is transcribing her articles from photos, read **TRANSCRIBING.md**
first and follow it exactly. Raw photos live in `scans-best-of-madera/` at the
repo root (gitignored — never commit them or move them into `src/`).

## Content rules

- Placeholders are fine; invented content is not. The open-questions list in README.md must be answered by the site's owner, never guessed.
- Real entries replace placeholders as they're transcribed from the physical book, a piece at a time.
