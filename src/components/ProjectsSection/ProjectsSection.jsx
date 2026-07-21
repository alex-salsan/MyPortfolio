import { useState } from 'react'
import ProjectCard from '../ProjectCard/ProjectCard'
import ComponentsShowcase from '../ComponentsShowcase/ComponentsShowcase'
import processIcon from '../../assets/process.png'
import './ProjectsSection.css'

const ProjectsSection = () => {
  const [showComponents, setShowComponents] = useState(false)

  return (
    <section id="projects" className="projectsSection">
      <h2 className='h2PS'>Proyectos</h2>
      <div className="projectsGrid">
        <ProjectCard
          title="Web para Jesús S. C."
          description="Aplicación web real de front-end completa, desarrollado desde 
          cero y basándose en las necesidades del cliente."
          tags={['React', 'CSS', 'JavaScript']}
          link="https://youtube.com/tu-video"
        />
        <ProjectCard
          title="App de Back"
          description="API en desarrollo con Node y Express."
          tags={['Node', 'Express']}
          status={
            <>
              <img src={processIcon} alt="En proceso" className="iconSmall iconContact" />
              En proceso
            </>
          }
        />
        <ProjectCard
          title="Componentes reutilizables"
          description="Colección de componentes React listos para usar en cualquier proyecto."
          tags={['React', 'CSS']}
          onClick={() => {
            setShowComponents(!showComponents)}
          }
        />
      </div>

      {showComponents && (
        <div className="componentsPanel">
          <ComponentsShowcase />
        </div>
      )}
    </section>
  )
}

export default ProjectsSection