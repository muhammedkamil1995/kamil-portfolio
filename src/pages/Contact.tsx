import { Download, Github, Linkedin, Mail, MapPin, Phone } from 'lucide-react'
import { profile } from '../data/site'
import { PageHeader, Reveal, Section } from '../components/ui'
import ContactForm from '../components/ContactForm'
import { useSeo } from '../lib/seo'

export default function Contact() {
  useSeo('Contact', 'Contact Muhammed Kamil Babatunde about senior engineering roles, founding-engineer opportunities, consulting and product partnerships.')
  const rows = [
    { icon: Mail, label: profile.email, href: `mailto:${profile.email}` },
    { icon: Phone, label: profile.phone, href: profile.phoneHref },
    { icon: Github, label: 'github.com/muhammedkamil1995', href: profile.github, ext: true },
    { icon: Linkedin, label: 'linkedin.com/in/muhammed-kamil', href: profile.linkedin, ext: true },
  ]
  return (
    <>
      <PageHeader eyebrow="Contact" title="Let's build something that works." lead="Companies and founders can message me directly below. It arrives in my inbox and I reply personally." />
      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.3fr_0.9fr]">
          <Reveal><ContactForm /></Reveal>
          <Reveal delay={0.1}>
            <div className="space-y-6">
              <div className="card divide-y divide-[rgb(var(--line)/0.16)]">
                {rows.map((r) => (
                  <a key={r.label} href={r.href} {...(r.ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className="flex items-center gap-3 p-4 text-sm transition-colors hover:bg-ink/5">
                    <r.icon size={17} className="text-gold" aria-hidden /> {r.label}
                  </a>
                ))}
                <a href={profile.x} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 text-sm transition-colors hover:bg-ink/5">
                  <span className="grid h-[17px] w-[17px] place-items-center font-bold text-gold" aria-hidden>𝕏</span> x.com/kamzee_m
                </a>
                <p className="flex items-center gap-3 p-4 text-sm"><MapPin size={17} className="text-gold" aria-hidden /> {profile.location}</p>
              </div>
              <div className="card p-5">
                <p className="eyebrow mb-3">Open to</p>
                <ul className="space-y-1.5 text-sm text-muted">
                  <li>Senior and technical-leadership roles</li>
                  <li>Founding-engineer opportunities</li>
                  <li>Technical consulting</li>
                  <li>Product partnerships and collaboration</li>
                </ul>
              </div>
              <a href={profile.cv} download className="btn btn-ghost w-full"><Download size={16} /> Download resume (PDF)</a>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  )
}
