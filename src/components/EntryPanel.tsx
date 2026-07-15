import ReactMarkdown from 'react-markdown'
import type { Entry } from '../data/entries'

interface EntryPanelProps {
  entry: Entry
  onClose: () => void
}

export function EntryPanel({ entry, onClose }: EntryPanelProps) {
  return (
    <aside className="entry-panel" aria-label={entry.place}>
      <button className="entry-close" onClick={onClose} aria-label="Close">
        ×
      </button>
      <header className="entry-header">
        <p className="entry-place">{entry.place}</p>
        {entry.year !== null && <p className="entry-year">{entry.year}</p>}
        <h2 className="entry-title">{entry.title}</h2>
      </header>
      <div className="entry-body">
        {entry.body && <ReactMarkdown>{entry.body}</ReactMarkdown>}
        {entry.media.map((src) => (
          <img key={src} src={src} alt="" className="entry-media" />
        ))}
        {!entry.body && entry.media.length === 0 && (
          <p className="entry-empty">Not yet transcribed.</p>
        )}
      </div>
    </aside>
  )
}
