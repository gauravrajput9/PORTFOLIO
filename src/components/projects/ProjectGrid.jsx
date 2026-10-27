import ProjectCard from './ProjectCard.jsx'
import { StaggerContainer, StaggerItem } from '../animation/StaggerContainer.jsx'

export default function ProjectGrid({ projects, className = '' }) {
  return (
    <StaggerContainer
      className={`project-grid ${className}`}
      staggerDelay={0.07}
      delayChildren={0.04}
    >
      {projects.map((project, index) => (
        <StaggerItem key={project.slug} distance={20} duration={0.45}>
          <ProjectCard
            project={project}
            index={index}
          />
        </StaggerItem>
      ))}
    </StaggerContainer>
  )
}
