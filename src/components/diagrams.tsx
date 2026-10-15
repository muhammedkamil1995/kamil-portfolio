import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { Check } from 'lucide-react'
import { shipmentStages } from '../data/site'

/** Artistic hero composition: routes, hubs, API links, database layers. Not a screenshot. */
export function HeroVisual() {
  return (
    <svg viewBox="0 0 560 520" className="h-auto w-full" role="img" aria-label="Illustration of a connected engineering ecosystem: delivery routes between hubs, an API layer and database layers">
      <defs>
        <radialGradient id="glow" cx="50%" cy="45%" r="55%">
          <stop offset="0%" stopColor="#2563EB" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="layer" x1="0" x2="1">
          <stop offset="0" stopColor="rgb(var(--brand))" stopOpacity="0.5" />
          <stop offset="1" stopColor="rgb(var(--brand))" stopOpacity="0.1" />
        </linearGradient>
      </defs>
      <rect width="560" height="520" fill="url(#glow)" />
      {/* map geometry */}
      <g stroke="rgb(var(--line))" strokeOpacity="0.22" fill="none">
        {[60, 120, 180, 240, 300, 360].map((y) => (
          <path key={y} d={`M20 ${y} Q 180 ${y - 26} 300 ${y} T 540 ${y}`} />
        ))}
        {[80, 170, 260, 350, 440].map((x) => (
          <path key={x} d={`M${x} 30 Q ${x + 24} 180 ${x} 330`} />
        ))}
      </g>
      {/* routes */}
      <g fill="none" strokeLinecap="round">
        <path d="M70 290 C 150 180, 230 300, 300 200 S 440 120, 500 90" stroke="rgb(var(--brand))" strokeWidth="2.5" strokeDasharray="6 10" className="route-flow" />
        <path d="M70 290 C 170 350, 260 260, 360 300 S 470 250, 500 220" stroke="rgb(var(--gold))" strokeWidth="2" strokeDasharray="3 9" className="route-flow" />
      </g>
      {/* nodes */}
      {[
        [70, 290, 'Origin'],
        [300, 200, 'Hub'],
        [360, 300, 'Hub'],
        [500, 90, 'Drop'],
        [500, 220, 'Drop'],
      ].map(([x, y, l]) => (
        <g key={`${x}-${y}`}>
          <circle cx={x as number} cy={y as number} r="14" fill="rgb(var(--brand))" fillOpacity="0.15" />
          <circle cx={x as number} cy={y as number} r="5.5" fill={l === 'Drop' ? 'rgb(var(--gold))' : 'rgb(var(--brand))'} />
          <text x={(x as number) + 12} y={(y as number) - 12} fontSize="10" fill="rgb(var(--muted))" fontFamily="JetBrains Mono, monospace">{l}</text>
        </g>
      ))}
      {/* database layers */}
      <g transform="translate(60 372)">
        {[0, 20, 40].map((o) => (
          <g key={o}>
            <ellipse cx="60" cy={o + 30} rx="60" ry="14" fill="url(#layer)" stroke="rgb(var(--brand))" strokeOpacity="0.5" />
          </g>
        ))}
        <text x="132" y="52" fontSize="10" fill="rgb(var(--muted))" fontFamily="JetBrains Mono, monospace">PostgreSQL · Redis</text>
      </g>
      {/* API link */}
      <g transform="translate(300 360)">
        <rect width="190" height="104" rx="12" fill="rgb(var(--surface))" stroke="rgb(var(--line))" strokeOpacity="0.4" />
        <text x="16" y="28" fontSize="10" fill="rgb(var(--gold))" fontFamily="JetBrains Mono, monospace">POST /v1/shipments</text>
        {[0, 1, 2].map((i) => (
          <rect key={i} x="16" y={42 + i * 16} width={150 - i * 36} height="7" rx="3.5" fill="rgb(var(--ink))" fillOpacity="0.12" />
        ))}
        <text x="16" y="96" fontSize="9" fill="rgb(var(--muted))" fontFamily="JetBrains Mono, monospace">illustrative</text>
      </g>
      {/* dashboard fragment */}
      <g transform="translate(40 40)">
        <rect width="150" height="82" rx="12" fill="rgb(var(--surface))" stroke="rgb(var(--line))" strokeOpacity="0.4" />
        <path d="M14 64 L44 46 L70 54 L100 28 L136 36" fill="none" stroke="rgb(var(--brand))" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="136" cy="36" r="4" fill="rgb(var(--gold))" />
        <text x="14" y="20" fontSize="9" fill="rgb(var(--muted))" fontFamily="JetBrains Mono, monospace">dashboard · demo</text>
      </g>
    </svg>
  )
}

