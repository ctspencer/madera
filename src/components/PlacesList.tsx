import { useState } from 'react'
import type { Place } from '../data/entries'

interface PlacesListProps {
  places: Place[]
  onSelect: (place: Place) => void
}

export function PlacesList({ places, onSelect }: PlacesListProps) {
  const [open, setOpen] = useState(false)

  return (
    <nav className="places" aria-label="Places">
      {open && (
        <ul className="places-list">
          {places.map((place) => (
            <li key={place.place}>
              <button
                className="places-item"
                onClick={() => {
                  onSelect(place)
                  if (window.innerWidth <= 640) setOpen(false)
                }}
              >
                {place.place}
              </button>
            </li>
          ))}
        </ul>
      )}
      <button
        className="places-toggle"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        Places
      </button>
    </nav>
  )
}
