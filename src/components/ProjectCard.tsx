import { Github, ArrowUpRight } from 'lucide-react'
import { Project } from '../types/portfolio'

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const primaryLink = project.live || project.github

  return (
    <div className="group relative grid gap-4 pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
      {/* Background Hover Effect */}
      <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-[#17181C] lg:group-hover:border lg:group-hover:border-[#26282E] lg:group-hover:shadow-lg" />

      {/* Left side: Image/Thumbnail */}
      <div className="z-10 sm:order-1 sm:col-span-2 mt-1">
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            className="rounded border-2 border-[#26282E] transition group-hover:border-[#10B981] w-full aspect-[16/10] object-cover object-top"
          />
        ) : (
          <div className="rounded border-2 border-[#26282E] transition group-hover:border-[#10B981] w-full aspect-[16/10] bg-slate-800 flex items-center justify-center text-xs font-semibold text-[#9CA3AF]/60">
            No Image
          </div>
        )}
      </div>

      {/* Right side: Project Details */}
      <div className="z-10 sm:order-2 sm:col-span-6">
        <h3 className="font-medium leading-snug text-[#F5F5F5]">
          <div>
            <a
              className="inline-flex items-baseline font-medium leading-tight text-[#F5F5F5] hover:text-[#10B981] focus-visible:text-[#10B981] group/link text-base"
              href={primaryLink}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={`${project.title} (opens in a new tab)`}
            >
              {/* Overlay link for full-card clickability on desktop */}
              <span className="absolute -inset-x-4 -inset-y-4 z-20 hidden rounded md:-inset-x-6 lg:block" />
              <span>
                {project.title}
                <span className="inline-block">
                  <ArrowUpRight className="inline-block h-4 w-4 shrink-0 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-focus-visible/link:-translate-y-1 group-focus-visible/link:translate-x-1 motion-reduce:transition-none ml-1 translate-y-px text-[#9CA3AF] group-hover/link:text-[#10B981]" />
                </span>
              </span>
            </a>
          </div>
        </h3>

        <p className="mt-2 text-sm leading-normal text-[#9CA3AF]">
          {project.description}
        </p>

        {/* GitHub link if different from primary link */}
        {project.live && project.github && (
          <div className="mt-3 flex items-center gap-1.5 relative z-30">
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#9CA3AF] hover:text-[#10B981]"
              aria-label={`${project.title} GitHub repository`}
            >
              <Github className="h-3.5 w-3.5" />
              <span>View Repository</span>
            </a>
          </div>
        )}

        {/* Technologies badges */}
        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Technologies used">
          {project.technologies.map((tech) => (
            <li key={tech} className="flex items-center">
              <span className="rounded-full bg-[#10B981]/10 px-3 py-1 text-xs font-medium leading-5 text-[#10B981]">
                {tech}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

