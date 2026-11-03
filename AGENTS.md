<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# StudioSpace

Studio discovery/booking site ("Dark Kinetic Luxury" aesthetic). Next.js 16 App Router + React 19 + Tailwind v4. `README.md` is now a real project guide (routes, env vars, external API endpoints, deployment) — use it for setup details instead of assuming create-next-app defaults.

## Commands

- `npm run dev` — Turbopack dev server at http://localhost:3000.
- `npm run lint` — ESLint flat config (`eslint.config.mjs`); currently exits 0 with unused-variable warnings.
- `npx tsc --noEmit` — type check.
- `npm run build` — production build (Turbopack); `npm run start` serves it.
- No automated tests. Verify changes with lint + `tsc` + build.

## Architecture

- `src/app/` is the App Router tree. `src/app/page.tsx` only composes homepage sections from `src/components/home/` (`hero/`, `feature/`, `category/`, `howBookingWork/`, `guarantee/`, `about/`, `faq/`, `whatWeDo/`); edit those sections.
- `src/app/layout.tsx` wires fonts, `Navbar` (`src/components/common/navbar/navbar.tsx`), `Footer`, `ThemeProvider`, Base UI `Toaster`, and `BackToTop`.
- `src/proxy.ts` is Next 16's replacement for `middleware.ts`; it redirects unauthenticated users for the routes in its matcher. Protected pages also call `auth.api.getSession()` server-side — when adding a protected route, update both the matcher and the page guard.
- Auth is Better Auth + MongoDB (`src/lib/auth.ts`); the browser client is `src/lib/auth-client.ts`. Client mutations call `authClient.token()` and send `authorization: bearer <token>` to the external API.
- `src/components/data/*` calls the separately hosted API at `NEXT_PUBLIC_API_URL` (endpoint list in README). Helpers deliberately return `null`/`[]` on failure, so pages can look empty instead of crashing.
- Booking has two backends: the booking dialog/dashboard helpers use the external API; `src/app/api/bookings/route.ts` is a separate session-authenticated MongoDB implementation. Don't assume they share data (README explains).
- Shared domain types live in `src/components/type/`; `IStudio` accepts both `hostEmail`/`hostName` and `ownerEmail`/`ownerName` because external payloads vary.

## UI / styling

- shadcn here is style `base-nova` using **`@base-ui/react`**, not Radix. Ignore leftover `@radix-ui/*` deps. Import wrappers from `@/components/ui/*`; use Base UI's `render={<Link ... />}` prop, not Radix `asChild`.
- Class helper: `import { cn } from "cn"` (the `cn` package). The `@/lib/utils` alias in `components.json` points to a file that does not exist.
- Tailwind v4 with no `tailwind.config`; tokens are space-separated HSL channels in `src/app/globals.css`. Use semantic utilities (`bg-background`, `text-foreground`, `text-primary`, `bg-card`, ...), not hardcoded colors.
- `next-themes` uses the `.dark`/`.light` class on `<html>`, dark by default. The only intentional scoped token override is `.hero-dark` (hero stays dark in both themes); don't add more overrides.
- Read `brand_identity_visual_strategy.md` and `color_palette_system.md` for the visual language, but their code snippets are stale (Radix/`tailwind.config`). Authoritative palette: Electric Amber primary `#FF4D00`, Neon Pulse Cyan accent `#00F2FE`, Void Obsidian background `#090A0F`. Headings use `font-heading` (Syne).
- User feedback uses `toast` from `@/components/ui/toast` (Base UI toast manager); there is no sonner.

## Gotchas

- **React Compiler is enabled** (`reactCompiler: true` in `next.config.ts`). Write plain idiomatic React; manual `useMemo`/`React.memo` memoization is unnecessary.
- Next 16 request APIs are async: `params` and `searchParams` are Promises — `await` them (see `src/app/studios/page.tsx`).
- `NEXT_PUBLIC_API_URL` is required in practice; helpers use it directly. The `localhost:8000` fallback mentioned in comments/README is not implemented.
- `next/image` accepts any HTTPS host (`remotePatterns: hostname: "**"`), so remote images need no config changes.
- `.env*` is gitignored. README documents required variables; auth/runtime needs `MONGODB_URI`, external data needs `NEXT_PUBLIC_API_URL`.
