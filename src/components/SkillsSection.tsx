'use client'

import { motion } from 'framer-motion'
import { usePortfolio } from '@/hooks/usePortfolio'

export default function SkillsSection() {
  const { skills } = usePortfolio()

  return (
    <section id="skills" className="py-28 border-t border-white/[0.06]">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="text-xs font-medium text-text-muted mb-2 tracking-[0.2em] uppercase">
            Skills
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white">Tech Stack</h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {skills.categories.map((category, catIndex) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: catIndex * 0.07 }}
              className="p-5 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-white/10 transition-colors"
            >
              <h3 className="text-[10px] font-semibold text-text-muted uppercase tracking-[0.18em] mb-4">
                {category.name}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.items.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs px-2.5 py-1 rounded-md bg-white/[0.05] text-text-primary border border-white/[0.07] hover:border-white/20 hover:text-white transition-all duration-150 cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}