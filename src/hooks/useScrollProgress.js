import { useScroll, useReducedMotion } from 'motion/react'

/**
 * Custom hook to track scroll progress of a target element with
 * reduced motion support, clamped progress values, and zero layout thrashing.
 *
 * @param {React.RefObject} targetRef - Reference to the target DOM element.
 * @param {Object} options - Configuration options passed to Motion's useScroll.
 * @param {Array<string>} [options.offset=['start 0.85', 'start 0.25']] - Viewport intersection offsets.
 * @returns {{ scrollYProgress: import('motion/react').MotionValue<number>, reduceMotion: boolean, scrollY: import('motion/react').MotionValue<number>, isMobile: boolean }}
 */
export function useScrollProgress(targetRef, options = {}) {
  const {
    offset = ['start 0.85', 'start 0.25'],
    ...restOptions
  } = options

  const reduceMotion = Boolean(useReducedMotion())
  const isMobile = typeof window !== 'undefined' ? window.innerWidth < 1024 : false

  const { scrollYProgress, scrollY } = useScroll({
    target: targetRef,
    offset,
    ...restOptions,
  })

  return {
    scrollYProgress,
    reduceMotion,
    scrollY,
    isMobile,
  }
}

