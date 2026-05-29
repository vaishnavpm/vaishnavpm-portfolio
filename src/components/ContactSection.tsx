'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Copy, Check, Phone, ArrowUpRight } from 'lucide-react'
import { usePortfolio } from '@/hooks/usePortfolio'
import SocialLinks from './SocialLinks'

export default function ContactSection() {
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
    <section id="contact" className="py-28 border-t border-white/[0.06]">
      <div className="max-w-6xl mx-auto px-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-xs font-medium text-text-muted mb-2 tracking-[0.2em] uppercase"
        >
          Contact
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="max-w-2xl"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            Got a project in mind?
            <br />
            <span className="text-text-muted font-light">Let&apos;s talk.</span>
          </h2>
          <p className="text-text-secondary mb-10 text-base">
            I&apos;m open to backend-focused full-stack roles and contract work. Reach out via
            email or LinkedIn.
          </p>

          {/* Email + copy button */}
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <a
              href={`mailto:${profile.social.email}`}
              className="group inline-flex items-center gap-2 text-xl md:text-2xl font-semibold text-white hover:text-text-primary transition-colors"
            >
              {profile.social.email}
              <ArrowUpRight
                size={18}
                className="text-text-muted group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
              />
            </a>
            <button
              onClick={copyEmail}
              aria-label="Copy email address"
              title="Copy email"
              className="p-2 rounded-lg border border-white/10 text-text-muted hover:text-white hover:border-white/30 hover:bg-white/5 transition-all shrink-0"
            >
              {copied ? (
                <Check size={15} className="text-green-400" />
              ) : (
                <Copy size={15} />
              )}
            </button>
            {copied && (
              <span className="text-xs font-medium text-green-400">Copied!</span>
            )}
          </div>

          {/* Phone */}
          {profile.social.phone && (
            <div className="flex items-center gap-2 mb-8">
              <Phone size={14} className="text-text-muted shrink-0" />
              <a
                href={`tel:${profile.social.phone}`}
                className="text-text-secondary hover:text-white transition-colors text-sm"
              >
                {profile.social.phone}
              </a>
            </div>
          )}

          <SocialLinks />
        </motion.div>
      </div>
    </section>
  )
}