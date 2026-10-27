import ProjectShowcase from '../components/projects/ProjectShowcase.jsx'
import { useDocumentTitle } from '../hooks/useDocumentTitle.js'

export default function ProjectsPage() {
  useDocumentTitle('Projects — Gaurav Rajput')

  return (
    <main id="main">
      <ProjectShowcase />
    </main>
  )
}
