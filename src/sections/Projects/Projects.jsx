import { useState } from 'react'
import FeaturedProject from '../../components/ui/FeaturedProject/FeaturedProject'
import ProjectCard from '../../components/ui/ProjectCard/ProjectCard'
import VideoCard from '../../components/ui/VideoCard/VideoCard'
import ComponentsShowcase from '../../features/showcase/ComponentsShowcase'
import { FEATURED_PROJECTS, PROJECTS, SHOWCASE_PROJECT_ID, VIDEOS } from '../../data/projects'
import './Projects.css'

const Projects = () => {
  const [isShowcaseOpen, setIsShowcaseOpen] = useState(false)

  const toggleShowcase = () => setIsShowcaseOpen((open) => !open)

  return (
    <section id="projects" className="projectsSection">
      <h2>Proyectos</h2>

      <div className="featuredList">
        {FEATURED_PROJECTS.map(({ id, ...project }, index) => (
          <FeaturedProject key={id} {...project} reversed={index % 2 === 1} />
        ))}
      </div>

      <h3 className="projectsSubtitle">Más proyectos</h3>

      <div className="projectsGrid">
        {PROJECTS.map(({ id, ...project }) => {
          const isShowcase = id === SHOWCASE_PROJECT_ID

          return (
            <ProjectCard
              key={id}
              {...project}
              onClick={isShowcase ? toggleShowcase : undefined}
              expanded={isShowcase ? isShowcaseOpen : undefined}
            />
          )
        })}
      </div>

      {isShowcaseOpen && (
        <div className="componentsPanel">
          <ComponentsShowcase />
        </div>
      )}

      <div className="videosGrid">
        {VIDEOS.map(({ id, ...video }) => (
          <VideoCard key={id} {...video} />
        ))}
      </div>
    </section>
  )
}

export default Projects
