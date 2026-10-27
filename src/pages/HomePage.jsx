import Hero from '../components/sections/Hero.jsx'
import ScrollFeaturedProjects from '../components/sections/home/ScrollFeaturedProjects.jsx'
import ScrollTechFocus from '../components/sections/home/ScrollTechFocus.jsx'
import ScrollAboutPreview from '../components/sections/home/ScrollAboutPreview.jsx'
import ScrollToolsEcosystem from '../components/sections/home/ScrollToolsEcosystem.jsx'
import ScrollHomeContact from '../components/sections/home/ScrollHomeContact.jsx'
import { projects } from '../data/projects.js'
import { useDocumentTitle } from '../hooks/useDocumentTitle.js'

/**
 * HomePage
 *
 * Distinct, independent homepage sections in normal document flow:
 * 1. Hero: Aceternity flickering lights with gentle, contained scroll recession.
 * 2. 01 / Selected Work: Featured projects with smooth scroll-progress card fan-out.
 * 3. 02 / Technical Focus: 3D perspective depth movement with AnimatedFeatureCard.
 * 4. 03 / Background: Layered editorial spread with horizontal watermark parallax.
 * 5. 04 / Tools & Ecosystem: Dedicated engineering toolkit & categorized competencies.
 * 6. 05 / Collaboration: Contact invitation with Aceternity LogoCloudMultipleRows and CTA buttons.
 */
export default function HomePage() {
  useDocumentTitle()

  return (
    <main id="main">
      {/* 00 / Hero Introduction */}
      <Hero />

      {/* 01 / Selected Work — Featured Projects */}
      <ScrollFeaturedProjects projects={projects} />

      {/* 02 / Technical Focus — Animated Feature Card */}
      <ScrollTechFocus />

      {/* 03 / Background — About Preview */}
      <ScrollAboutPreview />

      {/* 04 / Tools & Ecosystem — Dedicated Engineering Toolkit */}
      <ScrollToolsEcosystem />

      {/* 05 / Collaboration & Contact — Logo Cloud & CTA Actions */}
      <ScrollHomeContact />
    </main>
  )
}
