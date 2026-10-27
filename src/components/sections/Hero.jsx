import { useRef } from 'react'
import { ArrowUpRight, Code2, Sparkles } from 'lucide-react'
import { m, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { Link } from 'react-router-dom'
import BrandIcon from '../common/BrandIcon.jsx'
import ExternalLink from '../common/ExternalLink.jsx'
import FlickeringLightsGrid from '../effects/FlickeringLightsGrid.jsx'
import { GITHUB_URL, LINKEDIN_URL } from '../../utils/constants.js'
import { heroVariants, staggerContainer, staggerItem } from '../../utils/motion.js'
import { projects } from '../../data/projects.js'

export default function Hero() {
  const heroRef = useRef(null)
  const reduceMotion = Boolean(useReducedMotion())
  const devpilot = projects.find((p) => p.slug === 'devpilot') || projects[0]

  // Track Hero relative to viewport as user leaves the top
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  // Controlled, subtle recession transforms linked to scroll progress (contained within hero boundary)
  const heroCopyY = useTransform(scrollYProgress, [0, 0.8], [0, -24])
  const heroCopyScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.96])
  const heroCopyOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0.35])

  const heroPanelY = useTransform(scrollYProgress, [0, 0.8], [0, -18])
  const heroPanelScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.97])
  const heroPanelOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0.4])

  const lightsOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0.35])

  return (
    <section
      ref={heroRef}
      className="hero section settled relative overflow-hidden"
      id="home"
      aria-label="Introduction"
    >
      {/* Background Flickering Lights Grid (Aceternity UI) with scroll recession */}
      <m.div
        style={{ opacity: reduceMotion ? 1 : lightsOpacity }}
        className="absolute inset-0 pointer-events-none"
      >
        <FlickeringLightsGrid rows={8} cols={14} />
      </m.div>

      {/* One shared editorial monogram spanning the complete hero composition. */}
      <div className="hero-monogram" aria-hidden="true">GR</div>

      {/* Primary Content Area (Left) with scroll recession */}
      <m.div
        style={{
          y: reduceMotion ? 0 : heroCopyY,
          scale: reduceMotion ? 1 : heroCopyScale,
          opacity: reduceMotion ? undefined : heroCopyOpacity,
        }}
        className="hero-copy relative z-10"
        variants={reduceMotion ? undefined : heroVariants.container}
        initial={reduceMotion ? undefined : 'hidden'}
        animate="visible"
      >
        <m.div
          className="eyebrow-wrapper"
          variants={reduceMotion ? undefined : heroVariants.eyebrow}
        >
          <p className="eyebrow">
            FULL-STACK DEVELOPER | CSE STUDENT
          </p>
        </m.div>

        <m.h1
          className="hero-main-title"
          variants={reduceMotion ? undefined : heroVariants.title}
        >
          <span className="title-line">Building useful products</span>
          <span className="title-line highlight">with code, thoughtful</span>
          <span className="title-line">engineering, and AI.</span>
        </m.h1>

        <m.p
          className="lede"
          variants={reduceMotion ? undefined : heroVariants.lede}
        >
          I’m Gaurav Rajput, a fourth-year Computer Science and Engineering student at Quantum University.
          I focus on full-stack web applications, resilient backend APIs, persistent databases, and practical AI integrations.
        </m.p>

        <m.div
          className="hero-ctas-container mt-7 space-y-4"
          variants={reduceMotion ? undefined : staggerContainer(0.15, 0.1)}
        >
          {/* Primary & Secondary Action Buttons */}
          <div className="hero-ctas flex flex-wrap items-center gap-3">
            <m.div variants={reduceMotion ? undefined : staggerItem(14, 0.6)}>
              <Link className="button primary cta-button" to="/projects">
                <span>Explore Projects</span>
                <ArrowUpRight size={16} aria-hidden="true" className="btn-arrow" />
              </Link>
            </m.div>

            <m.div variants={reduceMotion ? undefined : staggerItem(14, 0.6)}>
              <Link className="button cta-button" to="/resume">
                <span>View Resume</span>
                <ArrowUpRight size={16} aria-hidden="true" className="btn-arrow" />
              </Link>
            </m.div>

            <m.div variants={reduceMotion ? undefined : staggerItem(14, 0.6)}>
              <Link className="button cta-button" to="/contact">
                <span>Get in Touch</span>
                <ArrowUpRight size={16} aria-hidden="true" className="btn-arrow" />
              </Link>
            </m.div>
          </div>

          {/* Social & Code Profiles */}
          <m.div
            variants={reduceMotion ? undefined : staggerItem(12, 0.5)}
            className="hero-social-links flex items-center gap-3 pt-1 text-sm font-mono text-muted"
          >
            <span className="text-muted/60 text-xs uppercase tracking-wider">Profiles:</span>
            <ExternalLink className="text-link inline-flex items-center gap-1.5 hover:text-white transition-colors" href={GITHUB_URL}>
              <BrandIcon type="github" />
              <span>GitHub</span>
            </ExternalLink>
            <span className="text-line-light select-none">/</span>
            <ExternalLink className="text-link inline-flex items-center gap-1.5 hover:text-white transition-colors" href={LINKEDIN_URL}>
              <BrandIcon type="linkedin" />
              <span>LinkedIn</span>
            </ExternalLink>
          </m.div>
        </m.div>
      </m.div>

      {/* Secondary Content Area (Right) — Architectural HTML/CSS Composition with scroll recession */}
      <m.div
        style={{
          y: reduceMotion ? 0 : heroPanelY,
          scale: reduceMotion ? 1 : heroPanelScale,
          opacity: reduceMotion ? undefined : heroPanelOpacity,
        }}
        className="hero-editorial-panel relative z-10"
        aria-label="Developer profile overview"
        variants={reduceMotion ? undefined : heroVariants.panel}
        initial={reduceMotion ? undefined : 'hidden'}
        animate="visible"
      >
        <div className="panel-frame">
          {/* Top Panel Bar with status indicator */}
          <div className="panel-header">
            <div className="status-indicator">
              <span className="status-dot pulse" aria-hidden="true" />
              <span className="status-text">Available for SDE Roles &amp; Internships</span>
            </div>
            <span className="panel-serial">Portfolio // 2026</span>
          </div>

          {/* Academic overview */}
          <div className="panel-signature-block">
            <div className="signature-content">
              <div className="academic-highlight">
                <span className="academic-degree">B.Tech · Computer Science &amp; Engineering</span>
                <span className="academic-inst">Quantum University · CGPA 8.2 / 10</span>
              </div>
            </div>
          </div>

          {/* Technology Badges Matrix */}
          <div className="panel-tech-section">
            <div className="tech-section-label">
              <Code2 size={13} aria-hidden="true" />
              <span>Core Stack</span>
            </div>
            <div className="hero-stack-chips">
              <span className="stack-chip">React</span>
              <span className="stack-chip">Next.js</span>
              <span className="stack-chip">Node.js</span>
              <span className="stack-chip">Express</span>
              <span className="stack-chip">MongoDB</span>
              <span className="stack-chip">TypeScript</span>
            </div>
          </div>

          {/* Featured Project Spotlight */}
          <Link
            to={`/projects/${devpilot.slug}`}
            className="hero-project-spotlight"
            aria-label={`Featured Project: ${devpilot.name}`}
          >
            <div className="spotlight-header">
              <div className="spotlight-tag">
                <Sparkles size={12} aria-hidden="true" />
                <span>Featured Project</span>
              </div>
              <span className="spotlight-status">In Development</span>
            </div>
            <h3 className="spotlight-title">{devpilot.name}</h3>
            <p className="spotlight-desc">{devpilot.tagline}</p>
            <span className="spotlight-cta">
              <span>View Case Study</span>
              <ArrowUpRight size={14} aria-hidden="true" className="btn-arrow" />
            </span>
          </Link>
        </div>
      </m.div>
    </section>
  )
}
