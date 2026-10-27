import { m } from 'motion/react'
import { TRANSITION_EASE } from '../../utils/motion.js'

/**
 * Full-screen viewport-level page transition intro overlay.
 * Occupies entire viewport (position: fixed, inset: 0, 100vw, 100dvh).
 * Highest z-index (9999) covering header, footer, and page content.
 */
export default function PageIntroOverlay({
  config,
  phase,
  transitionId,
  onBannerEntranceComplete,
  onBannerExitComplete,
  onOverlayExitComplete,
}) {
  const isTitleExiting = phase === 'title-exiting' || phase === 'overlay-exiting'
  const isOverlayExiting = phase === 'overlay-exiting'

  return (
    <m.aside
      className="page-intro-overlay cursor-pointer"
      onClick={() => onOverlayExitComplete?.(transitionId)}
      title="Click anywhere to skip intro"
      aria-label={`${config.title} intro`}
      aria-live="polite"
      role="status"
      initial={{ opacity: 1 }}
      animate={{ opacity: isOverlayExiting ? 0 : 1 }}
      transition={{
        duration: 0.35,
        ease: TRANSITION_EASE,
      }}
      onAnimationComplete={() => {
        if (isOverlayExiting) {
          onOverlayExitComplete?.(transitionId)
        }
      }}
      style={{
        pointerEvents: isOverlayExiting ? 'none' : 'auto',
      }}
    >
      <m.div
        key={`${config.title}-${transitionId}`}
        className="page-editorial-banner"
        initial={{ opacity: 0, y: 32, scale: 0.98 }}
        animate={
          isTitleExiting
            ? { opacity: 0, y: -28, scale: 0.96 }
            : { opacity: 1, y: 0, scale: 1 }
        }
        transition={{
          duration: isTitleExiting ? 0.45 : 0.75,
          ease: TRANSITION_EASE,
        }}
        onAnimationComplete={() => {
          if (!isTitleExiting && phase === 'entering') {
            onBannerEntranceComplete?.(transitionId)
          } else if (isTitleExiting && phase === 'title-exiting') {
            onBannerExitComplete?.(transitionId)
          }
        }}
      >
        <div className="opening-meta-bar">
          <span>{config.eyebrow}</span>
          <span className="banner-center-tag">GAURAV RAJPUT · PORTFOLIO</span>
          <span>{config.meta}</span>
        </div>

        <div className="opening-headline-box">
          <h1 className="opening-huge-text">{config.title}</h1>
        </div>

        <div className="opening-footer-bar">
          <span className="opening-coords">COORD: 30.3165° N, 78.0322° E</span>
          <span className="opening-spec">{config.spec}</span>
          <span className="opening-index">{config.index}</span>
        </div>
      </m.div>
    </m.aside>
  )
}

