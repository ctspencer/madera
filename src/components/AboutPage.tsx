interface AboutPageProps {
  onClose: () => void
}

export function AboutPage({ onClose }: AboutPageProps) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <article
        className="modal-card"
        aria-label="About"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="entry-close" onClick={onClose} aria-label="Close">
          ×
        </button>
        <h2 className="about-title">Madera Spencer</h2>
        <p className="about-text">
          She traveled widely and wrote about the places she went. This site
          maps her own words to the world she saw: choose a place on the
          globe, or from the list of places, and read what she wrote there.
        </p>
        <p className="about-text about-placeholder">
          <em>Placeholder — the rest of this page is still to be written.</em>
        </p>
      </article>
    </div>
  )
}
