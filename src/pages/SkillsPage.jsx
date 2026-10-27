import { useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  Code2,
  Server,
  Database,
  Brain,
  Cpu,
  Wrench,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react'
import { m, useTransform } from 'motion/react'
import ScrollPageHeader from '../components/animation/ScrollPageHeader.jsx'
import { useScrollProgress } from '../hooks/useScrollProgress.js'
import { useDocumentTitle } from '../hooks/useDocumentTitle.js'
import { skillGroups } from '../data/skills.js'

export default function SkillsPage() {
  useDocumentTitle('Skills — Gaurav Rajput')

  const groupIcons = {
    Frontend: Code2,
    Backend: Server,
    'Databases & APIs': Database,
    'AI integration': Brain,
    'Programming & CS': Cpu,
    'Tools & workflow': Wrench,
  }

  const applications = [
    {
      title: 'DevPilot — Modern Coding Workspace',
      stack: 'React · Vite · Express · MongoDB · Better Auth',
      role: 'Monaco editor workspace, RESTful problem-set API architecture, and role-based auth.',
    },
    {
      title: 'AI-Powered Resume Analyzer',
      stack: 'Next.js · Groq LLM · pdf-parse · Tailwind CSS',
      role: 'Client-to-server PDF stream parsing and high-speed Groq LLM prompt evaluation.',
    },
    {
      title: 'Learning Management System',
      stack: 'React · Express · MongoDB · Node.js',
      role: 'End-to-end curriculum navigation, course/lesson REST API, and persistent progress tracking.',
    },
    {
      title: 'Currency Converter',
      stack: 'JavaScript · HTML5 · CSS3 · ExchangeRate API',
      role: 'Real-time financial exchange rate queries, bidirectional conversion, and resilient API handling.',
    },
  ]

  // Section 01: Core Competencies scroll progress
  const competenciesRef = useRef(null)
  const { scrollYProgress: compProgress, reduceMotion } = useScrollProgress(competenciesRef, {
    offset: ['start 0.85', 'start 0.25'],
  })
  const compHeadY = useTransform(compProgress, [0, 0.75], [26, 0])
  const compHeadOpacity = useTransform(compProgress, [0, 0.65], [0.35, 1])

  // Section 02: Applied Practice scroll progress
  const appliedRef = useRef(null)
  const { scrollYProgress: appliedProgress } = useScrollProgress(appliedRef, {
    offset: ['start 0.85', 'start 0.25'],
  })
  const appliedHeadY = useTransform(appliedProgress, [0, 0.75], [26, 0])
  const appliedHeadOpacity = useTransform(appliedProgress, [0, 0.65], [0.35, 1])

  // Navigation CTAs scroll progress
  const linksRef = useRef(null)
  const { scrollYProgress: linksProgress } = useScrollProgress(linksRef, {
    offset: ['start 0.9', 'start 0.4'],
  })
  const linksY = useTransform(linksProgress, [0, 0.8], [24, 0])
  const linksOpacity = useTransform(linksProgress, [0, 0.7], [0.35, 1])

  return (
    <main id="main">
      {/* 00 / Intro with cinematic scroll recession */}
      <ScrollPageHeader
        eyebrow="Technical Capabilities"
        title={
          <h1>
            A practical, production-ready<br />
            <span>engineering toolkit.</span>
          </h1>
        }
        description="Specializing in modern full-stack web architecture, backend services, persistent data modeling, and applied AI workflows. Every tool is backed by hands-on project construction and computer science rigor."
      />

      {/* 01 / Core Competencies Matrix */}
      <section
        ref={competenciesRef}
        className="section relative py-20 border-t border-line/60"
        aria-label="Skills matrix"
      >
        <m.div
          style={{
            y: reduceMotion ? 0 : compHeadY,
            opacity: reduceMotion ? 1 : compHeadOpacity,
          }}
          className="section-head mb-10 transform-gpu"
        >
          <div>
            <p className="eyebrow">01 / Core Competencies</p>
            <h2>
              Categorized capabilities &amp;<br />
              <span>technological stack.</span>
            </h2>
          </div>
        </m.div>

        <div className="skill-grid">
          {Object.entries(skillGroups).map(([name, items], index) => {
            const Icon = groupIcons[name] || Code2
            return (
              <SkillGroupCard
                key={name}
                name={name}
                items={items}
                Icon={Icon}
                index={index}
                scrollYProgress={compProgress}
                reduceMotion={reduceMotion}
              />
            )
          })}
        </div>
      </section>

      {/* 02 / Applied Context */}
      <section
        ref={appliedRef}
        className="section relative py-20 border-t border-line/60"
        aria-label="How skills are applied"
      >
        <m.div
          style={{
            y: reduceMotion ? 0 : appliedHeadY,
            opacity: reduceMotion ? 1 : appliedHeadOpacity,
          }}
          className="section-head mb-10 transform-gpu"
        >
          <div>
            <p className="eyebrow">02 / Applied Practice</p>
            <h2>
              Putting the stack<br />
              <span>into production.</span>
            </h2>
          </div>
        </m.div>

        <div className="applied-grid">
          {applications.map((app, index) => (
            <AppliedCard
              key={app.title}
              app={app}
              index={index}
              scrollYProgress={appliedProgress}
              reduceMotion={reduceMotion}
            />
          ))}
        </div>
      </section>

      {/* 03 / Navigation & CTAs */}
      <section
        ref={linksRef}
        className="section about-links relative py-16 border-t border-line/60"
        aria-label="Next destinations"
      >
        <m.div
          style={{
            y: reduceMotion ? 0 : linksY,
            opacity: reduceMotion ? 1 : linksOpacity,
          }}
          className="about-links-wrapper transform-gpu"
        >
          <Link className="button primary cta-button" to="/projects">
            <span>View All Projects</span>
            <ArrowUpRight size={16} aria-hidden="true" className="btn-arrow" />
          </Link>
          <Link className="button cta-button" to="/resume">
            <span>Inspect Resume</span>
            <ArrowUpRight size={16} aria-hidden="true" className="btn-arrow" />
          </Link>
          <Link className="button cta-button" to="/contact">
            <span>Start a Conversation</span>
            <ArrowUpRight size={16} aria-hidden="true" className="btn-arrow" />
          </Link>
        </m.div>
      </section>
    </main>
  )
}

function SkillGroupCard({ name, items, Icon, index, scrollYProgress, reduceMotion }) {
  const start = 0.05 + (index * 0.07)
  const end = Math.min(0.95, start + 0.45)

  const y = useTransform(scrollYProgress, [start, end], [30, 0])
  const opacity = useTransform(scrollYProgress, [start, end], [0.35, 1])
  const scale = useTransform(scrollYProgress, [start, end], [0.97, 1])

  return (
    <m.div
      style={{
        y: reduceMotion ? 0 : y,
        opacity: reduceMotion ? 1 : opacity,
        scale: reduceMotion ? 1 : scale,
      }}
      className="skill-group skill-group-extended transform-gpu"
    >
      <div className="skill-group-head">
        <Icon size={20} className="skill-icon" aria-hidden="true" />
        <h3>{name}</h3>
      </div>
      <div className="skill-tags">
        {items.map((item) => (
          <span key={item} className="skill-badge">
            {item}
          </span>
        ))}
      </div>
    </m.div>
  )
}

function AppliedCard({ app, index, scrollYProgress, reduceMotion }) {
  const start = 0.08 + (index * 0.1)
  const end = Math.min(0.95, start + 0.45)

  const y = useTransform(scrollYProgress, [start, end], [28, 0])
  const opacity = useTransform(scrollYProgress, [start, end], [0.35, 1])

  return (
    <m.div
      style={{
        y: reduceMotion ? 0 : y,
        opacity: reduceMotion ? 1 : opacity,
      }}
      className="applied-card transform-gpu"
    >
      <div className="applied-header">
        <Sparkles size={16} className="applied-sparkle" aria-hidden="true" />
        <h4>{app.title}</h4>
      </div>
      <p className="applied-stack">{app.stack}</p>
      <p className="applied-role">{app.role}</p>
    </m.div>
  )
}
