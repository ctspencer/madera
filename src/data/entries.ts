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
    id: 'lifes-reflections',
    place: 'Montgomery',
    lat: 32.3668,
    lng: -86.3,
    year: null, // no date given — the pond on the golf course behind her house
    title: "Life's Reflections",
    // The Best of Madera pp. 34–36 (IMG_0597–0599).
    body: `It was almost dark when I sat down dejectedly upon the grass at the edge of the small pond on the golf course behind my house. The full moon was already riding the eastern sky and it's likeness lay like a painted canvas in the middle of the small lake.

I gazed disconsolately at the reflections in the still water — the trees around the rim pointing their silhouetted black branches inward like gaunt witches' fingers and the shadows of the approaching night making a dark duplication on the pond.

But I wasn't really seeing it.

What I was seeing were pictures in my mind's eye of the day that had started out badly from the beginning. I had burnt the breakfast bacon, and from then on inconveniences and annoyances had seemed to multiply like mold on stale bread. My nerves were all on edge and my body ached with weariness, caused mostly perhaps from the futile frustration of having left some tasks unfinished.

By the time I had gotten home that afternoon I was so cross I had gone skulking off to the pond like a small hurt animal who hides to lick its wounds.

There was a chill in the coming night's air as I sat recalling vividly the grievances of the day, counting them one by one as if they were beads on a string. It seemed from faraway that I heard the tiny frogs on the bank plop into the pond, and watched crazy little purple-winged bugs zigzag through the water making ripples in the mirrored moonlight.

It was a long time before I slowly began to perceive the scene at which I stared so gloomily. With eyes cast downward at the water, I thought, "That's the way my world has been today. . . everything upside down."

I don't know what caught my attention and drew my eyes upward from the water and its inverted pictures. Perhaps it was a bird flying overhead to its roost. But slowly my eyes did raise upward from the reflections and the scene changed magically.

The gnarled black limbs that were so menacing in the water in reality reached strong and sturdy and straight up through the twilight sky. The evening clouds that were so black and treacherous-looking in the pond were tinged with deep lavender sunset colors in the sky. The moon now high in the heavens was round and white and luminous whereas the ripples from the waterbugs had made it look lopsided and wavery.

And then it hit me.

The irritations of the day were only life's reflections. I had rebelled against those things that come to us all so that we may better appreciate the beauties that abound.

The problem of my day had not been the burned bacon or the unfinished work or the incessant telephone calls that made me fret with impatience. I could cook more bacon; tomorrow was another day to finish the work I didn't get to today; and without the telephone calls how dull the day would be.

No, my only problem had been in looking downward at life's inconsequential reflections.

I needed to look higher at the reality of its blessings.`,
    media: [],
  },
  {
    id: 'majestic-interlude',
    place: 'Montgomery',
    lat: 32.3668,
    lng: -86.3,
    year: null, // childhood memoir — no date given
    title: 'Majestic Interlude',
    // The Best of Madera pp. 41–43 (IMG_0604–0606). "Captiol" and
    // "ensconsed" are the book's spellings, kept verbatim.
    body: `Newcomers to Montgomery may find it hard to believe that lower Madison Avenue was once one of the most desirable residential districts of the city and many stately homes of prominent citizens lined the wide, tree-shaded street.

Within easy walking distance of town, the area now bustling with car washes, furniture stores, diners and beauty product distributors was once the site of pleasant two-story Victorian houses or impressive columned antebellum edifices.

My grandparents occupied one of them.

When I was a little girl — which wasn't exactly the covered-wagon era, but on the other hand it was no space age either — I spent many happy afternoons with my two unmarried aunts and grandmother on Madison Avenue but the grandest thing that could happen to me was for my aunts to walk me to town.

We'd saunter leisurely along by the Captiol where I was allowed to crawl in the sweet grass on the hillside and pick a pocketful of tiny babybreaths, those miniature blue daisies that sprig the tender grass like little stars in a clear night sky.

Then we'd mosey on down Dexter Avenue past the tree-shaded medians that centered the street in double rows from the Capitol to Dexter Avenue Methodist Church corner.

Usually we'd pause to admire the stained glass window of the old red brick church where my parents were married, for it seemed like Westminster Abbey to me.

Walking slowly and looking in all the shop windows, we rounded Court Square Fountain then started our homeward trek.

But the lovely adventure had just begun.

Bailey Plumbing Co. was located about where Montgomery Seed and Supply is now, and it so happened that the Bailey brothers who were proprietors had a sister named Miss Agnes who was a bosom friend of my aunts and who minded the plumbing shop when her brothers went off installing things and unstopping clogged drains.

Now it was our custom to stop by to see Miss Agnes on our way home and pass the remainder of the afternoon with her in the plumbing shop.

In winter she and my aunts would pull up chairs to the heater and sit comfortably among the lavatories and tubs on display; in summer they sat in the shade inside the opened front doors. We always had soft drinks and cookies which materialized from somewhere as if whisked in by a plumbing shop genie especially for this soiree.

While my aunts and Miss Agnes caught up on the daily news, I was free to roam amongst the gleaming bathroom equipage and the galvanized pipes. For some reason the glistening toilets seemed to inspire my already budding imagination and the spirit of "make-believe," like the arms of a mesmerized Morpheus, fantastically embraced my young mind.

Choosing the biggest, highest, brightest, whitest stool in the dim recesses of the back room which served as a small warehouse for the brothers Bailey, I climbed aboard.

Royally ensconsed and pretending the sentinel flanks of neatly-stacked sewer pipes were my worshipping subjects, I was queen of the realm for the immeasurable long, lazy hours of the rest of the afternoon. If Miss Agnes and my aunts watched me, I was oblivious to the fact.

Princess Grace couldn't appreciate her Monaco throne more than I enjoyed my plumbing shop reign from the heights of the great white enameled john.

I suspect a psychiatrist analyzing this revelation might surmise that the pristine purity of virgin white enamel set like a jewel amidst the dingy pipes might well have been the forerunner of my now imperishable appreciation for the finer things of life.`,
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
    id: 'a-happening-in-new-york',
    place: 'New York',
    lat: 40.7128,
    lng: -74.006,
    year: 1965,
    title: "A 'Happening' in New York",
    // The Best of Madera pp. 14–16 (IMG_0577–0579). The editor's note is
    // the newspaper's, kept because the book prints it as part of the piece.
    body: `**EDITOR'S NOTE: Advertiser Fashion Editor Madera Spencer is in New York for the fashion showings of the American Designers Series and the New York Couture Group. The events began with an unusual party Saturday night and the following is her report.**

NEW YORK, July 1965 — There are a lot of peculiar things happening in New York this week, like peculiar fashion showings in which the kookier designers show voluminous wool dresses with hemlines halfway to the thighs and with matching suede leggings up over the kneecap; but most peculiar of all are the "happenings."

Happenings are the newest fashion of entertaining. They are "simultaneous actions resulting in spontaneous reactions" and are sweeping the city as thoroughly as the sanitation department.

The famed hairstylist Mr. Kenneth had a "happening" Friday night.

Held in the Eastside ground floor, brick-walled studio of fashion photographer Milton Green, the Happening began at 10 p.m. A giant kleig light exploded the sky from the back of a truck parked in the street and interested pedestrians clustered around the doorway to see what was happening inside because blasts of jazz notes whined out into the humid night air.

Inside, Mr. Kenneth, in his usual neat camel colored summer suit, was welcoming his guests and inviting them to "get with it."

First he insisted you stick your face through a hole in the wall in the dim hallway, while from the next room inside you were photographed with your head attached to an artist's sketch of a nude body and wearing one of Mr. Kenneth's famous wigs on your head.

Inside, the dimly lit bare room was crowded with Mr. Kenneth's friends who included journalists from Paris magazines; Betty Furness in bright pink stockings and a little blue and green print cotton shift; ex-heavyweight boxing champion Rocky Marciano; an assortment of beatniks in need of baths, editors from newspapers and magazines, and heaven only knows who else. Several couples with dirty sweat shirts and Beatle haircuts were doing the Frug and the combo called "The Exciters" was blaring out ear-splitting music.

Suddenly out of a huge, cardboard, birthday party cake crawled an oiled-skin, long limbed girl clad only in an iddy bitty bikini and, to the mortification of not a few of those present, she gyrated on top of the cake in the spotlight for the next couple of hours.

Meanwhile, one could stand on a wooden crate next to the wall and have one of Mr. Kenneth's sidekicks affix a set of floppy eyelashes on your eyes and make them up to look like some of the weirder models.

Also meanwhile, right next to you in the crowded smoke-filled room, now carpeted wall-to-wall with perspiring humans, was a blubbering little chimpanzee dressed in an artist's smock and painting oil portraits of people. On the other side was a barrel of cold beer and a trestle table of goodies including grapes and watercress sandwiches.

Other things were going on around the crowded room including a recitation by an anonymous long-haired poet.

And all this time the dancer (who was Sally Kirkland Jr., daughter of Life magazine fashion editor Sally Kirkland) was still bumping and grinding and dripping perspiration in the hot spotlight on top of the fake cake.

When the heat and the beat became unbearable and even the poor chimp seemed to be pretty disgusted with the human race, you bade adieu and hoped a happening wouldn't happen again any time soon.

In fact, you felt that the chimp and you were the only sane ones left in the whole place.`,
    media: [],
  },
  {
    id: 'an-irish-adventure',
    place: 'Cobh, Ireland',
    lat: 51.851,
    lng: -8.2967,
    year: 1967,
    title: 'An Irish Adventure',
    // The Best of Madera pp. 21–23 (IMG_0584–0586). "(1967)" printed at the end.
    body: `After an exciting and successful tour of Europe, memories crowd the mind and the heart in such profusion that it becomes a somewhat difficult project to distinguish the purely personal from the newsworthy. But since any experience is colored and flavored by one's own reaction to it, imparting the splendid pleasures of such a venture is in itself an added joy of travel.

So to begin at the beginning with the first unique experience:

Our party of 21 had been aboard the "Queen Mary" five days when she put into the harbor of Cobh, Ireland, for the first time in her long history of trans-Atlantic crossings. Even in the pre-dawn darkness of the cold April morning, one could almost feel the throb of excitement begin to vibrate through the great ship. As I peered out of the porthole in the darkness, lights of small fishing craft reflected eerily on the black water before we came close to the dim shoreline of Ireland. As daylight crept in, the coast became visible and the rolling hillsides of the Emerald Isle appeared like apparitions through the morning mist, dotted here and there with farm houses, church towers and fortresses.

By full daylight, the ship's personnel were preparing for the boarding of the Lord Mayors of County Cork and of Cobh, and the Captain's reception welcoming them and the Irish press aboard the "Queen Mary" for the first time. The flagpoles and smoke stacks of the great ocean liner were dressed out in flags and banners, this being done only when a ship makes it's maiden voyage or when it puts into a port for the first time, as was the occasion on this day.

Passengers wrapped up like Eskimos against the chilly morning lined the decks, waiting expectantly for the arrival of the boarding party. Then from a distance came the faint whine of bagpipes on the frosty air, and into view came a tender loaded with the honored guests, the Pipe band attired splendidly in green and black kilts blowing in the wind. The music of the bagpipes seemed to work a magic spell as the tender merrily circled the ship, then got into position for the boarding. Off came the Lord Mayors with their keys of office heavy around their necks; then came the other officials and Irish newspaper, radio and T-V staffs.

The bagpipers paraded around the open decks in the high wind, followed like Pied Pipers by flocks of enthralled passengers. They took their places in the stern deck where they entertained throughout the morning. Although the reception was closed to passengers, since I am a member of the press I was allowed to attend the formal ceremonies where Captain Treasure Jones of the "Queen Mary" told the guests what a privilege it was to put into Ireland for the first time, and the Lord Mayor of County Cork and the 80-year-old Lord Mayor of Cobh made responses in their thick Irish brogues. After the formalities, the approximate 200 guests roved the ship from stem to stern, the Irish press people, like press people everywhere, doing their share to gather the news. In fact, at the Purser's request, I was interviewed by Denish Dowling, producer of "Mid-Morning Magazine for Women" of Radio-Telefis Eireann, which is Gaelic for Irish Radio and T-V. Being on the "other end" of an interview was an exhilirating experience especially when it was to go out over the air waves of Ireland. What did we talk about? About the Montgomery Advertiser, and compared notes on fashion and customs.

Meanwhile, Irish women vendors had been allowed to come aboard with their wares of Irish hand-knit sweaters, scarves and jewelry.

Bedlam reigned until the whistle blew for all ashore. To the music of the bagpipes they all went aboard the little tender bouncing in the waves, and in no time at all the little boat was skimming the water toward the harbor between the green rolling hills on either side, the music of the pipes fading sadly into the sun-misted air of Ireland.

(1967)`,
    media: [],
  },
  {
    id: 'perilous-journey-river-road-by-air',
    place: 'Charleston, W. Va.',
    lat: 38.3498,
    lng: -81.6326,
    year: null, // "this past Saturday" — no year printed
    title: 'Perilous Journey: River Road by Air',
    // The Best of Madera pp. 24–28 (IMG_0587–0591).
    body: `"Well, I can't say I'm not glad to be here," said I, in the understatement of the century. It was this past Saturday afternoon and we were climbing out of a four-seater Cessna 'air taxi' in a dreary drizzle on the slippery Tarmac runway of the Charleston, W. Va. airport. If I were an emotional type woman I'd have kissed that dirty old ground right then and there.

It was chilly in the mountain air, but our pilot — a tall, rangy hill man — was perspiring profusely as he handed me down over the wing struts.

My husband's complexion was pale pea-green and the other passenger, a dark-haired young man named Daniel Mezzalingua of New York City, was still benumbed, and at the moment, slightly pop-eyed.

We had just shared a harrowing experience the likes of which you dream about. . . when you've eaten too much garlic and chili peppers.

It all started when we left the fabulous Greenbrier in White Sulphur Springs, the last word in elegance and gracious living. A great grey limousine with chauffeur had driven us to the Greenbrier Airport where the pilot stowed away our luggage and golf-clubs in the back of the small green and silver plane.

A little red plane in which we had arrived a few days before was sitting nearby getting ready to embark. Another limousine disgorged its passengers as our pilot revved the motors for a take-off over the rim of the bowl of mountains in which the Greenbrier nestles in scenic splendor. Our course was supposed to be 81 air miles to Charleston, the route 120 by tortuous mountain roads that require an approximate 3½ hours driving time.

We had not gained 1,000 feet in altitude before even I could tell the ceiling was lower than the mountaintops around us. Being accustomed to transatlantic jets that dive into the murky atmospheric soup and come out 30,000 feet above in brilliant sunsets with clear blue yonder all around, I didn't worry. Then I remembered, this was no transatlantic jet and it seemed to me it took a powerful headwind even to get it off the ground.

The whirr of the motors on the small plane discouraged conversation, which is just as well as I could tell even then no one had his mind on socializing. We were all beginning to think the same thing, no doubt. . . suspended up there amid the mountaintops. Crouched together in the little cabin like four baby birds sharing the same undersized airborne nest, our gathering fear seemed to transmute itself to one another.

The pilot began peering from one side of the windshield to the other as dribbles and rivulets of rain shimmied down the glass. He'd crane his body over Daniel in the front seat to scan what little you could see of the mammoth Alleghenies to the right, and then press his face to the window on his left to see what was under him. Actually there was nothing.

I mean, already we were flying blind. . . no visibility anywhere. . . just now and then a great whopping mountain looming up almost in our faces like a whale coming up for air.

"Let's go back," I whispered to my husband. The look he gave me clearly indicated his opinion of women who change their mind in mid-air.

"Let's just find a little field somewhere and land," I suggested to the pilot in a small, brave voice.

"Hush," said my husband, "don't distract him."

Under the forbidding overhang of dark clouds that seemed to stretch to infinity the wrinkled face of the earth beneath us was fantastic.

The convolutions and contortions of the magnificent mountains all thickly woven with impenetrable dark green, gold and bright orange-red trees, was spectacular. Here and there a winding road looked like a piece of string carelessly dropped and little puddles of lakes reflected the angry sky.

Occasionally a toy-like farmhouse with its surrounding patch-work quilt of cultivated acres perched on the pinacle of a mountain in withdrawn seclusion. The vast unpopulated miles of the dark mountains were sometime broken by little scatterings of villages clustered together in a valley, all but lost in the majestic immensity of the Alleghenys.

Meanwhile, while I was admiring the scenery in breathless wonder and convincing myself that if you've got to go you may as well go in beautiful surroundings but reminding myself I wasn't nearly ready to go, the pilot was making a momentous decision.

Without even asking my opinion which I would have been glad to give him just then, he wheeled the little plane sideways and I found myself face downward at a snake-like muddy river, winding itself in the canyons of the nearly-enveloping mountains.

He cut the engines frighteningly for a moment and we almost glided down toward the river. Daniel looked back at me then with his soul in his eyes. . . it was the only time he showed signs of life during the entire trip, being otherwise riveted to the seat like the upholstery.

The pilot shouted that he was going to follow the river bed. "Lost, that's what we are," I informed my husband. "Shut up," he said to me for the first time in our 23 years of married life.

Down out of the storm clouds we went, periously close to the towering mountains on either side, and thereafter winged our way by river. Its every turn and change of course was ours. . . at one point the New River which we were following down from the mountains connects with the Kanawha and I had visions of our taking the wrong river and ending up out in the Atlantic or where ever it empties . . . that is, if we didn't give out of gas first.

Anyway, our river course got us there eventually. What a gorgeous sight that city of Charleston was, spreading out on both sides of the river with the mountains ominously stretching in every direction. The orange dome of the state capitol looked as welcome as Mecca to the pilgrims.

The red plane we'd left on the Greenbrier runway was already there. The pilot of it came dashing out to meet us, evidently concerned that we had not arrived before him. He said he'd just gone through the storm . . . "Couldn't see a thing for 40 minutes," he said, "and to tell you the truth, had I known it was that bad I wouldn't have gone at all."

Our pilot drawled, "Well, that's why I followed the river. I like to see where I'm going."

Buster, that makes four of us!`,
    media: [],
  },
  {
    id: 'detour-to-newfoundland',
    place: 'Gander, Newfoundland',
    lat: 48.9578,
    lng: -54.6089,
    year: 1975,
    title: 'Detour to Newfoundland',
    // The Best of Madera pp. 29–33 (IMG_0592–0596). "(1975)" printed at the end.
    body: `They say that travel is broadening, but this is not especially true when you are imprisoned with 393 other passengers in an aircraft for more than 13 hours.

I shall not soon forget my return flight from Rome recently, but even now its inconveniences are fast fading as the pleasures of the trip loom ever larger in the memory.

However, the trip is worth recounting.

We were awakened in our room at the Hotel Excelsior at 6:30 a.m. (Rome time), and after breakfasting in bed as is our custom in Europe, put out our luggage at 8:30 and went down to take the bus to Leonardo da Vinci Airport at 9:45.

The bus was late, so we stood outside the Hotel on the Via Veneto in the fresh morning sunshine, shuffling from foot to foot with anxiety.

The 20-mile ride to the airport is difficult at best, for traffic is so congested and thick in Rome that several blocks often takes 20 minutes to negotiate, so one is never sure when one will arrive anywhere, especially the airport.

However, as is the custom in Rome, the plane was also late. Pummeled and pushed, we squeezed in line for seat assignments for the 12:30 plane, only to be told, as we neared claustophobic asphyxiation, that it would be more than an hour before the plane arrived from Iran and Istanbul.

We didn't mind too much right then. We happily munched on Perugino chocolates and drank numerous cups of cappuccino in order to get rid of our last Italian lire.

When we found our seats on the mammoth 747, I was penalized with only half a seat since the lady next to me was a 300-pounder from Malta and one seat can accommodate only so much body, you know. But she was pleasant and didn't talk too much, which is a blessing when sitting next to someone for 13 hours.

Finally the great aircraft taxied out to flight position on the runway. . . and we waited and waited and waited. The Captain came on the address system to inform us that another plane had just made an emergency landing and all the fire equipment was deployed for its safety, so we would have to wait for the signal that the equipment was free before we would be allowed to take off.

It was 2:30 p.m. (Rome time) when we left. . . two hours late.

My mood, which was growing darker by the minute, was lightened somewhat when the flight attendants served me a piping hot dish of cannelloni. It was considerably dimmed again when I found out that due to the flight being programmed to take longer than had been expected (8 hours and 50 minutes) there would be not one but two movies shown. I hate movies on planes. I hate pulling down the shades and shutting out all the sunlight so that the plane interior is a labyrinth of unidentifiable figures slouched down in their seats, their eyes glued to the screen and the earphones making them look like creatures from outerspace.

So I meditated. . . mainly on the fact that we had already missed our connection in New York and there wouldn't be another plane out that night.

At 10:35 p.m. (Rome time) the Captain, whom I was beginning to feel that I knew very well but whom I had not seen, came on the speaker to say that headwinds along our flight path had unexpectedly slowed down our progress and that fuel was running low, but not to worry, we would soon be landing at Gander.

The lady from Malta nudged me and said, "Where's Gander?" I told her it was in Newfoundland, but from the blank expression on her face I could tell she didn't know where that was either. But since we were already late and I like adventure, I began to anticipate landing in an unknown country.

The sun was still high, for after all, it was only late afternoon here, in spite of it being 11 p.m from the time I had gotten up that morning. As the big plane came low over the flat, marshy country, I could look down on thousands of small lakes interspersed with twisting landfalls laid out like a giant jigsaw puzzle beneath us. Not a mountain, not a house, not a city in sight. And then the small airport came into view, and in the distance, clinging to the side of the lake as if fearful of sliding in, there was a small settlement isolated and desolate.

As if giving us a reward for being such good passengers, the Captain came on again to tell us that when he turned the plane to the right on the concourse if we would look to the left we'd get to see Air France's notorious Concord Supersonic Jet. It was well worth a look, for it was as sleek as an eel with a sharp, pointed nose like a needle. Yessir, Gander was doing a rushing business that day. . . the Concord, an observation plane, and now us.

When we came to a halt, all the doors of 747 were flung open to the cool, crisp Newfoundland air, but we were not allowed to disembark, due, said the Captain, to "health precautions". The lady from Malta said, "Whose health?" That was a good question.

I stood in the airplane door, and breathed the clean, crisp air. And then I saw that someone, after all, had been allowed to disembark. . . and his master. But a poor poodle on a 13-hour airplane ride certainly deserved to deplane if possible, I should think.

While the poodle was sniffing around the refueling trucks outside, all the 393 passengers were milling up and down the aisles of the 747, stopping to chat and commiserate with each other about the woes of missing their connections in New York.

Finally at 11:15 p.m. (Rome time), we took off from Gander. On each side of the deserted runway were fringes of soft, green meadow grass dotted with small yellow and lavender wildflowers, and beyond that what looked like brown, dry sagebrush. Looking back over the little flat-topped airport as we ascended, I saw the sky illuminated with silver-lined sunset clouds and colors like the inside of a seashell.

Lovely, yes. But my watch still told me it was nearly midnight and I had awakened at 6:30 that morning. Nevertheless, the good Captain said not to worry, we should be in New York in two and a half hours. What he didn't say was that when we got there we would have to circle in a holding pattern for another hour or so, making it well after 2:30 a.m. (Rome time) when we got to New York, where it was only 8:30 p.m.

The night seemed endless. There was the queuing up for passport control, the fighting for luggage amidst 393 other passengers also fighting for luggage; the queuing up to get a night's lodging, courtesy of the airline of course, and waiting for a bus to take us to the motel and queuing up at the check-in desk for our room with some 300 others who were equally as dead on their feet.

Alas and alack, I was weary, having been up approximately 25 hours. I fell into bed for a few hours sleep to restore my stamina enough to get up early, get a bus to the airport, get tickets changed, wait for take-off, change planes in Atlanta. . . et cetera, et cetera, et cetera.

But was it worth all that physical abuse just to have nine glorious days in Rome? You bet your life it was. I still have my bags packed in case something comes up this week.

(1975)`,
    media: [],
  },
  {
    id: 'holy-year-in-rome',
    place: 'Rome',
    lat: 41.9028,
    lng: 12.4964,
    year: 1975,
    title: 'Holy Year in Rome',
    // The Best of Madera pp. 37–40 (IMG_0600–0603). "(Oct. 5, 1975)" printed at the end.
    body: `The Italian skies were luminous and the air was brisk on the Sunday morning when Anne Hamilton, Jo Reid and I stepped into a taxi in front of the elegant Hotel Excelsior on Via Veneto in Rome. We were joining thousands of pilgrims and sightseers this Holy Year to go to Piazza San Pietro (St. Peter's Square) on the left bank of the River Tiber.

Our taxi ride, usually so wild and reckless in Rome, today necessarily went at snail's pace as conveyances of every imaginable type — from horse-drawn carriages to huge transcontinental buses — thronged the wide thoroughfares and tiny by-ways leading to the majestic site of St. Peter's at the end of Via Conciliazione.

When finally our taxi had threaded its way through the choking traffic to within walking distance of the Square, we alighted amidst the multitudes to push our way slowly the several blocks to the Piazza. In an atmosphere of seemingly suppressed excitement, thousands of people had already staked out standing room around the great, ancient obelisk in the center of the square and near the splashing fountains at either side.

The sun was growing noticeably warmer, so we fortunately found a cool spot beneath the magnificent colonnades created by Bernini in 1656, and which he envisioned as "like the motherly arms of the church which embrace Catholics to reinforce their belief."

As I rested in the shade on the cold stone base of one of the splendid columns, I looked at those around me and those closest to me on the Square. There were groups of nuns in black habits or in white, scurrying after one another like little birds in a covey. There were fascinating Franciscan friars in their brown robes and thong sandals, little changed from the time of St. Francis himself. There were families with small children, some babies strapped to their mothers' backs like little papooses. There were rich men, poor men, beggar men, and yes, probably thieves.

There were hundreds of tour groups among the multitudes, their leaders holding aloft all manner of identification, from leafy branches to flags, and many had signs atop long poles that bounced in the air designating villages or small cities from whence they came. . . Spoleto, Terni, Perugia, Assissi.

The crowds were for the most part Italian, but if one listened there were languages and dialects from the far corners of the world. A huge group of black Ugandans, some in their native dress, hoisted a banner declaring "Uganda" and drew crowds to surround them by beating on tom-toms near the foot of the steps of the Basilica. There were Indians in their beautiful sheer saris, and one little man with the look of a pixie played tunes on a bagpipe made of innertubes and wooden whistles.

As the noon hour approached, the hour of the blessing, I gazed with contemplation into the sun-filled square, now literally filled with some 35,000 people, and thought how here in the year 67 A.D. St. Peter, like his Master, was crucified to death for his faith. At that time, this was Nero's "circus" or sports arena, and nearby was a cemetery where Peter's friends laid the martyred remains of the Prince of the Apostles to rest. The tomb of St. Peter is now directly beneath the high altar of the Basilica. Later in the week I was to go back to visit the underground crypts of St. Peter and the Popes.

But even though meditating on these ancient wonders, I still was aware of the restlessness of the crowds, and I could watch the pigeons swooping down from the colonnades over the Square and hear the gushing waters of the nearby fountains.

Exactly at 12 o'clock, a red carpet was unfolded from the window of the Pope's study on the top floor of the residence to the right of the colonnades, and a great cry of jubilation arose from the crowds. A tremendous applause rang out as the Pope appeared, a wraithlike figure in white from this distance. When he lifted his hands in greeting, many of the pilgrims fell upon their knees on the hot, sun-washed stones of the Piazza. In an almost unbelievable hush and attentiveness, the Pope recited the Angelus and in five languages blessed the crowds. As his voice droned over the loudspeakers in the square, there was little movement from the thousands of people, but as soon as the Pope retreated from the window, there was a great surging tide of humanity toward the Basilica and through the Holy Door.

The massive bronze doors, opened last Christmas Eve by the Pope for the first time in 25 years, will be sealed and bricked over again this Christmas Eve, not to open again until the year 2000 when there will be another Jubilee Year. As crowds surged through the doors, they touched the figure of Christ in bas relief on the right door, his body now golden-hued from the warmth of faithful hands, and startling against the tarnished bronze of the rest of the door.

Just inside the Holy Door is Michelangelo's masterpiece, the exquisite and delicate Pieta. Now behind glass since a maniacal attack several years ago damaged the sweet face of the Madonna, it is nonetheless stirring and awe-inspiring to gaze upon the limp form of the Christ in his mother's arms, the sheen of the polished marble glimmering as though alive.

It is said the Holy Door is symbolical, not so much as a physical door but as a voluntary transition from the mundane world into the House of God. The Holy Year had its beginnings in Mosaic times and was taken up again in Christian times in 1300. It is symbolically a year "of Renewal and Reconciliation, a renewal of faith, hope and love. . . reconciliation with God and with neighbor."

To be among the pilgrims on this Holy Year, regardless of one's church affiliations or lack of them, is to feel humbly at one with mankind. To absorb the beauties and history of the masterpieces of art and sculpture and architecture that are Rome seems to me a rare privilege.

It is said that good art conveys its message without further explanation. When you gaze upon the wonders of Rome, especially St. Peter's where Bramante, Raffaello, Bernini and Michaelangelo, the greatest of them all, used their talents so extensively, it is to understand how it truly speaks in a thousand tongues.

(Oct. 5, 1975)`,
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
    id: 'stone-walls-or-treetops',
    place: 'Mont St. Michel',
    lat: 48.6361,
    lng: -1.5115,
    year: null, // "an afternoon in June" — no year given
    title: 'Stone Walls or Treetops',
    // The Best of Madera pp. 17–20 (IMG_0580–0583).
    body: `It was after 5:30 on an afternoon in June when we approached the ancient stronghold of Mont St. Michel jutting into the English Channel off the northwest coast of France.

As our coach drove from the mainland over the causeway which at certain times of the year is perilously inundated with swift tide waters and quicksands, the great Abbey built in the early Middle Ages on the summit of the rock mountain towered in brooding splendor in the misty afternoon sunlight. Just inside the time-stained city walls, on a narrow twisting cobblestone street, was our Hotel de la Mere Poulard, its rooms clinging to the precipitous mountainside as if they had grown out of the solid granite.

It was late when I finally climbed the narrow, almost vertical steps to my assigned room on the third floor and flung open the French window to see what view it afforded. Views from strange windows are often so indelibly etched upon the memory they become integral recollections of travel experiences.

This one would be especially so.

The smell of the sea was almost tangible. Just across the busy cobblestoned way far below my windowsill, the blackened fortress wall curled from the outside city gate to a crenelated rampart, and beyond it was a panoramic view of the shallow low-tide waters spread out over the treacherous sands on both sides of the causeway.

Enchanted, I stood immobile with my arms still flung out on the windows on either side, letting the stillness and the rarity of the scene seep into my consciousness. I pondered that perhaps this same scene had been thus for long-forgotten travelers to Mont St. Michel over its more than thousand-year history.

And as I reflected, transported by reverie into another era and another time, with fierce, whirring wings a small bird swooped past my face, its lightening-like passage stunning me, its feathers almost brushing my nose.

It darted upward, and following its swift passage with my eyes I perceived just above my head in the corner of the window a small cluster of dried mud like a tiny gray sack blending into the stone of the old building. As the bird perched momentarily at a quarter-sized opening, a chorus of chirps and cheeps greeted its arrival, and as I stood transfixed six tiny opened beaks bobbed at the threshold.

I was as ecstatic as if I had discovered a cache of treasure hidden in the ancient windowsill. The little mother bird, called a house-martin in that part of France I was told, stayed only long enough to deposit into the hungry little mouths some morsel of food she had retrieved from air or sand or sea, then darted out again to continue her foraging expeditions.

I stood rooted to the floor just inside the window, staring at the now quiet glob of dried mud. I had seen similar nests only a few days earlier clinging to the walls under the eaves of castle towers as we visited old chateaux of northwest France. They had been so high they had looked like small bulges in the stone of the towers, but now I had one within arm's reach.

Outside the window, the afternoon sky was filled with swallow-like birds dipping and soaring gracefully over the sands. As I watched them at the window, mama bird, taking no notice of me whatever, darted in again and the same little cacophony of peeps and chirps greeted her, the tiny mouths bobbing again just inside the nest opening.

It must have been 10:30 when I went back to my room after dinner. The window was still open to the gathering twilight, and the busy mama bird was still working as diligently as at 5:30. In and out, in and out, without an interlude of rest. I dropped off to sleep before she did.

I awakened once during the night and listened for the whirring of wings and the begging cries of the babies, but all had been quiet in the darkness. . . not a sound on the ancient rock mountain.

In that part of France at that time of year daylight creeps in as early as 3:30 or 4 a.m. When the first light of dawn seeped in to awaken me, mama bird was already at it again. She was off on another day of providing for her demanding babies. Surely those small wings were exhausted after more than 18 hours of unceasing flight the day before. How long had she stopped during the night?

When we departed that morning, I stood in the now busy cobblestoned street below my window, looking up, up, up to the gray mud nest which was all but indistinguishable from this distance. I wondered how those small babies would ever learn to fly without falling to the cobblestones below.

How very comforting to know the same benevolent Creator who gives precious flight and song to the cardinals and mockingbirds in the green trees and hedges of my own back yard also lovingly gives the confidence of flight to the little creatures born in the gray mud nests incredibly high on the stone walls in France.`,
    media: [],
  },
]
