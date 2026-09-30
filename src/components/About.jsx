import { about, achievements, certifications, education } from '../data/profile'
import { ArrowIcon } from './Icons'
import { useReveal } from '../hooks/useReveal'

// Derived from potrait2-final.png, cropped to its alpha bounds. A true cut-out
// (32% of the frame is transparent), so it takes the hero's silhouette-
// following drop-shadow rather than a panel shadow.
//
// Imported rather than served from public/ so Vite fingerprints the filename.
// A fixed URL under public/ went stale in the browser when the asset was
// regenerated: an earlier, opaque version kept being served from cache and
// rendered with a white background long after the file on disk was correct.
import FINAL from '../../assets/derived/about-final.webp'
import FINAL_SM from '../../assets/derived/about-final-sm.webp'

/**
 * An editorial band: numeral and title in a left rail, content in the right
 * column, a hairline between bands. Each carries its own reveal so it arrives
 * as the reader reaches it rather than all at once on one screen.
 */
function Band({ num, title, id, children }) {
  const [ref, shown] = useReveal()

  return (
    <section
      ref={ref}
      className={`band${shown ? ' is-in' : ''}`}
      aria-labelledby={id}
    >
      <div className="band__rail">
        <span className="band__num micro" aria-hidden="true">
          {num}
        </span>
        <h3 id={id} className="band__title">
          {title}
        </h3>
      </div>

      <div className="band__body">{children}</div>
    </section>
  )
}

/**
 * Portrait and introduction. Rendered as the last layer of the pinned home
 * stage, where the scroll scrub slides the portrait in from the left; unarmed
 * it is an ordinary section with its own one-shot reveal.
 */
export function AboutIntro({ anchorId }) {
  const [ref, shown] = useReveal()

  return (
    <section
      id={anchorId}
      ref={ref}
      className={`about-intro${shown ? ' is-in' : ''}`}
      aria-labelledby="about-heading"
    >
      <div className="about__intro">
        <div className="about__photo">
          {/* Deliberately not lazy: this is the entrance of the section, so it
              has to be decoded before the reveal or it pops in mid-animation.
              Low fetch priority keeps it off the hero's critical path. */}
          <picture>
            <source media="(max-width: 720px)" srcSet={FINAL_SM} />
            <img
              className="about__photo-img"
              src={FINAL}
              alt="Abhishek Rai, leaning against a wall"
              fetchPriority="low"
              decoding="async"
            />
          </picture>
        </div>

        <div className="about__text">
          <p className="micro about__label">About</p>
          <h2 id="about-heading" className="about__heading">
            {about.heading}
          </h2>

          {about.paragraphs.map((p, i) => (
            <p key={i} className="about__para" style={{ '--i': i }}>
              {p}
            </p>
          ))}
        </div>
      </div>
    </section>
  )
}

/** The rest of About, below the stage, in the normal flow. */
export function About() {
  return (
    <div className="about">
      <Band num="01" title="Education & certification" id="band-education">
        <div className="entry">
          <p className="entry__lead">{education.degree}</p>
          <p className="entry__meta">
            {education.school} · {education.location}
          </p>
          <p className="entry__meta">
            {education.span} · GPA {education.gpa}
          </p>
        </div>

        <ul className="entry-list">
          {certifications.items.map((c) => (
            <li key={c.name} className="entry">
              <p className="entry__lead entry__lead--sm">
                {c.name}
                {c.status ? <span className="tag">{c.status}</span> : null}
              </p>
              <p className="entry__meta">
                {c.by} · {c.via}
              </p>
            </li>
          ))}
        </ul>

        {/* Rendered only when a real destination exists — see the
            TODO(verify) on certifications.url in profile.js. */}
        {certifications.url ? (
          <a
            className="band__link"
            href={certifications.url}
            target="_blank"
            rel="noreferrer noopener"
          >
            All certificates
            <ArrowIcon className="band__arrow" />
          </a>
        ) : null}
      </Band>

      <Band num="02" title="Achievements & open source" id="band-achievements">
        {achievements.items.length ? (
          <ul className="entry-list">
            {achievements.items.map((a) => (
              <li key={a.title} className="entry">
                <p className="entry__lead entry__lead--sm">{a.title}</p>
                <p className="entry__meta">{a.detail}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="band__soon">{achievements.placeholder}</p>
        )}
      </Band>
    </div>
  )
}
