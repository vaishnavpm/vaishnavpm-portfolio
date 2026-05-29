# Vaishnav P M — Portfolio

Personal portfolio built with Next.js 14 (App Router), TypeScript, Tailwind CSS, and Framer Motion.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Updating content

All portfolio content lives in one file:

```
src/data/portfolio.json
```

Edit that file to update your name, bio, experience, skills, projects, and social links. No code changes needed. Fields with empty strings (`""`) are automatically hidden from the UI.

### Key fields

| Field | Effect |
|---|---|
| `profile.social.*` | Social pills on hero, icons in footer/contact. Set to `""` to hide. |
| `projects[].link` | "Live Project" button. Set to `""` to hide the button. |
| `projects[].highlight` | `true` shows the project in the featured 2-column grid. |
| `experience[].highlights` | Only the first 4 bullets are shown per role. |
| `profile.avatarSvg` | Path to avatar image. Place the file in the `public/` folder and set the path to `/your-image.png`. |

## Deploy to Vercel

1. Push this repo to GitHub.
2. Go to [vercel.com](https://vercel.com) → **Add New Project** → import your repo.
3. Vercel auto-detects Next.js — no build settings needed.
4. Click **Deploy**.

### Environment variables (optional)

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Sets the canonical URL in OG tags (e.g. `https://vaishnavpm.dev`). Defaults to `http://localhost:3000` if not set. |

Set this in Vercel under **Project Settings → Environment Variables** before deploying if you want correct OG preview links.

## Tech stack

- [Next.js 14](https://nextjs.org) — App Router, static export
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion)
- [Lucide React](https://lucide.dev)
- [Kanit](https://fonts.google.com/specimen/Kanit) — Google Fonts