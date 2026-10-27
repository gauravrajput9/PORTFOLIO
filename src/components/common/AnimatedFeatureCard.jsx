import { useState, useId } from 'react'
import { m, useReducedMotion } from 'motion/react'
import { Sparkles, Layers, Cpu, CheckCircle2 } from 'lucide-react'
import TechIcon from './TechIcon.jsx'

/**
 * Animated Feature Card
 * Inspired by Aceternity UI Feature Block Animated Card.
 *
 * Prominent focal point for the Technical Focus section:
 * - High-contrast circuit board bus traces with glowing junction points.
 * - Interactive technology nodes with consistent hover and keyboard-focus states.
 * - Live architectural role inspector deck.
 * - GPU-composited vertical light beam that never obscures text or icons.
 * - Fully responsive across mobile, tablet, and desktop viewports.
 */
export default function AnimatedFeatureCard({
  badge = 'Architecture & Stack',
  title = 'Full-Stack Ecosystem',
  description = 'Production technologies connected across user interface, server API pipelines, and persistent storage.',
  className = '',
}) {
  const prefersReducedMotion = useReducedMotion()
  const filterId = useId()

  // 9 Core technologies actually used in the verified portfolio projects
  const coreTechnologies = [
    {
      id: 'react',
      name: 'React',
      category: 'Frontend UI',
      desc: 'Component architecture, state hooks, and virtual DOM reconciliation across portfolio and client apps.',
      layer: 'Client Presentation',
    },
    {
      id: 'nextjs',
      name: 'Next.js',
      category: 'Full-Stack',
      desc: 'Server-side rendering, API routes, and optimized streaming builds in AI Resume Analyzer.',
      layer: 'Hybrid Framework',
    },
    {
      id: 'typescript',
      name: 'TypeScript',
      category: 'Language',
      desc: 'Static typing, interface contracts, and refactoring resilience in modern web modules.',
      layer: 'Type Safety',
    },
    {
      id: 'nodejs',
      name: 'Node.js',
      category: 'Runtime',
      desc: 'Asynchronous event-driven backend service runtime powering high-throughput APIs.',
      layer: 'Backend Engine',
    },
    {
      id: 'express',
      name: 'Express.js',
      category: 'REST APIs',
      desc: 'Middleware routing, JSON endpoints, and authentication guards for DevPilot & LMS.',
      layer: 'API Gateway',
      isCenter: true,
    },
    {
      id: 'mongodb',
      name: 'MongoDB',
      category: 'Database',
      desc: 'Document schema modeling, Mongoose ODM, and persistent database storage.',
      layer: 'Data Layer',
    },
    {
      id: 'tailwind',
      name: 'Tailwind CSS',
      category: 'Styling',
      desc: 'Utility-first responsive layouts, theme tokens, and editorial dark mode design.',
      layer: 'Design System',
    },
    {
      id: 'docker',
      name: 'Docker',
      category: 'DevOps',
      desc: 'Containerized environments and reproducible runtimes for isolated code sandboxing.',
      layer: 'Environment',
    },
    {
      id: 'git',
      name: 'Git / GitHub',
      category: 'VCS',
      desc: 'Atomic commit workflows, branch management, and continuous integration pipelines.',
      layer: 'Version Control',
    },
  ]

  // Default to central Express.js node if none hovered
  const [activeTech, setActiveTech] = useState(coreTechnologies[4])

  // The grid enters as one coordinated composition, instead of nine unrelated
  // entrance effects. Motion owns only this initial reveal; CSS remains
  // responsible for immediate hover/focus feedback afterwards.
  const technologyGrid = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.055,
        delayChildren: 0.12,
      },
    },
  }

  const technologyNode = {
    hidden: { opacity: 0, y: 12, scale: 0.94 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: 'spring', stiffness: 330, damping: 25, mass: 0.6 },
    },
  }

  return (
    <div
      className={`animated-card group relative rounded-2xl border border-line-light bg-gradient-to-br from-[#121124]/95 via-[#0c0b18]/95 to-[#07060e] p-6 sm:p-8 shadow-[0_24px_60px_-15px_rgba(0,0,0,0.85)] backdrop-blur-md overflow-hidden transition-all duration-300 hover:border-violet/40 hover:shadow-[0_24px_60px_-10px_rgba(167,139,250,0.2)] ${className}`}
      role="region"
      aria-label="Core Technology Feature Card"
    >
      {/* Background Architectural Grid Pattern */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: '28px 28px',
        }}
      />

      {/* GPU-Composited Vertical Glowing Light Beam (Aceternity Signature) */}
      {!prefersReducedMotion && (
        <m.div
          className="absolute inset-x-0 h-32 top-0 pointer-events-none transform-gpu z-0 opacity-80"
          initial={{ y: '-100%' }}
          animate={{ y: ['-100%', '380%'] }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            background:
              'linear-gradient(to bottom, transparent, rgba(167, 139, 250, 0.16) 45%, rgba(99, 102, 241, 0.28) 75%, transparent 100%)',
            filter: 'blur(8px)',
          }}
          aria-hidden="true"
        />
      )}

      {/* Card Header with Verified Badges */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-violet/10 border border-violet/25 text-violet text-[11px] font-mono font-semibold uppercase tracking-wider mb-2.5">
            <Sparkles size={12} aria-hidden="true" />
            <span>{badge}</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold font-display tracking-tight text-white m-0">
            {title}
          </h3>
          <p className="text-[13.5px] text-muted leading-relaxed mt-1.5 max-w-md m-0">
            {description}
          </p>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-2/90 border border-line text-[11.5px] font-mono text-muted shrink-0 self-start">
          <Cpu size={14} className="text-violet" aria-hidden="true" />
          <span>9 Core Tools</span>
        </div>
      </div>

      {/* Interactive Tech Nodes Grid with Circuit Bus Lines */}
      <div className="relative z-10 my-4 p-4 sm:p-5 rounded-xl border border-line bg-[#090814]/90 overflow-hidden">
        {/* Circuit Bus Interconnect Lines */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none opacity-25"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id={`${filterId}-lineGrad`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#6366f1" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.4" />
            </linearGradient>
          </defs>
          {/* Vertical Bus Lines */}
          <line x1="33.3%" y1="0" x2="33.3%" y2="100%" stroke={`url(#${filterId}-lineGrad)`} strokeDasharray="3 3" />
          <line x1="66.6%" y1="0" x2="66.6%" y2="100%" stroke={`url(#${filterId}-lineGrad)`} strokeDasharray="3 3" />
          {/* Horizontal Bus Lines */}
          <line x1="0" y1="33.3%" x2="100%" y2="33.3%" stroke={`url(#${filterId}-lineGrad)`} strokeDasharray="3 3" />
          <line x1="0" y1="66.6%" x2="100%" y2="66.6%" stroke={`url(#${filterId}-lineGrad)`} strokeDasharray="3 3" />
          {/* Intersection Circuit Junction Nodes */}
          <circle cx="33.3%" cy="33.3%" r="2.5" fill="#a78bfa" opacity="0.6" />
          <circle cx="66.6%" cy="33.3%" r="2.5" fill="#a78bfa" opacity="0.6" />
          <circle cx="33.3%" cy="66.6%" r="2.5" fill="#a78bfa" opacity="0.6" />
          <circle cx="66.6%" cy="66.6%" r="2.5" fill="#a78bfa" opacity="0.6" />
        </svg>

        {/* 3x3 Technology Nodes Grid */}
        <m.div
          className="grid grid-cols-3 gap-3 relative z-10"
          variants={prefersReducedMotion ? undefined : technologyGrid}
          initial={prefersReducedMotion ? false : 'hidden'}
          animate="visible"
        >
          {coreTechnologies.map((tech) => {
            const isSelected = activeTech?.id === tech.id

            return (
              <m.button
                key={tech.id}
                type="button"
                onMouseEnter={() => setActiveTech(tech)}
                onFocus={() => setActiveTech(tech)}
                variants={prefersReducedMotion ? undefined : technologyNode}
                className={`group/node relative flex flex-col items-center justify-center p-3 sm:p-3.5 rounded-lg border text-center transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'border-violet bg-violet/15 shadow-[0_0_18px_rgba(167,139,250,0.35)] scale-[1.03]'
                    : tech.isCenter
                      ? 'border-line-light bg-surface-2/90 hover:border-violet/40 hover:bg-surface-hover'
                      : 'border-line bg-surface/75 hover:bg-surface-hover hover:border-line-light'
                }`}
                aria-label={`${tech.name}: ${tech.category} (${tech.layer})`}
              >
                {/* Tech Icon with Glow */}
                <div className="relative">
                  <TechIcon name={tech.id} className="w-6 h-6 sm:w-7 sm:h-7" />
                  {isSelected && (
                    <span
                      className="absolute inset-0 rounded-full blur-[8px] bg-violet/50 -z-10"
                      aria-hidden="true"
                    />
                  )}
                </div>

                {/* Tech Name Label */}
                <span className="font-mono text-[11px] sm:text-xs font-semibold text-text mt-2 leading-tight">
                  {tech.name}
                </span>

                {/* Category Subtitle */}
                <span className="text-[9.5px] font-mono text-muted tracking-tight mt-0.5">
                  {tech.category}
                </span>
              </m.button>
            )
          })}
        </m.div>

        {/* Live Architecture Inspector Deck */}
        <div className="mt-4 pt-3.5 border-t border-line/60 min-h-[56px] flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs">
          {activeTech ? (
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-text animate-[fadeIn_0.15s_ease-out]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-violet shrink-0 animate-pulse" />
                <span className="font-mono font-semibold text-violet text-sm">
                  {activeTech.name}
                </span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-white/[0.05] border border-line text-muted">
                  {activeTech.layer}
                </span>
              </div>
              <span className="text-muted text-[12px] leading-relaxed">
                {activeTech.desc}
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-muted text-[11.5px] font-mono">
              <Layers size={13} className="text-violet/70 shrink-0" aria-hidden="true" />
              <span>Hover or focus any technology node to inspect architectural role</span>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Architectural Highlights Bar */}
      <div className="relative z-10 flex flex-wrap items-center gap-2 pt-2 text-[11px] font-mono text-muted">
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-white/[0.03] border border-line text-white">
          <CheckCircle2 size={12} className="text-emerald-400" />
          React 19 &amp; Next.js Client
        </span>
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-white/[0.03] border border-line text-white">
          <CheckCircle2 size={12} className="text-emerald-400" />
          Node.js REST Services
        </span>
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-white/[0.03] border border-line text-white">
          <CheckCircle2 size={12} className="text-emerald-400" />
          MongoDB Document Store
        </span>
      </div>
    </div>
  )
}
