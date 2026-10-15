import { engineeringWork, principles, skills } from '../data/site'
import { Chip, PageHeader, Reveal, Section } from '../components/ui'
import { FlowDiagram } from '../components/diagrams'
import { useSeo } from '../lib/seo'

export default function Engineering() {
  useSeo('Engineering', 'Technical skills, system architecture and production problem-solving from Muhammed Kamil Babatunde.')
  return (
    <>
      <PageHeader eyebrow="Engineering" title="How I build, and how I keep it running." />
      <Section eyebrow="Systems map" title="Capabilities by layer" lead="Grouped by the layer they serve. These are tools I've used on real projects, listed without proficiency scores.">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {skills.map((s) => (
            <Reveal key={s.group}><div className="card h-full p-6"><h3 className="font-display text-lg font-semibold">{s.group}</h3><div className="mt-4 flex flex-wrap gap-1.5">{s.items.map((i) => <Chip key={i}>{i}</Chip>)}</div></div></Reveal>
          ))}
        </div>
      </Section>

      <Section eyebrow="Architecture" title="Typical platform shape">
        <FlowDiagram
          nodes={[
            { title: 'Clients', sub: 'React dashboards, React Native app, merchant systems' },
            { title: 'API layer', sub: 'Django REST Framework, JWT, throttling' },
            { title: 'Services', sub: 'Celery workers, Redis, business logic' },
            { title: 'Data', sub: 'PostgreSQL, Cloudinary media' },
          ]}
          caption="Simplified, generalised view of the Sprint Africa stack. No private infrastructure details."
        />
      </Section>

      <Section eyebrow="Principles" title="What guides the work">
        <ul className="grid gap-3 md:grid-cols-3">
          {principles.map(([t]) => <li key={t} className="card p-5 text-sm font-medium">{t}</li>)}
        </ul>
      </Section>

      <Section eyebrow="Production notes" title="The work behind reliable software" lead="Representative categories of work from Sprint Africa. They describe how I approach problems, not a claim that the platform has no remaining defects. Results are stated only where supported.">
        <div className="space-y-4">
          {engineeringWork.map((w) => (
            <Reveal key={w.title}>
              <details className="card group p-6 open:border-brand/50">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-lg font-semibold">
                  {w.title}
                  <span className="font-mono text-gold transition-transform group-open:rotate-45" aria-hidden>+</span>
                </summary>
                <dl className="mt-5 grid gap-4 text-sm sm:grid-cols-2">
                  {[['Problem', w.problem], ['Investigation', w.investigation], ['Engineering change', w.change], ['Result / validation', w.result]].map(([k, v]) => (
                    <div key={k}><dt className="eyebrow !text-[10px]">{k}</dt><dd className="mt-1 leading-relaxed text-muted">{v}</dd></div>
                  ))}
                </dl>
              </details>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  )
}
