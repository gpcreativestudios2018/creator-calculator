# Project: Creator Calculator

## Overview
- **What it does:** Web-based social media creator earnings calculator — helps creators estimate revenue across platforms
- **Platform:** Web
- **Tech stack:** Vite / React / TypeScript / Tailwind CSS / Supabase
- **Backend:** Supabase
- **Status:** In Development — significant progress (multiple phases 100% complete)

## Project Structure
```
creator-calculator/
├── src/                    # Source code
├── dist/                   # Build output
├── public/                 # Static assets
├── supabase/               # Supabase config
├── .claude/                # Claude Code config
├── .github/                # GitHub config
├── .vscode/                # VS Code settings
├── package.json
├── vite.config.ts
├── vercel.json              # Vercel deployment config (SPA rewrites)
├── vitest.config.ts        # Testing config
├── tsconfig.json
├── tailwind.config.js      # Note: .js not .ts
├── eslint.config.js
├── .env.local              # Environment variables (gitignored)
├── .env.example
├── CLAUDE_INSTRUCTIONS.md  # Claude-specific instructions
├── PROJECT_CONTEXT.md      # Project context doc
├── ROADMAP.md              # 153-item roadmap
├── README.md
├── robots.txt
├── sitemap.xml
├── components.json
├── index.html
└── landing.html
```

## Completed Features
- [x] Phase 1: UI Overhaul (100%)
- [x] Phase 2: Core Architecture (100%)
- [x] Phase 3: UX Polish (100%)
- [x] Phase 4: Calculations & Accuracy (100%)
- [x] Phase 5: Transparency & Trust (100%)
- [x] Phase 6: Missing Platforms (100%)
- [x] Phase 7: Visualizations & Data (100%)
- [x] Phase 8: Business Tools (100%)

## In Progress
- [ ] Remaining phases per ROADMAP.md

## Architecture & Patterns
- **Framework:** Vite + React
- **Styling:** Tailwind CSS
- **Backend:** Supabase
- **Testing:** Vitest
- **UI Components:** shadcn/ui (components.json present)

## Key Files
- `ROADMAP.md` — 153-item master roadmap
- `CLAUDE_INSTRUCTIONS.md` — AI-specific instructions
- `PROJECT_CONTEXT.md` — Detailed project context

## Dev Notes
- Has existing CLAUDE_INSTRUCTIONS.md and PROJECT_CONTEXT.md — read these when working on the project
- Uses shadcn/ui components
- Has separate landing.html page
- See ROADMAP.md for full breakdown

## Session Log
### February 26, 2026
- What was done: Created claude.md by scanning project
- What's next: Continue remaining roadmap phases

### March 13, 2026
- What was done: Added vercel.json with SPA rewrite rules to fix 404 errors on all calculator subpages (/youtube-calculator, /tiktok-calculator, /instagram-calculator, /twitch-calculator, /patreon-calculator, etc.). The root cause was that Vercel had no rewrite configuration, so direct navigation to any route other than / returned 404 because there was no actual file at that path. The fix is a single catch-all rewrite rule that serves index.html for all routes, letting the React SPA router in App.tsx handle routing via window.location.pathname.
- What's next: Verify deployed routes load correctly on socialstacks.app
