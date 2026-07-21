import './Contact.css'

import linkedinIcon from '../../assets/linkedin.png'
import githubIcon from '../../assets/github.png'
import emailIcon from '../../assets/email.png'

const Contact = () => {
  return (
    <section id="contact" className="contactSection">
      <h2>Contacto</h2>
      <p>¿Tienes un proyecto en mente o buscas incorporar a alguien al equipo? Hablemos.</p>
      <div className="contactLinks">
        <a href="https://www.linkedin.com/in/alejandro-salado/" target="_blank" rel="noreferrer">
          <img src={linkedinIcon} alt="LinkedIn" className="iconSmall iconContact" />
          LinkedIn
        </a>
        <a href="https://github.com/alex-salsan" target="_blank" rel="noreferrer">
          <img src={githubIcon} alt="GitHub" className="iconSmall iconContact" />
          GitHub
        </a>
        <a href="mailto:alex.salsan97@gmail.com">
          <img src={emailIcon} alt="Email" className="iconSmall iconContact" />
          Email
        </a>
      </div>
    </section>
  )
}

export default Contact