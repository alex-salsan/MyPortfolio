import { CONTACT_LINKS } from '../../data/contact'
import './Contact.css'

const Contact = () => {
  return (
    <section id="contact" className="contactSection">
      <h2>Contacto</h2>
      <p>¿Tienes un proyecto en mente o buscas incorporar a alguien al equipo? Hablemos.</p>
      <ul className="contactLinks">
        {CONTACT_LINKS.map(({ label, href, icon, external }) => (
          <li key={href}>
            <a
              href={href}
              {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
            >
              <img src={icon} alt="" className="iconSmall iconInline" />
              {label}
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Contact
