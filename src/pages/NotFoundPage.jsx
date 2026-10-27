import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { m, useReducedMotion } from 'motion/react'
import { useDocumentTitle } from '../hooks/useDocumentTitle.js'
import { TRANSITION_EASE } from '../utils/motion.js'

export default function NotFoundPage() {
  useDocumentTitle('Page not found — Gaurav Rajput')
  const reduceMotion = Boolean(useReducedMotion())

  return (
    <main id="main" className="not-found section relative py-24">
      <m.div
        initial={reduceMotion ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: TRANSITION_EASE }}
        className="not-found-content transform-gpu"
      >
        <p className="eyebrow">404 Error</p>
        <h1>
          This route<br />
          <span>isn’t wired.</span>
        </h1>
        <p className="lede">
          The requested page or project does not exist, or the link may have moved.
        </p>
        <div className="not-found-actions">
          <Link className="button primary" to="/">
            <ArrowLeft size={16} aria-hidden="true" />
            <span>Return home</span>
          </Link>
          <Link className="button" to="/projects">
            Browse projects
          </Link>
        </div>
      </m.div>
    </main>
  )
}
