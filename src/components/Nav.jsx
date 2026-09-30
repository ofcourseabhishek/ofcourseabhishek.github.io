import { MorphIcon } from 'morphicons/react'
import { House, FolderGit2, User, Mail, Menu, X } from 'lucide'
import { useEffect, useRef, useState } from 'react'
import { navSections } from '../data/profile'
import { useScrollSpy } from '../hooks/useScrollSpy'

// lucide ships icon *data*; MorphIcon renders and tweens between them.
const ICONS = {
  home: House,
  projects: FolderGit2,
  about: User,
  contact: Mail,
}

const IDS = navSections.map((s) => s.id)

/**
 * Morphic navbar, after kokonutui.com/docs/navigation/morphic-navbar.
 *
 * The links sit in one joined strip. The active link detaches into its own
 * rounded pill with horizontal margin, and the segments on either side of the
 * gap round the corners that now face outward — so the bar reflows around
 * whichever item is current instead of just recolouring it.
 *
 * Ported rather than copied: the original is Next.js + Tailwind + clsx, this is
 * plain CSS on the project's own tokens. The geometry and the adjacency rules
 * are the same; the palette follows this site (near-black strip, accent pill)
 * instead of the original's flat black.
 *
 * Unlike the original it does not hold its own `activePath` state — the active
 * section comes from scroll position, so the pill tracks the reader. The strip
 * sits at the top right and stays there. The brand stays through the hero,
 * the showcase and the About intro, steps aside while the About portrait and
 * bands pass beneath it, and sticks back on at Contact.
 */
/** How far ahead of an edge reaching the brand it reacts. */
const BRAND_CLEARANCE = 16

/**
 * Where the brand stands: `shown` through the hero, the showcase and the
 * About intro; `hidden` once the About portrait's top edge rises to it (bare
 * text would be lost against the photograph and the bands after it); `stuck`
 * once the Contact section reaches the nav, where it returns and settles.
 *
 * Measured against the photo and the section themselves rather than scroll
 * offsets: pinned, the photo sits just below the nav until the stage
 * releases; unpinned (phones, reduced motion) it arrives by ordinary
 * scrolling. The same tests cover both.
 */
function useBrandState(brandRef) {
  const [state, setState] = useState('shown')

  useEffect(() => {
    const update = () => {
      const photo = document.querySelector('.about__photo')
      const contact = document.getElementById('contact')
      const brand = brandRef.current
      if (!photo || !contact || !brand) return
      const line = brand.getBoundingClientRect().bottom + BRAND_CLEARANCE
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2

      let next = 'shown'
      if (contact.getBoundingClientRect().top < line || atBottom) next = 'stuck'
      else if (photo.getBoundingClientRect().top < line) next = 'hidden'
      setState((prev) => (prev === next ? prev : next))
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update, { passive: true })
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [brandRef])

  return state
}

export function Nav() {
  const active = useScrollSpy(IDS)
  const [open, setOpen] = useState(false)
  const brandRef = useRef(null)
  const brandState = useBrandState(brandRef)

  return (
    <header className={`nav is-brand-${brandState}`}>
      <a
        ref={brandRef}
        className="nav__brand"
        href="#home"
        aria-label="Abhishek Rai — home"
      >
        ark<span className="nav__brand-dot">.</span>
      </a>

      <button
        type="button"
        className="nav__toggle icon-btn"
        aria-expanded={open}
        aria-controls="nav-sections"
        aria-label={open ? 'Close menu' : 'Open menu'}
        onClick={() => setOpen((o) => !o)}
      >
        <MorphIcon icon={open ? X : Menu} size={18} reducedMotion="user" />
      </button>

      <nav
        id="nav-sections"
        className={`morphnav${open ? ' is-open' : ''}`}
        aria-label="Sections"
      >
        <div className="morphnav__strip">
          {navSections.map((s, i, arr) => {
            const isActive = s.id === active
            const prevActive = i > 0 && arr[i - 1].id === active
            const nextActive = i < arr.length - 1 && arr[i + 1].id === active
            const isFirst = i === 0
            const isLast = i === arr.length - 1

            const cls = ['morphnav__item']
            if (isActive) {
              cls.push('is-active')
            } else {
              // Round the edge that now faces the gap the pill opened up.
              if (prevActive || isFirst) cls.push('round-s')
              if (nextActive || isLast) cls.push('round-e')
            }

            return (
              <a
                key={s.id}
                href={`#${s.id}`}
                className={cls.join(' ')}
                aria-current={isActive ? 'true' : undefined}
                onClick={() => setOpen(false)}
              >
                <MorphIcon
                  className="morphnav__icon"
                  icon={ICONS[s.id]}
                  size={15}
                  strokeWidth={isActive ? 2.2 : 1.7}
                  reducedMotion="user"
                />
                {s.label}
              </a>
            )
          })}
        </div>
      </nav>

    </header>
  )
}
