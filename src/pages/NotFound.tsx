import { Link } from 'react-router-dom'
import { useSeo } from '../lib/seo'

export default function NotFound() {
  useSeo('Page not found')
  return (
    <section className="grid min-h-[80vh] place-items-center px-5 text-center">
      <div>
        <p className="eyebrow">404</p>
        <h1 className="h-page mt-4">Route not found.</h1>
        <p className="mx-auto mt-5 max-w-md text-muted">This shipment never left the hub. Let's get you back to a page that exists.</p>
        <div className="mt-8 flex justify-center gap-3">
          <Link to="/" className="btn btn-primary">Home</Link>
          <Link to="/projects" className="btn btn-ghost">Projects</Link>
        </div>
      </div>
    </section>
  )
}
