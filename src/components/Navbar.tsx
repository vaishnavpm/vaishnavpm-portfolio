'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Download } from 'lucide-react'
import { usePortfolio } from '@/hooks/usePortfolio'

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const { profile } = usePortfolio()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 h-20 flex items-center transition-all duration-300 ${scrolled
            ? 'bg-background/90 backdrop-blur-md border-b border-white/[0.06]'
            : ''
          }`}
      >
        <div className="max-w-6xl mx-auto px-6 w-full flex items-center justify-between">
          <a href="#" className="font-semibold text-lg tracking-wide text-white">
            {profile.shortName}
            <span className="accent-text">.</span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-text-muted hover:text-white transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
            {profile.resumeUrl && (
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                download
                className="inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-white transition-colors duration-200"
              >
                <Download size={13} />
                Resume
              </a>
            )}
            <a
              href={`mailto:${profile.social.email}`}
              className="text-sm px-4 py-2 rounded-md border border-white/10 text-white hover:border-white/30 hover:bg-white/5 transition-all duration-200"
            >
              Email Me
            </a>
          </div>

          <button
            className="md:hidden text-white p-1"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed top-20 left-0 right-0 z-40 bg-[#0F0F0F] border-b border-white/[0.06] md:hidden"
          >
            <div className="flex flex-col px-6 py-5 gap-4">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-text-secondary hover:text-white transition-colors py-1 text-sm"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              {profile.resumeUrl && (
                <a
                  href={profile.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="inline-flex items-center gap-2 text-text-secondary hover:text-white transition-colors py-1 text-sm"
                  onClick={() => setMenuOpen(false)}
                >
                  <Download size={14} />
                  Resume
                </a>
              )}
              <a
                href={`mailto:${profile.social.email}`}
                className="text-sm text-white border border-white/10 rounded-md px-4 py-2.5 text-center mt-1 hover:bg-white/5 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                Email Me
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}