import TechIcon from './TechIcon.jsx'

/**
 * Logo Cloud — Multiple Rows
 * Inspired by Aceternity UI Logo Cloud Multiple Rows.
 * Renders multiple continuous marquee rows of verified developer technologies
 * moving in alternating directions with edge gradient masks.
 */
export default function LogoCloudMultipleRows({ className = '' }) {
  const row1 = [
    { name: 'React', id: 'react', label: 'React 19' },
    { name: 'Next.js', id: 'nextjs', label: 'Next.js' },
    { name: 'TypeScript', id: 'typescript', label: 'TypeScript' },
    { name: 'Node.js', id: 'nodejs', label: 'Node.js' },
    { name: 'Tailwind CSS', id: 'tailwind', label: 'Tailwind CSS' },
    { name: 'MongoDB', id: 'mongodb', label: 'MongoDB' },
    { name: 'Git', id: 'git', label: 'Git VCS' },
    { name: 'Postman', id: 'postman', label: 'Postman' },
  ]

  const row2 = [
    { name: 'Express.js', id: 'express', label: 'Express.js' },
    { name: 'JavaScript', id: 'javascript', label: 'JavaScript' },
    { name: 'Docker', id: 'docker', label: 'Docker' },
    { name: 'Python', id: 'python', label: 'Python' },
    { name: 'C++', id: 'cpp', label: 'C++ (DSA)' },
    { name: 'Vite', id: 'vite', label: 'Vite' },
    { name: 'AI / LLM', id: 'gemini', label: 'Gemini & Groq' },
    { name: 'GitHub', id: 'github', label: 'GitHub' },
  ]

  // Duplicate items for continuous seamless wrap
  const doubledRow1 = [...row1, ...row1]
  const doubledRow2 = [...row2, ...row2]

  return (
    <div
      className={`relative w-full overflow-hidden py-4 select-none ${className}`}
      role="region"
      aria-label="Technologies and Development Tools Cloud"
    >
      {/* Edge Gradient Masks (Smooth Fade Effect) */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-28 z-10 bg-gradient-to-r from-bg to-transparent"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28 z-10 bg-gradient-to-l from-bg to-transparent"
        aria-hidden="true"
      />

      <div className="flex flex-col gap-3">
        {/* Row 1: Left to Right Marquee */}
        <div className="flex overflow-hidden group">
          <div className="flex shrink-0 gap-3 animate-[marqueeLeft_28s_linear_infinite] group-hover:[animation-play-state:paused] motion-reduce:animate-none">
            {doubledRow1.map((item, idx) => (
              <div
                key={`${item.id}-${idx}`}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-line bg-surface/75 hover:bg-surface-hover hover:border-violet/40 hover:scale-[1.02] transition-all duration-200 shrink-0"
              >
                <TechIcon name={item.id} className="w-4 h-4 shrink-0" />
                <span className="font-mono text-xs text-text font-medium whitespace-nowrap">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Right to Left Marquee (Opposite Direction) */}
        <div className="flex overflow-hidden group">
          <div className="flex shrink-0 gap-3 animate-[marqueeRight_32s_linear_infinite] group-hover:[animation-play-state:paused] motion-reduce:animate-none">
            {doubledRow2.map((item, idx) => (
              <div
                key={`${item.id}-${idx}`}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-line bg-surface/75 hover:bg-surface-hover hover:border-violet/40 hover:scale-[1.02] transition-all duration-200 shrink-0"
              >
                <TechIcon name={item.id} className="w-4 h-4 shrink-0" />
                <span className="font-mono text-xs text-text font-medium whitespace-nowrap">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

