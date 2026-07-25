export default function EducationSection() {
  const educationItems = [
    {
      period: '2023 – Present',
      degree: 'Bachelor of Technology (B.Tech) in Computer Science & Engineering',
      institution: 'RR Institute of Modern Technology',
      board: 'Dr. A.P.J. Abdul Kalam Technical University (AKTU)',
      isLast: false,
    },
    {
      period: '2023',
      degree: 'Senior Secondary (Class XII)',
      institution: 'Kendriya Vidyalaya Aliganj',
      board: 'CBSE',
      isLast: false,
    },
    {
      period: '2021',
      degree: 'Secondary (Class X)',
      institution: 'Kendriya Vidyalaya Aliganj',
      board: 'CBSE',
      isLast: true,
    },
  ]

  return (
    <section
      id="education"
      className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
      aria-label="Education history"
    >
      {/* Sticky mobile section header */}
      <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-[#0B0B0C]/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-0 lg:w-auto lg:bg-transparent lg:px-0 lg:py-0">
        <h2 className="text-sm font-bold uppercase tracking-widest text-[#F5F5F5] lg:sr-only">
          Education
        </h2>
      </div>

      <div>
        <h2 className="hidden lg:block text-xs font-bold uppercase tracking-widest text-[#9CA3AF]/60 mb-2">
          Education
        </h2>
        <p className="mb-8 text-sm leading-normal text-[#9CA3AF]">
          My academic journey and educational background.
        </p>

        <ul className="group/list relative border-l border-[#26282E] pl-6 ml-4 sm:ml-0 sm:border-l-0 sm:pl-0">
          {educationItems.map((item, idx) => (
            <li key={idx} className="mb-12 relative group">
              {/* Desktop timeline line */}
              {!item.isLast ? (
                <div className="absolute left-[25%] top-2 -bottom-14 w-[1px] bg-[#26282E] hidden sm:block" />
              ) : (
                <div className="absolute left-[25%] top-2 h-6 w-[1px] bg-[#26282E] hidden sm:block" />
              )}

              {/* Desktop circular marker */}
              <span className="absolute left-[25%] top-1.5 w-3.5 h-3.5 rounded-full bg-[#10B981] border-4 border-[#0B0B0C] -translate-x-1/2 hidden sm:block z-10 transition-transform duration-300 ease-out group-hover:scale-125 shadow-[0_0_8px_rgba(16,185,129,0.3)]" />

              {/* Mobile circular marker */}
              <span className="absolute -left-6 top-1.5 w-3.5 h-3.5 rounded-full bg-[#10B981] border-4 border-[#0B0B0C] -translate-x-1/2 sm:hidden z-10" />

              {/* Background Card Hover Effect */}
              <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md border border-transparent transition duration-300 ease-out motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-[#17181C] lg:group-hover:border-[#26282E] lg:group-hover:shadow-lg" />

              {/* Card Grid Layout */}
              <div className="group relative grid gap-2 pb-1 transition-all duration-300 ease-out sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50 z-10">
                {/* Left: Year / Date */}
                <div className="sm:col-span-2 text-xs font-semibold uppercase tracking-wide text-[#9CA3AF]/60 mt-1 sm:text-right sm:pr-8">
                  {item.period}
                </div>

                {/* Right: Education Details */}
                <div className="sm:col-span-6 sm:pl-8">
                  <h3 className="font-medium leading-snug text-[#F5F5F5] text-base group-hover:text-[#10B981] transition-colors duration-300 ease-out">
                    {item.degree}
                  </h3>
                  <p className="mt-1 text-sm leading-normal text-[#9CA3AF]">
                    {item.institution}
                  </p>
                  <p className="text-xs text-[#9CA3AF]/60 mt-0.5">
                    {item.board}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
