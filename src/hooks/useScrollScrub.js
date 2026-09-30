import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'

/**
 * Drives a pinned stage from scroll position.
 *
 * The stage is a tall element with a sticky `pin` inside it. Progress `p` runs
 * 0 → 1 across exactly the distance the pin stays stuck, and is handed to
 * `frame(p, stage, metrics)` on every scroll event, which writes whatever
 * styles the stage needs. `measure(stage)` runs on arm and on resize and its
 * result is passed to every frame, so layout is read once, not per event.
 *
 * `armed` is false until `query` matches, and flips back if it stops matching
 * (a resize into the mobile layout, or reduced motion switched on). The caller
 * uses it to opt *into* the pinned layout, so the fail-safe default is the
 * plain stacked page with everything visible — if this hook never runs, no
 * content is hidden. Getting that backwards once already left a whole section
 * blank.
 *
 * Frames are written straight from the scroll event, not inside
 * requestAnimationFrame: rAF does not run for a page the browser is not
 * painting, and a stage frozen half-assembled is worse than the occasional
 * redundant write.
 */
export function useScrollScrub({ query, measure, frame, reset, phaseAt }) {
  const stageRef = useRef(null)
  const pinRef = useRef(null)
  const metrics = useRef(null)
  const [armed, setArmed] = useState(false)
  // Which layer owns interaction. Kept as state (not a style write) because
  // it also drives `inert`, and it only changes a few times per traversal.
  const [phase, setPhase] = useState(() => phaseAt(0))

  useEffect(() => {
    const mq = window.matchMedia(query)
    const sync = () => setArmed(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [query])

  // Layout effect: the first frame has to be written before the armed layout
  // paints, or the later layers flash in their resting positions for a frame.
  useLayoutEffect(() => {
    const stage = stageRef.current
    const pin = pinRef.current
    if (!armed || !stage || !pin) return

    const update = () => {
      const { start, end } = pinWindow(stage, pin)
      const p = end > start ? Math.min(1, Math.max(0, (window.scrollY - start) / (end - start))) : 0
      frame(p, stage, metrics.current)
      const next = phaseAt(p)
      setPhase((current) => (next === current ? current : next))
    }

    const resize = () => {
      metrics.current = measure(stage)
      update()
    }

    resize()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', resize, { passive: true })
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', resize)
      reset?.(stage, metrics.current)
      metrics.current = null
    }
  }, [armed, measure, frame, reset, phaseAt])

  /** Scrolls the window so the stage sits at progress `p`. */
  const seek = useCallback((p) => {
    const stage = stageRef.current
    const pin = pinRef.current
    if (!stage || !pin) return
    const { start, end } = pinWindow(stage, pin)
    window.scrollTo({ top: start + p * (end - start), behavior: 'instant' })
  }, [])

  return { stageRef, pinRef, armed, phase, seek, metrics }
}

/**
 * The window scroll range over which the pin is actually stuck.
 *
 * It starts when the stage's top reaches the pin's sticky offset — or at 0
 * when the stage already sits above that line on load, as the home stage
 * does (it starts at the page top, under a nav that holds the pin down).
 * Measuring from the stage's top instead counted that nav-height offset as
 * scroll already done, so the page loaded a few percent into the sequence
 * with the hero partly taken apart.
 */
function pinWindow(stage, pin) {
  const top = parseFloat(getComputedStyle(pin).top) || 0
  const stageTop = stage.getBoundingClientRect().top + window.scrollY
  const start = Math.max(0, stageTop - top)
  const end = stageTop + stage.offsetHeight - pin.offsetHeight - top
  return { start, end }
}
