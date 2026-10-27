import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { m, useTransform } from 'motion/react'
import AnimatedFeatureCard from '../../common/AnimatedFeatureCard.jsx'
import { useScrollProgress } from '../../../hooks/useScrollProgress.js'

/**
 * ScrollTechFocus
 *
 * Technical Focus section with independent boundary and 3D depth movement:
 * - Clear layout boundaries with standard vertical padding and top border.
 * - Left: Progressive horizontal text reveal and unrolling glowing accent beam.
 * - Right: Subtle 3D perspective depth movement for the Animated Feature Card.
 */
export default function ScrollTechFocus() {
  const sectionRef = useRef(null)

  const { scrollYProgress, reduceMotion } = useScrollProgress(sectionRef, {
    offset: ['start 0.85', 'start 0.25'],
  })

  // Left Column transforms: settle smoothly into position
  const textX = useTransform(scrollYProgress, [0, 0.8], [-28, 0])
  const textOpacity = useTransform(scrollYProgress, [0, 0.7], [0.3, 1])
  const beamWidth = useTransform(scrollYProgress, [0.1, 0.85], ['0%', '100%'])

  // Right Column transforms (depth & 3D tilt)
  const cardY = useTransform(scrollYProgress, [0, 0.85], [32, 0])
  const cardScale = useTransform(scrollYProgress, [0, 0.85], [0.96, 1])
  const cardRotateY = useTransform(scrollYProgress, [0, 0.85], [-5, 0])
  const cardOpacity = useTransform(scrollYProgress, [0, 0.75], [0.35, 1])
  const glowScale = useTransform(scrollYProgress, [0.15, 0.85], [0.85, 1.1])
  const glowOpacity = useTransform(scrollYProgress, [0.15, 0.85], [0, 0.5])

  return (
    <section
      ref={sectionRef}
      className="section home-preview two-column relative py-20 border-t border-line/60"
      id="tech-focus"
      aria-label="Technical focus"
    >
      {/* Left Column: Progressive Text Reveal & Expanding Accent Beam */}
      <m.div
        style={{
          x: reduceMotion ? 0 : textX,
          opacity: reduceMotion ? 1 : textOpacity,
        }}
        className="transform-gpu flex flex-col justify-center"
      >
        <div className="relative inline-block mb-3">
          <p className="eyebrow m-0">02 / Technical Focus</p>
          <m.div
            style={{ width: reduceMotion ? '100%' : beamWidth }}
            className="h-[2px] bg-gradient-to-r from-violet via-indigo to-transparent mt-1"
          />
        </div>

        <h2>
          Full-stack foundations,<br />
          <span>applied with care.</span>
        </h2>

        <p className="lede">
          I develop practical experience across modern frontend engineering, RESTful APIs,
          database architecture, and applied AI workflows.
        </p>

        <div className="mt-4">
          <Link className="text-link" to="/skills">
            <span>Explore full skill set</span>
            <ArrowUpRight size={15} aria-hidden="true" className="link-arrow" />
          </Link>
        </div>
      </m.div>

      {/* Right Column: 3D Perspective Floating Feature Card */}
      <div className="relative flex items-center justify-center [perspective:1000px]">
        {/* Ambient violet blooming glow */}
        <m.div
          style={{
            scale: reduceMotion ? 1 : glowScale,
            opacity: reduceMotion ? 0.25 : glowOpacity,
          }}
          className="absolute inset-0 bg-violet/20 blur-3xl rounded-full pointer-events-none"
        />

        <m.div
          style={{
            y: reduceMotion ? 0 : cardY,
            scale: reduceMotion ? 1 : cardScale,
            rotateY: reduceMotion ? 0 : cardRotateY,
            opacity: reduceMotion ? 1 : cardOpacity,
          }}
          className="w-full relative z-10 transform-gpu"
        >
          <AnimatedFeatureCard />
        </m.div>
      </div>
    </section>
  )
}
