import { useState } from 'react'
import { Globe } from './components/Globe'
import { EntryPanel } from './components/EntryPanel'
import { entries, type Entry } from './data/entries'

export default function App() {
  const [selected, setSelected] = useState<Entry | null>(null)

  return (
    <div className="app">
      <header className="site-header">
        <h1 className="wordmark">Madera</h1>
      </header>
      <Globe entries={entries} selected={selected} onSelect={setSelected} />
      {selected && <EntryPanel entry={selected} onClose={() => setSelected(null)} />}
    </div>
  )
}
