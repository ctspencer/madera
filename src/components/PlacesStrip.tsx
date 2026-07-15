import type { Place } from '../data/entries'

interface PlacesStripProps {
  places: Place[]
  onSelect: (place: Place) => void
}

/**
 * Chips carry the same names as the pins on the globe (city/place in the
 * U.S., country abroad). When two places share a pin name (two Bahamas
 * pins), their chips fall back to the specific place name (Nassau,
 * Small Hope Bay) so both stay reachable. Grouped U.S. first (her home
 * ground), then abroad, alphabetical within each.
 */
export function PlacesStrip({ places, onSelect }: PlacesStripProps) {
  const pinCounts = new Map<string, number>()
  for (const p of places) pinCounts.set(p.pin, (pinCounts.get(p.pin) ?? 0) + 1)
  const chipText = (p: Place) => ((pinCounts.get(p.pin) ?? 1) > 1 ? p.place : p.pin)
  const byText = (a: Place, b: Place) => chipText(a).localeCompare(chipText(b))

  const groups = [
    { name: 'United States', items: places.filter((p) => !p.abroad).sort(byText) },
    { name: 'Abroad', items: places.filter((p) => p.abroad).sort(byText) },
  ]

  return (
    <nav className="places-strip" aria-label="Places">
      {groups.map((group) => (
        <div key={group.name} className="places-group">
          <span className="places-group-label">{group.name}</span>
          <div className="places-group-chips">
            {group.items.map((place) => (
              <button key={place.place} className="chip" onClick={() => onSelect(place)}>
                {chipText(place)}
              </button>
            ))}
          </div>
        </div>
      ))}
    </nav>
  )
}
