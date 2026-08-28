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
    description: 'Gestión de incidencias en una sala de alarmas 24/7 mediante una aplicación web interna basada en JavaScript y Node.js. Comunicación directa con el equipo técnico para reportar errores y proponer mejoras de usabilidad desde la experiencia diaria como usuario avanzado.',
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
        Vengo de un perfil poco típico: empecé en fotografía y modelado 3D, y mi formación en desarrollo Salesforce con Deloitte, junto con el uso diario de software crítico en Prosegur, me llevó a especializarme en desarrollo web Full-Stack en Socratech. Me interesa crear aplicaciones web claras y mantenibles, combinando interfaces cuidadas, APIs REST y una base sólida de frontend y backend.
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