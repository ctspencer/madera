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
    id: 'introduction',
    place: 'Montgomery',
    lat: 32.3668,
    lng: -86.3,
    year: null, // book publication year unknown — she left the paper in 1982
    title: 'Introduction',
    // Her introduction to The Best of Madera (IMG_0568–0569).
    body: `When I joined the staff of The Montgomery Advertiser-Alabama Journal on Jan. 10, 1955, I was stunned and awed by the clattering dinosauric Linotype machines clacking out "hot type" in the busy, noisy composing room on the ground floor of the building at 200 Washington Avenue.

I wrote my copy on an upright manual Underwood typewriter, then wafted it down "the chute" at the copy editor's desk in the communal newsroom. It was clanked out into metal slugs by the Linotype operators.

Later I graduated to a laid-back whirring electric IBM typewriter.

By the time I left the newspaper in 1982 there was in use in the almost silent composing room a sleek, glassed-in Itek Digital System zipping out "cold type" and I wrote my copy on a computerized visual display terminal.

What changes took place in those 27 years!

Believe me, not a day of those years was dull.

Beside reporting and writing about people, places and events of diverse nature, beside editing, making up pages, answering continuously ringing telephones, putting out special sections on food, fashion and features, I had the good fortune to cover glamorous fashion showings in New York and California several times a year, of interviewing celebrities at home and abroad, and of conducting travel tours to Europe or to the Orient at least once each year. I often went back to Europe on my vacations.

But whatever I did and wherever I went, I knew with a certainty that my columns would be only as good as my readers' opinions of them.

Readers have been my most valued friends through the years.

They still are.

I am grateful to The Advertiser-Journal for making it possible for me to communicate with them again, and perhaps to make new friends.

Madera Spencer`,
    media: [],
  },
  {
    id: 'touched-by-adventure',
    place: 'Nassau',
    lat: 25.0443,
    lng: -77.3504,
    year: null, // no date in the piece — "many years ago" since her first visit
    title: 'Touched by Adventure',
    // The Best of Madera pp. 9–13 (IMG_0572–0576).
    body: `Every now and then, if one is lucky or perhaps perceptive, there come into his life experiences that are memorable beyond measure, that open the wellspring of emotions and leave one refreshed and renewed, and with new dimensions of understanding.

I have been blessed by many such occasions which have come unplanned and unexpected into my life, and which have left indelible memories to be recalled in times of need and to be mentally fondled like old treasures from a cedar chest.

One of these adventures was in Nassau in the Bahama Islands, when the great Caribbean cruise ship, the Mardi Gras, upon which I sailed to the West Indies, docked along the waterfront early on a Sunday morning.

The thriving, bustling port was a beehive of activity, with rows of native straw displays spread invitingly along the wharf. While most of my fellow passengers, of which there were a thousand, went off on sightseeing tours of the island, or flocked to the dingy, sprawling straw market on Bay Street at the end of the dock, I strolled alone in the hot sun through the crowds of vendors and buyers collecting souvenirs of their journey at this first port of call.

Since I had been to Nassau many years ago, I headed down Bay Street to the cool oasis of the palm-shaded gardens of the Royal British Colonial Hotel, but my attention was drawn up George Street to the big pink Governor's Palace that sits on a hill at the street's end. And so I turned up the narrow street where not a soul was in sight except an old, crippled beggar sitting languidly on the curb.

Within a couple of blocks from the pink palace, joyous organ music sweetly wafted through the air, and I saw an old stucco church across the street. Its great tall windows were thrown open to the scant breeze and when the music stopped a soft voice droned through the street's silence. Crossing the empty, tree-shaded street, I read the plaque that said this was the Cathedral Church of Christ of the Bahamas, Anglican Episcopal, and it was built in 1670.

Drawn to the wide, opened doors like a lemming to the sea, I stood transfixed as my eyes beheld a high, vaulted, dark wood ceiling, supported by free-standing white columns and white-washed walls. Ceiling fans stirred lazily overhead. At the altar rail, the Padre, in vestments of gold silk, was thanking the congregation for giving the fans to the church in tribute to his mother. The Padre's fine-chiseled face was the color of light mahogany, but his voice was crisp with a British accent.

Almost mesmerized by the serenity of the simple sanctuary, I took a seat in a wooden pew near the back of the church. I read the marble scrolls on the wall commemorating the church's founder and his wife Clara who came from Spain in the 1600's.

And then I looked at the congregation.

A middle-aged black woman in a pretty blue cotton dress sat at my left. A young man with the look of an English schoolboy was seated at my right. In front of me was a family — mother, father and two small children — who may have been of oriental origins. As my eyes scanned the congregation, I saw every shade of skin color, from white to cream to black, the attentive features bespeaking ancestry of both the East and the West . . . of England and of Spain and of Africa perhaps.

But there was a unity here, for they were all gathered to worship one God. As my eyes perceived the varied worshippers, I thought, "They are all so different." But then a small voice inside whispered, "This is brotherhood."

Later as organ music soared we all stood to sing all stanzas of "How Great Thou Art," then another and another of the well-known hymns while voices grew stronger and stronger. Perhaps mine was strongest of them all.

I had forgotten the great white ship docked near the noisy, hot straw market. I had forgotten the pink palace at the end of the street and the palm-shaded gardens of the British Colonial where I had intended to have a cool drink. I thought only of being a part of this congregation from all the ethnic corners of the world, worshiping in this old, simple, white-walled church with breezes blowing crosswise from the windows and with its whirring fans and dog-eared hymnals and prayer books.

But the best was yet to come.

Before the morning was over there was a baptism ritual. Two tiny infants, one black and one white, surrounded by loving parents and god-parents and small brothers and sisters, were tenderly held by the Padre over a white marble font at the back of the sanctuary, and were baptized by the pouring of water three times over the backs of their heads with a small silver shell. Then the families made a solemn procession up the aisle to the altar to take their vows.

When the Padre announced there would be communion, it never occurred to me, a Methodist, that I might not be welcome, and as the organ played softly I went with the communicants to kneel on worn red velvet cushions at the altar to partake of the Eucharist.

It was when the dark-skinned Padre intoned the blessing of the Holy Sacrament and looked into my eyes as he offered the golden chalice that the tears came.

With the tears also came a glorious emotional release from pent-up griefs that accumulate in every life, from patterns of prejudice that are thrust upon us often unknowingly, and from petty cares that smother joy and turn daily living into a struggle instead of a song.

After the service I shook hands with the Padre — the Very Reverend William Granger, Dean of the Cathedral of the Bahamas — on the steps of the old church and told him what the service had meant to me. With his words of welcome still echoing in my thoughts, I walked back along the still empty street toward the dock, immeasurably enriched and lighthearted.

I stopped to give a coin to the old crippled beggar still sitting in loneliness on the curb. We smiled at each other and I went back to the hustle and bustle of the docks and the big white cruise ship with its all night gambling casinos and gala parties and sumptuous food.

But I took something very precious with me. An experience to remember.`,
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
