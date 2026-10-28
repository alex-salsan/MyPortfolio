import './ProjectCard.css'

const ProjectCard = ({ title, description, tags = [], link, status, onClick, expanded }) => {
  const isInteractive = Boolean(onClick)

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      onClick()
    }
  }

  const interactiveProps = isInteractive
    ? {
        role: 'button',
        tabIndex: 0,
        'aria-expanded': expanded,
        onClick,
        onKeyDown: handleKeyDown,
      }
    : {}

  return (
    <article className={`projectCard ${isInteractive ? 'clickable' : ''}`} {...interactiveProps}>
      {status && (
        <span className="projectStatus">
          {status.icon && <img src={status.icon} alt="" className="iconSmall iconInline" />}
          {status.label}
        </span>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
      <ul className="projectTags">
        {tags.map((tag) => (
          <li key={tag} className="projectTag">{tag}</li>
        ))}
      </ul>
      {link && (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="projectLink"
          onClick={(event) => event.stopPropagation()}
        >
          Ver proyecto →
        </a>
      )}
    </article>
  )
}

export default ProjectCard
