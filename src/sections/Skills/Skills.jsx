import { SKILL_GROUPS } from '../../data/skills'
import './Skills.css'

const Skills = () => {
  return (
    <section id="skills" className="skillsSection">
      <h2>Skills</h2>
      <div className="skillsGroups">
        {SKILL_GROUPS.map(({ category, items }) => (
          <div key={category} className="skillGroup">
            <h3>{category}</h3>
            <ul className="skillsGrid">
              {items.map((skill) => (
                <li key={skill} className="skillBadge">{skill}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Skills
