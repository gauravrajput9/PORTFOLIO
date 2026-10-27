import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { m, useTransform } from 'motion/react'
import LogoCloudMultipleRows from '../../common/LogoCloudMultipleRows.jsx'
import ExternalLink from '../../common/ExternalLink.jsx'
import { CONTACT_EMAIL, GITHUB_URL, LINKEDIN_URL } from '../../../utils/constants.js'
import { useScrollProgress } from '../../../hooks/useScrollProgress.js'

/**
 * ScrollHomeContact
 *
 * Dedicated homepage Contact section in normal document flow:
 * - Starts at its intended document position, strictly after Tools & Ecosystem has completed.
 * - Houses the Aceternity UI LogoCloudMultipleRows immediately above the contact CTA.
 * - Operates independently from previous sections with zero overlapping panels or clipped buttons.
 * - Leads directly and cleanly into the page footer.
 */
export default function ScrollHomeContact() {
  const sectionRef = useRef(null)

  const { scrollYProgress, reduceMotion } = useScrollProgress(sectionRef, {
    offset: ['start 0.85', 'start 0.25'],
  })

  // Independent scroll transforms that settle completely by viewport center
  const headerY = useTransform(scrollYProgress, [0, 0.75], [28, 0])
  const headerOpacity = useTransform(scrollYProgress, [0, 0.65], [0.3, 1])

  const logoY = useTransform(scrollYProgress, [0.05, 0.85], [32, 0])
  const logoOpacity = useTransform(scrollYProgress, [0.05, 0.75], [0.35, 1])

  const ctaY = useTransform(scrollYProgress, [0.1, 0.95], [36, 0])
  const ctaOpacity = useTransform(scrollYProgress, [0.1, 0.85], [0.35, 1])

  return (
    <section
      ref={sectionRef}
      className="section home-contact relative py-20 border-t border-line/60"
      id="contact"
      aria-label="Contact invitation"
    >
      <div className="w-full relative">
        {/* Section Heading & Lede */}
        <m.div
          style={{
            y: reduceMotion ? 0 : headerY,
            opacity: reduceMotion ? 1 : headerOpacity,
          }}
          className="mb-10 transform-gpu"
        >
          <p className="eyebrow">05 / Collaboration</p>
          <h2>
            Have a project in mind?<br />
            <span>Let’s build something practical together.</span>
          </h2>
          <p className="lede max-w-2xl">
            I’m available for software engineering internships, junior developer roles, and thoughtful
            technical conversations. Feel free to reach out directly via email or connect through professional networks.
          </p>
        </m.div>

        {/* Aceternity UI Logo Cloud (Multiple Rows) immediately above CTA */}
        <m.div
          style={{
            y: reduceMotion ? 0 : logoY,
            opacity: reduceMotion ? 1 : logoOpacity,
          }}
          className="mb-10 p-6 sm:p-8 rounded-2xl border border-line bg-surface/40 backdrop-blur-sm transform-gpu"
        >
          <div className="flex items-center justify-between mb-3">
            <p className="font-mono text-xs uppercase tracking-wider text-muted">
              Core Technologies in Active Use
            </p>
            <span className="text-[11px] font-mono text-violet">16 Verified Tools</span>
          </div>
          <LogoCloudMultipleRows className="my-1" />
        </m.div>

        {/* Contact Invitation CTA Actions */}
        <m.div
          style={{
            y: reduceMotion ? 0 : ctaY,
            opacity: reduceMotion ? 1 : ctaOpacity,
          }}
          className="p-8 sm:p-10 rounded-2xl border border-line bg-surface/75 transform-gpu relative overflow-hidden"
        >
          {/* Subtle ambient radial glow behind buttons */}
          <div className="absolute -top-16 -right-16 w-64 h-64 bg-violet/10 blur-3xl rounded-full pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h3 className="font-display font-semibold text-xl text-text mb-1">
                Direct Channels
              </h3>
              <p className="text-muted text-sm">
                Fastest response via email or LinkedIn messaging.
              </p>
            </div>

            <div className="hero-ctas m-0">
              <a
                className="button primary cta-button"
                href={`mailto:${CONTACT_EMAIL}`}
                aria-label={`Send email to ${CONTACT_EMAIL}`}
              >
                <span>Email me directly</span>
                <ArrowUpRight size={16} aria-hidden="true" className="btn-arrow" />
              </a>
              <Link className="button cta-button" to="/contact">
                <span>Contact page</span>
                <ArrowUpRight size={16} aria-hidden="true" className="btn-arrow" />
              </Link>
              <ExternalLink className="button" href={GITHUB_URL}>
                GitHub
              </ExternalLink>
              <ExternalLink className="button" href={LINKEDIN_URL}>
                LinkedIn
              </ExternalLink>
            </div>
          </div>
        </m.div>
      </div>
    </section>
  )
}
