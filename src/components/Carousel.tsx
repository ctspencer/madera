import { useEffect, useRef, useState, type ReactNode } from 'react'

interface CarouselProps {
  count: number
  render: (index: number) => ReactNode
}

/**
 * One item at a time, arrows either side (and keyboard ←/→) to move
 * between items; a tall item (a multi-page letter) scrolls vertically
 * within its frame. Wraps around at the ends.
 */
export function Carousel({ count, render }: CarouselProps) {
  const [index, setIndex] = useState(0)
  const frameRef = useRef<HTMLDivElement>(null)

  const step = (delta: number) => {
    setIndex((i) => (i + delta + count) % count)
    frameRef.current?.scrollTo({ top: 0 })
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') step(-1)
      if (e.key === 'ArrowRight') step(1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  return (
    <div className="carousel">
      <button className="carousel-arrow" onClick={() => step(-1)} aria-label="Previous">
        ‹
      </button>
      <div className="carousel-frame" ref={frameRef}>
        {render(index)}
      </div>
      <button className="carousel-arrow" onClick={() => step(1)} aria-label="Next">
        ›
      </button>
      <p className="carousel-counter">
        {index + 1} of {count}
      </p>
    </div>
  )
}
