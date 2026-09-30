import { useCallback, useEffect, useRef, useState } from 'react'
import { projects, tech } from '../data/profile'
import { ArrowIcon } from './Icons'

const CYCLE_MS = 7000

/**
 * The projects as an orbital system: one planet card visible at a time, with
 * that project's stack circling it as moons.
 *
 * Keeping the icons upright takes three nested elements per moon, because the
 * placement angle and the orbit's spin both have to be cancelled:
 *
 *   .moon         rotate(a) translateX(r)   puts it on the ring
 *   .moon__despin rotate(-t), animated      cancels the ring's rotation
 *   .moon__deangle rotate(-a)               cancels the placement angle
 *
 * The two rotations compose to identity on the icon, so the mark stays level
 * while its position travels the circle. Placement uses `transform`; the spin
 * uses the separate `rotate` property, so the animation never overwrites the
 * static placement.
 */
export function ProjectSystem() {
  // `prev` drives the exit direction: the outgoing card swings out the way it
  // came, so the pair always reads as one revolution rather than a crossfade.
  const [view, setView] = useState({ i: 0, prev: null })
  const [paused, setPaused] = useState(false)
  const [reduced, setReduced] = useState(false)
  const index = view.i
  const stageRef = useRef(null)

  const step = useCallback(
    (delta) =>
      setView((v) => ({
        i: (v.i + delta + projects.length) % projects.length,
        prev: v.i,
      })),
    []
  )

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReduced(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  // Auto-advance. Stopped entirely under reduced motion, and while the visitor
  // is hovering or keyboard-focused inside the system, so it never yanks a
  // card away from someone reading or tabbing through it.
  //
  // `index` is a dependency so the countdown restarts whenever the card
  // changes. Without it, choosing a project part-way through a cycle could
  // leave only a fraction of a second before it advanced again.
  // The interval id is a local, not a ref. Held in a ref, StrictMode's
  // double-mount makes the first cleanup read an id that the second run has
  // already overwritten — the original timer is never cleared and two run at
  // once, advancing the cards at double speed.
  useEffect(() => {
    if (reduced || paused) return
    const id = setInterval(() => step(1), CYCLE_MS)
    return () => clearInterval(id)
  }, [reduced, paused, index, step])

  // The portrait is the sun, so the cards revolve about *it* rather than about
  // themselves. Its centre is measured at runtime and published as an offset
  // from the card's own centre, because the distance between the two changes
  // with the viewport and with the stacked mobile layout.
  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return
    const sun = document.querySelector('.portrait__img')
    if (!sun) return

    const update = () => {
      const s = stage.getBoundingClientRect()
      const p = sun.getBoundingClientRect()
      // Aim at the head/upper torso rather than the image's centre — that is
      // where the figure reads as its centre of mass.
      const dx = p.left + p.width / 2 - (s.left + s.width / 2)
      const dy = p.top + p.height * 0.38 - (s.top + s.height / 2)
      stage.style.setProperty('--pivot-dx', `${Math.round(dx)}px`)
      stage.style.setProperty('--pivot-dy', `${Math.round(dy)}px`)
    }

    update()
    const ro = new ResizeObserver(update)
    ro.observe(document.body)
    return () => ro.disconnect()
  }, [])

  const go = useCallback(
    (i) => setView((v) => (i === v.i ? v : { i, prev: v.i })),
    []
  )

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      step(1)
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      step(-1)
    }
  }

  const active = projects[index]
  const moons = active.stack.map((k) => tech[k]).filter(Boolean)

  return (
    <div
      className={`system float rise${paused ? ' is-paused' : ''}`}
      style={{ '--i': 7, '--depth': '18px' }}
      role="group"
      aria-label="Featured projects"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="system__stage" ref={stageRef}>
        <span className="system__ring" aria-hidden="true" />

        {/* Moons — decorative here; each project's stack is also listed as
            text below the card, so the information is never icon-only. */}
        <div className="system__orbit" aria-hidden="true">
          {moons.map((m, i) => (
            <span
              key={`${active.name}-${m.label}`}
              className="moon"
              style={{ '--a': `${(360 / moons.length) * i}deg`, '--d': `${i * 90}ms` }}
            >
              <span className="moon__despin">
                <span className="moon__deangle">
                  <img className="moon__icon" src={m.icon} alt="" />
                </span>
              </span>
            </span>
          ))}
        </div>

        {/* Planets */}
        {projects.map((p, i) => {
          const isActive = i === index
          return (
            <article
              key={p.name}
              className={`planet${isActive ? ' is-active' : ''}${
                i === view.prev ? ' is-leaving' : ''
              }`}
              inert={!isActive}
              aria-hidden={!isActive}
            >
              <div className="planet__body">
              <div className="planet__head">
                <a
                  className="planet__name"
                  href={p.repo}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  {p.name}
                </a>
                {p.live ? (
                  <a
                    className="planet__live"
                    href={p.live}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={`${p.name} — open the live app`}
                  >
                    Live
                    <ArrowIcon className="planet__live-arrow" />
                  </a>
                ) : null}
              </div>

              <p className="planet__blurb">{p.blurb}</p>

              <p className="planet__stack micro">
                {p.stack.map((k) => tech[k]?.label).filter(Boolean).join(' · ')}
              </p>
              </div>
            </article>
          )
        })}
      </div>

      {/* Controls */}
      <div className="system__nav" onKeyDown={onKeyDown}>
        {projects.map((p, i) => (
          <button
            key={p.name}
            type="button"
            className={`system__dot${i === index ? ' is-active' : ''}`}
            onClick={() => go(i)}
            aria-label={`Show ${p.name}`}
            aria-current={i === index}
            tabIndex={i === index ? 0 : -1}
          >
            <span className="system__dot-mark" aria-hidden="true" />
          </button>
        ))}
        <a
          className="system__more"
          href="https://github.com/ofcourseabhishek"
          target="_blank"
          rel="noreferrer noopener"
        >
          More on GitHub
          <ArrowIcon className="system__more-arrow" />
        </a>
      </div>
    </div>
  )
}
