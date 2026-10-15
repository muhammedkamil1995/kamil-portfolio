import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { ArrowUpRight, Check, Copy, Github } from 'lucide-react'
import { Chip, Disclaimer, Reveal } from './ui'
import type { Project } from '../data/site'

export function ProjectCard({ p, index = 0 }: { p: Project; index?: number }) {
  const inner = (
    <>
      <div className="relative h-28 overflow-hidden rounded-t-2xl" style={{ background: `linear-gradient(135deg, ${p.accent}33, transparent 70%)` }}>
        <div className="bg-grid absolute inset-0 opacity-70" aria-hidden />
        <span className="absolute bottom-3 left-5 font-display text-4xl font-bold opacity-90" style={{ color: p.accent }} aria-hidden>
          {p.name.split(' ').map((w) => w[0]).join('').slice(0, 2)}
        </span>
        <span className="absolute right-4 top-3 font-mono text-[11px] text-muted">{p.year}</span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="eyebrow !text-[10px]">{p.category}</p>
        <h3 className="mt-2 font-display text-xl font-semibold">{p.name}</h3>
        <p className="mt-1 text-xs text-muted">{p.role}</p>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{p.summary}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">{p.stack.slice(0, 5).map((s) => <Chip key={s}>{s}</Chip>)}</div>
        {p.note && <p className="mt-3 font-mono text-[11px] text-muted">{p.note}</p>}
        <div className="mt-5 flex flex-wrap gap-4 text-sm">
          {(p.slug === 'sprint-africa' || p.slug === 'sprint-connect') && (
            <span className="inline-flex items-center gap-1 text-gold">Case study <ArrowUpRight size={14} /></span>
          )}
        </div>
      </div>
    </>
  )
  const to = p.slug === 'sprint-africa' ? '/sprint-africa' : p.slug === 'sprint-connect' ? '/sprint-connect' : undefined
  return (
    <Reveal delay={Math.min(index * 0.05, 0.25)} className="h-full">
      <article className="card card-hover flex h-full flex-col">
        {to ? <Link to={to} className="flex h-full flex-col" aria-label={`${p.name} case study`}>{inner}</Link> : <div className="flex h-full flex-col">{inner}</div>}
        {(p.url || p.repo) && (
          <div className="flex gap-4 border-t border-line px-5 py-3 text-sm text-muted">
            {p.url && <a className="inline-flex items-center gap-1 hover:text-ink" href={p.url} target="_blank" rel="noopener noreferrer">Visit site <ArrowUpRight size={13} /></a>}
            {p.repo && <a className="inline-flex items-center gap-1 hover:text-ink" href={p.repo} target="_blank" rel="noopener noreferrer"><Github size={13} /> Repo</a>}
          </div>
        )}
      </article>
    </Reveal>
  )
}

const sample = `curl -X POST "https://api.example.com/v1/shipments" \\
  -H "Authorization: Bearer <YOUR_SANDBOX_API_KEY>" \\
  -H "Idempotency-Key: <UNIQUE_REQUEST_ID>" \\
  -H "Content-Type: application/json" \\
  -d '{
    "quote_id": "<QUOTE_ID_FROM_RATES_CALL>",
    "pickup":   { "name": "Example Store", "phone": "<PHONE>", "address": "<PICKUP_ADDRESS>" },
    "delivery": { "name": "Example Customer", "phone": "<PHONE>", "address": "<DELIVERY_ADDRESS>" },
    "parcel":   { "weight_kg": 1.5, "description": "Sample item" }
  }'`

export function ApiPanel() {
  const [copied, setCopied] = useState(false)
  const [err, setErr] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(sample)
      setCopied(true)
      setErr(false)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      setErr(true)
    }
  }
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-[#050d18] text-[#E2E8F0]">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
        <span className="font-mono text-xs text-slate-400">Create shipment · illustrative request</span>
        <button onClick={copy} className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 font-mono text-xs text-slate-300 hover:bg-white/10" aria-label="Copy example request">
          {copied ? <Check size={13} /> : <Copy size={13} />} {copied ? 'Copied' : err ? 'Copy failed' : 'Copy'}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-[12.5px] leading-relaxed"><code>{sample}</code></pre>
      <p className="border-t border-white/10 px-4 py-2.5 font-mono text-[11px] text-slate-400">
        Placeholder host, credentials and payload. See the official docs for the real endpoints.
      </p>
    </div>
  )
}

