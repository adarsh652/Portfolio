
import { useState, useEffect } from 'react'
import { Github, Linkedin, Mail } from 'lucide-react'
import { usePortfolio } from './hooks/usePortfolio'
import AboutSection from './components/AboutSection'
import EducationSection from './components/EducationSection'
import SkillsSection from './components/SkillsSection'
import ProjectsSection from './components/ProjectsSection'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'
import GeometricBackground from './components/GeometricBackground'
import './index.css'

function App() {
  const { profile } = usePortfolio()
  const [activeSection, setActiveSection] = useState('about')
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  // Mouse spotlight effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Intersection Observer for scroll navigation
  useEffect(() => {
    const sections = ['about', 'education', 'skills', 'projects', 'contact']
    const observers = sections.map((id) => {
      const el = document.getElementById(id)
      if (!el) return null

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id)
          }
        },
        {
          rootMargin: '-20% 0px -60% 0px',
        }
      )

      observer.observe(el)
      return { observer, el }
    })

    return () => {
      observers.forEach((obs) => {
        if (obs) {
          obs.observer.unobserve(obs.el)
        }
      })
    }
  }, [])

  const [scrollProgress, setScrollProgress] = useState(0)

  // Scroll progress indicator logic
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100
        setScrollProgress(progress)
      }
    }
    window.addEventListener('scroll', handleScroll)
    // Run initially to capture scroll state
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { id: 'about', label: 'About' },
    { id: 'education', label: 'Education' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ]

  const handleNavClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault()
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="bg-[#0B0B0C] min-h-screen text-[#9CA3AF] font-sans relative selection:bg-emerald-500/20 selection:text-[#10B981] antialiased">
      {/* Thin reading progress indicator on the left */}
      <div className="fixed left-0 top-0 bottom-0 w-[3px] bg-[#26282E] z-50">
        <div
          className="bg-[#10B981] w-full transition-all duration-75 ease-out shadow-[0_0_8px_#10B981]"
          style={{ height: `${scrollProgress}%` }}
        />
      </div>

      {/* Background Spotlight */}
      <div
        className="pointer-events-none fixed inset-0 z-30 transition duration-300 lg:absolute"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(16, 185, 129, 0.06), transparent 80%)`,
        }}
      />

      <div className="mx-auto min-h-screen max-w-screen-xl">
        <div className="lg:flex lg:justify-between lg:gap-4">
          {/* LEFT COLUMN: Sticky Header, Nav, and Socials */}
          <header className="w-full lg:w-[46%] bg-[#101113] border-b lg:border-b-0 lg:border-r border-[#26282E] px-6 py-12 md:px-12 lg:px-16 lg:py-24 lg:sticky lg:top-0 lg:h-screen lg:flex lg:flex-col lg:justify-between relative overflow-hidden group">
            <GeometricBackground />
            <div className="relative z-10 flex flex-col justify-between h-full w-full">
              <div>
                {/* Name and Role */}
                <h1 className="text-4xl font-bold tracking-tight text-[#F5F5F5] sm:text-5xl">
                  <a href="#about" onClick={(e) => handleNavClick(e, 'about')}>{profile.name}</a>
                </h1>
                <h2 className="mt-3 text-lg font-medium tracking-tight text-[#F5F5F5] sm:text-xl">
                  {profile.role}
                </h2>
                <p className="mt-4 max-w-xs leading-normal text-[#9CA3AF]">
                  Building accessible, high-performance web applications and mastering Python tools.
                </p>

                {/* Sidebar Navigation */}
                <nav className="nav hidden lg:block" aria-label="In-page jump links">
                  <ul className="mt-16 w-fit">
                    {navItems.map((item) => {
                      const isActive = activeSection === item.id
                      return (
                        <li key={item.id}>
                          <a
                            className="group flex items-center py-3"
                            href={`#${item.id}`}
                            onClick={(e) => handleNavClick(e, item.id)}
                          >
                            <span
                              className={`mr-4 h-px transition-all group-hover:w-16 group-hover:bg-[#10B981] group-focus-visible:w-16 group-focus-visible:bg-[#10B981] motion-reduce:transition-none ${
                                isActive ? 'w-16 bg-[#10B981]' : 'w-8 bg-[#26282E]'
                              }`}
                            />
                            <span
                              className={`text-xs font-bold uppercase tracking-widest transition-colors group-hover:text-[#F5F5F5] group-focus-visible:text-[#F5F5F5] ${
                                isActive ? 'text-[#F5F5F5]' : 'text-[#9CA3AF]/50'
                              }`}
                            >
                              {item.label}
                            </span>
                          </a>
                        </li>
                      )
                    })}
                  </ul>
                </nav>
              </div>

              {/* Social Links */}
              <ul className="ml-1 mt-8 flex items-center gap-5" aria-label="Social media">
                <li className="mr-5 text-xs">
                  <a
                    className="block text-[#9CA3AF]/60 hover:text-[#10B981] transition-colors"
                    href={profile.social.github}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label="GitHub (opens in a new tab)"
                  >
                    <span className="sr-only">GitHub</span>
                    <Github className="h-6 w-6" />
                  </a>
                </li>
                <li className="mr-5 text-xs">
                  <a
                    className="block text-[#9CA3AF]/60 hover:text-[#10B981] transition-colors"
                    href={profile.social.linkedin}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label="LinkedIn (opens in a new tab)"
                  >
                    <span className="sr-only">LinkedIn</span>
                    <Linkedin className="h-6 w-6" />
                  </a>
                </li>
                <li className="mr-5 text-xs">
                  <a
                    className="block text-[#9CA3AF]/60 hover:text-[#10B981] transition-colors"
                    href={`mailto:${profile.social.email}`}
                    aria-label="Email"
                  >
                    <span className="sr-only">Email</span>
                    <Mail className="h-6 w-6" />
                  </a>
                </li>
              </ul>
            </div>
          </header>

          {/* RIGHT COLUMN: Content Sections */}
          <main id="content" className="w-full lg:w-[54%] px-6 py-12 md:px-12 lg:px-16 lg:py-24 bg-[#0B0B0C]">
            <AboutSection />
            <EducationSection />
            <SkillsSection />
            <ProjectsSection />
            <ContactSection />
            <Footer />
          </main>
        </div>
      </div>
    </div>
  )
}

export default App


