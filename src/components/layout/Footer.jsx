import { useRef } from 'react'
import { ChevronUp } from 'lucide-react'
import { Link } from 'react-router-dom'
import { m, useReducedMotion, useScroll, useTransform } from 'motion/react'
import Logo from '../common/Logo.jsx'
import ExternalLink from '../common/ExternalLink.jsx'
import { GITHUB_URL, LINKEDIN_URL } from '../../utils/constants.js'

/**
 * Footer
 *
 * Emerges naturally from the closing contact section with subtle scroll-linked docking.
 */
export default function Footer() {
  const footerRef = useRef(null)
  const reduceMotion = Boolean(useReducedMotion())

  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ['start end', 'end end'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.75], [0.45, 1])
  const y = useTransform(scrollYProgress, [0, 0.75], [16, 0])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <m.footer
      ref={footerRef}
      style={{
        opacity: reduceMotion ? 1 : opacity,
        y: reduceMotion ? 0 : y,
      }}
      className="footer"
    >
      <div className="footer-left">
        <Logo />
        <span className="footer-copy">
          Designed and built by Gaurav Rajput.
        </span>
      </div>

      <div className="footer-links">
        <Link to="/about">About</Link>
        <Link to="/education">Education</Link>
        <Link to="/experience">Experience</Link>
        <Link to="/projects">Projects</Link>
        <Link to="/skills">Skills</Link>
        <Link to="/resume">Resume</Link>
        <Link to="/contact">Contact</Link>
        <ExternalLink href={GITHUB_URL} className="footer-ext">GitHub</ExternalLink>
        <ExternalLink href={LINKEDIN_URL} className="footer-ext">LinkedIn</ExternalLink>
        <button
          className="top"
          onClick={scrollToTop}
          aria-label="Scroll back to top of page"
        >
          <ChevronUp size={16} aria-hidden="true" />
          <span>Top</span>
        </button>
      </div>
    </m.footer>
  )
}
