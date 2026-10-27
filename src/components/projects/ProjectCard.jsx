import { ArrowUpRight, Sparkles, FolderGit2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import ProjectVisual from './ProjectVisual.jsx'
import ExternalLink from '../common/ExternalLink.jsx'
import { projectPath } from '../../utils/helpers.js'

export default function ProjectCard({ project, index, className = '' }) {
  const path = projectPath(project.slug)
  const indexFormatted = String(index + 1).padStart(2, '0')
  const isFlagship = project.slug === 'devpilot'

  return (
    <article
      className={`project-card p${index} ${isFlagship ? 'flagship-card border-violet/30 bg-gradient-to-br from-[#141226]/95 via-[#0e0d1c]/95 to-[#080810]' : ''} ${className}`}
    >
      <Link
        to={path}
        className="card-visual-wrapper block"
        aria-label={`View ${project.name} case study`}
      >
        <div className="card-top-bar">
          <div className="flex items-center gap-2">
            <span className="card-index">{indexFormatted}</span>
            {isFlagship && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-violet/15 border border-violet/30 text-[10px] font-mono text-violet font-semibold">
                <Sparkles size={11} aria-hidden="true" />
                Flagship
              </span>
            )}
          </div>
          <span className={`status ${project.status}`}>
            {project.status === 'in-development' ? 'In Development' : 'Live Project'}
          </span>
        </div>
        <ProjectVisual project={project} />
      </Link>

      <div className="project-info">
        <div className="project-header">
          <h3>
            <Link to={path} className="project-title-link">
              <span>{project.name}</span>
            </Link>
          </h3>
          <p>{project.tagline}</p>
        </div>

        <div className="stack" aria-label="Technologies used">
          {project.stack.map((item) => (
            <span key={item} className="stack-badge">
              {item}
            </span>
          ))}
        </div>

        <div className="card-actions">
          <Link to={path} className="button primary case-link">
            <span>Case Study</span>
            <ArrowUpRight size={15} aria-hidden="true" className="link-arrow" />
          </Link>
          {project.live && (
            <ExternalLink href={project.live} className="button card-ext">
              <span>Live Demo</span>
            </ExternalLink>
          )}
          {project.repo && (
            <ExternalLink href={project.repo} className="button card-ext">
              <FolderGit2 size={13} aria-hidden="true" />
              <span>Source</span>
            </ExternalLink>
          )}
        </div>
      </div>
    </article>
  )
}
