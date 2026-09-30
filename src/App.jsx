import { Nav } from './components/Nav'
import { HomeStage } from './components/HomeStage'
import { About } from './components/About'
import { Contact } from './components/Contact'

import './styles/tokens.css'
import './styles/base.css'
import './styles/layout.css'
import './styles/hero.css'
import './styles/system.css'
import './styles/about.css'
import './styles/posters.css'
import './styles/sections.css'
import './styles/stage.css'

/**
 * One scrolling document. The nav anchors into it rather than swapping views,
 * so every section keeps a real URL fragment and the browser owns the scroll.
 */
export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      {/* Outside `.page`: that element clips overflow, which would clip a
          fixed-position child along with it. */}
      <Nav />

      <div className="page" id="top">

      {/* Spans the full viewport, not the content column, so the soft edges
          of each blob are only ever clipped at the screen edge. */}
      <div className="page__decor" aria-hidden="true">
        <span className="decor decor--blob-a" />
        <span className="decor decor--blob-b" />
        <span className="decor decor--dot decor--dot-1" />
        <span className="decor decor--dot decor--dot-2" />
        <span className="decor decor--dot decor--dot-3" />
      </div>

      <div className="shell">
        <main id="main" className="shell__main">
          {/* Hero, showcase and the About intro share one pinned stage. */}
          <HomeStage />
          <About />
          <Contact />
        </main>
      </div>
      </div>
    </>
  )
}
