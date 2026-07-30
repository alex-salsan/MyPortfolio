import './AboutMe.css'

const milestones = [
  {
    year: '2026',
    title: 'Bootcamp Full-Stack (Socratech)',
    description: 'Formación intensiva en desarrollo web full-stack, consolidando HTML, CSS, JavaScript, React, Node.js, APIs REST y bases de datos SQL. Trabajé en proyectos en equipo con control de versiones (Git/GitHub) y metodologías Agile/Scrum, enfocándome en escribir código limpio y mantenible.',
  },
  {
    year: '2024 - 2026',
    title: 'Operador de sala en Prosegur',
    description: 'Gestión de sala de alarmas 24/7 usando una aplicación web interna (JavaScript/Node), operando software crítico en tiempo real. El contacto diario con el equipo técnico para reportar incidencias y comentar mejoras de usabilidad fue lo que despertó mi interés por entender y construir el código que hay detrás de estas herramientas.',
  },
  {
    year: '2023',
    title: 'Desarrollador Salesforce en Deloitte',
    description: 'Certificado de Profesionalidad de Nivel 3 como “Desarrollador Salesforce” (IFCD93), donde aprendí Apex, LWC y fundamentos de desarrollo sobre CRM. Fue mi primer acercamiento formal al desarrollo de software y a buenas prácticas de programación en un entorno empresarial.',
  },
  {
    year: '2022',
    title: 'Resort Delfín Verde',
    description: 'Trabajo estacional gestionando incidencias y coordinación de equipo en un entorno de alta rotación, reforzando mi capacidad de comunicación, trabajo en equipo y gestión bajo presión.',
  },
  {
    year: '2015 - 2021',
    title: 'Fotografía y modelado 3D',
    description: 'Reportajes de eventos y edición fotográfica/vídeo, además de trabajos de modelado 3D. Esta etapa me ayudó a desarrollar un fuerte ojo para el detalle, la estética y la composición, habilidades que ahora aplico al diseño de interfaces y experiencia de usuario en proyectos web.',
  },
]

const AboutMe = () => {
  return (
    <section id="about" className="about">
      <h2>Sobre mí</h2>
      <p className="aboutIntro">
        Vengo de un perfil poco típico: empecé en fotografía y modelado 3D, y mi formación en Deloitte junto con el uso diario de software crítico en Prosegur me llevó a especializarme en desarrollo web full-stack. Busco unirme a un equipo donde pueda seguir creciendo en programación y buenas prácticas, aportando atención al detalle, aprendizaje rápido y mentalidad centrada en el usuario.
      </p>

      <div className="timeline">
        {milestones.map(({ year, title, description }) => (
          <div key={title} className="timelineItem">
            <span className="timelineYear">{year}</span>
            <h3>{title}</h3>
            <p>{description}</p>
          </div>
        ))}
      </div>

      <p className="aboutOutro">
        Ahora quiero dar el salto a un equipo de desarrollo donde pueda
        seguir aprendiendo y aportar desde el primer día.
      </p>
    </section>
  )
}

export default AboutMe