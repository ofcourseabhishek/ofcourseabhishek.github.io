# Hero — decisions log

Companion to `design.md`. That spec leaves many items TBD and states that open
decisions must not be silently converted into requirements. This file records
which ones this hero pass actually settled, and what is still open.

Status: hero implemented and content-confirmed. Me view has its About section
(§6.1); skills, education, experience, certifications, resume and contact are
still to come. My projects view not started.

---

## 1. Decisions made in this pass

| design.md item | Decision | Rationale |
|---|---|---|
| §12 Frontend stack | React 19 + Vite 7, no UI or animation library | Two views switching without reload; repeated patterns (cards, chips, nav). Zero runtime deps beyond React keeps the bundle at ~73 kB gzip. |
| §8.2 Palette | Warm off-white (`#faf9f6`) + **navy accent sampled from the portrait** (`#36477a`) | Owner's choice, replacing the earlier teal. The accent is now drawn from the shirt, so the page and the photograph share one colour. See the note below on why it is not the literal sampled value. |
| §8.1 Themes | **Single light theme. No dark mode, no toggle.** | Owner decision, and it **overrides design.md §8.1**, which states both themes and a toggle are required. §8.1 should be amended. The dark palette, `useTheme`, `ThemeToggle`, the pre-paint theme script and the sun/moon icons were all removed. |
| §8.3 Typography | **Neue Haas Grotesk** (Display cut for the name/brand/card titles, Text cut for body), JetBrains Mono for technical metadata | Owner's choice. NHG is commercial and **not bundled** — see §3a. Mono for eyebrows, chips and the education line is the main signal separating this from the designer reference: it reads "engineer". |
| §5.7 Skill format | Brand marks in a 3x2 grid, each with a visible label | Owner supplied the SVGs. Icons are `alt=""`/`aria-hidden` with the text label carrying the accessible name, so nothing depends on hover (§11). |
| §5.11 Floating elements | **An orbital system.** The portrait is the sun; each project is a planet card; that project's stack orbits it as moons | Owner's concept. Cards revolve about the portrait's measured centre, one visible at a time, auto-advancing every 7s. See §1a. |
| Python icon | Deliberately omitted | Owner's call — assumed of every backend engineer, so it spends a slot without saying anything. Python still leads the résumé and belongs in the Me view. |
| Per-project moons | Only technologies named in that repo's own README | Snapgrade: FastAPI, OpenCV, NumPy, Gemini. NeuroOne: FastAPI, PyTorch, PostgreSQL, Docker. Surge: FastAPI, PostgreSQL, Docker. Nothing was assigned by assumption. |
| Gemini mark | `gemini.svg`, derived from the supplied `gemini-wordmark.svg` | The wordmark is 2.71:1; inside a round moon its letterforms would render about 8px tall. The derived file crops the viewBox to the spark glyph, which is the icon form. The wordmark is kept unmodified. |
| §3.3 Rounded outer canvas | **Not retained.** Content sits directly on the page | The rounded panel in the reference is the *mockup frame* — the shot renders a browser screen floating on a presentation backdrop. It is packaging around the design, not part of it. The first draft reproduced it by mistake. |
| Brand mark | `ark.` with the accent dot | Owner decision, replacing `abhishek.` The full name still carries the hero, and the nav link keeps the accessible name "Abhishek Rai — home". |
| §5.8 Featured work | Snapgrade, NeuroOne, Surge | Owner-selected. All three names, blurbs and URLs were read off github.com/ofcourseabhishek, not written from the résumé or invented. |
| §9 Motion | CSS-only: staggered entrance, pointer parallax, hover lift, theme cross-fade | No animation library. Entrances animate `opacity` + `translate`; parallax uses `transform`, so the two never fight. |
| §10.3 Mobile | Dedicated flex order, not a scaled desktop | Order: name/title → portrait → intro → education → contact. The project system is hidden below 720px: the project showcase follows directly, so it would only repeat it. The person is established before the reading starts. Nav tabs become a segmented control. |
| §6.3 Education in hero | One mono metadata line, not a card | Keeps a recruiter-relevant fact in the hero at a fifth of the vertical cost. Full entry belongs in the Me view. |

