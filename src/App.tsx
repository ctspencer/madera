import { useMemo, useState } from 'react'
import { Globe } from './components/Globe'
import { EntryPanel } from './components/EntryPanel'
import { PlacesList } from './components/PlacesList'
import { AboutPage } from './components/AboutPage'
import { entries, groupByPlace, type Place } from './data/entries'

export default function App() {
  const places = useMemo(() => groupByPlace(entries), [])
  const [selected, setSelected] = useState<Place | null>(null)
  const [showAbout, setShowAbout] = useState(false)

  return (
    <div className="app">
      <header className="site-header">
        <h1 className="wordmark">Madera</h1>
        <nav className="site-nav" aria-label="Site">
          <button className="nav-link" onClick={() => setShowAbout(true)}>
            About
          </button>
          <PlacesList
            places={places}
            onSelect={(place) => {
              setShowAbout(false)
              setSelected(place)
            }}
          />
        </nav>
      </header>
      <Globe places={places} selected={selected} onSelect={setSelected} />
      {selected && <EntryPanel place={selected} onClose={() => setSelected(null)} />}
      {showAbout && <AboutPage onClose={() => setShowAbout(false)} />}
    </div>
  )
}
