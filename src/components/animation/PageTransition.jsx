import { m, useReducedMotion } from 'motion/react'
import { TRANSITION_EASE } from '../../utils/motion.js'

export default function PageTransition({ children, className = '' }) {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <m.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.5, ease: TRANSITION_EASE }}
      className={className}
    >
      {children}
    </m.div>
  )
}
