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
  /**
   * Short label for the places strip, when it should differ from `place`
   * (e.g. 'Cobh, Ireland' for recognizability). The full `place` (her
   * dateline) always shows in the opened entry.
   */
  mapLabel?: string
  /**
   * Label shown beside the pin on the globe (owner's rule, 2026-07):
   * U.S. places show the city or place name; places abroad show the
   * COUNTRY ('Ireland', 'Bahamas'). Falls back to mapLabel, then place.
   */
  pinLabel?: string
  lat: number
  lng: number
  year: number | null
  /**
   * Optional explicit position within a place's chapter. Entries with an
   * order come first (ascending); the rest follow in year order.
   */
  order?: number
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
  label: string
  pin: string
  /** True when the place is outside the U.S. (any entry carries a pinLabel). */
  abroad: boolean
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
      place = {
        place: entry.place,
        label: entry.mapLabel ?? entry.place,
        pin: '',
        abroad: false,
        lat: entry.lat,
        lng: entry.lng,
        entries: [],
      }
      byName.set(entry.place, place)
      places.push(place)
    }
    place.entries.push(entry)
  }
  for (const place of places) {
    place.abroad = place.entries.some((e) => e.pinLabel !== undefined)
    place.pin =
      place.entries.find((e) => e.pinLabel)?.pinLabel ??
      place.entries.find((e) => e.mapLabel)?.mapLabel ??
      place.place
    place.entries.sort((a, b) => {
      const ao = a.order ?? Infinity
      const bo = b.order ?? Infinity
      if (ao !== bo) return ao - bo
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
    id: 'night-time-fish-tale',
    // OPEN QUESTION for owner: the lake-cottage's lake is never named in the
    // piece. Pinned provisionally with Montgomery (home) — if the family
    // knows which lake (and wants its own pin), change place/lat/lng.
    place: 'Montgomery',
    lat: 32.3668,
    lng: -86.3,
    year: null,
    title: 'Night-Time Fish Tale',
    // The Best of Madera pp. 48–49 (IMG_0611–0612).
    body: `It was after midnight and the breeze off the lake had completely stilled. Not a breath of air was stirring and the lady of the lake-cottage gave up fighting for sleep, deciding just to get up and read and make the best of it.

She tiptoed out of the darkened bedroom where her husband was giving nasal testimony that he was having no trouble at all sleeping. She switched on the lamp on the big screened porch overlooking the now-black lake and settled down amidst the little chirping night-sounds to read.

Earlier that afternoon, as was their custom just about dark, the couple had each baited their big cane fishing poles, anchored them with concrete blocks at each end of the little wooden pier in front of the house, and forgot them.

Now, sitting quietly in the lamplight, the lady had a premonition that something was going on out there in the dark on the other side of the pier. She switched on the spot-light and sure enough, her husband's cane pole was bending almost double and swizzles in the water attested that there was something on the end of that line beside the bait minnow.

Out onto the pier she went in her nightgown, snatched up the big pole and as she expected, there was the finest, plumpest, gleamingest three-and-a-half-pound bass you ever saw, still fighting on the end of the line.

Hoping that the neighbors across the darkened lake had not also had insomnia and might now be staring at the nocturnal fisherwoman in her nightclothes on the little pier catching fish, she hooked her finger under the gill of the whopper and returned to the house.

This was too good to keep to herself, so she crept into the bedroom, shook her husband's shoulder and said, "Look!"

It took a moment for him to come to his senses when he opened his eyes and saw his nightgown-clad wife standing in the bedroom with a big, dripping, flipping fish in the middle of the night.

When he was rational, she explained what had happened. "Which pole was it on?" he inquired.

"The one on the left side of the pier," she told him.

"Well, that's MY pole. So its MY fish," he reminded.

"Well, I pulled him in, so it's MINE!" she answered.

"You just don't know anything about fishing, that's all. Everybody knows that baiting the hook is more than half of catching a fish, and I baited that hook on my own pole, so it's MINE," said he.

The discussion continued heatedly while he cleaned the fish. The first rays of the morning sun were turning the dark lake to rosy grey when they finally climbed back into bed.

The refrigerator was filled with succulent, fresh bass filets, but the question remains, "Whose fish was it?"`,
    media: [],
  },
  {
    id: 'a-penalty-for-difference',
    place: 'Montgomery',
    lat: 32.3668,
    lng: -86.3,
    year: null, // no date given — the white sparrow at her home feeder
    title: 'A Penalty for Difference',
    // The Best of Madera pp. 50–52 (IMG_0613–0615).
    body: `Several weeks ago, amidst the fluttery flock of small brown sparrows that take their meals at my house, coming in for breakfast just after the break of day and for supper in late afternoons, I thought I saw the flash of white wings, but told myself surely it must be the glint of the afternoon sun upon iridescent feathers.

Next day, when seed was spread in the small red-roofed feeder house high in the tree, the bird's dining room open on all sides for easy access by our boarders, again amidst the brown was a white bird that stood out from the drab little bevy like Cinderella at the ball.

In unbelief and with great excitement I zeroed in, eye-to-eye, with the binoculars which are always handy, and sure enough, the little creature was a perfect sparrow but solid white, without a trace of color anywhere. Apparently a young one, it fluttered its wings demandingly to get attention from its mother, she as brown and anonymous as all the others in the flock. When mother flew to the birdbath for water, the little white bird followed, sitting on the rim continuing to beat its small wings for attention.

A call to the state wildlife department informed me that, yes, it could be a white sparrow, possibly an albino, but it was very rare. A question to the director at the Zoo informed me that if it didn't have pink eyes it was not an albino, but a "sport." But, he said, it was unusual that a small white bird had survived long enough to fly, since his obviousness so easily attracted predators.

My white sparrow clearly had brown eyes, and he had survived long enough to fly and to follow his mother from feeder to bath to the leafy limbs of the crabapple tree, and then away to the field behind the house after supper.

The odd thing about it was that it never appeared in the mornings for breakfast when the trough was alive with twittering, hungry birds, but it always came for the afternoon soiree. At that time, there was no one else around to see my white sparrow, and I was beginning to need a witness for when I talked about it, my sanity and my veracity were in question, and at best I was put down as perhaps over-zealous in stretching my bird tales.

When finally I got my witness, he said, "Well, I'll be. . .!" in astonished wonder.

After several days the white sparrow no longer fluttered its wings for its mother to put a cracked seed into its beak, for it had got the strength, and perhaps the courage, to join the flock in the feeder.

But alas, when it tried to squeeze into the melee, the fussy, uncivilized brown sparrows literally pushed and nudged it off the edge of the feeder, forcing it to perch perilously on a tiny twig nearby. No matter how many times it tried to get to the seed, it was shunted and scolded away by its brethren.

Why were the brown sparrows so unkind to one of their own? Was it because they were too greedy to share the precious seed, or was it because the small bird was of another color?

If these wild creatures, who know not what they do except by instinct, will banish a bird from their society because it is "different", how much more inexcusable it is for humankind who do know what they do, to be as unjust.

One day the small white bird did not come to supper. I waited at the window until twilight, but there were only the brown ones gobbling up the gift of seed from the feeder.

Had the white bird finally given up? Had it found a feeding place where it was accepted as it was and not ostracized because it was unlike the others? Or had it been stalked and killed by a predator because, in its pristine whiteness and uniqueness, it was easier prey? If so, what a penalty to pay for beauty!

But I still look for it in the afternoons.

I miss it.`,
    media: [],
  },
  {
    id: 'retreat-to-the-sea',
    // The piece names no town ("a small hotel on the sugar-white beach of
    // the Gulf of Mexico"); the owner confirmed it was Gulf Shores (2026-07).
    place: 'Gulf Shores, Alabama',
    mapLabel: 'Gulf Shores',
    lat: 30.246,
    lng: -87.7008,
    year: null, // no date given — an end-of-summer weekend
    title: 'Retreat to The Sea',
    // The Best of Madera pp. 53–55 (IMG_0616–0618).
    body: `The similarity of greyness of sky and sea obliterated the demarkation of the horizon that afternoon when I looked out my window onto an empty gulf beach. It was like looking into infinity. Only the great, angry, spume-encrusted waves, rolling and rolling in thunderous defiance as they broke close to the shore, were visible through the veil of falling rain, and their turbulence seemed unending through the deepening twilight. Turbulent like my nerves, I murmured to no one.

The week had been one of those that strains both body and spirit, and which is the infliction perhaps of the age in which we live. But by chance (or was it?) the morning's meditation had fallen upon the words of Mark 6:31, "Come ye yourselves apart into a desert place, and rest awhile; for there were many coming and going and they had no leisure so much as to eat."

The words leapt out at my frail spirit as if they were a direct answer to supplication for peace, and unhesitatingly I telephoned a small hotel on the sugar-white beach of the Gulf of Mexico and reserved a room for the night. Cancelling engagements, settling pending weekend tasks, and gathering the barest essentials, I drove the 180 miles to the shore, thankfully finding my refuge almost deserted this end-of-summer day.

Now I was alone with the sea, the rain, the greyness, with blessed hours ahead with no telephones or deadlines or voices, for even when those voices are of the beloved they can sometimes intrude on the need for silence.

Those towering, thunderous waves and the lonely beach outside the windows beckoned with immediacy. Without unpacking, I wrapped myself in a raincoat, with a showercap and scarf protecting my hair, and barefooted fled across the beach to the water's edge. The cold, wet sand was intricately and symmetrically pockmarked by raindrops, and at the water's edge each huge breaker was leaving fringes of foam patterned like old Belgian lace. Ecstatic sandpipers paid no mind to me and ran frantically to and fro, their long thin legs propelling like pistons as they sought the delicacies of the deep each wave brought to shore.

As I walked along the deserted beach in the gathering twilight, with only the piercing, plaintive cry of the seabirds for company, the pounding of the waves was like a crescendo of the symphony of the sea, yet as soothing as a sedative. I walked on and on, each step in the rain diminishing the fatigue, renewing the vigor.

When I turned back home, lamps in the small glassed-walled dining room of the hotel were like little beacons in the dusk and I was glad for the night to come.

Although the vehement sea roared all night and its rumbling seemed part of a restless dream, by sunset the next day the sky was mother-of-pearl with puffs of pink illuminated clouds reflecting in calm and translucent water. Where was the violence? Where was the relentless roaring of irrepressible waves? How had they been placated so quickly?

But more than that, my body and spirit were as calm as the sunset and the sea. Weariness was now exaltation; burdens were lifted, joy mounted on wings.

The retreat was complete. My "desert place" had worked miracles.`,
    media: [],
  },
  {
    id: 'southern-snow',
    place: 'Montgomery',
    lat: 32.3668,
    lng: -86.3,
    year: 1977, // dated in the book: (Wednesday, Jan. 19, 1977)
    title: 'Southern Snow',
    // The Best of Madera pp. 77–80 (IMG_0637–0640). Her spellings kept
    // ("squeashed", "lightening sky").
    body: `Tuesday morning just before dawn, when the aroma of perking coffee in the kitchen began to permeate the air in the darkened bedroom, there seemed to be a difference in the usual morning sounds. There were no swishes of tires of early morning trucks roaring down nearby Carter Hill Road. There was no anxious barking from dogs in the neighborhood. Everything was mute. . .quiet. . .like the world was at a stand-still.

I knew before I opened my eyes that somehow the world was different today. What was it?

With a note of urgency in his voice, my husband said through the darkness, bringing that first glorious cup of hot coffee to the bedroom, "Hurry, get up and look out the window. It's snowing. Really snowing!"

Even before the gray daylight crept quietly upon the world, the golf-course behind the house was a blanket of snow. "See how the reflection of the snow makes everything look luminous," my husband said. It did have a phosphorescent look about it in that early morning darkness.

Outside the back door, the leafless gray crabapple tree was decorated with bright red cardinals, and the blackbirds by the dozens who came to breakfast were like silhouetted Christmas ornaments hanging in the tree. The busy little titmouse kept fluttering in a whirr of wings to the orbit feeder, its own domain, and the sparrows ruffled up like badminton balls waded breast-deep on the patio table.

Usually breakfast at our house is the most leisurely time of the day, the time to discuss yesterday and tomorrow with each other. But on this morning, I hurried with the bacon and scrambled eggs and hot biscuits . . .and conversation.

The white world beyond the warm kitchen called me as clearly as if it had a voice. "Come quickly! You'll be rewarded beyond measure!"

Without clearing the dishes from the table, I donned everything warm I could find. Slacks, long heavy socks, two sweaters, scarves, galoshes, a snug wool cap over my ears, warm gloves, a furry coat. If I had fallen in the snow I would never have been able to get up by myself.

When I stepped out the back gate I was in a world alone. . .the familiar places forgotten. Spread out before me was a splendid wonderland of intricate beauty. The expanses of white golf course fairways were pristine. . .frozen blades of grass crunched underfoot. The whole world was a flurry of white, fluffy snow. . .drifting so gently, so effortlessly, so densely. Not a sound. . .how quiet the snow falls, I thought. . .like tiny dancers controlled by a super choreographer.

Alone. . .in a world of inestimable beauty. My footsteps squeashed as they buried in the soft snow. . .Like powdered sugar, I thought. I could not walk forward for long without looking backward to see those footprints following me, zigzagging crazily.

The flurry was at my back down the long fairway. . . where are the greens, I wondered? Gone. No, there is one. I know only because a small red, white and blue flag flutters from a stick where the hole must be, its colors startling against the whiteness.

Turning back uphill, I walked into the woods. At the turn, the flurry was full in my face. . .on my eyelashes, on my tongue. Oh, taste the snow. . .feel it gently, softly slither down the cheeks, like a finger tracing a smile.

Under the tall pines, I looked up into unbelievable beauty. Great spreading limbs overhead were lined with white. . .it's like lambswool padding, I thought. Every little sharp petal of the black pine cones were delicately outlined as well.

Where are all the squirrels this morning, I wondered. One old giant of a tree that must have seen many unexpected phenomena through its years, had a sheltered hole in its trunk. Maybe they are there, I thought. I stood on tiptoe to peek inside, holding tightly to its bark to keep from slipping. The squirrels were not there, but if I were a squirrel that's where I'd be, I thought.

The ground under the woods was frozen hard. . .not soft and feathery like the fairways. The crepe myrtles and redbuds that flower the borders of the fairways in the spring looked like white wedding bouquets. . .

And like a pilgrim going to Mecca, I headed for the small pond, my favorite spot of meditation. . .it always speaks back to me.

Holding my breath and not looking at it until I reached its perimeter, so I could have a special treat, I stopped dead still under the big tree near its bank, then raised my eyes to the pond.

A feeling of pure joy and exultation was my reward. I must have uttered an exclamation aloud, for I heard an echo across the snow.

The tiny pond was frozen all over except around the edges. Snow had settled on the main part of the frozen water, but where there was only clear ice around the edges, there seemed to be tiny crystal stars on the ice in the cold morning air. Across the pond a few blackbirds pecked briskly at the ice. . . their voices uttering pleas through the stillness. Or maybe they were discussing the weather. . .

When I had absorbed as much of this spectacle as my consciousness could support, I turned toward home, glancing through the still thickly falling snow to the borders of bamboo along the winding little road back of the golf course. The spikes of thin, slender leaves of the bamboo made startling patterns against the lightening sky to the east.

As I doubled back over the path I had taken going out, my tracks had already been covered. . . obliterated. . .gone. The Master Designer displaying his handiwork had wiped His world clean again. . .the better to show its beauty.

The gift had been received. . .the thanks given. The footprints may be gone, but the joy and the wonder still remain.

(Wednesday, Jan. 19, 1977)`,
    media: [],
  },
  {
    id: 'destination-accomplished',
    place: 'Rome', // must match the Holy Year in Rome entry to share the pin
    lat: 41.9028,
    lng: 12.4964,
    year: null, // no date given
    title: 'Destination Accomplished',
    // The Best of Madera pp. 81–84 (IMG_0641–0644). Her spellings kept
    // ("Via del Trittone", "zuchinni", "dove'").
    body: `For the past few years, it has at times seemed that my little orbit in life might be in jeopardy of becoming too standardized. With the prudence of approaching middle age, I was perhaps not exploring enough off the beaten path, so to speak, and the cherished spirit of adventure was in peril of growing dormant, if not dying.

Since climbing the highest mountain or swimming the deepest sea was somewhat out of the question, the least I could do, it seemed, was to lend a spirit of adventure to those small things that lay close at hand.

So one bright, crisp morning in Rome, I told my two traveling companions not to expect me back until they saw me coming, and I set off on foot, alone, to find what lay beyond the bustling thoroughfares of Rome which I had repeatedly traversed for years.

I would make it a little more of an adventure, I told myself, by speaking only Italian when asking directions and talking with whomever I chanced to meet. I had learned enough Italian to ask questions: Where? When? Why? Who? What? I knew the elementary courtesies with which the friendly Italians sprinkle their conversation as liberally as they use Parmesan on spaghetti: "Thank you," "please," "beautiful," "very beautiful," etc. With a few other assorted words at my command, I thought I could make my way nicely.

Off I went to the Spanish Steps, without dawdling at the shop windows on Via Sistina. Going jauntily down the wide, famous old steps, I looked neither to the right at Babington's English Tea Room nor to the left at the house where Keats died. I kept a steady pace to Via del Trittone and crossed by way of the underground passage which protects unwary pedestrians from being fatally struck down by the onrushing, maniacal traffic flowing from the Corso to Via Veneto. I was on familiar ground here so I walked quickly.

Instead of turning right to go the usual way to Trevi Fountain, I took the left through tiny, cobblestoned back streets that twisted like wet macaroni, and suddenly came upon an enchanting streetmarket beneath the towering, forbidding rear walls of the Quirinale. I knew it was the Quirinale because I asked the man who sold zuchinni, "Per favore, che cosa?" (Please, what?), pointing to the walls.

I selected a plump, yellow banana from the luscious array of fruits and vegetables spread out on the tables in the square and continued along the back streets which were bustling with morning activity. When I came upon Trevi Fountain by the back way, I sat awhile in the sunshine listening to the sloshing of the waters and ate my banana.

While meditating thusly in the fresh morning air, I decided I really needed a destination to work toward instead of just wandering. With little deliberation I chose the old, old Church of St. Peter in Chains where there is Michelangelo's magnificent Moses, my favorite work of art in the whole world.

"Now let's see here," I said to myself. "How do I ask the way?" I had the St. Peter down pat in Italian (Santo Pietro), and I knew that "dove" means "where", but I was rusty on the "chains." Suddenly it came to me. It was "vongole", started with a "v". I knew what it was. So I asked the first Italian I met, a woman sweeping the cobblestones in front of her little tailor shop, "Per favore, dove' San Pietro in vongole?"

She looked stunned for a moment and then her face broke into a smile and she pointed up the street and gestured to the left. I said, "Grazie", and went on my way. How happy it had made her for me to ask directions, I thought. When I looked back as I turned the corner, she was still watching me curiously and smiling and nodding her head in encouragement. I waved.

I asked the same question next to a group of young Italian men who were unloading sides of beef at a small butcher shop. It not only made them happy, it made them downright hysterical. But they pointed the way and said what I took to be "six blocks".

It would take too long to detail my splendid walk through the back streets of Rome. I talked to shopkeepers, to housewives, to people on bicycles and whomever crossed my path. And the response was the same. . .smiles, grins, merriment, and plain belly laughs, followed by a good deal of gesticulation. How obliging they all were.

The sun was high in the sky and with my shoes off I had rested on a cool stone step that led to a courtyard somewhere before I finally climbed the steep steps through an old bricked tunnel to come out on the sun-washed piazza of the Church of St. Peter in Chains, with Moses waiting inside.

I spent a beautiful hour there, sitting in silence in a little chapel near the altar and looking across the sanctuary at the marvelous marble face of the angry Moses.

When I was restored, I went out into the sunshine and found my way, surprisingly, to a high precipice of the hill overlooking the Coliseum and in the distance the Roman Forum.

Standing in awe on the breeze-swept hill contemplating the ancient ruins spread out before me, I was aware of a young Italian man also gazing at the scene. He said something pleasant to me in English and in the ensuing conversation I proudly told him I had walked all day through the back streets of Rome, finding my way to see Moses by asking, "per favore, dove' Santo Pietro in vongole?"

I thought he would fall off the hillside. He said, "Lady, the word for chains is 'vincoli'. You've been asking for St. Peter in clams."

No wonder they all cracked up. But I got there, didn't I?`,
    media: [],
  },
  {
    id: 'bedlam-at-sea',
    // The story is the crossing itself (QE2, Southampton to New York),
    // so the pin sits mid-ocean. OPEN QUESTION for owner: happy to move
    // it to Southampton or New York if a city pin reads better.
    place: 'The North Atlantic',
    pinLabel: 'The North Atlantic',
    lat: 45,
    lng: -40,
    year: 1980, // dated in the book: (1980)
    title: 'Bedlam at Sea',
    // The Best of Madera pp. 85–89 (IMG_0645–0649). Bold log-date leads
    // are bold in the book. Her spellings kept ("hugh wave", "weazy").
    // OPEN QUESTION for owner: IMG_0647 crops the last line of p.87 —
    // "…the only one of the 2,280 persons aboard who is." Please check
    // "who is." against the physical page.
    body: `One Sunday will definitely go down in my memoirs as a "great" day.

It was with great jubilation that I waved hello to that giant, green lady, the Statue of Liberty, standing majestically in the late afternoon mist of New York harbor. It was with great enthusiasm that I disembarked from the Queen Elizabeth 2, the "greatest ship in the world," and made my way hastily through LaGuardia in New York and on to the "greatest airport in the world" in Atlanta, which, at midnight, was still recovering from its first day of unorganized operation.

Yes, it was great. But the greatest superlative can be applied to the relief and realization that I was home, sweet home, after my greatest experience on the high seas. A hurricane force 12 gale in the North Atlantic is something to remember.

Here are excerpts from my personal log:

**Tuesday, Sept. 16:** Left London at 7. Boarded the behemoth QE2 at 10. This Cunard pride and joy is 963 feet long, 105 feet wide. She has 13 passenger elevators, four swimming pools, two libraries, a gym, spas, beauty shops, banks, clothing, perfume and china shops, and provides lavish international entertainment and educational programs for her passengers.

She also has a hospital. (Addendum: It was to overflow with patients during the next few days.)

Departed Southampton at 11:30 a.m. Crossed English Channel, passing legendary white cliffs of Dover, on way to Cherbourg, France, arriving after dark. Stayed in port until boat train eventually arrived with 300 passengers from Paris, their arrival delayed because of a mechanical failure that left them sitting on the tracks until a new engine was secured.

Passengers wander idly over decks, lost and disoriented, and somewhat dispirited as they queue for open sitting dinner. There are 1,590 passengers on board; 585 in first class and 1,005 in Transatlantic class. The crew for this voyage numbers 960.

**Wednesday, Sept. 17:** Up before 5:30. All clocks are stopped for one hour at 4 a.m, thus making 23-hour days at sea.

My cabin is creaking. Huge swells are heaving outside my porthole. My night steward obligingly staggers in with hot coffee and a Danish, telling me to keep the tray on the floor.

I feel like a Mexican jumping bean in the shower.

I hurry up to deserted, enclosed deck just at daylight. I am astonished to see the vast, dark grey waters have the appearance of mountains and valleys, only those mountains move menacingly toward the ship and the window where I stand. The lonely vigil with the sea excites my adventurous spirit. I stay close to the 7-story-high (above the waterline) window to watch this incredible, imperious display. It is as if it is a contest between Nature's unconquerable power and the man-made ship.

One hugh wave angrily breaks a plate-glass window and crewmen rush to board it up. I telephone some of my group to stay in bed to prevent falls. One lady has broken a wrist in a lunge this morning.

By afternoon the storm worsens. Swells grow more mountainous. They crash unmercifully against the ship's sides. There's a monstrous clatter of breaking glass. The contents of the bar, the china and perfume shop, the dishes and some of the passengers crash to the floors.

The most chaos, however, reigns in the dining rooms. Named the Tables of the World Restaurant, it seats 600 at small tables. The stewards have renamed it Earthquakes of the World. It is a shambles.

Passengers who are well enough to eat are bewildered and enthralled by the choreography of the reeling table stewards who careen to the tables to the tune of a cacophony of crashing crockery. Food slides off platters and my table mate has an array of assorted odoriferous cheese dumped down his back. Our steward is burned by hot coffee. He rushes to the kitchen for salve, then is back in a flash again to join the fray.

The giant waves crashing upon the windows leak watery residues around the windows. Diners unfortunate enough to be seated in uncarpeted areas slide crazily over to someone else's dinner. My table steward says to me, "Lovie, if you'll be getting a wee bit weazy, please don't do it to me." I assure him I am steady and stouthearted and immensely enjoying this unprecedented spectacle. I am possibly the only one of the 2,280 persons aboard who is.

**Thurs. Sept. 18:** My steward brought me coffee at 5 a.m. All portholes have been closed and secured. We are tossing like a cork. During the night a great shudder of the ship made it necessary to grip the sides of the mattress to keep from being bumped out of bed.

I hurry upstairs to take my watch upon the stormy sea. From the average of 28 knots, the ship slowed to eight. . .we seem barely to be moving. The sea undulates and heaves; there is no horizon. The great swells advance from gray nothingness and swerve into geysers of spray and frothing spume. We lurch, we list, we pitch.

Passengers are still weaving drunkenly, walking crab-wise and creeping along the walls for support. Furniture slides, sand filled ash stands turn over spilling contents on the floor. Plants are upside down on cabin carpets.

This is hurricane force 12, meaning winds are between 74 to 82 miles per hour. Winds affect the movement of the sea more than any other force.

**Friday, Sept. 19:** Awaken to a calm sea. It is silent, still. I go to the open stern deck to see the sunrise making a silvery streak across the flat, slate grey sea. There is still no color. Wind force is 2. A school of dolphins roll near the ship. A lonely bird flies over the middle of the Atlantic.

At noon we have come 1,560 miles from England. Smiles replace fear on the faces of passengers.

But rumors run amok in afternoon as we approach another storm. Seas rough up again and visibility is dismal. There is rain and fog. Spirits fall again.

Martha Hughes and Earlene Dunn decide to have a party. Minutes before guests arrive, nature throws a watery punch that demolishes the refreshments and glasses. The steward is vacuuming up glass and potato chips when guests arrive.

**Sat., Sept. 20:** Conditions worsen, then subside. The ship speeds up to 29 knots to make up for the delay. We traverse the Great Bank of Newfoundland; pass the shores of Nova Scotia and Sable Island.

The last night is a partying night. Broadway entertainment brings applause. Names and addresses of new friends are exchanged.

**Sunday, Sept. 21:** Sea calm. Air warm and misty. Church attendance exceptionally high. Capt. Bob Arnott leads the interdenominational service in the theater. A British flag drapes the podium. The bar waiter takes up collection. We pray for Her Majesty the Queen of England and for the President of the United States. In each heart must be a personal prayer of thanksgiving for this safe return.

In late afternoon New York's skyline comes into view. Passengers on the great ship line up happily along the rails in the sweltering sun. We salute America.

It was a great trip. We are home. (1980)`,
    media: [],
  },
  {
    id: 'at-small-hope-bay',
    place: 'Small Hope Bay',
    pinLabel: 'Bahamas',
    mapLabel: 'Small Hope Bay, Bahamas',
    lat: 24.7255, // Small Hope Bay Lodge, Andros Island
    lng: -77.786,
    year: null, // no year given — "that hot June afternoon"
    title: 'At Small Hope Bay',
    // The Best of Madera pp. 90–95 (IMG_0650–0655). Her spellings kept
    // ("over-synthetized", "rolleddowned", "jungledy", "in these water").
    body: `The best way to get the full impact of the incredibly colored waters and coral reefs, the channels and famous Tongue of the Ocean that lie amongst the 700 or more Out Islands of the Bahamas, is to fly over them in a small aircraft at bird's eye altitude. Like a seagull, you look down with no obstruction into the very depths of the sea, the crystal clearness as seemingly close as if you were viewing it from a glass-bottomed boat.

That is what four friends and I did on a recent trip that took us to Abaco in the northeast of The Bahama chain, to Andros in the southwest, and to Eleuthera on the east of the approximately 750-mile area which is within proximity of the southeast coast of Florida.

The morning we left Abaco, we took Bahamasair to Nassau International Airport on the island of New Providence, then in a small five-passenger Bahama Island Charters airplane with a Bahamian pilot, flew the 50 miles to the island of Andros to the west. The pilot wore a white mess jacket with gold stripes on the shoulder, and had the enchanting Bahamian accent which is part British and part Creole, and the courteous manners we were to encounter throughout the islands.

After only a 15-minute flight over cerulean waters which change from azure and sapphire when the coral reef shows through, to deep impenetrable ultramarine when one crosses the Tongue of the Ocean, I could clearly understand why Andros is the least inhabited island in The Bahamas. Coming in over the island lying thickly matted with scrub and tropical forest beneath us, it seemed miraculous to me that the pilot was able to locate a narrow clearing in the jungle-like landscape and bring us down to earth within it. The tiny strip of runway glistening in the sunshine looked like a machete slash in the dense green growth.

The 100-mile-long island is the least-explored of the Out Islands, its mystery remaining intact since nature has endowed its west coast with dangerously sharp reefs and tricky shallows that prevent boats from venturing in, and its interior is infested with rugged tropical forests that discourage intruders as well. But on the island's east coast, along which runs the third largest barrier reef in the world and which is only sparsely populated, there are small settlements with intriguing names like Congo Town, Mangrove Cay, Love Hill, and Fresh Creek.

This area, I was to learn, is a veritable Mecca for experienced divers and sports fishermen. The divers are attracted by the ocean's lush underwater gardens, by the towering pillars of coral and the fascinating caves where it is said pirates once hid their treasure. The continuous ballet of marine life is incomparable in these water, I am told, and it is a supreme challenge to descend the Wall of Andros where the sheer coral reef drops vertically into the mile-deep chasm of the Tongue of the Ocean. They say it is a vast scenic fairyland of underwater splendor there.

The anglers come to fish the creeks and small bays where bonefish abound.

But I must admit, being neither diver nor angler, I was near desperation when we were left unceremoniously on the lonely little runway in the sweltering tropical sun, our clothes sticking to our bodies in the sultry heat. Only the somewhat devil-may-care joviality already established by our small group kept us ambulatory as we lugged the heavy suitcases across the hot sand to the front of a garage-size building which serves as the airport.

But, glory be, our chariot awaited us.

In the hot sun on the dusty, dead-end road, a friendly Bahamian woman was there to pick us up. Her "taxi", the interior of which was like a brick oven on baking day, had been thoughtfully provided by our host at Small Hope Bay Lodge who usually meets his incoming patrons in his pick-up truck. Obviously the taxi was a veteran of a losing battle with the rocky roads of the island for baling wire held some of its parts together, but when all the baggage was stowed in the taxi's sagging trunk we bumped off through the palmetto and pines and over the swash to Small Hope Bay.

Now swashes are frequently seen on the islands. They are swampy low-lands where tides push up under the coral rock and sand. The good news about swashes is that all kinds of jungle flora thrive in the murky waters—tiny wild orchids, water lilies and other vegetation—but the bad news is that so do the critters.

To get to Small Hope Bay Lodge we traversed a narrow "reclaimed" road over a swash to come out suddenly and surprisingly in a grove of magnificent coconut palms bordering creamy, sandy beaches along infinite stretches of ocean in front. It is here that Dick Birch, a Canadian by birth, came more than 20 years ago to find a special peace and substance of life; and by hand, with island craftsmen, built the low-lying, rambling, one-story lodge of native limestone and pine. Through the years cabins have been added and now 20 meander zigzaggedly through the palm grove between the beach and the woodsy swash.

The first jolt to my highly-organized, over-synthetized way of life was that to "sign in" at the Lodge, one writes his name on a sliver of paper which is then thumb-tacked to a small brown box with slots over each name. The box is moved around to wherever drinks and refreshments are being served. In the daytime it might be the sitting room of the lodge where the box sits unobtrusively on a bar made from an ancient sea-washed, sun-dried hull of a dinghy named "Panacea" for which Dick paid 25 cents; and in the late afternoons and nights the box sits on the counter of a little three-sided thatched open bar beside the beach. When one wishes refreshments he helps himself even if no one is there, and makes his mark on a ticket in the slot above his name. The honor system prevails.

The second jolt to my city-bred reflexes was that there are no locks on any doors on the premises—the cabins, the lodge, anywhere. At first I felt panic at the dismal thought of spending a night alone in my rustic room of limestone and unpainted pine rafters, with the swash creatures back of my room making eerie noises in the night and only the expanse of deserted beach and palm grove in front. It drained my courage to the core.

By the second day, I delighted in the freedom and the refreshing trust in one's fellow man, and I contemplated with sadness the world's warranted suspicions and growing necessities for caution.

There are no radios, televisions or air-conditioners, and a telephone line was only put in. Good conversation—open conversation—is indulged in freely, and everyone gathers in a circle of chairs by the thatched bar about sunset to talk, or sits long at table after meals which are taken communal-style, each person serving himself. Identification at Small Hope Bay is by first name only, regardless of whether one is cook, boss, diving master, or guest.

We found that most of the guests of whom there were only about 20 or so when we were there, fly in themselves in their own private planes. Some come to escape the hectic city life for a few days perhaps, but most come to dive with the two experienced diving masters, whose conversation and witty repartee are like scheduled entertainment.

The day we left Small Hope Bay Lodge in a taxi driven by a friendly Bahamian named Lenny will be memorable. His taxi too was held together with wire, and the foam rubber armrests were bare from wear. It took us an hour and a half to travel 35 miles to San Andros Beach Hotel at the north end of the island. The hot wind blowing in the rolleddowned windows also blew in the white dust from the road which mingled like sprinkled talc with the perspiration on our faces and bodies. When the car jolted over a bump, the radio would blare out in my ear. But we all laughed hysterically.

The tune being played on the radio as we bumped down that deserted, jungledy road on that hot June afternoon was "Santa Claus is Coming to Town."`,
    media: [],
  },
  {
    id: 'czechoslovakia-another-world',
    place: 'Czechoslovakia', // her name for the country, never modernized
    pinLabel: 'Czechoslovakia',
    lat: 50.0755, // pinned at Prague
    lng: 14.4378,
    year: null, // no year printed — the Queen's Silver Jubilee she mentions was 1977; owner to confirm
    title: 'Czechoslovakia: Another World',
    // The Best of Madera pp. 96–101 (IMG_0656–0661). Her spellings kept
    // ("doudy", "Czechslovakia" once, "zodiak", "near out hotel").
    body: `It was a dreary, rainy day when we boarded our private motorcoach in Nuremberg, West Germany, to continue a journey across southern Germany to the Balkan countries of Czechoslovakia, Hungary and Yugoslavia.

The group of 18 travelers from this area with me on the Advertiser-Journal sponsored tour to Europe had already had three glorious days in London, seeing all the colorful preparations for the Queen's Silver Jubilee, visiting the Tower of London and Madame Tussaud's Wax Museum, among other landmarks. We also had had several splendid and invigorating days in Zurich and Lucerne, Switzerland. But the rain had begun to fall on that Sunday when we rode comfortably through the Black Forest area, stopping to view the natural wonder of the magnificent Rhinefalls on the Swiss-German border, quaint villages like Dinkelsbuhl and Freudenstadt, and with lunch at the hilltop hotel, Schoneblick, in Stuttgart.

Even in the rain, the exquisite neatness of the German countryside is remarkable, every verdant field of grain and every vineyard seemingly devoid of one unwanted blade of grass. Almost every farmhouse with its stables attached and neatly stacked hayrack and woodpile looked like a painting by Durer.

It was with some apprehension that we approached the heavily guarded Czechoslovakian border, for we had been regaled with tales that a tour bus sometimes had to wait as long as five hours for the visa inspection by the patrols. We also had been told by our German-born courier "to sit quietly" while the inspector was aboard the bus, which we took to mean "no good-natured American wise-cracks, please."

On the German side of the crossing, it took only 15 minutes for the officer to inspect our passports. Then the long barrier rail was lifted and we were in a "no man's land" to the Czech side. Since there was no long line of cars and trucks and buses which we were to encounter at other border crossings, we assumed that perhaps more people were wanting to get out of the country than in. When I saw the towers manned by guards with rifles just beyond the checkpoint, I briefly had the same sentiments.

While the Czech officer in his dark green uniform with epaulet insignia depicting the head of the German shepherd dog went down the aisles of the bus looking each of us in the face with an intense stare and checking our identification, there wasn't a sound, believe me. Adjustments had to be made on our visas, such as the addition of the make and color of the bus in which we were riding, as well as a list of all our valuables like watches, gold bracelets and diamond rings. But the officer was very polite and even ventured a faint smile now and then. All in all, it took us about 45 minutes to pass inspection and be allowed to enter the country.

But a funny thing happened when we first stopped at the border station, which is located in a remote wooded section of the countryside. We had no more than stopped before a grand-motherly, doudy little woman knocked on the shut door of the bus and told our courier she had been sent to accompany us during our travels in Czechslovakia. We were never told by whom she had been sent, but Mrs. Yakyak (at least, her name sounded like Yak-yak) went with us morning, noon, and night for the whole time we were in the country, even to all meals in the hotel and to the theater.

While we sat waiting quietly for the inspection to be completed, we watched with curiosity the fate of a small automobile in the out lane of the border station. Its two elderly occupants were made to unload all their luggage, and to spread the contents on the ground nearby. Then even the seats of the little car were taken out and inspected on the roadside. It was finally repacked, and allowed to cross the border into Germany.

When the border guard gave us the all-clear signal and the restraining arm of the barrier was lifted, we passed beneath the tall watchtower with its rifle-carrying guards, and saw in the woods to the right of the road iron-barred cages of off-duty guard dogs. We passed several soldiers along the road leading on-duty dogs.

With a lunch stop in the bustling, air-polluted, beer brewing city of Pilsen, we drove through countrysides of rolling fields of brilliant yellow hops, laid out like soft carpets across the landscape, past woodlands studded with small lakes and ponds, and little villages with deserted market squares and street-lined houses with window-boxes of roses.

Actually hops have been cultivated in Bohemia since time immemorial, and regulations for their utilization and export were issued as far back as the first decades of the 14th century. Some of the fish ponds we passed had been established as far back as the Middle Ages, and the countryside even now is filled with wild game including hares, pheasants, boars, red roe and fallow deer. Castles and chateaux dot the countryside, and as you enter the old city of Prague on the Vltava River, you see architecture and monuments ranging from the Romanesque (10th and 11th centuries) and Gothic (Middle Ages) through the Renaissance and Baroque of the 15th through the 18th centuries.

The morning of sightseeing in Prague took us on a short walk from our modern hotel to Old Town Square where the ancient Gothic Tyn Church stands guard over a square filled on this morning with benches on which old people and young mothers with infants in baby carriages sat languidly among the pigeons in the pale sun.

We gathered with flocks of lively little Hungarian school children to watch the Old Town Hall's "horologe", an astrological clock that has shown the seasons, months, days, hours, minutes and zodiak signs for the past 600 years. When certain hours of the days are struck, a small skeleton at the right of the astrological face pulls a bell to start other figures to moving and dancing, and finally a bronze rooster at the top flaps its wings just before the hour is solemnly chimed. Hundreds gather to watch the performance each day, as has been done for ages past.

On the days that followed, we marvelled at the richness of St. Vitus Cathedral on the hill with Prague Castle high across the Vltava, at the remarkable and beautifully-preserved libraries of Strahov Monastery, and the nearby Golden Lane of small shops built into the castle's fortification walls. It is so called Golden Lane because goldsmiths once occupied the tiny cubicles which earlier had served as quarters for the castle's domestic servants. During the last century, the tiny rooms of Golden Lane were popular abodes for Bohemian artists and writers, and now are craft and stamp shops, and yes, even in Prague Castle, souvenir shops.

We were warned repeatedly not to sell American dollars on the black market, and several of our group were approached on the street with offers to change money from dollars to Czech korunas or crowns "at good value." But since it was against the law, you can bet no one dared.

Stores in Czechoslovakia, a socialist country, are all state-owned, and we found them poorly stocked, some almost bare. There was a half-block long queue at one small grocery shop near out hotel, the dejected looking men and women waiting patiently in line with empty shopping bags.

One event that kept us chuckling for hours was when we stopped in the small city of Tabor to view the ancient cathedral and old town square. What we actually did, however, was scurry like a covey of quail behind Mrs. Yak-yak across traffic-filled highways and busy crossroads in search of the local W.C., which turned out to be located underground in a grassy plot in the center of the bustling intersection. When finally found, there still remained the usual financial hassle over who had enough koruna to pay the dour looking attendant for the use of the Necessary. (Nobody uses one free in Czechoslovakia.)

Our last meal in Czechoslovakia was in a small hotel in Trevor, near the Austrian-Czech border. After lunch, Mrs. Yakyak departed nonchalantly, walking off through a weeded stretch of deserted land at the edge of the small village. We waved goodbye as we drove past her on our way to gay Vienna, and the last we saw of the small, somehow pathetic figure, she was walking alone in the weedy grass beside the dusty road.`,
    media: [],
  },
  {
    id: 'feathered-freeloaders',
    place: 'Montgomery',
    lat: 32.3668,
    lng: -86.3,
    year: null, // no date given — spring through "now the icy winter" at the Spencer house
    title: 'Feathered Freeloaders',
    // The Best of Madera pp. 102–104 (IMG_0662–0664). Her mockingbirds.
    // Her spellings kept ("mocking birds", "cheesey").
    body: `"Listen to the mocking bird; listen to the mocking bird."

Remember that old song?

Well, the words of that old ditty mean more to me now than they used to.

You see, I have a pair of mocking birds that vocally demand special attention. In fact, they're permanent boarders at the Spencer house.

Back when spring was in the air and April was soft and fragrant and gentle, a pair of young mocking birds joined the jubilant feathered freeloaders that cluster around our back door from dawn to dusk.

When they first began coming for breakfast, they perched perkily on the crabapple tree limbs that reach out toward the kitchen door, and even through the fluffy, pink blooms of the blossoming crabapple tree, we could tell these two characters seemed to possess unusually curious personalities.

Knowing that mocking birds are partial to protein and goodies like apples, I could only supply the apples for them. I refused to catch their insects. But they seemed to expect more from me. While the other birds flocked to the wild bird seed scattered on the ground, those two little creatures, not long out of the nest, just perched there saucily and looked me in the eye — imploringly, I do declare.

One day in all the melee at feeding time (now all the time is feeding time), I put a few fingers' full of shredded cheddar cheese on the roof of the small storage house beside the back steps.

Keeping one eye on me and one on the cheese, the largest of the mocking birds swooped in to gobble up the feast, and thereby established a pattern that has flourished through the hot summer, the glorious fall, and now the icy winter. The larger one comes first, then the smaller takes the leftovers.

By mid-summer the two mocking birds had begun sitting on the edge of the roof outside the door, where they have a clear view into the kitchen. Side by side they stare in at me. I began to feel guilty when preparing a good meal for us without first giving those mocking birds their cheese.

When the pigeons discovered the bounty on the roof, they came in by the dozens. While they gobbled up everything in sight, the mocking birds' piercing little eyes stared gloomily into the kitchen.

Well, we've worked out a scheme, the mocking birds and I.

I get all the food on one tray — millet seed and corn, sunflower seeds (they're for the cardinals), and the grated cheese for you know who. First I toss out the wild bird seed and the waiting pigeons scramble gluttonously to the ground. Then quickly I sprinkle the cheese on the roof for the waiting mocking birds, who are almost within arm's reach. They know now to fly down quickly to eat their meal before the pigeons have finished and come foraging for more. I can almost touch my mocking birds, they have become so tame. They come soaring in from the fence or the trees whenever the back door opens. Their territory, like their spirit, is invincible.

But each day now when the wintry wind is blowing and the frosty nights and icy dawns often take their toll, I hurry to the back door to answer their call. In the dimness of first break of day I look up to see the two little birds, side by side on the roof by the kitchen door, feathers ruffling in the cold wind, calling for their cheesey delights.

Sometimes if one is a few seconds late, my heart stands still.

How long, I wonder, can these delicate creatures survive?

And then I remember. Whatever a life span may be, it is quality, not quantity, that counts.

My little mocking birds must qualify for immortality, for they've brought months of untold pleasure.`,
    media: [],
  },
  {
    id: 'master-of-suspense',
    place: 'Los Angeles, Calif.',
    mapLabel: 'Los Angeles',
    lat: 34.0522,
    lng: -118.2437,
    year: null, // no year printed — she visits the "Vertigo" set (the film was released 1958)
    title: 'Master Of Suspense',
    // The Best of Madera pp. 105–107 (IMG_0665–0667). Her spellings kept
    // ("Montgmery", "draftmanship", "movie directions", "was an art director
    // of", "Jimmie Stewart", and "Stewart and Bel Geddes" without "Miss" on
    // the second mention).
    body: `Sitting beside me on the sofa in a tiny private dressing room rolled onto a huge sound stage on the Paramount lot in Hollywood, talking quietly and seriously about a man who had vertigo and whose whole existence was tied up with this appalling fear of heights, was the master of suspense himself, Alfred Hitchcock. He was telling me the story of his new picture "Vertigo," the name of which had been changed from "Among the Dead."

This celebrated director, whose antics during his television series, "Alfred Hitchcock Presents," leave viewers wondering what's to come next, and whose movies such as "Rebecca," "The Man Who Knew Too Much" and "To Catch A Thief" are super-suspense mysteries, is a pleasant and charming conversationalist.

Immediately after our introduction he asked me all about Montgomery, and as a photographer snapped our picture he was asking me jokingly if Montgmery were named for British Field Marshall Viscount Montgomery. As soon as his questions stopped, I got in a few myself.

Hitchcock was the son of a London poulterer and even as a small boy acquired the urge to travel. He used to ride the buses to the ends of the lines in London and for a hobby kept a huge map of the world on his wall. Each afternoon he asked a newsdealer to let him see Lloyd's bulletin, then hurried home to mark with flag-pins the positions of British ships throughout the world.

He was educated in a Jesuit seminary and the University of London and studied art and engineering. He says the two subjects aid him enormously in the complex job of movie directions, for he uses technical draftmanship to create scenes before the camera.

He never looks through the camera, unlike other directors, but sketches his scenes in advance and knows precisely what he wants before arriving on the set.

His first milestone in movies was an art director of "Woman To Woman" in 1923, and from then on he moved up the ladder of success, adopting unique methods of getting ideas across on the screen and building up suspense and interest.

He says, "You ask an audience to look at a square frame for an hour and a half at a time. You've got to put something in there to keep 'em looking."

He was nominated for an Academy Award four times, for "Rebecca" in 1940; "Lifeboat" in 1944; "Spellbound" in 1945; and "Rear Window" in 1954. In addition, he has received high acclaim and won many awards from other mediums.

Hearing him tell about this latest picture, starring James Stewart, Kim Novak and Barbara Bel Geddes, was almost as good as seeing it.

Outside the dressing room, a scene in Miss Bel Geddes' apartment was being set up. Jimmie Stewart and Miss Bel Geddes, the camera and sound crews had taken their places, and still Mr. Hitchcock calmly continued his account of the picture for me. Finally when the story was over and I had thanked him for his courteous reception, he suggested I go around close to the camera to get a good view of the filming.

Out on the set behind the shell of the apartment walls, which represented the commercial art studio of Miss Bel Geddes in the movie, a tremendous colored aerial photograph of the San Francisco skyline illuminated from behind with bright lights giving the appearance of sunshine, was placed behind the fake windows. Stewart and Bel Geddes were seated in the living room and after Mr. Hitchcock gave them a few quiet instructions, the cameras rolled. Once Mr. Stewart faltered in his lines and they started over again. The sequence lasted only about 3 minutes, and was done over and over and over, the make-up man coming in between takes to dab a little more color on Stewart's wrists or to adjust another small detail.

In contrast to the other movies I had watched that week, the atmosphere was quiet and unhurried and there were no shouts or bustling about on the set.

Perhaps Mr. Hitchcock's premeditated scene-laying could account for the difference. But whatever it was, the public can look forward to Paramount's "Vertigo," since the tag "Produced and directed by Alfred Hitchcock" means the master craftsman has left no stone unturned to present entertainment at its best.`,
    media: [],
  },
  {
    id: 'hollywood-heyday',
    place: 'Los Angeles, Calif.',
    mapLabel: 'Los Angeles',
    lat: 34.0522,
    lng: -118.2437,
    year: null, // no year printed — the Hemingway film she watches being made was released 1962
    title: 'Hollywood Heyday',
    // The Best of Madera pp. 108–111 (IMG_0668–0671). Her spellings kept
    // ("Hemingway's Young Man", "hugh kleig lights", "Orson Wells",
    // "Fresque Isle River", "riverlets", "Alcoa, Webb and Knat",
    // "delapidation", "the 'Welsh town" with its stray opening quote, and
    // "it was to go too to make room"). Spaced ellipses ". . ." as printed.
    body: `The big sound stage No. 5 on the 20th Century-Fox lot in Beverly Hills was all abustle when I visited the set of the filming of "Hemingway's Young Man." When I stepped out of the sunlight inside the big stucco building I was suddenly transported to the upper wilderness of Michigan.

High off the floor, a murky pond surrounded with hills covered with pine trees, stumps, bushes and dense growth rose in front of me, a little log cabin perched on the hilltop to the left. It even smelled like the north woods, the scent of pine needles permeating the air. Surrounding the woods on three sides was a great ceiling-high blue-painted canvas curtain — the sky in all its glory.

Above us the rafters of the great building were a maze of pipes and lights. . .I was to see later a dense and blinding rain pour over the set from the overhanging pipes. . .giant wind-machines off the set whipping it into a blinding storm.

Men in hip boots were wading around in the lake, adjusting bushes and rearranging the growth on the banks. . .one man had a tree in his arms carrying it across the pond. Others were adjusting the hugh kleig lights for just the right effect. It was fantastic.

My host for the day, Julian Myers of the Fox publicity department, who had fetched me from my hotel for the occasion, introduced me to Director Martin Ritt. Although busily engaged in getting the next shots ready and dictating to a secretary following him around the set, Mr. Ritt took time to explain some of the goings-on to me. A man of great ability, he directed "Long Hot Summer," with Orson Wells, "Houseboat" with Sophia Loren, "The Sound and The Fury," "No Down Payment," and a host of other first-rate movies.

Next I met handsome young Richard Beymer, who plays the starring role of Nick Adams in the Hemingway movie, and Mike Pollard of "Bye Bye Birdie," who were viewing rushes of shots on a small projector off to the side of the set. Richard Beymer, 22 years old and 6'1½" tall, also starred in "West Side Story" and "The Diary of Anne Frank." He's one of the hottest properties on the Fox lot, to use Hollywood language.

All of the characters were dressed in woodsmen clothing, and when the photographer snapped our picture, Richard said, "I'm not dressed very fittingly to have my photograph made with a fashion editor."

One of the most charming actors on the set was Simon Oakland, who plays the role of the husband of an Indian woman who is "saved" by Dr. Adams (Arthur Kennedy) in the movie. Mr. Oakland, a New Yorker, came to Hollywood in 1958 with the Lunts in "The Great Sebastian," and stayed on to play the part of the newspaper reporter in "I Want to Live," with Susan Hayward; the role of the psychiatrist in "Psycho," as well as many television roles in "The Defenders" and "The Untouchables."

I had the good fortune also of meeting and chatting with Monty Elliott, assistant art director of the film in progress. He told me it took more than two months to erect the woods-set described above, and its cost was over $30,000 "including the rain," he added.

The set had been used in nine different sequences in the filming. . .one time a train trestle had been erected over it for a sequence. He said, "See that dirt along the banks of the pond? That's cement really. . .it just looks like dirt."

We strolled over behind the "sky" to a rustic three-sided room of a mountain cabin. Here was where the inside shots of the cabin located on the hill would be made. . .the sequence of Dr. Adams performing the operation on the Indian woman in the movie. . .All this. . .pond, woods, log cabin, inside of log cabin, and Heaven only knows what else set up inside one building! Truly the resourcefulness of Hollywood is astonishing.

Sequences also were made in Verona, Italy, as well as at the mouth of Fresque Isle River in Michigan.

When we started to leave to keep a luncheon appointment at the commissary with actress Lili Gentle, Richard Beymer said, "I think we'll be here a little longer. We have to shoot the storm again before lunch."

Already the towering pines were glistening with water from the previous rainstorm. . .the cement dirt running riverlets into the murky pond.

The sunlight outside came as a shock to my senses. One minute the intensive activity of the north woods set, the next the warm sunlight and brilliant stucco buildings landscaped with blossoming California flowers.

Late in the afternoon when it was time to say goodbye, Julian drove me through what is left of the 20th Century Fox lot. When last I was there the Lot spread out over 272 acres. Now there are only 72 acres left. . .the 200 acres sold to Alcoa, Webb and Knat for the erection of a great development to be called Century City. Already modern apartments were being erected. . .once we saw a great sound stage on wheels being rolled off to make room for buildings going up almost under it.

The massive equipment that used to spread out over the whole 272 acres has been stored in the streets, in the remaining sound stages — everywhere there's an inch of space available. One has literally to step over it to navigate through the concentrated area of the Lot now.

The quaint "towns" that used to dot the landscape like figments from a dream. . .the old western city streets, the New England houses, the street of "little old New York" with its brownstone tenement "fronts," the 'Welsh town where many war movies were shot. . .all are in a state of delapidation and waiting for the wrecking crews to get to them. It was a sad sight to me. Like riding through deserted ghost towns.

We passed the now lonely bamboo grove where on my last trip out I had watched the unbelievable filming of the Boar's Head Ceremonial scene from "South Pacific". . .it was to go too to make room for the rising modern metropolis of Century City.

When one dream goes, another is ready to take its place — but then Hollywood is a land where men's dreams are put into being.`,
    media: [],
  },
  {
    id: 'how-not-to-do-nothing',
    place: 'Montgomery',
    lat: 32.3668,
    lng: -86.3,
    year: null, // no date printed — an afternoon at home during her newspaper years
    title: 'How Not To Do Nothing',
    // The Best of Madera pp. 112–114 (IMG_0672–0674). Her spellings kept
    // ("bursquely"); the spaced-out "N o t h i n g" and the capitalized
    // NOTHING/MOTHER are as printed. Spaced ellipses ". . ." as printed.
    body: `An inveterate reader of "how to do" articles, I came across one the other day that gave me pause. . .for a second. It said that everybody, just everybody, needs to take an hour now and then to do absolutely nothing. It asked, "When have you stopped an hour in your busy life to meditate and be alone with your thoughts?"

Well, I said to myself, maybe that's what I need. I'll read for one whole hour without interruption.

No, continued the article, what you're supposed to do is N o t h i n g. . .not one solitary thing but Nothing.

Now I'm not the kind of person who just sits and does nothing for nothing. I thought back and sure enough, days had gone by since I had sat still for ten minutes (no, make it five) and done nothing. There seem to be things to do every minute when you work on a newspaper, keep a home, cook, shop, and carry on a fairly normal social life. But do nothing? Heavens to Betsy, when was the day?

Being one who will usually give a new idea at least a try if it might improve a situation, I decided to Do Nothing for one little hour. I had visions of myself looking bright-eyed and vivacious, enthusiastic and shining when that hour was up.

The article had said, "Sweep your mind of all mundane thoughts." I settled down in a reclining chair, mentally picking up the broom, when the telephone rang. It was my mother.

"What are you doing?" she asked.

"Oh, nothing," I told her truthfully.

"What do you mean, doing nothing?" she said.

"Oh, I'm just not doing anything," I assured her.

Pause. . ."Oh, are you reading?"

"No, I'm just sitting," I told her.

"What's the matter? Do you feel bad?"

"No, I feel fine. I'm just doing nothing."

"Well, you better see about yourself if you feel bad."

"But I don't feel bad; I'm just doing nothing."

"I sure hate to see you come down with a virus or something," she continued.

"But mother, I don't have a virus. I don't have anything. I just wanted to do nothing for a little while."

"Well, maybe you need some vitamins; they'll perk you up," she assured me.

"But MOTHER, I feel great. I was just doing nothing for an hour."

"Well, you rest a little and you'll feel better. Call me if I can do anything for you," she said obligingly.

Fifteen minutes of my hour had slipped by, so I made myself a cup of coffee to calm my nerves and went out onto the patio to get away from the telephone.

A neighbor was mowing the lawn beyond the fence and greeted me with a wave. "Hi, what're you doing home this time of afternoon?"

"Oh, nothing. . .just nothing," I told her. The look she gave me as she heaved on the mower said eloquently that it is a good thing for the world that everybody doesn't just sit around doing nothing.

It was too much; and anyway, 30 minutes of my hour had passed.

Back in the house the telephone was ringing. It was my husband.

"Hi, what're you doing?" he asked innocently.

Oh no, I thought, here we go again. But I remained staunch.

"Nothing," I said rather bursquely.

"Nothing? You always tell me you're always busy," he laughed.

This was the end. "Well, darn it, I'm not doing one single, solitary miserable little thing. . .nothing. . .absolutely NOTHING, do you hear?" He could have heard me in town without the telephone.

Surprise in his voice, he said sweetly, "Well, honey, I'm sorry you don't feel so good. Now don't you worry about supper. You just run along and dress and we'll go out to eat."

I didn't go though. I was too exhausted to dress.`,
    media: [],
  },
  {
    id: 'the-refugees',
    place: 'Eglin AFB, Fla.',
    mapLabel: 'Eglin AFB',
    lat: 30.4833,
    lng: -86.5254,
    year: 1975, // dateline "EGLIN AFB, Fla., May 1975"; ends "(May, 1975)"
    title: 'The Refugees',
    // The Best of Madera pp. 115–118 (IMG_0676–0679; IMG_0675 duplicates
    // p.114, so photo numbers shift by one from here). The Vietnamese tent
    // city after the fall of Saigon. Her spellings kept ("Huyntt Van Long",
    // "the 5-month-old baby of her sister" as printed, "oa dai" twice,
    // "narrowlegged", "reedthin", "frisbies"; the tent count 339 = 222 + 148
    // is as printed).
    body: `EGLIN AFB, Fla., May 1975 — When you stand in the shade of one of the few scrubby pines bordering the sprawling tent city of the Vietnamese camp, the first thing you notice is the utter quietness that almost envelopes the landscape. You hear a few insects lazily buzzing in the stifling summer heat and you hear the faraway drone of supply trucks creeping along the brown, deeply rutted roads. Now and then you can even hear soft voices wafting from the dim interiors of some of the tents.

But mostly you just stand there trying to comprehend that on this treeless Florida preserve in front of you, mushrooming with dark green tents like giant growths out of the sandy soil, are living 2,519 people 12,000 miles from their homeland.

One of these people is Tran Thi Suyen. She sits quietly on her cot in a tent which is now home to 12 members of her family. On her lap is Mai Lan, the 5-month-old baby of her sister, and around her are small brothers and sisters trying to amuse themselves through the long morning by playing cards. The flaps of their tent are rolled high to catch as much breeze as possible in the terrible heat.

Tran Thi Suyen says she and her family were able to get out of Saigon because her sister worked at the American Embassy. They brought almost nothing with them, but Tran Thi Suyen smiles and says she "likes everything" about the camp and is just thankful to be there.

She is able to tell you of her feelings through a young Vietnamese interpreter, Mai Dung Mahoney, who is married to an American pilot and is helping authorities at the camp.

Another one of those 2,519 persons who fled for their lives only a week or so ago is Hua Mai. She speaks English and tells you she owned her own industrial chemical company in Saigon, where her husband was a dentist. She has her four children with her and says the day they left the shooting was so bad on the streets that she feared for their very lives.

Huyntt Van Long, who was an aide at the U.S. Embassy, says he was the only one of his co-workers to get out. He and his wife, who is a North Vietnamese and speaks no English, were airlifted to the 7th fleet on April 29. They spent seven days on a boat and were taken to Guam. He says he hopes someone will give him a chance to work and that his wife can do housework if she only gets the chance.

Pham Thi Tuong Vi and her three young brothers asked the photographer to please take a picture of them to send to their parents in Vietnam who did not get out. They say they themselves got out only on the last day and were carried to the aircraft carrier Midway, then to the Philippines and on to Guam before coming to Eglin May 9. It took them 11 days of travel to get there, and although they were exhausted, they were thankful they were finally safe. But they worry about their parents in Saigon.

The young people you talk to seem to take their plight philosophically, but the old ones look at you blankly as if to wonder how their world could have changed so drastically. The young nearly all speak at least a smattering of English but the old are puzzled and weary and sad.

The operations officer tells you there are 339 tents in the compound. Of these, 222 are for sleeping (they all contain only rows of army cots). Clothes are strung out on wires or strings, and each tent has a brilliant yellow latrine in front of it — row upon row upon row of them. There are 148 tents for support purposes.

A grizzled master sergeant in the kitchen tent says he's serving 7,500 meals a day. The menu for today is Creole chicken and rice, and beef stew. But he says the 56 cooks try to prepare food the people will be familiar with, like rice and shrimp and fried tuna. He says some of the people tell them it's the best food they've had since they left home.

There are six dining areas and people line up in long, winding queues in the sweltering sun to pick up their plates and drinks.

One cluster of tents houses support groups such as the Red Cross, the YMCA, airline ticket office and money exchange. Along the row is a tent manned by a Family Services volunteer where there are only stack upon stack of disposable baby diapers, and shelf upon shelf of jars of baby food. These are free, of course, as is everything else in the camp.

Although many of the people wear western clothing which has been donated by various agencies, some of the older proudly wear the Vietnam "oa dai", the black narrowlegged cotton pants with white blouses. One wrinkled, reedthin grandmother with skin like crinkled tissue paper trudges through the hot, dusty sand to the dining room in a sheer white oa dai, with a parasol keeping the violent noonday sun from her frail shoulders. This old lady's son tells you that 15 of her family were able to escape from their homeland.

But ah, the children! They are everywhere. Between the rows of tents they play ball. In the compound areas of the tent sections they toss frisbies in the air. They play tag. Some swing gaily in the YMCA playground. Little ones run after the larger ones, crying for attention.

And then there are others who lie listlessly on their cots in the hot tents, gazing at the dull green canvas roofs of what have now become their homes.

What will their world be like?

Thank goodness, many of them are too young to ponder.

(May, 1975)`,
    media: [],
  },
  {
    id: 'voices-from-the-sea',
    // OPEN QUESTION: the piece never names the beach — only "the silver
    // beach outside my bedroom window." Pinned with Gulf Shores because the
    // owner placed her other unnamed beach piece (Retreat to The Sea) there;
    // owner should confirm or move it.
    place: 'Gulf Shores, Alabama',
    lat: 30.246,
    lng: -87.7008,
    year: null, // no date printed
    title: 'Voices from the Sea.',
    // The Best of Madera pp. 119–121 (IMG_0680–0682). The title is printed
    // with its period. Her spellings kept ("marcelled hair", "echos",
    // "windowframe"). Spaced ellipses ". . ." as printed.
    body: `I go to the beach to listen to the sea.

It always speaks to me. . .Sometimes it tells me lovely things. When it is opalescent with sunshine and its waves are like marcelled hair, it often soothes my conscience and says that life is easy and bright and enduring, and always will be so.

But sometimes it speaks harshly. . .It tells me things I might not otherwise hear. Like the other night. . .

I love the sea best when it is thunderous and commanding and vehement. On this night, the silver beach outside my bedroom window was dark and deserted and chilled, and the black sea roared magnificently in the moonless night. Its great breakers crashed resoundingly on the slate-gray sand, and I prepared for bed with anticipation of listening to it through the night. It would lull me and refresh me. . .and speak to me.

My windows were opened wide to its sound, and the salty night wind flapped the draperies like Japanese fans at each side of the windowframe. The wooden-slatted blinds rattled like echos of the sea. I pulled the blanket high and settled in the dark, waiting for the lullaby.

But through the sound of the pounding of the surf, a tiny clang, clang, clang seeped through my consciousness. Clang, clang, clang. . .rhythmically, incessant, unending. My nerves began to twitch. I lay wide awake, staring in the dark. What in the world was this dissonant sound?

Standing in the cold wind at the window, I could see a small beached boat nearby, its sails put away, but now its loose hoist rope beat relentlessly in the wind against the tall aluminum mast. Clang, clang, clang. It could have been a metronome in its persistent, timed count. Clang, clang, clang. What could I do, I frantically wondered, in the midst of the night with no one around to complain to?

Endure it I must, I supposed, so impatiently and rebelliously I got back into bed, with the clang, clang, clang honing my nerves to raw edges. "My precious night at the sea is ruined," I complained petulantly to myself. "How can it bring peace when this Chinese torture continues through the night?"

And then the sea spoke to me.

Thunderously, beyond the faint clanging, it seemed to reprimand me. "Why is it you fret over small dissonant sounds, but do not hear the symphony of the sea? Today on the beach, you strained at a gnat but did not marvel at the seagulls overhead. Why do you overlook the mountain and see only the slippery hill?" the sea said to me.

And lying there in the dark with the sea scolding and crashing, I counted the misspent energies of life, ticking them off like Greek worry beads in the night.

Why do we notice a weed in a carpet of green grass?

Why do we see a small flaw in the fabric without thinking of the weaver in his toil?

Why does one crooked stitch get attention when the otherwise perfect pattern goes unseen?

Why do we dwell on the misspelled word without absorbing the thought of the writer?

We gossip at the irritant in a friend's personality without crediting his character that we love.

The small scratch on a polished table gets the eye while the fine grain of the wood is not seen.

We remark on the error, the oversight, the clang, clang, insignificant clangs of life and not the majestic thunder of the all-knowing sea.

It was with anger that the sea spoke to me that night. . .rushing in on the beach in the darkness and shaking its white frothing head like a grandfather to an errant child.

No, the clanging did not cease. In the morning the small boat was removed and only then was its clanging silenced. But sometime in the deep of night its disrupting noise lost its power to fray nerves. I had slept soundly in the cold wind after the voice of the sea pointed out life's foolish ways.

In the fresh morning light, there was a new perspective of the joys we are offered day by day.

That voice I heard. . .was it really the sea? Oh, be quiet and listen. . .it may not be.`,
    media: [],
  },
  {
    id: 'confessions-of-a-fainter',
    place: 'Montgomery',
    lat: 32.3668,
    lng: -86.3,
    year: null, // no date printed — "just this last Monday" at the First Alabama Bank fashion show
    title: 'Confessions of a Fainter',
    // The Best of Madera pp. 122–126 (IMG_0683–0687). Her spellings kept
    // ("claustophobic", "adverse to" for averse, "faint hearted" as two
    // words across the line break). Spaced ellipses ". . ." as printed.
    body: `In my long career as a journalist, I have recorded numerous personal experiences that at the moment seemed timely if not particularly edifying. However, it is only now, in view of my experience this past Monday, that I intrepidly reveal a life-long inclination to faint in public places. That's right. . .faint, like in fall out or swoon.

My doctor, who says that basically fainting is caused by an insufficient amount of oxygen reaching the brain, has known about my penchant for fainting for years, as have my family, close friends, and an assortment of bewildered witnesses. Still, in an era when women stolidly scale mountains, run in marathons, and engage in wrestling, I must say I feel a bit archaic in admitting that I am afflicted with the vapors.

The first experience of fainting that drifts to light in the dim recesses of my past, discounting vague recollections of passing out in school hallways and once in science class, was when I was with child. One night, between the chicken breasts with almonds and the country fried steak in the serving line at old Morrison's Cafeteria then located on Commerce Street, I dissolved silently into a huge lump at the feet of my poor, young and then inexperienced husband. Responding more out of embarrassment than concern, I suspect, he scooped me into his arms and lugged me through the maze of tables of curious diners, up the narrow, angled stairway to the second-floor ladies' room where I was soon revived by the off-duty cashier. As was to become my custom, I continued with dinner afterwards.

Before the child was born, however, there were other notable faints, including one in the lobby of a downtown bank. Apparently they removed me from the mainstream of traffic and deposited me on the floor behind the tellers' desks, for I awoke with stacks of money all around me.

Possibly the most spectacular faints I have executed have been at the speaker's table at local banquets. There seems to be something mysteriously compelling to the dysfunctioning of my oxygen system when a visiting speaker arises to commence his address. I have been accused of trying to steal the show.

The first time I recall a fainting spell in this category was when the then newly-organized Knife and Fork Club met in the upstairs Pine Room of Montgomery Country Club. With only a few words of acknowledgement by the speaker of his introduction, I fainted. Befuddled and more than likely exasperated, the speaker was forced to resume his seat while they prised me out from the narrow space between the chair and the wall and hauled me downstairs to a sofa.

Another episode was at a Rotary Club luncheon when I was one of only three ladies present amidst a room full of Rotarians. Again, as the speaker (William Gargan, the movie star) arose to begin his talk, the tell-tale blindness, weakness, and clamminess that indicate an approaching fainting fit washed over me. Bingo. . .I was out. After eons of oblivion, I awoke to find myself lying prostrate on a rolling serving trolley in the alley behind the Whitley Hotel, surrounded by four Rotarian doctors (a G.P., a surgeon, a gynecologist, and an eye-ear-nose-and-throat man), as well as my minister at that time, Dr. Wilbur Walton. When I was ambulatory, Dr. Walton took me home. A few years later when Dr. Walton was elevated to District Superintendent of the Methodist Church I greatly rejoiced, for had he not left his Rotary Club lunch to shepherd home one of his puny sheep?

As spectacular as it is fainting at head tables, for pure adventure there is nothing to compare with fainting in a foreign country. I have fainted in Czechoslovakia, in Singapore, and in the mid-North Atlantic, to mention a few places of distinction.

In Czechoslovakia, my episode took place in a medieval basement restaurant, and was triggered by the fact that I was wedged into what appeared to my claustophobic senses a cul de sac with a straight view into the interior of a kitchen which would score sub-zero in a health department survey. With the first whiff of the greasy soup, I responded by making the only exit possible. . .sliding under the table. Although I'm sorry my fellow tour members were surpassingly alarmed, my predicament did not remotely faze the Czech workers from the nearby factories whose olfactory senses apparently are accustomed to odoriferous soup. While my group continued the meal, I was laid out prone on the back seat of the bus which had been pulled into a no-parking zone in front of the cafe, and only the visions of being jailed in Czechoslovakia kept me alert enough to clutch my passport in case the necessity of protest arose.

The mid-Atlantic caper was at 2 a.m. in my own stateroom aboard the old "Queen Mary" ocean liner, and was a direct result, no doubt, of the midnight buffet after the Captain's party. I was able to summon the steward before unconsciousness set in, and he in turn roused the nurse who gave me an injection that put me entirely out of commission for two days.

But the most memorable faint of all was only last summer in Singapore. I succumbed to the stifling heat and the hot curry by fainting in a taxi — alone. The driver was Chinese with a limited English vocabulary. I had not gone a block in his cab before I gouged him in the back and told him I was going to faint, which was apparently all Greek to him. As I lay inert on the back seat in a pool of perspiration, the hot Malaysian wind blowing through the rolled-down windows, the driver cast swift and astonished glances at me over his shoulder as we tooled through Singapore's narrow streets of Chinatown. Even in my semi-conscious state I wondered feebly what my fate would be. Would he rob me of my handbag thrown unguarded upon the seat? I had been robbed once in Amsterdam and did not feel I could cope with the police just now. But worse than that, would he molest me physically and throw my ravished body into already polluted waters of Singapore harbor?

I did the only thing I could do under the circumstances, I prayed the most fervent prayer I could muster, then just gave myself up to the miseries.

The driver did not do any of the things I feared. Apparently he was as scared as I was and equally adverse to the prospect of my expiring in the back seat of his taxi. When we reached the Shangri La Hotel at breakneck speed, he shouted to the doorman before the wheels stopped rolling, "Lady sick! Lady sick!" in the same tone of voice one warns "Mad dog! Mad dog!" I was ministered to with genuine concern by the kind hotel manager, the assistant manager, two little maids in pretty cotton sarongs, and assorted other personnel who accompanied me ceremoniously to my room to which I was conveyed by wheelchair. None of them — not even the taxi driver — would accept a proffered tip for their solicitude.

What has dredged these confessions of the faint hearted from the misty caverns of memory is that just this last Monday as I was finishing a fashion show in the auditorium of the First Alabama Bank, I felt a faint coming on. Having been unwell earlier in the morning, I was aware of the possibility. My vast store of experience has taught me to avert approaching disaster by immediately getting into a horizontal position, so my first impulse was to lie down on the stage. But this seemed a bit showy even for me, and especially so at 10:30 on a cold winter's morning. So I just abruptly brought the program to an end and crept down to where the chairs were lined up for the audience.

It was there I lay me down to faint on the nice, soft carpet.

Every public establishment ought to be required by law to have nice, soft carpeting for people like me.`,
    media: [],
  },
  {
    id: 'israels-ancient-land',
    place: 'Israel',
    pinLabel: 'Israel',
    // Pinned at Tiberias, where the opening journal entry was written; the
    // piece itself roams the whole pilgrimage.
    lat: 32.7959,
    lng: 35.531,
    year: 1982, // printed "(1982)" at the end; her journal entry is dated March 1
    title: "Israel's Ancient Land",
    // The Best of Madera pp. 133–136 (IMG_0694–0697) — the last piece in the
    // book. Her spellings kept ("Tiberias, built by Herod Antipas in 25
    // A.D.", "It were as though", "others are a modern as Fifth Avenue",
    // "Caesarea Phillipi", "Massada", "Askelon", "bibical times",
    // "Revelations"). Spaced ellipses ". . ." as printed.
    body: `"The sun is setting. The billowing clouds of pearly pink grow gray as mourning doves over the darkening Golan Heights across the sea. I hear birdsong and children's voices drifting over the ancient stones of Tiberias, built by Herod Antipas in 25 A.D."

These words I wrote in my journal March 1 when our group of 12 settled in our hotel in Tiberias, Israel, after a day's journey from Jerusalem. Now, as I sat alone in the twilight, I watched tiny, flickering lights on the hills across the sea, the growing dusk displaying them like precious jewels on a knotted string. Graceful gulls with plaintive cries soared effortlessly over the water's edge where small fishing boats waited to go out for the night's catch, as did Peter's and Andrew's and James' and John's so many years ago.

"Just think," I whispered to myself in the gathering darkness, "this is the same sea, the same twilight, the same breeze sweeping down from the Golan hills that caressed the tired Jesus as he taught and healed the multitudes on this Sea of Galilee."

Next morning we took an early boat across the crenulated lake to Capernaum where the ancient synagogue built by the appreciative Centurion and relics of bygone glories lay moldering in the sun, the waving shadows of palms and eucalyptus trees creeping like the skittering lizards over the old, gray crumbling stones.

Near to Capernaum is the Mount of Beatitudes, now marked by the Italian Franciscan sisters with a small octagonal-shaped shrine, its stained glass windows under the lofty dome proclaiming in Latin the eight beatitudes. Its acoustics are so remarkable that when together we sang and prayed the Lord's Prayer, our voices reverberated like a heavenly choir and not our small band of 12. Deep emotion marks the remembrance.

And so went the comprehensive pilgrimage to Israel. It were as though we had lived from Genesis to Revelations. Life will forever be more meaningful.

With limited space, let me share only a few of my personal reflections:

. . .As one walks the dingy, cobbled Via Dolorosa where Jesus trod with his cross to Calvary, the winding streets are an arcade of kaleidoscopic, small shops selling the wares of the world. Some pedestrians seem to have stepped out of the Book of Samuel, while others are a modern as Fifth Avenue. Little donkeys heavily laden with wares plod wearily along the narrow streets as well. The aromas of sweets and of breads and of sheepskins and of incense and oil and spices are heady reminders of the Middle East.

. . .Our voices lifted in song in the crisp morning air were tremulous as together we closely stood in the Garden of Gethsemane. The old, twisted olive trees may be the very ones under which Jesus sat that last agonizing day when Judas betrayed him with a kiss.

. . .Shall I ever forget the reading aloud, at our guide's request, the 37th chapter of Ezekiel as we sat on the hot stones of the synagogue ruins atop incredible Massada? Herod the Great had built a palace upon the massive rock, looking upon the barren wasteland of the wilderness and to Moab across the Dead Sea. Here at Massada the last of the Zealots retreated in 66 A.D. to be besieged later by the Romans for three long, tedious years. Rather than be taken, the 960 Zealots put themselves to death and Massada fell in 73 A.D.

. . .Ah, the joy of putting one's foot in the cooling waters of the River Jordan and of wading upon the rocks of the Dead Sea! To see the Jordan gush forth from its source at Caesarea Phillipi at the foot of Mt. Hermon and to follow its meandering progress through the Sea of Galilee to the fertile valley beyond is to realize the magical importance of water in carving out the history of this land.

. . .How beautiful is Jericho nestling in a fertile oasis near the wilderness of Judea! Fruits and flowers and palms in abundance bloom in the desert air. We stopped at Elisha's spring to touch the healing water which has succored man for thousands of years (II Kings 2:19-21).

. . .And look up there! Upon that hill is Bethlehem, its winding, narrow streets and its people are much the same as when Ruth and Naomi came home from Moab, and when Mary and Joseph sought a room at an inn. Nearby on the rocky hillsides shepherds still tend their sheep and gather them into caves for protection from the storms.

. . .Nazareth lies somnolently on a hilltop, too, and Mary's Well still offers fresh water to the traveler.

. . .The Bedouin tents sprawl filthily across hot wastelands as they have from time immemorial. The Bedouin market in Beer Sheva was bedlam. With donkeys and camels and sheepskins and oil, with olives and vegetables and almonds and fruits, the nomads mill madly at the market, their dark-skinned faces under their dirty head-dresses are faces of the wanderers of bibical times. Their nomadic lives have changed little as they now spread their tents near bustling cities and tend their flocks on sandy hills.

. . .And then one sees those once proud, mighty cities of Caesarea, Askelon, Ashdod and Accho, reduced now to silt-covered ruins, their past glories buried in rubble or taken away by plunderers for thousands of years. The crows and the hoopoe birds are Askelon's inhabitants.

But new cities like Tel Aviv arise. Citizens of modern Israel have turned deserts into orchards. Fruits, avocados, almonds, dates and vegetables grow on green, fertile, irrigated land. Miracles are wrought as land is restored.

Wildflowers still bloom in the valleys, in crevices of old rocks and upon the rolling hills. From Mt. Carmel one looks upon the splendors of the Valley of Jezreel and on Carmel's slopes, red anemones are arrayed like Solomon in all his glory.

The Bible Land — the most revered land in the world. The most fought over and sought after land on the globe. And the most remembered.

(1982)`,
    media: [],
  },
  {
    id: 'touched-by-adventure',
    place: 'Nassau',
    pinLabel: 'Bahamas',
    mapLabel: 'Nassau, Bahamas',
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
    order: 1, // owner wants this first in the New York chapter, before the 1956 letter
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
    pinLabel: 'Ireland',
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
    mapLabel: 'Charleston',
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
    pinLabel: 'Canada',
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
    pinLabel: 'Italy',
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
    id: 'hobnobbing-with-stars',
    place: 'Los Angeles, Calif.',
    mapLabel: 'Los Angeles',
    lat: 34.0522,
    lng: -118.2437,
    year: null, // no year printed — films mentioned suggest late 1950s
    title: 'Hobnobbing With Stars',
    // The Best of Madera pp. 44–47 (IMG_0607–0610). "GRAND TOUR" is the
    // book's mid-article subhead. Her spellings kept ("Orson Wells",
    // "Dona Winters", "candelight").
    body: `LOS ANGELES, Calif. — When they say movies are colossal, stupendous and magnificent, they aren't kidding. I've been subjected to enough glamour since last night to tide me over many a gloomy day. Only thing is my head is reeling so that it will take a lot of plain ordinary living to get my feet back on the ground.

Last night M-G-M was host to fashion editors attending the California Fashion Creators Press Week here in Beverly Hills. A whole Thin Man T-V show was written around our visit to California and 15 editors' names were drawn from a box by "Nick Charles" to appear in the show.

There were some 200 people milling about the stage — prop men, make-up artists, sound men, the director (Oscar Rudolph), wardrobe women, six beautiful models, producers and assistants, not to mention 7 fashion editors.

After the shooting, we were taken into Stage 24 which is the largest sound stage in the world and there in the gigantic barn-like building, stepped into fairy land. We were served dinner at beautifully appointed tables for eight with crystal, china, candelight, flowers — in the elegance of nothing other than the palace of Monaco, the beautiful winding stairs and ballroom set used in "The Swan." A buffet table was at one end with indescribable delicacies such as Alaskan crab legs, marinated mushrooms, great mounds of colorful congealed fruit salads. It was a feast in technicolor.

My dinner partner was Mal Kaplan, head of M-G-M wardrobe department.

He explained in detail the problems of dressing stars, beside providing costumes and clothing for the thousands of extras who work there. He introduced me to Helen Rose, Academy Award winning designer, who is doing the clothes for "Cat On a Hot Tin Roof" and "Tunnel of Love," and to designer Walter Plunkett, who has done "Rain Tree County."

One of our hosts was genial George Murphy, former actor who has been with M-G-M 22 years, and now is director of Public Relations there.

Peter Lawford was most charming, particularly in view of the fact he had been working since 7 o'clock that morning. Phyllis Kirk, who had flubbed one take on the modeling shot, told me she was so embarrassed she had gone back to her dressing room and cried, because after all, she had started her career as a junior model. Her competition was enough to make anyone flub, being six of Hollywood's most beautiful models including Mary Lou Miles.

Helen Rose had on a beautiful cream colored diadem mink great coat. Her dress was a three-quarter sleeved beige wool, very simple and quiet. She had designed all the clothes for the scene of the Thin Man show we saw filmed, the most outstanding of which was the mink dress Lauren Bacall wore in "Designing Woman" and which had been restyled for this show. After all, you don't wear $4,000 dresses just once.

GRAND TOUR

This morning I was the guest of 20th Century Fox for a grand tour done in the royal manner. Spent two hours with the famous Charles LeMair, head designer, who personally took me through the fabulous wardrobes showing me the clothes he's designed for the great stars. In the sewing room were dummy models of Marilyn Monroe (whoops), Bacall, Dona Winters — all the top movie queens — and he showed me the clothes that are being worn in "Fraulein," "Peyton Place" and many others. LeMair won three Academy Awards for "Love Is A Many Splendored Thing," "All About Eve" and "The Robe."

I had lunch with LeMair in Cafe De Paree (commissary) and sitting all about us were Marlon Brando, a very distinguished Dick Powell, who is now a producer; star Joanne Woodward; Orson Wells in his make-up for "Long Hot Summer," his co-star Paul Newman who can almost pass as a twin to Brando and who is one of the hottest properties of M-G-M; Angela Lansbury; John Kerr; Floyd Simmons, Walter Wanger, Charles Brackett, and Joshua Logan and his wife. Mr. LeMair was generous with introductions.

But of all the events of the long, full day, nothing compared to being on the set of the actual filming of the fabulous Boar's Head ceremonial dance of "South Pacific," with Joshua Logan directing.

And then too, we watched a scene between Orson Wells and Paul Newman being filmed for "Long Hot Summer."

The friendliness and courtesy of every person we met — stars, directors, producers, executives — was amazing and they all made us feel we were the celebrities, not they.

When I returned to the Beverly Hilton, I stopped in the lounge to wash the stardust off my hands. I ran into Jane Russell standing in front of the mirror — curling her eyelashes!`,
    media: [],
  },
  {
    id: 'magical-greece',
    place: 'Greece',
    pinLabel: 'Greece',
    lat: 37.9838, // pinned at Athens
    lng: 23.7275,
    year: null, // no date given — an Advertiser-Journal European tour, June
    title: 'Magical Greece',
    // The Best of Madera pp. 56–59 (IMG_0619–0622). Her spellings kept
    // ("pistacio", "promotory", "Fierra", "Along, the way").
    body: `When the sun goes down over the Aegean Sea, incredible colors wash the afternoon sky. Rose, lavender and molten gold spread along the horizon and the reflection in the deepening blue of the water makes shimmering paths of red and purple.

If you're lucky enough to watch the sun set behind one of the numerous islands scattered in the Aegean like jewels dropped from a broken necklace, you see an even more spectacular sight, for the rich, brilliant colors are contrasted dramatically with black silhouettes of hills and stark mountains, and the fleeting moments of sunset are indelibly etched upon the memory.

On one of the Advertiser-Journal European tours, we cruised the Mediterranean and Aegean south of Greece, going ashore at the barren, deserted island of Delos, the legendary birthplace of Apollo; at thriving, lively and picturesque Mykonos, alight like a carnival midway circling the small harbor; and at Santorini where the thing to do is ride at a fast clip up 600 zigzag steps astride a donkey to the cobblestoned streets and white-washed village of Fierra on the summit.

We spent a day ashore in Rhodes, the "Island of Roses", visiting the old city where ghosts of the Crusaders seem still to lurk, and drove to the island's tip to Lindos with its Sanctuary of Athena Lindaia on its acropolis dominating the small, treeshaded village below it.

On the road to Lindos are verdant groves of pistacio and pomegranate trees, their red fluted blossoms dashes of contrasting color next to lemon trees heavy with fruit. Along, the way, small sad-looking donkeys ambled in the dust carrying black-garbed women with thick white scarves wrapped about their heads and chins. Upon their feet the women wore heavy boots for protection against snakes which once infested the island.

And yet another day we visited Herakleion, Crete, spending a lazy morning sipping cool drinks in the town square, visiting the Archeological Museum, and gazing with veneration at the remains of the once-magnificent Palace of Knossos where Minoan civilization blossomed two thousand years before Christ.

If the mind is boggled by the beauties of the islands, it is equally awed by the mainland of Greece itself.

One day we disembarked early from our cruise ship in the fascinating, flourishing port of Piraeus (of "Never on Sunday" fame). By bus we drove along the winding coast of Attica that curves around coves and inlets, past small beaches with names of Glyfada, Vouliagmeni and Varkiza, which afford breathtaking views of the blue Saronic Gulf dotted with small islands.

In June the flowers along the roadside are in full blossom and we gasped with delight at the magnificence of great bushes of red geraniums along the way.

Our destination was Cape Sounion, the southernmost tip of Attica, but no guidebook or history lesson prepares one for the sensational sight of the Temple of Poseidon rising in lonely splendor on its rocky promotory overlooking the sea.

Constructed in the age of Pericles, the stone skeleton of the Temple rises majestically on a hilltop with its tall white columns like giant sentinels against the sky. On one of the front columns Lord Byron left his signature carved into the stone, and through the years thousands of other sightseers from over the world have done the same.

Since we were early risers on this morning, our small group had the ancient ruins to ourselves. We stood at the base of one of the giant columns to look down a pine-studded rocky slope to see the small harbor where it is said St. Paul landed in Greece on his way to preach to the Corinthians. And although Sounion is famous for its spectacular sunset, it could scarcely have been lovelier than in the fresh morning sunshine.

During our days in Athens the more familiar sights got their just due as well — the timeless Parthenon atop the incomparable Acropolis and the museums and city buildings. Some of our group took the funicular up Lycabettus hill for the panoramic view of the whole city and a visit to St. George's Chapel.

If the Acropolis by day is breathtaking, by night it is even more magical. We sat one chilly evening on Pnyx Hill to watch the Sound and Light production. As voices came out of the dark shadows of the hill telling the story of ancient Greece, floodlights moved mysteriously over the Acropolis across the valley and one was almost mesmerized into another time in history.

As if awakening from a trance, we shuffled to our bus through oleander-bordered walkways, and shaking off the spell, changed to a merry mood to drive to old Plaka and a gay taverna featuring bouzouki music, dancing and good food.

When departure day arrives flying out of the bustling modern Airport of Athens is unmistakably a 20th century adventure, but the memories one has accumulated in Greece make it all too clear why poets through the ages sang praises to its glory.`,
    media: [],
  },
  {
    id: 'malaysian-sultans-palace',
    place: 'Johore',
    pinLabel: 'Malaysia',
    mapLabel: 'Johore, Malaysia',
    lat: 1.4927, // modern Johor Bahru, Malaysia
    lng: 103.7414,
    year: null, // arrival in Singapore "May 13" — no year printed
    title: "Malaysian Sultan's Palace",
    // The Best of Madera pp. 60–62 (IMG_0623–0625). Her spellings kept
    // ("unobstrusive", "intersanctums", "bayonetted").
    body: `'Though East is East and West is West', as Kipling so aptly put it, the twain meets swiftly nowadays with expeditious airliners whisking hundreds of travelers at one time from one continent to another in a mere half a day.

Although the centuries-old cultures of the East still hold to ancient traditions in numerous ways, modern technology confronts the eye with incredible impact in some of the East's — and the world's — largest cities like Tokyo, Bangkok, Singapore and Hong Kong, not to mention out-of-the-way places unfamiliar to the average Westerner.

The 24 travelers on the Advertiser-Journal Orient Tour, who returned home after an approximately 25,000 mile journey, will long remember the East's mysterious splendors, as well as the superb accommodations in deluxe hotels and the titillating tastes of exotic foods. And they will remember especially, I think, some of the unusual events arranged along the way.

For instance, it is not often a group can roam the marble halls of the Grand Palace of the Sultan of Johore, but through the kindly efforts of Dr. John Haggai, we were able to do that very thing.

The arrangements began months before when Dr. Haggai of Atlanta, founder of Haggai Institute for Advanced Leadership Training in Singapore, told me at a meeting in Atlanta he would try to arrange a visit to the palace of His Royal Highness Sultan Ismail Ibni Al-Marshum, in Johore, a Malaysian state connected to Singapore by a causeway over the Johore Straits. The Sultan is the most senior of nine Malaysian sultans and took his hereditary title and the throne upon the death of his father, Sultan Ibrahim, in 1960.

And so it was that upon arrival in Singapore May 13, a telephone call to Dr. Chandu Ray of Haggai Institute advised me that arrangements had been made for our visit to the palace next morning, a Sunday, and I was to contact Dr. Said, curator of the Grand Palace, who would be expecting us.

Since our regular touring coach in Singapore did not have license plates to go into Johore, another coach was chartered and a telephone call made to Johore by our capable tour escort who was with us for three weeks throughout the Orient. A Johore guide would have to meet us at the border.

Passport inspection was surprisingly strict at the border, where our Malaysian guide was awaiting us.

Rain began to fall as we approached the ecru-colored palace set in verdant rolling lawns and gardens, and guarded by soldiers with bayonetted rifles. Our guide, brown-skinned and with a charming English accent and pleasant personality, and I were admitted first by the guards and made contact with Dr. Said in a cluttered upstairs office of the palace, where pictures of the royal family were pointed out to me.

And then while the rain came down in torrents, my group was guided about inside the marble-floored palace with unobstrusive guards unlocking barred doors to treasure-filled intersanctums.

There was the Sultan's trophy room, filled to overflowing with dusty stuffed Bengal tigers, a great rhinoceros, the Sultan's favorite polo pony's legs, and elephant feet, among other relics of the hunt. Heads of fierce beasts lined the walls as did candid pictures, yellowing with age, of the Sultan and his party on some of the hunts.

In other rooms on the ground floor, glass-enclosed shelves held royal table services, such as solid golden place settings for a thousand guests, ornate centerpieces and ornaments, and solid platinum serving trays.

In yet another room were glass cases holding the Sultan's uniforms which he had worn to Queen Elizabeth II's coronation, and gowns and furs that had belonged to the late Sultana. The Sultan himself was educated in England and has close ties with the British throne.

Upstairs the huge throne room was bare except for two golden chairs, and sitting rooms were filled with invaluable furnishings like delicate crystal musical tables and beautiful objets d'art, as well as family portraits. And we were even privileged to go into the Sultan's and Sultana's bedrooms where great, heavy carved and canopied beds dominated the space.

On this Sunday morning the Sultan himself was at his other palace, but being able to wander at will and exclaim with awed enthusiasm over the palace's contents made up for not being greeted by the Sultan in person.`,
    media: [],
  },
  {
    id: 'bangkok-unique-to-senses',
    place: 'Bangkok',
    pinLabel: 'Thailand',
    lat: 13.7563,
    lng: 100.5018,
    year: null, // no date given — the Advertiser-Journal Orient Tour
    title: 'Bangkok: Unique to Senses',
    // The Best of Madera pp. 63–67 (IMG_0626–0630). Her spellings kept
    // ("subsistance", "life line", "King Mongkok", "flavoured").
    body: `The dazzling rays of the early morning sun slanting across the brownish waters of the Chao Phraya River that flows beside the city of Bangkok, Thailand, were already making us hot and sticky when the 25 travelers on the Advertiser-Journal Orient Tour boarded small motor-propelled boats to take us to the famous floating market in Dhonburi on the river's other side. There the winding klongs (canals) create a unique way of life for thousands of inhabitants, and the floating market, found in no other part of the world, is literally a life line to their subsistance.

Along the klongs in sparsely furnished, partially open-sided dwellings, many built on stilt-like foundations and surrounded with tropical vegetation growing rampant in the muggy climate, people are born, live all their lives, and die at the water's edge, and their lifestyle is extraordinarily primitive in comparison with the centuries-old culture flourishing just across the river.

As we passed through the jungle-like canals on this early morning, in some places thick beds of waterlilies were almost clogging the waterways and graceful trees hung limply over the river. I felt like an intruder, however, watching sarong-clad women squatting by the riverside washing the family rice bowls, or lathering their hair and bathing themselves in public view, while naked brown children swam and splashed and dived near our boat, usually waving friendly greetings to these strangers invading their privacy.

We saw old people with brown leathery skins standing placidly waistdeep in the water, possibly to keep cool, and sometimes we saw a man bathing his poor, skinny, mangy-looking dog of indeterminable origin, of which there are multitudes in every nook and cranny of Bangkok, including the temples.

Many klong houses have their own fish trap in front, which is an intricate-appearing rig of long bamboo poles supporting a huge round net that lets down into the water, and when triggered snaps up into the air with the family dinner entangled therein.

After threading through the winding klongs which seem mercilessly endless, we came upon a wide area of water literally thronged with sampans, each filled to overflowing with fresh vegetables or fruits, some of which we had never seen; or with sacks of rice, or flowers (oh, the great clusters of orchids!); and with meats and fresh-killed fowl piled in the hot sun on the stern and bow of the small boats, as well as other goods to maintain life on the klongs. This teeming business by boat has been a part of klong existence for generations, and possibly the only change to be wrought in modern times has been the addition of curious tourists who watch in awe and fascination while the klong people go their ways seemingly undisturbed.

On one afternoon, we had a floating party on a large converted rice barge, happily chugging through the klongs as our dauntless and uninhibited Thailand guide, Methi Boonlupyanon (or just plain Paul) and small girls in sarongs kebaya, served us fruits and cookies and what Paul aptly called "Thai dynamite," a drink so potent that only the more intrepid try it, much to their regret next day.

But even as incredible as the water traffic may be, it is as nothing compared to Bangkok's streets and roads. The night we drove into Bangkok from Don Muang Airport just after dark and in a drizzling rain, it was like participating in a Thailand Grand Prix. Our side of the highway was apparently meant to be two-lane, but buses, cars, trucks, motorcycles, bicycles, trishaws (three-wheeled vehicles known as "tuk tuks" for the noise they make), and foolhardy pedestrians were bumper-to-bumper, in most places making as much as five lanes across the road. Daring and reckless drivers zoomed wildly around the left of the traffic through muddy potholes, then nudged places back into the frenzied traffic, creating a kind of mechanized bedlam. It was with unrestrained relief that we arrived intact at the elegant Dusit Thani Hotel and I could watch the maniacal traffic in isolated safety from the balcony of my 17th floor room.

During our stay in Bangkok, there was an exciting visit to the remarkable Grand Palace, made famous to Americans perhaps through the Broadway play, "The King and I," and the movie, "Anna and the King of Siam," which, by the way, has never been shown in Thailand, said our guide Paul, because of the inaccuracy in depicting King Mongkok. Said Paul, "King had plenty hair. Not bald like Yul Brynner."

However, the visit to the Grand Palace is like stepping into storybook-land where towering "demon gods" guard some of the buildings.

During the days in Bangkok, there were visits also to Wat Po where lays the Reclining Buddha, 160 feet long and a little over 39 feet high, covered with flaking gold leaf; and to Wat Trimitr where the great solid gold Buddha ten feet high and weighing five and a half tons sits inscrutably in regal splendor. But unforgettable amidst all the splendor are the ragged, persistent street vendors who tag along behind you with handicrafts and with whom you haggle unendingly until you've purchased whatever they're selling, want it or not.

Also there were elaborate meals including some of the heavily spiced dishes that Thais love, and that include curries and chili peppers. Warned Paul, "Eat hot peppers, smoke come out ears." Even so, we preferred smoking ears to some of the other Thai delicacies available in restaurants and street stalls which include crocodile tail filets, cobra flavoured with sour Chinese plums, "catlets," monkey brains, elephant feet, and deep fried bat.

Perhaps one of the most memorable experiences of Bangkok was a visit from Lt. Col. Somjanok Kridakorn, who is the great-grandson of King Mongkok (Rama IV) of "Anna and the King of Siam" fame. His mother, Princess Rudivoravan Arnold, now living in Montgomery, had written her son that we would be in Bangkok. Col. Somjanok and I had coffee together one morning and he graciously brought me a gift of beautiful Siamese dolls.

And then I thought, "How strange this is." The world had seemed so vast and alien as we ticked off the miles and the days and the countries we had traveled. Now it seemed small indeed as this pleasant, friendly man — the great-grandson of the King of Siam — and I sat over coffee here on the other side of the earth and talked enthusiastically of his mother in Alabama.

Suddenly, the world with all its differences and variations had dwindled to familiar proportions.`,
    media: [],
  },
  {
    id: 'japan-land-of-contrast',
    place: 'Japan',
    pinLabel: 'Japan',
    lat: 35.6762, // pinned at Tokyo
    lng: 139.6503,
    year: null, // no date given — the Advertiser-Journal Orient Tour, Golden Week
    title: 'Japan: Land of Contrast',
    // The Best of Madera pp. 72–76 (IMG_0632–0636).
    body: `When they talk about the "bullet trains" of Japan, they aren't just kidding. There we sat, 25 of us on the Advertiser-Journal Orient Tour, hurtling through tea plantations and rice paddies at 130 miles an hour, reclining languidly in our reserved "green class" seats for the three-and-a-half hour journey from Atami to Kyoto. It was close akin to the magic carpet as we soundlessly zoomed through the countryside.

The ride on Japan National Railroad's "Kodama" train is an experience unto itself, the only hazard being to hop quickly enough through the automatic doors before the train silently slides out of the station. (On the other hand, Japan's commuter trains, far removed from the bullets, have professional "pushers" who mercilessly jam riders into overcrowded cars during rush hour traffic.)

On our day of travel from Atami, we were doubly rewarded, for at every station there was a Japanese wedding party assembled to bid adieu (no, sayonara) to newlyweds who timidly took their seats in our green car compartment. The wedding party stood waving and bowing on the station platform, with the young men invariably in black suits and the young women in beautiful, elaborate, traditional kimonos. Our Japan tour guide told us the ceremonial kimonos often cost thousands of dollars and are handed down from mother to daughter as heirlooms.

Our recent visit to Japan started in Tokyo, the world's largest city with a capital population of nearly 12 million, and where there are acres of high-rise office buildings and apartments, rush-hour traffic jams and asphalt jungles, but also serene gardens, colorful and mysterious Buddhist shrines and temples, and wide boulevards lined with intricately trimmed gingko trees and azaleas.

We had the good fortune to be in Japan during "Golden Week", when there are three holidays — the Emperor's Birthday, Constitution Memorial Day, and Children's Day — celebrated seemingly by the entire 105 million inhabitants who go in enormous groups to all the shrines and palaces and places of historic interest. Perhaps a tourist might complain of the crowds, but not so this time, for to meet the smiling delegations of clean-scrubbed, uniformed school children, walking two-by-two in unending procession with their teacher waving a banner at the head of the line, was a memorable pleasure.

Apparently they enjoyed us too, for not only did they stare at us unabashedly with their sparkling little black eyes, but more often they put small hands over their mouths and giggled hysterically. We had the feeling we were like creatures from another planet, not another country. But always there was the friendly smile, often a "hello" in English, and never the wild rush and shoving that seems to infect most mass movements.

I shall never forget the children.

Through our guide's vast knowledge and patient explanation, we began to feel a rapport with Japan and its inordinately polite citizens. We learned to appreciate a single beautiful flower and a simply furnished room and a disciplined lifestyle.

During the days in Tokyo, there were visits to such interesting places as the Asakura Kannon Temple, where a great "well" of burning incense sticks produces dense smoke said to cure ailments when it envelopes the body. (Needless to say, we soaked in smoke though there was not a Buddhist in the bunch.)

One day we journeyed to Nikko National Park by train, where we marvelled at the fantastically elaborate Toshogu Shrine, one of Japan's greatest treasures which was built as a memorial to Ieyasu Tokugawa who was born in 1542. When he died in 1616 his son started the shrine, which consists of 23 structures today and which when built employed master-artists and a total of four and a half million laborers, all told, and cost $60 million in present currency. Among the magnificent and indescribable carvings are the original "hear no evil, see no evil, speak no evil" monkeys carved over the sacred stable door.

After a day's journey along the Pacific coast's black sand beaches, where fishermen's nets drying in the sun looked like giant crocheted doilies, we arrived at Hakone National Park and boarded a ferry to traverse the lake. The afternoon was stormy and windy and the dark waters churned dangerously, but as we crossed the lake we could get a hazy view of the magnificent snow-covered peak of Mount Fuji in the distance.

The night at Fujiya Hotel in Miyanoshita, Hakone, where dignitaries and royalty from almost every country of the world have stayed, was perhaps my own most treasured experience in Japan. I awoke next morning with the crisp, fresh mountain air wafting a scent of flowers through the opened window. As I stood in the early dawn chill, I could look down on a hillside garden fragrant with blossoming cherry trees, azalea, orchids and lilies, growing lushly around rock arrangements, and I could hear the tantalizing tinkle of a waterfall and the sweet notes of small birds joyously greeting the coming of day. This beauty beckoned like a magnet, and I spent an hour of solitary serenity under a cherry tree on the mountainside, in tranquil and thankful meditation.

Through the many miles we traveled in Japan, we were enthralled to see the spectacular display of flying carp, the kite-like paper fish billowing in the breezes from tall poles at almost every house, large or small. The carp signify that the home is blessed with children, and the flying of the paper carp is a part of the holiday celebration.

In almost every garden there is a pool with real carp swimming to and fro, brown, silver and gold in color, and some as large as 18 inches in length.

The days in ancient Kyoto, for more than 11 hundred years the capital of Japan, were enchanting indeed, with a visit to Nijo Castle where we tread upon the "singing floors" (they were built to squeak "like nightingales" when footsteps fell upon them, thus discouraging spies in the Shogun's palace.)

There were gay lunches and elegant dinners in places where we dined shoeless while semi-reclining on the floor, and there were rounds of shopping unending.

This country, we found, puts emphasis on graceful perfection and courteous relationships. Where else would you see a sign in a hotel hallway saying, instead of "Quiet!", simply "Please join us in helping to keep the corridor peaceful"?

Possibly only in Japan.`,
    media: [],
  },
  {
    id: 'non-person-in-amsterdam',
    place: 'Amsterdam',
    pinLabel: 'Netherlands',
    lat: 52.3676,
    lng: 4.9041,
    year: null, // no year printed — "last week", in her 20th year of European travel
    title: 'Non-Person in Amsterdam',
    // The Best of Madera pp. 127–132 (IMG_0688–0693). Replaces the old
    // placeholder entry. Her spellings kept ("polygot", "Nieuwenstraat",
    // "Leidesplein", "armsful", "regaling Anne of our adventure",
    // "passpoort"/"vliegticket"/"travellerscheques" as the Dutch report
    // renders them).
    body: `The sunset sky over Amsterdam was like an old Dutch painting with iridescent pink clouds floating languidly through the twilight haze. There was only one thing amiss about the tranquil view — I was looking at it through a small dingy, third-floor window of the police station.

How I came to be sitting in the Amsterdam police station at sunset is a saga that proves one is never too old nor too sophisticated to be immune from new experiences. My experience in Amsterdam last week will be memorable, for in 20 years of European travel I have never been a non-person in a foreign country.

The whole episode started one afternoon when my traveling companion, Gladys Sellers, and I left the third member of our party, Anne Hamilton, in the hotel to rest while we joined the throngs of Amsterdam's polygot population to take a tram ride to Dam Square. With enthusiasm we walked through the bustling Nieuwenstraat (walking street) listening enthralled to the music of the barrel organs grinding out calliope tunes, on past the herring and "patates frites" (fried potato) stands, looking in shop windows filled with wares from all over the world. At Dam Square near the old palace we bought armsful of fragrant, fresh flowers to brighten our hotel rooms and to take to Anne.

At the tram (electric street car) boarding area, we were blithely gay and filled with enthusiasm at the whirl of noise and people speaking in languages of faraway places.

As we stepped into the tram, with a rush so fast I didn't know what was happening, three strapping, unwashed teenagers of indeterminate origin rushed upon me, pushing and shoving and chattering as the tram roared to the next station several minutes away. With my armload of flowers my view was cut off from my zippered handbag close to my body, so it was only at the next stop when the doors flew open and the boys lurched off the tram discarding my small make-up bag and notebook to the floor that I realized they had chosen me as their victim and had left me a veritable non-person. They had stolen my passport, my travelers checks and my airline ticket. Out of my still half-closed handbag, they had taken my coinpurse with Dutch guilders in it as well, as they made off in the dense, surging crowd boarding the loaded tram.

Believe me, my heart sank as low as Holland's polder lands. Speechless, Gladys and I pushed off the tram, stood dejectedly on the Leidesplein, one of the busiest and most boisterous squares in Amsterdam with hippies in weird getups and long, greasy hair surging around us like the tide that isolates Mont St. Michel. A crawling fear left me almost paralyzed, my wits momentarily benumbed as if there had been a blow on the head.

But then I thought, Thank God, there hadn't been a blow on the head! I was still ambulatory and suffering no bodily harm.

With eyes the size of saucers and a voice that quivered, Gladys shakily asked, "What in the world are you going to do?" That seemed a fair question at the moment, but gathering up all the bravado I could muster, I said, rather cheerfully under the circumstances, "Well, one thing for sure, I'm not going to let it spoil my trip!"

So with both of us still tightly clutching our flowers, we hastened to the nearby police station where the potential danger lurking on the Leidesplein is viewed passively through open windows with limp net curtains dangling tiredly at each side. Inside, another couple was telling a young policeman their tale of woe, they having had the same experience five minutes earlier on the same tram line. The trembling man said he was in Holland to study Rembrandt in order to lecture at the Metropolitan in New York and they were to leave the next day, only now there were no passports, travelers checks or credit cards. But the woman was doing most of the talking.

We were told by the policeman in charge that we had to go to the main police station to make our complaint. It was back downtown on the Singel Canal, he said, and all one had to do was take the tram outside and retrace our steps. Well, Gladys and I weren't having any of that. We queued up at the taxi stand on Leidesplein and got a cab which careened us over at least half of Amsterdam's 700 canal bridges to a remote street where thousands of bicycles spilled onto the cobblestones.

Inside the seemingly deserted station, we were told by a lone attendant in a cubbyhole that we were to report to room 25 on the third floor. Now unless you have been in an old Dutch 17th century building you can't imagine what the staircases are like. They go straight up like a ladder and are about as wide. Up, up, up we went, still clutching the now wilting flowers. Our predicament suddenly touched our funny-bones and we giggled hysterically as we climbed the steep steps and knocked on the shut door of No. 25.

A nice-looking young Dutchman in a sport shirt was taking the statement from the same couple who had been at the other police station, and another casually-dressed young man sat me down by his desk and asked me a million questions, translating the interrogation into Dutch as he typed the report. It noted that the M.O. (method of operation, like on Kojak) was "tassenrollerij" (pickpocket), and that beside my "U.S. passpoort", my KLM "vliegticket" and my "travellerscheques" were stolen. Every now and then the two young clerks would seem to get off on another subject and chatter to each other in Dutch. One time one handed the other a lock and key. Gladys sitting quietly over against the wall with her flowers, said she thought for a moment they were intending to lock me up, but after about 45 minutes the report was finished and I was given copies to take to the American Consulate and the American Express. While all of this was going on, Gladys used the police phone to call Anne and tell her we were at the police station.

Well, it was nearly night when we carefully crawled back down those steps to the ground floor, went out into the narrow cobbled-stone canalside street and contemplated how we were going to get back to the hotel. You see, the problem was that taxis in Amsterdam do not cruise as in other large cities. You have to find a taxi rank and stand in line until your turn, and if you don't know where a taxi rank is you could wander for days around those canals. Studying my city-map in the eerie approaching darkness, I located the nearest "plein" (square) and in no time at all we were sitting in our hotel room with our cobble-stone-bruised feet propped on the bed, regaling Anne of our adventure.

During the days that followed, between marvelous visits to the tranquil villages of Holland — Gouda, Utrecht, Wassenaar, bustling Hague and Rotterdam — as well as walking tours from east to west and north to south in Amsterdam to visit museums, flea markets, and renowned restaurants, I made three trips to the American Consulate away out on Museumplein, one trip back down to the Nieuwenstraat to have my photos made in case I got a new passport, another trip down to American Express in the dirty Damrak area near Central Station where the riffraff is as thick as the flies on the open-air pastry stalls, plus two visits and numerous telephone calls to KLM about my ticket.

The nice man at American Express took less than 30 minutes to judge me an honest U.S. citizen in good standing by my word alone for I had no proof, and gave me the entire amount of my stolen traveler's checks. It took the American Consulate considerably longer, for it was only two hours before my departure from Schiphol Airport 10 miles away that my temporary consulate passport was issued. KLM had capitulated earlier that morning, writing me out a new ticket.

It was only when I finally had my documents in hand that the creepy feeling of uncertainty vanished. Had I not had my traveler's checks numbers, my passport number, and other identification in separate places from my handbag, it may have been even more difficult. I might still be wandering the canals and sinister neighborhoods of Amsterdam, homeless, forlorn and abandoned.

As it was, no harm really was done. I had survived.`,
    media: [],
  },
  {
    id: 'stone-walls-or-treetops',
    place: 'Mont St. Michel',
    pinLabel: 'France',
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

/**
 * Her introduction to The Best of Madera (IMG_0568–0569). It lives on the
 * About page rather than under a pin — it introduces all of it.
 */
export const introduction: Entry = {
  id: 'introduction',
  place: 'Montgomery',
  lat: 32.3668,
  lng: -86.3,
  year: null, // book publication year unknown — she left the paper in 1982
  title: 'Introduction',
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
}
