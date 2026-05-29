'use client'

import { motion } from 'framer-motion'
import { usePortfolio } from '@/hooks/usePortfolio'

export default function ExperienceSection() {
  const { experience } = usePortfolio()

  return (
    <section id="experience" className="py-28 border-t border-white/[0.06]">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="text-xs font-medium text-text-muted mb-2 tracking-[0.2em] uppercase">
            Experience
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white">Work History</h2>
        </motion.div>

        <div>
          {experience.map((item, index) => (
            <motion.div
              key={item.company}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              {/* Divider between rows */}
              {index > 0 && (
                <div className="h-px bg-white/[0.06] my-10" />
              )}

              <div className="flex gap-6 md:gap-10">
                {/* Row number — decorative, large and faint */}
                <div
                  className="hidden sm:block text-5xl md:text-6xl font-bold leading-none shrink-0 w-14 text-right pt-1 select-none"
                  style={{ color: 'rgba(255,255,255,0.06)' }}
                >
                  {String(index + 1).padStart(2, '0')}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                    <div>
                      <h3 className="text-xl font-bold text-white">{item.company}</h3>
                      <p className="text-text-secondary text-sm mt-0.5">
                        {item.role}
                        {item.location ? ` · ${item.location}` : ''}
                      </p>
                    </div>
                    <span className="font-mono text-xs text-text-muted px-2.5 py-1 rounded-md border border-white/[0.06] bg-white/[0.02] whitespace-nowrap shrink-0 self-start">
                      {item.period}
                    </span>
                  </div>

                  <p className="text-sm text-text-muted italic mb-4 leading-relaxed">
                    {item.summary}
                  </p>

                  <ul className="space-y-2">
                    {item.highlights.slice(0, 4).map((hl, i) => (
                      <li key={i} className="flex items-start gap-3 text-text-secondary text-sm leading-relaxed">
                        <span
                          className="mt-2 w-1 h-1 rounded-full shrink-0"
                          style={{ background: 'rgba(167,139,250,0.6)' }}
                        />
                        {hl}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}