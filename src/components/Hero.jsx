import { useCopy } from '../hooks/useCopy'
import { usePointerParallax } from '../hooks/usePointerParallax'
import { ProjectSystem } from './ProjectSystem'
import {
  ArrowIcon,
  CheckIcon,
  GithubIcon,
  LinkedinIcon,
  MailIcon,
  SparkIcon,
} from './Icons'
import { education, profile } from '../data/profile'

// Served from public/ — no bundler hashing, so these can be <link rel=preload>ed
// from index.html by stable URLs. WebP with a lossless alpha channel, so the
// cutout edge stays clean while the colour data compresses.
const PORTRAIT = '/assets/portrait.webp' // 1086x1448 — covers 2x at 680px tall
const PORTRAIT_MOBILE = '/assets/portrait-mobile.webp' // 600x800 — covers 2x at 400px

export function Hero() {
  const stageRef = usePointerParallax()
  const [copyState, copyEmail] = useCopy(profile.email)

  return (
    <section className="hero" ref={stageRef} aria-labelledby="hero-name">
      <div className="hero__grid">
        {/* ---- Left: identity -------------------------------------------- */}
        <div className="hero__col hero__col--left">
          {profile.availability ? (
            <p className="pill pill--status rise" style={{ '--i': 0 }}>
              <span className="pill__pulse" aria-hidden="true" />
              {profile.availability}
            </p>
          ) : null}

          <p className="micro hero__eyebrow rise" style={{ '--i': 1 }}>
            {profile.eyebrow}
          </p>

          <h1 id="hero-name" className="hero__name rise" style={{ '--i': 2 }}>
            {profile.name}
          </h1>

          <p className="hero__title rise" style={{ '--i': 3 }}>
            <SparkIcon className="hero__title-icon" />
            {profile.title}
          </p>

          <p className="hero__intro rise" style={{ '--i': 4 }}>
            {profile.intro}
          </p>

          <p className="micro hero__meta rise" style={{ '--i': 5 }}>
            {education.degreeShort} · {education.schoolShort} ·{' '}
            {education.spanShort}
          </p>

          <div className="hero__contact rise" style={{ '--i': 6 }}>
            {/* Copies rather than opens a mail app — the owner's choice. The
                address stays on the pill in every state so the hero never
                reflows; the result shows as a label above it. */}
            <button
              type="button"
              className={`pill pill--email is-${copyState}`}
              onClick={copyEmail}
              title="Copy email address"
            >
              {copyState === 'copied' ? (
                <CheckIcon className="pill__icon" />
              ) : (
                <MailIcon className="pill__icon" />
              )}
              <span>{profile.email}</span>
              <span className="sr-only"> — copy email address</span>
              <span className="pill__toast" aria-hidden="true">
                {copyState === 'failed' ? 'Copy failed' : 'Copied'}
              </span>
            </button>
            <p className="sr-only" role="status" aria-live="polite">
              {copyState === 'copied'
                ? 'Email address copied to clipboard.'
                : copyState === 'failed'
                  ? 'Could not copy the email address.'
                  : ''}
            </p>

            <ul className="social">
              <li>
                {profile.links.github ? (
                  <a
                    className="icon-btn"
                    href={profile.links.github}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label="GitHub profile"
                  >
                    <GithubIcon />
                  </a>
                ) : (
                  /* No verified URL yet — rendered inert rather than pointed
                     at a fabricated destination. */
                  <button
                    type="button"
                    className="icon-btn"
                    disabled
                    aria-label="GitHub profile — link not yet configured"
                    title="GitHub — URL to be added"
                  >
                    <GithubIcon />
                  </button>
                )}
              </li>
              <li>
                {profile.links.linkedin ? (
                  <a
                    className="icon-btn"
                    href={profile.links.linkedin}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label="LinkedIn profile"
                  >
                    <LinkedinIcon />
                  </a>
                ) : null}
              </li>
            </ul>
          </div>

          {/* Phones only: the project system is hidden there, so this hands
              the reader on to the showcase that follows. */}
          <a className="hero__projects" href="#projects">
            See my projects
            <ArrowIcon className="hero__projects-arrow" />
          </a>
        </div>

        {/* ---- Centre: portrait ------------------------------------------- */}
        <div className="hero__col hero__col--centre">
          <div className="portrait">
            <span className="portrait__halo" aria-hidden="true" />
            <span className="portrait__ring" aria-hidden="true" />
            <picture>
              <source
                media="(max-width: 720px)"
                srcSet={PORTRAIT_MOBILE}
                width="600"
                height="800"
              />
              <img
                className="portrait__img"
                src={PORTRAIT}
                alt="Abhishek Rai"
                width="1086"
                height="1448"
                fetchPriority="high"
                decoding="async"
              />
            </picture>
          </div>
        </div>

        {/* ---- Right: the project system --------------------------------- */}
        {/* The entrance and the parallax live on the system inside, leaving
            `translate` on this wrapper free for the scroll scrub. */}
        <div className="hero__col hero__col--right">
          <ProjectSystem />
        </div>
      </div>
    </section>
  )
}
