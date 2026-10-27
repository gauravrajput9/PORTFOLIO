import { useRef } from 'react'
import { m, useTransform } from 'motion/react'
import { useScrollProgress } from '../../hooks/useScrollProgress.js'

/**
 * Reusable Scroll-Driven Timeline Component
 * Staggers timeline milestone entries along the actual scroll progress.
 * Renders an accent timeline progress indicator and smoothly coordinates
 * the entrance of each milestone step.
 */
export default function ScrollTimeline({ items = [], className = '' }) {
  const containerRef = useRef(null)

  const { scrollYProgress, reduceMotion } = useScrollProgress(containerRef, {
    offset: ['start 0.85', 'start 0.2'],
  })

  // Accent progress line scale linked to scroll
  const progressScaleX = useTransform(scrollYProgress, [0, 0.9], [0, 1])

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      {/* Scroll-Linked Progress Accent Spine */}
      <div className="w-full h-[2px] bg-line/60 rounded-full overflow-hidden mb-6">
        <m.div
          style={{
            scaleX: reduceMotion ? 1 : progressScaleX,
            transformOrigin: 'left',
          }}
          className="h-full bg-gradient-to-r from-violet via-indigo to-violet/80"
        />
      </div>

      <div className="timeline-grid">
        {items.map((item, index) => (
          <ScrollTimelineItem
            key={item}
            item={item}
            index={index}
            total={items.length}
            scrollYProgress={scrollYProgress}
            reduceMotion={reduceMotion}
          />
        ))}
      </div>
    </div>
  )
}

function ScrollTimelineItem({ item, index, total, scrollYProgress, reduceMotion }) {
  // Stagger entry range based on item index
  const startRatio = (index / total) * 0.55
  const endRatio = Math.min(1, startRatio + 0.4)

  const y = useTransform(scrollYProgress, [startRatio, endRatio], [28, 0])
  const opacity = useTransform(scrollYProgress, [startRatio, endRatio], [0.3, 1])
  const scale = useTransform(scrollYProgress, [startRatio, endRatio], [0.96, 1])

  const stepFormatted = String(index + 1).padStart(2, '0')

  return (
    <m.div
      style={{
        y: reduceMotion ? 0 : y,
        opacity: reduceMotion ? 1 : opacity,
        scale: reduceMotion ? 1 : scale,
      }}
      className="timeline-item transform-gpu"
    >
      <span className="step-num">{stepFormatted}</span>
      <p>{item}</p>
    </m.div>
  )
}

