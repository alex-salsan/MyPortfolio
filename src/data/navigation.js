import presentacionIcon from '../assets/icons/presentacion.png'
import sobreMiIcon from '../assets/icons/sobre-mi.png'
import proyectosIcon from '../assets/icons/proyectos.png'
import skillsIcon from '../assets/icons/skills.png'
import contactoIcon from '../assets/icons/contacto.png'

export const NAV_LINKS = [
  { id: 'hero', label: 'Presentación', icon: presentacionIcon },
  { id: 'about', label: 'Sobre mí', icon: sobreMiIcon },
  { id: 'projects', label: 'Proyectos', icon: proyectosIcon },
  { id: 'skills', label: 'Skills', icon: skillsIcon },
  { id: 'contact', label: 'Contacto', icon: contactoIcon },
]

export const SECTION_IDS = NAV_LINKS.map(({ id }) => id)
