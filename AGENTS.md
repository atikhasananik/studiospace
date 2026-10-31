<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# StudioSpace

Studio discovery/booking site ("Dark Kinetic Luxury" aesthetic). Next.js 16 App Router + React 19 + Tailwind v4. Early stage: only `src/app/page.tsx` is real; most of `src/components/ui/` is pre-installed shadcn components not yet used.

## Commands

- `npm run dev` — Turbopack dev server on localhost:3000
- `npm run lint` — ESLint flat config (`eslint.config.mjs`)
- No test suite exists. Verification = `npm run lint` + `npx tsc --noEmit` + `npm run build` (also Turbopack).

## shadcn is NOT the default shadcn

- `components.json` sets style `base-nova`: UI primitives come from **`@base-ui/react`**, not Radix (the few `@radix-ui/*` deps in package.json are leftovers — don't build on them).
- Class helper: `import { cn } from "cn"` (the `cn` npm package). The `@/lib/utils` alias in `components.json` is misleading — `src/lib/` does not exist.
- Base shadcn styling comes from `@import "shadcn/tailwind.css"` in `src/app/globals.css`. There is no `tailwind.config` — theme is pure CSS variables, Tailwind v4 style.

## Design specs are mandatory reading

Build any UI/visual component against `brand_identity_visual_strategy.md` and `color_palette_system.md`:

- Dark mode is the default base (Light mode is secondary).
- Primary = Electric Amber `#FF4D00` (HSL `18 100% 50%`), accent/live = Neon Pulse Cyan `#00F2FE`, background = Void Obsidian `#090A0F`.
- Tokens use space-separated HSL channels (no `hsl()` wrapper, no oklch) in `globals.css` — follow that exact format when defining theme variables.

## Gotchas

- **React Compiler is enabled** (`reactCompiler: true` in `next.config.ts`). Write plain idiomatic React — hand-rolled `useMemo`/`React.memo` memoization is unnecessary.
- `next/image` accepts **any** https remote host (`remotePatterns: hostname: "**"`) — remote images work without config changes.
- README.md is untouched create-next-app boilerplate; nothing in it is project-specific.
