import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0C0C0C',
        surface: '#141414',
        'surface-2': '#1A1A1A',
        'border-subtle': '#1E1E1E',
        'text-muted': '#6B7280',
        'text-secondary': '#9CA3AF',
        'text-primary': '#BBCCD7',
      },
      fontFamily: {
        kanit: ['var(--font-kanit)', 'sans-serif'],
      },
      backgroundImage: {
        'accent-gradient': 'linear-gradient(90deg, #7C3AED, #D946EF, #F97316)',
      },
    },
  },
  plugins: [],
}

export default config