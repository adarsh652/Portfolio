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
          My expertise lies in developing responsive frontend interfaces and robust backend systems using modern technologies. I continuously expand my knowledge by building practical projects, exploring new tools, and strengthening my problem-solving skills through Data Structures & Algorithms.
        </p>
        <p className="leading-relaxed">
          I'm driven by curiosity, continuous learning, and the challenge of creating software that delivers real value. Whether it's designing seamless user experiences or building reliable backend services, I strive to develop applications that are both functional and impactful.
        </p>
      </div>
    </section>
  )
}

