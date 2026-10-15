import { useEffect } from 'react'

const SITE = (import.meta.env.VITE_SITE_URL as string | undefined)?.replace(/\/$/, '') ?? ''
const BASE = 'Muhammed Kamil Babatunde'

function setMeta(sel: string, attr: string, value: string) {
  const el = document.head.querySelector(sel)
  if (el) el.setAttribute(attr, value)
}

export function useSeo(title: string, description?: string) {
  useEffect(() => {
    const full = title ? `${title} | ${BASE}` : `${BASE} | Senior Full-Stack Engineer & Technical Lead`
    document.title = full
    setMeta('meta[property="og:title"]', 'content', full)
    if (description) {
      setMeta('meta[name="description"]', 'content', description)
      setMeta('meta[property="og:description"]', 'content', description)
    }
    if (SITE) {
      let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
      if (!link) {
        link = document.createElement('link')
        link.rel = 'canonical'
        document.head.appendChild(link)
      }
      link.href = SITE + window.location.pathname
    }
  }, [title, description])
}
