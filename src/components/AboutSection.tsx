import { usePortfolio } from '../hooks/usePortfolio'

export default function AboutSection() {
  const { profile } = usePortfolio()

  return (
    <section
      id="about"
      className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
      aria-label="About me"
    >
      {/* Sticky mobile section header */}
      <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-[#0B0B0C]/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-0 lg:w-auto lg:bg-transparent lg:px-0 lg:py-0">
        <h2 className="text-sm font-bold uppercase tracking-widest text-[#F5F5F5] lg:sr-only">
          About
        </h2>
      </div>

      <div>
        <p className="mb-4 leading-relaxed">
          {profile.bio}
        </p>
        <p className="mb-4 leading-relaxed">
          I'm a passionate Computer Science student with a strong interest in Python, web development, and modern technologies. I enjoy building real-world projects and continuously improving my development and problem-solving skills.
        </p>
        <p className="leading-relaxed">
          Currently, I'm focused on learning new technologies, strengthening my backend and frontend knowledge, and creating clean, user-friendly applications. I'm always eager to explore new ideas and grow as a developer through hands-on experience.
        </p>
      </div>
    </section>
  )
}

