import { useMemo, useState } from 'react'
import { Globe } from './components/Globe'
import { EntryPanel } from './components/EntryPanel'
import { PlacesStrip } from './components/PlacesStrip'
import { AboutPage } from './components/AboutPage'
import { EulogyPage } from './components/EulogyPage'
import { PhotosPage } from './components/PhotosPage'
import { entries, groupByPlace, type Place } from './data/entries'

type Overlay = 'about' | 'eulogy' | 'photos' | null

export default function App() {
  const places = useMemo(() => groupByPlace(entries), [])
  const [selected, setSelected] = useState<Place | null>(null)
  const [overlay, setOverlay] = useState<Overlay>(null)

  const openPlace = (place: Place) => {
    setOverlay(null)
    setSelected(place)
  }

  return (
    <div className="app">
      <header className="site-header">
        <h1 className="wordmark">Madera</h1>
        <nav className="site-nav" aria-label="Site">
          <button className="nav-link" onClick={() => setOverlay('about')}>
            About
          </button>
          <button className="nav-link" onClick={() => setOverlay('eulogy')}>
            Eulogy
          </button>
          <button className="nav-link" onClick={() => setOverlay('photos')}>
            Photos
          </button>
        </nav>
      </header>
      <Globe places={places} selected={selected} onSelect={setSelected} />
      <PlacesStrip places={places} onSelect={openPlace} />
      {selected && <EntryPanel place={selected} onClose={() => setSelected(null)} />}
      {overlay === 'about' && <AboutPage onClose={() => setOverlay(null)} />}
      {overlay === 'eulogy' && <EulogyPage onClose={() => setOverlay(null)} />}
      {overlay === 'photos' && <PhotosPage onClose={() => setOverlay(null)} />}
    </div>
  )
}
