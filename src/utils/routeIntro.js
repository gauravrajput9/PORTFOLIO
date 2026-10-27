import { projects } from '../data/projects.js'

export const ROUTE_INTRO_CONFIG = {
  '/': {
    eyebrow: '[ 01 // FULL-STACK & AI SYSTEMS ]',
    title: 'GAURAV RAJPUT',
    spec: 'COMPUTER SCIENCE & ENGINEERING',
    index: 'INDEX // 01',
    meta: 'QUANTUM UNIVERSITY · 2026 EDITION',
  },
  '/about': {
    eyebrow: '[ 02 // BIOGRAPHY & RECORD ]',
    title: 'ABOUT',
    spec: 'CORE PHILOSOPHY & CAPABILITIES',
    index: 'SECTION // 02',
    meta: 'BACKGROUND · PRINCIPLES',
  },
  '/education': {
    eyebrow: '[ 03 // ACADEMIC RECORD ]',
    title: 'EDUCATION',
    spec: 'QUANTUM UNIVERSITY · B.TECH CSE',
    index: 'SECTION // 03',
    meta: 'THEORY · FOUNDATIONS · CGPA 8.2',
  },
  '/experience': {
    eyebrow: '[ 04 // PRACTICAL MILESTONES ]',
    title: 'EXPERIENCE',
    spec: 'SYSTEMS · INTERNSHIP · ARCHITECTURE',
    index: 'SECTION // 04',
    meta: 'HENNGE MISSION 3 · DEVPILOT',
  },
  '/projects': {
    eyebrow: '[ 05 // SELECTED WORK ]',
    title: 'PROJECTS',
    spec: 'FULL-STACK APPLICATIONS & ARCHITECTURES',
    index: 'SECTION // 05',
    meta: 'PRODUCTION SYSTEMS & CASE STUDIES',
  },
  '/skills': {
    eyebrow: '[ 06 // TECHNICAL TOOLKIT ]',
    title: 'SKILLS',
    spec: 'FRONTEND · BACKEND · DATABASES · AI',
    index: 'SECTION // 06',
    meta: 'CAPABILITIES & STACK',
  },
  '/resume': {
    eyebrow: '[ 07 // CREDENTIALS & RECORD ]',
    title: 'RESUME',
    spec: 'CURRICULUM VITAE · OVERVIEW',
    index: 'SECTION // 07',
    meta: 'ACADEMIC & TECHNICAL SUMMARY',
  },
  '/contact': {
    eyebrow: '[ 08 // INQUIRIES & COLLABORATION ]',
    title: 'CONTACT',
    spec: 'DEHRADUN, INDIA · REMOTE READY',
    index: 'SECTION // 08',
    meta: 'OPEN FOR ROLES & CONVERSATIONS',
  },
}

export function getRouteIntroConfig(pathname) {
  if (!pathname) return ROUTE_INTRO_CONFIG['/']

  const clean = pathname.length > 1 && pathname.endsWith('/')
    ? pathname.slice(0, -1)
    : pathname

  const lower = clean.toLowerCase()
  if (ROUTE_INTRO_CONFIG[lower]) {
    return ROUTE_INTRO_CONFIG[lower]
  }

  if (lower.startsWith('/projects/')) {
    const slug = lower.replace('/projects/', '').replace(/\/$/, '')
    const project = projects.find((p) => p.slug.toLowerCase() === slug)
    if (project) {
      return {
        eyebrow: `[ CASE STUDY // ${project.status.toUpperCase()} ]`,
        title: project.name.toUpperCase(),
        spec: project.stack.slice(0, 3).join(' · ').toUpperCase(),
        index: 'CASE STUDY // ARCHITECTURE',
        meta: project.tagline || 'SYSTEM DESIGN & ENGINEERING',
      }
    }
  }

  return {
    eyebrow: '[ 404 // NOT FOUND ]',
    title: 'NOT FOUND',
    spec: 'ROUTE NOT WIRED',
    index: 'ERROR // 404',
    meta: 'PAGE DOES NOT EXIST',
  }
}

