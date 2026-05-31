'use client'

import { motion } from 'framer-motion'
import { MapPin, Briefcase, Code2, Layers3 } from 'lucide-react'
import { usePortfolio } from '@/hooks/usePortfolio'

export default function AboutSection() {
  const { profile } = usePortfolio()

  const stats = [
    { icon: <Briefcase size={15} />, label: 'Experience', value: `${profile.yearsOfExperience} Years` },
    { icon: <Code2 size={15} />, label: 'Role', value: profile.role },
    { icon: <Layers3 size={15} />, label: 'Core Stack', value: profile.specialization },
    { icon: <MapPin size={15} />, label: 'Location', value: profile.location },
  ]

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

        <div className="grid md:grid-cols-[1fr_320px] gap-12 items-start">
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-text-secondary text-lg leading-relaxed"
            style={{ wordBreak: 'normal', overflowWrap: 'normal' }}
          >
            {profile.bio}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
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
        </div>
      </div>
    </section>
  )
}