import { useCallback, useRef, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Footer from './Footer.jsx'
import Header from './Header.jsx'
import CommandPalette from '../navigation/CommandPalette.jsx'
import ScrollToTop from '../common/ScrollToTop.jsx'
import ScrollProgress from '../animation/ScrollProgress.jsx'
import PageIntro from '../animation/PageIntro.jsx'
import PageIntroOverlay from '../animation/PageIntroOverlay.jsx'
import { useCommandPalette } from '../../hooks/useCommandPalette.js'
import { useRouteTransition } from '../../hooks/useRouteTransition.js'

export default function Layout() {
  const [isPaletteOpen, setPaletteOpen] = useState(false)
  const [isMenuOpen, setMenuOpen] = useState(false)
  const paletteTriggerRef = useRef(null)
  const location = useLocation()

  // Central route-transition state
  const {
    transitionId,
    phase,
    isIntroActive,
    isPageRevealed,
    activeConfig,
    handleBannerEntranceComplete,
    handleBannerExitComplete,
    handleOverlayExitComplete,
  } = useRouteTransition(location.pathname)

  // Ensure mobile menu closes when route changes
  const [prevPath, setPrevPath] = useState(location.pathname)
  if (location.pathname !== prevPath) {
    setPrevPath(location.pathname)
    setMenuOpen(false)
  }

  const openPalette = useCallback(() => setPaletteOpen(true), [])
  const closePalette = useCallback(() => {
    setPaletteOpen(false)
    window.requestAnimationFrame(() => {
      paletteTriggerRef.current?.focus()
    })
  }, [])

  useCommandPalette(isPaletteOpen, openPalette, closePalette)

  return (
    <div className="app-shell">
      {/* Full-screen dedicated route intro overlay */}
      {isIntroActive && (
        <PageIntroOverlay
          config={activeConfig}
          phase={phase}
          transitionId={transitionId}
          onBannerEntranceComplete={handleBannerEntranceComplete}
          onBannerExitComplete={handleBannerExitComplete}
          onOverlayExitComplete={handleOverlayExitComplete}
        />
      )}

      <a className="skip" href="#main">
        Skip to content
      </a>
      <ScrollProgress />
      <ScrollToTop />
      <Header
        isMenuOpen={isMenuOpen}
        onMenuToggle={() => setMenuOpen((open) => !open)}
        onPaletteOpen={openPalette}
        paletteTriggerRef={paletteTriggerRef}
      />
      <div className="page-content-wrapper">
        <PageIntro
          pathname={location.pathname}
          isPageRevealed={isPageRevealed}
        >
          <Outlet />
        </PageIntro>
      </div>
      <Footer />
      <CommandPalette open={isPaletteOpen} onClose={closePalette} />
    </div>
  )
}
