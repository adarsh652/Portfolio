import { motion } from 'framer-motion'
import { usePortfolio } from '../hooks/usePortfolio'

export default function SkillsSection() {
  const { skills } = usePortfolio()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const skillCategoryVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  }

  const skillItemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
    },
  }

  const skillCategories = [
    { title: 'Languages', items: skills.languages },
    { title: 'Frontend', items: skills.frontend },
    { title: 'Backend', items: skills.backend },
    { title: 'Tools', items: skills.tools },
  ]

  return (
    <section id="skills" className="py-20 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* Section Title */}
          <motion.div variants={skillCategoryVariants} className="mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Skills & <span className="bg-gradient-accent bg-clip-text text-transparent">Expertise</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-accent rounded-full"></div>
          </motion.div>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skillCategories.map((category) => (
              <motion.div
                key={category.title}
                variants={skillCategoryVariants}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:border-white/20 hover:bg-white/10 transition-all group"
              >
                <h3 className="text-xl font-bold mb-4 bg-gradient-accent bg-clip-text text-transparent">
                  {category.title}
                </h3>
                <div className="space-y-3">
                  {category.items.map((skill, idx) => (
                    <motion.div
                      key={skill}
                      variants={skillItemVariants}
                      custom={idx}
                      className="flex items-center gap-2"
                    >
                      <div className="w-2 h-2 rounded-full bg-gradient-accent"></div>
                      <span className="text-white/70 group-hover:text-white transition-colors">
                        {skill}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
