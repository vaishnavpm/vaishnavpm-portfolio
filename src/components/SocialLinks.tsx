'use client'

import type { ReactNode } from 'react'
import { Code2, Linkedin, Mail, Globe } from 'lucide-react'
import { usePortfolio } from '@/hooks/usePortfolio'

interface SocialConfig {
  icon: ReactNode
  label: string
}

const SOCIAL_CONFIG: Record<string, SocialConfig> = {
  github: { icon: <Code2 size={18} />, label: 'GitHub' },
  linkedin: { icon: <Linkedin size={18} />, label: 'LinkedIn' },
  email: { icon: <Mail size={18} />, label: 'Email' },
  website: { icon: <Globe size={18} />, label: 'Website' },
}

export default function SocialLinks({ className = '' }: { className?: string }) {
  const { profile } = usePortfolio()
  const { social } = profile

  const links = (Object.entries(social) as [string, string][])
    .filter(([key, value]) => value && key !== 'phone' && SOCIAL_CONFIG[key])
    .map(([key, value]) => ({
      key,
      href: key === 'email' ? `mailto:${value}` : value,
      ...SOCIAL_CONFIG[key],
    }))

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {links.map((link) => (
        <a
          key={link.key}
          href={link.href}
          target={link.key !== 'email' ? '_blank' : undefined}
          rel={link.key !== 'email' ? 'noopener noreferrer' : undefined}
          aria-label={link.label}
          className="p-2.5 rounded-lg text-text-muted hover:text-white hover:bg-white/[0.06] transition-all duration-200"
        >
          {link.icon}
        </a>
      ))}
    </div>
  )
}
