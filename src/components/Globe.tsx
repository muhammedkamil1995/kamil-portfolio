import { useEffect, useRef } from 'react'

interface P { x: number; y: number; z: number }
interface Packet { e: number; t: number; v: number }

/** Live particle globe: rotating node sphere, connecting links, data packets, pointer-responsive. Canvas 2D, no dependencies. */
export default function Globe() {
  const wrap = useRef<HTMLDivElement>(null)
  const cv = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = cv.current
    const box = wrap.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !box || !ctx) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const small = window.innerWidth < 640
    const N = small ? 240 : 420
    const pts: P[] = []
    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2
      const r = Math.sqrt(1 - y * y)
      const th = Math.PI * (3 - Math.sqrt(5)) * i
      pts.push({ x: Math.cos(th) * r, y, z: Math.sin(th) * r })
    }
    const thr2 = small ? 0.075 : 0.05
    const edges: [number, number][] = []
    for (let i = 0; i < N; i++) {
      for (let j = i + 1; j < N; j++) {
        const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y, dz = pts[i].z - pts[j].z
        if (dx * dx + dy * dy + dz * dz < thr2) edges.push([i, j])
      }
    }
    const packets: Packet[] = Array.from({ length: small ? 7 : 14 }, () => ({
      e: Math.floor(Math.random() * edges.length), t: Math.random(), v: 0.5 + Math.random() * 0.7,
    }))

    let brand = '59,130,246', gold = '245,185,33', ink = '248,250,252'
    const readColors = () => {
      const cs = getComputedStyle(document.documentElement)
      const g = (n: string, d: string) => cs.getPropertyValue(n).trim().replace(/\s+/g, ',') || d
      brand = g('--brand', brand); gold = g('--gold', gold); ink = g('--ink', ink)
    }
    readColors()
    const mo = new MutationObserver(() => { readColors(); if (!raf) draw() })
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

    let W = 0, H = 0
    let ry = 0.6, rx = 0.35, offY = 0, offX = 0, tY = 0, tX = 0
    let raf = 0, last = 0, visible = true

    const draw = () => {
      ctx.clearRect(0, 0, W, H)
      const R = Math.min(W, H) * 0.4
      const cx = W / 2, cy = H / 2
      const g = ctx.createRadialGradient(cx, cy, R * 0.2, cx, cy, R * 1.3)
      g.addColorStop(0, `rgba(${brand},0.16)`)
      g.addColorStop(1, `rgba(${brand},0)`)
      ctx.fillStyle = g
      ctx.fillRect(0, 0, W, H)

      const a = ry + offY, b = rx + offX
      const cA = Math.cos(a), sA = Math.sin(a), cB = Math.cos(b), sB = Math.sin(b)
      const proj = pts.map((p) => {
        const x = p.x * cA + p.z * sA
        let z = -p.x * sA + p.z * cA
        const y = p.y * cB - z * sB
        z = p.y * sB + z * cB
        const s = 2 / (2 - z * 0.5)
        return { x: cx + x * R * s, y: cy + y * R * s, z, s }
      })

      ctx.lineWidth = 0.8
      for (const [i, j] of edges) {
        const p = proj[i], q = proj[j]
        const d = (p.z + q.z) / 2 + 1
        ctx.strokeStyle = `rgba(${brand},${0.04 + 0.2 * (d / 2)})`
        ctx.beginPath()
        ctx.moveTo(p.x, p.y)
        ctx.lineTo(q.x, q.y)
        ctx.stroke()
      }
      for (let i = 0; i < N; i++) {
        const p = proj[i]
        const d = (p.z + 1) / 2
        const hub = i % 53 === 0
        ctx.fillStyle = hub ? `rgba(${gold},${0.55 + 0.4 * d})` : `rgba(${ink},${0.25 + 0.5 * d})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, (hub ? 2.6 : 1.1) * p.s * (0.7 + 0.6 * d), 0, Math.PI * 2)
        ctx.fill()
      }
      for (const k of packets) {
        const [i, j] = edges[k.e]
        const p = proj[i], q = proj[j]
        const x = p.x + (q.x - p.x) * k.t, y = p.y + (q.y - p.y) * k.t
        const d = ((p.z + q.z) / 2 + 1) / 2
        ctx.fillStyle = `rgba(${gold},${0.15 + 0.2 * d})`
        ctx.beginPath(); ctx.arc(x, y, 6, 0, Math.PI * 2); ctx.fill()
        ctx.fillStyle = `rgba(${gold},${0.6 + 0.4 * d})`
        ctx.beginPath(); ctx.arc(x, y, 2.2, 0, Math.PI * 2); ctx.fill()
      }
    }

    const frame = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now
      ry += dt * 0.12
      offY += (tY - offY) * 0.05
      offX += (tX - offX) * 0.05
      for (const k of packets) {
        k.t += k.v * dt
        if (k.t >= 1) { k.t = 0; k.e = Math.floor(Math.random() * edges.length) }
      }
      draw()
      raf = requestAnimationFrame(frame)
    }
    const start = () => { if (!raf && !reduce && visible && !document.hidden) { last = performance.now(); raf = requestAnimationFrame(frame) } }
    const stop = () => { if (raf) cancelAnimationFrame(raf); raf = 0 }

    const resize = () => {
      const r = box.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      W = r.width; H = r.height
      canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      draw()
    }
    const ro = new ResizeObserver(resize)
    ro.observe(box)

    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) start(); else stop() })
    io.observe(box)
    const onVis = () => { if (document.hidden) stop(); else start() }
    document.addEventListener('visibilitychange', onVis)

    const onMove = (e: PointerEvent) => {
      const r = box.getBoundingClientRect()
      tY = ((e.clientX - r.left) / r.width - 0.5) * 0.9
      tX = ((e.clientY - r.top) / r.height - 0.5) * 0.5
    }
    const onLeave = () => { tY = 0; tX = 0 }
    if (!reduce) {
      box.addEventListener('pointermove', onMove)
      box.addEventListener('pointerleave', onLeave)
    }
    start()

    return () => {
      stop(); ro.disconnect(); io.disconnect(); mo.disconnect()
      document.removeEventListener('visibilitychange', onVis)
      box.removeEventListener('pointermove', onMove)
      box.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return (
    <div ref={wrap} className="relative mx-auto aspect-square w-full max-w-[500px]">
      <canvas ref={cv} className="h-full w-full" role="img" aria-label="Animated globe of connected nodes with data packets travelling between them" />
    </div>
  )
}
