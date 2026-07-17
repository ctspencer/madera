import { useMemo, useState } from 'react'
import { Globe } from './components/Globe'
import { EntryPanel } from './components/EntryPanel'
import { PlacesStrip } from './components/PlacesStrip'
import { AboutPage } from './components/AboutPage'
import { EulogyPage } from './components/EulogyPage'
import { PhotosPage } from './components/PhotosPage'
import { LettersPage } from './components/LettersPage'
import { SelectedWorksPage } from './components/SelectedWorksPage'
import { Opening } from './components/Opening'
import { entries, groupByPlace, type Place } from './data/entries'

type Overlay = 'about' | 'eulogy' | 'works' | 'photos' | 'letters' | null

export default function App() {
  const places = useMemo(() => groupByPlace(entries), [])
  const [selected, setSelected] = useState<Place | null>(null)
  const [overlay, setOverlay] = useState<Overlay>(null)
  const [archiveOpen, setArchiveOpen] = useState(false)
  const [hasReadSomething, setHasReadSomething] = useState(false)
  const [opening, setOpening] = useState(true)

  const openPlace = (place: Place) => {
    setOverlay(null)
    setSelected(place)
    setHasReadSomething(true)
  }

  return (
    <div className="app">
      <header className="site-header">
        <h1 className="wordmark">Madera</h1>
        <nav className="site-nav" aria-label="Site">
          <div className="nav-row">
            <button className="nav-link" onClick={() => setOverlay('about')}>
              About
            </button>
            <button className="nav-link" onClick={() => setOverlay('eulogy')}>
              Eulogy
            </button>
            <button className="nav-link" onClick={() => setOverlay('works')}>
              Selected Works
            </button>
          </div>
          <div className="nav-row">
            <button
              className="nav-link nav-archive"
              aria-expanded={archiveOpen}
              onClick={() => setArchiveOpen((o) => !o)}
            >
              Archive <span className="nav-caret">{archiveOpen ? '▾' : '▸'}</span>
            </button>
            {archiveOpen && (
              <>
                <button className="nav-link nav-sub" onClick={() => setOverlay('photos')}>
                  Photos
                </button>
                <button className="nav-link nav-sub" onClick={() => setOverlay('letters')}>
                  Letters
                </button>
              </>
            )}
          </div>
        </nav>
      </header>
      <Globe places={places} selected={selected} onSelect={openPlace} />
      <PlacesStrip places={places} onSelect={openPlace} />
      {!hasReadSomething && (
        <p className="globe-hint">
          Click a <span className="hint-dot" aria-label="red dot" /> to begin
        </p>
      )}
      {selected && <EntryPanel place={selected} onClose={() => setSelected(null)} />}
      {overlay === 'about' && <AboutPage onClose={() => setOverlay(null)} />}
      {overlay === 'eulogy' && <EulogyPage onClose={() => setOverlay(null)} />}
      {overlay === 'works' && <SelectedWorksPage onClose={() => setOverlay(null)} />}
      {overlay === 'photos' && <PhotosPage onClose={() => setOverlay(null)} />}
      {overlay === 'letters' && <LettersPage onClose={() => setOverlay(null)} />}
      {opening && <Opening onDone={() => setOpening(false)} />}
    </div>
  )
}
