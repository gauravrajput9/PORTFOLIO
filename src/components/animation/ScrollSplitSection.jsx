import { useRef } from 'react'
import { m, useTransform } from 'motion/react'
import { useScrollProgress } from '../../hooks/useScrollProgress.js'

/**
 * Reusable Scroll-Driven Split Section
 * Coordinates two-column layouts where the left editorial header and right
 * card/content composition enter into harmony driven by scroll position.
 */
export default function ScrollSplitSection({
  left,
  right,
  id,
  className = '',
  'aria-label': ariaLabel,
}) {
  const sectionRef = useRef(null)

  const { scrollYProgress, reduceMotion } = useScrollProgress(sectionRef, {
    offset: ['start 0.85', 'start 0.25'],
  })

  // Left column: lateral entrance settling smoothly
  const leftX = useTransform(scrollYProgress, [0, 0.8], [-24, 0])
  const leftOpacity = useTransform(scrollYProgress, [0, 0.7], [0.35, 1])

  // Right column: elevation and subtle scale settling smoothly
  const rightY = useTransform(scrollYProgress, [0.05, 0.85], [30, 0])
  const rightScale = useTransform(scrollYProgress, [0.05, 0.85], [0.97, 1])
  const rightOpacity = useTransform(scrollYProgress, [0.05, 0.75], [0.35, 1])

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`section two-column relative py-20 border-t border-line/60 ${className}`}
      aria-label={ariaLabel}
    >
      <m.div
        style={{
          x: reduceMotion ? 0 : leftX,
          opacity: reduceMotion ? 1 : leftOpacity,
        }}
        className="transform-gpu flex flex-col justify-start"
      >
        {left}
      </m.div>

      <m.div
        style={{
          y: reduceMotion ? 0 : rightY,
          scale: reduceMotion ? 1 : rightScale,
          opacity: reduceMotion ? 1 : rightOpacity,
        }}
        className="transform-gpu"
      >
        {right}
      </m.div>
    </section>
  )
}

