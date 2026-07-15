/**
 * Every place on the globe renders from this one list.
 * To add a place: add one entry here. Nothing else changes.
 *
 * `place` is the name SHE used, kept verbatim as the display label —
 * she wrote about Czechoslovakia, and Czechoslovakia it stays.
 * `lat`/`lng` are modern coordinates, used only to position the pin.
 * The two deliberately don't have to agree; don't "correct" her names.
 *
 * `body` is her writing, transcribed, as markdown. `media` is photos or
 * page scans. Both optional; the entry view renders whatever exists.
 * A photographed page awaiting transcription is just an entry with
 * media and no body — not a different kind of entry.
 */

export interface Entry {
  id: string
  place: string
  lat: number
  lng: number
  year: number | null
  title: string
  body: string | null
  media: string[]
}

export const entries: Entry[] = [
  {
    id: 'new-york',
    place: 'New York',
    lat: 40.7128,
    lng: -74.006,
    year: null,
    title: 'Placeholder — title TBC',
    body: '*Placeholder.* Her writing from New York will go here once it has been photographed and transcribed from the book.',
    media: [],
  },
  {
    id: 'montgomery',
    place: 'Montgomery',
    lat: 32.3668,
    lng: -86.3,
    year: null,
    title: 'Placeholder — title TBC',
    body: '*Placeholder.* Montgomery was her home ground. Her writing from here will go here once transcribed.',
    media: [],
  },
  {
    id: 'amsterdam',
    place: 'Amsterdam',
    lat: 52.3676,
    lng: 4.9041,
    year: null,
    title: 'Placeholder — title TBC',
    body: '*Placeholder.* Her writing from Amsterdam will go here once transcribed.',
    media: [],
  },
  {
    id: 'mont-saint-michel',
    place: 'Mont Saint-Michel',
    lat: 48.6361,
    lng: -1.5115,
    year: null,
    title: 'Placeholder — title TBC',
    body: '*Placeholder.* Her writing from Mont Saint-Michel will go here once transcribed.',
    media: [],
  },
]
