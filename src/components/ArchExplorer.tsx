import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { Play, Pause } from 'lucide-react'

type Col = 'Clients' | 'API and services' | 'Data and workers'
const nodes: Record<string, { title: string; col: Col; sub: string; desc: string }> = {
  web: { title: 'Web dashboards', col: 'Clients', sub: 'React + TypeScript', desc: 'Five role-based dashboards (Customer, Courier, Admin, Customer Service, Super Admin) built with Vite and Tailwind CSS. Each talks to the same API with role-scoped access.' },
  mobile: { title: 'Mobile app', col: 'Clients', sub: 'React Native + Expo', desc: 'Android and iOS app for tracking, maps, push notifications, wallet and live chat.' },
  merchant: { title: 'Merchant systems', col: 'Clients', sub: 'Portal + Sprint Connect', desc: 'Merchants use the portal (KYC, keys, balances, ledger) and integrate through Sprint Connect from their own applications.' },
  api: { title: 'Django REST API', col: 'API and services', sub: 'Django + DRF', desc: 'The single backend entry point for all clients. Serializers validate input and return consistent errors; Swagger / OpenAPI documents the contract.' },
  auth: { title: 'Auth and permissions', col: 'API and services', sub: 'JWT, keys, roles, throttling', desc: 'JWT for dashboards and the app, API keys for merchants (live and test), role-based permissions and request throttling.' },
  lifecycle: { title: 'Shipment lifecycle', col: 'API and services', sub: 'Dispatch and hubs', desc: 'Order creation through pickup, hub processing, dispatch, transit and delivery, including courier assignment and single and bulk orders.' },
  wallet: { title: 'Wallet and ledger', col: 'API and services', sub: 'Balances and transactions', desc: 'Wallet balances, transaction records, courier earnings and payout workflows, with integrity checks on every write path.' },
  workers: { title: 'Celery + Redis', col: 'Data and workers', sub: 'Background processing', desc: 'Asynchronous jobs and queues so slow or retryable work never blocks a request.' },
  db: { title: 'PostgreSQL', col: 'Data and workers', sub: 'System of record', desc: 'Relational source of truth for users, shipments, wallets and ledger entries, protected by constraints and migrations.' },
  media: { title: 'Cloudinary', col: 'Data and workers', sub: 'Media handling', desc: 'Image and document uploads, such as proof and KYC files, stored outside the application server.' },
}
const cols: Col[] = ['Clients', 'API and services', 'Data and workers']

const scenarios = [
  { name: 'Customer books a delivery', path: ['web', 'api', 'auth', 'lifecycle', 'wallet', 'db', 'workers'] },
  { name: 'Merchant ships via Sprint Connect', path: ['merchant', 'api', 'auth', 'lifecycle', 'db', 'workers'] },
  { name: 'Courier completes a delivery', path: ['mobile', 'api', 'lifecycle', 'wallet', 'db'] },
  { name: 'Admin reviews operations', path: ['web', 'api', 'auth', 'db'] },
]

export default function ArchExplorer() {
  const reduce = useReducedMotion()
  const [sc, setSc] = useState(0)
  const [step, setStep] = useState(0)
  const [play, setPlay] = useState(!reduce)
  const [sel, setSel] = useState('api')
  const path = scenarios[sc].path

  useEffect(() => {
    if (!play) return
    const t = setInterval(() => setStep((s) => (s + 1) % path.length), 1000)
    return () => clearInterval(t)
  }, [play, path.length])

  const active = path[step]
  const pick = (i: number) => { setSc(i); setStep(0) }

  return (
    <div className="card p-5 sm:p-7">
      <div className="mb-5 flex flex-wrap items-center gap-2">
        {scenarios.map((s, i) => (
          <button key={s.name} onClick={() => pick(i)} aria-pressed={sc === i} className={`btn !py-1.5 text-xs ${sc === i ? 'btn-primary' : 'btn-ghost'}`}>{s.name}</button>
        ))}
        <button onClick={() => setPlay((p) => !p)} className="btn btn-ghost !py-1.5 ml-auto text-xs" aria-pressed={play}>
          {play ? <Pause size={13} /> : <Play size={13} />} {play ? 'Pause' : 'Play'}
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {cols.map((c) => (
          <div key={c}>
            <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-muted">{c}</p>
            <div className="space-y-2">
              {Object.entries(nodes).filter(([, n]) => n.col === c).map(([id, n]) => {
                const onPath = path.includes(id)
                const isActive = active === id
                return (
                  <button
                    key={id}
                    onClick={() => { setSel(id); setPlay(false) }}
                    aria-pressed={sel === id}
                    className={`w-full rounded-xl border p-3.5 text-left transition-all duration-300 ${
                      isActive ? 'border-gold bg-gold/10 shadow-[0_0_0_3px_rgb(var(--gold)/0.12)]' : sel === id ? 'border-brand bg-brand/10' : onPath ? 'border-brand/40 bg-brand/[0.04]' : 'border-line opacity-60 hover:opacity-100'
                    }`}
                  >
                    <span className="block text-sm font-medium">{n.title}</span>
                    <span className="block font-mono text-[11px] text-muted">{n.sub}</span>
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      <ol className="mt-5 flex flex-wrap items-center gap-1.5 text-xs" aria-label="Request path">
        {path.map((id, i) => (
          <li key={id} className="flex items-center gap-1.5">
            <span className={`rounded-full px-2.5 py-1 transition-colors ${i === step ? 'bg-gold text-[#07111F]' : i < step ? 'bg-brand/20 text-ink' : 'border border-line text-muted'}`}>{nodes[id].title}</span>
            {i < path.length - 1 && <span className="text-muted" aria-hidden>→</span>}
          </li>
        ))}
      </ol>

      <div className="mt-5 rounded-xl border border-line p-4" aria-live="polite">
        <p className="font-display font-semibold">{nodes[sel].title}</p>
        <p className="mt-1 text-sm leading-relaxed text-muted">{nodes[sel].desc}</p>
      </div>
      <p className="mt-3 font-mono text-[11px] text-muted">Simplified from the real stack. Select a node to read its responsibility. No secrets or private infrastructure shown.</p>
    </div>
  )
}
