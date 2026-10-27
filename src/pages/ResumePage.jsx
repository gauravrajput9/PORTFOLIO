import { useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  Download,
  ExternalLink as ExtIcon,
  ArrowLeft,
  Mail,
  GraduationCap,
  Briefcase,
  Code2,
  CheckCircle2,
  FolderGit2,
} from 'lucide-react'
import { m, useTransform } from 'motion/react'
import ExternalLink from '../components/common/ExternalLink.jsx'
import ScrollPageHeader from '../components/animation/ScrollPageHeader.jsx'
import { useScrollProgress } from '../hooks/useScrollProgress.js'
import { useDocumentTitle } from '../hooks/useDocumentTitle.js'
import { CONTACT_EMAIL, GITHUB_URL, LINKEDIN_URL, RESUME_URL } from '../utils/constants.js'

export default function ResumePage() {
  useDocumentTitle('Resume — Gaurav Rajput')

  // Document preview section scroll progress
  const docSectionRef = useRef(null)
  const { scrollYProgress: docProgress, reduceMotion } = useScrollProgress(docSectionRef, {
    offset: ['start 0.85', 'start 0.2'],
  })

  // Smooth dossier presentation entrance
  const docY = useTransform(docProgress, [0, 0.85], [32, 0])
  const docScale = useTransform(docProgress, [0, 0.85], [0.97, 1])
  const docOpacity = useTransform(docProgress, [0, 0.75], [0.35, 1])

  // Bottom CTA scroll progress
  const linksRef = useRef(null)
  const { scrollYProgress: linksProgress } = useScrollProgress(linksRef, {
    offset: ['start 0.9', 'start 0.4'],
  })
  const linksY = useTransform(linksProgress, [0, 0.8], [24, 0])
  const linksOpacity = useTransform(linksProgress, [0, 0.7], [0.35, 1])

  return (
    <main id="main" className="resume-page-main">
      {/* 00 / Intro with cinematic scroll recession */}
      <ScrollPageHeader
        eyebrow="Curriculum Vitae"
        title={
          <h1>
            Engineering credentials<br />
            <span>and academic summary.</span>
          </h1>
        }
        description="A comprehensive overview of academic qualifications, technical capabilities, verified milestones, and software projects."
      >
        {/* Action Controls Bar */}
        <div className="resume-actions-bar mt-6">
          <div className="action-buttons-group">
            <a
              href={RESUME_URL}
              download="Gaurav_Rajput_Resume.pdf"
              className="button resume-action-btn primary"
              aria-label="Download Gaurav Rajput Resume PDF"
            >
              <Download size={16} aria-hidden="true" />
              <span>Download Resume (PDF)</span>
            </a>

            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="button resume-action-btn"
              aria-label="Open Resume PDF in new tab"
            >
              <ExtIcon size={16} aria-hidden="true" />
              <span>View PDF</span>
            </a>

            <Link to="/projects" className="button resume-action-btn">
              <ArrowLeft size={16} aria-hidden="true" />
              <span>Back to Projects</span>
            </Link>

            <Link to="/contact" className="button resume-action-btn">
              <Mail size={16} aria-hidden="true" />
              <span>Contact Gaurav</span>
            </Link>
          </div>
        </div>
      </ScrollPageHeader>

      {/* 01 / A4 Document Preview Frame — Scroll-Driven Dossier Entrance */}
      <section
        ref={docSectionRef}
        className="section resume-document-section relative py-12 border-t border-line/60"
        aria-label="A4 Resume Document Preview"
      >
        <m.div
          style={{
            y: reduceMotion ? 0 : docY,
            scale: reduceMotion ? 1 : docScale,
            opacity: reduceMotion ? 1 : docOpacity,
          }}
          className="a4-document-wrapper transform-gpu"
        >
          <div className="a4-document-frame" role="article" aria-label="Resume of Gaurav Rajput">
            {/* Document Header */}
            <header className="doc-header">
              <div className="doc-name-block">
                <h2 className="doc-name">GAURAV RAJPUT</h2>
                <p className="doc-title">Full-Stack Software Developer · Computer Science Undergraduate</p>
              </div>

              <div className="doc-contact-meta">
                <div className="doc-meta-item">
                  <Mail size={13} aria-hidden="true" />
                  <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
                </div>
                <div className="doc-meta-item">
                  <GraduationCap size={13} aria-hidden="true" />
                  <span>Quantum University</span>
                </div>
                <div className="doc-meta-item">
                  <ExtIcon size={13} aria-hidden="true" />
                  <ExternalLink href={GITHUB_URL}>github.com/gauravrajput9</ExternalLink>
                </div>
                <div className="doc-meta-item">
                  <ExtIcon size={13} aria-hidden="true" />
                  <ExternalLink href={LINKEDIN_URL}>linkedin.com/in/gaurav-rajput</ExternalLink>
                </div>
              </div>
            </header>

            <div className="doc-divider" />

            {/* Professional Summary */}
            <section className="doc-section">
              <h3 className="doc-heading">
                <Briefcase size={14} className="doc-heading-icon" aria-hidden="true" />
                <span>PROFESSIONAL SUMMARY</span>
              </h3>
              <p className="doc-text">
                Computer Science and Engineering student at Quantum University with an <strong>8.2 / 10 CGPA</strong> and
                practical experience engineering full-stack web applications, REST APIs, and applied AI systems.
                Demonstrated ability to solve rigorous backend protocols and cryptographic security challenges (HENNGE Global Internship Mission 3).
                Passionate about building performant, accessible web systems with clean architecture.
              </p>
            </section>

            {/* Education */}
            <section className="doc-section">
              <h3 className="doc-heading">
                <GraduationCap size={14} className="doc-heading-icon" aria-hidden="true" />
                <span>EDUCATION</span>
              </h3>

              <div className="doc-entry">
                <div className="doc-entry-header">
                  <strong>Bachelor of Technology in Computer Science &amp; Engineering</strong>
                  <span className="doc-date">Current study</span>
                </div>
                <div className="doc-entry-sub">
                  <span>Quantum University</span>
                  <strong className="doc-accent">CGPA: 8.2 / 10</strong>
                </div>
                <p className="doc-subtext">
                  Core Coursework: Data Structures &amp; Algorithms, Object-Oriented Programming, Database Management Systems,
                  Operating Systems, Computer Networks, Software Engineering.
                </p>
              </div>

              <div className="doc-entry-dual">
                <div className="doc-subentry">
                  <div className="doc-entry-header">
                    <strong>Senior Secondary Examination (Class XII)</strong>
                    <span className="doc-date">Score: 79.2%</span>
                  </div>
                  <span className="doc-subtext">Science &amp; Mathematics Stream</span>
                </div>

                <div className="doc-subentry">
                  <div className="doc-entry-header">
                    <strong>Secondary School Examination (Class X)</strong>
                    <span className="doc-date">Score: 84.05%</span>
                  </div>
                  <span className="doc-subtext">Krist Jayanti School</span>
                </div>
              </div>
            </section>

            {/* Technical Capabilities */}
            <section className="doc-section">
              <h3 className="doc-heading">
                <Code2 size={14} className="doc-heading-icon" aria-hidden="true" />
                <span>TECHNICAL SKILLS</span>
              </h3>

              <div className="doc-skills-table">
                <div className="doc-skill-row">
                  <span className="skill-cat">Languages:</span>
                  <span className="skill-vals">C++, Python, JavaScript (ES6+), TypeScript, SQL, HTML5, CSS3</span>
                </div>
                <div className="doc-skill-row">
                  <span className="skill-cat">Frontend:</span>
                  <span className="skill-vals">React, Next.js, Vite, Tailwind CSS, Responsive Design, State Management</span>
                </div>
                <div className="doc-skill-row">
                  <span className="skill-cat">Backend &amp; DB:</span>
                  <span className="skill-vals">Node.js, Express.js, RESTful APIs, JWT Authentication, MongoDB, Mongoose, SQL</span>
                </div>
                <div className="doc-skill-row">
                  <span className="skill-cat">AI &amp; Tools:</span>
                  <span className="skill-vals">Groq API (Llama 3), Google Gemini API, Git, GitHub, VS Code, Postman, Docker basics</span>
                </div>
              </div>
            </section>

            {/* Selected Projects */}
            <section className="doc-section">
              <h3 className="doc-heading">
                <FolderGit2 size={14} className="doc-heading-icon" aria-hidden="true" />
                <span>SELECTED PROJECTS</span>
              </h3>

              <div className="doc-project-entry">
                <div className="doc-entry-header">
                  <strong>DevPilot — Developer Workflow Platform</strong>
                  <span className="doc-date">In active development</span>
                </div>
                <p className="doc-project-stack">React · Vite · Express · MongoDB · Better Auth</p>
                <ul className="doc-bullet-list">
                  <li>Building a modular coding workspace with categorized problem sets and role-based authentication.</li>
                  <li>Using a Monaco-based in-browser editor with an Express and MongoDB backend.</li>
                </ul>
              </div>

              <div className="doc-project-entry">
                <div className="doc-entry-header">
                  <strong>AI-Powered Resume Analyzer &amp; ATS Scorer</strong>
                  <span className="doc-date">Live Production Build</span>
                </div>
                <p className="doc-project-stack">Next.js · Groq · pdf-parse · Tailwind CSS</p>
                <ul className="doc-bullet-list">
                  <li>Built a PDF parsing and structured role-feedback workflow using Groq inference.</li>
                  <li>Designed the application with privacy-conscious document handling.</li>
                </ul>
              </div>

              <div className="doc-project-entry">
                <div className="doc-entry-header">
                  <strong>Learning Management System (LMS)</strong>
                  <span className="doc-date">Live Production Build</span>
                </div>
                <p className="doc-project-stack">MongoDB · Express.js · React · Node.js (MERN)</p>
                <ul className="doc-bullet-list">
                  <li>Built a full-stack learning platform with course organization, lesson views, and persistent storage.</li>
                  <li>Implemented protected routes and token-based session handling.</li>
                </ul>
              </div>
            </section>

            {/* Milestones */}
            <section className="doc-section">
              <h3 className="doc-heading">
                <CheckCircle2 size={14} className="doc-heading-icon" aria-hidden="true" />
                <span>ACHIEVEMENTS &amp; RECOGNITION</span>
              </h3>

              <div className="doc-entry">
                <div className="doc-entry-header">
                  <strong>HENNGE Global Internship Program — Mission 3 Completed</strong>
                  <span className="doc-date">October 2026</span>
                </div>
                <p className="doc-subtext">
                  Completed the documented technical challenge milestone. This is recorded as a challenge completion,
                  not as an employment or internship offer.
                </p>
              </div>
            </section>

            {/* Document Footer Watermark */}
            <footer className="doc-footer">
              <span>GAURAV RAJPUT · PORTFOLIO SUMMARY</span>
              <span>ACADEMIC &amp; PROJECT RECORD</span>
            </footer>
          </div>
        </m.div>
      </section>

      {/* 02 / Bottom CTAs */}
      <section
        ref={linksRef}
        className="section about-links relative py-16 border-t border-line/60"
        aria-label="Next steps"
      >
        <m.div
          style={{
            y: reduceMotion ? 0 : linksY,
            opacity: reduceMotion ? 1 : linksOpacity,
          }}
          className="about-links-wrapper transform-gpu"
        >
          <Link className="button primary cta-button" to="/projects">
            <span>Explore Projects in Detail</span>
          </Link>
          <Link className="button cta-button" to="/skills">
            <span>Inspect Skills Matrix</span>
          </Link>
          <Link className="button cta-button" to="/contact">
            <span>Contact Gaurav</span>
          </Link>
        </m.div>
      </section>
    </main>
  )
}