export function FlowDiagram({ nodes, caption }: { nodes: { title: string; sub: string }[]; caption?: string }) {
  return (
    <figure>
      <ol className="flex flex-col items-stretch gap-3 md:flex-row md:items-center">
        {nodes.map((n, i) => (
          <li key={n.title} className="flex flex-1 flex-col items-center gap-3 md:flex-row">
            <div className="card w-full flex-1 p-5 text-center md:text-left">
              <p className="font-display text-base font-semibold">{n.title}</p>
              <p className="mt-1 text-sm text-muted">{n.sub}</p>
            </div>
            {i < nodes.length - 1 && (
              <svg width="28" height="28" viewBox="0 0 28 28" className="shrink-0 rotate-90 text-gold md:rotate-0" aria-hidden>
                <path d="M3 14h20m-7-7 7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </li>
        ))}
      </ol>
      {caption && <figcaption className="mt-3 text-center font-mono text-[11px] text-muted">{caption}</figcaption>}
    </figure>
  )
}

/** Conceptual shipment journey. Not a live production feed. */
export function ShipmentTracker() {
  const reduce = useReducedMotion()
  const [step, setStep] = useState(0)
  const [auto, setAuto] = useState(!reduce)
  const last = shipmentStages.length - 1

  useEffect(() => {
    if (!auto) return
    const t = setInterval(() => setStep((s) => (s >= last ? 0 : s + 1)), 2200)
    return () => clearInterval(t)
  }, [auto, last])

  const pct = (step / last) * 100
  const pts = shipmentStages.map((_, i) => {
    const x = 40 + (i / last) * 520
    const y = 130 + Math.sin(i * 1.3) * 46
    return [x, y] as const
  })
  const path = pts.map(([x, y], i) => `${i ? 'L' : 'M'}${x} ${y}`).join(' ')
  const [cx, cy] = pts[step]

  return (
    <div className="card overflow-hidden p-5 sm:p-8">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <p className="eyebrow">Conceptual demonstration</p>
        <button className="btn btn-ghost !py-1.5 text-xs" onClick={() => setAuto((a) => !a)} aria-pressed={auto}>
          {auto ? 'Pause' : 'Play'}
        </button>
      </div>
      <svg viewBox="0 0 600 240" className="h-auto w-full" role="img" aria-label={`Stylised route map. Current stage: ${shipmentStages[step].label}`}>
        <g stroke="rgb(var(--line))" strokeOpacity="0.18">
          {[40, 90, 140, 190].map((y) => <line key={y} x1="0" x2="600" y1={y} y2={y} />)}
          {[100, 200, 300, 400, 500].map((x) => <line key={x} y1="0" y2="240" x1={x} x2={x} />)}
        </g>
        <path d={path} fill="none" stroke="rgb(var(--line))" strokeOpacity="0.4" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d={path} fill="none" stroke="rgb(var(--brand))" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" pathLength={100} strokeDasharray={`${pct} 100`} style={{ transition: 'stroke-dasharray 0.8s ease' }} />
        {pts.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={i <= step ? 6 : 4.5} fill={i <= step ? 'rgb(var(--brand))' : 'rgb(var(--surface))'} stroke="rgb(var(--brand))" strokeWidth="2" />
        ))}
        <circle cx={cx} cy={cy} r="12" fill="rgb(var(--gold))" fillOpacity="0.25" style={{ transition: 'all 0.8s ease' }} />
        <circle cx={cx} cy={cy} r="6.5" fill="rgb(var(--gold))" style={{ transition: 'all 0.8s ease' }} />
      </svg>
      <ol className="mt-6 grid gap-2 sm:grid-cols-3 lg:grid-cols-6">
        {shipmentStages.map((s, i) => (
          <li key={s.label}>
            <button
              onClick={() => { setAuto(false); setStep(i) }}
              className={`w-full rounded-xl border p-3 text-left transition-colors ${i === step ? 'border-brand bg-brand/10' : 'border-line hover:bg-ink/5'}`}
              aria-current={i === step ? 'step' : undefined}
            >
              <span className="flex items-center gap-1.5 font-mono text-[10px] text-muted">
                {i < step ? <Check size={11} className="text-gold" /> : <span>{String(i + 1).padStart(2, '0')}</span>}
              </span>
              <span className="mt-1 block text-sm font-medium">{s.label}</span>
            </button>
          </li>
        ))}
      </ol>
      <p className="mt-4 text-sm text-muted" aria-live="polite">{shipmentStages[step].note}</p>
    </div>
  )
}
