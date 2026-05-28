import { motion } from 'framer-motion'

export default function AboutSection() {

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  }

  return (
    <section id="about" className="py-20 px-4 relative">
      <div className="max-w-4xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* Section Title */}
          <motion.div variants={itemVariants} className="mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              About <span className="bg-gradient-accent bg-clip-text text-transparent">Me</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-accent rounded-full"></div>
          </motion.div>

          {/* Content */}
          <motion.div
            variants={itemVariants}
            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-8 hover:border-white/20 transition-all"
          >
            {/* <p className="text-lg text-white/70 leading-relaxed mb-6"> */}
            {/* {profile.bio} */}
            {/* </p> */}
            <p className="text-lg text-white/70 leading-relaxed">
               I'm a passionate Computer Science student with a strong interest in Python, web development, and modern technologies. I enjoy building real-world projects and continuously improving my development and problem-solving skills.Currently, I'm focused on learning new technologies, strengthening my backend and frontend knowledge, and creating clean, user-friendly applications. I'm always eager to explore new ideas and grow as a develope-r through hands-on experience.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
