import { connectSteps, sprintLinks } from '../data/site'
import { PageHeader, Reveal, Section } from '../components/ui'
import { FlowDiagram } from '../components/diagrams'
import { ApiPanel } from '../components/widgets'
import { useSeo } from '../lib/seo'

export default function SprintConnect() {
  useSeo('Sprint Connect', 'Sprint Connect: the merchant shipping API and developer portal built by Muhammed Kamil Babatunde for Sprint Africa Logistics.')
  return (
    <>
      <PageHeader
        eyebrow="Case study · Sprint Connect"
        title="Shipping infrastructure other businesses can build on."
        lead="Sprint Connect lets merchants integrate Sprint Africa delivery into their own systems. The developer portal documents integration, authentication, environments, idempotency, quotes, shipments, tracking and bulk operations."
      />
      <div className="container-x mt-6 flex flex-wrap gap-3">
        <a className="btn btn-gold" href={sprintLinks.docs} target="_blank" rel="noopener noreferrer">Explore the API Documentation</a>
        <a className="btn btn-ghost" href={sprintLinks.signup} target="_blank" rel="noopener noreferrer">Merchant signup</a>
        <a className="btn btn-ghost" href={sprintLinks.login} target="_blank" rel="noopener noreferrer">Merchant login</a>
        <a className="btn btn-ghost" href={sprintLinks.portal} target="_blank" rel="noopener noreferrer">Merchant portal</a>
      </div>

      <Section eyebrow="Architecture" title="From merchant app to delivered parcel">
        <FlowDiagram
          nodes={[
            { title: 'Merchant application', sub: "The merchant's own store or system" },
            { title: 'Sprint Connect API', sub: 'Auth, quotes, shipments, tracking' },
            { title: 'Shipment and delivery services', sub: 'Dispatch, hubs, couriers' },
            { title: 'Tracking and status updates', sub: 'Lifecycle events back to the merchant' },
          ]}
        />
      </Section>

      <Section eyebrow="Integration lifecycle" title="Nine steps from signup to production">
        <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {connectSteps.map((s, i) => (
            <Reveal key={s} delay={(i % 3) * 0.05}>
              <li className="card flex items-center gap-4 p-5">
                <span className="font-mono text-sm text-gold">{String(i + 1).padStart(2, '0')}</span>
                <span className="text-[15px] font-medium">{s}</span>
              </li>
            </Reveal>
          ))}
        </ol>
        <p className="mt-4 text-sm text-muted">Bulk local and interstate workflows are included where supported. Confirm current capabilities in the documentation.</p>
      </Section>

      <Section eyebrow="Developer experience" title="An API contract treated as a product" lead="Predictable errors, safe retries through idempotency keys, a sandbox for testing and docs written for the integrator.">
        <ApiPanel />
      </Section>

      <Section>
        <Reveal>
          <div className="card p-8 text-center sm:p-12">
            <h2 className="h-display">Ready to integrate?</h2>
            <p className="mx-auto mt-4 max-w-md text-muted">Everything an integrator needs lives in the official developer documentation.</p>
            <a className="btn btn-gold mt-7" href={sprintLinks.docs} target="_blank" rel="noopener noreferrer">Explore the API Documentation</a>
          </div>
        </Reveal>
      </Section>
    </>
  )
}
