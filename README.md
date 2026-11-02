# StudioSpace

StudioSpace is a web platform for discovering and booking creative studios. It is built for people who need a place to make something—photographers, filmmakers, podcasters, musicians, and other creators—and for studio hosts who want to present their spaces and manage booking requests.

The project brings studio discovery, listing details, account access, booking requests, and host order management into one responsive website. Its visual direction is **Dark Kinetic Luxury**: a dark-first interface with electric amber and cyan accents, expressive typography, and prominent studio imagery.

## What the project is for

Creators can browse studio listings, filter by category or search term, review a space's location, amenities, capacity, and hourly rate, then request a booking. Hosts can create and manage listings and review incoming requests through a dashboard. Users can register or sign in with email and password, with Google sign-in configured as an option.

The website is the frontend and Next.js application layer. Studio listings and the current booking UI also depend on a separately hosted API. Authentication and the local booking route use MongoDB through Better Auth and the MongoDB driver.

## Main features

- **Studio discovery:** browse, search, and filter creative spaces.
- **Studio detail pages:** view photos, descriptions, amenities, location, capacity, pricing, and booking controls.
- **Host listings:** add a studio, view your listings, and edit a listing.
- **Booking experience:** request a session and view your bookings.
- **Host dashboard:** review incoming orders and move them through pending, confirmed, and completed states; cancel requests where supported.
- **Authentication:** email/password registration and login, plus Google sign-in.
- **Responsive, theme-aware interface:** dark and light themes, reusable UI components, and mobile layouts.
- **Search engine metadata:** page metadata, Open Graph image, robots rules, and a dynamic sitemap.

## Routes

| Route | Purpose | Access |
| --- | --- | --- |
| `/` | Marketing homepage and featured studios | Public |
| `/studios` | Search and browse studio listings | Public |
| `/studios/[id]` | Studio details and booking entry point | Public |
| `/login` | Sign in | Public |
| `/register` | Create an account | Public |
| `/dashboard` | Host overview and incoming booking orders | Sign-in required |
| `/add-studio` | Create a studio listing | Sign-in required |
| `/my-listings` | View and manage your studio listings | Sign-in required |
| `/studios/edit/[id]` | Edit a studio listing | Sign-in required |
| `/my-bookings` | View your booking requests | Sign-in required |
| `/api/auth/[...all]` | Better Auth API handler | API |
| `/api/bookings` | Session-authenticated local MongoDB booking API | API |
| `/robots.txt`, `/sitemap.xml`, `/opengraph-image` | Search and social sharing resources | Public |

## Tech stack

### Frontend

- **Next.js 16** — App Router, server/client components, route handlers, metadata, and Turbopack
- **React 19** — interactive UI and client-side state
- **TypeScript 5** — strict type checking
- **React Compiler** — enabled through the Next.js configuration

### UI and styling

- **Tailwind CSS v4** — utility-first styling with CSS-based theme tokens
- **shadcn/ui** — project-owned component patterns, adapted to the Base UI primitives
- **Base UI** (`@base-ui/react`) — accessible behavior for shared UI components
- **Lucide React** — interface icons
- **class-variance-authority**, **clsx**, **cn**, and **tailwind-merge** — component variants and class-name composition
- **next-themes** — dark/light theme switching
- **Geist**, **Geist Mono**, and **Syne** — interface and heading fonts via `next/font`

### Authentication and data

- **Better Auth** — email/password authentication, Google sign-in, and session management
- **MongoDB** — authentication storage and the local booking API
- **MongoDB Node.js driver** and **`@better-auth/mongo-adapter`** — database connectivity and Better Auth integration
- **REST API integration with Fetch** — studio listings and the booking UI use the separately deployed StudioSpace API

### Development and quality

- **npm** — dependency and script management
- **ESLint 9** with **`eslint-config-next`** — linting
- **TypeScript compiler (`tsc`)** — type checking
- **Next.js production build** — optimized build and route validation

## Getting started

### Requirements

- Node.js compatible with the installed Next.js version
- npm
- A MongoDB database for authentication (and the local booking API)
- The StudioSpace backend API for listing and current booking UI features

### Install and run

```bash
git clone <repository-url>
cd studiospace
npm ci
```

Create `.env.local` in the project root and configure the required environment variables described below. Then start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

Never commit `.env.local` or paste secret values into source code. The repository ignores `.env*` files.

