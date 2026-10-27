import { useRef } from 'react'
import { m, useTransform } from 'motion/react'
import { skillGroups } from '../../data/skills.js'
import { useScrollProgress } from '../../hooks/useScrollProgress.js'

export default function Skills() {
  const sectionRef = useRef(null)

  const { scrollYProgress, reduceMotion } = useScrollProgress(sectionRef, {
    offset: ['start 0.85', 'start 0.25'],
  })

  const headerY = useTransform(scrollYProgress, [0, 0.75], [26, 0])
  const headerOpacity = useTransform(scrollYProgress, [0, 0.65], [0.35, 1])

  const gridY = useTransform(scrollYProgress, [0.05, 0.85], [32, 0])
  const gridOpacity = useTransform(scrollYProgress, [0.05, 0.75], [0.35, 1])

  return (
    <section
      ref={sectionRef}
      className="section skills relative py-20 border-t border-line/60"
      id="skills"
      aria-label="Technical skills toolkit"
    >
      <div className="w-full relative">
        <m.div
          style={{
            y: reduceMotion ? 0 : headerY,
            opacity: reduceMotion ? 1 : headerOpacity,
          }}
          className="section-head mb-8 transform-gpu"
        >
          <div>
            <p className="eyebrow">04 / Capabilities</p>
            <h2>
              A practical,<br />
              <span>full-stack toolkit.</span>
            </h2>
          </div>
        </m.div>

        <m.div
          style={{
            y: reduceMotion ? 0 : gridY,
            opacity: reduceMotion ? 1 : gridOpacity,
          }}
          className="skill-grid transform-gpu"
        >
          {Object.entries(skillGroups).map(([name, items]) => (
            <div key={name} className="skill-group">
              <h3>{name}</h3>
              <div className="skill-tags">
                {items.map((item) => (
                  <span key={item} className="skill-badge">{item}</span>
                ))}
              </div>
            </div>
          ))}
        </m.div>
      </div>
    </section>
  )
}
