import Sidebar from './components/Sidebar/Sidebar'
import Hero from './components/Hero/Hero'
import AboutMe from './components/AboutMe/AboutMe'
import ProjectsSection from './components/ProjectsSection/ProjectsSection'
import Skills from './components/Skills/Skills'
import Contact from './components/Contact/Contact'

const App = () => {
  return (
    <>
      <Sidebar />
      <Hero />
      <AboutMe />
      <ProjectsSection />
      <Skills />
      <Contact />
    </>
  )
}

export default App