import { useEffect, useRef, useState } from 'react'

/** Fires once the element's top edge has risen past this fraction of the viewport. */
const TRIGGER = 0.85

/**
 * One-shot "has scrolled into view" flag for section entrances.
 *
 * Two independent triggers, because content must never be gated on an
 * animation firing:
 *
 *  1. IntersectionObserver — the cheap path.
 *  2. A passive scroll/resize check — the safety net. Observer callbacks are
 *     delivered during the browser's "update the rendering" step, which is
 *     skipped entirely for a page it is not painting; relying on the observer
 *     alone once left a whole section, copy included, rendered as blank
 *     background. Scroll events are not tied to rendering.
 *
 * Whichever fires first wins. If neither is available the element is treated
 * as visible rather than left hidden.
 */
export function useReveal() {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    let done = false
    let io = null

    const reveal = () => {
      if (done) return
      done = true
      setShown(true)
      io?.disconnect()
      window.removeEventListener('scroll', check)
      window.removeEventListener('resize', check)
    }

    const check = () => {
      if (el.getBoundingClientRect().top < window.innerHeight * TRIGGER) reveal()
    }

    if (typeof IntersectionObserver !== 'undefined') {
      io = new IntersectionObserver(
        ([e]) => {
          if (e.isIntersecting) reveal()
        },
        { threshold: 0, rootMargin: `0px 0px -${(1 - TRIGGER) * 100}% 0px` }
      )
      io.observe(el)
    }

    window.addEventListener('scroll', check, { passive: true })
    window.addEventListener('resize', check, { passive: true })
    check()

    return () => {
      io?.disconnect()
      window.removeEventListener('scroll', check)
      window.removeEventListener('resize', check)
    }
  }, [])

  return [ref, shown]
}
