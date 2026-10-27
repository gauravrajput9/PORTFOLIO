import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Check, Clock, ExternalLink as ExtIcon, ArrowLeft } from 'lucide-react'
import { m, useTransform } from 'motion/react'
import ExternalLink from '../common/ExternalLink.jsx'
import ProjectArchitecture from './ProjectArchitecture.jsx'
import ProjectVisual from './ProjectVisual.jsx'
import { useScrollProgress } from '../../hooks/useScrollProgress.js'

export default function CaseStudy({ project }) {
  const headerRef = useRef(null)

  useEffect(() => {
    document.getElementById('case-title')?.focus()
  }, [project.slug])

  const { scrollYProgress, reduceMotion } = useScrollProgress(headerRef, {
    offset: ['start start', 'end start'],
  })

  // Subtle header recession as user scrolls into the case narrative
  const headerY = useTransform(scrollYProgress, [0, 0.85], [0, -20])
  const headerScale = useTransform(scrollYProgress, [0, 0.85], [1, 0.97])
  const headerOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0.4])

  const visualY = useTransform(scrollYProgress, [0, 0.9], [0, 16])

  return (
    <main id="main" className="case section relative py-12">
      <Link to="/projects" className="back mb-6 inline-flex items-center gap-2 cursor-pointer" aria-label="Back to projects list">
        <ArrowLeft size={16} aria-hidden="true" />
        <span>All projects</span>
      </Link>

      {/* Case Header with Scroll Recession */}
      <div ref={headerRef} className="relative mb-8">
        <m.div
          style={{
            y: reduceMotion ? 0 : headerY,
            scale: reduceMotion ? 1 : headerScale,
            opacity: reduceMotion ? 1 : headerOpacity,
          }}
          className="case-header transform-gpu"
        >
          <div className="case-meta">
            <span className="eyebrow">Case Study</span>
            <span className={`status ${project.status}`}>
              {project.status === 'in-development' ? 'In Development' : 'Live Project'}
            </span>
          </div>
          <h1 id="case-title" tabIndex="-1">
            {project.name}
          </h1>
          <p className="lede">{project.tagline}</p>
        </m.div>

        {/* Hero Visual Mockup with Subtle Parallax Depth */}
        <m.div
          style={{
            y: reduceMotion ? 0 : visualY,
          }}
          className="case-hero-visual mt-8 transform-gpu"
        >
          <ProjectVisual project={project} />
        </m.div>
      </div>

      <div className="case-grid mt-12">
        <div className="case-main">
          <section className="case-section">
            <h2>The Problem</h2>
            <p>{project.problem}</p>
          </section>

          <section className="case-section">
            <h2>Solution &amp; Architecture</h2>
            <p>{project.solution}</p>
          </section>

          <section className="case-section">
            <h2>Engineering Challenges &amp; Lessons Learned</h2>
            <div className="challenge-box">
              <h3>Technical Challenge</h3>
              <p>{project.challenge}</p>
            </div>
            {project.lessonsLearned && (
              <div className="lesson-box">
                <h3>Key Takeaway</h3>
                <p>{project.lessonsLearned}</p>
              </div>
            )}
          </section>

          {project.slug === 'devpilot' && (
            <section className="case-section">
              <ProjectArchitecture />
            </section>
          )}
        </div>

        <aside className="case-sidebar" aria-label="Project details and actions">
          <div className="sidebar-group">
            <h3>Verified Status</h3>
            <span className={`status-pill ${project.status}`}>
              {project.status === 'in-development'
                ? 'Active Development'
                : 'Live & Operational'}
            </span>
          </div>

          <div className="sidebar-group">
            <h3>Technology Stack</h3>
            <div className="stack">
              {project.stack.map((item) => (
                <span key={item} className="stack-badge">{item}</span>
              ))}
            </div>
          </div>

          <div className="sidebar-group">
            <h3>Implemented Features</h3>
            <ul className="feature-list implemented">
              {project.implemented.map((item) => (
                <li key={item}>
                  <Check size={15} aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {project.planned.length > 0 && (
            <div className="sidebar-group planned-group">
              <h3>Planned / Future Scope</h3>
              <ul className="feature-list planned">
                {project.planned.map((item) => (
                  <li key={item}>
                    <Clock size={14} aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="sidebar-actions">
            {project.live && (
              <ExternalLink className="button primary full-width" href={project.live}>
                <span>Visit Live Project</span>
                <ExtIcon size={15} aria-hidden="true" />
              </ExternalLink>
            )}
            {project.repo ? (
              <ExternalLink className="button full-width" href={project.repo}>
                <span>View Source Code</span>
                <ExtIcon size={15} aria-hidden="true" />
              </ExternalLink>
            ) : (
              <span className="text-xs text-muted/60 font-mono text-center block pt-1">
                Source: Available upon request
              </span>
            )}
          </div>
        </aside>
      </div>
    </main>
  )
}
