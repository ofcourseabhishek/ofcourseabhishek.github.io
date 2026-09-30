/**
 * Single source of truth for hero content.
 *
 * Every value here is traceable to design.md / the resume. Anything still
 * unverified is left as `null` rather than invented — the UI degrades
 * gracefully when a link is null.
 *
 * Owner-confirmed: display name, title, both profile URLs, and the
 * availability wording. No verification markers remain.
 *
 *  Project names, blurbs and URLs come from the repository pages at
 *  github.com/ofcourseabhishek and are reproduced, not paraphrased loosely.
 *
 *  ⛔ Do NOT add the resume's "processes 100+ images daily" figure to this
 *     file or anywhere in the site. The owner has confirmed the claim is not
 *     accurate. design.md §7.3 asked for it to be verified; it failed
 *     verification and is permanently excluded, not merely pending.
 */

export const profile = {
  name: 'Abhishek Rai',
  title: 'AI/ML Engineer',
  eyebrow: "Hello, I'm",

  // Condensed from the design.md §5.5 introduction. The full paragraph is
  // retained for the Me view; this is the hero-length version.
  intro:
    'Computer science student building AI-powered products across computer vision, Python backends and Dockerized deployments on Linux. Focused on scalable solutions to real-world problems.',

  availability: 'Open to opportunities', // confirmed accurate by owner

  email: 'ofcourse.abhishek@gmail.com',

  links: {
    github: 'https://github.com/ofcourseabhishek',
    linkedin: 'https://www.linkedin.com/in/Abhishek--Rai', // confirmed by owner
    instagram: 'https://www.instagram.com/ofcourse.abhishek/', // handle given by owner
  },
}

/**
 * Contact section copy — the owner's own wording, from the Contact brief.
 * Headline lines are separate so the second can be set in a lighter voice.
 */
export const contact = {
  eyebrow: 'Get in touch',
  headline: ['Have a project in mind?', "Let's make it work."],
  intro: [
    "I'm always interested in meaningful projects, thoughtful conversations, and opportunities to build something useful with technology.",
    "Whether you're working on an AI product, have an interesting problem to solve, or simply want to connect, my inbox is open.",
  ],
  footnote: 'Kanpur, India · Open to remote opportunities',
}

/**
 * Tech stack shown as brand marks. Python is deliberately absent — the owner's
 * call: it is assumed of every backend engineer and spends a slot without
 * saying anything. It still leads the résumé and the Me view.
 *
 * SVGs are imported so Vite fingerprints them; each is under the 4 KB inline
 * threshold, so they are emitted as data URIs and cost no extra requests.
 */
import azureVision from '../../assets/icons/azure-computer-vision.svg'
import docker from '../../assets/icons/docker.svg'
import fastapi from '../../assets/icons/fastapi.svg'
import fedora from '../../assets/icons/fedora.svg'
// Derived from gemini-wordmark.svg by cropping the viewBox to the spark glyph.
// The supplied wordmark is 2.71:1 — in a round moon its letterforms would
// render about 8px tall.
import gemini from '../../assets/icons/gemini.svg'
import numpy from '../../assets/icons/numpy.svg'
import opencv from '../../assets/icons/opencv.svg'
import postgresql from '../../assets/icons/postgresql.svg'
import pytorch from '../../assets/icons/pytorch.svg'

/** Icon registry, keyed so projects can reference marks by name. */
export const tech = {
  fastapi: { label: 'FastAPI', icon: fastapi },
  opencv: { label: 'OpenCV', icon: opencv },
  postgresql: { label: 'PostgreSQL', icon: postgresql },
  docker: { label: 'Docker', icon: docker },
  fedora: { label: 'Fedora', icon: fedora },
  azureVision: { label: 'Azure Vision', icon: azureVision },
  gemini: { label: 'Gemini', icon: gemini },
  numpy: { label: 'NumPy', icon: numpy },
  pytorch: { label: 'PyTorch', icon: pytorch },
}

/**
 * Featured work. Every name, blurb and URL below is taken from the repository
 * pages at github.com/ofcourseabhishek — nothing is written from imagination.
 *
 * `forkedFrom` is recorded because two of these are forks. The UI does not
 * currently surface it; see docs/hero-decisions.md for the open question about
 * how contributions should be framed.
 */
