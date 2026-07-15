import ReactMarkdown from 'react-markdown'
import { introduction } from '../data/entries'

interface AboutPageProps {
  onClose: () => void
}

export function AboutPage({ onClose }: AboutPageProps) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <article
        className="modal-card"
        aria-label="About"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="entry-close" onClick={onClose} aria-label="Close">
          ×
        </button>
        <h2 className="about-title">Madera Spencer</h2>
        <blockquote className="about-epigraph">
          &ldquo;Whatever a life span may be, it is the quality, not
          quantity, that counts.&rdquo;
          <span className="about-epigraph-attr">— Madera Spencer</span>
        </blockquote>
        <p className="about-text">
          After 105 years, Madera &ldquo;Deedie&rdquo; Spencer, was fortunate
          and grateful to have both. For some 27 years, from 1955 to 1982,
          Madera wrote for the Montgomery Advertiser&rsquo;s pre-eminent
          column, &ldquo;Inside Views&rdquo;, sharing her wanderlust and
          adventures across the globe with a loyal following.
        </p>
        <p className="about-text">
          In 1988 The Montgomery Advertiser published a select run of her
          collected works, entitled &ldquo;The Best of Madera&rdquo;,
          showcasing her most popular writings. Some have won journalism
          awards; all have won a loyal following from Madera&rsquo;s
          groupies.
        </p>
        <p className="about-text">
          In 2026, after the passing of Madera, &ldquo;The Best of
          Madera&rdquo; has been digitized and published for the world on
          this website by her great grandson, as a monument to her
          journalism and Southern elegance.
        </p>
        <p className="about-intro-heading">
          Her introduction to <em>The Best of Madera</em>:
        </p>
        <div className="entry-body">
          <ReactMarkdown>{introduction.body!}</ReactMarkdown>
        </div>
      </article>
    </div>
  )
}
