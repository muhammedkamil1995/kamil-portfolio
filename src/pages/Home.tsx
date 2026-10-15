import { lazy, Suspense } from 'react'
import { Link } from 'react-router-dom'
import { ArrowDown, ArrowRight, Download, Github } from 'lucide-react'
import { credibility, profile, projects, skills, experience } from '../data/site'
import { Chip, Reveal, Section } from '../components/ui'
import { HeroVisual } from '../components/diagrams'
import { ProjectCard } from '../components/widgets'
import { useSeo } from '../lib/seo'

const Globe = lazy(() => import('../components/Globe'))

export default function Home() {
  useSeo('', 'Explore the engineering work of Muhammed Kamil Babatunde, a senior full-stack engineer and founding engineer of Sprint Africa Logistics, building production systems across logistics, fintech, enterprise software, and mobile.')
  const featured = projects.filter((p) => ['sprint-africa', 'sprint-connect', 'sabo-finance', 'bimflow'].includes(p.slug))

  return (
    <>
      <section className="relative overflow-hidden pb-14 pt-28 sm:pt-32">
        <div className="bg-grid pointer-events-none absolute inset-0" aria-hidden />
        <div className="container-x relative grid items-center gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <Reveal>
            <p className="eyebrow mb-5">Full-stack engineering · Systems architecture</p>
            <h1 className="h-hero max-w-[16ch]">Engineering the systems behind ambitious businesses.</h1>
            <p className="mt-6 max-w-[58ch] text-base leading-relaxed text-muted sm:text-lg">
              I'm Muhammed Kamil Babatunde, a full-stack software engineer and technical lead building production applications, logistics infrastructure, merchant APIs, and business-critical digital platforms.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/projects" className="btn btn-primary">View Engineering Projects <ArrowRight size={16} /></Link>
              <Link to="/sprint-africa" className="btn btn-gold">Sprint Africa Case Study</Link>
              <a href={profile.cv} download className="btn btn-ghost"><Download size={16} /> Resume</a>
              <a href={profile.github} target="_blank" rel="noopener noreferrer" className="btn btn-ghost"><Github size={16} /> GitHub</a>
            </div>
            <p className="mt-6 font-mono text-xs text-muted">Django · PostgreSQL · React · TypeScript · React Native · REST APIs</p>
          </Reveal>
          <Reveal delay={0.1}>
            <Suspense fallback={<HeroVisual />}>
              <Globe />
            </Suspense>
          </Reveal>
        </div>
        <div className="container-x relative mt-10">
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-[rgb(var(--line)/0.16)] lg:grid-cols-4">
            {credibility.map((c) => (
              <div key={c.v} className="bg-bg p-4 sm:p-5">
                <dt className="sr-only">{c.v}</dt>
                <dd>
                  <span className="font-display text-2xl font-semibold text-gold sm:text-3xl">{c.k}</span>
                  <span className="mt-1 block text-xs text-muted sm:text-sm">{c.v}</span>
                </dd>
              </div>
            ))}
          </dl>
          <a href="#flagship" className="mx-auto mt-8 flex w-fit items-center gap-2 font-mono text-xs text-muted hover:text-ink" aria-label="Scroll to the flagship project">
            Scroll <ArrowDown size={14} />
          </a>
        </div>
      </section>

      <Section id="flagship" eyebrow="Flagship" title="One engineer. A complete logistics platform." lead="Sprint Africa Logistics: backend, role-based dashboards, a merchant portal, a native mobile app, a merchant API and an analytics layer, designed, built and deployed end to end between February and July 2026.">
        <Reveal>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              ['Backend', 'Django REST on PostgreSQL, Redis and Celery for dispatch, wallet, shipments and hubs.'],
              ['Web + Mobile', 'Five role-based dashboards, a merchant portal and a React Native app on Android and iOS.'],
              ['Sprint Connect', 'A merchant API and developer portal so other businesses can ship through the platform.'],
            ].map(([t, d]) => (
              <div key={t} className="card p-6"><h3 className="font-display text-xl font-semibold">{t}</h3><p className="mt-2 text-sm leading-relaxed text-muted">{d}</p></div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/sprint-africa" className="btn btn-primary">Read the case study <ArrowRight size={16} /></Link>
            <Link to="/sprint-connect" className="btn btn-ghost">Sprint Connect API</Link>
          </div>
        </Reveal>
      </Section>

      <Section eyebrow="Selected work" title="Products I've built and delivered">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p, i) => <ProjectCard key={p.slug} p={p} index={i} />)}
        </div>
        <Link to="/projects" className="btn btn-ghost mt-8">All projects <ArrowRight size={16} /></Link>
      </Section>

      <Section eyebrow="Capabilities" title="Across the whole stack">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {skills.slice(0, 5).map((s) => (
            <Reveal key={s.group}>
              <div className="card h-full p-6">
                <h3 className="font-display text-lg font-semibold">{s.group}</h3>
                <div className="mt-4 flex flex-wrap gap-1.5">{s.items.map((i) => <Chip key={i}>{i}</Chip>)}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section eyebrow="Experience" title="From enterprise banking to founding engineer">
        <ol className="grid gap-4 md:grid-cols-2">
          {experience.map((e) => (
            <li key={e.role + e.org} className="card p-6">
              <p className="font-mono text-xs text-gold">{e.period}</p>
              <h3 className="mt-1 font-display text-xl font-semibold">{e.role}</h3>
              <p className="text-sm text-muted">{e.org}</p>
            </li>
          ))}
        </ol>
        <Link to="/experience" className="btn btn-ghost mt-8">Full timeline <ArrowRight size={16} /></Link>
      </Section>

      <section className="pb-20">
        <div className="container-x">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-line bg-surface p-8 text-center sm:p-14">
              <div className="bg-grid pointer-events-none absolute inset-0 opacity-60" aria-hidden />
              <div className="relative">
                <h2 className="h-display mx-auto max-w-2xl">Have a product that needs an owner?</h2>
                <p className="mx-auto mt-5 max-w-xl text-muted">Senior and leadership roles, founding-engineer opportunities, consulting and product partnerships.</p>
                <Link to="/contact" className="btn btn-gold mt-8">Get in touch <ArrowRight size={16} /></Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
