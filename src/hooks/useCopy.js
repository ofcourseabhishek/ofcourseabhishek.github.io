import { useEffect, useRef, useState } from 'react'

/** How long a copy confirmation is held before resetting. */
const COPY_RESET_MS = 2200

/**
 * Copy-to-clipboard with a result the reader can trust: it only reports
 * `copied` once the clipboard write has actually resolved, and `failed` when
 * it did not (insecure context, permission denied) instead of pretending.
 * Either state resets to `idle` after a moment.
 */
export function useCopy(text) {
  const [state, setState] = useState('idle') // idle | copied | failed
  const timer = useRef(0)

  useEffect(() => () => clearTimeout(timer.current), [])

  const copy = async () => {
    clearTimeout(timer.current)
    try {
      await navigator.clipboard.writeText(text)
      setState('copied')
    } catch {
      setState('failed')
    }
    timer.current = setTimeout(() => setState('idle'), COPY_RESET_MS)
  }

  return [state, copy]
}
