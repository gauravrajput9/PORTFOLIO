import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Sparkles } from 'lucide-react'
import { m, useTransform } from 'motion/react'
import ProjectCard from '../../projects/ProjectCard.jsx'
import { useScrollProgress } from '../../../hooks/useScrollProgress.js'

/**
 * ScrollFeaturedProjects
 *
 * Editorial Featured Projects showcase in predictable document flow:
 * - Asymmetrical storytelling layout where the flagship project (DevPilot)
 *   takes prominent visual focus, followed by balanced supporting projects.
 * - Progressive scroll-linked fan-out transitions that settle by viewport center.
 * - Zero screen pinning or scroll hijacking, ensuring adjacent sections never collide.
 */
export default function ScrollFeaturedProjects({ projects }) {
  const sectionRef = useRef(null)

  const { scrollYProgress, reduceMotion } = useScrollProgress(sectionRef, {
    offset: ['start 0.85', 'start 0.25'],
  })

  // Header transforms
  const headerY = useTransform(scrollYProgress, [0, 0.7], [28, 0])
  const headerOpacity = useTransform(scrollYProgress, [0, 0.6], [0.35, 1])

  // Card 0 (DevPilot — Flagship project)
  const card0Y = useTransform(scrollYProgress, [0, 0.85], [36, 0])
  const card0Scale = useTransform(scrollYProgress, [0, 0.85], [0.97, 1])
  const card0Opacity = useTransform(scrollYProgress, [0, 0.75], [0.35, 1])

  // Card 1 (AI Resume Analyzer — lateral entrance)
  const card1X = useTransform(scrollYProgress, [0.05, 0.9], [-24, 0])
  const card1Y = useTransform(scrollYProgress, [0.05, 0.9], [42, 0])
  const card1Opacity = useTransform(scrollYProgress, [0.05, 0.8], [0.3, 1])

  // Card 2 (LMS — lateral entrance)
  const card2X = useTransform(scrollYProgress, [0.1, 0.95], [24, 0])
  const card2Y = useTransform(scrollYProgress, [0.1, 0.95], [50, 0])
  const card2Opacity = useTransform(scrollYProgress, [0.1, 0.85], [0.3, 1])

  const cardTransforms = [
    {
      y: reduceMotion ? 0 : card0Y,
      scale: reduceMotion ? 1 : card0Scale,
      opacity: reduceMotion ? 1 : card0Opacity,
    },
    {
      x: reduceMotion ? 0 : card1X,
      y: reduceMotion ? 0 : card1Y,
      opacity: reduceMotion ? 1 : card1Opacity,
    },
    {
      x: reduceMotion ? 0 : card2X,
      y: reduceMotion ? 0 : card2Y,
      opacity: reduceMotion ? 1 : card2Opacity,
    },
  ]

  const featuredList = projects.slice(0, 3)

  return (
    <section
      ref={sectionRef}
      className="section home-featured relative py-24 border-t border-line/60"
      id="projects"
      aria-label="Featured projects"
    >
      <div className="w-full relative">
        {/* Section Head with Editorial Routing */}
        <m.div
          style={{
            y: reduceMotion ? 0 : headerY,
            opacity: reduceMotion ? 1 : headerOpacity,
          }}
          className="section-head compact-head mb-10 transform-gpu"
        >
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-violet/10 border border-violet/20 text-violet text-[11px] font-mono uppercase tracking-wider mb-2">
              <Sparkles size={12} aria-hidden="true" />
              <span>01 / Selected Work</span>
            </div>
            <h2>
              Products connecting<br />
              <span>interfaces and systems.</span>
            </h2>
          </div>
          <div>
            <Link className="text-link editorial-all-link" to="/projects">
              <span>All projects ({projects.length})</span>
              <ArrowUpRight size={15} aria-hidden="true" className="link-arrow" />
            </Link>
          </div>
        </m.div>

        {/* Dynamic Scroll-Driven Project Grid */}
        <div className="project-grid featured-grid grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Flagship Project: Spans full width on desktop */}
          {featuredList[0] && (
            <m.div
              style={cardTransforms[0] || {}}
              className="w-full transform-gpu lg:col-span-2"
            >
              <ProjectCard
                project={featuredList[0]}
                index={0}
                className="featured-flagship-card"
              />
            </m.div>
          )}

          {/* Supporting Projects: Two balanced columns */}
          {featuredList.slice(1).map((project, idx) => {
            const actualIndex = idx + 1
            return (
              <m.div
                key={project.slug}
                style={cardTransforms[actualIndex] || {}}
                className="w-full transform-gpu"
              >
                <ProjectCard
                  project={project}
                  index={actualIndex}
                />
              </m.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
