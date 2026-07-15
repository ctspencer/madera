import { Carousel } from './Carousel'
import { photos } from '../data/archive'

interface PhotosPageProps {
  onClose: () => void
}

export function PhotosPage({ onClose }: PhotosPageProps) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <article
        className="modal-card modal-gallery"
        aria-label="Photos"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="entry-close" onClick={onClose} aria-label="Close">
          ×
        </button>
        <h2 className="about-title">Photos</h2>
        <Carousel
          count={photos.length}
          render={(i) => (
            <figure className="photo-figure">
              <img
                src={import.meta.env.BASE_URL + photos[i].src}
                alt={photos[i].caption}
              />
              <figcaption>
                {photos[i].date && (
                  <span className="photo-place">{photos[i].date}</span>
                )}
                {photos[i].caption}
              </figcaption>
            </figure>
          )}
        />
      </article>
    </div>
  )
}
