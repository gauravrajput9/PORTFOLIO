import { lazy, Suspense } from 'react'
import { LazyMotion, domAnimation } from 'motion/react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ErrorBoundary from './components/common/ErrorBoundary.jsx'
import Layout from './components/layout/Layout.jsx'
import HomePage from './pages/HomePage.jsx'

const AboutPage = lazy(() => import('./pages/AboutPage.jsx'))
const EducationPage = lazy(() => import('./pages/EducationPage.jsx'))
const ExperiencePage = lazy(() => import('./pages/ExperiencePage.jsx'))
const ProjectsPage = lazy(() => import('./pages/ProjectsPage.jsx'))
const ProjectPage = lazy(() => import('./pages/ProjectPage.jsx'))
const SkillsPage = lazy(() => import('./pages/SkillsPage.jsx'))
const ResumePage = lazy(() => import('./pages/ResumePage.jsx'))
const ContactPage = lazy(() => import('./pages/ContactPage.jsx'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage.jsx'))

function RouteFallback() {
  return (
    <div className="section route-loader" aria-label="Loading page">
      <div className="loader-indicator" aria-hidden="true" />
    </div>
  )
}

export default function App() {
  return (
    <LazyMotion features={domAnimation}>
      <ErrorBoundary>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<HomePage />} />
              <Route
                path="/about"
                element={
                  <Suspense fallback={<RouteFallback />}>
                    <AboutPage />
                  </Suspense>
                }
              />
              <Route
                path="/education"
                element={
                  <Suspense fallback={<RouteFallback />}>
                    <EducationPage />
                  </Suspense>
                }
              />
              <Route
                path="/experience"
                element={
                  <Suspense fallback={<RouteFallback />}>
                    <ExperiencePage />
                  </Suspense>
                }
              />
              <Route
                path="/projects"
                element={
                  <Suspense fallback={<RouteFallback />}>
                    <ProjectsPage />
                  </Suspense>
                }
              />
              <Route
                path="/projects/:slug"
                element={
                  <Suspense fallback={<RouteFallback />}>
                    <ProjectPage />
                  </Suspense>
                }
              />
              <Route
                path="/skills"
                element={
                  <Suspense fallback={<RouteFallback />}>
                    <SkillsPage />
                  </Suspense>
                }
              />
              <Route
                path="/resume"
                element={
                  <Suspense fallback={<RouteFallback />}>
                    <ResumePage />
                  </Suspense>
                }
              />
              <Route
                path="/contact"
                element={
                  <Suspense fallback={<RouteFallback />}>
                    <ContactPage />
                  </Suspense>
                }
              />
              <Route
                path="*"
                element={
                  <Suspense fallback={<RouteFallback />}>
                    <NotFoundPage />
                  </Suspense>
                }
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </ErrorBoundary>
    </LazyMotion>
  )
}

