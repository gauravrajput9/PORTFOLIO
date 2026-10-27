import { m, useReducedMotion } from 'motion/react'
import { maskReveal } from '../../utils/motion.js'

export default function MaskedReveal({
  children,
  delay = 0,
  duration = 0.85,
  className = '',
  as: Component = 'div',
}) {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return <Component className={className}>{children}</Component>
  }

  const variants = maskReveal(delay, duration)

  return (
    <div className={`masked-reveal-wrapper ${className}`} style={{ overflow: 'hidden' }}>
      <m.div
        variants={variants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-30px' }}
      >
        {children}
      </m.div>
    </div>
  )
}
