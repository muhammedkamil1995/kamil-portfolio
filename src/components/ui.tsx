import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'
import { ArrowUpRight } from 'lucide-react'

export function Reveal({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

export function Section({
  id,
  eyebrow,
  title,
  lead,
  children,
  className = '',
}: {
  id?: string
  eyebrow?: string
  title?: ReactNode
  lead?: ReactNode
  children?: ReactNode
  className?: string
}) {
  return (
    <section id={id} className={`py-14 sm:py-20 ${className}`}>
      <div className="container-x">
        {(eyebrow || title) && (
          <Reveal className="mb-10 max-w-2xl">
            {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
            {title && <h2 className="h-display">{title}</h2>}
            {lead && <p className="mt-5 text-lg leading-relaxed text-muted">{lead}</p>}
          </Reveal>
        )}
        {children}
      </div>
    </section>
  )
}

export function PageHeader({ eyebrow, title, lead }: { eyebrow: string; title: ReactNode; lead?: ReactNode }) {
  return (
    <header className="relative overflow-hidden pb-6 pt-32 sm:pt-36">
      <div className="bg-grid pointer-events-none absolute inset-0" aria-hidden />
      <div className="container-x relative">
        <Reveal>
          <p className="eyebrow mb-5">{eyebrow}</p>
          <h1 className="h-page max-w-3xl">{title}</h1>
          {lead && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{lead}</p>}
        </Reveal>
      </div>
    </header>
  )
}

export function ExtLink({ href, children, className = '' }: { href: string; children: ReactNode; className?: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-1.5 ${className}`}>
      {children}
      <ArrowUpRight size={15} aria-hidden />
    </a>
  )
}

export function Chip({ children }: { children: ReactNode }) {
  return <span className="chip">{children}</span>
}

export function Disclaimer({ children }: { children: ReactNode }) {
  return (
    <p className="mt-4 rounded-lg border border-dashed border-line px-3 py-2 font-mono text-[11px] leading-relaxed text-muted">
      {children}
    </p>
  )
}
