import { useEffect, useState } from 'react'

interface OpeningProps {
  onDone: () => void
}

/**
 * A brief frontispiece: the mockingbird first — the bird that sings
 * other birds' songs, as this site sings hers — then the world.
 * Fades on its own after a few seconds, or on the first click; it also
 * quietly covers the globe's initial land-building moment.
 */
export function Opening({ onDone }: OpeningProps) {
  const [fading, setFading] = useState(false)

  useEffect(() => {
    const t = window.setTimeout(() => setFading(true), 3200)
    return () => window.clearTimeout(t)
  }, [])

  useEffect(() => {
    if (!fading) return
    const t = window.setTimeout(onDone, 800)
    return () => window.clearTimeout(t)
  }, [fading, onDone])

  return (
    <div
      className={fading ? 'opening opening-fading' : 'opening'}
      onClick={() => setFading(true)}
    >
      <img
        className="opening-plate"
        src={`${import.meta.env.BASE_URL}art/audubon-plate-21-mocking-bird.jpg`}
        alt="Mocking Bird, Plate 21 of Audubon's Birds of America"
      />
      <p className="opening-caption">
        Mocking Bird · Audubon, <em>The Birds of America</em>
      </p>
      <p className="opening-title">Madera</p>
    </div>
  )
}
