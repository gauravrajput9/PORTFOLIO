import { m, useReducedMotion } from 'motion/react'
import { fadeInUp } from '../../utils/motion.js'

export default function Reveal({
  children,
  delay = 0,
  y = 24,
  duration = 0.75,
  className = '',
  ...props
}) {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return (
      <div className={className} {...props}>
        {children}
      </div>
    )
  }

  const variants = fadeInUp(y, delay, duration)

  return (
    <m.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      className={className}
      {...props}
    >
      {children}
    </m.div>
  )
}
