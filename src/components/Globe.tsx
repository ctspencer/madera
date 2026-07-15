import { useEffect, useRef, useState } from 'react'
import GlobeGL, { type GlobeMethods } from 'react-globe.gl'
import { AmbientLight, DirectionalLight, MeshPhongMaterial } from 'three'
import type { Place } from '../data/entries'

interface GlobeProps {
  places: Place[]
  selected: Place | null
  onSelect: (place: Place) => void
}

interface CountryFeature {
  properties: { name: string }
}

// Soft creams for the landmasses, assigned steadily by name so a
// country keeps its shade across sessions.
const LAND_TONES = ['#efe8d8', '#e5ddc9', '#f3eee1', '#ded5c0', '#eae2d0']

// Opaque soft sapphire — matched to the shade the old translucent ocean
// showed over the lilac ground, without the see-through ghosting.
const oceanMaterial = new MeshPhongMaterial({ color: '#6f8bc0' })

function landTone(feature: object): string {
  const name = (feature as CountryFeature).properties.name
  let sum = 0
  for (let i = 0; i < name.length; i++) sum += name.charCodeAt(i)
  return LAND_TONES[sum % LAND_TONES.length]
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

export function Globe({ places, selected, onSelect }: GlobeProps) {
  const globeRef = useRef<GlobeMethods | undefined>(undefined)
  const { width, height } = useWindowSize()
  const [countries, setCountries] = useState<object[]>([])
  // Labels crowd each other at full-globe zoom (Europe especially), so they
  // fade in once the camera is close enough for them to have room; the
  // places strip carries the full index at every zoom, hover reveals one.
  const [showLabels, setShowLabels] = useState(false)
  const resumeTimer = useRef<number | undefined>(undefined)
  const onSelectRef = useRef(onSelect)
  onSelectRef.current = onSelect

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}data/countries.geo.json`)
      .then((r) => r.json())
      .then((geo) => setCountries(geo.features))
  }, [])

  useEffect(() => {
    const globe = globeRef.current
    if (!globe) return
    const controls = globe.controls()
    controls.autoRotate = true
    controls.autoRotateSpeed = 0.4
    controls.minDistance = 130
    globe.pointOfView({ lat: 25, lng: -50, altitude: 2.1 })

    // Mostly-ambient light so the land reads as flat matte paper from every
    // angle — the default fixed directional light leaves whole hemispheres
    // black. A faint directional adds just enough modeling.
    const fill = new DirectionalLight('#fff6e6', 0.9)
    fill.position.set(100, 150, 200)
    globe.lights([new AmbientLight('#ffffff', 2.4), fill])

    // The globe keeps turning: pause only while the user is actually
    // dragging or the camera is flying, drift again a few seconds later.
    const pause = () => {
      controls.autoRotate = false
      window.clearTimeout(resumeTimer.current)
    }
    const scheduleResume = () => {
      window.clearTimeout(resumeTimer.current)
      resumeTimer.current = window.setTimeout(() => {
        controls.autoRotate = true
      }, 3000)
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
    if (!globe || !selected) return
    const controls = globe.controls()
    controls.autoRotate = false
    window.clearTimeout(resumeTimer.current)
    globe.pointOfView({ lat: selected.lat, lng: selected.lng, altitude: 1.5 }, 900)
    resumeTimer.current = window.setTimeout(() => {
      controls.autoRotate = true
    }, 3000)
  }, [selected])

  return (
    <div className={showLabels ? undefined : 'labels-hidden'}>
      <GlobeGL
      ref={globeRef}
      width={width}
      height={height}
      onZoom={(pov: { altitude?: number }) =>
        setShowLabels((pov.altitude ?? 99) < 1.7)
      }
      backgroundColor="rgba(0,0,0,0)"
      globeMaterial={oceanMaterial}
      showAtmosphere={true}
      atmosphereColor="#8f86c9"
      atmosphereAltitude={0.08}
      polygonsData={countries}
      polygonCapColor={landTone}
      polygonSideColor={() => 'rgba(60, 52, 82, 0.25)'}
      polygonStrokeColor={() => '#a89f8c'}
      polygonAltitude={0.006}
      polygonsTransitionDuration={0}
      htmlElementsData={places}
      htmlLat="lat"
      htmlLng="lng"
      htmlAltitude={0.015}
      htmlElement={(d: object) => {
        const place = d as Place
        const el = document.createElement('div')
        el.className = 'pin'
        el.innerHTML = `<span class="pin-dot"></span><span class="pin-label">${place.label}</span>`
        el.addEventListener('click', (ev) => {
          ev.stopPropagation()
          onSelectRef.current(place)
        })
        return el
      }}
      />
    </div>
  )
}
