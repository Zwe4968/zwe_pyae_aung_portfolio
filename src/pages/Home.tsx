import Hero from '../components/Hero.tsx'
import About from '../components/About.tsx'
import Education from '../components/Education.tsx'
import Experience from '../components/Experience.tsx'
import Skills from '../components/Skills.tsx'
import Certifications from '../components/Certifications.tsx'
import Projects from '../components/Projects.tsx'
import GithubStats from '../components/GithubStats.tsx'
import Achievements from '../components/Achievements.tsx'
import Contact from '../components/Contact.tsx'

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Education />
      <Experience />
      <Skills />
      <Certifications />
      <Projects />
      <GithubStats />
      <Achievements />
      <Contact />
    </>
  )
}
