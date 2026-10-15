import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'

const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const Projects = lazy(() => import('./pages/Projects'))
const SprintAfrica = lazy(() => import('./pages/SprintAfrica'))
const SprintConnect = lazy(() => import('./pages/SprintConnect'))
const Experience = lazy(() => import('./pages/Experience'))
const Engineering = lazy(() => import('./pages/Engineering'))
const Contact = lazy(() => import('./pages/Contact'))
const NotFound = lazy(() => import('./pages/NotFound'))

export default function App() {
  return (
    <Suspense fallback={<div className="grid min-h-screen place-items-center font-mono text-sm text-muted" role="status">Loading…</div>}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="projects" element={<Projects />} />
          <Route path="sprint-africa" element={<SprintAfrica />} />
          <Route path="sprint-connect" element={<SprintConnect />} />
          <Route path="experience" element={<Experience />} />
          <Route path="engineering" element={<Engineering />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
