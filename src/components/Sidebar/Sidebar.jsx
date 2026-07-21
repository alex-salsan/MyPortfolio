import { useState, useRef, useEffect } from 'react'
import './Sidebar.css'

import presentacionIcon from '../../assets/presentacion.png'
import sobreMiIcon from '../../assets/sobre-mi.png'
import proyectosIcon from '../../assets/proyectos.png'
import skillsIcon from '../../assets/skills.png'
import contactoIcon from '../../assets/contacto.png'

const links = [
  { id: 'hero', label: 'Presentación', icon: presentacionIcon },
  { id: 'about', label: 'Sobre mí', icon: sobreMiIcon },
  { id: 'projects', label: 'Proyectos', icon: proyectosIcon },
  { id: 'skills', label: 'Skills', icon: skillsIcon },
  { id: 'contact', label: 'Contacto', icon: contactoIcon },
]

const Sidebar = () => {
  const [activeId, setActiveId] = useState('hero')
  const itemRefs = useRef({})
  const isClicking = useRef(false)

  const createRipple = (event) => {
    const item = event.currentTarget
    const circle = document.createElement('span')
    const diameter = Math.max(item.clientWidth, item.clientHeight)
    const radius = diameter / 2

    circle.style.width = circle.style.height = `${diameter}px`
    circle.style.left = `${event.clientX - item.getBoundingClientRect().left - radius}px`
    circle.style.top = `${event.clientY - item.getBoundingClientRect().top - radius}px`
    circle.classList.add('rippleEffect')

    const existingRipple = item.querySelector('.rippleEffect')
    if (existingRipple) existingRipple.remove()

    item.appendChild(circle)
    setTimeout(() => circle.remove(), 600)
  }

  const handleClick = (id, event) => {
    event.preventDefault()
    isClicking.current = true
    setActiveId(id)
    createRipple(event)

    const target = document.getElementById(id)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }

    setTimeout(() => {
      isClicking.current = false
    }, 1000)
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (isClicking.current) return

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { threshold: 0.5 }
    )

    links.forEach(({ id }) => {
      const section = document.getElementById(id)
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <nav className="sidebarContainer">
      <ul className="sidebarList">
        {links.map(({ id, label, icon }) => (
          <li
            key={id}
            ref={(el) => (itemRefs.current[id] = el)}
            className={activeId === id ? 'sidebarItem active' : 'sidebarItem'}
            onClick={(e) => handleClick(id, e)}
          >
            <a href={`#${id}`}>
              <span className="sidebarIcon">
                {typeof icon === 'string' && icon.includes('.png') ? (
                  <img src={icon} alt={label} className="iconSmall" />
                ) : (
                  icon
                )}
              </span>
              <span className="sidebarText">{label}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Sidebar