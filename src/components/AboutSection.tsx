'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Briefcase, Code2, Layers3 } from 'lucide-react'
import { usePortfolio } from '@/hooks/usePortfolio'

function LinkedInBadge({ vanity, href }: { vanity: string; href: string }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container || !vanity) return

    // Write badge HTML directly into the container — React never touches these children,
    // so LinkedIn's script is free to replace them with its iframe without conflict.
    container.innerHTML = `
      <div
        class="badge-base LI-profile-badge"
        data-locale="en_US"
        data-size="medium"
        data-theme="dark"
        data-type="VERTICAL"
        data-vanity="${vanity}"
        data-version="v1"
      >
        <a class="badge-base__link LI-simple-link" href="${href}"></a>
      </div>
    `

    // Always remove + re-inject the script so it re-executes and scans for the new div.
    // Leaving the old script in place means it won't scan again.
    const old = document.getElementById('li-badge-script')
    if (old) old.remove()

    const script = document.createElement('script')
    script.id = 'li-badge-script'
    script.src = 'https://platform.linkedin.com/badges/js/profile.js'
    script.async = true
    document.body.appendChild(script)
  }, [vanity, href])

  // React only manages this empty wrapper — LinkedIn owns everything inside it.
  return <div ref={containerRef} />
}

export default function AboutSection() {
  const { profile } = usePortfolio()

  const stats = [
    { icon: <Briefcase size={15} />, label: 'Experience', value: `${profile.yearsOfExperience} Years` },
    { icon: <Code2 size={15} />, label: 'Role', value: profile.role },
    { icon: <Layers3 size={15} />, label: 'Core Stack', value: profile.specialization },
    { icon: <MapPin size={15} />, label: 'Location', value: profile.location },
  ]

  const linkedinVanity = profile.social.linkedin
    ? profile.social.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, '').replace(/\/$/, '')
    : ''

  return (
    <section id="about" className="py-28 border-t border-white/[0.06]">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="text-xs font-medium text-text-muted mb-2 tracking-[0.2em] uppercase">
            About
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white">About Me</h2>
        </motion.div>

        {/* 3-column grid: bio | stats | badge */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1fr_240px_220px] gap-8 items-start">

          {/* Col 1: Bio */}
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-text-secondary text-lg leading-relaxed sm:col-span-2 lg:col-span-1"
            style={{ wordBreak: 'normal', overflowWrap: 'normal' }}
          >
            {profile.bio}
          </motion.p>

          {/* Col 2: Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col gap-3"
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex items-center gap-4 px-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-white/10 transition-colors"
              >
                <div className="text-text-muted shrink-0">{stat.icon}</div>
                <div>
                  <p className="text-[10px] text-text-muted uppercase tracking-widest mb-0.5">
                    {stat.label}
                  </p>
                  <p className="text-white text-sm font-medium">{stat.value}</p>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Col 3: LinkedIn badge — rendered outside React's DOM control */}
          {linkedinVanity && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <LinkedInBadge vanity={linkedinVanity} href={profile.social.linkedin} />
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}