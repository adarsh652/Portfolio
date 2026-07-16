import { usePortfolio } from '../hooks/usePortfolio'

export default function SkillsSection() {
  const { skills } = usePortfolio()

  const skillCategories = [
    { title: 'Languages', items: skills.languages, description: 'Core programming languages used for systems, data, and logic.' },
    { title: 'Frontend', items: skills.frontend, description: 'Libraries and frameworks for crafting beautiful, responsive user interfaces.' },
    { title: 'Backend', items: skills.backend, description: 'Server-side environments, databases, and API development toolkits.' },
    { title: 'Tools', items: skills.tools, description: 'Essential software, version control systems, and deployment platforms.' },
  ]

  return (
    <section
      id="skills"
      className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
      aria-label="Skills and expertise"
    >
      {/* Sticky mobile section header */}
      <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-[#0B0B0C]/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-0 lg:w-auto lg:bg-transparent lg:px-0 lg:py-0">
        <h2 className="text-sm font-bold uppercase tracking-widest text-[#F5F5F5] lg:sr-only">
          Skills
        </h2>
      </div>

      <div>
        <ul className="group/list">
          {skillCategories.map((category) => (
            <li key={category.title} className="mb-12">
              <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
                {/* Background Card Hover Effect */}
                <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-[#17181C] lg:group-hover:border lg:group-hover:border-[#26282E] lg:group-hover:shadow-lg" />
                
                {/* Left side: Category Title */}
                <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-[#9CA3AF]/60 sm:col-span-2">
                  {category.title}
                </header>

                {/* Right side: Category description and tags */}
                <div className="z-10 sm:col-span-6">
                  <h3 className="font-medium leading-snug text-[#F5F5F5]">
                    <div>
                      <span className="inline-flex items-baseline font-medium leading-tight text-[#F5F5F5] text-base">
                        {category.title} Focus
                      </span>
                    </div>
                  </h3>
                  <p className="mt-2 text-sm leading-normal text-[#9CA3AF]">
                    {category.description}
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-1.5" aria-label={`Skills in ${category.title}`}>
                    {category.items.map((skill) => (
                      <li key={skill} className="flex items-center">
                        <span className="flex items-center rounded-full bg-[#10B981]/10 px-3 py-1 text-xs font-medium leading-5 text-[#10B981]">
                          {skill}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