export function MobileMock() {
  return (
    <div className="mx-auto w-[250px] rounded-[2.2rem] border border-line bg-surface p-3 shadow-2xl">
      <div className="overflow-hidden rounded-[1.7rem] bg-bg">
        <div className="h-5" />
        <div className="px-4 pb-4">
          <p className="text-xs text-muted">Illustrative screen</p>
          <p className="font-display text-lg font-semibold">Track shipment</p>
          <div className="relative mt-3 h-36 overflow-hidden rounded-xl border border-line">
            <div className="bg-grid absolute inset-0" aria-hidden />
            <svg viewBox="0 0 200 140" className="absolute inset-0" aria-hidden>
              <path d="M20 110 C 60 40, 110 120, 170 30" fill="none" stroke="rgb(var(--brand))" strokeWidth="3" strokeDasharray="5 6" className="route-flow" />
              <circle cx="20" cy="110" r="5" fill="rgb(var(--brand))" />
              <circle cx="170" cy="30" r="6" fill="rgb(var(--gold))" />
            </svg>
          </div>
          <div className="mt-3 space-y-2">
            {['Picked up', 'At hub', 'In transit'].map((s, n) => (
              <div key={s} className="flex items-center gap-2 text-xs">
                <span className={`h-2 w-2 rounded-full ${n < 2 ? 'bg-brand' : 'bg-gold'}`} />
                {s}
              </div>
            ))}
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2 text-center text-[10px] text-muted">
            {['Wallet', 'Chat', 'Alerts'].map((t) => <div key={t} className="rounded-lg border border-line py-2">{t}</div>)}
          </div>
        </div>
      </div>
    </div>
  )
}

const weekly = [
  { d: 'Mon', v: 42 }, { d: 'Tue', v: 58 }, { d: 'Wed', v: 51 }, { d: 'Thu', v: 74 }, { d: 'Fri', v: 69 }, { d: 'Sat', v: 88 }, { d: 'Sun', v: 63 },
]
const byZone = [
  { z: 'Zone A', v: 34 }, { z: 'Zone B', v: 52 }, { z: 'Zone C', v: 27 }, { z: 'Zone D', v: 41 },
]

export function BiDemo() {
  const axis = { stroke: 'rgb(148,163,184)', fontSize: 11 }
  return (
    <div>
      <div className="mb-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[['Visits today', '128'], ['Sessions', '412'], ['Bounce rate', '41%'], ['Active now', '6']].map(([k, v]) => (
          <div key={k} className="card p-4"><p className="font-mono text-[10px] uppercase tracking-wider text-muted">{k}</p><p className="mt-1 font-display text-2xl font-semibold">{v}</p></div>
        ))}
      </div>
      <div className="mb-4 flex flex-wrap gap-1.5">
        {['Daily traffic', 'Devices', 'Browsers', 'Operating systems', 'Top locations', 'Traffic sources', 'Top pages', 'Intelligence chat'].map((t) => <span key={t} className="chip">{t}</span>)}
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="card p-5">
          <p className="mb-3 font-mono text-xs text-muted">Shipments per day · demo data</p>
          <div className="h-52" role="img" aria-label="Demonstration line chart of shipments per day">
            <ResponsiveContainer>
              <LineChart data={weekly}>
                <CartesianGrid stroke="rgba(148,163,184,0.15)" vertical={false} />
                <XAxis dataKey="d" {...axis} tickLine={false} axisLine={false} />
                <YAxis {...axis} tickLine={false} axisLine={false} width={28} />
                <Tooltip contentStyle={{ background: '#0D1B2A', border: '1px solid rgba(148,163,184,0.2)', borderRadius: 10, color: '#F8FAFC' }} />
                <Line type="monotone" dataKey="v" stroke="#3B82F6" strokeWidth={2.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="card p-5">
          <p className="mb-3 font-mono text-xs text-muted">Volume by zone · demo data</p>
          <div className="h-52" role="img" aria-label="Demonstration bar chart of volume by zone">
            <ResponsiveContainer>
              <BarChart data={byZone}>
                <CartesianGrid stroke="rgba(148,163,184,0.15)" vertical={false} />
                <XAxis dataKey="z" {...axis} tickLine={false} axisLine={false} />
                <YAxis {...axis} tickLine={false} axisLine={false} width={28} />
                <Tooltip contentStyle={{ background: '#0D1B2A', border: '1px solid rgba(148,163,184,0.2)', borderRadius: 10, color: '#F8FAFC' }} cursor={{ fill: 'rgba(148,163,184,0.08)' }} />
                <Bar dataKey="v" fill="#F5B921" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <Disclaimer>All figures above are fabricated demonstration data to show the shape of the BI views. They are not production metrics.</Disclaimer>
    </div>
  )
}

export function Timeline({ items }: { items: { role: string; org: string; period: string; points: string[] }[] }) {
  return (
    <ol className="relative space-y-10 border-l border-line pl-8">
      {items.map((e, i) => (
        <li key={e.role + e.org} className="relative">
          <span className={`absolute -left-[41px] top-1.5 h-3 w-3 rounded-full ring-4 ring-bg ${i === 0 ? 'bg-gold' : 'bg-brand'}`} aria-hidden />
          <Reveal>
            <p className="font-mono text-xs text-gold">{e.period}</p>
            <h3 className="mt-1 font-display text-2xl font-semibold">{e.role}</h3>
            <p className="text-muted">{e.org}</p>
            <ul className="mt-4 space-y-2.5 text-[15px] leading-relaxed text-muted">
              {e.points.map((p) => (
                <li key={p} className="flex gap-3"><span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand" aria-hidden />{p}</li>
              ))}
            </ul>
          </Reveal>
        </li>
      ))}
    </ol>
  )
}
