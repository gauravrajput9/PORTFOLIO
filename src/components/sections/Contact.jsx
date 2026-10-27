import { useRef } from 'react'
import { Copy, Mail } from 'lucide-react'
import { m, useTransform } from 'motion/react'
import BrandIcon from '../common/BrandIcon.jsx'
import ExternalLink from '../common/ExternalLink.jsx'
import { useScrollProgress } from '../../hooks/useScrollProgress.js'
import { useCopyToClipboard } from '../../hooks/useCopyToClipboard.js'
import { CONTACT_EMAIL, GITHUB_URL, LINKEDIN_URL } from '../../utils/constants.js'

export default function Contact({ isStandalone = false }) {
  const { copy, message } = useCopyToClipboard()
  const sectionRef = useRef(null)

  const { scrollYProgress, reduceMotion } = useScrollProgress(sectionRef, {
    offset: ['start 0.85', 'start 0.25'],
  })

  // Smooth scroll transforms
  const headerY = useTransform(scrollYProgress, [0, 0.75], [24, 0])
  const headerOpacity = useTransform(scrollYProgress, [0, 0.65], [0.35, 1])

  const cardsY = useTransform(scrollYProgress, [0.05, 0.85], [30, 0])
  const cardsOpacity = useTransform(scrollYProgress, [0.05, 0.75], [0.35, 1])

  return (
    <section
      ref={sectionRef}
      className="section contact relative py-20"
      id="contact"
      aria-label="Contact information"
    >
      <m.div
        style={{
          y: reduceMotion ? 0 : headerY,
          opacity: reduceMotion ? 1 : headerOpacity,
        }}
        className="section-head mb-10 transform-gpu"
      >
        <div>
          <p className="eyebrow">01 / Inquiries &amp; Opportunities</p>
          {isStandalone ? (
            <h1>
              Let’s build something<br />
              <span>practical together.</span>
            </h1>
          ) : (
            <h2>
              Let’s build something<br />
              <span>practical together.</span>
            </h2>
          )}
          <p className="lede">
            I’m available for software engineering internships, junior developer roles, and technical discussions.
            Feel free to reach out directly via email or connect through professional networks.
          </p>
        </div>
      </m.div>

      <m.div
        style={{
          y: reduceMotion ? 0 : cardsY,
          opacity: reduceMotion ? 1 : cardsOpacity,
        }}
        className="contact-methods transform-gpu"
      >
        {/* Email card */}
        <div className="contact-card">
          <div className="contact-card-icon">
            <Mail size={22} aria-hidden="true" />
          </div>
          <div className="contact-card-content">
            <h3>Email</h3>
            <p className="contact-card-value">{CONTACT_EMAIL}</p>
          </div>
          <div className="contact-card-actions">
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="button primary"
              aria-label={`Send email to ${CONTACT_EMAIL}`}
            >
              <span>Compose email</span>
            </a>
            <button
              className="button icon-only"
              onClick={() => copy(CONTACT_EMAIL, 'Email address')}
              aria-label="Copy email address to clipboard"
              title="Copy email address"
            >
              <Copy size={16} aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* GitHub card */}
        <div className="contact-card">
          <div className="contact-card-icon">
            <BrandIcon type="github" />
          </div>
          <div className="contact-card-content">
            <h3>GitHub</h3>
            <p className="contact-card-value">github.com/gauravrajput9</p>
          </div>
          <div className="contact-card-actions">
            <ExternalLink
              href={GITHUB_URL}
              className="button"
              aria-label="Visit GitHub profile"
            >
              <span>Visit profile</span>
            </ExternalLink>
            <button
              className="button icon-only"
              onClick={() => copy(GITHUB_URL, 'GitHub profile URL')}
              aria-label="Copy GitHub URL to clipboard"
              title="Copy GitHub URL"
            >
              <Copy size={16} aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* LinkedIn card */}
        <div className="contact-card">
          <div className="contact-card-icon">
            <BrandIcon type="linkedin" />
          </div>
          <div className="contact-card-content">
            <h3>LinkedIn</h3>
            <p className="contact-card-value">linkedin.com/in/gaurav-rajput-bb44652a2</p>
          </div>
          <div className="contact-card-actions">
            <ExternalLink
              href={LINKEDIN_URL}
              className="button"
              aria-label="Visit LinkedIn profile"
            >
              <span>Visit profile</span>
            </ExternalLink>
            <button
              className="button icon-only"
              onClick={() => copy(LINKEDIN_URL, 'LinkedIn profile URL')}
              aria-label="Copy LinkedIn URL to clipboard"
              title="Copy LinkedIn URL"
            >
              <Copy size={16} aria-hidden="true" />
            </button>
          </div>
        </div>
      </m.div>

      <div className="copy-feedback-container" aria-live="polite">
        {message && <p className="copy-status">{message}</p>}
      </div>
    </section>
  )
}
