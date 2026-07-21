import './ProjectCard.css'

const ProjectCard = ({ title, description, tags, link, status, onClick }) => {
  return (
    <div
      className={`projectCard ${onClick ? 'clickable' : ''}`}
      onClick={onClick}
    >
      {status && <span className="projectStatus">{status}</span>}
      <h3>{title}</h3>
      <p>{description}</p>
      <div className="projectTags">
        {tags.map((tag) => (
          <span key={tag} className="projectTag">{tag}</span>
        ))}
      </div>
      {link && (
        <a
          href={link}
          target="_blank"
          rel="noreferrer"
          className="projectLink"
          onClick={(e) => e.stopPropagation()}
        >
          Ver proyecto →
        </a>
      )}
    </div>
  )
}

export default ProjectCard