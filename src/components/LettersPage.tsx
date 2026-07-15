import { Carousel } from './Carousel'
import { letters } from '../data/archive'

interface LettersPageProps {
  onClose: () => void
}

export function LettersPage({ onClose }: LettersPageProps) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <article
        className="modal-card modal-gallery"
        aria-label="Letters"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="entry-close" onClick={onClose} aria-label="Close">
          ×
        </button>
        <h2 className="about-title">Letters</h2>
        <Carousel
          count={letters.length}
          render={(i) => (
            <div className="letter-item">
              <p className="letter-caption">
                {letters[i].date && (
                  <span className="photo-place">{letters[i].date}</span>
                )}
                {letters[i].title}
              </p>
              {letters[i].pages.map((page, n) => (
                <img
                  key={page}
                  src={import.meta.env.BASE_URL + page}
                  alt={`${letters[i].title} — page ${n + 1}`}
                  className="letter-page"
                />
              ))}
            </div>
          )}
        />
      </article>
    </div>
  )
}
