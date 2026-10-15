import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { Download, Github, Linkedin, Mail, Menu, Moon, Sun, X } from 'lucide-react'
import { profile } from '../data/site'

const nav = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Projects' },
  { to: '/sprint-africa', label: 'Sprint Africa' },
  { to: '/sprint-connect', label: 'Sprint Connect' },
  { to: '/experience', label: 'Experience' },
  { to: '/engineering', label: 'Engineering' },
]

function useTheme() {
  const [theme, setTheme] = useState<'dark' | 'light'>(
    () => (document.documentElement.getAttribute('data-theme') as 'dark' | 'light') || 'dark',
  )
  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    document.documentElement.setAttribute('data-theme', next)
    try {
      localStorage.setItem('theme', next)
    } catch {
      /* storage unavailable */
    }
  }
  return { theme, toggle }
}

export default function Layout() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { theme, toggle } = useTheme()
  const { pathname } = useLocation()

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 16)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])

  useEffect(() => {
    setOpen(false)
    window.scrollTo({ top: 0 })
  }, [pathname])

  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled || open ? 'border-b border-line bg-bg/85 backdrop-blur-md' : 'border-b border-transparent'
        }`}
      >
        <div className={`container-x flex items-center justify-between transition-all ${scrolled ? 'h-14' : 'h-20'}`}>
          <Link to="/" className="flex min-w-0 items-center gap-3" aria-label="Muhammed Kamil Babatunde, home">
            <img src={profile.photoSm} alt="Muhammed Kamil Babatunde" width={40} height={40} className="h-10 w-10 shrink-0 rounded-full border border-[rgb(var(--brand)/0.55)] object-cover" />
            <span className="min-w-0 leading-tight">
              <span className="block truncate font-display text-sm font-semibold sm:text-[15px]">Muhammed Kamil Babatunde</span>
              <span className="hidden text-xs text-muted sm:block">Full-Stack Engineer · Technical Lead</span>
            </span>
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-1 xl:flex">
            {nav.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                end={n.to === '/'}
                className={({ isActive }) =>
                  `rounded-full px-3 py-1.5 text-sm transition-colors ${isActive ? 'bg-ink/10 text-ink' : 'text-muted hover:text-ink'}`
                }
              >
                {n.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button onClick={toggle} className="btn btn-ghost !p-2.5" aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}>
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <Link to="/contact" className="btn btn-gold hidden sm:inline-flex">Contact</Link>
            <button
              className="btn btn-ghost !p-2.5 xl:hidden"
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label="Toggle menu"
              onClick={() => setOpen((o) => !o)}
            >
              {open ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>

        {open && (
          <nav id="mobile-nav" aria-label="Mobile" className="container-x flex flex-col gap-1 pb-6 xl:hidden">
            {[...nav, { to: '/contact', label: 'Contact' }].map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                end={n.to === '/'}
                className={({ isActive }) =>
                  `rounded-xl px-4 py-3 text-base ${isActive ? 'bg-ink/10 text-ink' : 'text-muted'}`
                }
              >
                {n.label}
              </NavLink>
            ))}
          </nav>
        )}
      </header>

      <main id="main">
        <Outlet />
      </main>

      <footer className="border-t border-line">
        <div className="container-x grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="font-display text-xl font-semibold">{profile.name}</p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
              I don't just build interfaces. I architect, engineer, and deliver complete software products.
            </p>
            <div className="mt-5 flex gap-2">
              <a className="btn btn-ghost !p-2.5" href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><Github size={16} /></a>
              <a className="btn btn-ghost !p-2.5" href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Linkedin size={16} /></a>
              <a className="btn btn-ghost !p-2.5" href={profile.x} target="_blank" rel="noopener noreferrer" aria-label="X">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M18.9 2H22l-7.3 8.3L23.3 22h-6.7l-5.3-6.9L5.2 22H2l7.8-8.9L1.7 2h6.9l4.8 6.3L18.9 2Zm-1.2 18h1.8L7.4 3.9H5.5L17.7 20Z" /></svg>
              </a>
              <a className="btn btn-ghost !p-2.5" href={`mailto:${profile.email}`} aria-label="Email"><Mail size={16} /></a>
            </div>
          </div>
          <div>
            <p className="eyebrow mb-4">Explore</p>
            <ul className="space-y-2 text-sm text-muted">
              {nav.map((n) => (
                <li key={n.to}><Link className="hover:text-ink" to={n.to}>{n.label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow mb-4">Contact</p>
            <ul className="space-y-2 text-sm text-muted">
              <li><a className="hover:text-ink" href={`mailto:${profile.email}`}>{profile.email}</a></li>
              <li><a className="hover:text-ink" href={profile.phoneHref}>{profile.phone}</a></li>
              <li>{profile.location}</li>
              <li>
                <a className="inline-flex items-center gap-1.5 hover:text-ink" href={profile.cv} download>
                  <Download size={14} /> Download resume
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-line py-5 text-center font-mono text-xs text-muted">
          © {new Date().getFullYear()} {profile.name}. Lagos, Nigeria.
        </div>
      </footer>
    </>
  )
}
