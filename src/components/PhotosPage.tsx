import { entries, introduction } from '../data/entries'

interface PhotosPageProps {
  onClose: () => void
}

// Every image already attached to an entry, gathered in one place.
const photos = [...entries, introduction].flatMap((entry) =>
  entry.media.map((src) => ({
    src,
    place: entry.place,
    caption: entry.title,
  })),
)

export function PhotosPage({ onClose }: PhotosPageProps) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <article
        className="modal-card"
        aria-label="Photos"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="entry-close" onClick={onClose} aria-label="Close">
          ×
        </button>
        <h2 className="about-title">Photos</h2>
        <div className="photo-grid">
          {photos.map((photo) => (
            <figure key={photo.src} className="photo-figure">
              <img src={import.meta.env.BASE_URL + photo.src} alt={photo.caption} />
              <figcaption>
                <span className="photo-place">{photo.place}</span>
                {photo.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </article>
    </div>
  )
}
