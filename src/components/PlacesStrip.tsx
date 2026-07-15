import type { Place } from '../data/entries'

interface PlacesStripProps {
  places: Place[]
  onSelect: (place: Place) => void
}

export function PlacesStrip({ places, onSelect }: PlacesStripProps) {
  return (
    <nav className="places-strip" aria-label="Places">
      {places.map((place) => (
        <button key={place.place} className="chip" onClick={() => onSelect(place)}>
          {place.label}
        </button>
      ))}
    </nav>
  )
}
