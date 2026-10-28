import { NAV_LINKS, SECTION_IDS } from '../../../data/navigation'
import { useActiveSection } from '../../../hooks/useActiveSection'
import './Sidebar.css'

const RIPPLE_DURATION_MS = 600

const createRipple = (event) => {
  const item = event.currentTarget
  const { left, top } = item.getBoundingClientRect()
  const diameter = Math.max(item.clientWidth, item.clientHeight)
  const radius = diameter / 2

  item.querySelector('.rippleEffect')?.remove()

  const circle = document.createElement('span')
  circle.className = 'rippleEffect'
  circle.style.width = circle.style.height = `${diameter}px`
  circle.style.left = `${event.clientX - left - radius}px`
  circle.style.top = `${event.clientY - top - radius}px`

  item.appendChild(circle)
  setTimeout(() => circle.remove(), RIPPLE_DURATION_MS)
}

const Sidebar = () => {
  const { activeId, scrollToSection } = useActiveSection(SECTION_IDS)

  const handleClick = (event, id) => {
    event.preventDefault()
    createRipple(event)
    scrollToSection(id)
  }

  return (
    <nav className="sidebarContainer" aria-label="Navegación principal">
      <ul className="sidebarList">
        {NAV_LINKS.map(({ id, label, icon }) => {
          const isActive = activeId === id

          return (
            <li key={id} className={`sidebarItem ${isActive ? 'active' : ''}`}>
              <a
                href={`#${id}`}
                className="sidebarLink"
                aria-label={label}
                aria-current={isActive ? 'true' : undefined}
                onClick={(event) => handleClick(event, id)}
              >
                <img src={icon} alt="" className="iconSmall" />
                <span className="sidebarText">{label}</span>
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default Sidebar
