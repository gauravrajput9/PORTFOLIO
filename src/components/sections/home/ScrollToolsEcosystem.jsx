import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Code2, Server, Database, Sparkles } from 'lucide-react'
import { m, useTransform } from 'motion/react'
import { useScrollProgress } from '../../../hooks/useScrollProgress.js'

/**
 * ScrollToolsEcosystem
 *
 * Dedicated, independent "04 / Tools & Ecosystem" section:
 * - Clear layout boundary in normal document flow.
 * - Categorized engineering toolkit cards that settle completely within this section.
 * - Sits strictly before the Contact section without visual overlap or layout merging.
 */
export default function ScrollToolsEcosystem() {
  const sectionRef = useRef(null)

  const { scrollYProgress, reduceMotion } = useScrollProgress(sectionRef, {
    offset: ['start 0.85', 'start 0.25'],
  })

  // Header and grid transforms: settle smoothly into position
  const headerY = useTransform(scrollYProgress, [0, 0.75], [28, 0])
  const headerOpacity = useTransform(scrollYProgress, [0, 0.65], [0.3, 1])
  const gridY = useTransform(scrollYProgress, [0.05, 0.9], [36, 0])
  const gridOpacity = useTransform(scrollYProgress, [0.05, 0.8], [0.35, 1])

  const categories = [
    {
      title: 'Frontend Architecture',
      icon: Code2,
      description: 'Modern client interfaces and component systems.',
      skills: ['React 19', 'Next.js', 'Vite', 'Tailwind CSS', 'JavaScript'],
    },
    {
      title: 'Backend & Protocols',
      icon: Server,
      description: 'Resilient APIs, auth pipelines, and network contracts.',
      skills: ['Node.js', 'Express.js', 'REST APIs', 'JWT Auth', 'RFC Protocols'],
    },
    {
      title: 'Data & Persistence',
      icon: Database,
      description: 'Schema modeling, ACID consistency, and distributed storage.',
      skills: ['MongoDB', 'Mongoose', 'SQL', 'Schema Design', 'Data Caching'],
    },
    {
      title: 'AI & Developer Tooling',
      icon: Sparkles,
      description: 'Applied LLM integrations and containerized workflows.',
      skills: ['Groq Llama 3', 'Gemini API', 'Git & GitHub', 'Docker', 'Postman'],
    },
  ]

  return (
    <section
      ref={sectionRef}
      className="section home-tools relative py-20 border-t border-line/60"
      id="tools"
      aria-label="Tools and ecosystem"
    >
      <div className="w-full relative">
        {/* Section Head */}
        <m.div
          style={{
            y: reduceMotion ? 0 : headerY,
            opacity: reduceMotion ? 1 : headerOpacity,
          }}
          className="section-head compact-head mb-10"
        >
          <div>
            <p className="eyebrow">04 / Tools &amp; Ecosystem</p>
            <h2>
              Engineering toolkit &amp;<br />
              <span>modern developer ecosystem.</span>
            </h2>
          </div>
          <div>
            <Link className="text-link editorial-all-link" to="/skills">
              <span>View complete skills matrix</span>
              <ArrowUpRight size={15} aria-hidden="true" className="link-arrow" />
            </Link>
          </div>
        </m.div>

        {/* Categorized Competency Grid */}
        <m.div
          style={{
            y: reduceMotion ? 0 : gridY,
            opacity: reduceMotion ? 1 : gridOpacity,
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 transform-gpu"
        >
          {categories.map((cat) => {
            const Icon = cat.icon
            return (
              <div
                key={cat.title}
                className="p-6 rounded-2xl border border-line bg-surface/60 hover:bg-surface-hover hover:border-violet/40 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-violet/10 border border-violet/20 flex items-center justify-center text-violet mb-4">
                    <Icon size={20} aria-hidden="true" />
                  </div>
                  <h3 className="font-display font-semibold text-lg text-text mb-2">
                    {cat.title}
                  </h3>
                  <p className="text-muted text-xs mb-4 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 mt-2">
                  {cat.skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-block px-2.5 py-1 rounded-md text-[11px] font-mono border border-line bg-surface-2 text-text"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </m.div>
      </div>
    </section>
  )
}

