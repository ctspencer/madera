import { Fragment } from 'react'
import ReactMarkdown from 'react-markdown'
import type { Place } from '../data/entries'

interface EntryPanelProps {
  place: Place
  onClose: () => void
}

export function EntryPanel({ place, onClose }: EntryPanelProps) {
  return (
    <aside className="entry-panel" aria-label={place.place}>
      <button className="entry-close" onClick={onClose} aria-label="Close">
        ×
      </button>
      <header className="entry-header">
        <p className="entry-place">{place.place}</p>
      </header>
      {place.entries.map((entry, i) => (
        <Fragment key={entry.id}>
          {i > 0 && <p className="entry-divider" aria-hidden="true">· · ·</p>}
          <section className="entry-section">
            {entry.year !== null && <p className="entry-year">{entry.year}</p>}
            <h2 className="entry-title">{entry.title}</h2>
            <div className="entry-body">
              {entry.body && <ReactMarkdown>{entry.body}</ReactMarkdown>}
              {entry.media.map((src) => (
                <img key={src} src={src} alt="" className="entry-media" />
              ))}
              {!entry.body && entry.media.length === 0 && (
                <p className="entry-empty">Not yet transcribed.</p>
              )}
            </div>
          </section>
        </Fragment>
      ))}
    </aside>
  )
}
