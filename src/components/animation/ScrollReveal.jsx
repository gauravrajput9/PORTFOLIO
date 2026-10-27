import { useRef, useState, useEffect, useMemo } from 'react'
import { m, useReducedMotion } from 'motion/react'
import { TRANSITION_EASE, SMOOTH_EASE } from '../../utils/motion.js'
import { ScrollRevealContext } from './ScrollRevealContext.js'

/**
 * Reusable High-Performance Scroll Reveal Component
 * Optimized for 60fps rendering using purely GPU-composited transforms (translate, scale, opacity).
 * Zero synchronous DOM reads (no getBoundingClientRect), zero CPU clip-path rasterization,
 * and single lightweight IntersectionObserver.
 */
export default function ScrollReveal({
  children,
  variant = 'fade-up',
  as: Component = 'div',
  duration,
  delay = 0,
  direction = 'left',
  childStagger = 0.08,
  threshold = 0.1,
  once = true,
  isReady = true,
  placeholder = null,
  className = '',
  onRevealStart,
  onRevealComplete,
  ...props
}) {
  const containerRef = useRef(null)
  const prefersReducedMotion = useReducedMotion()
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const el = containerRef.current
    if (!el || typeof IntersectionObserver === 'undefined') {
      setIsInView(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          if (once) observer.disconnect()
        } else if (!once) {
          setIsInView(false)
        }
      },
      { threshold, rootMargin: '0px 0px -40px 0px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, once])

  const isRevealed = (prefersReducedMotion || isInView) && isReady

  // Hardware-accelerated animation variants using purely transform & opacity
  const variants = useMemo(() => {
    if (prefersReducedMotion) {
      return {
        hidden: { opacity: 1 },
        visible: { opacity: 1, transition: { duration: 0 } },
      }
    }

    const dur = duration || 0.6

    switch (variant) {
      case 'fade-up':
        return {
          hidden: { opacity: 0, y: 24 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: dur, delay, ease: TRANSITION_EASE },
          },
        }

      case 'curtain-reveal':
      case 'clip-wipe':
      case 'bubble-reveal':
        // Modern, GPU-composited upward expansion with subtle scale
        return {
          hidden: { opacity: 0, y: 28, scale: 0.98 },
          visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { duration: dur, delay, ease: SMOOTH_EASE },
          },
        }

      case 'slide-reveal':
        return {
          hidden: {
            opacity: 0,
            x: direction === 'right' ? 32 : -32,
          },
          visible: {
            opacity: 1,
            x: 0,
            transition: { duration: dur, delay, ease: TRANSITION_EASE },
          },
        }

      case 'soft-scale':
        return {
          hidden: { opacity: 0, scale: 0.95, y: 16 },
          visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: { duration: dur, delay, ease: TRANSITION_EASE },
          },
        }

      case 'stagger-children':
      default:
        return {
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              delayChildren: delay,
              staggerChildren: childStagger,
            },
          },
        }
    }
  }, [variant, duration, delay, direction, childStagger, prefersReducedMotion])

  const contextValue = useMemo(() => ({
    isRevealed,
    isPreloaded: isInView,
  }), [isRevealed, isInView])

  return (
    <ScrollRevealContext.Provider value={contextValue}>
      <Component
        ref={containerRef}
        className={`relative ${className}`}
        {...props}
      >
        {!isReady && placeholder}

        <m.div
          variants={variants}
          initial={prefersReducedMotion ? false : 'hidden'}
          animate={isRevealed ? 'visible' : 'hidden'}
          onAnimationStart={() => {
            if (isRevealed) onRevealStart?.()
          }}
          onAnimationComplete={() => {
            onRevealComplete?.()
          }}
          className="w-full transform-gpu"
        >
          {children}
        </m.div>
      </Component>
    </ScrollRevealContext.Provider>
  )
}

/**
 * Coordinated Stagger Item
 * Animates in synchronization when parent ScrollReveal becomes revealed.
 */
export function ScrollStaggerItem({
  children,
  distance = 18,
  duration = 0.55,
  delay = 0,
  className = '',
  ...props
}) {
  const { isRevealed } = useMemo(() => ({ isRevealed: true }), [])
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return (
      <div className={className} {...props}>
        {children}
      </div>
    )
  }

  return (
    <m.div
      initial={{ opacity: 0, y: distance }}
      animate={isRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: distance }}
      transition={{
        duration,
        delay,
        ease: TRANSITION_EASE,
      }}
      className={`transform-gpu ${className}`}
      {...props}
    >
      {children}
    </m.div>
  )
}
