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

/**
 * One pin per place. Entries sharing the same `place` string read as a
 * chapter: stacked in year order (unknown years last, data order kept).
 */
export interface Place {
  place: string
  lat: number
  lng: number
  entries: Entry[]
}

export function groupByPlace(list: Entry[]): Place[] {
  const places: Place[] = []
  const byName = new Map<string, Place>()
  for (const entry of list) {
    let place = byName.get(entry.place)
    if (!place) {
      place = { place: entry.place, lat: entry.lat, lng: entry.lng, entries: [] }
      byName.set(entry.place, place)
      places.push(place)
    }
    place.entries.push(entry)
  }
  for (const place of places) {
    place.entries.sort((a, b) => {
      if (a.year === null && b.year === null) return 0
      if (a.year === null) return 1
      if (b.year === null) return -1
      return a.year - b.year
    })
  }
  return places
}

export const entries: Entry[] = [
  {
    id: 'new-york-1956-01',
    place: 'New York',
    lat: 40.7128,
    lng: -74.006,
    year: 1956,
    title: 'From Madera Spencer, January 1956 New York, New York',
    // Transcribed verbatim from her typed letter, her spellings kept.
    body: `Dear John T. and Johnny, and Mama.

Am having a wonderful time. This is one crazy place. Today was grand with showings all day. Yesterday was a mad house rushing from one place to the other in taxis all day and last night the weather was horrible! Ice and sleet were so bad on the streets that they called in all the cabs and the buses even stopped running. I was down in some weird part of New York at a party and five of us left to come home and couldn't get a cab. We walked in the sleet and icy wind for blocks and not one taxi would stop because they were all heading in. It was awful. Finally we took shelter in an apartment house on Park avenue and paid the doorman two dollars to stand out in the ice and try to stop a cab. One finally stopped and it was a negro driver from N. C. Sure was glad to see him, too. He crept along the streets and when I finnally got back about 11:30 mother was of course having a fit, since the television had interrupted all broadcasts to tell people to stay off the streets, it was too dangerous! It was kind of fun for us, however, especially since we finally got home! Have met lots of nice people. Was with a crowd from Canada today, and its right fun to talk newspaper with all these women. I never saw such gorgeous clothes in all my life, and such gorgeous prices on these originals. The models are all so skinny they look like they can't make it, but so made up they look unreal and beautiful. Everybody up here wears heaps of make-up, and especially pan cake and eye stuff, and look gummy. You sweet fellows take care of yourself. Seems I've been up here a month already. Miss you and love you so much, and will be glad to get home even though this is fun. I love my sweet home and family. Wouldn't trade it for all of N. Y., Paris and the world.

Always Deedie.`,
    media: ['media/1956-01-letter-new-york-p1.jpg'],
  },
  {
    id: 'florida-national-guard',
    place: 'Florida',
    lat: 29.95,
    lng: -81.98,
    year: null,
    title: 'Madera Spencer on a tank with soldiers at a National Guard training camp in Florida.',
    body: null,
    media: ['media/national-guard-florida-tank.jpg'],
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
    id: 'montgomery-2',
    place: 'Montgomery',
    lat: 32.3668,
    lng: -86.3,
    year: null,
    title: 'Placeholder — a second piece, title TBC',
    body: '*Placeholder.* A second piece from Montgomery, here to show how multiple entries for one place read as a chapter. Replace with her writing.',
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
