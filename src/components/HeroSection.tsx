import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, ArrowRight } from 'lucide-react'
import { usePortfolio } from '../hooks/usePortfolio'

export default function HeroSection() {
  const { profile } = usePortfolio()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  }

  const handleSmoothScroll = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center pt-20 px-6 relative overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute -top-40 -right-40 w-80 h-80 bg-green-500/10 rounded-full blur-3xl"
        />

        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 max-w-7xl w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
        >
          {/* LEFT SIDE */}
          <div className="text-center lg:text-left">
            {/* Name */}
            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
            >
              Hi, I'm{' '}
              <span className="bg-gradient-accent bg-clip-text text-transparent">
                {profile.name}
              </span>
            </motion.h1>

            {/* Role */}
            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl text-white/60 mb-8 leading-relaxed"
            >
              {profile.role}
            </motion.p>

            {/* Bio */}
            <motion.p
              variants={itemVariants}
              className="text-base md:text-lg text-white/50 mb-10 leading-relaxed max-w-xl mx-auto lg:mx-0"
            >
              {profile.bio}
            </motion.p>

            {/* Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 lg:justify-start justify-center mb-10"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSmoothScroll('projects')}
                className="px-8 py-3 bg-gradient-accent text-white font-semibold rounded-lg flex items-center justify-center gap-2 group"
              >
                View My Work

                <ArrowRight
                  size={20}
                  className="group-hover:translate-x-2 transition-transform"
                />
              </motion.button>

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
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 border-2 border-white/20 text-white font-semibold rounded-lg hover:border-white/40 hover:bg-white/5 transition-all"
              >
                Get In Touch
              </motion.a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              variants={itemVariants}
              className="flex gap-6 lg:justify-start justify-center"
            >
              {[
                {
                  icon: Github,
                  href: profile.social.github,
                  label: 'GitHub',
                },
                {
                  icon: Linkedin,
                  href: profile.social.linkedin,
                  label: 'LinkedIn',
                },
                {
                  icon: Mail,
                  href: `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
                    profile.social.email
                  )}&su=${encodeURIComponent(
                    'Hello'
                  )}&body=${encodeURIComponent(
                    'Hi Adarsh, I saw your portfolio and would like to connect.'
                  )}`,
                  label: 'Email',
                },
              ].map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 rounded-lg bg-white/5 hover:bg-gradient-accent text-white/70 hover:text-white transition-all border border-white/10 hover:border-transparent group"
                >
                  <Icon
                    size={24}
                    className="group-hover:scale-110 transition-transform"
                  />
                </motion.a>
              ))}
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mt-16 flex lg:justify-end justify-center"
            >
            <div className="border-2 border-white/20 rounded-full p-2">
                <svg
                className="w-6 h-6 text-white/40 animate-pulse"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
                >
                <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                </svg>
            </div>
            </motion.div>
            </div>

          {/* RIGHT SIDE */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center lg:justify-end"
          >
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="relative"
            >
              {/* Profile Image */}
              <div className="w-72 h-72 md:w-80 md:h-80 rounded-full bg-white p-2">
                <div className="w-full h-full rounded-full overflow-hidden bg-dark/80">
                  {profile.avatar ? (
                    <img
                      src={profile.avatar}
                      alt={profile.name}
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-6xl font-bold bg-gradient-accent bg-clip-text text-transparent">
                        {profile.name
                          .split(' ')
                          .map((n) => n[0])
                          .slice(0, 2)
                          .join('')}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Rotating Ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                className="absolute inset-0 rounded-full border-4 border-transparent border-t-green-900 border-r-green-900"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}