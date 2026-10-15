import { useState, type FormEvent } from 'react'
import { CheckCircle2, Loader2, Send, TriangleAlert } from 'lucide-react'
import { profile } from '../data/site'

// Web3Forms access keys are public by design (safe in client code).
// An environment variable overrides this default if you ever want to rotate the key.
const KEY =
  (import.meta.env.VITE_WEB3FORMS_KEY as string | undefined) || '79a432d7-c299-421d-b627-75f6bc820716'
const ENDPOINT = 'https://api.web3forms.com/submit'

const topics = [
  'Senior / leadership engineering role',
  'Founding-engineer opportunity',
  'Technical consulting',
  'Product partnership',
  'Engineering collaboration',
  'Something else',
]

type Status = 'idle' | 'sending' | 'sent' | 'error'
interface Fields { name: string; email: string; company: string; topic: string; message: string }
const empty: Fields = { name: '', email: '', company: '', topic: topics[0], message: '' }

function validate(f: Fields) {
  const e: Partial<Record<keyof Fields, string>> = {}
  if (f.name.trim().length < 2) e.name = 'Please enter your name.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim())) e.email = 'Enter a valid email address.'
  if (f.message.trim().length < 20) e.message = 'Please write at least 20 characters so I can respond usefully.'
  return e
}

export default function ContactForm() {
  const [f, setF] = useState<Fields>(empty)
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({})
  const [status, setStatus] = useState<Status>('idle')
  const [trap, setTrap] = useState('')
  const [errMsg, setErrMsg] = useState('')

  const set = (k: keyof Fields) => (e: { target: { value: string } }) => setF((p) => ({ ...p, [k]: e.target.value }))

  const mailtoFallback = () => {
    const body = `${f.message}\n\n— ${f.name}${f.company ? `, ${f.company}` : ''}\n${f.email}`
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(`[${f.topic}] ${f.name}`)}&body=${encodeURIComponent(body)}`
  }

  const submit = async (ev: FormEvent) => {
    ev.preventDefault()
    if (trap) return
    const v = validate(f)
    setErrors(v)
    if (Object.keys(v).length) return
    if (!KEY) {
      mailtoFallback()
      return
    }
    setStatus('sending')
    setErrMsg('')
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: KEY,
          subject: `[Portfolio] ${f.topic} — ${f.name}${f.company ? ` (${f.company})` : ''}`,
          from_name: 'Portfolio contact form',
          name: f.name,
          email: f.email,
          company: f.company || 'Not provided',
          topic: f.topic,
          message: f.message,
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok || data.success === false) throw new Error(data.message || 'The message could not be sent.')
      setStatus('sent')
      setF(empty)
    } catch (err) {
      setErrMsg(err instanceof Error ? err.message : 'Network error.')
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div className="card p-8 text-center" role="status">
        <CheckCircle2 className="mx-auto text-gold" size={36} />
        <h3 className="mt-4 font-display text-2xl font-semibold">Message sent</h3>
        <p className="mt-2 text-muted">Thank you. I will reply to the email address you provided.</p>
        <button className="btn btn-ghost mt-6" onClick={() => setStatus('idle')}>Send another</button>
      </div>
    )
  }

  const field = 'w-full rounded-xl border border-line bg-bg px-4 py-3 text-[15px] text-ink placeholder:text-muted/60 focus:border-brand focus:outline-none'
  const Err = ({ id, m }: { id: string; m?: string }) => (m ? <p id={id} className="mt-1.5 text-sm text-red-400" role="alert">{m}</p> : null)

  return (
    <form onSubmit={submit} noValidate className="card space-y-5 p-6 sm:p-8" aria-label="Contact form">
      <div className="hidden" aria-hidden>
        <label>Leave empty<input tabIndex={-1} autoComplete="off" value={trap} onChange={(e) => setTrap(e.target.value)} /></label>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="c-name" className="mb-1.5 block text-sm font-medium">Name</label>
          <input id="c-name" className={field} value={f.name} onChange={set('name')} autoComplete="name" aria-invalid={!!errors.name} aria-describedby="e-name" />
          <Err id="e-name" m={errors.name} />
        </div>
        <div>
          <label htmlFor="c-email" className="mb-1.5 block text-sm font-medium">Work email</label>
          <input id="c-email" type="email" className={field} value={f.email} onChange={set('email')} autoComplete="email" aria-invalid={!!errors.email} aria-describedby="e-email" />
          <Err id="e-email" m={errors.email} />
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="c-company" className="mb-1.5 block text-sm font-medium">Company <span className="text-muted">(optional)</span></label>
          <input id="c-company" className={field} value={f.company} onChange={set('company')} autoComplete="organization" />
        </div>
        <div>
          <label htmlFor="c-topic" className="mb-1.5 block text-sm font-medium">I'm reaching out about</label>
          <select id="c-topic" className={field} value={f.topic} onChange={set('topic')}>
            {topics.map((t) => <option key={t}>{t}</option>)}
          </select>
        </div>
      </div>
      <div>
        <label htmlFor="c-message" className="mb-1.5 block text-sm font-medium">Message</label>
        <textarea id="c-message" rows={6} className={field} value={f.message} onChange={set('message')} placeholder="Tell me about the role or project, timeline and what you need." aria-invalid={!!errors.message} aria-describedby="e-message" />
        <Err id="e-message" m={errors.message} />
      </div>

      {status === 'error' && (
        <div className="flex gap-3 rounded-xl border border-red-400/40 bg-red-400/10 p-4 text-sm" role="alert">
          <TriangleAlert size={18} className="mt-0.5 shrink-0 text-red-400" />
          <div>
            <p>{errMsg} Your message was not sent.</p>
            <button type="button" onClick={mailtoFallback} className="mt-1 underline">Send via your email app instead</button>
          </div>
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="max-w-xs text-xs text-muted">
          {KEY ? `Delivered straight to my inbox. You can also email ${profile.email}.` : 'Opens your email app with the message prefilled, addressed to me.'}
        </p>
        <button type="submit" className="btn btn-gold" disabled={status === 'sending'}>
          {status === 'sending' ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
          {status === 'sending' ? 'Sending…' : 'Send message'}
        </button>
      </div>
    </form>
  )
}