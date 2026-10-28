import Background from './features/background/Background'
import Sidebar from './components/layout/Sidebar/Sidebar'
import Hero from './sections/Hero/Hero'
import About from './sections/About/About'
import Projects from './sections/Projects/Projects'
import Skills from './sections/Skills/Skills'
import Contact from './sections/Contact/Contact'

const App = () => {
  return (
    <>
      <Background />
      <Sidebar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>
    </>
  )
}

export default App
