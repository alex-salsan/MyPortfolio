import './Skills.css'

const skillGroups = [
  {
    category: 'Frontend',
    items: ['HTML5', 'CSS3', 'Flexbox', 'Grid', 'SASS', 'Bootstrap', 'Tailwind', 'JavaScript (ES6)', 'React', 'TypeScript'],
  },
  {
    category: 'Backend',
    items: ['Node.js', 'Express', 'Java', 'Spring Boot', 'Python', 'APIs REST'],
  },
  {
    category: 'Bases de datos',
    items: ['SQL', 'MySQL'],
  },
  {
    category: 'Salesforce',
    items: ['Apex', 'LWC'],
  },
  {
    category: 'Herramientas',
    items: ['Git', 'GitHub', 'VS Code', 'Eclipse', 'Postman', 'Agile', 'Scrum', 'Suite Adobe'],
  },
]

const Skills = () => {
  return (
    <section id="skills" className="skillsSection">
      <h2>Skills</h2>
      <div className="skillsGroups">
        {skillGroups.map(({ category, items }) => (
          <div key={category} className="skillGroup">
            <h3>{category}</h3>
            <div className="skillsGrid">
              {items.map((skill) => (
                <span key={skill} className="skillBadge">{skill}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Skills