export const projects = [
  {
    name: 'Snapgrade',
    // Repo is still named FocalPointAI; its description reads
    // "FocalPointAI ( Now Snapgrade )". Snapgrade is the current name.
    blurb:
      'Deterministic computer-vision measurements of a photograph, explained in practical photography language.',
    repo: 'https://github.com/ofcourseabhishek/FocalPointAI',
    live: 'https://snapgradebyark.vercel.app',
    forkedFrom: null,
    // README: "FastAPI backend", "OpenCV + scoring / authoritative evidence",
    // "optional Gemini narrative", and NumPy in the backend stack.
    stack: ['fastapi', 'opencv', 'numpy', 'gemini'],
  },
  {
    name: 'NeuroOne',
    blurb:
      'AI-powered medical imaging and clinical decision support, starting with neurodegenerative disease analysis.',
    repo: 'https://github.com/ofcourseabhishek/NeuroOne',
    live: null,
    forkedFrom: 'NeuroOne-org/NeuroOne-V1',
    // README: FastAPI endpoints, "Compose runs Postgres, applies migrations",
    // PyTorch in the stack badges. Also React and Next.js — no icons supplied.
    stack: ['fastapi', 'pytorch', 'postgresql', 'docker'],
  },
  {
    name: 'Surge',
    blurb:
      'Collector-network and evacuation routing for wind farms — 33 kV layout over a terrain cost surface.',
    repo: 'https://github.com/ofcourseabhishek/surge',
    live: null,
    forkedFrom: 'cookedaryan/surge',
    // README: "FastAPI · pandapower", "PostGIS 16", "Docker Desktop with
    // Compose v2". Also names React and Leaflet — no icons supplied.
    stack: ['fastapi', 'postgresql', 'docker'],
  },
]

/**
 * About copy, supplied verbatim by the owner. Split into paragraphs only so
 * they can reveal in sequence — no wording was changed beyond adding the final
 * full stop, which the source omitted.
 */
export const about = {
  // Owner's wording, used verbatim.
  heading: 'Building AI that solves real problems',
  paragraphs: [
    'Computer Science undergraduate with strong foundations in software engineering, object-oriented programming, data structures, and algorithms.',
    'Experienced in designing, developing, testing, and optimizing reliable software systems using Python and C++.',
    'Built full-stack and algorithm-intensive applications involving REST APIs, graph optimization, automated testing, static analysis, and computer vision.',
    'Solved 150+ DSA problems across arrays, strings, trees, graphs, and dynamic programming.',
  ],
}

/**
 * The project showcase — one poster per project, in this order.
 *
 * Copy: taglines come from the owner's own reference boards; every `blurb` is
 * the repository description verbatim, because the boards' marketing copy is
 * looser than what the repos actually claim. `category` is the owner's label.
 *
 * Imagery: one photograph per project from assets/project_showcase/
 * project_showcase_assets/, reduced to a white one-bit silhouette. No UI
 * mockups — the dashboard crops and laptop shots carry invented values
 * (SURGE's 520 MW / ₹1,642 Cr, Snapgrade's 68/100), which AGENTS.md §8
 * forbids publishing. See docs/hero-decisions.md.
 */
