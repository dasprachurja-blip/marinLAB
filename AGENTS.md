# AGENTS.md

This file stores durable project context for Codex and other coding agents working in this repo. Keep it focused on facts, conventions, and decisions that should survive across sessions. Do not store secrets or private credentials here.

## Project Snapshot

- Project name: `arctiqflow`
- Stack: React 19, Vite, Tailwind CSS, React Router, TanStack Query.
- Motion/visual stack: `motion`, GSAP, Lenis smooth scrolling, Three.js via `@react-three/fiber` and `@react-three/drei`.
- Main app entry: `src/main.jsx`
- Route definitions: `src/App.jsx`
- Current routes: `/`, `/about`, `/services`, `/work`, `/pricing`, `/contact`, plus a catch-all 404 page.
- Visual direction: dark cinematic "Arctic Obsidian" design system with blue accent tokens, glass surfaces, smooth reveals, page transitions, and immersive 3D/animation details.

## Common Commands

- Start dev server: `npm run dev`
- Production build: `npm run build`
- Lint code: `npm run lint`
- Preview production build: `npm run preview`

## Key Directories

- `src/pages`: top-level route pages.
- `src/components/layout`: shared app frame, navigation, footer, page wrappers.
- `src/components/sections`: reusable page sections and feature blocks.
- `src/components/atoms`: small shared UI primitives.
- `src/components/ui`: specialized interactive/animated UI components.
- `src/components/sections/Hero3D`: Three.js hero scene pieces.
- `src/data`: editable content data for services, pricing, portfolio, FAQ, and stats.
- `src/hooks`: animation, scroll, viewport, and hover hooks.
- `src/animations`: GSAP and motion helpers.
- `src/lib`: integrations and app services such as query client, EmailJS, Formspree, WhatsApp.
- `public`: static assets served directly.
- `.agent/skills/ui-ux-pro-max`: local agent skill/context resources already present in the repo.

## Implementation Notes For Agents

- Preserve the existing design language unless the user explicitly asks for a redesign.
- Prefer existing atoms, section components, layout wrappers, hooks, animation utilities, and CSS tokens before creating new patterns.
- Keep Tailwind classes and CSS custom properties aligned with `src/index.css` and `tailwind.config.js`.
- Use the `@` import alias for files under `src` when consistent with nearby code.
- For UI changes, check responsive behavior and avoid text overlap on mobile and desktop.
- For animation-heavy changes, keep reduced-motion behavior in mind and avoid unnecessary layout shifts.
- After code changes, run `npm run lint` and `npm run build` when practical.

## Context Log

Add durable notes below as the project evolves. Prefer dated bullets for important decisions.

- 2026-05-16: Created this root `AGENTS.md` file. No existing `AGENTS.md` or `agents.md` file was found at setup time.
