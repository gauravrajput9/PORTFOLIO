import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { m, useTransform } from 'motion/react'
import { useScrollProgress } from '../../../hooks/useScrollProgress.js'

/**
 * ScrollAboutPreview
 *
 * Layered editorial split composition for the homepage About / Background preview.
 * - Sits in normal document flow with clear layout boundaries.
 * - Subtle numeric watermark drifting with horizontal parallax (contained inside overflow-hidden).
 * - Staggered scroll-linked text alignment between headline and supporting lede.
 */
export default function ScrollAboutPreview() {
  const sectionRef = useRef(null)

  const { scrollYProgress, reduceMotion } = useScrollProgress(sectionRef, {
    offset: ['start 0.85', 'start 0.25'],
  })

  // Numeric watermark horizontal parallax
  const watermarkX = useTransform(scrollYProgress, [0, 1], [60, -20])
  const watermarkOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.01, 0.07, 0.03])

  // Left column (Eyebrow & Heading)
  const headingY = useTransform(scrollYProgress, [0, 0.8], [28, 0])
  const headingOpacity = useTransform(scrollYProgress, [0, 0.7], [0.3, 1])

  // Right column (Lede & CTA button)
  const descY = useTransform(scrollYProgress, [0.05, 0.85], [36, 0])
  const descOpacity = useTransform(scrollYProgress, [0.05, 0.75], [0.3, 1])
  const dividerScale = useTransform(scrollYProgress, [0.1, 0.8], [0, 1])

  return (
    <section
      ref={sectionRef}
      className="section home-preview about-preview relative py-20 border-t border-line/60 overflow-hidden"
      id="about-preview"
      aria-label="About preview"
    >
      {/* Editorial numeric watermark with horizontal parallax */}
      <m.div
        aria-hidden="true"
        style={{
          x: reduceMotion ? 0 : watermarkX,
          opacity: reduceMotion ? 0.04 : watermarkOpacity,
        }}
        className="absolute -top-6 right-8 text-[14rem] font-mono font-black text-white pointer-events-none select-none z-0 leading-none"
      >
        03
      </m.div>

      {/* Left Column */}
      <m.div
        style={{
          y: reduceMotion ? 0 : headingY,
          opacity: reduceMotion ? 1 : headingOpacity,
        }}
        className="relative z-10 transform-gpu flex flex-col justify-center"
      >
        <p className="eyebrow">03 / Background</p>
        <h2>
          A computer science student<br />
          <span>building by doing.</span>
        </h2>
      </m.div>

      {/* Right Column */}
      <m.div
        style={{
          y: reduceMotion ? 0 : descY,
          opacity: reduceMotion ? 1 : descOpacity,
        }}
        className="relative z-10 transform-gpu flex flex-col justify-center"
      >
        {/* Subtle horizontal accent line */}
        <m.div
          style={{
            scaleX: reduceMotion ? 1 : dividerScale,
            transformOrigin: 'left',
          }}
          className="h-[1px] bg-line/80 w-24 mb-4"
        />

        <p className="lede">
          At Quantum University, I’m learning how reliable web products are made—from the first
          interface decision to the API, data layer, and production deployment behind it.
        </p>

        <div className="mt-4">
          <Link className="button primary cta-button" to="/about">
            <span>Learn more about me</span>
            <ArrowUpRight size={15} aria-hidden="true" className="btn-arrow" />
          </Link>
        </div>
      </m.div>
    </section>
  )
}