### 1a. How the orbital system works

`ProjectSystem.jsx` + `system.css`. Four things in it are less obvious than
they look, each the fix to a bug that actually occurred:

**One animated angle, not two animations.** The ring and every moon's
counter-rotation both read a single `@property --orbit-a` animated on the
stage. The first build ran two independent animations (`orbit-spin` and
`orbit-spin-reverse`). They drift: moons remount whenever the project changes
and restart mid-cycle, so the marks ended up permanently tilted by whatever the
phase difference happened to be — measured at a constant **204°**. Deriving both
from one inherited value makes the net tilt exactly **0° at any mount time**.

**Three nested elements per moon.** `.moon` places it on the ring with
`transform`, `.moon__despin` cancels the ring's rotation, `.moon__deangle`
cancels the placement angle. Placement uses `transform` and the spin uses the
separate `rotate` property, so neither overwrites the other.

**The cards pivot on the portrait.** `transform-origin` is set from a
runtime measurement of the portrait's centre of mass (38% down the image),
published as `--pivot-dx` / `--pivot-dy` and kept current by a `ResizeObserver`.
It has to be measured because the distance changes with the viewport, and on
mobile the portrait sits *above* the system rather than beside it. Verified to
land within 10px of the figure at 1707px, 834px and 390px.

**`.planet__body` counter-rotates.** Rotating about a pivot ~450px away tilts
the card as well as moving it. The inner wrapper cancels that tilt about the
card's own centre, so the card travels the arc while its text stays level —
measured at net 0° on every frame of the transition.

Sizing is driven from `--orbit-r`: the card width is
`calc(var(--orbit-r) * 2 - var(--moon) - 60px)`, tuned so the ring clears the
card's rounded *corners* (the diagonal is what a moon actually grazes, not the
edge). Minimum measured clearance: 11px.

**Auto-advance** runs on a 7s interval, restarted whenever the index changes so
choosing a card always gives a full cycle to read it. It stops under reduced
motion and while the pointer or keyboard focus is inside the system. The
interval id is a local inside the effect, not a ref — held in a ref, React
StrictMode's double-mount makes the first cleanup clear an id the second run
already overwrote, leaking a timer and advancing the cards at double speed.

Hidden cards carry `inert`, so their links stay out of the tab order. The moons
are `aria-hidden`; each card also lists its stack as text, so nothing is
communicated by icon alone.

### Why the accent is not the literal shirt colour

Sampled across the chest, the fabric averages `#2d3249` (H229 S24% L23%). Used
directly it measures **1.38:1 against the body text** — at that lightness the
hue is barely readable and it would simply look black, so the accent would stop
doing its job (the hero title, card kickers and the brand dot would all read as
body text).

`#36477a` keeps the shirt's hue (H225 vs H229) and lifts saturation and
lightness until it separates: **1.94:1 from text, 8.53:1 on the background**,
and white sits at 8.98:1 on the button fill. Because the fill is dark on a light
page, `--accent-hover` goes *darker* (`#2b3860`), not lighter.

### Layering after the canvas was removed

With no panel to clip against, three things had to move:

- **Decoration** lives at `.page` level (`.page__decor`), not inside the hero.
  Clipped at the hero it left a hard diagonal seam in the upper left, because a
  blob's gradient was still opaque where the content column ended. At page level
  the only clip is the screen edge.
- **`.page` uses `overflow-x: clip`**, not `overflow: hidden`. `hidden` would
  make the page a scroll container and put the tablet layout's lower content
  out of reach.
- **`.hero` uses `overflow: clip`** so the portrait halo, which sits slightly
  below his baseline, stops adding 62px of scroll height.

### Accessibility decisions

