import { useEffect, useMemo, useRef, useState } from 'react'
import { useReducedMotion } from 'motion/react'

/**
 * Hero Section With Flickering Lights
 * Inspired by Aceternity UI Hero Section With Flickering Lights.
 * Creates a broad, cinematic developer-grid backdrop with a subtle radial focus
 * behind the headline, atmospheric white/violet/indigo highlights, and 100%
 * GPU-accelerated CSS animations.
 *
 * Automatically pauses all CSS animations when scrolled offscreen to guarantee 60fps.
 * Zero React state-thrashing or setInterval re-renders.
 */
export default function FlickeringLightsGrid({
  rows = 8,
  cols = 16,
  className = '',
}) {
  const containerRef = useRef(null)
  const prefersReducedMotion = useReducedMotion()
  const [isInView, setIsInView] = useState(true)

  // Pause CSS animations when offscreen to consume 0 CPU/GPU cycles
  useEffect(() => {
    const el = containerRef.current
    if (!el || typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
      },
      { threshold: 0.02 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Generate deterministic grid nodes with organic timing and color balance
  const nodes = useMemo(() => {
    const list = []
    const centerR = (rows - 1) / 2
    const centerC = (cols - 1) / 2
    const maxDist = Math.sqrt(Math.pow(centerR, 2) + Math.pow(centerC, 2))

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const id = `${r}-${c}`
        const dist = Math.sqrt(Math.pow(r - centerR, 2) + Math.pow(c - centerC, 2))
        const normDist = dist / maxDist

        // Deterministic pseudo-random seed
        const pseudoRand = Math.sin(r * 17.13 + c * 89.71) * 43758.5453
        const randVal = pseudoRand - Math.floor(pseudoRand)

        // Palette distribution: 70% crisp white, 18% violet, 12% indigo
        let color = '#ffffff'
        let glowColor = 'rgba(255, 255, 255, 0.45)'
        let type = 'white'
        if (randVal > 0.85) {
          color = '#a78bfa'
          glowColor = 'rgba(167, 139, 250, 0.75)'
          type = 'violet'
        } else if (randVal > 0.72) {
          color = '#6366f1'
          glowColor = 'rgba(99, 102, 241, 0.7)'
          type = 'indigo'
        }

        // Bulbs are distributed more densely toward center and subtly toward edges
        const isBulb = randVal > 0.38 || normDist < 0.45
        const size = randVal > 0.8 ? 3.2 : randVal > 0.4 ? 2.4 : 1.8
        const baseOpacity = randVal > 0.75 ? 0.65 : randVal > 0.4 ? 0.42 : 0.25
        const pulseOpacity = Math.min(1, baseOpacity + (randVal > 0.5 ? 0.45 : 0.3))
        const pulseScale = randVal > 0.7 ? 1.4 : 1.25

        // Varied animation duration and delay for organic, non-repeating twinkle
        const duration = 2.8 + (randVal * 2.6) // 2.8s to 5.4s
        const delay = (randVal * 3.2) // 0s to 3.2s

        list.push({
          id,
          r,
          c,
          isBulb,
          color,
          glowColor,
          type,
          size,
          baseOpacity,
          pulseOpacity,
          pulseScale,
          duration,
          delay,
        })
      }
    }
    return list
  }, [rows, cols])

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none absolute inset-0 overflow-hidden select-none z-0 ${className} ${
        isInView ? '' : 'paused-lights'
      }`}
      aria-hidden="true"
    >
      {/* 1. Perspective Matrix Grid Lines with Radial Vignette */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: `${100 / cols}% ${100 / rows}%`,
          maskImage: 'radial-gradient(ellipse 75% 65% at 50% 40%, black 20%, transparent 85%)',
          WebkitMaskImage: 'radial-gradient(ellipse 75% 65% at 50% 40%, black 20%, transparent 85%)',
        }}
      />

      {/* 2. Atmospheric Radial Focus Halo behind central headline */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[380px] rounded-full blur-[110px] pointer-events-none opacity-25"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(167, 139, 250, 0.4) 0%, rgba(99, 102, 241, 0.2) 45%, transparent 75%)',
        }}
      />

      {/* 3. Deep Atmospheric Corner Glow */}
      <div
        className="absolute -top-24 right-1/4 w-[420px] h-[280px] rounded-full blur-[90px] pointer-events-none opacity-15"
        style={{
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.35) 0%, transparent 70%)',
        }}
      />

      {/* 4. Broad Field of Luminous Flickering Nodes */}
      <div
        className="relative w-full h-full overflow-hidden"
        style={{
          maskImage: 'radial-gradient(ellipse 80% 70% at 50% 42%, black 25%, transparent 90%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 50% 42%, black 25%, transparent 90%)',
        }}
      >
        {nodes.map((node) => {
          if (!node.isBulb) return null

          const leftPercent = (node.c / (cols - 1)) * 100
          const topPercent = (node.r / (rows - 1)) * 100

          return (
            <div
              key={node.id}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `${leftPercent}%`,
                top: `${topPercent}%`,
              }}
            >
              {/* Outer Radiant Glow Halo */}
              <div
                className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none ${
                  prefersReducedMotion ? '' : 'flicker-halo'
                }`}
                style={{
                  width: `${node.size * 6.5}px`,
                  height: `${node.size * 6.5}px`,
                  backgroundColor: node.glowColor,
                  filter: 'blur(3.5px)',
                  opacity: prefersReducedMotion ? node.baseOpacity * 0.4 : node.baseOpacity * 0.5,
                  animationDuration: prefersReducedMotion ? undefined : `${node.duration}s`,
                  animationDelay: prefersReducedMotion ? undefined : `${node.delay}s`,
                  animationPlayState: isInView ? 'running' : 'paused',
                }}
              />

              {/* Core Star Node with GPU-Composited Shimmer */}
              <div
                className={`relative rounded-full ${
                  prefersReducedMotion ? '' : 'flicker-core'
                }`}
                style={{
                  width: `${node.size}px`,
                  height: `${node.size}px`,
                  backgroundColor: node.color,
                  boxShadow: `0 0 ${node.size * 2.5}px ${node.glowColor}`,
                  opacity: node.baseOpacity,
                  animationDuration: prefersReducedMotion ? undefined : `${node.duration}s`,
                  animationDelay: prefersReducedMotion ? undefined : `${node.delay}s`,
                  animationPlayState: isInView ? 'running' : 'paused',
                }}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
