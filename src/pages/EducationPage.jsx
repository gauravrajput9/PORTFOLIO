import { useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  GraduationCap,
  Award,
  BookOpen,
  ArrowUpRight,
  Binary,
  Layers,
  Network,
  Database,
  Cpu,
} from 'lucide-react'
import { m, useTransform } from 'motion/react'
import ScrollPageHeader from '../components/animation/ScrollPageHeader.jsx'
import ScrollSplitSection from '../components/animation/ScrollSplitSection.jsx'
import { useScrollProgress } from '../hooks/useScrollProgress.js'
import { useDocumentTitle } from '../hooks/useDocumentTitle.js'

export default function EducationPage() {
  useDocumentTitle('Education — Gaurav Rajput')

  const coursework = [
    {
      title: 'Data Structures & Algorithms',
      icon: Binary,
      description:
        'Asymptotic complexity, linear & non-linear structures, binary trees, heaps, graph traversals, and dynamic programming in C++.',
    },
    {
      title: 'Database Management Systems',
      icon: Database,
      description:
        'Relational schema design, normalization, ACID properties, transaction concurrency, SQL indexing, and NoSQL modeling with MongoDB.',
    },
    {
      title: 'Operating Systems & Concurrency',
      icon: Cpu,
      description:
        'Process management, multi-threading, virtual memory, page replacement algorithms, synchronization primitives, and deadlocks.',
    },
    {
      title: 'Computer Networks',
      icon: Network,
      description:
        'OSI and TCP/IP stack, transport layer protocols (TCP/UDP), routing algorithms, HTTP/HTTPS client-server architectures, and sockets.',
    },
    {
      title: 'Object-Oriented Programming',
      icon: Layers,
      description:
        'Encapsulation, inheritance, polymorphism, abstraction, modular class hierarchies, and SOLID design principles in C++ and JavaScript.',
    },
    {
      title: 'Web Engineering & Architecture',
      icon: BookOpen,
      description:
        'RESTful API contracts, client-side rendering with React/Next.js, authentication protocols, and distributed service communication.',
    },
  ]

  // Curriculum section scroll progress
  const curriculumRef = useRef(null)
  const { scrollYProgress: curriculumProgress, reduceMotion } = useScrollProgress(curriculumRef, {
    offset: ['start 0.85', 'start 0.25'],
  })
  const curriculumHeadY = useTransform(curriculumProgress, [0, 0.75], [26, 0])
  const curriculumHeadOpacity = useTransform(curriculumProgress, [0, 0.65], [0.35, 1])

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
        eyebrow="Academic Background"
        title={
          <h1>
            Foundational computer science<br />
            <span>and academic rigor.</span>
          </h1>
        }
        description="Pursuing a Bachelor of Technology in Computer Science & Engineering at Quantum University. Balancing structured engineering fundamentals with hands-on software development and systems engineering."
      />

      {/* 01 / Degree Program */}
      <ScrollSplitSection
        aria-label="Degree overview"
        left={
          <div>
            <div className="section-label">
              <GraduationCap size={20} className="section-icon" aria-hidden="true" />
              <p className="eyebrow">01 / Degree Program</p>
            </div>
            <h2>
              Bachelor of Technology<br />
              <span>in Computer Science.</span>
            </h2>
            <p className="lede">
              Undergraduate program emphasizing analytical problem-solving, software engineering, and applied computer systems.
            </p>
          </div>
        }
        right={
          <div className="prose">
            <div className="academic-card featured-degree-card">
              <div className="card-top">
                <div>
                  <span className="degree-tag">Undergraduate Degree</span>
                  <h3>B.Tech in Computer Science &amp; Engineering</h3>
                </div>
                <span className="badge">Quantum University</span>
              </div>

              <div className="academic-stat-row">
                <div className="stat-pill">
                  <span className="stat-label">Current Standing</span>
                  <strong className="stat-value highlight-stat">8.2 / 10 CGPA</strong>
                </div>
                <div className="stat-pill">
                  <span className="stat-label">Program</span>
                  <span className="stat-value">Undergraduate study</span>
                </div>
              </div>

              <p className="academic-desc">
                A computer science education paired with hands-on work in web interfaces, backend APIs, data modeling,
                and applied AI integrations.
              </p>
            </div>

            {/* Schooling Milestones */}
            <div className="schooling-section">
              <h4 className="sub-heading">Secondary &amp; Senior Secondary Education</h4>
              <div className="facts-grid">
                <div className="fact-item">
                  <Award size={18} className="fact-icon" aria-hidden="true" />
                  <div>
                    <b>84.05%</b>
                    <span>Class X · Krist Jayanti School</span>
                  </div>
                </div>
                <div className="fact-item">
                  <Award size={18} className="fact-icon" aria-hidden="true" />
                  <div>
                    <b>79.2%</b>
                    <span>Class XII · Senior Secondary (PCM)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
      />

      {/* 02 / Coursework Highlights — Scroll-Driven Dossier Grid */}
      <section
        ref={curriculumRef}
        className="section relative py-20 border-t border-line/60"
        aria-label="Core coursework"
      >
        <m.div
          style={{
            y: reduceMotion ? 0 : curriculumHeadY,
            opacity: reduceMotion ? 1 : curriculumHeadOpacity,
          }}
          className="section-head mb-10 transform-gpu"
        >
          <div>
            <p className="eyebrow">02 / Curriculum Highlights</p>
            <h2>
              Core coursework &amp;<br />
              <span>theoretical foundations.</span>
            </h2>
          </div>
        </m.div>

        <div className="coursework-grid">
          {coursework.map((course, index) => {
            const Icon = course.icon
            return (
              <CourseworkCard
                key={course.title}
                course={course}
                Icon={Icon}
                index={index}
                scrollYProgress={curriculumProgress}
                reduceMotion={reduceMotion}
              />
            )
          })}
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
          <Link className="button primary cta-button" to="/experience">
            <span>View Practical Experience</span>
            <ArrowUpRight size={16} aria-hidden="true" className="btn-arrow" />
          </Link>
          <Link className="button cta-button" to="/projects">
            <span>Explore Projects</span>
            <ArrowUpRight size={16} aria-hidden="true" className="btn-arrow" />
          </Link>
          <Link className="button cta-button" to="/resume">
            <span>Review Resume</span>
            <ArrowUpRight size={16} aria-hidden="true" className="btn-arrow" />
          </Link>
        </m.div>
      </section>
    </main>
  )
}

function CourseworkCard({ course, Icon, index, scrollYProgress, reduceMotion }) {
  // Stagger entry based on row/column
  const start = 0.05 + (index * 0.08)
  const end = Math.min(0.95, start + 0.45)

  const y = useTransform(scrollYProgress, [start, end], [32, 0])
  const opacity = useTransform(scrollYProgress, [start, end], [0.35, 1])
  const scale = useTransform(scrollYProgress, [start, end], [0.97, 1])

  return (
    <m.div
      style={{
        y: reduceMotion ? 0 : y,
        opacity: reduceMotion ? 1 : opacity,
        scale: reduceMotion ? 1 : scale,
      }}
      className="course-card transform-gpu"
    >
      <div className="course-header">
        <Icon size={18} className="course-icon" aria-hidden="true" />
        <h3>{course.title}</h3>
      </div>
      <p>{course.description}</p>
    </m.div>
  )
}
