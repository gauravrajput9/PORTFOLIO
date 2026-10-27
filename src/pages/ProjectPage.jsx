import { useParams } from 'react-router-dom'
import CaseStudy from '../components/projects/CaseStudy.jsx'
import { findProject } from '../data/projects.js'
import { useDocumentTitle } from '../hooks/useDocumentTitle.js'
import NotFoundPage from './NotFoundPage.jsx'

export default function ProjectPage() {
  const { slug } = useParams()
  const project = findProject(slug)

  useDocumentTitle(
    project
      ? `${project.name} — Gaurav Rajput`
      : 'Project not found — Gaurav Rajput'
  )

  if (!project) {
    return <NotFoundPage />
  }

  return <CaseStudy project={project} />
}

export { ProjectPage as ProjectDetailPage }
