import './Hero.css'

const Hero = () => {
  return (
    <section id="hero" className="heroSection">
      <div className="heroContent">
        <h1>Hola, soy Alejandro Salado Sánchez</h1>
        <p className="heroSubtitle">Full-Stack Developer</p>
        <p className="heroDescription">
          De la fotografía y el modelado 3D al desarrollo web. Construyo aplicaciones
          Full-Stack con interfaces responsive, APIs REST y bases de datos, aprendiendo
          y mejorando cada día.
        </p>
        <a href="#projects" className="heroButton">Ver proyectos</a>
      </div>
    </section>
  )
}

export default Hero