import { useMemo, useState } from 'react'
import { Globe } from './components/Globe'
import { EntryPanel } from './components/EntryPanel'
import { PlacesList } from './components/PlacesList'
import { entries, groupByPlace, type Place } from './data/entries'

export default function App() {
  const places = useMemo(() => groupByPlace(entries), [])
  const [selected, setSelected] = useState<Place | null>(null)

  return (
    <div className="app">
      <header className="site-header">
        <h1 className="wordmark">Madera</h1>
      </header>
      <Globe places={places} selected={selected} onSelect={setSelected} />
      <PlacesList places={places} onSelect={setSelected} />
      <figure className="bird">
        <img
          src={`${import.meta.env.BASE_URL}art/audubon-plate-21-mocking-bird.jpg`}
          alt="Mocking Bird, Plate 21 of Audubon's Birds of America"
        />
      </figure>
      {selected && <EntryPanel place={selected} onClose={() => setSelected(null)} />}
    </div>
  )
}
