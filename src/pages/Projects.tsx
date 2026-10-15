import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import { projects, webProjects, type Category } from '../data/site'
import { ExtLink, PageHeader, Section } from '../components/ui'
import { ProjectCard } from '../components/widgets'
import { useSeo } from '../lib/seo'

const cats: ('All' | Category)[] = ['All', 'Logistics', 'Fintech', 'AEC Tech', 'EdTech']

export default function Projects() {
  useSeo('Projects', 'Production platforms and client projects by Muhammed Kamil Babatunde across logistics, fintech, AEC technology and education.')
  const [cat, setCat] = useState<'All' | Category>('All')
  const [q, setQ] = useState('')
  const list = useMemo(
    () =>
      projects.filter(
        (p) =>
          (cat === 'All' || p.category === cat) &&
          `${p.name} ${p.summary} ${p.stack.join(' ')}`.toLowerCase().includes(q.trim().toLowerCase()),
      ),
    [cat, q],
  )
  return (
    <>
      <PageHeader eyebrow="Projects" title="Platforms I've architected and shipped." lead="Professional work first, then a gallery of smaller web projects." />
      <Section>
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
            {cats.map((c) => (
              <button key={c} onClick={() => setCat(c)} aria-pressed={cat === c} className={`btn !py-1.5 ${cat === c ? 'btn-primary' : 'btn-ghost'}`}>{c}</button>
            ))}
          </div>
          <label className="relative block sm:w-64">
            <span className="sr-only">Search projects</span>
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" aria-hidden />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search projects or tech" className="w-full rounded-full border border-line bg-bg py-2.5 pl-10 pr-4 text-sm focus:border-brand focus:outline-none" />
          </label>
        </div>
        {list.length ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{list.map((p, i) => <ProjectCard key={p.slug} p={p} index={i} />)}</div>
        ) : (
          <p className="text-muted" role="status">No projects match that filter.</p>
        )}
      </Section>
      <Section eyebrow="Gallery" title="More web projects" lead="Smaller builds across real estate, consultancy, e-commerce, agribusiness and more. Some are personal or portfolio pieces, and I don't maintain every one, so a live site may have changed since.">
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {webProjects.map((w) => (
            <li key={w.name} className="card card-hover p-5">
              <p className="font-display text-lg font-semibold">{w.name}</p>
              <p className="mt-1 text-sm text-muted">{w.cat}</p>
              {w.url && <ExtLink href={w.url} className="mt-4 break-all text-sm text-gold">{new URL(w.url).host}</ExtLink>}
            </li>
          ))}
        </ul>
      </Section>
    </>
  )
}
