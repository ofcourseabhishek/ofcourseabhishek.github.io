import { useEffect, useRef } from 'react'
import { Hero } from './Hero'
import { PosterShowcase } from './PosterShowcase'
import { AboutIntro } from './About'
import { useScrollScrub } from '../hooks/useScrollScrub'

/**
 * Pinned only where there is room for it and motion is welcome. Below 721px
 * the page is a plain stack (the hero already has its own mobile layout) and
 * the showcase is a native swipe row.
 */
const ARM_QUERY = '(min-width: 721px) and (prefers-reduced-motion: no-preference)'

/**
 * The whole sequence on one progress value, as [start, end] windows of the
 * stage's travel. Overlaps are deliberate — each act begins before the last
 * has quite finished, so there is never an empty pinned frame — and the gaps
 * between the train arriving, the pan, and the departure are holds, so each
 * resting state can actually be read.
 */
const T = {
  out: [0, 0.2], // hero takes itself apart
  train: [0.12, 0.34], // cards run in from the right edge of the screen
  pan: [0.38, 0.6], // carousel steps through cards 4 and 5
  leave: [0.62, 0.78], // train departs left, fading as it crosses the edge
  // Starts only once the train is gone: the portrait travels right, the
  // cards travel left, and letting them cross reads as a collision.
  photo: [0.77, 0.92], // About portrait slides in from the left
  copy: [0.82, 0.95], // About text settles in
}

/** Where the nav's anchors land: each act at rest. */
const ANCHORS = [
  { id: 'projects', at: T.pan[0] },
  { id: 'about', at: 0.96 },
]

const phaseAt = (p) => (p < 0.2 ? 'hero' : p < T.leave[1] ? 'works' : 'about')

const clamp01 = (v) => Math.min(1, Math.max(0, v))
const ramp = (p, [a, b]) => clamp01((p - a) / (b - a))
const easeOut = (t) => 1 - (1 - t) ** 3
const easeIn = (t) => t ** 3
const smooth = (t) => t * t * (3 - 2 * t)

/** Carriages start this far apart (as a share of a card) and close up as the train brakes. */
const SLACK = 0.18
/** A card is gone once this share of it has crossed the left edge. */
const FADE = 0.5
/** Share of each carousel step spent parked at either end. */
const DWELL = 0.15

/**
 * Carousel pan with a park at every stop: most of each step is spent at rest
 * on a whole card, not drifting between two.
 */
function park(t, stops) {
  const n = stops.length - 1
  if (n < 1) return 0
  const x = t * n
  const k = Math.min(Math.floor(x), n - 1)
  const e = smooth(clamp01((x - k - DWELL) / (1 - 2 * DWELL)))
  return stops[k] + (stops[k + 1] - stops[k]) * e
}

function measure(stage) {
  const viewport = stage.querySelector('.works__viewport')
  const track = stage.querySelector('.works__track')
  const cards = Array.from(track.children)
  const cardW = cards[0]?.offsetWidth ?? 0
  const gap = parseFloat(getComputedStyle(track).columnGap) || 0
  const viewW = viewport.clientWidth
  const step = cardW + gap
  const panMax = Math.max(0, cards.length * step - gap - viewW)

  // One stop per card, then the flush-right end if it falls between two.
  const stops = [0]
  for (let x = step; x < panMax - 8; x += step) stops.push(x)
  if (panMax > 0) stops.push(panMax)

  return {
    cards,
    cardW,
    viewW,
    step,
    stops,
    // Puts the lead card's left edge exactly at the right edge of the screen.
    enter: window.innerWidth - viewport.getBoundingClientRect().left,
    // Far enough that the last card has fully faded past the left edge.
    leave: (cards.length - 1) * step - panMax + cardW * FADE,
  }
}

