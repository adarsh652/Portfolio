import { motion } from 'framer-motion'
import { Mail, Github, Linkedin } from 'lucide-react'
import { usePortfolio } from '../hooks/usePortfolio'

export default function ContactSection() {
  const { profile } = usePortfolio()

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
    <section id="contact" className="py-20 px-4 relative">
      <div className="max-w-4xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* Section Title */}
          <motion.div variants={itemVariants} className="mb-12 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Get In <span className="bg-gradient-accent bg-clip-text text-transparent">Touch</span>
            </h2>
            <p className="text-white/60 text-lg">
              Let's collaborate and create something amazing together!
            </p>
          </motion.div>

          {/* Contact Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
                {
                icon: Mail,
                label: 'Email',
                value: profile.social.email,
                href: `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
                profile.social.email
                )}&su=${encodeURIComponent(
                'Hello'
                )}&body=${encodeURIComponent(
                'Hi Adarsh, I saw your portfolio and would like to connect.'
                )}`,
                },
              {
                icon: Github,
                label: 'GitHub',
                value: 'View Profile',
                href: profile.social.github,
              },
              {
                icon: Linkedin,
                label: 'LinkedIn',
                value: 'Connect',
                href: profile.social.linkedin,
              },
            ].map(({ icon: Icon, label, value, href }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:border-white/20 hover:bg-white/10 transition-all text-center group"
              >
                <div className="flex justify-center mb-4">
                  <Icon className="w-8 h-8 text-white/70 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{label}</h3>
                <p className="text-white/60 group-hover:text-white transition-colors">{value}</p>
              </motion.a>
            ))}
          </div>

          {/* Call to Action */}
          <motion.div
            variants={itemVariants}
            className="text-center bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-8 hover:border-white/20 transition-all"
          >
            <p className="text-white/70 mb-4">
              Don't hesitate to reach out. I'm always open to discussing new projects, ideas, or opportunities.
            </p>
                <motion.a
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
                    profile.social.email
                )}&su=${encodeURIComponent(
                    'Hello'
                )}&body=${encodeURIComponent(
                    'Hi Adarsh, I saw your portfolio and would like to connect.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{scale: 1.05 }}
                whileTap={{scale: 0.95}}
                className= "inline-block px-8 py-3 bg-gradient-accent text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-pink-500/50 transition-all"

                >
              Send Me an Email
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
