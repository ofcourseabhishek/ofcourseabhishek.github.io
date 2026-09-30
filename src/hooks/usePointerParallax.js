import { useEffect, useRef } from 'react'

/**
 * Publishes the pointer's position within the element as `--px` / `--py`
 * (each roughly -1 → 1) so children can offset themselves by different
 * amounts and produce depth. Values are written straight to style, never to
 * React state, so moving the mouse does not re-render the tree.
 *
 * Disabled for coarse pointers and for `prefers-reduced-motion`, where the
 * variables simply stay at 0 and every layer sits at its resting position.
 */
export function usePointerParallax() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const fine = window.matchMedia('(pointer: fine)')
    const still = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (!fine.matches || still.matches) return

    let frame = 0
    let tx = 0
    let ty = 0
    let cx = 0
    let cy = 0

    const render = () => {
      // Ease toward the target so the layers trail the cursor slightly.
      cx += (tx - cx) * 0.08
      cy += (ty - cy) * 0.08
      el.style.setProperty('--px', cx.toFixed(4))
      el.style.setProperty('--py', cy.toFixed(4))
      frame =
        Math.abs(tx - cx) > 0.001 || Math.abs(ty - cy) > 0.001
          ? requestAnimationFrame(render)
          : 0
    }

    const kick = () => {
      if (!frame) frame = requestAnimationFrame(render)
    }

    const onMove = (e) => {
      const r = el.getBoundingClientRect()
      tx = ((e.clientX - r.left) / r.width) * 2 - 1
      ty = ((e.clientY - r.top) / r.height) * 2 - 1
      kick()
    }

    const onLeave = () => {
      tx = 0
      ty = 0
      kick()
    }

    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    return () => {
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return ref
}
