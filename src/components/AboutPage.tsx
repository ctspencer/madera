interface AboutPageProps {
  onClose: () => void
}

export function AboutPage({ onClose }: AboutPageProps) {
  return (
    <article className="about-page" aria-label="About">
      <button className="entry-close" onClick={onClose} aria-label="Close">
        ×
      </button>
      <div className="about-inner">
        <h2 className="about-title">Madera Spencer</h2>
        <p>
          She traveled widely and wrote about the places she went. This site
          maps her own words to the world she saw: choose a place on the
          globe, or from the list of places, and read what she wrote there.
        </p>
        <p className="about-placeholder">
          <em>
            Placeholder — the rest of this page is still to be written.
          </em>
        </p>
      </div>
    </article>
  )
}
