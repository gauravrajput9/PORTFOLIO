import { useCallback, useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'motion/react'
import { getRouteIntroConfig } from '../utils/routeIntro.js'

function checkReducedMotion(motionReduced) {
  if (motionReduced) return true
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }
  return false
}

/**
 * Central route transition coordinator.
 * Manages full-screen overlay lifecycle, scroll locking, and destination page reveal.
 *
 * Sequence:
 * Phase 1: 'entering' -> Overlay at z-index 9999, destination page hidden, title banner enters.
 * Phase 2: 'holding' (500ms) -> Title banner holds to establish page identity.
 *          'title-exiting' -> Title banner animates out while canvas remains 100% opaque.
 * Phase 3: 'overlay-exiting' -> Destination page revealed, scroll restored, overlay dissolves.
 *          'settled' -> Overlay unmounted from DOM, normal state.
 */
function shouldPlayIntro(pathname, reduceMotion) {
  if (reduceMotion) return false
  if (typeof window === 'undefined') return false
  if (pathname !== '/') return false
  try {
    if (sessionStorage.getItem('portfolio_intro_seen')) return false
    sessionStorage.setItem('portfolio_intro_seen', '1')
    return true
  } catch {
    return false
  }
}

export function useRouteTransition(pathname) {
  const motionReduced = useReducedMotion()
  const reduceMotion = checkReducedMotion(motionReduced)
  const holdTimerRef = useRef(null)
  const transitionIdRef = useRef(0)

  const initialIntro = shouldPlayIntro(pathname, reduceMotion)
  const [transitionId, setTransitionId] = useState(0)
  const [currentPathname, setCurrentPathname] = useState(pathname)
  const [phase, setPhase] = useState(() => (initialIntro ? 'entering' : 'settled'))
  const [isIntroActive, setIsIntroActive] = useState(() => initialIntro)
  // Destination content is ALWAYS revealed - never display: none
  const [isPageRevealed, setIsPageRevealed] = useState(true)
  const [activeConfig, setActiveConfig] = useState(() => getRouteIntroConfig(pathname))

  // Route change: Instant subsequent navigation with ZERO blocking overlay
  if (pathname !== currentPathname) {
    setCurrentPathname(pathname)
    setTransitionId((t) => t + 1)
    setActiveConfig(getRouteIntroConfig(pathname))
    // Standard navigation is immediately active and settled
    setIsIntroActive(false)
    setIsPageRevealed(true)
    setPhase('settled')
  }

  // Handle runtime toggle of prefers-reduced-motion during render
  const [prevReduceMotion, setPrevReduceMotion] = useState(reduceMotion)
  if (reduceMotion !== prevReduceMotion) {
    setPrevReduceMotion(reduceMotion)
    if (reduceMotion) {
      setIsIntroActive(false)
      setIsPageRevealed(true)
      setPhase('settled')
    }
  }

  // Sync transitionId ref and clean up pending timers
  useEffect(() => {
    transitionIdRef.current = transitionId
    if (holdTimerRef.current) {
      clearTimeout(holdTimerRef.current)
      holdTimerRef.current = null
    }
  }, [transitionId])

  // Handle scroll locking side effect in response to transition state (only during initial intro)
  useEffect(() => {
    if (isIntroActive && !reduceMotion) {
      document.documentElement.style.overflow = 'hidden'
      document.body.style.overflow = 'hidden'
    } else {
      document.documentElement.style.overflow = ''
      document.body.style.overflow = ''
    }

    return () => {
      document.documentElement.style.overflow = ''
      document.body.style.overflow = ''
      if (holdTimerRef.current) {
        clearTimeout(holdTimerRef.current)
      }
    }
  }, [isIntroActive, reduceMotion, transitionId])

  // Phase 1 -> Phase 2: Entrance animation has completed
  const handleBannerEntranceComplete = useCallback((id) => {
    if (id !== undefined && id !== transitionIdRef.current) return

    setPhase((currentPhase) => {
      if (currentPhase !== 'entering') return currentPhase
      return 'holding'
    })

    const currentId = transitionIdRef.current
    holdTimerRef.current = setTimeout(() => {
      if (transitionIdRef.current !== currentId) return
      setPhase('title-exiting')
    }, 350)
  }, [])

  // Phase 2 -> Phase 3: Title exit animation has completed
  const handleBannerExitComplete = useCallback((id) => {
    if (id !== undefined && id !== transitionIdRef.current) return

    // Phase 2 finished: reveal destination page and begin overlay exit
    setIsPageRevealed(true)
    document.documentElement.style.overflow = ''
    document.body.style.overflow = ''
    setPhase('overlay-exiting')
  }, [])

  // Phase 3 complete: Overlay has finished fading out
  const handleOverlayExitComplete = useCallback((id) => {
    if (id !== undefined && id !== transitionIdRef.current) return

    setPhase('settled')
    setIsIntroActive(false)
  }, [])

  return {
    transitionId,
    phase,
    isIntroActive,
    isPageRevealed,
    activeConfig,
    handleBannerEntranceComplete,
    handleBannerExitComplete,
    handleOverlayExitComplete,
  }
}
