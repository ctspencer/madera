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
- Palette leads from a magnolia leaf: rust-brown, warm ivory, deep green accents, on a near-black ground (owner's choice, 2026-07). No pastels, no sepia.
- Type runs large on purpose — the site must be readable with reading glasses. Don't shrink it for aesthetics.
- Forbidden defaults: black starfield globe, glowing arcs, script fonts, lace, monograms, antebellum nostalgia, anything that reads as a tech dashboard or genealogy service.
- The globe is an object — warm, turned, held — not a data visualization. Land over ocean.
- Typography carries the design. The reading experience of a single entry matters more than the globe.
- **The mockingbird is the only bird.** It carries voices that aren't its own; that is the site's thesis. Never use the yellowhammer/northern flicker — its Alabama symbolism is explicitly Confederate. (The Audubon Plate 21 corner image was tried and removed at the owner's request, 2026-07 — if the bird returns, it returns somewhere it earns.)
- Never simulate her cursive or her typewriter (no handwriting webfonts, no Courier pastiche). If her cursive appears at all, sparingly — her name, maybe. Never body text.
- No AI-generated imagery anywhere on this site.

## Content rules

- Placeholders are fine; invented content is not. The open-questions list in README.md must be answered by the site's owner, never guessed.
- Real entries replace placeholders as they're transcribed from the physical book, a piece at a time.
