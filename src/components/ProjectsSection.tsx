import ProjectCard from './ProjectCard'
import { usePortfolio } from '../hooks/usePortfolio'

export default function ProjectsSection() {
  const { projects } = usePortfolio()

  return (
    <section
      id="projects"
      className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
      aria-label="Selected projects"
    >
      {/* Sticky mobile section header */}
      <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-[#0B0B0C]/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-0 lg:w-auto lg:bg-transparent lg:px-0 lg:py-0">
        <h2 className="text-sm font-bold uppercase tracking-widest text-[#F5F5F5] lg:sr-only">
          Projects
        </h2>
      </div>

      <div>
        <ul className="group/list">
          {projects.map((project) => (
            <li key={project.id} className="mb-12">
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

