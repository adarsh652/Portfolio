import { usePortfolio } from '../hooks/usePortfolio'
import { ArrowUpRight } from 'lucide-react'

export default function ContactSection() {
  const { profile } = usePortfolio()

  const emailHref = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
    profile.social.email
  )}&su=${encodeURIComponent('Hello')}&body=${encodeURIComponent(
    'Hi Adarsh, I saw your portfolio and would like to connect.'
  )}`

  return (
    <section
      id="contact"
      className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
      aria-label="Contact information"
    >
      {/* Sticky mobile section header */}
      <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-[#0B0B0C]/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-0 lg:w-auto lg:bg-transparent lg:px-0 lg:py-0">
        <h2 className="text-sm font-bold uppercase tracking-widest text-[#F5F5F5] lg:sr-only">
          Contact
        </h2>
      </div>

      <div>
        <div className="group relative grid gap-4 pb-1 transition-all lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
          {/* Background Hover Effect */}
          <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-[#17181C] lg:group-hover:border lg:group-hover:border-[#26282E] lg:group-hover:shadow-lg" />
          
          <div className="z-10">
            <h3 className="font-medium leading-snug text-[#F5F5F5]">
              <div>
                <a
                  className="inline-flex items-baseline font-medium leading-tight text-[#F5F5F5] hover:text-[#10B981] focus-visible:text-[#10B981] group/link text-base"
                  href={emailHref}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="Send an email (opens in a new tab)"
                >
                  <span className="absolute -inset-x-4 -inset-y-4 z-20 hidden rounded md:-inset-x-6 lg:block" />
                  <span>
                    Get In Touch
                    <span className="inline-block">
                      <ArrowUpRight className="inline-block h-4 w-4 shrink-0 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-focus-visible/link:-translate-y-1 group-focus-visible/link:translate-x-1 motion-reduce:transition-none ml-1 translate-y-px text-[#9CA3AF] group-hover/link:text-[#10B981]" />
                    </span>
                  </span>
                </a>
              </div>
            </h3>
            
            <p className="mt-2 text-sm leading-normal text-[#9CA3AF]">
              I'm currently looking for new opportunities and my inbox is always open. Whether you have a question, a project idea, or just want to connect, feel free to drop a message!
            </p>

            <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-[#9CA3AF]/60">
              Direct Email: <span className="text-[#F5F5F5] font-normal lowercase">{profile.social.email}</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

