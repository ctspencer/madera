# Transcribing her articles

Instructions for a Claude Code session (or a person) turning photos of
Madera Spencer's book pages into entries on the site.

## Where things live

| What | Where | Committed? |
|---|---|---|
| Raw photos of book pages | `book-photos/` | **No** — gitignored. Working material, often blurry/duplicated/huge. |
| Page images that appear on the site | `public/media/` | Yes — resized to ≤1600px on the long edge, JPEG quality ~85 (`sips -Z 1600 -s format jpeg -s formatOptions 85 in.png --out public/media/name.jpg`). |
| The entries themselves | `src/data/entries.ts` | Yes — this one list drives the whole site. |

Most entries need **no image at all** — the transcribed text is the point.
Only put a page scan in `public/media/` when the physical page earns it
(see CLAUDE.md). A photographed-but-not-yet-transcribed piece is fine too:
an entry with `media` and `body: null` renders as just the image.

## Adding an entry

One object in the `entries` array in [src/data/entries.ts](src/data/entries.ts):

```ts
{
  id: 'amsterdam-canals',            // kebab-case, unique, stable
  place: 'Amsterdam',                // HER name for the place, verbatim
  lat: 52.3676,                      // modern coordinates, pin position only
  lng: 4.9041,
  year: 1958,                        // null if unknown — never guess
  title: 'Title of the piece',       // her headline if the page shows one
  body: `...her text as markdown...`,
  media: [],                         // e.g. ['media/amsterdam-canals-p1.jpg']
}
```

That's the whole job — no other file changes. Several entries can share a
`place` (same string, same coords); they render as one pin whose panel
stacks the pieces in year order.

## Transcription rules — the important part

1. **Verbatim.** Keep her spellings, her punctuation, her paragraph breaks,
   her period language. "finnally" stays "finnally". You are carrying her
   voice, not editing it. If a word is genuinely illegible, mark it
   `[illegible]` rather than guessing.
2. **Her place names, never modernized.** She wrote about Czechoslovakia;
   Czechoslovakia it stays. `place` is her label; only `lat`/`lng` are modern.
3. **Never invent.** No guessed years, no composed titles presented as hers,
   no smoothing. If the page shows a headline, use it as `title`; otherwise
   use a plainly descriptive title and flag it for the owner to confirm.
4. **Markdown, minimal.** Paragraphs separated by blank lines. No headings,
   no bold/italics unless the original shows emphasis.
5. **When unsure, ask the owner** — list open questions at the end of the
   session rather than resolving them yourself.

## Workflow that works

1. Read a photo from `book-photos/` with the Read tool (it renders images).
2. Transcribe into a new entry in `src/data/entries.ts`.
3. **Proofread against the photo once, word by word** — transcription errors
   are the one unrecoverable failure here.
4. `npm run build` to typecheck, `npm run dev` to click the pin and read it
   (see `.claude/skills/verify/SKILL.md` for driving the page headlessly).
5. Commit in small batches (a few entries per commit) with the place names
   in the commit message. Pushing to `main` deploys the live site — so only
   push when the batch is proofread.

## Coordinates

Use well-known coordinates for the city/region she names (the pin just needs
to land in the right visual spot at globe scale). For places that no longer
exist under her name, pin the modern location of where she actually was.
