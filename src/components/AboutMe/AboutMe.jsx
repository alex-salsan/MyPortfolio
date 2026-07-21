import './AboutMe.css'

const milestones = [
  {
    year: '2026',
    title: 'Bootcamp Full-Stack',
    description: 'Formación intensiva para consolidar React, Node y buenas prácticas de desarrollo.',
  },
  {
    year: '2024 - 2026',
    title: 'Operador de sala y soporte de una app en Prosegur',
    description: 'Operador de sala y apoyo en el desarrollo de una app de gestión de alarmas con JavaScript y Node.',
  },
  {
    year: '2023',
    title: 'Desarrollador Salesforce en Deloitte',
    description: 'Certificado de Profesionalidad como Desarrollador Salesforce, mi primer contacto real con el código.',
  },
  {
    year: '2015 - 2021',
    title: 'Fotografía y modelado 3D',
    description: 'Empecé editando fotos y creando en 3D, desarrollando mi ojo para el detalle y la estética.',
  },
]

const AboutMe = () => {
  return (
    <section id="about" className="about">
      <h2>Sobre mí</h2>
      <p className="aboutIntro">
        Vengo de un camino poco típico: empecé en modelado 3D y fotografía,
        y terminé enamorándome de resolver problemas con código.
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