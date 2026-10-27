import { useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  CheckCircle2,
  Code2,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  Terminal,
} from 'lucide-react'
import { m, useTransform } from 'motion/react'
import ScrollPageHeader from '../components/animation/ScrollPageHeader.jsx'
import ScrollSplitSection from '../components/animation/ScrollSplitSection.jsx'
import ScrollTimeline from '../components/animation/ScrollTimeline.jsx'
import { useScrollProgress } from '../hooks/useScrollProgress.js'
import { useDocumentTitle } from '../hooks/useDocumentTitle.js'
import { journeyItems } from '../data/journey.js'

export default function ExperiencePage() {
  useDocumentTitle('Experience — Gaurav Rajput')

  // Timeline section scroll progress
  const timelineRef = useRef(null)
  const { scrollYProgress: timelineProgress, reduceMotion } = useScrollProgress(timelineRef, {
    offset: ['start 0.85', 'start 0.25'],
  })
  const timelineHeadY = useTransform(timelineProgress, [0, 0.75], [26, 0])
  const timelineHeadOpacity = useTransform(timelineProgress, [0, 0.65], [0.35, 1])

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
        eyebrow="Practical Milestones"
        title={
          <h1>
            Hands-on engineering,<br />
            <span>internship missions, and builds.</span>
          </h1>
        }
        description="Bridging theoretical computer science with real-world software engineering. From international challenge missions and security protocols to developer workspaces and applied AI applications."
      />

      {/* 01 / Featured Milestone: HENNGE Global Internship Program */}
      <ScrollSplitSection
        aria-label="HENNGE Global Internship Program"
        left={
          <div>
            <div className="section-label">
              <ShieldCheck size={20} className="section-icon" aria-hidden="true" />
              <p className="eyebrow">01 / Challenge Program</p>
            </div>
            <h2>
              HENNGE Global<br />
              <span>Internship Program.</span>
            </h2>
            <p className="lede">
              A documented technical challenge milestone focused on backend protocols and cryptography.
            </p>
          </div>
        }
        right={
          <div className="prose">
            <div className="academic-card featured-degree-card">
              <div className="card-top">
                <div>
                  <span className="degree-tag">Technical Milestone</span>
                  <h3>Mission 3 — Completed</h3>
                </div>
                <span className="badge">Technical milestone</span>
              </div>

              <div className="academic-stat-row">
                <div className="stat-pill">
                  <span className="stat-label">Completion Date</span>
                  <strong className="stat-value highlight-stat">20 October 2026</strong>
                </div>
                <div className="stat-pill">
                  <span className="stat-label">Domain</span>
                  <span className="stat-value">Backend &amp; Security Protocols</span>
                </div>
                <div className="stat-pill">
                  <span className="stat-label">Verification</span>
                  <span className="stat-value">Automated Remote Suite</span>
                </div>
              </div>

              <p className="academic-desc">
                Completed Mission 3 of the HENNGE Global Internship Program. This milestone is presented as a
                challenge completion—not as employment or an internship offer.
              </p>

              <ul className="milestone-bullets">
                <li>
                  <CheckCircle2 size={16} className="bullet-icon" aria-hidden="true" />
                  <span>Completed the documented Mission 3 technical challenge.</span>
                </li>
                <li>
                  <CheckCircle2 size={16} className="bullet-icon" aria-hidden="true" />
                  <span>Focused on backend protocol and cryptography concepts.</span>
                </li>
                <li>
                  <CheckCircle2 size={16} className="bullet-icon" aria-hidden="true" />
                  <span>Recorded as completed on 20 October 2026.</span>
                </li>
              </ul>
            </div>
          </div>
        }
      />

      {/* 02 / Featured Milestone: DevPilot & Applied Software */}
      <ScrollSplitSection
        aria-label="Developer tooling and projects"
        left={
          <div>
            <div className="section-label">
              <Terminal size={20} className="section-icon" aria-hidden="true" />
              <p className="eyebrow">02 / Technical Leadership</p>
            </div>
            <h2>
              DevPilot &amp;<br />
              <span>developer tooling.</span>
            </h2>
            <p className="lede">
              Architecting full-stack systems with modern frameworks, reliable API contracts, and integrated intelligence.
            </p>
          </div>
        }
        right={
          <div className="prose flex flex-col gap-6">
            <div className="focus-block">
              <div className="focus-title">
                <Sparkles size={18} aria-hidden="true" />
                <h3>DevPilot — Intelligent Web Workspace</h3>
              </div>
              <p className="focus-sub">In Active Development · 2025 – Present</p>
              <ul>
                <li>
                  <strong>In-Browser Execution Runtime:</strong> Architecting a secure browser workspace with instant code evaluation across multiple languages.
                </li>
                <li>
                  <strong>Groq / Llama 3 LLM Pipelines:</strong> Implementing low-latency AI diagnostics, real-time code explanation, and automated test synthesis.
                </li>
                <li>
                  <strong>Modular Workspace UI:</strong> Crafting split-pane editor layouts, file-tree hierarchies, and contextual debugging panels.
                </li>
              </ul>
            </div>

            <div className="focus-block">
              <div className="focus-title">
                <Code2 size={18} aria-hidden="true" />
                <h3>Applied Full-Stack &amp; AI Engineering</h3>
              </div>
              <p className="focus-sub">Production Builds &amp; Deployed Platforms</p>
              <ul>
                <li>
                  <strong>AI Resume Analyzer:</strong> PDF text extraction pipeline with Google Gemini API for deep semantic ATS scoring and category ratings.
                </li>
                <li>
                  <strong>Learning Management System:</strong> Full MERN architecture featuring JWT authentication, role-based course authoring, and student dashboards.
                </li>
                <li>
                  <strong>Currency Converter:</strong> Real-time financial rate consumption, responsive charting, and offline-resilient local caching.
                </li>
              </ul>
            </div>
          </div>
        }
      />

      {/* 03 / Chronological Journey — Scroll-Driven Timeline */}
      <section
        ref={timelineRef}
        className="section journey-section relative py-20 border-t border-line/60"
        aria-label="Chronological progression"
      >
        <m.div
          style={{
            y: reduceMotion ? 0 : timelineHeadY,
            opacity: reduceMotion ? 1 : timelineHeadOpacity,
          }}
          className="section-head mb-8 transform-gpu"
        >
          <div>
            <p className="eyebrow">03 / Progression</p>
            <h2>
              Chronological journey<br />
              <span>and progression.</span>
            </h2>
          </div>
        </m.div>

        <ScrollTimeline items={journeyItems} />
      </section>

      {/* 04 / Navigation & CTAs */}
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
            <span>Explore Project Case Studies</span>
            <ArrowUpRight size={16} aria-hidden="true" className="btn-arrow" />
          </Link>
          <Link className="button cta-button" to="/skills">
            <span>View Technical Toolkit</span>
            <ArrowUpRight size={16} aria-hidden="true" className="btn-arrow" />
          </Link>
          <Link className="button cta-button" to="/contact">
            <span>Get in Touch</span>
            <ArrowUpRight size={16} aria-hidden="true" className="btn-arrow" />
          </Link>
        </m.div>
      </section>
    </main>
  )
}
