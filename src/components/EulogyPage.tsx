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
        <p className="about-text about-placeholder">
          <em>Placeholder — the eulogy will live here when it is written.</em>
        </p>
      </article>
    </div>
  )
}
