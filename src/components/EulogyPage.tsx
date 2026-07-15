interface EulogyPageProps {
  onClose: () => void
}

export function EulogyPage({ onClose }: EulogyPageProps) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <article
        className="modal-card"
        aria-label="Eulogy"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="entry-close" onClick={onClose} aria-label="Close">
          ×
        </button>
        <h2 className="about-title">Eulogy</h2>
        <blockquote className="about-epigraph">
          &ldquo;No, my only problem had been in looking downward at
          life&rsquo;s inconsequential reflections. I needed to look higher
          at the reality of its blessings.&rdquo;
          <span className="about-epigraph-attr">—Deedie</span>
        </blockquote>
        <p className="about-text">
          As I write from my studio desk in Chelsea, Manhattan, the Empire
          State Building stands at my far left, the lush townhouse gardens
          below; a sanctuary amid the hustle and bustle of New York. Each
          morning I draw the blinds up to let the sunlight in and receive
          the daily guests that alight on my windowsill: pigeons (of
          course), sparrows, and the rarer bluejay. When the bluejay graces
          my fire escape, its blue wings set against the distant chrome
          skyscrapers, red brick pre-war townhouses, and green gardens, I
          feel as though Deedie is right there beside me, saying &ldquo;Well
          I declare, look at that!&rdquo;
        </p>
        <p className="about-text">
          Growing up, I made yearly trips to Alabama for holidays and
          gatherings, always stopping by Deedie&rsquo;s to hear her stories
          and watch nature outside the window together (there was always a
          bird feeder in sight). She showed me what a full life could be,
          and instilled in me a wanderlust that has carried me to New York,
          Munich, London, Istanbul, Athens, Milan, Madrid, and beyond. It
          was through her eyes that I first saw how beautiful, how bountiful
          the world is, and how many small wonders it holds.
        </p>
        <p className="about-text">
          Being Southern in New York carries a quiet stigma; I can see the
          subtle, immediate change in people&rsquo;s faces when they learn
          where my roots are. They hear &ldquo;Southern&rdquo; and think
          prejudice and ignorance. But when I think of what being Southern
          means, I think of Deedie: her kindness, her elegance, her
          intelligence, her curiosity, her openness to others. She is the
          South made manifest; a woman who traveled Europe and Asia,
          attended fashion shows, interviewed movie stars, moved through
          the New York party scene, and served on the Defense Advisory
          Committee on Women in the Services, the first of its kind at the
          Department of Defense.
        </p>
        <p className="about-text">
          Her lush life invites us to reflect on our own: to savor the small
          serendipities of our daily rhythms, and to keep looking outward at
          the world. Deedie reminds us that wonder is everywhere, and that
          noticing it, the inherent and diverse beauty of people and places,
          is what makes a life full and binds us to one another.
        </p>
        <p className="about-text">
          So the next time you mosey on down the road, stop and look closer
          into the trees, lest you miss the mockingbird and the stories it
          sings.
        </p>
        <p className="eulogy-signature">—Collin Spencer</p>
      </article>
    </div>
  )
}
