import { education, principles, profile } from '../data/site'
import { PageHeader, Reveal, Section } from '../components/ui'
import { useSeo } from '../lib/seo'

export default function About() {
  useSeo('About', 'The story behind Muhammed Kamil Babatunde: from a Marketing degree to founding engineer, building production software end to end.')
  return (
    <>
      <PageHeader eyebrow="About" title="Engineering ownership, product thinking, and execution." />
      <Section>
        <div className="grid gap-12 lg:grid-cols-[320px_1fr]">
          <Reveal>
            <img src={profile.photo} alt="Portrait of Muhammed Kamil Babatunde wearing rimless glasses" width={320} height={320} loading="lazy" className="aspect-square w-full max-w-xs rounded-3xl border border-line object-cover" />
            <p className="mt-4 font-mono text-xs text-muted">Lagos, Nigeria</p>
          </Reveal>
          <Reveal>
            <div className="space-y-6 text-lg leading-relaxed text-muted">
              <p>I transitioned into software engineering through hands-on learning and real-world delivery after studying Marketing at the University of Ilorin. Over the years, I've worked across enterprise banking systems, fintech, education, real estate, and logistics.</p>
              <p>My approach goes beyond writing code. I think about architecture, data integrity, user experience, operational workflows, security, deployment, and the commercial problem the software needs to solve.</p>
              <p>At Sprint Africa Logistics, I took ownership of the entire engineering platform, building the backend, role-based web dashboards, mobile application, merchant integration layer, and supporting operational infrastructure.</p>
              <p className="text-ink">I am most effective where engineering ownership, product thinking, and execution meet.</p>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section eyebrow="Career progression" title="Six years, four steps">
        <div className="grid gap-4 md:grid-cols-4">
          {[
            ['2020 to 2023', 'Junior Web Developer', 'Client web builds, and led a five-developer legacy migration.'],
            ['2023 to 2024', 'ColdFusion Developer', 'Enterprise systems at Wema Bank.'],
            ['2024 to 2026', 'Senior Full-Stack Engineer', 'Fintech, AEC tech and education products as an independent engineer.'],
            ['2026 to now', 'Founding Engineer', 'Sole architect of Sprint Africa Logistics.'],
          ].map(([p, t, d], i) => (
            <Reveal key={t} delay={i * 0.06}>
              <div className="card h-full p-5"><p className="font-mono text-xs text-gold">{p}</p><h3 className="mt-2 font-display text-lg font-semibold">{t}</h3><p className="mt-2 text-sm text-muted">{d}</p></div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section eyebrow="Working philosophy" title="How I approach software">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {principles.map(([t, d], i) => (
            <Reveal key={t} delay={(i % 3) * 0.05}>
              <div className="card h-full p-6">
                <span className="font-mono text-xs text-gold">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="mt-2 font-display text-lg font-semibold">{t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section eyebrow="Education" title="From a business degree to building systems" lead="A marketing background keeps the commercial problem in view, and practical delivery built the engineering.">
        <div className="grid gap-4 md:grid-cols-3">
          {education.map((e) => (
            <div key={e.title} className="card p-6">
              <p className="font-mono text-xs text-gold">{e.period}</p>
              <h3 className="mt-2 font-display text-xl font-semibold">{e.title}</h3>
              <p className="text-sm text-muted">{e.org}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  )
}
