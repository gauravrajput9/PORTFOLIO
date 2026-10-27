export const TRANSITION_EASE = [0.22, 1, 0.36, 1]
export const SMOOTH_EASE = [0.16, 1, 0.3, 1]

export const fadeInUp = (distance = 24, delay = 0, duration = 0.75) => ({
  hidden: {
    opacity: 0,
    y: distance,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration,
      delay,
      ease: TRANSITION_EASE,
    },
  },
})

export const fadeIn = (delay = 0, duration = 0.7) => ({
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration,
      delay,
      ease: TRANSITION_EASE,
    },
  },
})

export const staggerContainer = (staggerChildren = 0.18, delayChildren = 0.08) => ({
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
})

export const staggerItem = (distance = 20, duration = 0.7) => ({
  hidden: {
    opacity: 0,
    y: distance,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration,
      ease: TRANSITION_EASE,
    },
  },
})

export const maskReveal = (delay = 0, duration = 0.85) => ({
  hidden: {
    y: '100%',
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration,
      delay,
      ease: TRANSITION_EASE,
    },
  },
})

export const heroVariants = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  },
  eyebrow: {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: TRANSITION_EASE },
    },
  },
  title: {
    hidden: { opacity: 0, y: 32 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.95, ease: TRANSITION_EASE },
    },
  },
  lede: {
    hidden: { opacity: 0, y: 22 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: TRANSITION_EASE },
    },
  },
  ctas: {
    hidden: { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.75, ease: TRANSITION_EASE },
    },
  },
  panel: {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.85, ease: TRANSITION_EASE, delay: 0.25 },
    },
  },
}
