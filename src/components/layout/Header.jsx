import { useEffect, useRef, useState } from 'react'
import { Menu, Search, X } from 'lucide-react'
import { AnimatePresence, m } from 'motion/react'
import { NavLink, useLocation } from 'react-router-dom'
import { navigationItems } from '../../data/navigation.js'
import Logo from '../common/Logo.jsx'
import { TRANSITION_EASE } from '../../utils/motion.js'

export default function Header({
  isMenuOpen,
  onMenuToggle,
  onPaletteOpen,
  paletteTriggerRef,
}) {
  const location = useLocation()
  const [isMac] = useState(() =>
    typeof navigator !== 'undefined' &&
    /(Mac|iPhone|iPod|iPad)/i.test(navigator.userAgent || '')
  )
  const [isScrolled, setIsScrolled] = useState(false)
  const isScrolledRef = useRef(false)

  useEffect(() => {
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrolled = window.scrollY > 20
          if (scrolled !== isScrolledRef.current) {
            isScrolledRef.current = scrolled
            setIsScrolled(scrolled)
          }
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === 'Escape' && isMenuOpen) {
        onMenuToggle()
      }
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [isMenuOpen, onMenuToggle])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      const originalOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = originalOverflow
      }
    }
  }, [isMenuOpen])

  const isItemActive = (to) => {
    if (to === '/') {
      return location.pathname === '/' && !location.hash
    }
    if (to.includes('#')) {
      const [path, hash] = to.split('#')
      return location.pathname === path && location.hash === `#${hash}`
    }
    return location.pathname === to && !location.hash
  }

  return (
    <header className={isScrolled ? 'scrolled' : ''}>
      <nav className="nav" aria-label="Main navigation">
        <div className="nav-brand">
          <Logo />
        </div>

        <div className="desktop-links" aria-label="Main links">
          {navigationItems.map((item) => {
            const active = isItemActive(item.to)
            return (
              <NavLink
                key={item.label}
                to={item.to}
                className={`nav-link ${active ? 'active' : ''}`}
                aria-current={active ? 'page' : undefined}
              >
                <span>{item.label}</span>
              </NavLink>
            )
          })}
        </div>

        <div className="nav-actions">
          <NavLink
            to="/resume"
            className={`button resume-btn ${location.pathname === '/resume' ? 'active' : ''}`}
            aria-label="View Resume page"
          >
            Resume
          </NavLink>

          <button
            ref={paletteTriggerRef}
            className="icon-btn"
            onClick={onPaletteOpen}
            aria-label="Open command palette (Ctrl+K or Cmd+K)"
            title="Open command palette"
          >
            <Search size={16} aria-hidden="true" />
            <kbd>{isMac ? '⌘K' : 'Ctrl+K'}</kbd>
          </button>

          <button
            className="menu-btn"
            onClick={onMenuToggle}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <m.div
            id="mobile-menu"
            className="mobile-menu"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: TRANSITION_EASE }}
          >
            {navigationItems.map((item) => {
              const active = isItemActive(item.to)
              return (
                <NavLink
                  key={item.label}
                  to={item.to}
                  onClick={onMenuToggle}
                  className={`mobile-nav-link ${active ? 'active' : ''}`}
                  aria-current={active ? 'page' : undefined}
                >
                  {item.label}
                </NavLink>
              )
            })}
            <NavLink
              to="/resume"
              className={`mobile-resume-link ${location.pathname === '/resume' ? 'active' : ''}`}
              onClick={onMenuToggle}
            >
              Resume &amp; Credentials
            </NavLink>
            <button
              type="button"
              className="mobile-search-btn"
              onClick={() => {
                onMenuToggle()
                onPaletteOpen()
              }}
              aria-label="Search pages and actions"
            >
              <Search size={16} aria-hidden="true" />
              <span>Search actions ({isMac ? '⌘K' : 'Ctrl+K'})</span>
            </button>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  )
}
