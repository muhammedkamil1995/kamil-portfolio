import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { engineeringWork, sprintLinks } from '../data/site'
import { Chip, Disclaimer, ExtLink, PageHeader, Reveal, Section } from '../components/ui'
import { ShipmentTracker } from '../components/diagrams'
import ArchExplorer from '../components/ArchExplorer'
import OpsConsole from '../components/OpsConsole'
import { BiDemo, MobileMock } from '../components/widgets'
import { useSeo } from '../lib/seo'

const backend = [
  'Python and Django, Django REST Framework',
  'PostgreSQL, Redis and Celery',
  'REST APIs and authentication',
  'Shipment lifecycle and delivery orchestration',
  'Courier dispatch and delivery workflows',
  'Wallet and payment-related infrastructure',
  'Hub and bulk-order operations',
  'Merchant integration infrastructure',
  'Cloudinary-based media handling',
  'Deployment, environment configuration and operational debugging',
]

export default function SprintAfrica() {
  useSeo('Sprint Africa Logistics', 'Case study: how Muhammed Kamil Babatunde architected and built the Sprint Africa Logistics platform, from backend to web dashboards, mobile and merchant API.')
  return (
    <>
      <PageHeader
        eyebrow="Flagship case study · Sprint Africa Logistics"
        title="Architecting and building a complete logistics technology platform from the ground up."
        lead="As founding engineer and sole full-stack architect, I owned the platform from the first commit through deployment and ongoing production fixes. It is a connected product ecosystem, not one website."
      />
      <div className="container-x mt-6 flex flex-wrap gap-3">
        <a className="btn btn-gold" href={sprintLinks.site} target="_blank" rel="noopener noreferrer">Live product</a>
        <a className="btn btn-ghost" href={sprintLinks.docs} target="_blank" rel="noopener noreferrer">API documentation</a>
        <a className="btn btn-ghost" href={sprintLinks.business} target="_blank" rel="noopener noreferrer">Business information</a>
      </div>

      <Section eyebrow="Overview and ownership" title="One engineer, the whole stack">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            ['Timeline', 'From first commit on 13 February 2026 to a live product by 31 July 2026, with continued iteration since.'],
            ['My role', 'Sole full-stack developer and architect: backend, web, mobile, merchant API, analytics, DevOps and deployment.'],
            ['Status', 'Live with registered users, with the business-development side growing alongside it.'],
          ].map(([t, d]) => <Reveal key={t}><div className="card h-full p-6"><h3 className="font-display text-lg font-semibold">{t}</h3><p className="mt-2 text-sm leading-relaxed text-muted">{d}</p></div></Reveal>)}
        </div>
      </Section>

      <Section eyebrow="Architecture" title="A connected ecosystem" lead="Pick a scenario to watch a request travel through the system, or select any node to see what it is responsible for.">
        <ArchExplorer />
      </Section>

      <Section eyebrow="A · Backend" title="Backend and platform engineering" lead="The services that run a logistics business day to day: orders in, couriers out, money reconciled.">
        <ul className="grid gap-3 sm:grid-cols-2">
          {backend.map((b) => <li key={b} className="card p-4 text-sm">{b}</li>)}
        </ul>
      </Section>

      <Section eyebrow="B · Web" title="Five role-based dashboards and the merchant portal" lead="Separate interfaces with clear role boundaries on one connected platform. Open the Merchant portal and Admin tabs to see how merchant operations and the hub console are structured.">
        <OpsConsole />
      </Section>

      <Section eyebrow="C · Mobile" title="React Native app for Android and iOS" lead="Built with Expo. Real-time tracking, push notifications, an in-app wallet, live chat, maps and delivery workflows.">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div className="flex flex-wrap gap-2">{['Shipment tracking', 'Interactive maps', 'Push notifications', 'In-app wallet', 'Live chat', 'Delivery workflows'].map((c) => <Chip key={c}>{c}</Chip>)}</div>
          <div><MobileMock /><Disclaimer>Clearly labelled illustrative mockup, not an actual app screenshot.</Disclaimer></div>
        </div>
      </Section>

      <Section eyebrow="D · Tracking" title="Shipment tracking and geospatial experience" lead="Order created, pickup, hub processing, dispatch, in transit, delivered. Below is a conceptual walk-through of that lifecycle.">
        <ShipmentTracker />
        <Disclaimer>Concept animation only. It is not a live production feed.</Disclaimer>
      </Section>

      <Section eyebrow="E · Sprint Connect" title="Merchant API as a product" lead="Developer-facing shipping infrastructure that lets businesses integrate Sprint Africa delivery into their own systems.">
        <div className="flex flex-wrap gap-3">
          <Link to="/sprint-connect" className="btn btn-primary">Sprint Connect case study <ArrowRight size={16} /></Link>
          <a className="btn btn-ghost" href={sprintLinks.docs} target="_blank" rel="noopener noreferrer">Explore the API Documentation</a>
        </div>
      </Section>

      <Section eyebrow="F · Wallet and ledger" title="Wallet, ledger and payment infrastructure" lead="Wallet balances, transaction records, courier earnings, payout workflows and payment-provider integrations, built so records reconcile. Which payment methods or bank integrations are live is something I confirm separately rather than assume here.">
        <div className="grid gap-4 md:grid-cols-3">
          {[['Wallet balances', 'Customer and courier wallets backed by transaction records.'], ['Courier earnings', 'Earnings accrue per delivery and feed payout workflows.'], ['Integrity', 'Wallet audit and data-integrity fixes with database constraints.']].map(([t, d]) => <div key={t} className="card p-6"><h3 className="font-display text-lg font-semibold">{t}</h3><p className="mt-2 text-sm text-muted">{d}</p></div>)}
        </div>
      </Section>

      <Section eyebrow="G · Analytics and BI" title="Operations, analytics and business intelligence" lead="Operational metrics, geolocation insights, device and session tracking, charts, and PDF, Excel and CSV exports for administration.">
        <BiDemo />
      </Section>

      <Section eyebrow="H · Production engineering" title="The work behind reliable software" lead="Representative categories of work, each as problem, investigation, change and validation.">
        <div className="grid gap-4 md:grid-cols-2">
          {engineeringWork.slice(0, 4).map((w) => (
            <div key={w.title} className="card p-6">
              <h3 className="font-display text-lg font-semibold">{w.title}</h3>
              <p className="mt-3 text-sm text-muted">{w.problem}</p>
            </div>
          ))}
        </div>
        <Link to="/engineering" className="btn btn-ghost mt-8">See all production notes <ArrowRight size={16} /></Link>
      </Section>

      <Section eyebrow="Technology" title="Stack">
        <div className="flex flex-wrap gap-2">
          {['Python', 'Django', 'DRF', 'PostgreSQL', 'Redis', 'Celery', 'React', 'TypeScript', 'Vite', 'Tailwind CSS', 'React Native', 'Expo', 'Cloudinary', 'JWT', 'Swagger', 'Nginx', 'LiteSpeed', 'cPanel'].map((t) => <Chip key={t}>{t}</Chip>)}
        </div>
        <div className="mt-10 flex flex-wrap gap-6 text-sm">
          <ExtLink href={sprintLinks.site} className="text-gold">sprintafrica.com.ng</ExtLink>
          <ExtLink href={sprintLinks.docs} className="text-gold">docs.sprintafrica.com.ng</ExtLink>
        </div>
      </Section>
    </>
  )
}
