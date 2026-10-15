import { useState } from 'react'
import { roles } from '../data/site'
import { Chip, Disclaimer } from './ui'

const Tile = ({ k, v, tone }: { k: string; v: string; tone?: string }) => (
  <div className="rounded-xl border border-line p-3">
    <p className="font-mono text-[10px] uppercase tracking-wider text-muted">{k}</p>
    <p className={`mt-1 font-display text-xl font-semibold ${tone ?? ''}`}>{v}</p>
  </div>
)

function MerchantMock() {
  const [tab, setTab] = useState('Overview')
  const tabs = ['Overview', 'API keys', 'KYC', 'Ledger', 'Audit log']
  const ledger = [['Credit top-up', '+₦50,000.00'], ['Shipment fee', '−₦2,400.00'], ['Shipment fee', '−₦3,100.00']]
  return (
    <div className="mt-6 rounded-xl border border-line p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="font-display font-semibold">Example Merchant Ltd</p>
          <p className="font-mono text-[11px] text-muted">MERCH-DEMO-0001 · Prepaid credit</p>
        </div>
        <span className="rounded-full bg-emerald-500/15 px-2.5 py-1 font-mono text-[11px] text-emerald-400">KYC approved</span>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <Tile k="Live balance" v="₦120,000.00" />
        <Tile k="Test balance · sandbox" v="₦45,000.00" tone="text-gold" />
      </div>
      <p className="mt-2 font-mono text-[11px] text-muted">Low-balance alert threshold configurable per merchant.</p>
      <div role="tablist" aria-label="Merchant portal sections" className="mt-4 flex gap-1 overflow-x-auto border-b border-line">
        {tabs.map((t) => (
          <button key={t} role="tab" aria-selected={tab === t} onClick={() => setTab(t)} className={`whitespace-nowrap px-3 py-2 text-sm ${tab === t ? 'border-b-2 border-gold text-ink' : 'text-muted hover:text-ink'}`}>{t}</button>
        ))}
      </div>
      <div role="tabpanel" className="pt-4 text-sm">
        {tab === 'Overview' && (
          <dl className="grid gap-3 sm:grid-cols-2">
            {[['Services enabled', 'parcel'], ['Payment mode', 'Prepaid credit'], ['Active API keys', '1 live · 1 test'], ['Portal users', '1 (owner, verified)'], ['Transactions (7d)', '12'], ['Transactions (30d)', '41']].map(([k, v]) => (
              <div key={k}><dt className="font-mono text-[10px] uppercase tracking-wider text-muted">{k}</dt><dd className="mt-0.5">{v}</dd></div>
            ))}
          </dl>
        )}
        {tab === 'API keys' && (
          <ul className="space-y-2">
            {[['live_••••••••••••', 'Live', 'Active'], ['test_••••••••••••', 'Test', 'Active']].map(([k, e, s]) => (
              <li key={k} className="flex items-center justify-between rounded-lg border border-line px-3 py-2"><span className="font-mono text-xs">{k}</span><span className="text-xs text-muted">{e} · {s}</span></li>
            ))}
            <li className="text-xs text-muted">Keys are issued and revoked from the portal. Placeholder values only.</li>
          </ul>
        )}
        {tab === 'KYC' && <p className="text-muted">Submitted documents are reviewed and the merchant is approved before live shipping is enabled. Status is visible on the account.</p>}
        {tab === 'Ledger' && (
          <ul className="divide-y divide-[rgb(var(--line)/0.16)]">
            {ledger.map(([a, b], i) => <li key={i} className="flex justify-between py-2"><span>{a}</span><span className="font-mono">{b}</span></li>)}
          </ul>
        )}
        {tab === 'Audit log' && (
          <ul className="space-y-2 text-muted">
            <li>API key issued</li><li>KYC approved</li><li>Balance credited</li>
          </ul>
        )}
      </div>
    </div>
  )
}

function HubMock() {
  const [tab, setTab] = useState('Single orders')
  const rows = [
    ['SP-DEMO-001', 'Interstate', 'Lagos → FCT', '2 kg', 'Delivered'],
    ['SP-DEMO-002', 'Local', 'Lagos → Lagos', '1 kg', 'In transit'],
    ['SP-DEMO-003', 'Interstate', 'Lagos → Oyo', '7 kg', 'At hub'],
  ]
  return (
    <div className="mt-6 rounded-xl border border-line p-4">
      <p className="font-display font-semibold">Hub operations dashboard</p>
      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-5">
        {[['Total', '24'], ['Pending pickup', '3'], ['In transit', '5'], ['At destination hub', '4'], ['Delivered', '12']].map(([k, v]) => <Tile key={k} k={k} v={v} />)}
      </div>
      <div role="tablist" aria-label="Hub sections" className="mt-4 flex gap-1 overflow-x-auto border-b border-line">
        {['Single orders', 'Bulk orders', 'Scan package'].map((t) => (
          <button key={t} role="tab" aria-selected={tab === t} onClick={() => setTab(t)} className={`whitespace-nowrap px-3 py-2 text-sm ${tab === t ? 'border-b-2 border-gold text-ink' : 'text-muted hover:text-ink'}`}>{t}</button>
        ))}
      </div>
      <div role="tabpanel" className="pt-4 text-sm">
        {tab === 'Single orders' ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[420px] text-left text-xs">
              <thead className="font-mono text-[10px] uppercase tracking-wider text-muted"><tr>{['Tracking ID', 'Type', 'Route', 'Weight', 'Status'].map((h) => <th key={h} className="pb-2 pr-3 font-normal">{h}</th>)}</tr></thead>
              <tbody>{rows.map((r) => <tr key={r[0]} className="border-t border-line">{r.map((c, i) => <td key={i} className="py-2 pr-3">{c}</td>)}</tr>)}</tbody>
            </table>
          </div>
        ) : tab === 'Bulk orders' ? (
          <p className="text-muted">Bulk batches, local and interstate, are created together, tracked as a batch and managed per parcel through pickup, transit and delivery.</p>
        ) : (
          <p className="text-muted">Scanning a package at a hub records a checkpoint and moves its status forward. Scan history keeps the full trail.</p>
        )}
      </div>
    </div>
  )
}

export default function OpsConsole() {
  const [i, setI] = useState(roles.length - 1)
  const r = roles[i]
  return (
    <div className="card grid overflow-hidden md:grid-cols-[210px_1fr]">
      <div role="tablist" aria-label="Platform interfaces" className="flex gap-1 overflow-x-auto border-b border-line p-2 md:flex-col md:border-b-0 md:border-r">
        {roles.map((x, idx) => (
          <button key={x.name} role="tab" aria-selected={i === idx} onClick={() => setI(idx)} className={`whitespace-nowrap rounded-xl px-4 py-2.5 text-left text-sm transition-colors ${i === idx ? 'bg-brand/15 text-ink' : 'text-muted hover:text-ink'}`}>
            {x.name}
          </button>
        ))}
      </div>
      <div role="tabpanel" className="min-w-0 p-5 sm:p-7">
        <p className="eyebrow">{r.name}</p>
        <p className="mt-3 text-lg leading-relaxed">{r.desc}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">{r.features.map((f) => <Chip key={f}>{f}</Chip>)}</div>
        {r.name === 'Merchant portal' && <MerchantMock />}
        {r.name === 'Admin' && <HubMock />}
        <Disclaimer>Illustrative layout with demo data. Not a screenshot, and no real merchant, customer or balance data is shown.</Disclaimer>
      </div>
    </div>
  )
}
