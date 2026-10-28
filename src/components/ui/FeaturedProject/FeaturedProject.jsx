import BrowserFrame from '../BrowserFrame/BrowserFrame'
import './FeaturedProject.css'

const FeaturedProject = ({
  title,
  tagline,
  description,
  highlights = [],
  tags = [],
  demo,
  repo,
  note,
  theme = {},
  screenshots,
  reversed = false,
}) => {
  // Cada proyecto pinta el bloque con su propia identidad visual
  const themeStyle = {
    '--project-accent': theme.accent,
    '--project-title-font': theme.titleFont,
    '--project-title-size': theme.titleSize,
  }

  return (
    <article className={`featuredProject ${reversed ? 'reversed' : ''}`} style={themeStyle}>
      <a
        href={demo}
        target="_blank"
        rel="noopener noreferrer"
        className="featuredMedia"
        aria-label={`Abrir la demo de ${title}`}
      >
        <BrowserFrame url={demo} title={title} screenshots={screenshots} />
      </a>

      <div className="featuredInfo">
        <p className="featuredTagline">{tagline}</p>
        <h3 className="featuredTitle">{title}</h3>
        <p className="featuredDescription">{description}</p>

        <ul className="featuredHighlights">
          {highlights.map((highlight) => (
            <li key={highlight}>{highlight}</li>
          ))}
        </ul>

        <ul className="featuredTags">
          {tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>

        <div className="featuredActions">
          {demo && (
            <a href={demo} target="_blank" rel="noopener noreferrer" className="featuredBtn featuredBtnPrimary">
              Ver demo
            </a>
          )}
          {repo && (
            <a href={repo} target="_blank" rel="noopener noreferrer" className="featuredBtn">
              Código
            </a>
          )}
        </div>

        {note && <p className="featuredNote">{note}</p>}
      </div>
    </article>
  )
}

export default FeaturedProject
