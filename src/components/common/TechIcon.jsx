/**
 * High-quality, dark-mode optimized SVG icons for core developer technologies.
 */
export default function TechIcon({ name, className = 'w-5 h-5', ...props }) {
  const normalized = (name || '').toLowerCase().trim()

  switch (normalized) {
    case 'react':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-label="React" {...props}>
          <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61dafb" strokeWidth="1.5" />
          <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" stroke="#61dafb" strokeWidth="1.5" />
          <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" stroke="#61dafb" strokeWidth="1.5" />
          <circle cx="12" cy="12" r="1.8" fill="#61dafb" />
        </svg>
      )

    case 'next.js':
    case 'nextjs':
    case 'next':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-label="Next.js" {...props}>
          <circle cx="12" cy="12" r="10" fill="#000" stroke="rgba(255,255,255,0.2)" strokeWidth="1.2" />
          <path d="M9.5 8.5v7m0-7l7 9m-2-9v4.5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )

    case 'typescript':
    case 'ts':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-label="TypeScript" {...props}>
          <rect x="2" y="2" width="20" height="20" rx="4" fill="#3178c6" />
          <path d="M6 10h6m-3 0v7M14 14.5c.5.8 1.5 1.2 2.5 1 1-.2 1.5-.8 1.5-1.5s-.6-1.2-1.7-1.5c-1.5-.4-2.3-1-2.3-2.1 0-1.4 1.1-2.2 2.5-2.2 1 0 1.8.4 2.3 1.1" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )

    case 'javascript':
    case 'js':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-label="JavaScript" {...props}>
          <rect x="2" y="2" width="20" height="20" rx="4" fill="#f7df1e" />
          <path d="M9 13.5v2.5a1.8 1.8 0 0 1-3.6 0M14 16c.6.7 1.5 1 2.3.9 1-.1 1.7-.7 1.7-1.4 0-.8-.6-1.2-1.6-1.5-1.4-.4-2.2-1-2.2-2 0-1.4 1.1-2.2 2.5-2.2 1 0 1.8.4 2.3 1.1" stroke="#000" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )

    case 'node.js':
    case 'nodejs':
    case 'node':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-label="Node.js" {...props}>
          <path d="M12 2l8.5 4.9v9.8L12 21.6 3.5 16.7V6.9L12 2z" stroke="#5fa04e" strokeWidth="1.5" fill="rgba(95,160,78,0.1)" />
          <path d="M12 7v10M8.5 10.5l7 4M15.5 10.5l-7 4" stroke="#5fa04e" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      )

    case 'express':
    case 'express.js':
    case 'expressjs':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-label="Express" {...props}>
          <rect x="2" y="2" width="20" height="20" rx="5" fill="#161524" stroke="rgba(255,255,255,0.15)" strokeWidth="1.2" />
          <text x="12" y="16" fill="#fff" fontSize="10.5" fontFamily="monospace" fontWeight="bold" textAnchor="middle">ex</text>
        </svg>
      )

    case 'mongodb':
    case 'mongo':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-label="MongoDB" {...props}>
          <path d="M12 2C11.5 4 6 9.5 6 14.5a6 6 0 0 0 11.8 1.5c.1-.4.2-.8.2-1.5C18 9.5 12.5 4 12 2z" fill="rgba(71,162,72,0.15)" stroke="#47a248" strokeWidth="1.4" />
          <path d="M12 2.5v18.5" stroke="#47a248" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
      )

    case 'tailwind':
    case 'tailwindcss':
    case 'tailwind css':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-label="Tailwind CSS" {...props}>
          <path d="M6 9c1.5-3 3.5-3.5 6-1.5 1.5 1.2 2.5 1.8 4 1.5 2-.4 3.5-1.8 4.5-3.5-1.5 3-3.5 3.5-6 1.5-1.5-1.2-2.5-1.8-4-1.5-2 .4-3.5 1.8-4.5 3.5zM2 15c1.5-3 3.5-3.5 6-1.5 1.5 1.2 2.5 1.8 4 1.5 2-.4 3.5-1.8 4.5-3.5-1.5 3-3.5 3.5-6 1.5-1.5-1.2-2.5-1.8-4-1.5-2 .4-3.5 1.8-4.5 3.5z" fill="#38bdf8" />
        </svg>
      )

    case 'docker':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-label="Docker" {...props}>
          <rect x="5" y="10" width="2" height="2" fill="#2496ed" rx="0.3" />
          <rect x="8" y="10" width="2" height="2" fill="#2496ed" rx="0.3" />
          <rect x="11" y="10" width="2" height="2" fill="#2496ed" rx="0.3" />
          <rect x="8" y="7.5" width="2" height="2" fill="#2496ed" rx="0.3" />
          <rect x="11" y="7.5" width="2" height="2" fill="#2496ed" rx="0.3" />
          <path d="M2 13.5c1 0 2 .5 3 .5s2-.5 3-.5 2 .5 3 .5 2-.5 3-.5 2 .5 3 .5 2-.5 3-.5c1 0 1.8.4 2.2.8.4-1.4 0-2.8-1-3.8h-1.5c-.3-1-1-1.5-1.8-1.5-.4 0-.7.1-1 .3V12H3c-.6 0-1 .4-1 1v.5z" stroke="#2496ed" strokeWidth="1.3" fill="rgba(36,150,237,0.15)" strokeLinejoin="round" />
        </svg>
      )

    case 'git':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-label="Git" {...props}>
          <rect x="2" y="2" width="20" height="20" rx="4" fill="rgba(240,80,50,0.1)" stroke="#f05032" strokeWidth="1.2" />
          <circle cx="8" cy="9" r="1.7" fill="#f05032" />
          <circle cx="16" cy="9" r="1.7" fill="#f05032" />
          <circle cx="12" cy="16" r="1.7" fill="#f05032" />
          <path d="M8 10.7v2.6a2 2 0 0 0 2 2h2m4-4.6v-1a2 2 0 0 0-2-2H9.7" stroke="#f05032" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      )

    case 'github':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-label="GitHub" {...props}>
          <path d="M12 .7a11.3 11.3 0 0 0-3.57 22c.57.1.77-.25.77-.55v-2.14c-3.15.68-3.81-1.34-3.81-1.34-.52-1.3-1.26-1.65-1.26-1.65-1.03-.7.08-.69.08-.69 1.14.08 1.74 1.17 1.74 1.17 1.01 1.73 2.66 1.23 3.3.94.1-.73.4-1.23.72-1.51-2.51-.29-5.15-1.25-5.15-5.58 0-1.23.44-2.24 1.16-3.03-.12-.28-.5-1.43.11-2.98 0 0 .95-.3 3.1 1.16a10.8 10.8 0 0 1 5.64 0c2.15-1.46 3.1-1.16 3.1-1.16.61 1.55.23 2.7.11 2.98.72.79 1.16 1.8 1.16 3.03 0 4.34-2.65 5.28-5.17 5.57.41.35.77 1.02.77 2.06v3.06c0 .3.2.66.78.55A11.3 11.3 0 0 0 12 .7z" />
        </svg>
      )

    case 'python':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-label="Python" {...props}>
          <path d="M11.9 2c-3.3 0-3.1 1.4-3.1 1.4v1.5h6.3v.9H6.8S4 5.6 4 9s2.5 3.3 2.5 3.3h1.5v-1.6s-.1-1.9 1.8-1.9h6.1s1.8 0 1.8-1.7V4.9s.3-2.9-5.8-2.9zm-1.8 1.6a.7.7 0 1 1 0 1.4.7.7 0 0 1 0-1.4z" fill="#387eb8" />
          <path d="M12.1 22c3.3 0 3.1-1.4 3.1-1.4v-1.5H8.9v-.9h8.3s2.8.2 2.8-3.2-2.5-3.3-2.5-3.3H16v1.6s.1 1.9-1.8 1.9H8.1s-1.8 0-1.8 1.7v3.3s-.3 2.9 5.8 2.9zm1.8-1.6a.7.7 0 1 1 0-1.4.7.7 0 0 1 0 1.4z" fill="#ffe052" />
        </svg>
      )

    case 'c++':
    case 'cpp':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-label="C++" {...props}>
          <rect x="2" y="2" width="20" height="20" rx="4" fill="#00599c" />
          <path d="M10.5 8.5a4 4 0 1 0 0 7M14 12h3M15.5 10.5v3M18.5 12h3M20 10.5v3" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )

    case 'vite':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-label="Vite" {...props}>
          <path d="M20.5 4.5L12.5 22 3.5 6.5l8.5-3 8.5 1z" stroke="#bd34fe" strokeWidth="1.4" fill="rgba(189,52,254,0.12)" strokeLinejoin="round" />
          <path d="M12 3.5l-3 7h4l-2 5.5 5.5-6.5h-4l2-6z" fill="#ffc331" />
        </svg>
      )

    case 'postman':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-label="Postman" {...props}>
          <circle cx="12" cy="12" r="9.5" fill="#ff6c37" />
          <path d="M15.5 8.5l-6.5 4 3 1.5 3.5-5.5zM12 14l-2 2.5 1.5-2.5H12z" fill="#fff" />
        </svg>
      )

    case 'gemini':
    case 'ai':
    case 'groq':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-label="AI / LLM" {...props}>
          <path d="M12 2C12 7.5 7.5 12 2 12c5.5 0 10 4.5 10 10 0-5.5 4.5-10 10-10-5.5 0-10-4.5-10-10z" fill="url(#ai-grad)" />
          <defs>
            <linearGradient id="ai-grad" x1="2" y1="2" x2="22" y2="22">
              <stop stopColor="#a78bfa" />
              <stop offset="1" stopColor="#38bdf8" />
            </linearGradient>
          </defs>
        </svg>
      )

    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.5" {...props}>
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.4" />
          <path d="M9 10l3 4 3-4" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
  }
}

