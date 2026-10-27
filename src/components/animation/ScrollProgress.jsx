import { m, useScroll, useSpring, useReducedMotion } from 'motion/react'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 400,
    damping: 38,
    restDelta: 0.001,
  })
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) return null

  return (
    <m.div
      className="scroll-progress-bar"
      style={{ scaleX }}
      aria-hidden="true"
    />
  )
}

