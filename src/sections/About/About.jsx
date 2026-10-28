import { MILESTONES } from '../../data/experience'
import './About.css'

const About = () => {
  return (
    <section id="about" className="about">
      <h2>Sobre mí</h2>
      <p className="aboutIntro">
        Vengo de un perfil poco típico: empecé en fotografía y modelado 3D, y mi formación en desarrollo con Deloitte, junto con el uso diario de software crítico en Prosegur, me llevó a especializarme en desarrollo web Full-Stack en Socratech. Me interesa crear aplicaciones web claras y mantenibles, combinando interfaces cuidadas, APIs REST y una base sólida de frontend y backend.
      </p>

      <ol className="timeline">
        {MILESTONES.map(({ period, title, description, link }) => (
          <li key={title} className="timelineItem">
            <span className="timelinePeriod">{period}</span>
            <h3>{title}</h3>
            <p>{description}</p>
            {link && (
              <a href={link.href} target="_blank" rel="noopener noreferrer" className="timelineLink">
                {link.label} →
              </a>
            )}
          </li>
        ))}
      </ol>

      <p className="aboutOutro">
        Ahora quiero dar el salto a un equipo de desarrollo donde pueda
        seguir aprendiendo y aportar desde el primer día.
      </p>
    </section>
  )
}

export default About