function frame(p, stage, m) {
  const train = easeOut(ramp(p, T.train))
  const pan = park(ramp(p, T.pan), m.stops)
  const leave = easeIn(ramp(p, T.leave))

  const s = stage.style
  s.setProperty('--out', ramp(p, T.out).toFixed(4))
  s.setProperty('--train', train.toFixed(4))
  s.setProperty('--leave', leave.toFixed(4))
  s.setProperty('--photo', easeOut(ramp(p, T.photo)).toFixed(4))
  s.setProperty('--copy', ramp(p, T.copy).toFixed(4))

  // One rigid train, plus coupling slack that closes as it arrives. Any card
  // crossing the left edge fades with the distance, so the carousel pan and
  // the departure read as the same motion.
  m.cards.forEach((card, i) => {
    const x = (1 - train) * (m.enter + i * m.cardW * SLACK) - pan - leave * m.leave
    const past = clamp01(-(i * m.step + x) / (m.cardW * FADE))
    card.style.translate = `${x.toFixed(1)}px 0`
    card.style.opacity = (1 - past).toFixed(3)
    card.style.pointerEvents = past > 0.5 ? 'none' : ''
  })
}

function reset(stage, m) {
  for (const name of ['--out', '--train', '--leave', '--photo', '--copy']) {
    stage.style.removeProperty(name)
  }
  m?.cards.forEach((card) => {
    card.style.translate = ''
    card.style.opacity = ''
    card.style.pointerEvents = ''
  })
}

/** Progress at which card `i` is parked fully inside the frame. */
function progressForCard(m, i) {
  const n = m.stops.length - 1
  if (n < 1) return T.pan[0]
  const left = i * m.step
  let k = m.stops.findIndex((s) => left - s >= -1 && left - s + m.cardW <= m.viewW + 1)
  if (k < 0) k = n
  return T.pan[0] + (k / n) * (T.pan[1] - T.pan[0])
}

/**
 * The first screen and the two that follow it, as one pinned stage. The
 * hero takes itself apart — portrait down, copy out, project system off to
 * the right — while the showcase runs in from the right edge like a train.
 * Scrolling on pans it as a carousel through the last cards, then it departs
 * left, fading as it goes, and the About portrait slides in from the left.
 * The pin releases on About at rest, and the page carries on normally.
 *
 * Unarmed, the three layers are plain stacked sections at full opacity.
 */
export function HomeStage() {
  const { stageRef, pinRef, armed, phase, seek, metrics } = useScrollScrub({
    query: ARM_QUERY,
    measure,
    frame,
    reset,
    phaseAt,
  })

  // Opened on #projects or #about, the browser jumped to that id before the
  // stage armed and moved it onto a marker. Land there again, once.
  const landed = useRef(false)
  useEffect(() => {
    if (!armed || landed.current) return
    landed.current = true
    const hit = ANCHORS.find((a) => `#${a.id}` === window.location.hash)
    if (hit) seek(hit.at)
  }, [armed, seek])

  // Tabbing into a card that is off-frame scrolls the stage to where it is
  // parked in view. Keyboard focus only: a mouse click also focuses the link,
  // and jumping the page under the pointer would be hostile.
  const followFocus = (e) => {
    if (!metrics.current || !e.target.matches(':focus-visible')) return
    const card = e.target.closest('.works__car')
    const i = metrics.current.cards.indexOf(card)
    seek(i < 0 ? T.pan[0] : progressForCard(metrics.current, i))
  }

  return (
    <div
      id="home"
      className={`stage stage--home${armed ? ' is-scrubbed' : ''}`}
      ref={stageRef}
      data-phase={armed ? phase : undefined}
    >
      {/* Armed, the sections are layers of one pinned frame, so their ids
          move onto markers at the scroll offset where each is at rest. */}
      {armed
        ? ANCHORS.map((a) => (
            <span
              key={a.id}
              id={a.id}
              className="stage__anchor"
              style={{ '--at': a.at }}
              aria-hidden="true"
            />
          ))
        : null}

      <div className="stage__pin" ref={pinRef}>
        {/* Once the hero has faded out it leaves the accessibility tree too,
            so nobody tabs into links they cannot see. */}
        <div className="stage__layer stage__layer--hero" inert={armed && phase !== 'hero'}>
          <Hero />
        </div>

        <div className="stage__layer stage__layer--works" onFocus={armed ? followFocus : undefined}>
          <PosterShowcase anchorId={armed ? undefined : 'projects'} />
        </div>

        <div className="stage__layer stage__layer--about">
          <AboutIntro anchorId={armed ? undefined : 'about'} />
        </div>
      </div>
    </div>
  )
}
