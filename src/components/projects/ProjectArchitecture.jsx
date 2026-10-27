export default function ProjectArchitecture() {
  return (
    <div className="architecture">
      <h2>System Architecture Direction</h2>
      <svg
        viewBox="0 0 740 180"
        role="img"
        aria-label="DevPilot architecture: React and Vite client connects through Express API to MongoDB with Mongoose. Better Auth controls roles. Piston execution and AI recommendations are planned directions."
      >
        <path d="M150 90H270M360 90H480M270 90L270 35M360 90L360 145M570 90H670" />
        <g>
          <rect x="20" y="60" width="130" height="60" rx="4" />
          <text x="85" y="94">React / Vite</text>
          <rect x="270" y="60" width="90" height="60" rx="4" />
          <text x="315" y="94">Express API</text>
          <rect x="480" y="60" width="90" height="60" rx="4" />
          <text x="525" y="94">MongoDB</text>
          <rect x="610" y="60" width="120" height="60" rx="4" />
          <text x="670" y="94">Mongoose</text>
          <rect x="210" y="5" width="120" height="55" rx="4" />
          <text x="270" y="37">Better Auth</text>
          <rect x="300" y="120" width="140" height="55" rx="4" />
          <text x="370" y="152">Piston / AI*</text>
        </g>
      </svg>
      <small>* Experimental or planned direction; distinguished from current implementation.</small>
    </div>
  )
}
