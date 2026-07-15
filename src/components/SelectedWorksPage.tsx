import ReactMarkdown from 'react-markdown'
import { Carousel } from './Carousel'
import { entries, type Entry } from '../data/entries'
import { photos, type ArchivePhoto } from '../data/archive'

interface SelectedWorksPageProps {
  onClose: () => void
}

const entryById = (id: string): Entry => {
  const entry = entries.find((e) => e.id === id)
  if (!entry) throw new Error(`Selected Works: no entry '${id}'`)
  return entry
}

const photoBySrc = (fragment: string): ArchivePhoto => {
  const photo = photos.find((p) => p.src.includes(fragment))
  if (!photo) throw new Error(`Selected Works: no photo matching '${fragment}'`)
  return photo
}

interface Work {
  article?: Entry
  photoBefore?: ArchivePhoto
  photoAfter?: ArchivePhoto
}

// The owner's selection, in their order. Photos sit with the article
// they belong to; one photograph stands on its own.
const works: Work[] = [
  { article: entryById('lifes-reflections') },
  {
    article: entryById('bangkok-unique-to-senses'),
    photoAfter: photoBySrc('23_Princess_Rudivorivan'),
  },
  { article: entryById('a-penalty-for-difference') },
  {
    photoBefore: photoBySrc('12_Madera_Spencer_at_the_editors'),
    article: entryById('a-happening-in-new-york'),
  },
  { photoBefore: photoBySrc('15_Alfred_Hitchcock') },
  { article: entryById('stone-walls-or-treetops') },
  { article: entryById('feathered-freeloaders') },
]

function WorkPhoto({ photo }: { photo: ArchivePhoto }) {
  return (
    <figure className="photo-figure work-photo">
      <img src={import.meta.env.BASE_URL + photo.src} alt={photo.caption} />
      <figcaption>
        {photo.date && <span className="photo-place">{photo.date}</span>}
        {photo.caption}
      </figcaption>
    </figure>
  )
}

export function SelectedWorksPage({ onClose }: SelectedWorksPageProps) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <article
        className="modal-card modal-gallery"
        aria-label="Selected Works"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="entry-close" onClick={onClose} aria-label="Close">
          ×
        </button>
        <h2 className="about-title">Selected Works</h2>
        <Carousel
          count={works.length}
          render={(i) => {
            const work = works[i]
            return (
              <div className="work-item">
                {work.photoBefore && <WorkPhoto photo={work.photoBefore} />}
                {work.article && (
                  <section className="entry-section">
                    <p className="entry-place">{work.article.place}</p>
                    {work.article.year !== null && (
                      <p className="entry-year">{work.article.year}</p>
                    )}
                    <h3 className="entry-title">{work.article.title}</h3>
                    <div className="entry-body">
                      <ReactMarkdown>{work.article.body ?? ''}</ReactMarkdown>
                    </div>
                  </section>
                )}
                {work.photoAfter && <WorkPhoto photo={work.photoAfter} />}
              </div>
            )
          }}
        />
      </article>
    </div>
  )
}