| Variable | Purpose |
| --- | --- |
| `MONGODB_URI` | MongoDB connection string used by Better Auth and the local bookings route. |
| `BETTER_AUTH_SECRET` | Secret used by Better Auth to sign and protect authentication data. Set a strong, unique value in each environment. |
| `BETTER_AUTH_URL` | Canonical URL of the application used by Better Auth and as an SEO URL fallback. |
| `NEXT_PUBLIC_AUTH_URL` | Public application URL used by the browser-side Better Auth client. |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID for social sign-in. |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret. Keep this secret server-side. |
| `NEXT_PUBLIC_API_URL` | Base URL of the separately deployed StudioSpace API. If omitted, API helpers use `http://localhost:8000`. |
| `NEXT_PUBLIC_SITE_URL` | Public website URL used for canonical metadata, sitemap, robots, and social URLs. Set this to the production domain. |

For local development, the site URL/auth URL values should use `http://localhost:3000` and the API URL should point to the local backend (commonly `http://localhost:8000`). In production, use HTTPS URLs for the deployed website and backend.

Configure the Google OAuth authorized origin and callback URL to match the deployed domain and Better Auth callback path. Also allow the deployed application to connect to MongoDB in your database network settings.

## Backend integration

The frontend data helpers in `src/components/data/` call the separate API configured by `NEXT_PUBLIC_API_URL`. They expect endpoints including:

- `GET /toprateddata`
- `GET /getalldata`
- `GET /singlestudio/:id`
- `GET /getmylistings/:email`
- `POST /addstudio`
- `PATCH /updatestudio/:id`
- `DELETE /deletestudio/:id`
- `POST /addbooking/:email`
- `GET /mybookings/:email`
- `GET /myorders/:email`
- `PATCH /updatebookingstatus/:id`

The API implementation is not included in this repository. It must be deployed separately, reachable from the Vercel application, and configured to allow the required cross-origin requests when called by the browser.

### Booking integration note

This repository currently contains two booking implementations:

1. The booking dialog and booking data helpers use the external API routes listed above.
2. `src/app/api/bookings/route.ts` provides a separate session-authenticated MongoDB implementation with `GET`, `POST`, and `PATCH` handlers.

These are not interchangeable automatically. Before treating bookings as production-ready, ensure the UI, dashboard, and booking pages all use the intended backend consistently, and verify authorization and booking-status rules on the backend that is actually deployed.

## Project structure

```text
src/
├── app/                    # App Router pages, API routes, metadata resources
│   ├── api/                 # Better Auth and local bookings API handlers
│   └── studios/             # Studio browse, detail, and edit routes
├── components/
│   ├── auth/                # Login, registration, and shared auth layout
│   ├── common/              # Navbar and footer
│   ├── dashboard/           # Dashboard, stats, and incoming-order actions
│   ├── data/                # External API fetch/mutation helpers
│   ├── home/                # Homepage sections
│   ├── myBookings/          # Booking dialog and customer booking UI
│   ├── studios/             # Studio browse, cards, filters, and details
│   ├── type/                # Shared TypeScript domain types
│   └── ui/                  # Shared Base UI-based components
└── lib/                     # Authentication, client, and SEO configuration
```

The homepage is composed from sections in `src/components/home/`; `src/app/page.tsx` assembles them. Shared studio and booking types live in `src/components/type/`.

## Development commands

```bash
npm run dev       # Start the local development server
npm run lint      # Run ESLint
npx tsc --noEmit  # Check TypeScript types
npm run build     # Create an optimized production build
npm run start     # Serve the production build locally
```

There is currently no automated test suite. Before submitting changes, run lint, the TypeScript check, and the production build.

## Deploying to Vercel

1. Import the repository into Vercel and use the standard Next.js build settings.
2. Add the production environment variables listed above in the Vercel project settings. Make sure to configure them for the right environments (Preview and Production).
3. Deploy the separate API and set `NEXT_PUBLIC_API_URL` to its public HTTPS URL.
4. Configure MongoDB network access and Google OAuth URLs for the deployed domain.
5. Deploy, then test sign-up/sign-in, studio browsing and detail pages, listing creation/editing, booking creation and status updates, and sitemap/metadata on the deployed site.

The production build can succeed without a live external API, but that does not verify the remote service or its data flows. Test the complete application against the deployed API before inviting users to rely on bookings.

## Design references

- [`brand_identity_visual_strategy.md`](./brand_identity_visual_strategy.md)
- [`color_palette_system.md`](./color_palette_system.md)
