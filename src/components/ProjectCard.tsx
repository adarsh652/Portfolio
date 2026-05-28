import { motion } from 'framer-motion'
import { Github, ExternalLink } from 'lucide-react'
import { Project } from '../types/portfolio'

interface ProjectCardProps {
  project: Project
  featured?: boolean
}

export default function ProjectCard({ project, featured = false }: ProjectCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      className={`group relative rounded-xl overflow-hidden border border-white/10 hover:border-white/30 transition-all ${
        featured ? 'md:col-span-2' : ''
      }`}
    >
      {/* Background Gradient on Hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />

      {/* Image Container */}
      <div className="relative h-56 md:h-72 overflow-hidden bg-black">
        <motion.img
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.5 }}
          src={project.image}
          alt={project.title}
          className="w-full h-full object-top"
        />
      </div>

      {/* Content */}
      <div className="relative p-6 bg-dark/80 backdrop-blur-md">
        <h3 className="text-2xl font-bold mb-2 text-white group-hover:bg-gradient-accent group-hover:bg-clip-text group-hover:text-transparent transition-all">
          {project.title}
        </h3>

        <p className="text-white/60 mb-4 leading-relaxed line-clamp-2">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 text-sm rounded-full bg-white/5 border border-white/10 text-white/70 hover:border-white/30 transition-all"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-3">
          <motion.a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-all border border-white/10"
          >
            <Github size={18} />
            <span className="text-sm">Code</span>
          </motion.a>

          {project.live && (
            <motion.a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-accent text-white text-sm font-semibold hover:shadow-lg hover:shadow-pink-500/50 transition-all"
            >
              <ExternalLink size={18} />
              <span>Live</span>
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  )
}