export const showcase = [
  {
    id: 'neuroone',
    name: 'NeuroOne',
    category: 'Healthcare AI',
    tagline: 'AI-powered neurology assistant',
    blurb:
      'AI-powered medical imaging and clinical decision support, starting with neurodegenerative disease analysis and expanding toward a multimodal healthcare AI ecosystem.',
    keywords: ['Patient management', 'Symptom analysis', 'Evidence-based recommendations'],
    meta: ['Neurology', 'Data', 'AI', 'Better care'],
    corner: ['Understand', 'Support', 'Improve'],
    repo: 'https://github.com/ofcourseabhishek/NeuroOne',
    live: null,
    forkedFrom: 'NeuroOne-org/NeuroOne-V1',
    stack: ['fastapi', 'pytorch', 'postgresql', 'docker'],
  },
  {
    id: 'snapgrade',
    name: 'Snapgrade',
    category: 'Creative technology',
    tagline: 'See more. Shoot better.',
    blurb:
      'Deterministic computer-vision measurements of a photograph, explained in practical photography language, with focused learning material and a downloadable critique report.',
    keywords: ['Intent-aware analysis', 'Actionable feedback', 'Personalised learning'],
    meta: ['AI', 'Photography', 'Learning'],
    corner: ['See', 'Understand', 'Improve'],
    repo: 'https://github.com/ofcourseabhishek/FocalPointAI',
    live: 'https://snapgradebyark.vercel.app',
    stack: ['fastapi', 'opencv', 'numpy', 'gemini'],
  },
  {
    id: 'surge',
    name: 'SURGE',
    category: 'Energy infrastructure',
    tagline: 'Smart utility routing and grid evacuation',
    blurb:
      'Collector-network and evacuation routing for wind farms — 33 kV layout over a terrain and constraint cost surface, with pole placement, an electrical check and a bill of materials.',
    keywords: ['Plan & optimise', 'Visualise infrastructure', 'Reduce costs'],
    meta: ['WTG grouping', 'Feeder planning', 'Route optimisation', 'Lifecycle cost'],
    corner: ['From potential', 'to a cleaner tomorrow'],
    repo: 'https://github.com/ofcourseabhishek/surge',
    live: null,
    forkedFrom: 'cookedaryan/surge',
    stack: ['fastapi', 'postgresql', 'docker'],
  },
]

/**
 * Smaller things built along the way. Descriptions are the repository
 * descriptions verbatim (conan has none, so its README tagline is used);
 * `forkedFrom` is recorded where GitHub marks a fork so the framing question
 * stays visible.
 */
export const tools = [
  {
    name: 'ai-engineering-council',
    blurb:
      'Multi-model engineering debate skill for Codex — propose, critique, score, decide, then implement.',
    repo: 'https://github.com/ofcourseabhishek/ai-engineering-council',
    forkedFrom: null,
  },
  {
    name: 'conan',
    blurb:
      'Transform complex contracts into actionable obligation graphs, dependency maps, and explainable risk signals.',
    repo: 'https://github.com/ofcourseabhishek/conan',
    forkedFrom: null,
  },
]

/**
 * Tools that also ride in the showcase carousel, after the three projects —
 * the owner asked for two of them there, at most five cards in all. These two
 * are the ones that are not forks, so neither needs contributor framing on a
 * poster. Listed in carousel order (owner's choice: conan first).
 */
export const showcaseTools = ['conan', 'ai-engineering-council']

/**
 * Certifications, listed individually.
 *
 * The Machine Learning Specialization is two of three courses complete. The
 * owner chose to list it as one entry rather than the two finished courses,
 * so it carries `status: 'In progress'` — without the qualifier it would
 * claim a certificate that has not been issued. Drop `status` once the third
 * course is done.
 *
 * TODO(verify): `url` — a link out to the full set of certificates was asked
 * for, but no URL has been supplied, so nothing is rendered rather than
 * pointing somewhere invented.
 */
export const certifications = {
  url: null,
  items: [
    {
      name: '100 Days of Code: The Complete Python Pro Bootcamp',
      by: 'Angela Yu',
      via: 'Udemy',
    },
    {
      name: 'Machine Learning Specialization',
      by: 'Andrew Ng',
      via: 'Coursera',
      status: 'In progress',
    },
  ],
}

/**
 * TODO(content): Achievements and open-source contributions. No entries have
 * been supplied and design.md §6.4 forbids inventing any, so the block shows
 * an explicit placeholder. Populate `items` with real rows of the shape
 * { title, detail, href } and the placeholder is replaced automatically.
 */
export const achievements = {
  placeholder: 'brewing...',
  items: [],
}

/** From the resume; §6.3. */
export const education = {
  degree: 'B.Tech, Computer Science & Engineering',
  school: 'Pranveer Singh Institute of Technology',
  location: 'Kanpur',
  span: '2024 — 2028',
  gpa: '6.7/10', // design.md §6.3
  // Hero-length forms — the meta line has to hold one line.
  degreeShort: 'B.Tech CSE',
  schoolShort: 'PSIT Kanpur',
  spanShort: '2024–28',
}

/**
 * The page is one scrolling document; the nav anchors into it.
 * This replaces design.md §4's two-tab model, at the owner's direction.
 */
export const navSections = [
  { id: 'home', label: 'Home' },
  { id: 'projects', label: 'Projects' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
]
