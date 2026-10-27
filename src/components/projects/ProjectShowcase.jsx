import { useRef, useMemo, useState } from 'react'
import { m, useTransform } from 'motion/react'
import { projectCategories, projects } from '../../data/projects.js'
import ProjectFilters from './ProjectFilters.jsx'
import ProjectGrid from './ProjectGrid.jsx'
import { useScrollProgress } from '../../hooks/useScrollProgress.js'

export default function ProjectShowcase() {
  const sectionRef = useRef(null)
  const [filter, setFilter] = useState('all')
  const [query, setQuery] = useState('')

  const { scrollYProgress, reduceMotion } = useScrollProgress(sectionRef, {
    offset: ['start start', 'end start'],
  })

  // Subtle header recession as user explores catalog
  const headerY = useTransform(scrollYProgress, [0, 0.8], [0, -20])
  const headerOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0.4])

  const shownProjects = useMemo(() => {
    const q = query.trim().toLowerCase()
    return projects.filter((project) => {
      const matchesCategory = filter === 'all' || project.category === filter
      const matchesQuery =
        !q ||
        project.name.toLowerCase().includes(q) ||
        project.tagline.toLowerCase().includes(q) ||
        project.stack.some((tech) => tech.toLowerCase().includes(q))
      return matchesCategory && matchesQuery
    })
  }, [filter, query])

  const clearFilters = () => {
    setFilter('all')
    setQuery('')
  }

  return (
    <section
      ref={sectionRef}
      className="section projects-showcase relative py-12"
      id="projects"
      aria-label="Projects showcase"
    >
      {/* Section Head with Scroll-Linked Recession */}
      <m.div
        style={{
          y: reduceMotion ? 0 : headerY,
          opacity: reduceMotion ? 1 : headerOpacity,
        }}
        className="section-head mb-8 transform-gpu"
      >
        <div>
          <p className="eyebrow">01 / Portfolio Catalog</p>
          <h1>
            Projects built for<br />
            <span>practical learning.</span>
          </h1>
          <p className="lede">
            Each project represents an exploration of real architecture—from API contracts
            and schema modeling to responsive UI engineering and external service integration.
          </p>
        </div>
      </m.div>

      <div className="mb-8">
        <ProjectFilters
          categories={projectCategories}
          filter={filter}
          query={query}
          onFilterChange={setFilter}
          onQueryChange={setQuery}
        />
      </div>

      <p className="sr-only" aria-live="polite">
        {shownProjects.length} projects displayed
      </p>

      {shownProjects.length > 0 ? (
        <ProjectGrid
          projects={shownProjects}
        />
      ) : (
        <div className="empty-projects">
          <p>No projects match your current search or filter criteria.</p>
          <button className="button primary" onClick={clearFilters}>
            Clear all filters
          </button>
        </div>
      )}
    </section>
  )
}
