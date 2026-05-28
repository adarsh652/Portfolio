import { motion } from 'framer-motion'
import { Github, Linkedin, Mail } from 'lucide-react'
import { usePortfolio } from '../hooks/usePortfolio'

export default function Footer() {
  const { profile } = usePortfolio()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-white/5 backdrop-blur-md border-t border-white/10 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold bg-gradient-accent bg-clip-text text-transparent mb-2">
              {profile.name}
            </h3>
            <p className="text-white/60">{profile.role.split('|')[0].trim()}</p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="text-white font-semibold mb-4">Connect</h4>
            <div className="flex gap-4">
              {[
                { icon: Github, href: profile.social.github, label: 'GitHub' },
                { icon: Linkedin, href: profile.social.linkedin, label: 'LinkedIn' },
                { icon: Mail, href: `mailto:${profile.social.email}`, label: 'Email' },
              ].map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target={label !== 'Email' ? '_blank' : undefined}
                  rel={label !== 'Email' ? 'noopener noreferrer' : undefined}
                  whileHover={{ scale: 1.2 }}
                  className="p-2 rounded-lg bg-white/5 hover:bg-gradient-accent text-white/70 hover:text-white transition-all"
                >
                  <Icon size={20} />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-8">
          <p className="text-center text-white/50">
            © {currentYear} {profile.name}. All rights reserved. Built with React, TypeScript & Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  )
}
