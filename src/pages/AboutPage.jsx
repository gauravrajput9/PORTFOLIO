import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Compass, Code, Brain } from 'lucide-react'
import { m, useTransform } from 'motion/react'
import Skills from '../components/sections/Skills.jsx'
import ExternalLink from '../components/common/ExternalLink.jsx'
import ScrollPageHeader from '../components/animation/ScrollPageHeader.jsx'
import ScrollSplitSection from '../components/animation/ScrollSplitSection.jsx'
import ScrollTimeline from '../components/animation/ScrollTimeline.jsx'
import { useScrollProgress } from '../hooks/useScrollProgress.js'
import { useDocumentTitle } from '../hooks/useDocumentTitle.js'
import { GITHUB_URL, LINKEDIN_URL } from '../utils/constants.js'
import { journeyItems } from '../data/journey.js'

export default function AboutPage() {
  useDocumentTitle('About — Gaurav Rajput')

  // Milestones section scroll progress
  const milestonesRef = useRef(null)
  const { scrollYProgress: milestonesProgress, reduceMotion } = useScrollProgress(milestonesRef, {
    offset: ['start 0.85', 'start 0.25'],
  })
  const milestoneHeadY = useTransform(milestonesProgress, [0, 0.75], [26, 0])
  const milestoneHeadOpacity = useTransform(milestonesProgress, [0, 0.65], [0.35, 1])

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
        eyebrow="Biography"
        title={
          <h1>
            Engineering web applications<br />
            <span>with intention and clarity.</span>
          </h1>
        }
        description="I’m Gaurav Rajput, a Computer Science and Engineering student at Quantum University. I focus on building practical web software—connecting thoughtful, responsive user interfaces with robust backend APIs, databases, and applied AI integrations."
      />

      {/* 01 / Engineering Philosophy & Background */}
      <ScrollSplitSection
        aria-label="Engineering approach and background"
        left={
          <div>
            <div className="section-label">
              <Compass size={20} className="section-icon" aria-hidden="true" />
              <p className="eyebrow">01 / Engineering Approach</p>
            </div>
            <h2>
              How I think about<br />
              <span>building software.</span>
            </h2>
            <p className="lede">
              Bridging rigorous computer science fundamentals with hands-on web development, practical AI workflows, and clean code principles.
            </p>
          </div>
        }
        right={
          <div className="prose flex flex-col gap-5">
            <div className="focus-block">
              <div className="focus-title">
                <Code size={18} aria-hidden="true" />
                <h3>Full-Stack Mindset</h3>
              </div>
              <p className="text-muted leading-relaxed text-sm">
                I believe great web applications require balance across the entire stack. An intuitive, accessible frontend is only as reliable as the RESTful APIs, data validation schemas, and database transactions backing it.
              </p>
            </div>

            <div className="focus-block">
              <div className="focus-title">
                <Brain size={18} aria-hidden="true" />
                <h3>Applied AI &amp; Pragmatism</h3>
              </div>
              <p className="text-muted leading-relaxed text-sm">
                Rather than treating AI as a gimmick, I integrate models like Groq and Gemini as functional components in real pipelines—such as document parsing in the Resume Analyzer or planned code diagnostic sandboxes in DevPilot.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-line bg-surface-2/60 flex items-center justify-between">
              <div>
                <span className="font-semibold text-white text-sm block">Academic Credentials</span>
                <span className="text-xs text-muted font-mono">B.Tech CSE · Quantum University · CGPA 8.2</span>
              </div>
              <Link to="/education" className="button text-xs py-2 px-3">
                <span>View Full Education</span>
                <ArrowUpRight size={13} aria-hidden="true" className="btn-arrow" />
              </Link>
            </div>
          </div>
        }
      />

      {/* 02 / Focus Areas & Technical Strengths */}
      <ScrollSplitSection
        aria-label="Technical strengths and development areas"
        left={
          <div>
            <div className="section-label">
              <Code size={20} className="section-icon" aria-hidden="true" />
              <p className="eyebrow">02 / Focus Areas</p>
            </div>
            <h2>
              Strengths &amp;<br />
              <span>current learning.</span>
            </h2>
            <p className="lede">
              Balancing proven engineering fundamentals with active exploration of emerging tools and distributed patterns.
            </p>
          </div>
        }
        right={
          <div className="prose flex flex-col gap-6">
            <div className="focus-block">
              <div className="focus-title">
                <Brain size={18} aria-hidden="true" />
                <h3>Technical Strengths</h3>
              </div>
              <ul>
                <li>
                  <strong>Frontend Architecture:</strong> Component design in React and Next.js, accessible markup, responsive CSS, and state management.
                </li>
                <li>
                  <strong>Backend &amp; APIs:</strong> RESTful API design using Node.js and Express, route validation, and authentication workflows.
                </li>
                <li>
                  <strong>Database &amp; Data Modeling:</strong> Schema definition in MongoDB with Mongoose, SQL queries, and handling data integrity.
                </li>
                <li>
                  <strong>Practical AI Workflows:</strong> Utilizing Groq and Gemini APIs with prompt engineering for document analysis and structured data extraction.
                </li>
              </ul>
            </div>

            <div className="focus-block">
              <div className="focus-title">
                <Compass size={18} aria-hidden="true" />
                <h3>Areas I am Actively Developing</h3>
              </div>
              <ul>
                <li>
                  <strong>System Design &amp; Scalability:</strong> Deepening my knowledge of distributed patterns, caching strategies, and API rate limiting.
                </li>
                <li>
                  <strong>Code Sandbox Isolation:</strong> Designing containerized or isolated execution runtimes for multi-language code in DevPilot.
                </li>
                <li>
                  <strong>Testing &amp; CI/CD:</strong> Establishing automated integration pipelines, end-to-end testing, and deployment hygiene.
                </li>
              </ul>
            </div>
          </div>
        }
      />

      {/* 03 / Milestones — Scroll-Driven Timeline */}
      <section
        ref={milestonesRef}
        className="section journey-section relative py-20 border-t border-line/60"
        aria-label="Engineering journey and milestones"
      >
        <m.div
          style={{
            y: reduceMotion ? 0 : milestoneHeadY,
            opacity: reduceMotion ? 1 : milestoneHeadOpacity,
          }}
          className="section-head mb-8 transform-gpu"
        >
          <div>
            <p className="eyebrow">03 / Milestones</p>
            <h2>
              Step by step,<br />
              <span>with intention.</span>
            </h2>
          </div>
        </m.div>

        <ScrollTimeline items={journeyItems} />
      </section>

      {/* 04 / Capabilities — Technical Skills */}
      <Skills />

      {/* 05 / Navigation Links */}
      <section
        ref={linksRef}
        className="section about-links relative py-16 border-t border-line/60"
        aria-label="Next steps and links"
      >
        <m.div
          style={{
            y: reduceMotion ? 0 : linksY,
            opacity: reduceMotion ? 1 : linksOpacity,
          }}
          className="about-links-wrapper transform-gpu"
        >
          <Link className="button primary cta-button" to="/projects">
            <span>View Projects</span>
            <ArrowUpRight size={16} aria-hidden="true" className="btn-arrow" />
          </Link>
          <Link className="button cta-button" to="/education">
            <span>Education</span>
            <ArrowUpRight size={16} aria-hidden="true" className="btn-arrow" />
          </Link>
          <Link className="button cta-button" to="/experience">
            <span>Experience</span>
            <ArrowUpRight size={16} aria-hidden="true" className="btn-arrow" />
          </Link>
          <Link className="button cta-button" to="/resume">
            <span>Resume</span>
            <ArrowUpRight size={16} aria-hidden="true" className="btn-arrow" />
          </Link>
          <ExternalLink className="button" href={GITHUB_URL}>
            GitHub
          </ExternalLink>
          <ExternalLink className="button" href={LINKEDIN_URL}>
            LinkedIn
          </ExternalLink>
        </m.div>
      </section>
    </main>
  )
}
