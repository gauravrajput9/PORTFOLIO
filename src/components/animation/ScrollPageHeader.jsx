import { useRef } from 'react'
import { m, useTransform } from 'motion/react'
import { useScrollProgress } from '../../hooks/useScrollProgress.js'

/**
 * Reusable Scroll-Driven Page Header
 * Implements a refined, cinematic scroll-linked recession:
 * as the user reads and scrolls down, the heading and description subtly scale,
 * glide upward, and softly fade back to seamlessly direct visual focus to the content.
 */
export default function ScrollPageHeader({
  eyebrow,
  title,
  description,
  children,
  className = '',
  id,
  'aria-label': ariaLabel,
}) {
  const headerRef = useRef(null)

  const { scrollYProgress, reduceMotion } = useScrollProgress(headerRef, {
    offset: ['start start', 'end start'],
  })

  // Subtle, contained recession transforms
  const titleY = useTransform(scrollYProgress, [0, 0.9], [0, -22])
  const titleScale = useTransform(scrollYProgress, [0, 0.9], [1, 0.96])
  const titleOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.35])

  const ledeY = useTransform(scrollYProgress, [0, 0.9], [0, -16])
  const ledeOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.4])

  const actionsY = useTransform(scrollYProgress, [0, 0.9], [0, -10])
  const actionsOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0.5])

  return (
    <section
      ref={headerRef}
      id={id}
      className={`section page-intro relative overflow-hidden ${className}`}
      aria-label={ariaLabel || (typeof title === 'string' ? title : 'Page introduction')}
    >
      <m.div
        style={{
          y: reduceMotion ? 0 : titleY,
          scale: reduceMotion ? 1 : titleScale,
          opacity: reduceMotion ? 1 : titleOpacity,
        }}
        className="transform-gpu"
      >
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        {typeof title === 'string' ? <h1>{title}</h1> : title}
      </m.div>

      {description && (
        <m.p
          style={{
            y: reduceMotion ? 0 : ledeY,
            opacity: reduceMotion ? 1 : ledeOpacity,
          }}
          className="lede transform-gpu"
        >
          {description}
        </m.p>
      )}

      {children && (
        <m.div
          style={{
            y: reduceMotion ? 0 : actionsY,
            opacity: reduceMotion ? 1 : actionsOpacity,
          }}
          className="transform-gpu"
        >
          {children}
        </m.div>
      )}
    </section>
  )
}

