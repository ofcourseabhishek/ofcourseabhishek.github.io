import { useEffect, useState } from 'react'

/**
 * Tracks which section the reader is currently in, for the nav's active state.
 *
 * Deliberately not IntersectionObserver: several of these sections are pinned
 * stages far taller than the viewport, so "is it intersecting" answers the
 * wrong question — two of them intersect at once for most of the scroll. This
 * picks the last section whose top has passed the nav, which is the one the
 * reader is actually looking at, and it also works in a tab the browser is not
 * painting (where observer callbacks never fire).
 */
export function useScrollSpy(ids, offset = 120) {
  const [active, setActive] = useState(ids[0])

  useEffect(() => {
    const update = () => {
      // At the very bottom, the last section wins even if it is short enough
      // that its top never reaches the line.
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2
      if (atBottom) {
        setActive(ids[ids.length - 1])
        return
      }

      let current = ids[0]
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= offset) current = id
      }
      setActive((prev) => (prev === current ? prev : current))
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update, { passive: true })
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [ids, offset])

  return active
}
