import { useEffect, useRef, useState } from 'react'
import GlobeGL, { type GlobeMethods } from 'react-globe.gl'
import type { Entry } from '../data/entries'

interface GlobeProps {
  entries: Entry[]
  selected: Entry | null
  onSelect: (entry: Entry) => void
}

function useWindowSize() {
  const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight })
  useEffect(() => {
    const onResize = () => setSize({ width: window.innerWidth, height: window.innerHeight })
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])
  return size
}

export function Globe({ entries, selected, onSelect }: GlobeProps) {
  const globeRef = useRef<GlobeMethods | undefined>(undefined)
  const { width, height } = useWindowSize()
  const resumeTimer = useRef<number | undefined>(undefined)
  const selectedRef = useRef(selected)
  selectedRef.current = selected
  const onSelectRef = useRef(onSelect)
  onSelectRef.current = onSelect

  useEffect(() => {
    const globe = globeRef.current
    if (!globe) return
    const controls = globe.controls()
    controls.autoRotate = true
    controls.autoRotateSpeed = 0.4
    controls.minDistance = 130
    globe.pointOfView({ lat: 25, lng: -50, altitude: 2.1 })

    // Rotation yields to the reader: pause while dragging or while an
    // entry is open, drift again a few seconds after they let go.
    const pause = () => {
      controls.autoRotate = false
      window.clearTimeout(resumeTimer.current)
    }
    const scheduleResume = () => {
      window.clearTimeout(resumeTimer.current)
      resumeTimer.current = window.setTimeout(() => {
        if (!selectedRef.current) controls.autoRotate = true
      }, 4000)
    }
    controls.addEventListener('start', pause)
    controls.addEventListener('end', scheduleResume)
    return () => {
      controls.removeEventListener('start', pause)
      controls.removeEventListener('end', scheduleResume)
      window.clearTimeout(resumeTimer.current)
    }
  }, [])

  useEffect(() => {
    const globe = globeRef.current
    if (!globe) return
    if (selected) {
      globe.controls().autoRotate = false
      globe.pointOfView({ lat: selected.lat, lng: selected.lng, altitude: 1.7 }, 900)
    } else {
      globe.controls().autoRotate = true
    }
  }, [selected])

  return (
    <GlobeGL
      ref={globeRef}
      width={width}
      height={height}
      backgroundColor="rgba(0,0,0,0)"
      globeImageUrl={`${import.meta.env.BASE_URL}textures/earth-blue-marble.jpg`}
      showAtmosphere={true}
      atmosphereColor="#d8c3a0"
      atmosphereAltitude={0.12}
      htmlElementsData={entries}
      htmlLat="lat"
      htmlLng="lng"
      htmlAltitude={0.015}
      htmlElement={(d: object) => {
        const entry = d as Entry
        const el = document.createElement('div')
        el.className = 'pin'
        el.innerHTML = `
          <svg width="20" height="27" viewBox="0 0 24 32" aria-hidden="true">
            <path d="M12 0C5.4 0 0 5.4 0 12c0 9 12 20 12 20s12-11 12-20C24 5.4 18.6 0 12 0z"/>
            <circle cx="12" cy="12" r="4.5"/>
          </svg>
          <span class="pin-label">${entry.place}</span>`
        el.addEventListener('click', (ev) => {
          ev.stopPropagation()
          onSelectRef.current(entry)
        })
        return el
      }}
    />
  )
}
