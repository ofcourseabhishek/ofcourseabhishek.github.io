import { contact, profile } from '../data/profile'
import { ArrowIcon, ArrowUpRightIcon, CheckIcon, CopyIcon } from './Icons'
import { useCopy } from '../hooks/useCopy'
import { useReveal } from '../hooks/useReveal'

/**
 * Gmail's web compose window, addressed to the owner — where the address
 * itself leads (owner's choice). It works for any visitor with a browser,
 * where mailto: does nothing without a mail app configured. Copy remains for
 * anyone who writes from elsewhere.
 */
const GMAIL_COMPOSE = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(profile.email)}`

/** Profiles in display order; any without a verified URL is left out. */
const SOCIALS = [
  { key: 'github', label: 'GitHub' },
  { key: 'linkedin', label: 'LinkedIn' },
  { key: 'instagram', label: 'Instagram' },
]
  .filter((s) => profile.links[s.key])
  .map((s) => ({ ...s, href: profile.links[s.key], handle: handleOf(profile.links[s.key]) }))

/** The profile's own handle, read off its URL's last path segment. */
function handleOf(url) {
  return new URL(url).pathname.split('/').filter(Boolean).pop()
}

const COPY_LABEL = {
  idle: 'Copy',
  copied: 'Copied',
  failed: 'Copy failed — select the address',
}

/**
 * Editorial contact spread: headline and introduction in the wide column, the
 * email and profiles in a narrow column beside it, one understated line of
 * location and availability underneath. No form — there is no backend to
 * deliver one, and the email is the honest primary action.
 */
export function Contact() {
  const [ref, shown] = useReveal()
  const [copyState, copy] = useCopy(profile.email)

  return (
    <section
      id="contact"
      ref={ref}
      className={`contact${shown ? ' is-in' : ''}`}
      aria-labelledby="contact-heading"
    >
      <div className="contact__main">
        <p className="micro contact__eyebrow" style={{ '--i': 0 }}>
          {contact.eyebrow}
        </p>

        <h2 id="contact-heading" className="contact__headline">
          <span className="contact__line" style={{ '--i': 1 }}>
            {contact.headline[0]}
          </span>{' '}
          <span className="contact__line contact__line--soft" style={{ '--i': 2 }}>
            {contact.headline[1]}
          </span>
        </h2>

        <div className="contact__intro" style={{ '--i': 3 }}>
          {contact.intro.map((para) => (
            <p key={para}>{para}</p>
          ))}
        </div>
      </div>

      <div className="contact__aside">
        <div className="contact__block" style={{ '--i': 4 }}>
          <p className="micro contact__label" id="contact-email-label">
            Email
          </p>
          <a
            className="contact__email"
            href={GMAIL_COMPOSE}
            target="_blank"
            rel="noreferrer noopener"
            aria-describedby="contact-email-label"
          >
            <span className="contact__email-text">{profile.email}</span>
            <ArrowIcon className="contact__arrow" />
            <span className="sr-only"> (opens Gmail in a new tab)</span>
          </a>
          <button
            type="button"
            className={`contact__copy is-${copyState}`}
            onClick={copy}
          >
            {copyState === 'copied' ? (
              <CheckIcon className="contact__copy-icon" />
            ) : (
              <CopyIcon className="contact__copy-icon" />
            )}
            <span>{COPY_LABEL[copyState]}</span>
            {copyState === 'idle' ? <span className="sr-only"> email address</span> : null}
          </button>
          {/* Announced separately so a screen reader hears the result, not
              just a relabelled button it is already focused on. */}
          <p className="sr-only" role="status" aria-live="polite">
            {copyState === 'copied'
              ? 'Email address copied to clipboard.'
              : copyState === 'failed'
                ? 'Could not copy. Select the email address to copy it manually.'
                : ''}
          </p>
        </div>

        {SOCIALS.length ? (
          <div className="contact__block" style={{ '--i': 5 }}>
            <p className="micro contact__label" id="contact-elsewhere">
              Elsewhere
            </p>
            <ul className="contact__socials" aria-labelledby="contact-elsewhere">
              {SOCIALS.map((s) => (
                <li key={s.key}>
                  <a
                    className="contact__social"
                    href={s.href}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <span className="contact__social-name">{s.label}</span>
                    <span className="contact__social-handle">{s.handle}</span>
                    <ArrowUpRightIcon className="contact__social-arrow" />
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>

      <p className="micro contact__foot" style={{ '--i': 6 }}>
        {contact.footnote}
      </p>
    </section>
  )
}
