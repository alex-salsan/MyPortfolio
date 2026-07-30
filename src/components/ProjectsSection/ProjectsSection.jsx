import { useState } from 'react'
import ProjectCard from '../ProjectCard/ProjectCard'
import ComponentsShowcase from '../ComponentsShowcase/ComponentsShowcase'
import processIcon from '../../assets/process.png'
import VideoCard from '../VideoCard/VideoCard'
import './ProjectsSection.css'

const ProjectsSection = () => {
  const [showComponents, setShowComponents] = useState(false)

  return (
    <section id='projects' className='projectsSection'>
      <h2 className='h2PS'>Proyectos</h2>
      <div className='projectsGrid'>
        <ProjectCard
          title='Web para Jesús S. C.'
          description='Aplicación web real de front-end completa, desarrollado desde 
          cero y basándose en las necesidades del cliente.'
          tags={['React', 'CSS', 'JavaScript']}
          link='https://dibujoastronomico-jesussalado.vercel.app'
        />
        <ProjectCard
          title='App de Back'
          description='API en desarrollo con Node y Express.'
          tags={['Node', 'Express']}
          status={
            <>
              <img src={processIcon} alt='En proceso' className='iconSmall iconContact' />
              En proceso
            </>
          }
        />
        <ProjectCard
          title='Componentes reutilizables'
          description='Colección de componentes React listos para usar en cualquier proyecto.'
          tags={['React', 'CSS']}
          status={
            <>
              <h4>Púlsame</h4>
            </>
          }
          onClick={() => {
            setShowComponents(!showComponents)}
          }
        />
      </div>

      {showComponents && (
        <div className='componentsPanel'>
          <ComponentsShowcase />
        </div>
      )}

      <div className='videosGrid'>
        <VideoCard
          title='Proyecto mitad de Bootcamp - Reseñalia'
          videoId='0vXX5By0ZCE'
          description='Demo de una app web con React y consumo de API externa para explorar y gestionar reseñas de libros. En el vídeo muestro el funcionamiento general del proyecto y mi aportación al desarrollo de la interfaz y la experiencia de usuario.'
        />
        <VideoCard
          title='Proyecto final de Bootcamp - JoveJobs'
          videoId='O2lLzLl9yKM'
          start={1045}
          description='Proyecto grupal final del bootcamp, centrado en una plataforma web con funcionalidades completas y trabajo colaborativo entre front y back. En el vídeo explico la arquitectura del proyecto, la gestión del estado y las decisiones técnicas principales.
          * Intervengo en la presentación alrededor del minuto 03:44 y 17:25 *'
        />
      </div>
    </section>
  )
}

export default ProjectsSection