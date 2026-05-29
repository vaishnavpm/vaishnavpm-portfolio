'use client'

import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { usePortfolio } from '@/hooks/usePortfolio'
import type { ProjectItem } from '@/types/portfolio'

function ProjectCard({ project, cardIndex }: { project: ProjectItem; cardIndex: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: cardIndex * 0.07 }}
      className={`group relative flex flex-col p-6 rounded-xl border transition-all duration-300 h-full ${project.highlight
          ? 'bg-white/[0.04] border-white/10 hover:border-white/[0.18]'
          : 'bg-white/[0.02] border-white/[0.06] hover:border-white/10'
        }`}
    >
      {/* Card number */}
      <span className="text-xs font-mono text-text-muted mb-3 block">
        {String(cardIndex + 1).padStart(2, '0')}
      </span>

      {project.highlight && (
        <div className="absolute top-5 right-5">
          <span
            className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border"
            style={{ borderColor: 'rgba(124,58,237,0.35)', color: '#a78bfa' }}
          >
            Featured
          </span>
        </div>
      )}

      <div className="mb-3">
        <h3 className="text-white font-semibold text-base leading-snug pr-16">
          {project.title}
        </h3>
        <p className="text-text-muted text-xs mt-1">{project.subtitle}</p>
      </div>

      <p className="text-text-secondary text-sm leading-relaxed mb-5 flex-1">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-1.5 mb-5">
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="text-[11px] px-2 py-0.5 rounded bg-white/[0.04] text-text-secondary border border-white/[0.06]"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-white/[0.06]">
        <div>
          <p className="text-xs text-text-muted">{project.role}</p>
          <p className="text-xs text-text-muted mt-0.5">{project.year}</p>
        </div>

        {/* LIVE PROJECT button — hidden when link is empty */}
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-text-muted hover:text-white border border-white/10 hover:border-white/30 rounded-md px-3 py-1.5 transition-all duration-200"
          >
            Live Project
            <ExternalLink size={11} />
          </a>
        )}
      </div>
    </motion.div>
  )
}

export default function ProjectsSection() {
  const { projects } = usePortfolio()

  // highlight: true sorted first, then the rest
  const sorted = [
    ...projects.filter((p) => p.highlight),
    ...projects.filter((p) => !p.highlight),
  ]

  const featured = sorted.filter((p) => p.highlight)
  const others = sorted.filter((p) => !p.highlight)

  return (
    <section id="projects" className="py-28 border-t border-white/[0.06]">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="text-xs font-medium text-text-muted mb-2 tracking-[0.2em] uppercase">
            04 / Projects
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white">Selected Work</h2>
        </motion.div>

        {featured.length > 0 && (
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            {featured.map((project, i) => (
              <ProjectCard key={project.id} project={project} cardIndex={i} />
            ))}
          </div>
        )}

        {others.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {others.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                cardIndex={featured.length + i}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}