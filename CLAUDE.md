@AGENTS.md

# connorburns.dev — Personal Portfolio

Static personal portfolio that doubles as a freelance pitch. Single-page scroll, dark theme only, no backend except a single contact-form API route.

## Stack

Already installed:
- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind CSS v4

To add as needed (don't bulk install):
- `shadcn/ui` — UI primitives. Pull in components one at a time.
- `motion` — animations (formerly Framer Motion).
- `lucide-react` — icons.
- `resend` — contact form email delivery via a single `app/api/contact/route.ts`.
- `next/font` — already part of Next, no install needed.

## Design philosophy

**One signature interaction, everything else deliberately quiet.**

The signature: a soft cursor-following spotlight over a faint dot-grid background. Spring-eased lag on the spotlight so it feels premium, not twitchy. Disabled gracefully on touch.

Everything else — typography-led layout, generous whitespace, motion only when it responds to user action (hover, scroll, cursor). The projects should be the loudest content on the page, not the chrome.

## Hard rules

- Dark theme only. No light/dark toggle.
- One signature visual effect. Don't stack parallax, animated gradients, particles, or scroll-jacking on top of the cursor spotlight.
- Motion serves the user. No looping decorative animations.
- The spotlight must disable gracefully on touch devices (`@media (hover: hover)` or equivalent).
- Tailwind utility classes only. No CSS modules, no styled-components, no Emotion.

## Site structure

Single page, top to bottom:

1. **Hero** — name, one-line pitch, social links (GitHub, LinkedIn, email).
2. **About** — short bio paragraph (companies woven into the prose) + resume PDF download button.
3. **Projects** — 2–3 cards. Each: screenshot, name, one-paragraph writeup, live demo link, GitHub link.
4. **Available for Freelance** — short pitch ("Custom websites for small businesses…") + contact form (name, email, message).
5. **Footer** — socials repeated, copyright.

Sticky top nav with smooth-scroll anchor links: About · Projects · Freelance.

No multi-page routing yet. When individual projects deserve deep case-studies, add `/projects/[slug]` then — not before.

## What not to add

- No database, CMS, or auth.
- No blog / MDX setup yet (deferred until there's something to write).
- No full component libraries — Chakra, MUI, Mantine, etc. shadcn/ui only.
- No additional pages without a specific reason. Stay single-page.
- No analytics scripts unless I explicitly ask.
- No light theme, no theme toggle.

## Contact form

- API route at `app/api/contact/route.ts`, calls `resend.emails.send()`.
- `RESEND_API_KEY` in environment (Vercel project env vars, never committed).
- Honeypot field for spam protection. Rate limiting only if spam becomes a real problem.
- Validate inputs server-side; never trust client validation alone.

## Conventions

- TypeScript strict mode.
- Components: named exports, one per file, organized by feature when sections grow.
- Keep `tailwind.config` / theme extensions minimal — extend, don't replace.
- Prefer `next/image` for any image asset.
- Prefer `next/font` over manually loaded fonts.
