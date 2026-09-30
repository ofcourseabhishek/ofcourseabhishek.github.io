import { showcase, showcaseTools, tech, tools } from '../data/profile'
import { ArrowIcon } from './Icons'
import { useReveal } from '../hooks/useReveal'

import neuroone from '../../assets/derived/posters/neuroone.webp'
import snapgrade from '../../assets/derived/posters/snapgrade.webp'
import surge from '../../assets/derived/posters/surge.webp'
import council from '../../assets/derived/posters/ai-engineering-council.webp'
import conan from '../../assets/derived/posters/conan.webp'

/**
 * Each poster's silhouette: a project photograph from
 * assets/project_showcase/project_showcase_assets/, thresholded to white on
 * transparent so the poster's own colour shows through. `w`/`h` are the
 * derived file's size (fixes the aspect ratio before load); `span` is how
 * much of the poster's width it takes, anchored bottom-right — the MRI is
 * nearly square and would swallow the poster at full width. `open` is the
 * share of its height, from the top, that is empty and may sit under copy:
 * sky above the mountain and the turbines, none above the skull.
 *
 * The two tools use the photographs in their own asset folders: the council
 * chamber (cropped below the mural, which thresholds to noise) and the
 * contract under a gavel, where the paper and its lettering carry the shape.
 */
const ART = {
  neuroone: { src: neuroone, w: 1200, h: 926, span: 0.6, open: 0 },
  snapgrade: { src: snapgrade, w: 1200, h: 560, span: 1, open: 0.3 },
  surge: { src: surge, w: 1200, h: 558, span: 1, open: 0.3 },
  'ai-engineering-council': { src: council, w: 1200, h: 559, span: 1, open: 0 },
  conan: { src: conan, w: 1200, h: 895, span: 0.7, open: 0 },
}

/** The owner's cap for the carousel. */
const MAX_CARDS = 5

const YEAR = '2026'
const pad = (n) => String(n).padStart(2, '0')

/**
 * Projects first, then the chosen tools. A tool has no tagline, category,
 * stack or photograph on record, so its poster simply leaves those out
 * rather than having anything written for it.
 */
const TOOL_CARDS = showcaseTools
  .map((name) => tools.find((t) => t.name === name))
  .filter(Boolean)
  .map((t) => ({ ...t, id: t.name, kind: 'tool', live: null }))

const CARDS = [...showcase, ...TOOL_CARDS].slice(0, MAX_CARDS)
const TOOL_COUNT = CARDS.filter((c) => c.kind === 'tool').length

function Poster({ item, index }) {
  const [ref, shown] = useReveal()
  const art = ART[item.id]
  const isTool = item.kind === 'tool'
  const titleId = `poster-${item.id}`

  return (
    <article
      ref={ref}
      className={`poster poster--${item.id}${isTool ? ' poster--tool' : ''}${art ? ' poster--has-art' : ''}${shown ? ' is-in' : ''}`}
      style={{
        '--i': index,
        ...(art && {
          '--art-span': art.span,
          '--art-ratio': art.h / art.w,
          '--art-open': art.open,
        }),
      }}
      aria-labelledby={titleId}
    >
      <div className="poster__rules" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </div>

      <dl className="poster__meta">
        <div>
          <dt className="sr-only">Card</dt>
          <dd>
            {pad(index + 1)} / {pad(CARDS.length)}
            <br />
            <span className="poster__soft">Selected work {YEAR}</span>
          </dd>
        </div>
        <div>
          <dt className="poster__soft">Repository —</dt>
          <dd className="poster__path">{item.repo.split('/').pop()}</dd>
        </div>
        {item.stack ? (
          <div>
            <dt className="poster__soft">Built with</dt>
            <dd>{item.stack.map((k) => tech[k]?.label ?? k).join(', ')}</dd>
          </div>
        ) : (
          <div>
            <dt className="poster__soft">Kind</dt>
            <dd>Tool</dd>
          </div>
        )}
        <div>
          <dt className="poster__soft">Status</dt>
          <dd>
            {item.live
              ? 'Live and open source'
              : item.forkedFrom
                ? `Contributor to ${item.forkedFrom}`
                : 'Open source'}
          </dd>
        </div>
      </dl>

      {/* The name is set whole in the script face on every card; projects add
          their category beneath it in the grotesk. */}
      <h3 id={titleId} className={`poster__title${isTool ? ' poster__title--tool' : ''}`}>
        <span className="poster__name">{item.name}</span>
        {item.category ? (
          <span className="poster__category">{item.category}</span>
        ) : null}
      </h3>

      <div className="poster__notes">
        {item.tagline ? (
          <p className="poster__note">
            <span className="poster__mark" aria-hidden="true">
              ✳
            </span>
            {item.tagline}
          </p>
        ) : null}

        <ul className="poster__links">
          {item.live ? (
            <li>
              <a href={item.live} target="_blank" rel="noreferrer noopener">
                Live site<span className="sr-only"> — {item.name}</span>
                <ArrowIcon className="poster__arrow" />
              </a>
            </li>
          ) : null}
          <li>
            <a href={item.repo} target="_blank" rel="noreferrer noopener">
              Source<span className="sr-only"> — {item.name}</span>
              <ArrowIcon className="poster__arrow" />
            </a>
          </li>
        </ul>

        <p className="poster__blurb">{item.blurb}</p>
      </div>

      {art ? (
        <img
          className="poster__art"
          src={art.src}
          width={art.w}
          height={art.h}
          alt=""
          loading="lazy"
          decoding="async"
        />
      ) : null}
    </article>
  )
}

/**
 * Selected work as a row of Swiss posters, after the owner's reference: a
 * flat colour field per card, a four-column grid of small facts along the
 * top, a large title with the name in a script face, and a
 * one-bit photograph rising from the bottom edge.
 *
 * Three cards are in view at once and the rest are reached sideways. Inside
 * the pinned home stage the row is a scroll-driven train (see HomeStage);
 * everywhere else it is a native swipe row with snap points.
 */
export function PosterShowcase({ anchorId }) {
  const [ref, shown] = useReveal()
  const projectCount = CARDS.length - TOOL_COUNT

  return (
    <section
      id={anchorId}
      ref={ref}
      className={`works${shown ? ' is-in' : ''}`}
      aria-labelledby="works-title"
    >
      <header className="works__head">
        <h2 id="works-title" className="works__title">
          Selected work
        </h2>
        <p className="works__count micro">
          {pad(projectCount)} projects
          {TOOL_COUNT ? ` · ${pad(TOOL_COUNT)} tools` : ''} / {YEAR}
        </p>
      </header>

      <div className="works__viewport">
        <div className="works__track">
          {/* The car is the flex item and what the train moves. It also
              gives each poster a containing block of its own width, which
              its percentage padding resolves against — as a direct flex item
              that would be the whole track. */}
          {CARDS.map((c, i) => (
            <div key={c.id} className="works__car">
              <Poster item={c} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