- `--text-faint` and `--text-muted` were darkened after measurement: the first
  draft failed WCAG AA at 2.64:1 for the 11px mono labels. Current ratios on
  `--bg`: muted 6.18:1, faint 4.64:1.
- `<meta name="color-scheme" content="light">` keeps form controls and
  scrollbars light-rendered now that there is no dark palette.
- Nav is a real `tablist` with roving tabindex, arrow/Home/End keys, and focus
  that follows selection. Active state is marked by weight **and** a bar, never
  colour alone.
- Reduced motion collapses every animation to its resting state; no layout
  depends on an animation having run.
- Pointer parallax is disabled for coarse pointers and reduced motion.

---

## 2. Owner-confirmed content

All hero content is confirmed. Nothing in the hero is derived or provisional.

| Item | Status |
|---|---|
| Display name / title | Confirmed — Abhishek Rai, AI/ML Engineer |
| GitHub | `https://github.com/ofcourseabhishek` — supplied by owner |
| LinkedIn | `https://www.linkedin.com/in/Abhishek--Rai` — confirmed by owner (the double hyphen is intentional). Drives the social icon and the "Let's talk" action per §5.10 |
| Availability pill | "Open to opportunities" — confirmed accurate per §6.8 |
| Email | `ofcourse.abhishek@gmail.com` — from resume |
| Education line | B.Tech CSE · PSIT Kanpur · 2024–28 — from resume |

### Featured work — what the repositories actually say

| Shown as | Repository | Notes |
|---|---|---|
| **Snapgrade** | `ofcourseabhishek/FocalPointAI` | **The repo is still named FocalPointAI**; its description reads "FocalPointAI ( Now Snapgrade )". Snapgrade is the current name, so that is what the card shows. Live at **snapgradebyark.vercel.app** — the only one of the three that is deployed, which is what the `Live` badge marks. Not a fork. |
| **NeuroOne** | `ofcourseabhishek/NeuroOne` | **Forked from `NeuroOne-org/NeuroOne-V1`.** |
| **Surge** | `ofcourseabhishek/surge` | **Forked from `cookedaryan/surge`.** Its description says "Built for a small internal engineering team. Not a hosted product." |

#### ⚠ Open question: how to frame the two forks

Two of the three are forks, and the hero currently presents all three
identically. Recruiters do check. This is not a correctness bug — the links go
to the right places — but it is a credibility risk worth a deliberate decision:

- If they are **your contributions to a team or org repo**, say so. A one-word
  role line ("contributor", "team project") costs almost nothing and is far
  stronger than letting someone discover the fork badge themselves.
- If they are **forks you have not substantially worked on**, they should come
  out and be replaced with original work.

`forkedFrom` is already recorded per project in `src/data/profile.js`, so
surfacing a label is a small change once the framing is decided.

### Certifications — what is actually claimed

design.md §6.5 recorded the second entry as the whole **Machine Learning
Specialization**. The owner has completed **two of that specialization's three
courses**. The two finished courses were first listed individually; the owner
then chose a single specialization entry, marked **In progress** so it does
not claim a certificate that has not been issued:

| Certification | By | Via | Status |
|---|---|---|---|
| 100 Days of Code: The Complete Python Pro Bootcamp | Angela Yu | Udemy | |
| Machine Learning Specialization | Andrew Ng | Coursera | In progress |

This is more accurate than both the résumé and the spec. §6.5 should be
amended. The link out to the full certificate set is still unrendered — no URL
has been supplied.

### Navigation — morphic navbar

Ported from kokonutui.com/docs/navigation/morphic-navbar. The original is
Next.js + Tailwind + clsx; this is plain CSS on the project's tokens. The
geometry and the adjacency rules are the same — the active link detaches into
its own pill with horizontal margin, and the segments either side round the
corners that now face the gap.

Two departures, both owner-chosen:

