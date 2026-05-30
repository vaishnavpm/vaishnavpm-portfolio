import type { Metadata } from 'next'
import { Kanit } from 'next/font/google'
import './globals.css'
import portfolioData from '@/data/portfolio.json'

const kanit = Kanit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-kanit',
  display: 'swap',
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
const title = 'Vaishnav P M — Full Stack Engineer'
const description = portfolioData.profile.tagline

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  openGraph: {
    title,
    description,
    url: siteUrl,
    type: 'website',
    siteName: portfolioData.profile.name,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={kanit.variable}>
      <body className="bg-background font-kanit text-white antialiased">
        {children}
      </body>
    </html>
  )
}