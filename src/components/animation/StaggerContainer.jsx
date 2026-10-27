import { m, useReducedMotion } from 'motion/react'
import { staggerContainer, staggerItem } from '../../utils/motion.js'

export function StaggerContainer({
  children,
  staggerDelay = 0.18,
  delayChildren = 0.08,
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

  const variants = staggerContainer(staggerDelay, delayChildren)

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

export function StaggerItem({
  children,
  distance = 20,
  duration = 0.7,
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

  const variants = staggerItem(distance, duration)

  return (
    <m.div variants={variants} className={className} {...props}>
      {children}
    </m.div>
  )
}