- **Palette.** The original's white variant (`dark:bg-white dark:text-black`).
  **Every** segment is filled white with dark text, including the active one —
  the first attempt left the inactive segments transparent and only filled the
  active pill, which broke the effect entirely: with no solid bar there was
  nothing to visibly come apart. The separation and the weight change are the
  only signals; there is no accent colour in the bar.
- **Shadow.** `filter: drop-shadow()` on the strip rather than `box-shadow`.
  drop-shadow follows the actually-painted shape, so once the bar splits each
  piece carries its own shadow instead of one rectangle sitting behind the gap.
- **State.** The original holds its own `activePath`. Here the active section
  comes from scroll position (`useScrollSpy`), so the pill tracks the reader
  rather than the last click.

**Floating.** The nav is `position: fixed`, inset by `--nav-gap`, and rendered
**outside `.page`** — that element clips overflow and would clip a fixed child
with it. `--nav-block` (gap + height + gap) is the space it occupies: the shell
is padded by it, every section carries it as `scroll-margin-top`, and
`--screen-h` subtracts it so the hero still fills exactly one screen. Verified:
every anchor jump lands with the section top at 65px against a nav bottom edge
of 56px.

**Collapse.** Past the hero, the brand and the call to action fade out and the
nav's grid goes from `1fr auto 1fr` to `0fr auto 1fr` — only the *leading*
track collapses, so the strip slides left into the space the brand vacated
rather than re-centring. Measured: the strip's left edge moves from 435px to
78px at a 1200px viewport. (The collapsed leading track settles at 8px rather
than 0 — the brand's own padding.)

**Icons.** Owner's call: the desktop strip is text-only like the original, and
the morphicons appear only in the stacked mobile menu, where the rows are wide
and a glyph helps scanning. The Menu↔X toggle morph is always present.

### Project showcase — Swiss posters (current)

`PosterShowcase.jsx` + `posters.css`, entrance via the existing `useReveal`.
Owner's direction (2026-09-30): Swiss minimalism, after a reference of three
event posters. Three posters side by side (one per row below 1080px), each:

- a flat colour field — `--poster-neuroone` violet, `--poster-snapgrade`
  red, `--poster-surge` ochre, after the reference's three; white is the only
  ink, and every field holds white body text at WCAG AA (SURGE's ochre was
  darkened to #86621a so 80%-white secondary text still clears 4.5:1);
- a four-column grid, drawn as faint rules; small facts ranged left along the
  top (number, repository, stack, status);
- a large title: the name in Michroma (`--font-poster`) on all five cards,
  then the category in the grotesk. History: a Pinyon Script swash on the
  three project initials, then whole names in Pinyon (illegible), then the
  owner asked for Nasalization — its free Typodermic licence excludes webfont
  embedding, so Michroma, an open-licence expanded technical sans, stands in;
- a middle row: tagline, links (Live / Source), and the verified repo blurb;
- a one-bit photograph rising from the bottom edge.

Each poster is an inline-size container and its type is set in `cqi`, so the
composition is identical at every width, like print. 3:4 is a floor, not a
cage (`overflow: clip`), and the copy is held clear of the photograph by a
bottom padding derived from the image's own height.

**Imagery** is photography only, from `assets/project_showcase/
project_showcase_assets/`: the sagittal MRI (NeuroOne), the mountain
(Snapgrade), the wind farm (SURGE). Each was upscaled and thresholded to
white-on-transparent (`assets/derived/posters/`); the mountain's snow is
keyed on its blue channel and filled solid below a smoothed ridge line. The
two tool posters got the same treatment on the owner's request, from their own
asset folders: the council chamber (ai-engineering-council, cropped below the
mural) and the contract under a gavel (conan). The originals are untouched. **No UI mockups**: the dashboard crops and the laptop
photographs show invented values (SURGE's 520 MW / ₹1,642 Cr and "Project
Engineer" title, Snapgrade's 68/100), and the asset folders' own READMEs call
that UI text illustrative.

Motion: on desktop the posters are now a scroll-driven train inside the
pinned home stage — see §3d. Unpinned (phones, reduced motion) each poster
still lifts in, staggered, and its silhouette rises a beat later; the
silhouette lifts slightly on hover.

*Dropped:* a pinned, scroll-scrubbed laptop sequence (five crossfading laptop
photographs on a dark stage) was built and removed on the owner's call, as
was a brief site-wide midnight/navy theme.

### Project showcase — filmstrip of editorial spreads (superseded)

`Showcase.jsx` + `showcase.css` + `useScrollIndex.js`. Replaces the numbered
project rows; the Tools grid moved into its own `Tools.jsx` below it.

The stage pins and three full-bleed spreads travel sideways while the page
scrolls down. `--p` drives it: the first 18% assembles the opening spread
(pieces in from left/right/bottom, corner blocks in from the sides), the rest
pans the strip from 0% to -200%.

**The pan is eased, not linear.** The hook writes `--q` with a smoothstep that
parks each spread for 55% of its slot before travelling on. A linear pan left
every spread perfectly framed for a single instant; measured after the change,
7 of 9 sampled scroll positions sit exactly on a spread (0, -1228, -2456px).

**Typography.** Playfair Display for the project names only — one editorial
accent, not a second type system. Taglines and keyword columns are letterspaced
caps, as on the boards.

#### Two ideas tried and dropped

*A shared laptop that stayed while everything changed.* Abandoned on the
owner's call, and it had already run into the assets: the supplied "dashboard"
files are angled photographs of a laptop at three different angles, so they
could not sit inside a CSS laptop, hold a fixed position, or animate their own
sidebar. A CSS laptop with hand-built HTML dashboards was working — 3D hinge,
receding keyboard, lid opening on assembly and shutting on exit — but it
existed to stand in for product screenshots that do not exist.

*Reusing those laptop photographs as collage.* Caught on review before it
shipped: the screens inside them carry invented values — a score of 8.3,
"₹124 Cr", a patient named "Aarav Sharma". Using them as photography would have
put back exactly the fabricated results that dropping the dashboards removed.
Every collage piece is now project photography, and with no invented UI on the
page there is no "Concept UI" disclaimer anywhere.

### Rejected content

**The resume's "processes 100+ images daily" figure is not accurate.** design.md
§7.3 asked for it to be verified before publishing; the owner has confirmed it
is false. It is **permanently excluded**, not pending — do not reinstate it in
the hero, the Focal Point AI case study, or anywhere else. A guard comment sits
at the top of `src/data/profile.js`.

### Still open

One item, and it is blocked on other work rather than on information:

- **`featured.href`** is `null`, so the featured card shows "Case study coming
  soon" instead of a link. It resolves when the My projects view exists — see
  §4 below.

---

## 3a. Typography — Neue Haas Grotesk is not bundled

NHG is a Monotype commercial typeface. No font files are in this repo and none
were downloaded. `src/styles/fonts.css` documents both legitimate routes:

- **Adobe Fonts** (included with Creative Cloud) — add Display + Text to a web
  project and drop the kit `<link>` into `index.html`. Nothing else changes; the
  Typekit family names are already in the stack.
- **Self-host** a purchased webfont licence — uncomment the `@font-face` blocks
  and put `.woff2` files in `public/fonts/`.

NHG ships two optical cuts and they are not interchangeable, so the tokens are
split: `--font-display` (large, tight, short descenders) drives the hero name,
the `ark.` brand, card titles and the stub heading; `--font-sans` (Text cut)
drives everything else.

**Current rendering: Inter Tight**, the closest freely-licensed neo-grotesque,
loaded from Google Fonts. Verified by canvas glyph-width measurement rather
than `document.fonts.check()` — `check()` returns `true` for families that are
absent from the font set, so it cannot detect a missing family. NHG measured
identical to the bogus-family baseline (1548.25px), Inter Tight measured
1382.52px, confirming which one actually paints.

The stack resolves to NHG automatically the moment a licensed copy is present,
with no further code change.

## 3b. Portrait assets

`assets/potrait.png` (1086x1448 RGBA, 1.4 MB) is the master and is not touched.
Two derived WebP variants are served from `public/assets/`, chosen by a
`<picture>` element:

| File | Size | Bytes | Serves |
|---|---|---|---|
| `portrait.webp` | 1086x1448 | 100 KB | `min-width: 721px` — covers 2x at 680 CSS px tall |
| `portrait-mobile.webp` | 600x800 | 41 KB | `max-width: 720px` — covers 2x at 400 CSS px tall |

Encoded with Pillow at quality 82/80, `method=6`, and **`alpha_quality=100`** —
the cutout's alpha channel stays lossless so the hair edge does not fringe
against either theme background. Verified at zoom on light and dark.

Only one variant is ever fetched (confirmed via Resource Timing): 100 KB on
desktop, 41 KB on mobile — down from 1430 KB. Both `<link rel="preload">` tags
carry matching `media` attributes so the preload never pulls the wrong one.

Whole production build is 404 KB on disk; a desktop first load transfers about
182 KB with text compression.

## 3c. Me view — the scroll-scrubbed transition

`MeView.jsx` + `useScrollScrub.js` + `about.css`. The Me view is one pinned
stage the visitor scrolls *through*: the hero takes itself apart while the
About scene arrives behind it.

**One value drives everything.** `useScrollScrub` writes scroll progress as
`--p` (0 → 1) on `.me`. CSS derives two overlapping ramps from it — `--out`
across the first 55% (hero exit) and `--in` across the last 60% (About arrival)
— so the hero has begun leaving before About starts appearing.

| Element | Behaviour |
|---|---|
| Hero portrait | drops 46vh and fades |
| Hero copy | fades, with a small lift |
| Project system | travels 62vw to the right |
| Page decoration | thins to 45% |
| About photo | slides in from the left, full stage height |
| About text | fades up on the right |

**Fail-safe by construction.** Every scrubbed style sits under `.me.is-scrubbed`,
a class the hook adds only after it runs and never under reduced motion.
Unarmed, the hero and About are plain stacked blocks at full opacity. This is
the inverse of the earlier About bug, where content started hidden and depended
on an observer firing.

**Four fixes worth recording:**

- *`translate` collision.* The scrub moves `.hero__col--right` with `translate`,
  but the `rise` entrance animated the same property on the same element and
  won while it ran. The entrance and the pointer parallax moved onto the
  `.system` inside, leaving the wrapper's `translate` free.
- *Absolutely-positioned grid item.* `.about__photo` had `grid-column: 1` and a
  *definite* grid placement, so `position: absolute` resolved `inset-block: 0`
  against its **grid area** rather than the padding box — it came out 545px tall
  in a 690px stage, inset by the text's padding. `grid-area: auto` restores the
  padding box as the containing block.
- *Sticky nav.* The pin occupies the viewport for the whole transition, so the
  nav is `position: sticky` and carries the shell's top padding, keeping it
  reachable throughout (design.md §4.3).
- *Interactivity.* CSS cannot branch on a custom property, so the hook flips a
  `data-phase` attribute once per traversal. The faded-out scene gets
  `pointer-events: none` and `inert`, so it leaves both hit-testing and the
  accessibility tree.

**Asset caching.** The About images are **imported** (`assets/derived/*.webp`)
rather than served from `public/`, so Vite fingerprints the filename. A fixed
URL under `public/` went stale: the first version of `about-final.webp` was
generated while the source was still opaque — converted with `.convert('RGB')`,
which bakes white in — and browsers kept serving that cached copy with its white
background long after the file on disk was a correct cut-out. A content hash
makes that class of bug impossible.

The photo is also **not** `loading="lazy"`. The transition starts on the
visitor's first scroll, so a lazy image would pop in mid-animation;
`fetchPriority="low"` keeps it from competing with the hero portrait instead.

**Asset.** `potrait2-final.png` was revised mid-session to a true cut-out
(alpha 0–255, content in 746 of 1087px). It is cropped to its alpha bounds and
emitted as WebP: `about-final.webp` 722x1400 / 87 KB, `about-final-sm.webp`
413x800 / 33 KB. Because it has a real alpha channel it takes the hero's
silhouette-following `drop-shadow` rather than a panel `box-shadow` — a
box-shadow would have drawn a rectangle around transparent air. The earlier
wall/subject/shadow layers are no longer used.

**Verification limit.** The scrub's live scroll path could not be exercised in
the test browser: the tab is occluded, so it dispatches no scroll events and
runs no rAF or CSS animations. What was verified instead — the CSS mapping by
driving `--p` directly (portrait 0 → 347px down, system 0 → 941px right, About
opacity 0 → 1, photo flush left at 690px full stage height), and the hook's
progress formula replayed across the scroll range (monotonic, reaching exactly
1 at max scroll). The scroll listener itself is standard and unexercised here.

## 3d. Home stage — hero → showcase train → About (current)

`HomeStage.jsx` + `useScrollScrub.js` + `stage.css`. Owner's direction
(2026-09-30). Supersedes the layout in §3c; the "fail-safe by construction"
rule there still holds. Page order is now Hero → Selected work → About
intro → About bands → Tools → Contact. **Tools moved below About** (owner's
choice) so the showcase hands straight to About.

One pinned stage holds three absolutely-stacked layers — the hero, the
showcase, the About intro — over a 400vh scroll. `useScrollScrub` publishes
progress `p` and HomeStage's `frame()` turns it into per-act values:

| Act | Window of `p` | What happens |
|---|---|---|
| `--out` | 0 – 0.20 | Hero comes apart, as before |
| `--train` | 0.12 – 0.34 | All cards run in from the **right edge of the screen** as one rigid train (ease-out), with coupling slack that closes as it brakes |
| pan | 0.38 – 0.60 | Carousel: three in view, parks on each card in turn to reach cards 4 and 5 |
| `--leave` | 0.62 – 0.78 | Train departs left (ease-in) |
| `--photo` | 0.77 – 0.92 | About portrait slides in from the left, 88% of the frame's height |
| `--copy` | 0.82 – 0.95 | Label, heading, paragraphs settle in, in order |

Holds sit between the acts so each resting state can be read. The photo
deliberately starts only once the train is gone — letting them cross read
as a collision.

**Cards 4–5 are tools**, owner's call: `ai-engineering-council` and
`rakemind`, chosen because neither is a fork (`showcaseTools` in
`profile.js`). They use the poster layout without a photograph, tagline or
stack — none is on record, so none was written. Colours: the accent and the
text ink (`--poster-tool-1/2`). The cap of five is `MAX_CARDS`.

**The cards are positioned from script**, not CSS: the pan needs measured
card widths and stops. Any card crossing the left edge of the content column
fades with the distance, so the carousel pan and the departure are the same
motion. Cards are sized `min(one third of the row, 75% of the frame height)`
via container units, so short screens get narrower cards rather than
clipped ones.

**Four fixes worth recording:**

- *Percentage padding in a flex row.* A poster's bottom padding (which holds
  copy clear of its photograph) is a `%`, and a flex item's `%` padding
  resolves against the **flex container**, not itself — the posters came out
  ~990px tall. Each poster now sits in a `.works__car` wrapper, which is both
  the flex item and what the train moves.
- *Deep links.* Opened on `#projects`, the browser jumped before the stage
  armed and moved that id onto its scroll marker. HomeStage re-lands once on
  arm.
- *Shadow clip.* The pin clips vertically (the hero portrait drops out of
  frame); in the About phase that clip is lifted, or the portrait's
  drop-shadow was cut in a hard line as the pin released.
- *Keyboard.* Hidden layers are `pointer-events: none` but stay in the
  accessibility tree. Tabbing into an off-frame card scrolls the stage to
  where it is parked in view — keyboard focus only (`:focus-visible`), so a
  mouse click never jumps the page.

**Anchors.** Armed, `#projects` and `#about` are markers inside the stage at
the offset where each act is at rest (p = 0.38 and 0.96), so nav jumps land
on a finished frame and the scroll-spy switches there.

**Arming.** `(min-width: 721px) and (prefers-reduced-motion: no-preference)`,
tracked live. Otherwise the layers are ordinary stacked sections: the
showcase is a native swipe row with snap points (3 in view, 2 below 1080px,
1.15 on phones so the next card peeks) and the About photo keeps its one-shot
reveal.

**Verified** in Chrome via Playwright against the production build at
1440×900, 1920×1080, 1024×768, 834×1112 (armed) and 390×844 plus reduced
motion (unarmed): card geometry and opacity sampled across `p`, nav jumps,
keyboard focus-follow, no horizontal overflow at any size.

## 4. Next: the My projects view

The remaining open item is the case study the hero's featured card points at.
Building it needs decisions design.md leaves open:

- **§7.3 project selection** — Focal Point AI is the only project documented in
  the resume. design.md calls for two or three; the others are unconfirmed.
- **§7.2 case-study fields** — the proposed structure (problem, goals, solution,
  stack, decisions) is marked "subject to confirmation".
- **§7.4 project visuals** — no screenshots exist yet. The hero currently uses a
  schematic diagram rather than a mock screenshot for exactly this reason.
- **Repository and live URLs** — still to be verified.
- **Planned vs. implemented features** — §7.3 is explicit that Focal Point AI's
  auth, history, progress tracking, scoring and challenges must not be
  presented as shipped unless they are.

`App.jsx` renders a placeholder panel for this view; the nav, routing and
tab semantics already work, so the view only needs its content.

## 5. Known issues

- **Two supplied icons are unused: `azure-computer-vision.svg` and
  `fedora.svg`.** Neither is named in any of the three repositories, and the
  moons are per-project. Snapgrade's README names **Gemini**, not Azure
  ("When Gemini is enabled, the uploaded image and analysis context are sent to
  Google's API"). Fedora is the owner's OS rather than a project dependency.
  Both are registered in `tech` and ready to use if a home is decided.
- The READMEs also name **React, Next.js, Leaflet, Pillow, ReportLab and
  pandapower**, for which no icons have been supplied. NeuroOne and Surge
  overlap heavily as a result.
- `vite.config.js` forces the dev-server watcher to poll. Windows `fs.watch`
  raises EBUSY when it attaches to a file another process still holds open, and
  an unhandled watcher error terminates the dev server — copying assets into
  the project killed it three times in one session. Polling plus
  `awaitWriteFinish` removes both failure modes.
- Tablet (~834×800) scrolls roughly 240px to reach the two cards. Desktop and
  mobile priorities are met; §10.2 leaves the tablet arrangement open.
- `main.py` is a leftover PyCharm sample unrelated to the site.
- **Unpinned, the hero starts under the fixed nav** (phones and reduced
  motion). The pinned stage is held off by its sticky `top`, but nothing pads
  the unpinned stack, so on a 390px phone the availability pill sits behind
  the `ark.` brand. Predates §3d — the old ≤720px rules unpinned the stage
  the same way.

---

## 6. Running it

```
npm install
npm run dev      # http://localhost:5173
npm run build    # -> dist/
```

**Update (2026-09-30), owner's call:** the fifth showcase card is now `conan`
(github.com/ofcourseabhishek/conan) in place of `rakemind`. The repository has
no GitHub description, so its blurb is the README tagline verbatim. The
"Tools & smaller things" section below About was removed (`Tools.jsx` and its
styles deleted); the page now runs About → Contact.
