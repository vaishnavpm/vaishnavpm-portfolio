'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Code2, Linkedin, Mail, Phone, Globe, Download } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { usePortfolio } from '@/hooks/usePortfolio'
import type { Social } from '@/types/portfolio'

interface SocialPill {
  key: keyof Social
  label: string
  Icon: LucideIcon
  getHref: (val: string) => string
}

const SOCIAL_PILLS: SocialPill[] = [
  { key: 'linkedin', label: 'LinkedIn', Icon: Linkedin, getHref: (v) => v },
  { key: 'github', label: 'GitHub', Icon: Code2, getHref: (v) => v },
  { key: 'email', label: 'Email', Icon: Mail, getHref: (v) => `mailto:${v}` },
  { key: 'phone', label: 'Phone', Icon: Phone, getHref: (v) => `tel:${v}` },
  { key: 'website', label: 'Website', Icon: Globe, getHref: (v) => v },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

export default function HeroSection() {
  const { profile } = usePortfolio()

  const activePills = SOCIAL_PILLS.filter(({ key }) => {
    const val = profile.social[key]
    return typeof val === 'string' && val.trim() !== ''
  })

  // Cursor-following avatar
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const spring = { damping: 30, stiffness: 120 }
  const avatarX = useSpring(useTransform(rawX, [-0.5, 0.5], [-36, 36]), spring)
  const avatarY = useSpring(useTransform(rawY, [-0.5, 0.5], [-36, 36]), spring)

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect()
    rawX.set((e.clientX - left) / width - 0.5)
    rawY.set((e.clientY - top) / height - 0.5)
  }

  const handleMouseLeave = () => {
    rawX.set(0)
    rawY.set(0)
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center pt-20 overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background radial glow */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% -5%, rgba(124,58,237,0.14) 0%, transparent 70%)',
        }}
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative max-w-6xl mx-auto px-6 w-full grid grid-rows-[auto_auto_auto_auto] justify-items-center text-center"
      >
        {/* Row 1: Headline — z-10 so avatar can sit above it */}
        <motion.h1
          variants={item}
          className="hero-heading font-bold leading-none tracking-tighter row-start-1 relative z-10"
          style={{ fontSize: 'clamp(3rem, 10vw, 12rem)' }}
        >
          Hi, I&apos;m {profile.shortName}
        </motion.h1>

        {/* Row 2: Avatar — z-20, negative margin overlaps row 1, follows cursor */}
        <motion.div
          variants={item}
          style={{ x: avatarX, y: avatarY }}
          className="row-start-2 relative z-20 -mt-8 md:-mt-14 lg:-mt-20"
        >
          <div className="relative inline-block">
            {/* Soft ambient glow — no visible ring */}
            <div
              aria-hidden
              className="absolute -inset-8 blur-3xl opacity-30 pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(124,58,237,0.5) 0%, transparent 70%)',
              }}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={profile.avatarSvg}
              alt={profile.name}
              width={220}
              height={220}
              loading="lazy"
              className="relative w-32 h-32 md:w-44 md:h-44 lg:w-52 lg:h-52 object-cover"
              style={{
                WebkitMaskImage: 'radial-gradient(circle at center, black 56%, transparent 72%)',
                maskImage: 'radial-gradient(circle at center, black 56%, transparent 72%)',
              }}
              onError={(e) => {
                ; (e.currentTarget as HTMLImageElement).style.display = 'none'
              }}
            />
          </div>
        </motion.div>

        {/* Row 3: Role badge + tagline */}
        <motion.div
          variants={item}
          className="row-start-3 mt-7 space-y-3 max-w-2xl"
        >
          <span className="inline-flex items-center gap-2 text-sm font-medium px-3 py-1.5 rounded-full border border-white/10 text-text-secondary">
            <span
              className="w-2 h-2 rounded-full shrink-0"
              style={{ background: 'linear-gradient(135deg, #7c3aed, #d946ef)' }}
            />
            {profile.role}
          </span>
          <p className="text-text-secondary text-lg md:text-xl font-light leading-relaxed px-2">
            {profile.tagline}
          </p>
        </motion.div>

        {/* Row 4: Social pills — only rendered when value is non-empty */}
        <motion.div
          variants={item}
          className="row-start-4 mt-8 flex flex-wrap justify-center gap-3"
        >
          {activePills.map(({ key, label, Icon, getHref }) => (
            <a
              key={key}
              href={getHref(profile.social[key] as string)}
              target={key !== 'email' && key !== 'phone' ? '_blank' : undefined}
              rel={key !== 'email' && key !== 'phone' ? 'noopener noreferrer' : undefined}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 text-text-secondary text-sm hover:border-white/30 hover:text-white hover:bg-white/5 transition-all duration-200"
            >
              <Icon size={14} />
              {label}
            </a>
          ))}
          {profile.resumeUrl && (
            <div>
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                download
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 text-text-secondary text-sm hover:border-white/30 hover:text-white hover:bg-white/5 transition-all duration-200"
              >
                <Download size={14} />
                Resume
              </a>
            </div>
          )}
        </motion.div>
      </motion.div>
    </section>
  )
}