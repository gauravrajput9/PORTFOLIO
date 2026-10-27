export const projects = [
  {
    slug: 'devpilot',
    name: 'DevPilot',
    status: 'in-development',
    category: 'full-stack',
    stack: ['React', 'Vite', 'Express', 'MongoDB', 'Better Auth'],
    tagline: 'A modern coding practice and developer workflow platform.',
    problem:
      'Aspiring developers need an integrated practice environment where problem solving, live code experimentation, and progress tracking exist without context-switching between separate disconnected tools.',
    solution:
      'Building a focused web IDE platform featuring categorized problem sets, role-based authentication, and a Monaco code editor interface connected to an Express/MongoDB backend.',
    implemented: [
      'React + Vite modular interface with dark aesthetic',
      'Monaco-based in-browser coding workspace',
      'Express.js RESTful API architecture',
      'MongoDB & Mongoose schema design for problem sets',
      'Role-based user authentication using Better Auth',
    ],
    planned: [
      'Piston multi-language code execution engine (JavaScript, Python, C++)',
      'AI-assisted code recommendations and contextual debugging hints',
      'Real-time problem submission benchmarks and user streak analytics',
    ],
    challenge:
      'Designing a sandboxed architecture that allows safe, low-latency execution across multiple languages without overwhelming backend memory.',
    lessonsLearned:
      'Decoupling the execution pipeline from user-facing state management early prevents latency bottlenecks and isolates sandboxed runtime failures.',
    live: null,
    repo: 'https://github.com/gauravrajput9/DevPilot',
  },
  {
    slug: 'resume-analyzer',
    name: 'AI-Powered Resume Analyzer',
    status: 'live',
    category: 'ai',
    stack: ['Next.js', 'Groq', 'pdf-parse', 'Tailwind CSS'],
    tagline: 'Document analysis workflow that extracts insights and role-matching feedback from resumes.',
    problem:
      'Job seekers often lack objective, immediate feedback on whether their resume aligns with target technical job descriptions.',
    solution:
      'Developed an automated parsing and analysis pipeline that converts uploaded PDF resumes into structured text and evaluates them against role criteria using high-speed Groq LLM inference.',
    implemented: [
      'Next.js application with file drag-and-drop interface',
      'Client-to-server PDF stream parsing with pdf-parse',
      'Groq LLM prompt pipeline for structured evaluation and skill gap detection',
      'Privacy-first design without indefinite document persistence',
    ],
    planned: [
      'Exportable analysis report in PDF format',
      'Multi-resume batch comparison for recruiters',
    ],
    challenge:
      'Extracting clean, predictable text from multi-column PDF layouts and handling malformed font streams before feeding the content to the LLM.',
    lessonsLearned:
      'Strict token budget management and schema enforcement on LLM outputs are critical for consistent, predictable UI rendering.',
    live: 'https://resume-analyzer-ten-phi.vercel.app/',
    repo: null,
  },
  {
    slug: 'lms',
    name: 'Learning Management System',
    status: 'live',
    category: 'full-stack',
    stack: ['React', 'Express', 'MongoDB', 'Node.js'],
    tagline: 'A full-stack learning platform connecting student workflows to structured curriculum delivery.',
    problem:
      'Educational portals frequently suffer from clunky navigation, disconnected course materials, and cumbersome state management between client and server.',
    solution:
      'Built an end-to-end learning management system featuring clean course organization, modular lesson views, and responsive user interfaces backed by persistent MongoDB storage.',
    implemented: [
      'Responsive React interface with dynamic curriculum navigation',
      'Express backend providing RESTful endpoints for courses and lessons',
      'MongoDB database integration for user progress and course catalog',
      'Protected routes and token-based session handling',
    ],
    planned: [
      'Interactive quiz engine with instant scoring',
      'Discussion threads under each module',
    ],
    challenge:
      'Synchronizing client-side completion states with the database reliably across varying network latencies.',
    lessonsLearned:
      'Optimistic UI updates paired with rollback strategies significantly improve perceived performance in data-heavy applications.',
    live: 'https://lms-gaurav.netlify.app/',
    repo: null,
  },
  {
    slug: 'currency-converter',
    name: 'Currency Converter',
    status: 'live',
    category: 'frontend',
    stack: ['JavaScript', 'HTML5', 'CSS3', 'ExchangeRate API'],
    tagline: 'A fast, lightweight currency exchange tool powered by real-time financial data.',
    problem:
      'Many web conversion utilities are cluttered with ads, slow to calculate, or fail to gracefully handle network issues when querying live exchange APIs.',
    solution:
      'Created an accessible, minimal frontend application that queries real-time foreign exchange rates, provides bidirectional conversions, and caches recent lookups.',
    implemented: [
      'Clean semantic HTML5 layout with dark/light visual contrast',
      'Modular vanilla JavaScript structure using modern fetch and async/await',
      'External financial exchange-rate API integration with error handling',
      'Dynamic flag and currency selector with fast recalculation',
    ],
    planned: [
      'Historical exchange rate graph using lightweight canvas rendering',
    ],
    challenge:
      'Gracefully managing API rate limits, temporary timeouts, and currency pair inversions without breaking UI state.',
    lessonsLearned:
      'Solid asynchronous error boundaries in vanilla JavaScript build strong fundamentals for framework-level state handling.',
    live: 'https://convert-currency-gaurav.netlify.app/',
    repo: null,
  },
]

export const projectCategories = ['all', 'full-stack', 'ai', 'frontend']

export const findProject = (slug) =>
  projects.find((project) => project.slug === slug)
