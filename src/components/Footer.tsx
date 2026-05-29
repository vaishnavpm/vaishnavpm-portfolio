'use client'

import { useState } from 'react'
import { Copy, Check, Phone } from 'lucide-react'
import { usePortfolio } from '@/hooks/usePortfolio'
import SocialLinks from './SocialLinks'

const NAV_LINKS = [
  { label: 'Home', href: '#' },
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

export default function Footer() {
  const { profile } = usePortfolio()
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.social.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // clipboard API unavailable
    }
  }

  return (
    <footer className="border-t border-white/[0.06]">
      <div className="max-w-6xl mx-auto px-6">

        {/* 3-column grid — stacks to 1 col on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 py-14">

          {/* Col 1: Identity */}
          <div>
            <p
              className="hero-heading text-3xl font-bold leading-tight mb-2"
            >
              {profile.name}
            </p>
            <p className="text-text-secondary text-sm mb-1 leading-relaxed">
              {profile.specialization}
            </p>
            <p className="text-text-muted text-sm">{profile.location}</p>
          </div>

          {/* Col 2: Navigate */}
          <div>
            <p className="text-[10px] font-semibold text-text-muted uppercase tracking-[0.18em] mb-5">
              Navigate
            </p>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-text-secondary hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Get in Touch */}
          <div>
            <p className="text-[10px] font-semibold text-text-muted uppercase tracking-[0.18em] mb-5">
              Get in Touch
            </p>

            {/* Email + copy */}
            <div className="flex items-center gap-2 mb-3">
              <span className="text-sm text-text-secondary truncate min-w-0">
                {profile.social.email}
              </span>
              <button
                onClick={copyEmail}
                aria-label="Copy email"
                title="Copy email"
                className="p-1.5 rounded-md text-text-muted hover:text-white hover:bg-white/5 transition-all shrink-0"
              >
                {copied ? (
                  <Check size={13} className="text-green-400" />
                ) : (
                  <Copy size={13} />
                )}
              </button>
              {copied && (
                <span className="text-xs text-green-400 font-medium shrink-0">Copied!</span>
              )}
            </div>

            {/* Phone */}
            {profile.social.phone && (
              <div className="flex items-center gap-2 mb-5">
                <Phone size={13} className="text-text-muted shrink-0" />
                <a
                  href={`tel:${profile.social.phone}`}
                  className="text-sm text-text-secondary hover:text-white transition-colors"
                >
                  {profile.social.phone}
                </a>
              </div>
            )}

            <SocialLinks />
          </div>
        </div>

        {/* Bottom strip */}
        <div className="border-t border-white/[0.06] py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-text-muted">
            © {new Date().getFullYear()}{' '}
            <span className="text-text-secondary">{profile.name}</span>
          </p>
          <p className="text-xs text-text-muted">
            Built with Next.js · TypeScript · Tailwind CSS · Framer Motion
          </p>
        </div>
      </div>
    </footer>
  )
}