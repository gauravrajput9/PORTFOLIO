import { m, useReducedMotion } from 'motion/react'
import { TRANSITION_EASE } from '../../utils/motion.js'

/**
 * Route content container.
 * Keeps destination content completely hidden (display: none) while full-screen
 * intro transition is running, and orchestrates smooth content-reveal animation
 * once Phase 3 begins.
 */
export default function PageIntro({ children, pathname }) {
  const reduceMotion = useReducedMotion()

  return (
    <div className="page-intro-root settled">
      <m.div
        key={pathname}
        className="page-intro-content"
        initial={reduceMotion ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.18,
          ease: TRANSITION_EASE,
        }}
      >
        {children}
      </m.div>
    </div>
  )
}
