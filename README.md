# Abhishek Rai — Portfolio

Personal portfolio of **Abhishek Rai**, AI/ML Engineer and Computer Science
student at PSIT Kanpur. A single scrolling page: a hero with a central
portrait, a scroll-driven showcase of selected work, an About section, and a
contact spread.

## Stack

- **React 19** + **Vite 7**
- Plain CSS on shared design tokens — no CSS framework
- Motion is CSS plus a small scroll-scrub hook — no animation library
- `lucide` + `morphicons` for the nav's morphing icons

There is no backend. Contact happens by email (opens Gmail, or copy the
address) and through linked profiles.

## Getting started

Requires Node.js and npm.

```bash
npm install
npm run dev       # dev server at http://localhost:5173
npm run build     # production build into dist/
npm run preview   # serve the production build locally
```

## What's on the page

| Section | What it does |
|---|---|
| **Hero** | Name, title, introduction, education line, and a click-to-copy email pill. Portrait in the centre; on the right an orbital "project system" — each project is a card circling the portrait with its tech stack as moons, auto-advancing every 7s. |
| **Selected work** | Five poster cards (three projects, two tools). On desktop the hero, the showcase and the About intro share one pinned stage: scrolling takes the hero apart, runs the posters in like a train, pans through them, then slides the About portrait in. |
| **About** | Introduction, then education & certifications and achievements. |
| **Contact** | Headline and introduction, email (opens a Gmail compose window; a copy button beside it), GitHub, LinkedIn and Instagram. |

Below 721px wide, or with reduced motion requested, the pinned stage is
switched off and the sections are a plain stacked page. Every entrance
animation also respects `prefers-reduced-motion`.

## Project structure

```
index.html              Fonts, meta, portrait preload
public/assets/          Hero portrait (served at a fixed URL so it can be preloaded)
assets/                 Source images, brand icons, and derived/ poster and
                        About artwork (imported, so Vite fingerprints them)
src/
  App.jsx               Page composition
  data/profile.js       All site content — copy, links, projects, certifications
  components/           Nav, Hero, ProjectSystem, HomeStage, PosterShowcase,
                        About, Contact, Icons
  hooks/                Scroll scrub, scroll spy, reveal-on-scroll, pointer
                        parallax, copy-to-clipboard
  styles/               tokens.css (colours, type, spacing, motion) plus one
                        stylesheet per area
docs/hero-decisions.md  Design decisions log — what was chosen and why
design.md               Design specification
AGENTS.md               Development rules for this repository
```

## Editing content

Almost everything a visitor reads lives in **`src/data/profile.js`**: the
introduction, email and profile links, projects, tools shown in the
showcase, certifications and achievements. Components render whatever is
there, and a link that is `null` is simply not shown — nothing points at a
placeholder URL.

Content rules (see `AGENTS.md`): nothing is invented. Project descriptions are
the repositories' own descriptions, and unverified figures are left out.

## Design notes

- **Theme:** light only, by the owner's decision (`design.md` asked for light
  and dark; see `docs/hero-decisions.md`). Colours, spacing, radii and motion
  timings are tokens in `src/styles/tokens.css`.
- **Fonts:**
  - Body and headings are set for **Neue Haas Grotesk**, a commercial face
    that is **not bundled**; until it is installed they render in Inter Tight.
    `src/styles/fonts.css` explains how to add it (Adobe Fonts or a
    self-hosted licence).
  - **JetBrains Mono** for labels and metadata.
  - **Michroma** for the project names on the showcase posters — an
    open-licence stand-in for Nasalization, whose free licence does not cover
    use as a web font.
- **Poster artwork** is each project's photograph reduced to a white
  silhouette (`assets/derived/posters/`). The source photographs are kept
  locally and are not committed.

## Deployment

GitHub Pages, via `.github/workflows/deploy.yml`. Every push to `main` runs
`npm ci` and `npm run build` on Node 22 and publishes `dist/`. It can also be
run by hand from the Actions tab.

One-time setup: in the repository's Settings → Pages, set Source to
**GitHub Actions**.

The repository is a user site (`ofcourseabhishek.github.io`), so it is served
from the domain root and Vite's default `base` of `/` is correct.
